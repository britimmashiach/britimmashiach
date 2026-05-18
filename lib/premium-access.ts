import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'

/** Membro premium ou admin tem acesso a qualquer conteúdo marcado como is_premium=true. */
export async function userHasPremiumAccess(): Promise<boolean> {
  return userHasPremiumOrAdminAccess()
}

/** Premium, admin ou service role em rotas internas. */
export async function userHasPremiumOrAdminAccess(): Promise<boolean> {
  if (!hasSupabaseServerEnv()) return false
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) return false

    const role = await readProfileRole(user.id, supabase)
    return role === 'premium' || role === 'admin'
  } catch {
    return false
  }
}

async function readProfileRole(
  userId: string,
  userClient: Awaited<ReturnType<typeof createServerSupabaseClient>>,
): Promise<string | null> {
  if (hasServiceRoleEnv()) {
    const admin = getSupabaseAdmin()
    const { data } = await admin.from('profiles').select('role').eq('id', userId).single()
    if (data?.role) return data.role
  }
  const { data } = await userClient.from('profiles').select('role').eq('id', userId).single()
  return data?.role ?? null
}
