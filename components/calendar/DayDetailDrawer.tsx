'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Drawer } from '@/components/ui/Drawer'
import {
  BookMarked,
  ChevronRight,
  Crown,
  FileText,
  Flame,
  Star,
  Sparkles,
  ScrollText,
  Scale,
  BookOpenCheck,
  Gem,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DayInfo } from '@/lib/hebrew-date'
import { SEASON_STYLES } from '@/lib/calendar-season'
import { HOLIDAY_ICON, HOLIDAY_BADGE_COLOR } from '@/lib/holiday-visual'
import { findParashaByName } from '@/lib/parashot-registry'
import {
  canonicalStudySlugForParshaRegistrySlug,
  hasCanonicalParshaStudy,
  tanachHrefForOfficialParasha,
  tanachOpeningLabelPt,
} from '@/lib/parasha-readlinks'
import { ZemanimSunTimes } from '@/components/calendar/ZemanimSunTimes'
import { buildCalendarResumo } from '@/lib/calendar-resumo'

interface DayDetailDrawerProps {
  info: DayInfo | null
  open: boolean
  onClose: () => void
}

export function DayDetailDrawer({ info, open, onClose }: DayDetailDrawerProps) {
  const resumo = useMemo(
    () => (info ? buildCalendarResumo(info) : null),
    [info],
  )

  if (!info) {
    return (
      <Drawer open={open} onClose={onClose} title="">
        {null}
      </Drawer>
    )
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

        {/* Parasháh — link explícito para a página na plataforma (slug automático ou lista) */}
        {info.parsha && (() => {
          const match = findParashaByName(info.parsha)
          const parashaHref = match ? `/parashot/${match.slug}` : '/parashot'
          const tanachHref = match ? tanachHrefForOfficialParasha(match) : null
          const showStudyLink = match ? hasCanonicalParshaStudy(match.slug) : false
          const studySlug = match ? canonicalStudySlugForParshaRegistrySlug(match.slug) : ''
          const studyHref = `/studies/${studySlug}`
          return (
            <section
              className="rounded-xl border border-border/50 p-4 space-y-3 bg-background/60"
              aria-labelledby="parsha-heading"
            >
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-petroleum-700 dark:text-petroleum-300" aria-hidden="true" />
                <h2
                  id="parsha-heading"
                  className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 uppercase tracking-wider"
                >
                  Parasháh da semana
                </h2>
              </div>
              <p className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
                {info.parsha}
                {match && match.title.toLowerCase() !== info.parsha.toLowerCase().replace(/^parashat?\s+/i, '').trim() && (
                  <span className="ml-1.5 text-xs font-inter font-medium text-warmgray-500">
                    ({match.title})
                  </span>
                )}
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href={parashaHref}
                  onClick={onClose}
                  className={cn(
                    'inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-inter font-semibold transition-colors',
                    match
                      ? 'bg-petroleum-800 text-parchment-100 hover:bg-petroleum-900 dark:bg-gold-500 dark:text-petroleum-950 dark:hover:bg-gold-400'
                      : 'border border-border bg-muted/50 text-foreground hover:bg-muted',
                  )}
                >
                  {match ? 'Abrir esta Parasháh na plataforma' : 'Ver Parashot na plataforma'}
                  <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
                {match && tanachHref && (
                  <Link
                    href={tanachHref}
                    onClick={onClose}
                    className="inline-flex w-full sm:w-auto flex-col items-stretch gap-0.5 rounded-lg border border-petroleum-600/35 bg-background/90 px-4 py-2.5 text-left transition-colors hover:bg-muted/80 dark:border-petroleum-400/25"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-inter font-semibold text-petroleum-800 dark:text-parchment-100">
                      <ScrollText className="h-4 w-4 shrink-0 opacity-90" aria-hidden="true" />
                      Abrir o capítulo inicial no Tanach
                      <ChevronRight className="h-4 w-4 shrink-0 ml-auto" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-inter text-warmgray-500 pl-7">
                      {tanachOpeningLabelPt(match)}
                    </span>
                  </Link>
                )}
                {match && showStudyLink && (
                  <Link
                    href={studyHref}
                    onClick={onClose}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-green-700/35 bg-green-950/[0.04] px-4 py-2.5 text-sm font-inter font-semibold text-green-900 hover:bg-green-950/10 dark:border-green-400/35 dark:bg-green-500/10 dark:text-green-100 dark:hover:bg-green-500/15 transition-colors"
                  >
                    <BookOpenCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Abrir estudo PaRDeS desta sedrá
                    <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                )}
                {!match && (
                  <p className="text-xs font-inter text-warmgray-500 leading-relaxed">
                    O nome vindo do calendário não correspondeu automaticamente a uma página. Use a lista para localizar a sedrá
                    equivalente.
                  </p>
                )}
              </div>
            </section>
          )
        })()}

        <ZemanimSunTimes brasil={info.zemanimBrazil} yerushalayim={info.zemanimYerushalayim} />

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
          <div className="space-y-2">
            <p className="text-sm font-inter text-foreground/90 leading-relaxed">
              O quadro <strong className="font-semibold text-petroleum-800 dark:text-parchment-100">Resumo espiritual</strong> abaixo reúne leituras orientativas, halachot essenciais,
              Tehilim haYom, Pirkei Avot e notas de Sod com comentaristas em rotação.
            </p>
            <Link
              href="/tehilim"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-inter font-semibold text-gold-700 hover:text-gold-600 dark:text-gold-400"
            >
              Abrir leitura de Tehilim na plataforma
              <ChevronRight className="w-3 h-3" aria-hidden />
            </Link>
          </div>
        </section>

        {resumo && (
        <section
          className="rounded-xl border border-gold-500/35 bg-gradient-to-br from-gold-500/[0.07] via-parchment-50/60 to-transparent dark:from-gold-900/15 dark:via-petroleum-950/80 dark:to-transparent p-4 space-y-4 shadow-inner"
          aria-labelledby="resumo-esp-heading"
        >
          <div className="flex items-center gap-2 border-b border-gold-500/20 pb-2">
            <Gem className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden />
            <h2
              id="resumo-esp-heading"
              className="font-cinzel text-sm font-semibold uppercase tracking-[0.2em] text-gold-800 dark:text-gold-300"
            >
              Resumo espiritual
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {info.isShabbat && (
              <span className="inline-flex items-center gap-1 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-200 bg-petroleum-500/10 px-2 py-0.5 rounded-full border border-petroleum-500/15">
                <Star className="w-3 h-3 shrink-0" aria-hidden />
                Shabat
              </span>
            )}
            {seasonStyle.label && (
              <span className="inline-flex items-center gap-1 text-xs font-inter font-medium text-gold-800 dark:text-gold-400 bg-gold-500/12 px-2 py-0.5 rounded-full border border-gold-500/20">
                {seasonStyle.label}
              </span>
            )}
            {info.holidayKey === 'rosh_chodesh' && (
              <span className="inline-flex items-center gap-1 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-200 bg-petroleum-500/10 px-2 py-0.5 rounded-full border border-petroleum-500/15">
                <Crown className="w-3 h-3 shrink-0" aria-hidden />
                Rosh Chódesh
              </span>
            )}
          </div>

          <div className="space-y-2 border-l-2 border-petroleum-600/35 pl-3">
            <h3 className="flex items-center gap-2 text-xs font-inter font-bold uppercase tracking-wider text-petroleum-800 dark:text-parchment-100">
              <ScrollText className="w-3.5 h-3.5 text-petroleum-600 shrink-0" aria-hidden />
              Leituras do dia
            </h3>
            <ul className="space-y-1.5 list-none pl-0">
              {resumo.leituras.map((linha, i) => (
                <li key={i} className="text-sm font-inter leading-relaxed text-petroleum-800/95 dark:text-parchment-100/95">
                  {linha}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 border-l-2 border-gold-500/35 pl-3">
            <h3 className="flex items-center gap-2 text-xs font-inter font-bold uppercase tracking-wider text-petroleum-800 dark:text-parchment-100">
              <Scale className="w-3.5 h-3.5 text-gold-600 shrink-0" aria-hidden />
              Halachot resumidas
            </h3>
            <ul className="space-y-1.5 list-none pl-0">
              {resumo.halachot.map((linha, i) => (
                <li key={i} className="text-sm font-inter leading-relaxed text-foreground/90">
                  {linha}
                </li>
              ))}
            </ul>
            <p className="text-[11px] font-inter text-warmgray-500">
              Síntese educativa da plataforma. Dúvidas finas ficam com o Rav e o minhague fixado pela Brit Im Mashiach.
            </p>
          </div>

          <div className="rounded-lg bg-background/65 dark:bg-petroleum-900/40 border border-border/45 p-3 space-y-2">
            <h3 className="flex items-center gap-2 text-xs font-inter font-bold uppercase tracking-wider text-petroleum-800 dark:text-parchment-100">
              <BookOpenCheck className="w-3.5 h-3.5 text-petroleum-600 shrink-0" aria-hidden />
              Tehilim haYom
            </h3>
            <p className="text-sm font-cinzel font-semibold text-gold-700 dark:text-gold-400">{resumo.tehilimHaYom}</p>
            <div className="pt-2 border-t border-border/30 space-y-1">
              <p className="text-[11px] font-inter font-semibold text-warmgray-500 uppercase tracking-wide">
                {resumo.sodTehilim.chacham}{' '}
                <span className="normal-case font-medium text-gold-700/90 dark:text-gold-400/90">
                  · {resumo.sodTehilim.tema}
                </span>
              </p>
              <p className="font-cormorant text-sm italic leading-relaxed text-petroleum-800 dark:text-parchment-200">
                {resumo.sodTehilim.texto}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-background/65 dark:bg-petroleum-900/40 border border-border/45 p-3 space-y-2">
            <h3 className="flex items-center gap-2 text-xs font-inter font-bold uppercase tracking-wider text-petroleum-800 dark:text-parchment-100">
              <BookMarked className="w-3.5 h-3.5 shrink-0 text-petroleum-600" aria-hidden />
              Pirkei Avot (texto do dia)
            </h3>
            <p className="font-cormorant text-sm italic text-foreground/95 leading-relaxed">{resumo.pirkeiTexto}</p>
            <div className="pt-2 border-t border-border/30 space-y-1">
              <p className="text-[11px] font-inter font-semibold text-warmgray-500 uppercase tracking-wide">
                {resumo.sodPirkei.chacham}{' '}
                <span className="normal-case font-medium text-gold-700/90 dark:text-gold-400/90">
                  · {resumo.sodPirkei.tema}
                </span>
              </p>
              <p className="font-cormorant text-sm italic leading-relaxed text-petroleum-800 dark:text-parchment-200">
                {resumo.sodPirkei.texto}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-purple-900/25 dark:border-purple-400/25 bg-purple-950/[0.04] dark:bg-purple-950/25 p-3 space-y-1.5">
            <p className="text-[11px] font-inter font-semibold uppercase tracking-widest text-purple-900/70 dark:text-purple-200 flex items-center gap-1.5 flex-wrap">
              <Sparkles className="w-3 h-3 shrink-0" aria-hidden />
              Maayan haSod · {resumo.sodExtra.chacham}
            </p>
            <p className="text-xs font-inter font-medium text-purple-900 dark:text-purple-100/95">{resumo.sodExtra.tema}</p>
            <p className="font-cormorant text-sm italic leading-relaxed text-purple-950 dark:text-purple-100/95">
              {resumo.sodExtra.texto}
            </p>
          </div>
        </section>
        )}
      </div>
    </Drawer>
  )
}

function capitalize(s: string): string {
  if (!s) return s
  return s[0].toUpperCase() + s.slice(1)
}
