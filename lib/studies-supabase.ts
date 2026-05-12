import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import {
  PLACEHOLDER_STUDIES,
  getPlaceholderStudyBySlug,
  mergeStudySlugsFromDb,
} from '@/lib/placeholder-studies'

export interface Study {
  slug: string
  title: string
  titleHebrew: string
  excerpt: string
  content: string
  category: string
  readingTime: number
  isPremium: boolean
  tags: string[]
  publishedAt: string
}

type StudyRow = Database['public']['Tables']['studies']['Row']

function normalizeRow(row: StudyRow): Study {
  return {
    slug: row.slug,
    title: row.title,
    titleHebrew: row.title_hebrew ?? '',
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    readingTime: row.reading_time_minutes,
    isPremium: row.is_premium,
    tags: row.tags ?? [],
    publishedAt: row.published_at,
  }
}

function seedStudyToStudy(s: (typeof PLACEHOLDER_STUDIES)[number]): Study {
  return {
    slug: s.slug,
    title: s.title,
    titleHebrew: s.titleHebrew,
    excerpt: s.excerpt,
    content: s.content,
    category: s.category,
    readingTime: s.readingTime,
    isPremium: s.isPremium,
    tags: s.tags,
    publishedAt: s.publishedAt,
  }
}

function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[studies]', ...args)
  }
}

function devWarn(...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[studies]', ...args)
  }
}

// Usado em generateStaticParams (build time, sem contexto de request/cookies)
export async function fetchStudySlugs(): Promise<{ slug: string }[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return PLACEHOLDER_STUDIES.map((s) => ({ slug: s.slug }))

  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('studies')
      .select('slug')
      .order('published_at', { ascending: false })
    if (error) throw error
    const dbSlugs = (data ?? []).map((s) => ({ slug: s.slug }))
    devLog(`fetchStudySlugs: ${dbSlugs.length} slugs (DB)`)
    return mergeStudySlugsFromDb(dbSlugs)
  } catch (err) {
    devWarn('fetchStudySlugs falhou:', err)
    return mergeStudySlugsFromDb([])
  }
}

export async function fetchStudies(): Promise<Study[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return PLACEHOLDER_STUDIES.map(seedStudyToStudy)
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('studies')
      .select('*')
      .order('published_at', { ascending: false })
    if (error) throw error
    const rows = (data ?? []).map(normalizeRow)
    devLog(`fetchStudies: ${rows.length} estudos (DB)`)
    if (rows.length > 0) return rows
    return PLACEHOLDER_STUDIES.map(seedStudyToStudy)
  } catch (err) {
    devWarn('fetchStudies falhou:', err)
    return PLACEHOLDER_STUDIES.map(seedStudyToStudy)
  }
}

export async function fetchStudyBySlug(slug: string): Promise<Study | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) {
    const ph = getPlaceholderStudyBySlug(slug)
    return ph ? seedStudyToStudy(ph) : null
  }
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('studies')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    if (data) return normalizeRow(data)
    const ph = getPlaceholderStudyBySlug(slug)
    return ph ? seedStudyToStudy(ph) : null
  } catch (err) {
    devWarn(`fetchStudyBySlug slug="${slug}" falhou:`, err)
    const ph = getPlaceholderStudyBySlug(slug)
    return ph ? seedStudyToStudy(ph) : null
  }
}
