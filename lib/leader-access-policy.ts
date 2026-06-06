import type { Profile } from '@/types'

/** Admin ou is_leader aprovado pelo Rav. */
export function profileHasLeaderAccess(
  profile: Pick<Profile, 'role' | 'is_leader'> | null | undefined,
): boolean {
  if (!profile) return false
  if (profile.role === 'admin') return true
  return Boolean(profile.is_leader)
}

/**
 * Acesso ao material restrito das Imersões (manuais de facilitação):
 * admin, ou líder aprovado que concluiu a formação (formacao_concluida).
 */
export function profileHasConcludedFormation(
  profile: Pick<Profile, 'role' | 'is_leader' | 'formacao_concluida'> | null | undefined,
): boolean {
  if (!profile) return false
  if (profile.role === 'admin') return true
  return Boolean(profile.is_leader && profile.formacao_concluida)
}
