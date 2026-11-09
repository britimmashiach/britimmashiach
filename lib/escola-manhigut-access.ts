import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'

export type EscolaManhigutAccess = {
  ready: boolean
  /** Mês/etapa Manhigut liberada (1–24). 0 = curso bloqueado. */
  unlockedStage: number
  manhigutCompleted: boolean
  avodatCompleted: boolean
  pendingColacao: boolean
}

const EMPTY: EscolaManhigutAccess = {
  ready: false,
  unlockedStage: 0,
  manhigutCompleted: false,
  avodatCompleted: false,
  pendingColacao: false,
}

export type EscolaModuleGate = 'open' | 'ahead' | 'not_published' | 'locked_prerequisite'

export function resolveEscolaModuleGate(
  monthNum: number,
  published: boolean,
  escola: EscolaManhigutAccess,
): EscolaModuleGate {
  if (!published) return 'not_published'
  if (!escola.ready) return 'ahead'
  if (!escola.avodatCompleted) return 'locked_prerequisite'
  if (escola.manhigutCompleted) return 'open'
  if (escola.unlockedStage < 1) return 'locked_prerequisite'
  if (monthNum <= escola.unlockedStage) return 'open'
  return 'ahead'
}

export async function fetchEscolaManhigutAccess(
  userId: string | null,
): Promise<EscolaManhigutAccess> {
  if (!userId || !hasServiceRoleEnv()) return EMPTY

  const admin = getSupabaseAdmin()

  const { data: avodatCourse, error: cErr } = await admin
    .from('escola_courses')
    .select('id')
    .eq('slug', 'avodat-hanefesh')
    .maybeSingle()

  if (cErr?.message?.includes('does not exist') || cErr?.message?.includes('schema cache')) {
    return EMPTY
  }

  const { data: manhigutCourse } = await admin
    .from('escola_courses')
    .select('id')
    .eq('slug', 'manhigut')
    .maybeSingle()

  if (!avodatCourse || !manhigutCourse) return { ...EMPTY, ready: false }

  const { data: avodatEnroll } = await admin
    .from('escola_enrollments')
    .select('status')
    .eq('user_id', userId)
    .eq('course_id', avodatCourse.id)
    .maybeSingle()

  const { data: manhigutEnroll } = await admin
    .from('escola_enrollments')
    .select('highest_unlocked_stage, status')
    .eq('user_id', userId)
    .eq('course_id', manhigutCourse.id)
    .maybeSingle()

  const { count: pendingColacao } = await admin
    .from('escola_colacao_queue')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('course_id', manhigutCourse.id)
    .eq('status', 'pending')

  return {
    ready: true,
    unlockedStage: manhigutEnroll?.highest_unlocked_stage ?? 0,
    manhigutCompleted: manhigutEnroll?.status === 'completed',
    avodatCompleted: avodatEnroll?.status === 'completed',
    pendingColacao: (pendingColacao ?? 0) > 0,
  }
}
