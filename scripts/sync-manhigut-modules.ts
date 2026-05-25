/**
 * Importa modulos Manhigut dos .md locais para leader_modules.
 *
 * Uso:
 *   npm run sync:manhigut
 *   npm run sync:manhigut -- --dry-run
 *   npm run sync:manhigut -- --force
 */
import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'fs/promises'
import { join, resolve } from 'path'
import { getCurriculumByMonth } from '../lib/manhigut-curriculum'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const dryRun = process.argv.includes('--dry-run')
const force = process.argv.includes('--force')

const SINAGOGA_ROOT = resolve(
  process.env.SINAGOGA_ROOT ?? join(process.cwd(), '..', '..', '..'),
)

const FILE_RE = /^BeitMidrash_Manhig_Mes_(\d+)_(.+)\.md$/i

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })

function estimateReadingMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(12, Math.round(words / 180))
}

function extractExcerpt(raw: string): string {
  const afterShalom = raw.split(/## Shalom U'Vrachá,/i)[1]
  if (!afterShalom) return ''

  const paragraph = afterShalom
    .split(/\n\s*\n/)
    .map((p) => p.replace(/^#+\s+/gm, '').trim())
    .find((p) => p.length > 80 && !p.startsWith('---'))

  return paragraph?.slice(0, 500) ?? ''
}

function stripCoverLines(raw: string): string {
  const lines = raw.replace(/\r\n/g, '\n').split('\n')
  const startIdx = lines.findIndex((l) => /^## Boker Tov!/i.test(l.trim()))
  if (startIdx >= 0) return lines.slice(startIdx).join('\n').trim()
  return raw.trim()
}

function parseTitle(raw: string, fallback: string): string {
  const h1 = raw.match(/^#\s+(.+)$/m)?.[1]
  if (!h1) return fallback
  const parts = h1.replace(/^Beit Midrash do Manhig,\s*/i, '').split(',')
  if (parts.length >= 3) return parts.slice(2).join(',').trim()
  return fallback
}

async function main() {
  const dir = join(SINAGOGA_ROOT, 'manhigut')
  const files = (await readdir(dir)).filter((f) => FILE_RE.test(f))
  console.log(`Manhigut: ${files.length} arquivo(s) em ${dir}`)

  for (const file of files) {
    const match = file.match(FILE_RE)!
    const monthNum = Number(match[1])
    const curriculum = getCurriculumByMonth(monthNum)
    if (!curriculum) {
      console.warn(`  skip ${file}: mes ${monthNum} fora da grade`)
      continue
    }

    const raw = await readFile(join(dir, file), 'utf-8')
    const content = stripCoverLines(raw)
    const title = parseTitle(raw, curriculum.title)
    const subtitleMatch = raw.match(/^\*\*(Módulo.+?)\*\*/m)
    const excerpt = extractExcerpt(raw)
    const payload = {
      slug: curriculum.slug,
      month_num: monthNum,
      stage: curriculum.stage,
      stage_label: curriculum.stageLabel,
      title,
      subtitle: subtitleMatch?.[1] ?? curriculum.subtitle,
      excerpt,
      content,
      is_published: true,
      reading_time_minutes: estimateReadingMinutes(content),
      sort_order: monthNum,
      updated_at: new Date().toISOString(),
    }

    const { data: existing } = await supabase
      .from('leader_modules')
      .select('id, content')
      .eq('slug', curriculum.slug)
      .maybeSingle()

    if (existing && !force && existing.content && existing.content.length > 200) {
      console.log(`  skip ${curriculum.slug} (ja existe; use --force)`)
      continue
    }

    if (dryRun) {
      console.log(`  [dry-run] ${curriculum.slug}: ${title.slice(0, 60)}... (${payload.reading_time_minutes} min)`)
      continue
    }

    const { error } = await supabase.from('leader_modules').upsert(payload, { onConflict: 'slug' })
    if (error) {
      console.error(`  ERRO ${curriculum.slug}:`, error.message)
    } else {
      console.log(`  OK ${curriculum.slug} (mes ${monthNum})`)
    }
  }

  console.log('sync:manhigut concluido')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
