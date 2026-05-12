import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

type ParashaRow = Database['public']['Tables']['parashot']['Row']
type AliyahRow = Database['public']['Tables']['aliyot']['Row']

export interface Parasha {
  id: string
  slug: string
  name: string
  nameHebrew: string
  book: string
  weekNumber: number
  haftarah: string
  haftarahHebrew: string
  summary: string
  isPremium: boolean
  pdfUrl: string | null
  pdfPremiumUrl: string | null
  pdfKabbalahUrl: string | null
  publishedAt: string
}

export interface Aliyah {
  id: string
  parashaId: string
  aliyahNumber: number
  dayOfWeek: number
  title: string
  content: string
  levelPardes: string[]
  pdfUrl: string | null
  pdfPremiumUrl: string | null
  pdfKabbalahUrl: string | null
}

function normalizeParasha(row: ParashaRow): Parasha {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameHebrew: row.name_hebrew,
    book: row.book,
    weekNumber: row.week_number,
    haftarah: row.haftarah,
    haftarahHebrew: row.haftarah_hebrew,
    summary: row.summary,
    isPremium: row.is_premium,
    pdfUrl: row.pdf_url ?? null,
    pdfPremiumUrl: row.pdf_premium_url ?? null,
    pdfKabbalahUrl: row.pdf_kabbalah_url ?? null,
    publishedAt: row.published_at,
  }
}

function normalizeAliyah(row: AliyahRow): Aliyah {
  return {
    id: row.id,
    parashaId: row.parasha_id,
    aliyahNumber: row.aliyah_number,
    dayOfWeek: row.day_of_week,
    title: row.title,
    content: row.content,
    levelPardes: row.level_pardes ?? [],
    pdfUrl: row.pdf_url ?? null,
    pdfPremiumUrl: row.pdf_premium_url ?? null,
    pdfKabbalahUrl: row.pdf_kabbalah_url ?? null,
  }
}

function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[parashot]', ...args)
  }
}

function devWarn(...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[parashot]', ...args)
  }
}

// Usado em generateStaticParams (build time, sem contexto de request/cookies)
export async function fetchParashaSlugs(): Promise<{ slug: string }[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return []
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('parashot')
      .select('slug')
      .order('week_number', { ascending: true })
    if (error) throw error
    devLog(`fetchParashaSlugs: ${(data ?? []).length} slugs`)
    return (data ?? []).map((p) => ({ slug: p.slug }))
  } catch (err) {
    devWarn('fetchParashaSlugs falhou:', err)
    return []
  }
}

export async function fetchParashot(): Promise<Parasha[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return []
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('parashot')
      .select('*')
      .order('week_number', { ascending: true })
    if (error) throw error
    devLog(`fetchParashot: ${(data ?? []).length} parashot`)
    return (data ?? []).map(normalizeParasha)
  } catch (err) {
    devWarn('fetchParashot falhou:', err)
    return []
  }
}

export async function fetchParashaBySlug(slug: string): Promise<Parasha | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return null
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('parashot')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data ? normalizeParasha(data) : null
  } catch (err) {
    devWarn(`fetchParashaBySlug slug="${slug}" falhou:`, err)
    return null
  }
}

export async function fetchAliyotByParasha(parashaId: string): Promise<Aliyah[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return []
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('aliyot')
      .select('*')
      .eq('parasha_id', parashaId)
      .order('aliyah_number', { ascending: true })
    if (error) throw error
    devLog(`fetchAliyotByParasha: ${(data ?? []).length} aliyot`)
    return (data ?? []).map(normalizeAliyah)
  } catch (err) {
    devWarn(`fetchAliyotByParasha falhou:`, err)
    return []
  }
}
