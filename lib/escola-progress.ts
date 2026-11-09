import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

export type EscolaCourseRow = {
  id: string
  slug: string
  title: string
  certification_title: string
  subtitle: string
  prerequisite_course_id: string | null
  requires_leader: boolean
  profile_flag_on_complete: string | null
}

export type EscolaStageRow = {
  id: string
  course_id: string
  stage_number: number
  slug: string
  title: string
  subtitle: string
  passing_score_pct: number
  questionnaire: EscolaQuestionnaire
}

export type EscolaEnrollmentRow = {
  id: string
  user_id: string
  course_id: string
  highest_unlocked_stage: number
  status: 'active' | 'completed'
}

export function stageIsUnlocked(
  enrollment: Pick<EscolaEnrollmentRow, 'highest_unlocked_stage' | 'status'>,
  stageNumber: number,
): boolean {
  if (enrollment.status === 'completed') return true
  return stageNumber <= enrollment.highest_unlocked_stage
}

export function nextStageNumber(current: number, max: number): number | null {
  if (current >= max) return null
  return current + 1
}

export function certificateCode(courseSlug: string, userId: string, issuedAt: Date): string {
  const y = issuedAt.getFullYear()
  const short = userId.replace(/-/g, '').slice(0, 8).toUpperCase()
  return `BIM-${courseSlug.toUpperCase().slice(0, 12)}-${y}-${short}`
}
