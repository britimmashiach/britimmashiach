import Link from 'next/link'
import { Lock, Crown } from 'lucide-react'

interface SignupGateProps {
  /** Nome do Chag (ou recurso), exibido no titulo. */
  resourceName: string
  /** Texto curto explicando o que ha alem do gate. */
  description?: string
}

/**
 * Bloqueia o conteudo de uma pagina para visitantes nao logados.
 * Diferente do PremiumGate: este e mostrado abaixo do hero (nao
 * substitui a pagina inteira) e tem CTA primario de cadastro
 * gratuito, nao de assinatura paga.
 *
 * Premium continua sendo gating separado, aplicado por secao
 * apenas para usuarios autenticados.
 */
export function SignupGate({ resourceName, description }: SignupGateProps) {
  const fallback =
    'Cadastre-se gratuitamente na Brit Im Mashiach para acessar o conteúdo completo deste Chag. Membros gratuitos veem todas as seções públicas. As seções aprofundadas (Kabalá luriana, Tikun Leil, PaRDeS) ficam reservadas a assinantes Premium.'

  return (
    <section
      className="mt-8 glass-card p-8 border-gold-500/25 space-y-5 text-center"
      aria-labelledby="signup-gate-heading"
    >
      <div className="flex justify-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-petroleum-800/10 dark:bg-gold-500/15 text-petroleum-700 dark:text-gold-400">
          <Lock className="h-7 w-7" aria-hidden="true" />
        </span>
      </div>
      <div>
        <p className="text-xs font-inter font-semibold text-petroleum-700 dark:text-gold-400 uppercase tracking-widest mb-2">
          Conteúdo para membros
        </p>
        <h2
          id="signup-gate-heading"
          className="font-cinzel text-2xl sm:text-3xl font-semibold text-petroleum-800 dark:text-parchment-100"
        >
          Entre para ler {resourceName} completo
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
          Criar conta gratuita
        </Link>
        <Link
          href="/auth"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-inter font-medium text-foreground hover:bg-muted transition-colors"
        >
          Já tenho conta
        </Link>
      </div>
      <p className="text-[11px] font-inter text-warmgray-500 leading-relaxed pt-2 flex items-center justify-center gap-1">
        <Crown className="h-3 w-3 shrink-0" aria-hidden="true" />
        Premium libera Kabala, Tikun Leil e PaRDeS aprofundados
      </p>
    </section>
  )
}
