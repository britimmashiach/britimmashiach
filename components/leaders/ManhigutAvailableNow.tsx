import Link from 'next/link'
import { BookOpen, Sparkles } from 'lucide-react'
import type { ManhigutModule } from '@/lib/leader-modules-supabase'

interface Props {
  modules: ManhigutModule[]
}

const RECOMMENDED_ORDER = [6, 12, 18, 24]

export function ManhigutAvailableNow({ modules }: Props) {
  const available = modules
    .filter((m) => m.status === 'available')
    .sort((a, b) => RECOMMENDED_ORDER.indexOf(a.monthNum) - RECOMMENDED_ORDER.indexOf(b.monthNum))

  if (available.length === 0) return null

  return (
    <section className="glass-card p-6 md:p-8 space-y-5 ring-1 ring-gold-500/25 bg-gold-500/5">
      <div className="flex gap-3 items-start">
        <Sparkles className="w-6 h-6 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" aria-hidden />
        <div className="space-y-2">
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Disponível agora
          </p>
          <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
            {available.length} módulos publicados · encerramentos de cada estágio
          </h2>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-2xl">
            O Rav EBBY entregou os quatro módulos de encerramento do programa completo de vinte e quatro meses.
            Os módulos intermediários (meses 01 a 05, 07 a 11, etc.) serão publicados aqui conforme forem
            finalizados. Enquanto isso, estude nesta ordem recomendada:
          </p>
        </div>
      </div>

      <ol className="grid gap-3 sm:grid-cols-2">
        {available.map((mod, idx) => (
          <li key={mod.slug}>
            <Link
              href={`/lideres/formacao/${mod.slug}`}
              className="flex gap-3 p-4 rounded-lg border border-gold-500/20 bg-background/60 hover:border-gold-500/40 hover:bg-gold-500/5 transition-colors h-full"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-sm font-inter font-bold text-gold-700 dark:text-gold-400">
                {idx + 1}
              </span>
              <div className="space-y-1 min-w-0">
                <p className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400">
                  Mês {String(mod.monthNum).padStart(2, '0')} · Estágio {mod.stage}
                </p>
                <p className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 leading-snug">
                  {mod.title}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-inter font-semibold text-petroleum-700 dark:text-gold-400">
                  <BookOpen className="w-3 h-3" aria-hidden />
                  Abrir módulo →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}
