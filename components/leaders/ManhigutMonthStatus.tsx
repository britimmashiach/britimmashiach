import { CalendarClock } from 'lucide-react'
import { formatLeaderSincePt, type ManhigutProgress } from '@/lib/manhigut-progress'

interface Props {
  progress: ManhigutProgress
}

export function ManhigutMonthStatus({ progress }: Props) {
  if (progress.bypassMonthGate) return null

  const current = progress.currentMonth ?? 1
  const sinceLabel = formatLeaderSincePt(progress.leaderSince?.toISOString() ?? null)

  return (
    <div className="glass-card p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-gold-500/20 bg-gold-500/5">
      <div className="flex gap-3 items-start">
        <CalendarClock className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" aria-hidden />
        <div>
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Seu ciclo Manhigut
          </p>
          <p className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
            Você está no Mês {String(current).padStart(2, '0')} de 24
          </p>
          <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 mt-1">
            {sinceLabel
              ? `Contagem desde sua aprovação como líder em ${sinceLabel}. Um módulo novo a cada mês civil.`
              : 'Um módulo novo a cada mês civil após a aprovação como líder.'}
          </p>
        </div>
      </div>
    </div>
  )
}
