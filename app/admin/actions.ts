'use server'

import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import type { UserRole } from '@/types'

type Gate = { ok: true } | { ok: false; message: string }

async function requireAdmin(): Promise<Gate> {
  if (!hasSupabaseServerEnv()) {
    return { ok: false, message: 'Supabase não configurado no servidor.' }
  }
  if (!hasServiceRoleEnv()) {
    return {
      ok: false,
      message:
        'SUPABASE_SERVICE_ROLE_KEY ausente na Vercel (Settings → Environment Variables). Necessária para alterar perfis de outros utilizadores.',
    }
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Sessão inválida. Entre novamente.' }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') {
    return { ok: false, message: 'Apenas administradores podem promover utilizadores.' }
  }

  return { ok: true }
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
    return { ok: false, message: 'Nenhum perfil com este e-mail. Confirme o texto (e confirme que já existe em profiles).' }
  }

  const { error: updateErr } = await admin
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', target.id)

  if (updateErr) return { ok: false, message: updateErr.message }

  const label = role === 'admin' ? 'Administrador' : role === 'premium' ? 'Premium' : 'Membro (gratuito)'
  return { ok: true, message: `${target.email} → ${label}` }
}
