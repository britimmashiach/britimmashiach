/**
 * deploy-chag.ts
 *
 * Lê data/chagim/<slug>/ e insere no Supabase via service role
 * (bypass de RLS). Idempotente: deleta a versão anterior do mesmo slug
 * antes de inserir. As seções são removidas em cascade pela FK.
 *
 * Uso:
 *   npx tsx --env-file=.env.local scripts/deploy-chag.ts shabat
 *
 * Variáveis obrigatórias em .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Faltam NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no .env.local')
  process.exit(1)
}

const slug = process.argv[2]
if (!slug) {
  console.error('Uso: tsx scripts/deploy-chag.ts <slug>')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const chagDir = join(process.cwd(), 'data', 'chagim', slug)

type ChagMetadata = {
  slug: string
  name: string
  name_hebrew: string
  category: string
  month_hebrew: string | null
  day_start: number | null
  duration_days: number
  summary: string
  level_pardes: string[]
  is_premium: boolean
  content_intro: string
  pdf_url: string | null
  pdf_premium_url: string | null
  pdf_kabbalah_url: string | null
}

type SectionMeta = {
  title: string
  order_num: number
  level_pardes: string[]
  is_premium: boolean
  content: string
}

const metadata: ChagMetadata = JSON.parse(
  readFileSync(join(chagDir, '00-metadata.json'), 'utf8'),
)

function parseSection(path: string, raw: string): SectionMeta {
  const sepIdx = raw.indexOf('\n---\n')
  if (sepIdx === -1) throw new Error(`separador --- não encontrado em ${path}`)
  const header = raw.slice(0, sepIdx)
  const body = raw.slice(sepIdx + 5).trim()
  const meta: Record<string, unknown> = {}
  for (const line of header.split('\n')) {
    const m = line.match(/^\*\*([a-z_]+):\*\*\s*(.+)$/)
    if (!m) continue
    const key = m[1]
    let val: unknown = m[2].trim()
    if (key === 'level_pardes') val = JSON.parse(val as string)
    else if (key === 'is_premium') val = val === 'true'
    else if (key === 'order_num') val = parseInt(val as string, 10)
    meta[key] = val
  }
  return {
    title: meta.title as string,
    order_num: meta.order_num as number,
    level_pardes: (meta.level_pardes as string[]) ?? [],
    is_premium: (meta.is_premium as boolean) ?? false,
    content: body,
  }
}

const sectionFiles = readdirSync(chagDir)
  .filter((f) => /^\d{2}-.+\.md$/.test(f))
  .sort()

const sections: SectionMeta[] = sectionFiles.map((f) =>
  parseSection(f, readFileSync(join(chagDir, f), 'utf8')),
)

console.log(`Carregadas ${sections.length} seções de ${chagDir}`)
console.log(`Metadados: ${metadata.name} (${metadata.name_hebrew})`)

;(async () => {
  console.log(`\n→ Deletando chag existente com slug='${slug}'...`)
  const { error: delError } = await supabase.from('chagim').delete().eq('slug', slug)
  if (delError) {
    console.error('Erro ao deletar:', delError.message)
    process.exit(1)
  }
  console.log('  OK (chag_sections cascateadas)')

  console.log(`\n→ Inserindo chagim...`)
  const { data: chagRow, error: insError } = await supabase
    .from('chagim')
    .insert({
      slug: metadata.slug,
      name: metadata.name,
      name_hebrew: metadata.name_hebrew,
      category: metadata.category,
      month_hebrew: metadata.month_hebrew,
      day_start: metadata.day_start,
      duration_days: metadata.duration_days,
      summary: metadata.summary,
      content: metadata.content_intro,
      level_pardes: metadata.level_pardes,
      is_premium: metadata.is_premium,
      pdf_url: metadata.pdf_url,
      pdf_premium_url: metadata.pdf_premium_url,
      pdf_kabbalah_url: metadata.pdf_kabbalah_url,
    })
    .select('id')
    .single()

  if (insError || !chagRow) {
    console.error('Erro ao inserir chagim:', insError?.message)
    process.exit(1)
  }
  console.log(`  OK id=${chagRow.id}`)

  console.log(`\n→ Inserindo ${sections.length} chag_sections...`)
  const rows = sections.map((s) => ({
    chag_id: chagRow.id,
    order_num: s.order_num,
    title: s.title,
    content: s.content,
    level_pardes: s.level_pardes,
    is_premium: s.is_premium,
  }))
  const { error: secError } = await supabase.from('chag_sections').insert(rows)
  if (secError) {
    console.error('Erro ao inserir chag_sections:', secError.message)
    process.exit(1)
  }
  console.log(`  OK (${sections.length} linhas)`)

  console.log(`\n→ Verificação:`)
  const { count: chagCount } = await supabase
    .from('chagim')
    .select('*', { count: 'exact', head: true })
    .eq('slug', slug)
  const { count: secCount } = await supabase
    .from('chag_sections')
    .select('*', { count: 'exact', head: true })
    .eq('chag_id', chagRow.id)
  console.log(`  chagim com slug='${slug}': ${chagCount}`)
  console.log(`  chag_sections vinculadas: ${secCount}`)

  console.log(`\nFeito. Acesse https://britimmashiach-5jd4nnj2u.vercel.app/chagim/${slug}`)
})().catch((err) => {
  console.error('Falha inesperada:', err)
  process.exit(1)
})
