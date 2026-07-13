'use server'

import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { profileHasLeaderAccess, profileHasMestreAccess } from '@/lib/leader-access-policy'
import { notifyAuthorOfPrayerResponse } from '@/lib/prayer-notifications'

type Gate = { ok: true; userId: string; fullName: string | null } | { ok: false; message: string }

/** Admin, líder aprovado ou mestre — todos podem acompanhar e responder pedidos de oração. */
async function requireLeaderOrMestre(): Promise<Gate> {
  if (!hasSupabaseServerEnv()) {
    return { ok: false, message: 'Supabase não configurado no servidor.' }
  }
  if (!hasServiceRoleEnv()) {
    return { ok: false, message: 'SUPABASE_SERVICE_ROLE_KEY ausente no servidor.' }
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Sessão inválida. Entre novamente.' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_leader, is_mestre, full_name')
    .eq('id', user.id)
    .single()

  if (!profile || !(profileHasLeaderAccess(profile) || profileHasMestreAccess(profile))) {
    return { ok: false, message: 'Apenas líderes aprovados, mestres ou administradores podem responder pedidos.' }
  }

  return { ok: true, userId: user.id, fullName: profile.full_name }
}

type SimpleResult = { ok: true; message: string } | { ok: false; message: string }

const PRAYER_STATUSES = new Set(['novo', 'em_oracao', 'respondido', 'arquivado'])

export type LeaderPrayerRow = {
  id: string
  contact_name: string | null
  contact_email: string | null
  user_id: string | null
  message: string
  is_anonymous: boolean
  status: string
  response_text: string | null
  responded_at: string | null
  created_at: string
}

export async function listLeaderPrayerRequestsAction(): Promise<
  { ok: true; requests: LeaderPrayerRow[] } | { ok: false; message: string }
> {
  const gate = await requireLeaderOrMestre()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { data, error } = await admin
    .from('prayer_requests')
    .select(
      'id, contact_name, contact_email, user_id, message, is_anonymous, status, response_text, responded_at, created_at',
    )
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) return { ok: false, message: error.message }
  return { ok: true, requests: data ?? [] }
}

export async function respondPrayerRequestAction(id: string, responseText: string): Promise<SimpleResult> {
  const gate = await requireLeaderOrMestre()
  if (!gate.ok) return { ok: false, message: gate.message }

  const trimmed = responseText.trim()
  if (trimmed.length < 3) {
    return { ok: false, message: 'Escreva uma resposta antes de enviar.' }
  }
  if (trimmed.length > 4000) {
    return { ok: false, message: 'Resposta muito longa (máximo 4000 caracteres).' }
  }

  const admin = getSupabaseAdmin()
  const { data: original, error: findErr } = await admin
    .from('prayer_requests')
    .select('id, user_id, contact_name, contact_email, message, is_anonymous')
    .eq('id', id)
    .maybeSingle()

  if (findErr) return { ok: false, message: findErr.message }
  if (!original) return { ok: false, message: 'Pedido de oração não encontrado.' }

  const { error: updateErr } = await admin
    .from('prayer_requests')
    .update({
      response_text: trimmed,
      responded_by: gate.userId,
      responded_at: new Date().toISOString(),
      status: 'respondido',
    })
    .eq('id', id)

  if (updateErr) return { ok: false, message: updateErr.message }

  await notifyAuthorOfPrayerResponse({
    userId: original.user_id,
    contactName: original.is_anonymous ? null : original.contact_name,
    contactEmail: original.is_anonymous ? null : original.contact_email,
    originalMessage: original.message,
    responseText: trimmed,
    responderName: gate.fullName,
  })

  return { ok: true, message: 'Resposta enviada. A pessoa foi notificada.' }
}

export async function updateLeaderPrayerStatusAction(id: string, status: string): Promise<SimpleResult> {
  const gate = await requireLeaderOrMestre()
  if (!gate.ok) return { ok: false, message: gate.message }
  if (!PRAYER_STATUSES.has(status)) return { ok: false, message: 'Status inválido.' }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('prayer_requests').update({ status }).eq('id', id)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Status atualizado.' }
}
