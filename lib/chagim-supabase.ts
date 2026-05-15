import { createClient } from '@supabase/supabase-js'
import { getPlaceholderChagBySlug } from '@/lib/chagim-placeholders'
import type { Database } from '@/types/database'

type ChagRow = Database['public']['Tables']['chagim']['Row']
type ChagSectionRow = Database['public']['Tables']['chag_sections']['Row']

export interface Chag {
  id: string
  slug: string
  name: string
  nameHebrew: string
  category: string
  monthHebrew: string
  dayStart: number
  durationDays: number
  summary: string
  content: string
  levelPardes: string[]
  isPremium: boolean
  pdfUrl: string | null
  pdfPremiumUrl: string | null
  pdfKabbalahUrl: string | null
  publishedAt: string
}

export interface ChagSection {
  id: string
  chagId: string
  orderNum: number
  title: string
  content: string
  levelPardes: string[]
  isPremium: boolean
  pdfUrl: string | null
}

function normalizeChag(row: ChagRow): Chag {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameHebrew: row.name_hebrew,
    category: row.category,
    monthHebrew: row.month_hebrew ?? '',
    dayStart: row.day_start ?? 1,
    durationDays: row.duration_days,
    summary: row.summary,
    content: row.content,
    levelPardes: row.level_pardes ?? [],
    isPremium: row.is_premium,
    pdfUrl: row.pdf_url ?? null,
    pdfPremiumUrl: row.pdf_premium_url ?? null,
    pdfKabbalahUrl: row.pdf_kabbalah_url ?? null,
    publishedAt: row.published_at,
  }
}

export function normalizeChagSection(row: ChagSectionRow): ChagSection {
  return {
    id: row.id,
    chagId: row.chag_id,
    orderNum: row.order_num,
    title: row.title,
    content: row.content,
    levelPardes: row.level_pardes ?? [],
    isPremium: row.is_premium,
    pdfUrl: row.pdf_url ?? null,
  }
}

function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[chagim]', ...args)
  }
}

function devWarn(...args: unknown[]) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[chagim]', ...args)
  }
}

export async function fetchChagimSlugs(): Promise<{ slug: string }[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return []
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('chagim')
      .select('slug')
      .order('published_at', { ascending: true })
    if (error) throw error
    return (data ?? []).map((c) => ({ slug: c.slug }))
  } catch (err) {
    devWarn('fetchChagimSlugs falhou:', err)
    return []
  }
}

export async function fetchChagim(): Promise<Chag[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return []
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('chagim')
      .select('*')
      .order('published_at', { ascending: true })
    if (error) throw error
    devLog(`fetchChagim: ${(data ?? []).length} chagim`)
    return (data ?? []).map(normalizeChag)
  } catch (err) {
    devWarn('fetchChagim falhou:', err)
    return []
  }
}

export async function fetchChagBySlug(slug: string): Promise<Chag | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return null
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('chagim')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data ? normalizeChag(data) : null
  } catch (err) {
    devWarn(`fetchChagBySlug slug="${slug}" falhou:`, err)
    return null
  }
}

export async function fetchChagSectionsByChagId(chagId: string): Promise<ChagSection[]> {
  if (chagId.startsWith('ph-')) return []
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return []
  try {
    const supabase = createClient<Database>(url, key)
    const { data, error } = await supabase
      .from('chag_sections')
      .select('*')
      .eq('chag_id', chagId)
      .order('order_num', { ascending: true })
    if (error) throw error
    return (data ?? []).map(normalizeChagSection)
  } catch (err) {
    devWarn(`fetchChagSectionsByChagId chagId="${chagId}" falhou:`, err)
    return []
  }
}

/** Resolve Chag do banco ou placeholder editorial (build/SEO sem Supabase). */
export async function resolveChagBySlug(slug: string): Promise<Chag | null> {
  const fromDb = await fetchChagBySlug(slug)
  if (fromDb) return fromDb
  return getPlaceholderChagBySlug(slug)
}
