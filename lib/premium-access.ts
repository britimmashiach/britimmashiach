import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { profileHasActivePremium, type PremiumProfileSlice } from '@/lib/premium-subscription'

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

    const profile = await readPremiumProfile(user.id, supabase)
    return profileHasActivePremium(profile)
  } catch {
    return false
  }
}

async function readPremiumProfile(
  userId: string,
  userClient: Awaited<ReturnType<typeof createServerSupabaseClient>>,
): Promise<PremiumProfileSlice | null> {
  const fields = 'role, subscription_status, subscription_current_period_end' as const

  if (hasServiceRoleEnv()) {
    const admin = getSupabaseAdmin()
    const { data } = await admin.from('profiles').select(fields).eq('id', userId).single()
    if (data) return data
  }

  const { data } = await userClient.from('profiles').select(fields).eq('id', userId).single()
  return data ?? null
}
