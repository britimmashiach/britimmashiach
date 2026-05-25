import { GraduationCap, Heart } from 'lucide-react'
import { MANHIGUT_PROGRAM } from '@/lib/manhigut-curriculum'

export function ManhigutPastoralNote() {
  return (
    <div className="glass-card p-6 md:p-8 space-y-4 border-gold-500/20">
      <div className="flex gap-3 items-start">
        <Heart className="w-6 h-6 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" aria-hidden />
        <div className="space-y-3">
          <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
            Palavra pastoral do Beit Midrash
          </h2>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            {MANHIGUT_PROGRAM.pastoralNote}
          </p>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            Muitos de nossos alunos ainda vêm de igrejas evangélicas e carregam amor sincero por Yeshua,
            pela Escritura e pela oração comunitária. Honramos essa jornada. O Manhigut não pede abandono
            da fé, mas aprofundamento dentro da Toráh, da Halacháh e da Kabaláh Luriana autêntica, com
            Yeshua compreendido como judeu plenamente observante e Mashiach no quadro de Israel.
          </p>
        </div>
      </div>
    </div>
  )
}

interface ManhigutStageProgressProps {
  availableCount: number
  totalMonths?: number
}

export function ManhigutStageProgress({ availableCount, totalMonths = 24 }: ManhigutStageProgressProps) {
  const pct = Math.round((availableCount / totalMonths) * 100)
  return (
    <div className="glass-card p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div className="flex gap-3 items-start">
        <GraduationCap className="w-6 h-6 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden />
        <div>
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Programa Manhigut
          </p>
          <p className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
            {MANHIGUT_PROGRAM.name}
          </p>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
            Certificação {MANHIGUT_PROGRAM.certification} · {availableCount} de {totalMonths} módulos disponíveis
          </p>
        </div>
      </div>
      <div className="sm:w-40 space-y-1">
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gold-500 transition-all"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${pct}% do programa disponível`}
          />
        </div>
        <p className="text-xs font-inter text-warmgray-500 text-right">{pct}% publicado</p>
      </div>
    </div>
  )
}
