import type { Profile } from '@/types'

/** Meses do programa Manhigut (1 modulo por mes civil a partir de leader_since). */
export const MANHIGUT_TOTAL_MONTHS = 24

/**
 * Mes civil atual do Talmid no Manhigut.
 * Mes 1 = mes da aprovacao como lider; a cada mes civil completo avanca 1.
 */
export function computeManhigutCurrentMonth(
  leaderSince: Date,
  now: Date = new Date(),
): number {
  let months =
    (now.getFullYear() - leaderSince.getFullYear()) * 12 +
    (now.getMonth() - leaderSince.getMonth())

  if (now.getDate() < leaderSince.getDate()) {
    months -= 1
  }

  return Math.min(MANHIGUT_TOTAL_MONTHS, Math.max(1, months + 1))
}

export interface ManhigutProgress {
  /** Mes em que o Talmid esta no ciclo (1-24). Null se sem leader_since. */
  currentMonth: number | null
  leaderSince: Date | null
  /** Admin: acesso total, sem restricao de mes. */
  bypassMonthGate: boolean
}

export function getManhigutProgressFromProfile(
  profile: Pick<Profile, 'role' | 'is_leader' | 'leader_since'> | null | undefined,
): ManhigutProgress {
  if (!profile?.is_leader && profile?.role !== 'admin') {
    return { currentMonth: null, leaderSince: null, bypassMonthGate: false }
  }

  if (profile.role === 'admin') {
    return { currentMonth: MANHIGUT_TOTAL_MONTHS, leaderSince: null, bypassMonthGate: true }
  }

  if (!profile.leader_since) {
    return { currentMonth: 1, leaderSince: null, bypassMonthGate: false }
  }

  const leaderSince = new Date(profile.leader_since)
  return {
    currentMonth: computeManhigutCurrentMonth(leaderSince),
    leaderSince,
    bypassMonthGate: false,
  }
}

export type ManhigutModuleAccess = 'open' | 'not_published' | 'ahead'

export function getManhigutModuleAccess(
  moduleMonth: number,
  modulePublished: boolean,
  progress: ManhigutProgress,
): ManhigutModuleAccess {
  if (!modulePublished) return 'not_published'
  if (progress.bypassMonthGate) return 'open'
  const current = progress.currentMonth ?? 1
  if (moduleMonth > current) return 'ahead'
  return 'open'
}

export function formatLeaderSincePt(iso: string | null): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
