import type { Profile } from '@/types'

/** Admin ou is_leader aprovado pelo Rav. */
export function profileHasLeaderAccess(
  profile: Pick<Profile, 'role' | 'is_leader'> | null | undefined,
): boolean {
  if (!profile) return false
  if (profile.role === 'admin') return true
  return Boolean(profile.is_leader)
}
