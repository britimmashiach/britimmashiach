import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { profileHasLeaderAccess } from '@/lib/leader-access-policy'

export { profileHasLeaderAccess } from '@/lib/leader-access-policy'

/**
 * Líder aprovado manualmente (is_leader) ou administrador.
 * Independente de premium: pagar R$ 47 não libera o portal de líderes.
 */
export async function userHasLeaderAccess(): Promise<boolean> {
  if (!hasSupabaseServerEnv()) return false

  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return false

    const db = hasServiceRoleEnv() ? getSupabaseAdmin() : supabase

    const { data: roleRow, error: roleErr } = await db
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (roleErr || !roleRow) return false
    if (roleRow.role === 'admin') return true

    const { data: leaderRow, error: leaderErr } = await db
      .from('profiles')
      .select('is_leader')
      .eq('id', user.id)
      .maybeSingle()

    if (leaderErr) return false
    return Boolean(leaderRow?.is_leader)
  } catch {
    return false
  }
}
