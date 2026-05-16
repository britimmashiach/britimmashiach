'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  getDayInfo,
  type DayInfo,
  type UpcomingEvent,
  type LiturgicalSeason,
} from '@/lib/hebrew-date'
import { SEASON_STYLES, cellStyleFor } from '@/lib/calendar-season'
import { HOLIDAY_ICON, HOLIDAY_BADGE_COLOR } from '@/lib/holiday-visual'
import { DayDetailDrawer } from '@/components/calendar/DayDetailDrawer'
import { ZemanimSunTimes } from '@/components/calendar/ZemanimSunTimes'
import { findParashaByName } from '@/lib/parashot-registry'

const DAYS_WEEK_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Shab']
const DAYS_WEEK_HE = [
  'Yom Rishon',
  'Yom Sheni',
  'Yom Shlishi',
  "Yom Revi'i",
  'Yom Chamishi',
  'Yom Shishi',
  'Shabat',
]

const CATEGORY_TAG: Record<UpcomingEvent['category'], string> = {
  chag: 'bg-gold-500/15 text-gold-700 dark:text-gold-400 border-gold-500/30',
  fast: 'bg-warmgray-500/10 text-warmgray-700 dark:text-warmgray-300 border-warmgray-500/25',
  rosh_chodesh: 'bg-petroleum-500/12 text-petroleum-700 dark:text-petroleum-200 border-petroleum-500/30',
  modern: 'bg-petroleum-500/10 text-petroleum-700 dark:text-petroleum-200 border-petroleum-500/25',
  minor: 'bg-muted text-warmgray-600 dark:text-warmgray-400 border-border/40',
}

interface TodayParts {
  year: number
  monthIndex: number
  day: number
}

interface CalendarClientProps {
  todayParts: TodayParts
  todayInfo: DayInfo
  upcomingEvents: UpcomingEvent[]
}

