import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export type EscolaStageUserStatus =
  | { kind: 'open' }
  | { kind: 'awaiting_colacao'; scorePct: number }
  | { kind: 'approved'; scorePct: number }
  | { kind: 'rejected'; scorePct: number }

export async function getEscolaStageUserStatus(
  admin: SupabaseClient<Database>,
  userId: string,
  stageId: string,
): Promise<EscolaStageUserStatus> {
  const { data: attempt } = await admin
    .from('escola_stage_attempts')
    .select('status, score_pct, is_apt')
    .eq('user_id', userId)
    .eq('stage_id', stageId)
    .order('submitted_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!attempt) return { kind: 'open' }
  if (attempt.status === 'approved') return { kind: 'approved', scorePct: attempt.score_pct }
  if (attempt.status === 'awaiting_colacao' || (attempt.is_apt && attempt.status !== 'rejected')) {
    return { kind: 'awaiting_colacao', scorePct: attempt.score_pct }
  }
  if (attempt.status === 'rejected') return { kind: 'rejected', scorePct: attempt.score_pct }
  return { kind: 'open' }
}
