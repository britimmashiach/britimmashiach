import Link from 'next/link'
import { Lock, BookOpen, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ManhigutModule } from '@/lib/leader-modules-supabase'
import { STAGE_LABELS, type ManhigutStage } from '@/lib/manhigut-curriculum'

interface Props {
  modules: ManhigutModule[]
}

const STAGE_ORDER: ManhigutStage[] = [1, 2, 3, 4]

export function ManhigutCurriculumGrid({ modules }: Props) {
  return (
    <div className="space-y-10">
      {STAGE_ORDER.map((stage) => {
        const stageModules = modules.filter((m) => m.stage === stage)
        const available = stageModules.filter((m) => m.status === 'available').length
        return (
          <section key={stage} aria-labelledby={`stage-${stage}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <div>
                <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                  Estágio {stage}
                </p>
                <h2
                  id={`stage-${stage}`}
                  className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100"
                >
                  {STAGE_LABELS[stage]}
                </h2>
              </div>
              <p className="text-xs font-inter text-warmgray-500">
                {available}/{stageModules.length} módulos disponíveis
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {stageModules.map((mod) => (
                <li key={mod.slug}>
                  <ModuleCard module={mod} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

function ModuleCard({ module }: { module: ManhigutModule }) {
  const isAvailable = module.status === 'available'

  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400">
          Mês {String(module.monthNum).padStart(2, '0')}
          {module.isCapstone ? ' · Encerramento' : ''}
        </span>
        {isAvailable ? (
          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" aria-hidden />
        ) : (
          <Lock className="w-4 h-4 text-warmgray-400 shrink-0" aria-hidden />
        )}
      </div>
      <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100 leading-snug">
        {module.title}
      </h3>
      <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 line-clamp-2">
        {module.subtitle}
      </p>
      {isAvailable ? (
        <span className="inline-flex items-center gap-1 text-xs font-inter font-semibold text-petroleum-700 dark:text-gold-400 mt-auto pt-2">
          <BookOpen className="w-3 h-3" aria-hidden />
          Abrir módulo →
        </span>
      ) : (
        <span className="text-xs font-inter text-warmgray-400 mt-auto pt-2">
          {module.isCapstone ? 'Encerramento · aguardando publicação' : 'Entrega mensal em preparação'}
        </span>
      )}
    </>
  )

  if (isAvailable) {
    return (
      <Link
        href={`/lideres/formacao/${module.slug}`}
        className={cn(
          'glass-card p-4 h-full flex flex-col gap-2 transition-colors',
          'hover:border-gold-500/30 hover:bg-gold-500/5',
        )}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div className="glass-card p-4 h-full flex flex-col gap-2 opacity-75" aria-disabled="true">
      {inner}
    </div>
  )
}
