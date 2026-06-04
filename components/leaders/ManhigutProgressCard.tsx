import Link from 'next/link'
import { GraduationCap, ArrowRight } from 'lucide-react'
import { MANHIGUT_TOTAL_MONTHS, type ManhigutProgress } from '@/lib/manhigut-progress'

interface Props {
  progress: ManhigutProgress
  availableCount: number
}

/** Resumo do progresso na Formação Manhigut, exibido no painel de líderes. */
export function ManhigutProgressCard({ progress, availableCount }: Props) {
  const total = MANHIGUT_TOTAL_MONTHS
  const current = progress.bypassMonthGate ? total : (progress.currentMonth ?? 1)
  const pct = Math.round((current / total) * 100)

  return (
    <div className="glass-card p-6 space-y-4 ring-1 ring-gold-500/25 bg-gold-500/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <GraduationCap className="w-7 h-7 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden />
          <div>
            <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
              Formação Manhigut
            </p>
            <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
              {progress.bypassMonthGate
                ? 'Acesso integral (admin)'
                : `Mês ${String(current).padStart(2, '0')} de ${total}`}
            </h2>
          </div>
        </div>
        <Link
          href="/lideres/formacao"
          className="shrink-0 inline-flex items-center gap-1.5 text-sm font-inter font-semibold text-petroleum-700 dark:text-gold-400 hover:underline"
        >
          Continuar
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>

      <div
        className="h-2.5 w-full rounded-full bg-petroleum-800/10 dark:bg-parchment-100/10 overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso da Formação Manhigut"
      >
        <div
          className="h-full rounded-full bg-gold-500 dark:bg-gold-400 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400">
        {availableCount > 0
          ? `${availableCount} ${availableCount === 1 ? 'módulo disponível' : 'módulos disponíveis'} para estudo agora.`
          : 'Os módulos do seu ciclo serão liberados conforme as publicações do Rav EBBY.'}
      </p>
    </div>
  )
}
