import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

/** Membro ou admin com acesso ao conteúdo de Parashot marcadas como premium no banco. */
export async function userHasPremiumParashaAccess(): Promise<boolean> {
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
