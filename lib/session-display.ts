import type { User } from '@supabase/supabase-js'
import type { Profile, UserRole } from '@/types'

/** Dados derivados para avatar / badge no header. */
export type SessionDisplay = {
  firstName: string
  initials: string
  role: UserRole
  email: string
}

export function buildSessionDisplay(user: User, profile: Profile | null): SessionDisplay {
  const email = user.email ?? ''
  const metaName =
    typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name.trim() : ''
  const full = profile?.full_name?.trim() || metaName
  const display = full || email.split('@')[0] || 'Conta'
  const firstName = display.split(/\s+/).filter(Boolean)[0] || 'Conta'
  const initialsSource = full || email || 'U'
  const parts = initialsSource.split(/\s+/).filter(Boolean)
  const initials =
    parts.length >= 2
      ? `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
      : (parts[0]?.slice(0, 2).toUpperCase() || 'U')
  const role: UserRole = profile?.role ?? 'free'
  return { firstName, initials, role, email }
}
