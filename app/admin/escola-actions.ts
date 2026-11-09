'use server'

import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { generateEscolaDiplomaPdf } from '@/lib/diploma-escola'
import { certificateCode } from '@/lib/escola-progress'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'
import { scoreQuestionnaire } from '@/lib/escola-questionnaire'
import { emailLayout, isResendConfigured, sendEmail } from '@/lib/email'

type Gate = { ok: true } | { ok: false; message: string }

export type AdminColacaoRow = {
  id: string
  created_at: string
  kind: string
  status: string
  user_id: string
  user_name: string | null
  user_email: string
  course_title: string
  stage_title: string
  stage_number: number
  score_pct: number
}

async function requireAdmin(): Promise<Gate & { adminId?: string }> {
  if (!hasSupabaseServerEnv() || !hasServiceRoleEnv()) {
    return { ok: false, message: 'Supabase admin não configurado.' }
  }
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Sessão inválida.' }
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (profile?.role !== 'admin') return { ok: false, message: 'Apenas admin.' }
  return { ok: true, adminId: user.id }
}

export async function countPendingColacaoAction(): Promise<number> {
  const gate = await requireAdmin()
  if (!gate.ok || !hasServiceRoleEnv()) return 0
  const admin = getSupabaseAdmin()
  const { count } = await admin
    .from('escola_colacao_queue')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'pending')
  return count ?? 0
}

export async function listPendingColacaoAction(): Promise<
  { ok: true; rows: AdminColacaoRow[] } | { ok: false; message: string }
> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { data, error } = await admin
    .from('escola_colacao_queue')
    .select('id, created_at, kind, status, user_id, course_id, stage_id, attempt_id')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  if (error) {
    if (error.message.includes('does not exist') || error.message.includes('schema cache')) {
      return { ok: true, rows: [] }
    }
    return { ok: false, message: error.message }
  }

  const rows: AdminColacaoRow[] = []
  for (const row of data ?? []) {
    const [{ data: profile }, { data: course }, { data: stage }, { data: attempt }] =
      await Promise.all([
        admin.from('profiles').select('full_name, email').eq('id', row.user_id).single(),
        admin.from('escola_courses').select('title').eq('id', row.course_id).single(),
        admin
          .from('escola_course_stages')
          .select('title, stage_number')
          .eq('id', row.stage_id)
          .single(),
        admin.from('escola_stage_attempts').select('score_pct').eq('id', row.attempt_id).single(),
      ])

    rows.push({
      id: row.id,
      created_at: row.created_at,
      kind: row.kind,
      status: row.status,
      user_id: row.user_id,
      user_name: profile?.full_name ?? null,
      user_email: profile?.email ?? '',
      course_title: course?.title ?? '',
      stage_title: stage?.title ?? '',
      stage_number: stage?.stage_number ?? 0,
      score_pct: attempt?.score_pct ?? 0,
    })
  }

  return { ok: true, rows }
}

async function finalizeCourseCompletion(
  admin: ReturnType<typeof getSupabaseAdmin>,
  userId: string,
  courseId: string,
  adminId: string,
) {
  const { data: course } = await admin
    .from('escola_courses')
    .select('slug, title, certification_title, profile_flag_on_complete')
    .eq('id', courseId)
    .single()

  if (!course) return

  const issuedAt = new Date()
  const code = certificateCode(course.slug, userId, issuedAt)

  await admin
    .from('escola_enrollments')
    .update({ status: 'completed', completed_at: issuedAt.toISOString() })
    .eq('user_id', userId)
    .eq('course_id', courseId)

  await admin.from('escola_diplomas').insert({
    user_id: userId,
    course_id: courseId,
    certificate_code: code,
    course_title: course.title,
    certification_title: course.certification_title,
    issued_at: issuedAt.toISOString(),
    issued_by: adminId,
  })

  if (course.profile_flag_on_complete === 'formacao_concluida') {
    await admin
      .from('profiles')
      .update({
        formacao_concluida: true,
        updated_at: issuedAt.toISOString(),
      })
      .eq('id', userId)
  }
}

