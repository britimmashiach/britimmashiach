import { createClient } from '@supabase/supabase-js'
import { readdir, readFile } from 'fs/promises'
import { join, resolve } from 'path'
import {
  MANHIGUT_CURRICULUM,
  getCurriculumByMonth,
  type ManhigutCurriculumEntry,
} from '@/lib/manhigut-curriculum'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import type { Database } from '@/types/database'

export type ManhigutModuleStatus = 'available' | 'preparing'

export interface ManhigutModule {
  slug: string
  monthNum: number
  stage: number
  stageLabel: string
  title: string
  subtitle: string
  excerpt: string
  content: string
  readingTimeMinutes: number
  isCapstone: boolean
  status: ManhigutModuleStatus
}

type LeaderModuleRow = Database['public']['Tables']['leader_modules']['Row']

const FILE_RE = /^BeitMidrash_Manhig_Mes_(\d+)_(.+)\.md$/i

const SINAGOGA_ROOT = resolve(
  process.env.SINAGOGA_ROOT ?? join(process.cwd(), '..', '..', '..'),
)

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

  return paragraph?.slice(0, 420) ?? ''
}

function stripCoverLines(raw: string): string {
  const lines = raw.replace(/\r\n/g, '\n').split('\n')
  const startIdx = lines.findIndex((l) => /^## Boker Tov!/i.test(l.trim()))
  if (startIdx >= 0) return lines.slice(startIdx).join('\n').trim()
  const h1 = lines.findIndex((l) => l.startsWith('# '))
  if (h1 >= 0) return lines.slice(h1 + 1).join('\n').trim()
  return raw.trim()
}

function mergeWithCurriculum(
  curriculum: ManhigutCurriculumEntry,
  row?: Partial<LeaderModuleRow> | null,
): ManhigutModule {
  const hasContent = Boolean(row?.content && row.content.length > 200 && row.is_published)
  return {
    slug: row?.slug ?? curriculum.slug,
    monthNum: curriculum.monthNum,
    stage: curriculum.stage,
    stageLabel: row?.stage_label ?? curriculum.stageLabel,
    title: row?.title ?? curriculum.title,
    subtitle: row?.subtitle ?? curriculum.subtitle,
    excerpt: row?.excerpt ?? '',
    content: row?.content ?? '',
    readingTimeMinutes: row?.reading_time_minutes ?? 20,
    isCapstone: curriculum.isCapstone,
    status: hasContent ? 'available' : 'preparing',
  }
}

export function buildManhigutModuleList(rows: LeaderModuleRow[]): ManhigutModule[] {
  const byMonth = new Map(rows.map((r) => [r.month_num, r]))
  return MANHIGUT_CURRICULUM.map((entry) => mergeWithCurriculum(entry, byMonth.get(entry.monthNum)))
}

async function fetchPublishedRowsAdmin(): Promise<LeaderModuleRow[]> {
  if (!hasServiceRoleEnv()) return []
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('leader_modules')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[manhigut] supabase admin fetch:', error.message)
    }
    return []
  }
  return data ?? []
}

async function fetchPublishedRowsAnon(userId: string | null): Promise<LeaderModuleRow[]> {
  if (!userId) return []
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return []

  const supabase = createClient<Database>(url, key)
  const { data, error } = await supabase
    .from('leader_modules')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[manhigut] supabase anon fetch:', error.message)
    }
    return []
  }
  return data ?? []
}

/** Fallback local quando a migration ainda não rodou ou sync pendente. */
export async function loadLocalManhigutModules(): Promise<LeaderModuleRow[]> {
  const dir = join(SINAGOGA_ROOT, 'manhigut')
  let files: string[]
  try {
    files = await readdir(dir)
  } catch {
    return []
  }

  const rows: LeaderModuleRow[] = []

  for (const file of files) {
    const match = file.match(FILE_RE)
    if (!match) continue

    const monthNum = Number(match[1])
    const curriculum = getCurriculumByMonth(monthNum)
    if (!curriculum) continue

    const raw = await readFile(join(dir, file), 'utf-8')
    const content = stripCoverLines(raw)
    const titleLine = raw.match(/^#\s+(.+)$/m)?.[1]?.replace(/^Beit Midrash do Manhig,\s*/i, '') ?? curriculum.title
    const subtitleMatch = raw.match(/^\*\*(Módulo.+?)\*\*/m)
    const excerpt = extractExcerpt(raw)

    rows.push({
      id: `local-${monthNum}`,
      slug: curriculum.slug,
      month_num: monthNum,
      stage: curriculum.stage,
      stage_label: curriculum.stageLabel,
      title: titleLine.includes(',') ? titleLine.split(',').slice(1).join(',').trim() : curriculum.title,
      subtitle: subtitleMatch?.[1] ?? curriculum.subtitle,
      excerpt,
      content,
      is_published: true,
      reading_time_minutes: estimateReadingMinutes(content),
      sort_order: monthNum,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  return rows.sort((a, b) => a.month_num - b.month_num)
}

export async function fetchManhigutModulesForLeader(userId: string | null): Promise<ManhigutModule[]> {
  let rows = await fetchPublishedRowsAnon(userId)
  if (rows.length === 0 && hasServiceRoleEnv()) {
    rows = await fetchPublishedRowsAdmin()
  }
  if (rows.length === 0) {
    rows = await loadLocalManhigutModules()
  }
  return buildManhigutModuleList(rows)
}

export async function fetchManhigutModuleBySlug(
  slug: string,
  userId: string | null,
): Promise<ManhigutModule | null> {
  const modules = await fetchManhigutModulesForLeader(userId)
  return modules.find((m) => m.slug === slug) ?? null
}

export async function fetchManhigutModuleSlugs(): Promise<{ slug: string }[]> {
  return MANHIGUT_CURRICULUM.map((m) => ({ slug: m.slug }))
}
