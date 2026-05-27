import type { KehilahEventType } from '@/lib/community-types'

const TZ = 'America/Sao_Paulo'

export const EVENT_TYPE_LABEL: Record<KehilahEventType, string> = {
  culto: 'Culto',
  estudo: 'Estudo',
  live: 'Ao vivo',
  moed: 'Moed',
  outro: 'Evento',
}

export function formatEventDateRange(startsAt: string, endsAt: string | null): string {
  const start = new Date(startsAt)
  const dateFmt = new Intl.DateTimeFormat('pt-BR', {
    timeZone: TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const timeFmt = new Intl.DateTimeFormat('pt-BR', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
  })

  const datePart = dateFmt.format(start)
  const startTime = timeFmt.format(start)

  if (!endsAt) return `${datePart}, ${startTime}`

  const end = new Date(endsAt)
  const endTime = timeFmt.format(end)
  const sameDay = dateFmt.format(end) === datePart

  if (sameDay) return `${datePart}, ${startTime} – ${endTime}`
  return `${datePart} ${startTime} até ${dateFmt.format(end)} ${endTime}`
}
