/**
 * Importa introdução das Aliyot (1–7) dos .md locais para aliyot.content e title.
 *
 * Uso:
 *   npm run sync:aliyot              # todas as aliyot, só placeholders
 *   npm run sync:aliyot -- --dry-run
 *   npm run sync:aliyot -- --force   # sobrescreve conteúdo existente
 *   npm run sync:aliyot -- --only=1  # só Aliyáh 1 (equivale ao antigo sync:aliyah1)
 */
import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'fs/promises'
import { join, resolve } from 'path'
import { findParashaByName } from '../lib/parashot-registry'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const dryRun = process.argv.includes('--dry-run')
const force = process.argv.includes('--force')
const onlyArg = process.argv.find((a) => a.startsWith('--only='))
const onlyAliyah = onlyArg ? Number(onlyArg.split('=')[1]) : null

const SINAGOGA_ROOT = resolve(
  process.env.SINAGOGA_ROOT ?? join(process.cwd(), '..', '..', '..'),
)

const FILE_RE = /^(\d+)a_Parashat_(.+?)_(\d+)a_Aliyah\.md$/i
const PLACEHOLDER_RE = /em preparação|conteúdo desta aliyáh em preparação/i

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

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

function cleanParagraphs(raw: string): string {
  return raw
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/—/g, ',')
        .replace(/–/g, ',')
        .replace(/[""''`´]/g, '')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter((p) => p.length > 20)
    .join('\n\n')
}

const SLUG_ALIASES: Record<string, string[]> = {
  nasso: ['naso'],
}

function nameToSlugs(parashaName: string): string[] {
  const lower = parashaName.toLowerCase().replace(/-/g, ' ')
  const aliasKey = lower.replace(/\s+/g, '')
  if (SLUG_ALIASES[aliasKey]) return SLUG_ALIASES[aliasKey]

  if (lower.includes('matot') && lower.includes('masei')) return ['matot']

  const entry = findParashaByName(parashaName.replace(/-/g, ' '))
  if (entry) return [entry.slug]

  return [lower.replace(/\s+/g, '-')]
}

function extractTitle(content: string, aliyahNum: number): string | null {
  const re = new RegExp(`\\*\\*${aliyahNum}ª Aliyáh,\\s*(.+?)\\*\\*`, 'i')
  const m = content.match(re)
  return m ? cleanText(m[1]) : null
}

function extractIntro(content: string): string {
  const m = content.match(/## Shalom U'Vrachá,\s*\n([\s\S]*?)\n---\s*\n## Termos-Chave/i)
  if (!m) return ''
  return cleanParagraphs(m[1])
}

async function main() {
  console.log(`\n📂 Fonte: ${SINAGOGA_ROOT}`)
  const mode = dryRun ? '🔍 Dry-run' : force ? '📝 Gravando (force)' : '📝 Gravando (só placeholders)'
  const filter = onlyAliyah ? ` · Aliyáh ${onlyAliyah} apenas` : ''
  console.log(`${mode}${filter}\n`)

  let files = (await readdir(SINAGOGA_ROOT)).filter((f) => FILE_RE.test(f))
  if (onlyAliyah) {
    files = files.filter((f) => Number(f.match(FILE_RE)![3]) === onlyAliyah)
  }

  if (files.length === 0) {
    console.log('Nenhum arquivo *_Na_Aliyah.md encontrado.')
    return
  }

  const { data: parashot, error: pErr } = await supabase.from('parashot').select('id, slug')
  if (pErr) {
    console.error(pErr.message)
    process.exit(1)
  }
  const parashaBySlug = new Map((parashot ?? []).map((p) => [p.slug, p.id]))

  let updated = 0
  let skipped = 0

  for (const file of files.sort()) {
    const match = file.match(FILE_RE)!
    const parashaName = match[2]
    const aliyahNum = Number(match[3])
    const content = await readFile(join(SINAGOGA_ROOT, file), 'utf-8')
    const intro = extractIntro(content)
    const title = extractTitle(content, aliyahNum)

    if (!intro) {
      console.log(`⚠ ${file}: introdução não encontrada`)
      continue
    }

    const slugs = nameToSlugs(parashaName)
    for (const slug of slugs) {
      const parashaId = parashaBySlug.get(slug)
      if (!parashaId) {
        console.log(`✗ ${slug}: parasha ausente no Supabase (${parashaName})`)
        continue
      }

      const { data: aliyah, error: aErr } = await supabase
        .from('aliyot')
        .select('id, content, title')
        .eq('parasha_id', parashaId)
        .eq('aliyah_number', aliyahNum)
        .single()

      if (aErr || !aliyah) {
        console.log(`✗ ${slug} aliyah ${aliyahNum}: ${aErr?.message ?? 'não encontrada'}`)
        continue
      }

      const isPlaceholder = !aliyah.content?.trim() || PLACEHOLDER_RE.test(aliyah.content)
      if (!force && !isPlaceholder) {
        console.log(`↷ ${slug} aliyah ${aliyahNum}: conteúdo já preenchido (use --force)`)
        skipped++
        continue
      }

      const payload: { content: string; title?: string } = { content: intro }
      if (title) payload.title = title

      console.log(`\n✓ ${slug} aliyah ${aliyahNum} ← ${file}`)
      console.log(`  título: ${payload.title ?? aliyah.title}`)
      console.log(`  chars: ${intro.length}`)

      if (!dryRun) {
        const { error: uErr } = await supabase.from('aliyot').update(payload).eq('id', aliyah.id)
        if (uErr) console.error(`  ✗ ${uErr.message}`)
        else updated++
      }
    }
  }

  console.log(`\n${dryRun ? 'Dry-run concluído' : `✅ ${updated} aliyot atualizadas, ${skipped} ignoradas`}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
