/**
 * Extrai Peshat/Remez/Drash/Sod da seção Conclusão dos .md locais
 * e atualiza a tabela parashot no Supabase.
 *
 * Uso:
 *   npm run sync:pardes          # aplica
 *   npm run sync:pardes -- --dry-run
 *
 * Fonte: arquivos *_Parashat_*_*a_Aliyah.md em SINAGOGA_ROOT (padrão: ../../..)
 */
import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'fs/promises'
import { join, resolve } from 'path'
import { findParashaByName } from '../lib/parashot-registry'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const dryRun = process.argv.includes('--dry-run')

const SINAGOGA_ROOT = resolve(
  process.env.SINAGOGA_ROOT ?? join(process.cwd(), '..', '..', '..'),
)

const FILE_RE = /^(\d+)a_Parashat_(.+?)_(\d+)a_Aliyah\.md$/i

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

type PardesFields = {
  peshat: string
  remez: string
  drash: string
  sod: string
  summary: string
}

type ParsedGroup = {
  parashaName: string
  slugs: string[]
  bestAliyah: number
  fields: PardesFields
}

function cleanText(raw: string): string {
  return raw
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/—/g, ',')
    .replace(/–/g, ',')
    .replace(/[""''`´]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text: string, max = 420): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 280 ? cut.slice(0, lastSpace) : cut).trim() + '…'
}

function extractLevel(block: string, level: 'Peshat' | 'Remez' | 'Drash' | 'Sod'): string {
  const re = new RegExp(`No ${level}:\\s*(.+?)(?=\\nNo |\\n---|\\n## |$)`, 'is')
  const m = block.match(re)
  return m ? truncate(cleanText(m[1])) : ''
}

function extractPardes(content: string): Omit<PardesFields, 'summary'> | null {
  const concl = content.match(/## Conclusão\s*\n([\s\S]*?)(?:\n---|\n## Poesia Final|\n## Ken Yehi|$)/i)
  if (!concl) return null

  const block = concl[1]
  const peshat = extractLevel(block, 'Peshat')
  const remez = extractLevel(block, 'Remez')
  const drash = extractLevel(block, 'Drash')
  const sod = extractLevel(block, 'Sod')

  if (!peshat && !remez && !drash && !sod) return null
  return { peshat, remez, drash, sod }
}

function extractSummary(content: string): string {
  const intro = content.match(/## Shalom U'Vrachá,\s*\n([\s\S]*?)\n---\s*\n## Termos-Chave/i)
  if (!intro) return ''
  const paras = intro[1]
    .split(/\n\s*\n/)
    .map((p) => cleanText(p))
    .filter((p) => p.length > 40)
  return truncate(paras.slice(0, 2).join(' '), 360)
}

const SLUG_ALIASES: Record<string, string[]> = {
  nasso: ['naso'],
}

function nameToSlugs(parashaName: string): string[] {
  const lower = parashaName.toLowerCase().replace(/-/g, ' ')
  const aliasKey = lower.replace(/\s+/g, '')
  if (SLUG_ALIASES[aliasKey]) return SLUG_ALIASES[aliasKey]

  if (lower.includes('matot') && lower.includes('masei')) return ['matot', 'masei']

  const entry = findParashaByName(parashaName.replace(/-/g, ' '))
  if (entry) return [entry.slug]

  const slug = lower.replace(/\s+/g, '-')
  return [slug]
}

type GroupFiles = {
  parashaName: string
  byAliyah: Map<number, string>
}

async function loadMarkdownGroups(): Promise<Map<string, GroupFiles>> {
  const files = await readdir(SINAGOGA_ROOT)
  const groups = new Map<string, GroupFiles>()

  for (const file of files) {
    const m = file.match(FILE_RE)
    if (!m) continue
    const parashaName = m[2]
    const aliyah = Number(m[3])
    const key = parashaName.toLowerCase()
    const content = await readFile(join(SINAGOGA_ROOT, file), 'utf-8')
    const g = groups.get(key) ?? { parashaName, byAliyah: new Map() }
    g.byAliyah.set(aliyah, content)
    groups.set(key, g)
  }

  return groups
}

async function main() {
  console.log(`\n📂 Fonte: ${SINAGOGA_ROOT}`)
  console.log(dryRun ? '🔍 Modo dry-run (sem gravar no Supabase)\n' : '📝 Gravando no Supabase\n')

  const groups = await loadMarkdownGroups()
  const parsed: ParsedGroup[] = []

  for (const { byAliyah, parashaName } of groups.values()) {
    const bestAliyah = Math.max(...byAliyah.keys())
    const content = byAliyah.get(bestAliyah)!
    const pardes = extractPardes(content)
    if (!pardes) {
      console.log(`⚠ ${parashaName} (aliyah ${bestAliyah}): sem Conclusão PaRDeS`)
      continue
    }
    const summary = extractSummary(byAliyah.get(1) ?? content)
    parsed.push({
      parashaName,
      slugs: nameToSlugs(parashaName),
      bestAliyah,
      fields: { ...pardes, summary },
    })
  }

  if (parsed.length === 0) {
    console.log('Nenhum arquivo com Conclusão PaRDeS encontrado.')
    return
  }

  const { data: parashot } = await supabase.from('parashot').select('id, slug, summary, peshat, remez, drash, sod')
  const bySlug = new Map((parashot ?? []).map((p) => [p.slug, p]))

  let updated = 0
  for (const item of parsed) {
    for (const slug of item.slugs) {
      const row = bySlug.get(slug)
      if (!row) {
        console.log(`✗ slug "${slug}" não existe no Supabase (${item.parashaName})`)
        continue
      }

      const payload: Record<string, string> = {
        peshat: item.fields.peshat,
        remez: item.fields.remez,
        drash: item.fields.drash,
        sod: item.fields.sod,
      }

      const placeholder = /em preparação|conteúdo detalhado em preparação/i
      if (item.fields.summary && (!row.summary || placeholder.test(row.summary))) {
        payload.summary = item.fields.summary
      }

      console.log(`\n✓ ${slug} ← ${item.parashaName} (aliyah ${item.bestAliyah})`)
      console.log(`  peshat: ${payload.peshat.slice(0, 80)}…`)
      console.log(`  remez:  ${payload.remez.slice(0, 80)}…`)
      console.log(`  drash:  ${payload.drash.slice(0, 80)}…`)
      console.log(`  sod:    ${payload.sod.slice(0, 80)}…`)
      if (payload.summary) console.log(`  summary atualizado`)

      if (!dryRun) {
        const { error } = await supabase.from('parashot').update(payload).eq('id', row.id)
        if (error) {
          console.error(`  ✗ erro: ${error.message}`)
          if (error.message.includes('column')) {
            console.error('  → Rode a migration 20260524_aliyot_pdf_variants ou adicione colunas peshat/remez/drash/sod em parashot')
          }
        } else {
          updated++
        }
      }
    }
  }

  console.log(`\n${dryRun ? 'Dry-run concluído' : `✅ ${updated} parashot atualizadas`}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
