import Link from 'next/link'
import { ArrowLeft, Crown, Lock } from 'lucide-react'
import { getParashaTitle } from '@/lib/parashot-registry'

interface ParashaPremiumGateProps {
  slug: string
}

/** Página de venda quando a Parasháh está marcada como premium e o visitante não tem plano. */
export function ParashaPremiumGate({ slug }: ParashaPremiumGateProps) {
  const title = getParashaTitle(slug)

  return (
    <div className="container mx-auto px-4 py-10 max-w-lg">
      <Link
        href="/parashot"
        className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Todas as Parashot
      </Link>

      <div className="glass-card p-8 border-gold-500/25 space-y-5 text-center">
        <div className="flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
            <Lock className="h-7 w-7" aria-hidden="true" />
          </span>
        </div>
        <div>
          <p className="text-xs font-inter font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-2">
            Conteúdo Premium
          </p>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-semibold text-petroleum-800 dark:text-parchment-100">
            {title}
          </h1>
        </div>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          O estudo completo desta Parasháh (incluindo aliyot e materiais reservados) é exclusivo para
          assinantes Premium. O link pelo calendário ou pela lista leva aqui até você ativar o plano.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/premium"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-inter font-semibold text-petroleum-950 hover:bg-gold-400 transition-colors"
          >
            <Crown className="h-4 w-4 shrink-0" aria-hidden="true" />
            Ver plano Premium
          </Link>
          <Link
            href="/auth"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-inter font-medium text-foreground hover:bg-muted transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  )
}
