import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

/** Membro premium ou admin tem acesso a qualquer conteúdo marcado como is_premium=true. */
export async function userHasPremiumAccess(): Promise<boolean> {
  if (!hasSupabaseServerEnv()) return false
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) return false
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    return profile != null && (profile.role === 'premium' || profile.role === 'admin')
  } catch {
    return false
  }
}
