import Link from 'next/link'
import { Shield, Lock } from 'lucide-react'

interface LeaderGateProps {
  resourceName?: string
  description?: string
}

/**
 * Portal de líderes: acesso por aprovação do Rav (is_leader), não por pagamento premium.
 */
export function LeaderGate({
  resourceName = 'o Portal de Líderes',
  description,
}: LeaderGateProps) {
  const fallback =
    'O Portal de Líderes é reservado a irmãos e irmãs aprovados pelo Rav EBBY para servir na congregação. Assinar Premium não libera este acesso. Se você lidera ou deseja liderar, fale com a liderança.'

  return (
    <section
      className="mt-8 glass-card p-8 border-petroleum-800/20 dark:border-gold-500/20 space-y-5 text-center"
      aria-labelledby="leader-gate-heading"
    >
      <div className="flex justify-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-petroleum-800/10 dark:bg-gold-500/15 text-petroleum-700 dark:text-gold-400">
          <Lock className="h-7 w-7" aria-hidden="true" />
        </span>
      </div>
      <div>
        <p className="text-xs font-inter font-semibold text-petroleum-700 dark:text-gold-400 uppercase tracking-widest mb-2">
          Acesso por aprovação
        </p>
        <h2
          id="leader-gate-heading"
          className="font-cinzel text-2xl sm:text-3xl font-semibold text-petroleum-800 dark:text-parchment-100"
        >
          Entre para acessar {resourceName}
        </h2>
      </div>
      <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-prose mx-auto">
        {description || fallback}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          href="/auth"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-petroleum-800 dark:bg-gold-500 px-5 py-2.5 text-sm font-inter font-semibold text-parchment-50 dark:text-petroleum-950 hover:bg-petroleum-700 dark:hover:bg-gold-400 transition-colors"
        >
          Entrar na conta
        </Link>
        <Link
          href="/lideres"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-inter font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Shield className="h-4 w-4" aria-hidden="true" />
          Saiba mais sobre líderes
        </Link>
      </div>
    </section>
  )
}