export async function approveColacaoAction(
  colacaoId: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }
  if (!gate.adminId) return { ok: false, message: 'Admin não identificado.' }

  const admin = getSupabaseAdmin()
  const { data: colacao, error } = await admin
    .from('escola_colacao_queue')
    .select('id, user_id, course_id, stage_id, attempt_id, status')
    .eq('id', colacaoId)
    .single()

  if (error || !colacao) return { ok: false, message: 'Colação não encontrada.' }
  if (colacao.status !== 'pending') return { ok: false, message: 'Esta colação já foi resolvida.' }

  const { data: stage } = await admin
    .from('escola_course_stages')
    .select('stage_number, course_id')
    .eq('id', colacao.stage_id)
    .single()

  if (!stage) return { ok: false, message: 'Etapa não encontrada.' }

  const { count: stageCount } = await admin
    .from('escola_course_stages')
    .select('id', { count: 'exact', head: true })
    .eq('course_id', colacao.course_id)

  const now = new Date().toISOString()

  await admin
    .from('escola_colacao_queue')
    .update({
      status: 'approved',
      resolved_at: now,
      resolved_by: gate.adminId,
    })
    .eq('id', colacaoId)

  await admin
    .from('escola_stage_attempts')
    .update({ status: 'approved', reviewed_at: now, reviewed_by: gate.adminId })
    .eq('id', colacao.attempt_id)

  const isLastStage = stage.stage_number >= (stageCount ?? stage.stage_number)

  if (isLastStage) {
    await finalizeCourseCompletion(admin, colacao.user_id, colacao.course_id, gate.adminId)
  } else {
    const { data: enrollment } = await admin
      .from('escola_enrollments')
      .select('highest_unlocked_stage')
      .eq('user_id', colacao.user_id)
      .eq('course_id', colacao.course_id)
      .maybeSingle()

    const next = Math.max(
      enrollment?.highest_unlocked_stage ?? 1,
      stage.stage_number + 1,
    )
    await admin
      .from('escola_enrollments')
      .upsert(
        {
          user_id: colacao.user_id,
          course_id: colacao.course_id,
          highest_unlocked_stage: next,
          status: 'active',
        },
        { onConflict: 'user_id,course_id' },
      )
  }

  return { ok: true, message: 'Colação aprovada. Próxima etapa liberada ou curso concluído.' }
}

export async function rejectColacaoAction(
  colacaoId: string,
  note?: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }
  if (!gate.adminId) return { ok: false, message: 'Admin não identificado.' }

  const admin = getSupabaseAdmin()
  const { data: colacao } = await admin
    .from('escola_colacao_queue')
    .select('attempt_id, status')
    .eq('id', colacaoId)
    .single()

  if (!colacao || colacao.status !== 'pending') {
    return { ok: false, message: 'Colação inválida.' }
  }

  const now = new Date().toISOString()
  await admin
    .from('escola_colacao_queue')
    .update({
      status: 'rejected',
      resolved_at: now,
      resolved_by: gate.adminId,
      admin_note: note?.trim() || null,
    })
    .eq('id', colacaoId)

  await admin
    .from('escola_stage_attempts')
    .update({ status: 'rejected', reviewed_at: now, reviewed_by: gate.adminId })
    .eq('id', colacao.attempt_id)

  return { ok: true, message: 'Colação rejeitada. O membro pode refazer o questionário.' }
}

export async function sendEscolaDiplomaEmailAction(
  diplomaId: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }
  if (!isResendConfigured()) {
    return { ok: false, message: 'RESEND_API_KEY ausente.' }
  }

  const admin = getSupabaseAdmin()
  const { data: diploma } = await admin.from('escola_diplomas').select('*').eq('id', diplomaId).single()

  if (!diploma) return { ok: false, message: 'Diploma não encontrado.' }

  const { data: profile } = await admin
    .from('profiles')
    .select('email, full_name')
    .eq('id', diploma.user_id)
    .single()

  if (!profile) return { ok: false, message: 'Perfil não encontrado.' }
  const firstName = profile.full_name?.split(' ')[0] || profile.email.split('@')[0]

  const bytes = await generateEscolaDiplomaPdf({
    fullName: profile.full_name || profile.email,
    email: profile.email,
    certificationTitle: diploma.certification_title,
    courseTitle: diploma.course_title,
    bodyLine: `concluiu com aproveitamento o curso ${diploma.course_title}, recebendo o titulo de ${diploma.certification_title}, segundo o Metodo Rav EBBY.`,
    certificateCode: diploma.certificate_code,
    concludedAt: new Date(diploma.issued_at),
  })

  const base64 = Buffer.from(bytes).toString('base64')
  const safeName = (profile.full_name || 'diploma').replace(/[^\w\-]+/g, '-')

  const sent = await sendEmail({
    to: profile.email,
    subject: `Diploma ${diploma.certification_title}, Brit Im Mashiach`,
    html: emailLayout({
      title: 'Parabéns pela colação',
      bodyHtml: `<p>Shalom, ${firstName}. Segue em anexo o diploma de <strong>${diploma.certification_title}</strong>.</p><p>Rav.: EBBY</p>`,
    }),
    text: `Shalom, ${firstName}. Diploma em anexo. Rav.: EBBY`,
    attachments: [{ filename: `Diploma-${safeName}.pdf`, content: base64 }],
  })

  if (!sent) return { ok: false, message: 'Falha ao enviar e-mail (Resend).' }
  return { ok: true, message: `Diploma enviado para ${profile.email}` }
}

/** Apenas para testes: reexporta score do questionário no servidor. */
export async function gradeEscolaAnswers(
  questionnaire: EscolaQuestionnaire,
  answers: Record<string, string>,
): Promise<number> {
  return scoreQuestionnaire(questionnaire, answers)
}
