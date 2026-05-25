import Link from 'next/link'
import { CalendarClock, Lock, ArrowLeft } from 'lucide-react'
import { getCurriculumByMonth } from '@/lib/manhigut-curriculum'
import { formatLeaderSincePt, type ManhigutProgress } from '@/lib/manhigut-progress'

interface Props {
  requestedMonth: number
  progress: ManhigutProgress
}

export function ManhigutModuleAheadGate({ requestedMonth, progress }: Props) {
  const current = progress.currentMonth ?? 1
  const currentModule = getCurriculumByMonth(current)
  const requestedModule = getCurriculumByMonth(requestedMonth)
  const sinceLabel = formatLeaderSincePt(progress.leaderSince?.toISOString() ?? null)

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <Link
        href="/lideres/formacao"
        className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Voltar à formação
      </Link>

      <div className="glass-card p-8 space-y-5 border-petroleum-800/25 dark:border-gold-500/30">
        <div className="flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-petroleum-800/10 dark:bg-gold-500/15 text-petroleum-700 dark:text-gold-400">
            <Lock className="h-7 w-7" aria-hidden />
          </span>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Ordem do Beit Midrash
          </p>
          <h1 className="font-cinzel text-2xl md:text-3xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Este módulo ainda não é o seu mês
          </h1>
        </div>

        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed text-center max-w-prose mx-auto">
          Você tentou abrir o{' '}
          <strong className="font-semibold text-foreground">
            Mês {String(requestedMonth).padStart(2, '0')}
          </strong>
          {requestedModule ? `: ${requestedModule.title}` : ''}. Pelo ciclo Manhigut, você está no{' '}
          <strong className="font-semibold text-foreground">
            Mês {String(current).padStart(2, '0')}
          </strong>
          {sinceLabel ? ` (líder aprovado em ${sinceLabel})` : ''}.
        </p>

        <div className="rounded-lg border border-border/60 bg-muted/30 p-4 space-y-3 text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          <p>
            Saltar meses enfraquece o preenchimento dos <strong className="font-semibold text-foreground">Kelim</strong>,
            os vasos interiores que recebem a Or Ein Sof módulo a módulo. Os Rabanim que guardam a Kabaláh
            luriânica autêntica desaconselham avançar além do mês em que o Talmid está no ciclo.
          </p>
          <p>
            Cada mês civil após sua aprovação como líder libera o próximo módulo publicado. Aguarde o tempo
            da Toráh, conclua o mês atual e retorne aqui quando o calendário do programa permitir.
          </p>
        </div>

        {currentModule && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href={`/lideres/formacao/${currentModule.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-petroleum-800 dark:bg-gold-500 px-5 py-2.5 text-sm font-inter font-semibold text-parchment-50 dark:text-petroleum-950 hover:opacity-90 transition-opacity"
            >
              <CalendarClock className="w-4 h-4" aria-hidden />
              Ir ao Mês {String(current).padStart(2, '0')} atual
            </Link>
            <Link
              href="/lideres/formacao"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-inter font-medium hover:bg-muted transition-colors"
            >
              Ver grade completa
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
