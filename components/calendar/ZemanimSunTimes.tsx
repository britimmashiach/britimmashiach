'use client'

import { Sunrise, Sunset } from 'lucide-react'
import type { ZemanimPlace } from '@/lib/hebrew-date'

function PlaceRow({
  place,
  showTitles,
}: {
  place: ZemanimPlace
  showTitles: boolean
}) {
  return (
    <div className="rounded-lg border border-border/40 bg-background/40 px-3 py-2 space-y-1.5">
      {showTitles && (
        <p className="text-[11px] font-inter font-semibold uppercase tracking-wider text-warmgray-500">
          {place.title}
        </p>
      )}
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="flex items-center gap-1 font-inter text-warmgray-500">
          <Sunrise className="w-3.5 h-3.5 text-amber-500 shrink-0" aria-hidden />
          Nascer
        </dt>
        <dd className="font-cinzel tabular-nums font-semibold text-petroleum-800 dark:text-parchment-100">
          {place.sunriseLabel}
        </dd>
        <dt className="flex items-center gap-1 font-inter text-warmgray-500">
          <Sunset className="w-3.5 h-3.5 text-orange-400 shrink-0" aria-hidden />
          Pôr
        </dt>
        <dd className="font-cinzel tabular-nums font-semibold text-petroleum-800 dark:text-parchment-100">
          {place.sunsetLabel}
        </dd>
      </dl>
    </div>
  )
}

type Props = {
  brasil: ZemanimPlace
  yerushalayim: ZemanimPlace
  /** Painel lateral do mês sem repetir subtítulos longos em cada linha */
  compact?: boolean
}

/**
 * Hanetz e shkiá segundo cálculo solar (NOAA via Hebcal) para Brasil e Yerushalayim.
 * Alguns jejuns começam ao nascer do sol no local; use a referência que o Rav indica.
 */
export function ZemanimSunTimes({ brasil, yerushalayim, compact }: Props) {
  if (compact) {
    return (
      <div className="space-y-2 text-xs font-inter text-warmgray-600 dark:text-warmgray-400 border-t border-border/30 pt-2">
        <p className="flex items-center gap-1.5 font-medium text-warmgray-500">
          <Sunrise className="w-3.5 h-3.5 text-amber-500" aria-hidden />
          Nascer e pôr do sol
        </p>
        <div className="space-y-1.5 pl-0.5">
          <p>
            <span className="text-warmgray-500">Brasil (SP):</span>{' '}
            <span className="text-foreground font-medium tabular-nums">
              {brasil.sunriseLabel}
            </span>
            {' · '}
            <span className="text-foreground font-medium tabular-nums">{brasil.sunsetLabel}</span>
          </p>
          <p>
            <span className="text-warmgray-500">Yerushalayim:</span>{' '}
            <span className="text-foreground font-medium tabular-nums">
              {yerushalayim.sunriseLabel}
            </span>
            {' · '}
            <span className="text-foreground font-medium tabular-nums">
              {yerushalayim.sunsetLabel}
            </span>
          </p>
        </div>
        <p className="text-[10px] leading-snug text-warmgray-500 pt-0.5">
          Horários locais de cada cidade. Jejum ao amanhecer segue o hanetz do lugar onde observa.
        </p>
      </div>
    )
  }

  return (
    <section
      className="rounded-xl border border-border/50 p-4 space-y-3 bg-background/60"
      aria-labelledby="zmanim-solar-heading"
    >
      <div className="flex items-center gap-2">
        <Sunrise className="w-4 h-4 text-amber-500" aria-hidden />
        <h2
          id="zmanim-solar-heading"
          className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 uppercase tracking-wider"
        >
          Nascer e pôr do sol
        </h2>
      </div>
      <p className="text-xs font-inter text-warmgray-500 leading-relaxed">
        Referência para jejuns e limites do dia: horas no fuso de cada local (Hebcal · NOAA). Comunidade em
        Franca usa em geral a coluna Brasil; Yerushalayim ajuda quando o ponto de referência é Eretz Israel.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <PlaceRow place={brasil} showTitles />
        <PlaceRow place={yerushalayim} showTitles />
      </div>
    </section>
  )
}
