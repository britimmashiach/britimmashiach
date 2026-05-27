import Link from 'next/link'
import { Calendar, MapPin, Radio, BookOpen, Flame, Users } from 'lucide-react'
import type { KehilahEvent } from '@/lib/community-types'
import { EVENT_TYPE_LABEL, formatEventDateRange } from '@/lib/community-format'
import { cn } from '@/lib/utils'

const TYPE_ICON = {
  culto: Flame,
  estudo: BookOpen,
  live: Radio,
  moed: Calendar,
  outro: Users,
} as const

type KehilahAgendaProps = {
  events: KehilahEvent[]
}

export function KehilahAgenda({ events }: KehilahAgendaProps) {
  const liveEvents = events.filter((e) => e.eventType === 'live')
  const inPerson = events.filter((e) => e.eventType !== 'live')

  return (
    <div className="space-y-8">
      {liveEvents.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 flex items-center gap-2">
            <Radio className="w-5 h-5 text-gold-600" aria-hidden="true" />
            Aulas ao vivo
          </h3>
          <ul className="space-y-3">
            {liveEvents.map((ev) => (
              <AgendaCard key={ev.id} event={ev} highlight />
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-petroleum-600" aria-hidden="true" />
          Agenda da kehilah
        </h3>
        {inPerson.length === 0 ? (
          <p className="text-sm font-inter text-warmgray-500">
            Nenhum evento presencial listado no momento. Consulte o{' '}
            <Link href="/calendar" className="text-gold-700 dark:text-gold-400 hover:underline">
              calendário hebraico
            </Link>{' '}
            para Moedim e Shabatot.
          </p>
        ) : (
          <ul className="space-y-3">
            {inPerson.map((ev) => (
              <AgendaCard key={ev.id} event={ev} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function AgendaCard({ event, highlight }: { event: KehilahEvent; highlight?: boolean }) {
  const Icon = TYPE_ICON[event.eventType] ?? Users

  return (
    <li
      className={cn(
        'glass-card p-5 space-y-3',
        highlight && 'border-gold-500/30 bg-gold-500/[0.03]',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded-full bg-gold-500/10">
          <Icon className="w-3 h-3" aria-hidden="true" />
          {EVENT_TYPE_LABEL[event.eventType]}
        </span>
      </div>
      <h4 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
        {event.title}
      </h4>
      <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
        {event.description}
      </p>
      <div className="flex flex-col gap-1 text-xs font-inter text-warmgray-500">
        <span>{formatEventDateRange(event.startsAt, event.endsAt)}</span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
          {event.location}
        </span>
      </div>
      {event.liveUrl && (
        <a
          href={event.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-gold-700 dark:text-gold-400 hover:underline"
        >
          Entrar na transmissão
          <Radio className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      )}
    </li>
  )
}