export function CalendarClient({
  todayParts,
  todayInfo,
  upcomingEvents,
}: CalendarClientProps) {
  const today = useMemo(
    () =>
      new Date(todayParts.year, todayParts.monthIndex, todayParts.day, 12, 0, 0, 0),
    [todayParts.year, todayParts.monthIndex, todayParts.day],
  )
  const [viewDate, setViewDate] = useState(
    () => new Date(todayParts.year, todayParts.monthIndex, 1),
  )
  const [selected, setSelected] = useState<DayInfo>(todayInfo)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const isCurrentMonth =
    viewDate.getFullYear() === today.getFullYear() &&
    viewDate.getMonth() === today.getMonth()

  const monthLabel = useMemo(() => {
    const s = viewDate.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
    return s[0].toUpperCase() + s.slice(1)
  }, [viewDate])

  // Subtítulo hebraico do cabeçalho (mês hebraico que ocorre no 1º e no último dia civil)
  const hebrewMonthLabel = useMemo(() => {
    const first = getDayInfo(new Date(viewDate.getFullYear(), viewDate.getMonth(), 1, 12))
    const lastDay = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0, 12)
    const last = getDayInfo(lastDay)
    if (first.hebrewMonth === last.hebrewMonth && first.hebrewYear === last.hebrewYear) {
      return `${first.hebrewMonth} ${first.hebrewYear}`
    }
    if (first.hebrewYear === last.hebrewYear) {
      return `${first.hebrewMonth} · ${last.hebrewMonth} ${first.hebrewYear}`
    }
    return `${first.hebrewMonth} ${first.hebrewYear} · ${last.hebrewMonth} ${last.hebrewYear}`
  }, [viewDate])

  // Grade de dias com lacunas iniciais
  const grid = useMemo(() => {
    const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
    const last = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0)
    const blanks = first.getDay()
    const cells: Array<DayInfo | null> = []
    for (let i = 0; i < blanks; i++) cells.push(null)
    for (let d = 1; d <= last.getDate(); d++) {
      const dt = new Date(viewDate.getFullYear(), viewDate.getMonth(), d, 12, 0, 0, 0)
      cells.push(getDayInfo(dt))
    }
    return cells
  }, [viewDate])

  // Season do mês: usa o dia 15 como "centro" para escolher atmosfera global
  const monthSeason: LiturgicalSeason = useMemo(() => {
    const probe = new Date(viewDate.getFullYear(), viewDate.getMonth(), 15, 12)
    return getDayInfo(probe).season
  }, [viewDate])
  const seasonStyle = SEASON_STYLES[monthSeason]

  function prev() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }
  function next() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }
  function goToday() {
    setViewDate(new Date(todayParts.year, todayParts.monthIndex, 1))
    setSelected(todayInfo)
  }

  function selectDay(info: DayInfo) {
    setSelected(info)
    setDrawerOpen(true)
  }

  // Re-fetch automático à meia-noite — evita o calendário ficar "preso no dia anterior"
  useEffect(() => {
    const intv = window.setInterval(() => {
      const now = new Date()
      if (
        now.getFullYear() !== today.getFullYear() ||
        now.getMonth() !== today.getMonth() ||
        now.getDate() !== today.getDate()
      ) {
        // Server precisa rerenderizar — força reload simples no client
        window.location.reload()
      }
    }, 60_000)
    return () => window.clearInterval(intv)
  }, [today])

  const selectedIsToday =
    selected.date.getFullYear() === today.getFullYear() &&
    selected.date.getMonth() === today.getMonth() &&
    selected.date.getDate() === today.getDate()

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="w-5 h-5 text-gold-500" aria-hidden="true" />
            <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
              Calendário Judaico
            </span>
          </div>
          <h1 className="section-title">{todayInfo.hebrewDateLabel}</h1>
          <p className="section-subtitle mt-1">
            {todayInfo.dayOfWeekName}
            {' · '}
            {capitalize(
              today.toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'America/Sao_Paulo',
              }),
            )}
          </p>
        </div>

        {/* Navegação de mês */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <button
            onClick={prev}
            className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <div className="text-center min-w-[170px]">
            <p className="font-cinzel text-sm font-semibold capitalize">{monthLabel}</p>
            <p className="text-[11px] font-inter font-medium text-gold-600 dark:text-gold-400">
              {hebrewMonthLabel}
            </p>
          </div>
          <button
            onClick={next}
            className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
            aria-label="Próximo mês"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
          {!isCurrentMonth && (
            <button
              onClick={goToday}
              className="text-xs font-inter text-gold-600 dark:text-gold-400 hover:underline ml-1"
            >
              Hoje
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade */}
        <div
          className={cn(
            'lg:col-span-2 glass-card p-4 sm:p-5 transition-colors',
            seasonStyle.containerBg,
            seasonStyle.headerRing,
          )}
        >
          {/* Rótulos da semana */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_WEEK_PT.map((label, i) => (
              <div key={label} className="text-center px-0.5">
                <div
                  className={cn(
                    'text-[11px] font-inter font-semibold uppercase tracking-wider',
                    i === 6 ? 'text-gold-600 dark:text-gold-400' : 'text-warmgray-500',
                  )}
                >
                  {label}
                </div>
                <div className="text-[9px] font-inter font-medium text-warmgray-400 leading-tight mt-0.5">
                  {DAYS_WEEK_HE[i]}
                </div>
              </div>
            ))}
          </div>

          {/* Células */}
          <div className="grid grid-cols-7 gap-1.5">
            {grid.map((info, idx) => {
              if (!info) return <div key={`b${idx}`} className="h-14 sm:h-16" />

              const isToday =
                info.date.getFullYear() === today.getFullYear() &&
                info.date.getMonth() === today.getMonth() &&
                info.date.getDate() === today.getDate()
              const isSelected =
                selected.date.getTime() === info.date.getTime()

              const HolidayIcon = info.holidayKey ? HOLIDAY_ICON[info.holidayKey] : null
              const holidayBadge = info.holidayKey
                ? HOLIDAY_BADGE_COLOR[info.holidayKey]
                : null

              return (
                <button
                  key={info.date.toISOString()}
                  onClick={() => selectDay(info)}
                  className={cn(
                    'relative h-14 sm:h-16 rounded-lg text-sm font-inter font-medium transition-all duration-150',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1',
                    cellStyleFor({
                      isToday,
                      isSelected,
                      isShabbat: info.isShabbat,
                      holidayKey: info.holidayKey,
                      omerDay: info.omerDay,
                    }),
                  )}
                  aria-label={`${info.date.getDate()} ${info.hebrewMonth}${
                    isToday ? ', hoje' : ''
                  }${info.holidayName ? `, ${info.holidayName}` : ''}`}
                  aria-current={isToday ? 'date' : undefined}
                  aria-pressed={isSelected}
                >
                  {/* Número do dia (gregoriano) */}
                  <span className="block font-cinzel text-base leading-none pt-2">
                    {info.date.getDate()}
                  </span>
                  {/* Dia hebraico em mini */}
                  <span
                    className={cn(
                      'block text-[9px] font-inter mt-0.5 opacity-70',
                      isSelected && 'opacity-90',
                    )}
                  >
                    {info.hebrewDay}
                  </span>

                  {/* Ponto Omer */}
                  {info.omerDay > 0 && (
                    <span
                      className={cn(
                        'absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full',
                        isSelected ? 'bg-gold-300' : 'bg-gold-500',
                      )}
                      aria-hidden="true"
                    />
                  )}

                  {/* Selo de Chag */}
                  {HolidayIcon && holidayBadge && info.holidayKey !== 'rosh_chodesh' && (
                    <span
                      className={cn(
                        'absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center',
                        holidayBadge,
                      )}
                      aria-hidden="true"
                    >
                      <HolidayIcon className="w-2.5 h-2.5" />
                    </span>
                  )}

                  {/* Indicador discreto de Rosh Chódesh */}
                  {info.holidayKey === 'rosh_chodesh' && (
                    <span
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-petroleum-500"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legenda compacta */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-inter text-warmgray-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gold-500/15 ring-1 ring-gold-500" />
              hoje
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-petroleum-500/10 ring-1 ring-petroleum-500/30" />
              Shabat
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              dia do Omer
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gold-500/12 ring-1 ring-gold-500/30" />
              Yom Tov
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-warmgray-500/10 ring-1 ring-warmgray-500/25" />
              jejum
            </span>
          </div>
        </div>

        {/* Coluna direita */}
        <aside className="space-y-4">
          {/* Painel espiritual do dia selecionado */}
          <section
            className={cn(
              'glass-card p-4 space-y-3',
              SEASON_STYLES[selected.season].containerBg,
            )}
            aria-labelledby="day-panel"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" aria-hidden="true" />
                <h2
                  id="day-panel"
                  className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 uppercase tracking-widest"
                >
                  Painel do Dia
                </h2>
              </div>
              {selectedIsToday && (
                <span className="text-[10px] font-inter font-semibold text-gold-700 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  hoje
                </span>
              )}
            </div>

            <div>
              <p className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
                {selected.hebrewDateLabel}
              </p>
              <p className="text-xs font-inter text-warmgray-500 mt-0.5">
                {selected.dayOfWeekName}
                {selected.parsha ? ` · Parasháh ${selected.parsha}` : ''}
              </p>
            </div>

            {selected.holidayName && (
              <p className="text-sm font-inter font-medium text-gold-700 dark:text-gold-400">
                {selected.holidayName}
                {selected.holidayTotalDays > 1 &&
                  ` (${selected.holidayDayNumber}/${selected.holidayTotalDays})`}
              </p>
            )}

            {selected.omerDay > 0 && (
              <p className="text-sm font-inter text-foreground/80">
                <Star className="inline w-3.5 h-3.5 mr-1 -mt-0.5 text-gold-500" aria-hidden="true" />
                Dia {selected.omerDay} do Omer · {selected.sefiraLabel}
              </p>
            )}

            <ZemanimSunTimes
              brasil={selected.zemanimBrazil}
              yerushalayim={selected.zemanimYerushalayim}
              compact
            />

            <button
              onClick={() => setDrawerOpen(true)}
              className="w-full mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-200 hover:text-gold-600 transition-colors border border-border/50 hover:border-gold-500/30 px-3 py-2 rounded-lg"
            >
              Ver detalhes do dia
            </button>
          </section>

          {/* Próximas datas (dinâmicas) */}
          <section className="space-y-2" aria-labelledby="upcoming-heading">
            <h2
              id="upcoming-heading"
              className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100"
            >
              Próximas Datas
            </h2>

            {upcomingEvents.length === 0 ? (
              <p className="text-xs font-inter text-warmgray-500">
                Sem eventos relevantes nos próximos meses.
              </p>
            ) : (
              <div className="space-y-2.5">
                {upcomingEvents.map((ev) => (
                  <div key={`${ev.isoDate}-${ev.title}`} className="glass-card p-3.5 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-inter font-medium text-foreground leading-snug">
                        {ev.title}
                      </p>
                      <span
                        className={cn(
                          'text-[10px] font-inter font-medium px-2 py-0.5 rounded-full border whitespace-nowrap flex-shrink-0 uppercase tracking-wider',
                          CATEGORY_TAG[ev.category],
                        )}
                      >
                        {ev.daysUntil === 0 ? 'hoje' : `+${ev.daysUntil}d`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-inter text-warmgray-400">{ev.dateLabel}</p>
                      <p
                        className="font-hebrew text-sm text-warmgray-400"
                        dir="rtl"
                        lang="he"
                      >
                        {ev.hebrew}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {todayInfo.parsha && (() => {
              const match = findParashaByName(todayInfo.parsha)
              const href = match ? `/parashot/${match.slug}` : '/parashot'
              const ctaLabel = match
                ? `Abrir ${match.title} →`
                : 'Ver Parashot →'
              return (
                <div className="glass-card p-3.5 border-gold-500/20 bg-gold-500/5 mt-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star
                      className="w-3.5 h-3.5 text-gold-500 fill-gold-500/30"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-inter font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                      Parasháh desta semana
                    </span>
                  </div>
                  <p className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                    {todayInfo.parsha}
                    {match && match.title.toLowerCase() !== todayInfo.parsha.toLowerCase() && (
                      <span className="ml-1.5 text-[11px] font-inter font-medium text-warmgray-500">
                        ({match.title})
                      </span>
                    )}
                  </p>
                  <Link
                    href={href}
                    className="text-xs font-inter text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 transition-colors mt-1.5 inline-block"
                  >
                    {ctaLabel}
                  </Link>
                </div>
              )
            })()}
          </section>
        </aside>
      </div>

      {/* Drawer com detalhe do dia */}
      <DayDetailDrawer
        info={selected}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  )
}

function capitalize(s: string): string {
  if (!s) return s
  return s[0].toUpperCase() + s.slice(1)
}
