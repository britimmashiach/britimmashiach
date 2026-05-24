import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'

/**
 * Lider aprovado manualmente (is_leader) ou administrador.
 * Independente de premium: pagar R$ 47 nao libera o portal de lideres.
 */
export async function userHasLeaderAccess(): Promise<boolean> {
  if (!hasSupabaseServerEnv()) return false

  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return false

    if (hasServiceRoleEnv()) {
      const admin = getSupabaseAdmin()
      const { data } = await admin
        .from('profiles')
        .select('role, is_leader')
        .eq('id', user.id)
        .single()
      if (data?.role === 'admin') return true
      return Boolean(data?.is_leader)
    }

    const { data } = await supabase
      .from('profiles')
      .select('role, is_leader')
      .eq('id', user.id)
      .single()

    if (data?.role === 'admin') return true
    return Boolean(data?.is_leader)
  } catch {
    return false
  }
}
