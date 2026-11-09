import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

export async function fetchEscolaStageBySlug(
  courseSlug: string,
  stageSlug: string,
): Promise<{
  stageId: string
  stageNumber: number
  title: string
  questionnaire: EscolaQuestionnaire
} | null> {
  if (!hasServiceRoleEnv()) return null
  const admin = getSupabaseAdmin()

  const { data: course } = await admin.from('escola_courses').select('id').eq('slug', courseSlug).maybeSingle()
  if (!course) return null

  const { data: stage } = await admin
    .from('escola_course_stages')
    .select('id, stage_number, title, questionnaire')
    .eq('course_id', course.id)
    .eq('slug', stageSlug)
    .maybeSingle()

  if (!stage) return null
  return {
    stageId: stage.id,
    stageNumber: stage.stage_number,
    title: stage.title,
    questionnaire: stage.questionnaire as EscolaQuestionnaire,
  }
}

export async function userHasPendingColacaoForStage(
  userId: string,
  courseSlug: string,
  stageSlug: string,
): Promise<boolean> {
  if (!hasServiceRoleEnv()) return false
  const admin = getSupabaseAdmin()
  const { data: course } = await admin.from('escola_courses').select('id').eq('slug', courseSlug).maybeSingle()
  if (!course) return false
  const { data: stage } = await admin
    .from('escola_course_stages')
    .select('id')
    .eq('course_id', course.id)
    .eq('slug', stageSlug)
    .maybeSingle()
  if (!stage) return false

  const { count } = await admin
    .from('escola_colacao_queue')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('course_id', course.id)
    .eq('stage_id', stage.id)
    .eq('status', 'pending')

  return (count ?? 0) > 0
}
