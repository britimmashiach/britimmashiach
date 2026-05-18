import type { User } from '@supabase/supabase-js'
import { buildSessionDisplay, type SessionDisplay } from '@/lib/session-display'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import type { Profile } from '@/types'

export type AuthSnapshot = {
  user: User | null
  profile: Profile | null
  sessionDisplay: SessionDisplay | null
}

const emptySnapshot: AuthSnapshot = {
  user: null,
  profile: null,
  sessionDisplay: null,
}

/** Sessão lida dos cookies no servidor (fonte confiável para header mobile). */
export async function getAuthSnapshot(): Promise<AuthSnapshot> {
  if (!hasSupabaseServerEnv()) return emptySnapshot

  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) return emptySnapshot

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

    return {
      user,
      profile: profile ?? null,
      sessionDisplay: buildSessionDisplay(user, profile ?? null),
    }
  } catch {
    return emptySnapshot
  }
}
