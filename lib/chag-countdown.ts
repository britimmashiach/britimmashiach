import type { HolidayKey } from '@/lib/hebrew-date'

/**
 * Chagim "festivos": dias em que cabe um banner de comemoração na home.
 * Fica de fora tudo que é jejum, luto ou data menor/administrativa
 * (jejuns, Rosh Chódesh, Yom Kippur Katán, Yom HaShoah, Yom HaZikaron).
 */
const CELEBRATION_HOLIDAY_KEYS = new Set<NonNullable<HolidayKey>>([
  'pesach',
  'chol_hamoed_pesach',
  'shavuot',
  'rosh_hashana',
  'yom_kippur',
  'sukkot',
  'chol_hamoed_sukkot',
  'shemini_atzeret',
  'simchat_torah',
  'chanukah',
  'purim',
  'shushan_purim',
  'tu_bishvat',
  'tu_beav',
  'lag_baomer',
  'yom_haatzmaut',
  'yom_yerushalayim',
])

/** Chagim de tom solene (ainda memoráveis, mas sem o clima "festa"). */
const SOLEMN_CELEBRATION_KEYS = new Set<NonNullable<HolidayKey>>(['yom_kippur'])

export function isCelebratoryHoliday(
  key: HolidayKey,
): key is NonNullable<HolidayKey> {
  return !!key && CELEBRATION_HOLIDAY_KEYS.has(key)
}

export function holidayBannerTone(
  key: NonNullable<HolidayKey>,
): 'solemn' | 'festive' {
  return SOLEMN_CELEBRATION_KEYS.has(key) ? 'solemn' : 'festive'
}

/** Janela de referência da barra: a partir de quanto tempo "de longe" ela começa cheia. */
export const COUNTDOWN_WINDOW_MS = 45 * 24 * 60 * 60 * 1000

/**
 * Momento-alvo do Chag, aproximando o acender de velas / entrada do Yom Tov.
 * No calendário judaico o dia começa ao anoitecer, não à meia-noite.
 */
export function chagTargetTimestamp(isoDate: string): number {
  return new Date(`${isoDate}T18:00:00-03:00`).getTime()
}

/** Percentual restante da barra (100% = ainda distante, 0% = chegou). */
export function countdownProgress(remainingMs: number): number {
  const clamped = Math.min(Math.max(remainingMs, 0), COUNTDOWN_WINDOW_MS)
  return Math.round((clamped / COUNTDOWN_WINDOW_MS) * 100)
}
