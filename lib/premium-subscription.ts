import type { Profile } from '@/types'

/** Dias após o vencimento em que o Premium PIX manual ainda funciona. */
export const PREMIUM_PIX_GRACE_DAYS = 2

export type PremiumProfileSlice = Pick<
  Profile,
  'role' | 'subscription_status' | 'subscription_current_period_end'
>

export type PremiumAccessState =
  | 'admin'
  | 'free'
  | 'active'
  | 'grace'
  | 'expired'

export function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/** Próximo vencimento ao renovar PIX (empilha se ainda dentro do período pago). */
export function extendPremiumPeriodMonths(
  currentEndIso: string | null | undefined,
  months: number,
  from: Date = new Date(),
): string {
  const baseMs = currentEndIso
    ? Math.max(from.getTime(), new Date(currentEndIso).getTime())
    : from.getTime()
  const d = new Date(baseMs)
  d.setMonth(d.getMonth() + months)
  return d.toISOString()
}

export function getPremiumAccessState(
  profile: PremiumProfileSlice | null | undefined,
  now: Date = new Date(),
): PremiumAccessState {
  if (!profile) return 'free'
  if (profile.role === 'admin') return 'admin'
  if (profile.role !== 'premium') return 'free'

  const periodEndIso = profile.subscription_current_period_end
  if (!periodEndIso) {
    if (profile.subscription_status === 'canceled') return 'expired'
    return 'active'
  }

  const periodEnd = new Date(periodEndIso)
  const graceEnd = addDays(periodEnd, PREMIUM_PIX_GRACE_DAYS)

  if (now.getTime() <= periodEnd.getTime()) return 'active'
  if (now.getTime() <= graceEnd.getTime()) return 'grace'
  return 'expired'
}

export function profileHasActivePremium(
  profile: PremiumProfileSlice | null | undefined,
  now: Date = new Date(),
): boolean {
  const state = getPremiumAccessState(profile, now)
  return state === 'admin' || state === 'active' || state === 'grace'
}
