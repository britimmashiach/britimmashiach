import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import type { Database } from '@/types/database'

export type LeaderAnnouncement = Database['public']['Tables']['leader_announcements']['Row']
export type LeaderResource = Database['public']['Tables']['leader_resources']['Row']

/**
 * Avisos do Rav publicados, fixados primeiro e depois por data.
 * As rotas que consomem já passam por LeaderPortalGuard, então usamos o
 * cliente admin (service role) para leitura confiável quando disponível.
 */
export async function fetchLeaderAnnouncements(limit = 20): Promise<LeaderAnnouncement[]> {
  if (!hasServiceRoleEnv()) return []
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('leader_announcements')
      .select('*')
      .eq('is_published', true)
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[leader-portal] announcements:', error.message)
      }
      return []
    }
    return data ?? []
  } catch {
    return []
  }
}

/** Recursos/PDFs exclusivos publicados, por sort_order e depois data. */
export async function fetchLeaderResources(limit = 60): Promise<LeaderResource[]> {
  if (!hasServiceRoleEnv()) return []
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('leader_resources')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[leader-portal] resources:', error.message)
      }
      return []
    }
    return data ?? []
  } catch {
    return []
  }
}

/** Apenas o título dos avisos marcados para a página inicial (todos veem). */
export type HomeAnnouncement = Pick<LeaderAnnouncement, 'id' | 'title' | 'created_at'>

/**
 * Títulos de avisos liberados para a home (show_on_home + is_published).
 * Só o título é exposto publicamente; o corpo permanece no portal de líderes.
 */
export async function fetchHomeAnnouncements(limit = 3): Promise<HomeAnnouncement[]> {
  if (!hasServiceRoleEnv()) return []
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('leader_announcements')
      .select('id, title, created_at')
      .eq('is_published', true)
      .eq('show_on_home', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[leader-portal] home announcements:', error.message)
      }
      return []
    }
    return data ?? []
  } catch {
    return []
  }
}

export function formatAnnouncementDatePt(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
