'use client'

import Link from 'next/link'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCountdown } from '@/hooks/useCountdown'
import { chagTargetTimestamp, countdownProgress } from '@/lib/chag-countdown'
import type { NextChag } from '@/lib/hebrew-date'

interface ChagCountdownCardProps {
  nextChag: NextChag
  className?: string
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[2.75rem]">
      <span className="font-cinzel text-xl font-bold text-petroleum-800 dark:text-parchment-100 tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] font-inter text-warmgray-400 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}

/** Contagem regressiva ao vivo até o próximo Chag, com barra que esvazia conforme o dia se aproxima. */
export function ChagCountdownCard({ nextChag, className }: ChagCountdownCardProps) {
  const target = chagTargetTimestamp(nextChag.isoDate)
  const countdown = useCountdown(target)

  if (!countdown) return null

  const progress = countdownProgress(countdown.totalMs)

  return (
    <div className={cn('glass-card p-4 space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-inter font-semibold text-warmgray-400 uppercase tracking-widest">
          Contagem para o próximo Chag
        </span>
        <Flame className="w-3.5 h-3.5 text-gold-500/70 flex-shrink-0" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-3">
        <span
          className="font-hebrew text-2xl text-gold-600 dark:text-gold-400 flex-shrink-0"
          dir="rtl"
          lang="he"
        >
          {nextChag.hebrew}
        </span>
        <Link
          href="/chagim"
          className="min-w-0 font-inter text-sm font-medium text-foreground hover:text-gold-600 dark:hover:text-gold-400 transition-colors truncate"
        >
          {nextChag.name}
        </Link>
      </div>

      <div
        className="flex items-center justify-between gap-1"
        role="timer"
        aria-live="polite"
        aria-label={`Faltam ${countdown.days} dias, ${countdown.hours} horas, ${countdown.minutes} minutos e ${countdown.seconds} segundos para ${nextChag.name}`}
      >
        <TimeUnit value={countdown.days} label="dias" />
        <span className="text-warmgray-300 dark:text-warmgray-600 pb-3" aria-hidden="true">:</span>
        <TimeUnit value={countdown.hours} label="horas" />
        <span className="text-warmgray-300 dark:text-warmgray-600 pb-3" aria-hidden="true">:</span>
        <TimeUnit value={countdown.minutes} label="min" />
        <span className="text-warmgray-300 dark:text-warmgray-600 pb-3" aria-hidden="true">:</span>
        <TimeUnit value={countdown.seconds} label="seg" />
      </div>

      <div
        className="h-1.5 bg-muted rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Proximidade do Chag"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
