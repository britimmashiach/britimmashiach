import type { Metadata } from 'next'
import { CalendarClient } from '@/components/calendar/CalendarClient'
import {
  dateAtNoonBrazil,
  getCivilDatePartsInTimeZone,
  getDayInfo,
  getUpcomingEvents,
} from '@/lib/hebrew-date'

export const metadata: Metadata = {
  title: 'Calendário Hebraico',
  description:
    'Calendário judaico-messiânico com Moedim, Shabatot, Rosh Chódesh, Sefirat haOmer e zmanim em São Paulo.',
  openGraph: {
    title: 'Calendário Hebraico | Brit Mashiach',
    description: 'Ciclo litúrgico judaico completo, em paleta Beit Midrash.',
  },
}

// Calendário muda a cada dia. Cache curto evita data "presa" e ainda assim
// poupa cálculos do Hebcal/Zmanim.
export const revalidate = 3600

export default function CalendarPage() {
  const todayParts = getCivilDatePartsInTimeZone(new Date())
  const todayCivil = dateAtNoonBrazil(
    todayParts.year,
    todayParts.monthIndex,
    todayParts.day,
  )
  const todayInfo = getDayInfo(todayCivil)
  const upcomingEvents = getUpcomingEvents(todayCivil, 8, 6)

  return (
    <CalendarClient
      todayParts={todayParts}
      todayInfo={todayInfo}
      upcomingEvents={upcomingEvents}
    />
  )
}
