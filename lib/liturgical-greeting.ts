/** Fuso da congregação em Franca SP. */
export const CONGREGATION_TIMEZONE = 'America/Sao_Paulo'

export type LiturgicalGreetingKey = 'boker' | 'tzohorayim' | 'erev' | 'laila'

const GREETINGS: Record<LiturgicalGreetingKey, string> = {
  boker: 'Boker Tov',
  tzohorayim: 'Tzohorayim Tovim',
  erev: 'Erev Tov',
  laila: 'Laila Tov',
}

function hourInTimeZone(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone,
  }).formatToParts(date)
  return Number(parts.find((p) => p.type === 'hour')?.value ?? 12)
}

/** Saudação hebraica conforme hora local da congregação. */
export function getLiturgicalGreeting(
  date: Date = new Date(),
  timeZone: string = CONGREGATION_TIMEZONE,
): { text: string; key: LiturgicalGreetingKey } {
  const hour = hourInTimeZone(date, timeZone)

  if (hour >= 5 && hour < 12) return { text: GREETINGS.boker, key: 'boker' }
  if (hour >= 12 && hour < 17) return { text: GREETINGS.tzohorayim, key: 'tzohorayim' }
  if (hour >= 17 && hour < 21) return { text: GREETINGS.erev, key: 'erev' }
  return { text: GREETINGS.laila, key: 'laila' }
}
