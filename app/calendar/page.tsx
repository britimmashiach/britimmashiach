import type { Metadata } from 'next'
import { CalendarClient } from '@/components/calendar/CalendarClient'
import {
  dateAtNoonBrazil,
  getCivilDatePartsInTimeZone,
  getDayInfo,
  getUpcomingEvents,
} from '@/lib/hebrew-date'
import { getAuthSnapshot } from '@/lib/auth-snapshot'
import { SignupGate } from '@/components/ui/SignupGate'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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
export const dynamic = 'force-dynamic'

export default async function CalendarPage() {
  const auth = await getAuthSnapshot()
  const isLoggedIn = !!auth.user

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Início
        </Link>
        <SignupGate
          resourceName="o Calendário Hebraico"
          description="O Calendário Hebraico-messiânico, com Moedim, Shabatot, Rosh Chódesh, Sefirat haOmer e zmanim em São Paulo, é recurso reservado da Brit Im Mashiach. Cadastre-se gratuitamente para criar sua conta e acessar o Calendário completo."
        />
      </div>
    )
  }

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
