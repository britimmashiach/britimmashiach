'use client'

import Link from 'next/link'
import { Drawer } from '@/components/ui/Drawer'
import {
  BookMarked,
  Calendar as CalendarIcon,
  ChevronRight,
  Crown,
  FileText,
  Flame,
  Quote,
  Sun,
  Star,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DayInfo } from '@/lib/hebrew-date'
import { SEASON_STYLES } from '@/lib/calendar-season'
import { HOLIDAY_ICON, HOLIDAY_BADGE_COLOR } from '@/lib/holiday-visual'
import { findParashaByName } from '@/lib/parashot-registry'

interface DayDetailDrawerProps {
  info: DayInfo | null
  open: boolean
  onClose: () => void
}

export function DayDetailDrawer({ info, open, onClose }: DayDetailDrawerProps) {
  if (!info) {
    return <Drawer open={open} onClose={onClose} title="" children={null} />
  }

  const seasonStyle = SEASON_STYLES[info.season]
  const HolidayIcon = info.holidayKey ? HOLIDAY_ICON[info.holidayKey] : null
  const holidayBadge = info.holidayKey
    ? HOLIDAY_BADGE_COLOR[info.holidayKey]
    : null

  const gregorianFull = info.date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Sao_Paulo',
  })

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={info.hebrewDateLabel}
      subtitle={info.dayOfWeekName + ' · ' + capitalize(gregorianFull)}
    >
      <div className={cn('space-y-5', seasonStyle.containerBg, 'p-4 -m-1 rounded-xl')}>
        {/* Bloco Chag (se houver) */}
        {info.holidayKey && info.holidayName && (
          <section
            className={cn(
              'rounded-xl border border-gold-500/20 p-4 bg-gold-500/[0.06]',
              'dark:bg-petroleum-900/30 space-y-2',
            )}
            aria-labelledby="chag-heading"
          >
            <div className="flex items-center gap-2">
              {holidayBadge && HolidayIcon && (
                <span
                  className={cn(
                    'w-7 h-7 rounded-md flex items-center justify-center',
                    holidayBadge,
                  )}
                  aria-hidden="true"
                >
                  <HolidayIcon className="w-4 h-4" />
                </span>
              )}
              <h2
                id="chag-heading"
                className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100"
              >
                {info.holidayName}
                {info.holidayTotalDays > 1 && (
                  <span className="ml-1.5 text-xs font-inter font-medium text-warmgray-500">
                    ({info.holidayDayNumber}/{info.holidayTotalDays})
                  </span>
                )}
              </h2>
            </div>
            {info.holidayDetail && (
              <p className="font-cormorant text-base italic text-petroleum-800 dark:text-parchment-200 leading-relaxed">
                {info.holidayDetail}
              </p>
            )}
            {info.chanukahInfo && (
              <p className="text-sm font-inter text-foreground/80 leading-relaxed">
                {info.chanukahInfo}
              </p>
            )}
            {info.brachaInfo && (
              <p className="text-xs font-inter text-warmgray-600 dark:text-warmgray-400">
                <Flame className="inline w-3 h-3 mr-1 -mt-0.5" aria-hidden="true" />
                {info.brachaInfo}
              </p>
            )}
          </section>
        )}

        {/* Omer */}
        {info.omerDay > 0 && (
          <section
            className="rounded-xl border border-gold-500/15 p-4 space-y-2 bg-parchment-50/40 dark:bg-petroleum-900/20"
            aria-labelledby="omer-heading"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-500" aria-hidden="true" />
              <h2
                id="omer-heading"
                className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 uppercase tracking-wider"
              >
                Sefirat haOmer
              </h2>
            </div>
            <p className="font-cinzel text-2xl font-semibold text-gold-600 dark:text-gold-400">
              Dia {info.omerDay}
              <span className="text-sm font-inter font-medium text-warmgray-500 ml-2">
                ({info.omerWeeksDaysLabel})
              </span>
            </p>
            {info.sefiraLabel && (
              <p className="font-cormorant text-base italic text-petroleum-800 dark:text-parchment-200">
                {info.sefiraLabel}
              </p>
            )}
          </section>
        )}

        {/* Parashá */}
        {info.parsha && (() => {
          const match = findParashaByName(info.parsha)
          const header = (
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-petroleum-700 dark:text-petroleum-300" aria-hidden="true" />
              <h2
                id="parsha-heading"
                className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 uppercase tracking-wider"
              >
                Parasháh da Semana
              </h2>
            </div>
          )
          const body = (
            <>
              <p className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors">
                {info.parsha}
                {match && match.title.toLowerCase() !== info.parsha.toLowerCase() && (
                  <span className="ml-1.5 text-xs font-inter font-medium text-warmgray-500">
                    ({match.title})
                  </span>
                )}
              </p>
              {match && (
                <p className="text-xs font-inter text-petroleum-700 dark:text-petroleum-300 inline-flex items-center gap-1 mt-1">
                  Estudar Parasháh <ChevronRight className="w-3 h-3" aria-hidden="true" />
                </p>
              )}
            </>
          )
          const className =
            'rounded-xl border border-border/50 p-4 space-y-1 bg-background/60 group'
          return match ? (
            <Link
              href={`/parashot/${match.slug}`}
              className={cn(className, 'hover:border-gold-500/30 hover:bg-gold-500/[0.04] transition-colors block')}
              aria-labelledby="parsha-heading"
              onClick={onClose}
            >
              {header}
              {body}
            </Link>
          ) : (
            <section className={className} aria-labelledby="parsha-heading">
              {header}
              {body}
            </section>
          )
        })()}

        {/* Zmanim mínimo */}
        <section
          className="rounded-xl border border-border/50 p-4 space-y-2 bg-background/60"
          aria-labelledby="zmanim-heading"
        >
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-gold-500" aria-hidden="true" />
            <h2
              id="zmanim-heading"
              className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 uppercase tracking-wider"
            >
              Zmanim · São Paulo
            </h2>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-inter text-warmgray-500">Pôr do sol</span>
            <span className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
              {info.sunsetLabel}
            </span>
          </div>
        </section>

        {/* Estudo do dia */}
        <section
          className="rounded-xl border border-border/50 p-4 space-y-3 bg-background/60"
          aria-labelledby="study-heading"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-petroleum-700 dark:text-petroleum-300" aria-hidden="true" />
            <h2
              id="study-heading"
              className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 uppercase tracking-wider"
            >
              Estudo do Dia
            </h2>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-inter text-foreground">{info.tehilimSuggestion}</p>
            {info.pirkeiFrase && (
              <p className="font-cormorant text-base italic text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
                <Quote className="inline w-3.5 h-3.5 mr-1 -mt-1 opacity-50" aria-hidden="true" />
                {info.pirkeiFrase}
              </p>
            )}
          </div>
        </section>

        {/* Resumo final do dia */}
        <section className="rounded-xl border border-border/40 p-4 space-y-1.5 bg-muted/30">
          <div className="flex items-center gap-2 text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            <CalendarIcon className="w-3.5 h-3.5" aria-hidden="true" />
            Resumo
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {info.isShabbat && (
              <span className="inline-flex items-center gap-1 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-200 bg-petroleum-500/10 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3" aria-hidden="true" />
                Shabat
              </span>
            )}
            {seasonStyle.label && (
              <span className="inline-flex items-center gap-1 text-xs font-inter font-medium text-gold-700 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full">
                {seasonStyle.label}
              </span>
            )}
            {info.holidayKey === 'rosh_chodesh' && (
              <span className="inline-flex items-center gap-1 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-200 bg-petroleum-500/10 px-2 py-0.5 rounded-full">
                <Crown className="w-3 h-3" aria-hidden="true" />
                Rosh Chódesh
              </span>
            )}
          </div>
          <p className="text-xs font-inter text-warmgray-500 pt-1">
            Leituras e halachot completas serão publicadas em breve.
          </p>
        </section>
      </div>
    </Drawer>
  )
}

function capitalize(s: string): string {
  if (!s) return s
  return s[0].toUpperCase() + s.slice(1)
}
