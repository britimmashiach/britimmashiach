import Link from 'next/link'
import { ArrowLeft, Crown, Lock } from 'lucide-react'

interface PremiumGateProps {
  title: string
  description?: string
  backHref: string
  backLabel: string
  eyebrow?: string
}

/**
 * Página de venda quando o conteúdo está marcado como is_premium=true
 * e o visitante não tem plano premium ou admin.
 */
export function PremiumGate({
  title,
  description,
  backHref,
  backLabel,
  eyebrow = 'Conteúdo Premium',
}: PremiumGateProps) {
  const fallbackDescription =
    'Este estudo é exclusivo para assinantes Premium. Ative o plano para liberar o material completo e o restante do acervo reservado.'

  return (
    <div className="container mx-auto px-4 py-10 max-w-lg">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        {backLabel}
      </Link>

      <div className="glass-card p-8 border-gold-500/25 space-y-5 text-center">
        <div className="flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
            <Lock className="h-7 w-7" aria-hidden="true" />
          </span>
        </div>
        <div>
          <p className="text-xs font-inter font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-2">
            {eyebrow}
          </p>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-semibold text-petroleum-800 dark:text-parchment-100">
            {title}
          </h1>
        </div>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          {description || fallbackDescription}
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
