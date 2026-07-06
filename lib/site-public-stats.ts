import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import type { LiveProfileCounts, SitePublicStats } from '@/lib/site-public-stats-shared'

export type { LiveProfileCounts, SitePublicStats, SitePublicStatsPayload } from '@/lib/site-public-stats-shared'
export { formatPublicStat } from '@/lib/site-public-stats-shared'

const EMPTY: SitePublicStats = {
  members: 0,
  visitors: 0,
  leaders: 0,
  mestres: 0,
  updatedAt: null,
}

function rowToStats(row: {
  members_count: number
  visitors_count: number
  leaders_count: number
  mestres_count: number
  updated_at: string
}): SitePublicStats {
  return {
    members: row.members_count,
    visitors: row.visitors_count,
    leaders: row.leaders_count,
    mestres: row.mestres_count,
    updatedAt: row.updated_at,
  }
}

/** Valores exibidos na home (leitura pública via RLS). */
export async function fetchSitePublicStats(): Promise<SitePublicStats> {
  if (!hasSupabaseServerEnv()) return EMPTY

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('site_public_stats')
      .select('members_count, visitors_count, leaders_count, mestres_count, updated_at')
      .eq('id', 1)
      .maybeSingle()

    if (error || !data) return EMPTY
    return rowToStats(data)
  } catch {
    return EMPTY
  }
}

/** Contagens reais em profiles (somente admin / service role). */
export async function fetchLiveProfileCounts(): Promise<LiveProfileCounts | null> {
  if (!hasServiceRoleEnv()) return null

  const admin = getSupabaseAdmin()
  const [membersRes, leadersRes, mestresRes] = await Promise.all([
    admin.from('profiles').select('id', { count: 'exact', head: true }),
    admin.from('profiles').select('id', { count: 'exact', head: true }).eq('is_leader', true),
    admin.from('profiles').select('id', { count: 'exact', head: true }).eq('is_mestre', true),
  ])

  return {
    members: membersRes.count ?? 0,
    leaders: leadersRes.count ?? 0,
    mestres: mestresRes.count ?? 0,
  }
}
