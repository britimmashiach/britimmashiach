'use server'

import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import type { UserRole } from '@/types'

type Gate = { ok: true } | { ok: false; message: string }

export type AdminMemberRow = {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
  banned_until: string | null
  last_sign_in_at: string | null
}

async function requireAdmin(): Promise<Gate> {
  if (!hasSupabaseServerEnv()) {
    return { ok: false, message: 'Supabase não configurado no servidor.' }
  }
  if (!hasServiceRoleEnv()) {
    return {
      ok: false,
      message:
        'SUPABASE_SERVICE_ROLE_KEY ausente na Vercel (Settings → Environment Variables). Necessária para operações de administração.',
    }
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Sessão inválida. Entre novamente.' }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') {
    return { ok: false, message: 'Apenas administradores podem aceder a estas funções.' }
  }

  return { ok: true }
}

async function getCallerId(): Promise<string | null> {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user?.id ?? null
}

function selfActionBlocked(callerId: string | null, targetId: string, verb: string): string | null {
  if (callerId && callerId === targetId) {
    return `Não pode ${verb} a sua própria conta.`
  }
  return null
}

export async function listMembersAction(
  page = 1,
  perPage = 25,
): Promise<
  | { ok: true; members: AdminMemberRow[]; nextPage: number | null; total: number; page: number; perPage: number }
  | { ok: false; message: string }
> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { data: listData, error: listErr } = await admin.auth.admin.listUsers({ page, perPage })
  if (listErr) return { ok: false, message: listErr.message }

  const users = listData.users ?? []
  const ids = users.map((u) => u.id)
  if (ids.length === 0) {
    return {
      ok: true,
      members: [],
      nextPage: null,
      total: listData.total ?? 0,
      page,
      perPage,
    }
  }

  const { data: profiles, error: profErr } = await admin
    .from('profiles')
    .select('id, email, full_name, role')
    .in('id', ids)

  if (profErr) return { ok: false, message: profErr.message }

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]))

  const members: AdminMemberRow[] = users.map((u) => {
    const p = profileMap.get(u.id)
    const role = (p?.role as UserRole | undefined) ?? 'free'
    return {
      id: u.id,
      email: u.email ?? p?.email ?? '',
      full_name: p?.full_name ?? null,
      role,
      created_at: u.created_at,
      banned_until: u.banned_until ?? null,
      last_sign_in_at: u.last_sign_in_at ?? null,
    }
  })

  return {
    ok: true,
    members,
    nextPage: listData.nextPage ?? null,
    total: listData.total ?? members.length,
    page,
    perPage,
  }
}

export async function promoteUserByEmailAction(
  email: string,
  role: UserRole,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const normalized = email.trim().toLowerCase()
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, message: 'Indique um e-mail válido.' }
  }

  const admin = getSupabaseAdmin()
  const trimmed = email.trim()
  let target =
    (await admin.from('profiles').select('id, email, role').eq('email', trimmed).maybeSingle()).data ?? null
  if (!target) {
    target =
      (await admin.from('profiles').select('id, email, role').eq('email', normalized).maybeSingle()).data ?? null
  }
  if (!target) {
    return { ok: false, message: 'Nenhum perfil com este e-mail.' }
  }

  const { error: updateErr } = await admin
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', target.id)

  if (updateErr) return { ok: false, message: updateErr.message }

  const label = role === 'admin' ? 'Administrador' : role === 'premium' ? 'Premium' : 'Membro (gratuito)'
  return { ok: true, message: `${target.email} → ${label}` }
}

export async function promoteUserByIdAction(
  userId: string,
  role: UserRole,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { data: target, error: findErr } = await admin
    .from('profiles')
    .select('id, email, role')
    .eq('id', userId)
    .maybeSingle()

  if (findErr) return { ok: false, message: findErr.message }
  if (!target) return { ok: false, message: 'Perfil não encontrado.' }

  const { error: updateErr } = await admin
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId)

  if (updateErr) return { ok: false, message: updateErr.message }

  const label = role === 'admin' ? 'Administrador' : role === 'premium' ? 'Premium' : 'Membro'
  return { ok: true, message: `${target.email} → ${label}` }
}

/** Banimento no Auth (não consegue iniciar sessão). ~100 anos. */
export async function banUserAction(
  userId: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const block = selfActionBlocked(await getCallerId(), userId, 'banir')
  if (block) return { ok: false, message: block }

  const admin = getSupabaseAdmin()
  const { error } = await admin.auth.admin.updateUserById(userId, { ban_duration: '876000h' })
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Utilizador banido.' }
}

export async function unbanUserAction(
  userId: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const block = selfActionBlocked(await getCallerId(), userId, 'desbanir')
  if (block) return { ok: false, message: block }

  const admin = getSupabaseAdmin()
  const { error } = await admin.auth.admin.updateUserById(userId, { ban_duration: 'none' })
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Banimento revogado.' }
}

/** Remove auth user (e linha em profiles por CASCADE, se configurado). */
export async function deleteUserAction(
  userId: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const block = selfActionBlocked(await getCallerId(), userId, 'excluir')
  if (block) return { ok: false, message: block }

  const admin = getSupabaseAdmin()
  const { error } = await admin.auth.admin.deleteUser(userId)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Conta removida do sistema de autenticação.' }
}
