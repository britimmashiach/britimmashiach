'use server'

import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { scoreQuestionnaire } from '@/lib/escola-questionnaire'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

type Gate =
  | { ok: true; userId: string; isLeader: boolean; isAdmin: boolean }
  | { ok: false; message: string }

async function requireUser(): Promise<Gate> {
  if (!hasSupabaseServerEnv() || !hasServiceRoleEnv()) {
    return { ok: false, message: 'Servidor não configurado.' }
  }
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Entre na sua conta.' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_leader')
    .eq('id', user.id)
    .single()

  return {
    ok: true,
    userId: user.id,
    isLeader: Boolean(profile?.is_leader),
    isAdmin: profile?.role === 'admin',
  }
}

async function prerequisiteCompleted(
  admin: ReturnType<typeof getSupabaseAdmin>,
  userId: string,
  prerequisiteCourseId: string | null,
): Promise<boolean> {
  if (!prerequisiteCourseId) return true
  const { data } = await admin
    .from('escola_enrollments')
    .select('status')
    .eq('user_id', userId)
    .eq('course_id', prerequisiteCourseId)
    .maybeSingle()
  return data?.status === 'completed'
}

export async function ensureEscolaEnrollmentsAction(): Promise<
  { ok: true } | { ok: false; message: string }
> {
  const gate = await requireUser()
  if (!gate.ok) return { ok: false, message: gate.message }
  if (!gate.isLeader && !gate.isAdmin) {
    return { ok: false, message: 'Cursos sequenciais são para líderes aprovados.' }
  }

  const admin = getSupabaseAdmin()
  const { data: courses, error } = await admin
    .from('escola_courses')
    .select('id, slug, prerequisite_course_id, requires_leader')
    .eq('is_published', true)
    .order('sort_order')

  if (error) {
    if (error.message.includes('does not exist')) {
      return { ok: false, message: 'Execute a migration escola_courses e npm run seed:escola.' }
    }
    return { ok: false, message: error.message }
  }

  for (const course of courses ?? []) {
    if (course.requires_leader && !gate.isLeader && !gate.isAdmin) continue
    const prereqOk = await prerequisiteCompleted(admin, gate.userId, course.prerequisite_course_id)
    if (!prereqOk) continue

    await admin.from('escola_enrollments').upsert(
      {
        user_id: gate.userId,
        course_id: course.id,
        highest_unlocked_stage: 1,
        status: 'active',
      },
      { onConflict: 'user_id,course_id', ignoreDuplicates: true },
    )
  }

  return { ok: true }
}

export type EscolaCourseProgress = {
  slug: string
  title: string
  certificationTitle: string
  status: 'locked' | 'active' | 'completed'
  totalStages: number
  unlockedStage: number
  currentStageTitle: string | null
}

export async function listEscolaProgressAction(): Promise<
  { ok: true; courses: EscolaCourseProgress[] } | { ok: false; message: string }
> {
  const gate = await requireUser()
  if (!gate.ok) return { ok: false, message: gate.message }

  await ensureEscolaEnrollmentsAction()

  const admin = getSupabaseAdmin()
  const { data: courses } = await admin
    .from('escola_courses')
    .select('id, slug, title, certification_title, prerequisite_course_id, requires_leader, sort_order')
    .eq('is_published', true)
    .order('sort_order')

  const result: EscolaCourseProgress[] = []

  for (const course of courses ?? []) {
    if (course.requires_leader && !gate.isLeader && !gate.isAdmin) continue

    const prereqOk = await prerequisiteCompleted(admin, gate.userId, course.prerequisite_course_id)
    const { data: enrollment } = await admin
      .from('escola_enrollments')
      .select('highest_unlocked_stage, status')
      .eq('user_id', gate.userId)
      .eq('course_id', course.id)
      .maybeSingle()

    const { count } = await admin
      .from('escola_course_stages')
      .select('id', { count: 'exact', head: true })
      .eq('course_id', course.id)

    const total = count ?? 0
    let status: EscolaCourseProgress['status'] = 'locked'
    let unlocked = 0
    let currentTitle: string | null = null

    if (!prereqOk) {
      status = 'locked'
    } else if (enrollment?.status === 'completed') {
      status = 'completed'
      unlocked = total
    } else if (enrollment) {
      status = 'active'
      unlocked = enrollment.highest_unlocked_stage
      const { data: stage } = await admin
        .from('escola_course_stages')
        .select('title')
        .eq('course_id', course.id)
        .eq('stage_number', unlocked)
        .maybeSingle()
      currentTitle = stage?.title ?? null
    } else {
      status = 'locked'
    }

    result.push({
      slug: course.slug,
      title: course.title,
      certificationTitle: course.certification_title,
      status,
      totalStages: total,
      unlockedStage: unlocked,
      currentStageTitle: currentTitle,
    })
  }

  return { ok: true, courses: result }
}

export async function submitEscolaQuizAction(
  courseSlug: string,
  stageSlug: string,
  answers: Record<string, string>,
): Promise<
  | { ok: true; scorePct: number; apt: boolean; message: string }
  | { ok: false; message: string }
> {
  const gate = await requireUser()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()

  const { data: course } = await admin
    .from('escola_courses')
    .select('id, slug, requires_leader')
    .eq('slug', courseSlug)
    .single()

  if (!course) return { ok: false, message: 'Curso não encontrado.' }
  if (course.requires_leader && !gate.isLeader && !gate.isAdmin) {
    return { ok: false, message: 'Curso exclusivo para líderes.' }
  }

  const { data: stage } = await admin
    .from('escola_course_stages')
    .select('id, stage_number, questionnaire, passing_score_pct, title')
    .eq('course_id', course.id)
    .eq('slug', stageSlug)
    .single()

  if (!stage) return { ok: false, message: 'Etapa não encontrada.' }

  const { data: enrollment } = await admin
    .from('escola_enrollments')
    .select('highest_unlocked_stage, status')
    .eq('user_id', gate.userId)
    .eq('course_id', course.id)
    .maybeSingle()

  if (!enrollment || enrollment.status === 'completed') {
    return { ok: false, message: 'Matrícula inválida ou curso já concluído.' }
  }
  if (stage.stage_number > enrollment.highest_unlocked_stage) {
    return { ok: false, message: 'Conclua as etapas anteriores antes desta.' }
  }

  const questionnaire = stage.questionnaire as EscolaQuestionnaire
  const scorePct = scoreQuestionnaire(questionnaire, answers)
  const apt = scorePct >= (stage.passing_score_pct ?? 70)

  const { data: attempt, error: attErr } = await admin
    .from('escola_stage_attempts')
    .insert({
      user_id: gate.userId,
      stage_id: stage.id,
      answers,
      score_pct: scorePct,
      is_apt: apt,
      status: apt ? 'awaiting_colacao' : 'rejected',
    })
    .select('id')
    .single()

  if (attErr) return { ok: false, message: attErr.message }

  if (!apt) {
    return {
      ok: true,
      scorePct,
      apt: false,
      message: `Nota ${scorePct}%. Refaça o questionário da etapa ${stage.title}.`,
    }
  }

  await admin.from('escola_colacao_queue').insert({
    user_id: gate.userId,
    course_id: course.id,
    stage_id: stage.id,
    attempt_id: attempt.id,
    kind: 'stage',
    status: 'pending',
  })

  return {
    ok: true,
    scorePct,
    apt: true,
    message: `Apto (${scorePct}%). Aguardando colação do Rav no site.`,
  }
}
