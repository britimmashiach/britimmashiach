import Link from 'next/link'
import { Lock, BookOpen, ScrollText } from 'lucide-react'
import { getAuthSnapshot } from '@/lib/auth-snapshot'
import { profileHasConcludedFormation } from '@/lib/leader-access-policy'
import { RichMarkdown } from '@/components/ui/RichMarkdown'
import type { ImersaoManual } from '@/lib/imersoes-content'

interface ImersaoMaterialProps {
  manuals: ImersaoManual[]
}

/**
 * Material completo das Imersões (manuais de facilitação).
 * Restrito a líderes com formação concluída ou admin
 * (profileHasConcludedFormation). Os demais veem um aviso de bloqueio.
 */
export async function ImersaoMaterial({ manuals }: ImersaoMaterialProps) {
  const auth = await getAuthSnapshot()
  const isLoggedIn = Boolean(auth.user)
  const hasAccess = profileHasConcludedFormation(auth.profile)

  if (!hasAccess) {
    return <MaterialLocked isLoggedIn={isLoggedIn} />
  }

  return (
    <div className="space-y-14">
      {manuals.map((manual) => (
        <article key={manual.title} className="scroll-mt-24">
          <header className="mb-6 border-b border-gold-500/20 pb-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <ScrollText className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                Material de facilitação
              </span>
            </div>
            <h2 className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
              {manual.title}
            </h2>
            <p className="mt-1 text-xs font-inter text-warmgray-500">{manual.source}</p>
          </header>
          <RichMarkdown text={manual.markdown} />
        </article>
      ))}
    </div>
  )
}

function MaterialLocked({ isLoggedIn }: { isLoggedIn: boolean }) {
  const description = isLoggedIn
    ? 'Este material de facilitação é reservado a líderes que concluíram a formação da Escola Rav EBBY. Sua conta ainda não consta com a formação concluída. A liberação é feita pelo Rav EBBY após a conclusão e o discernimento pastoral.'
    : 'Este material de facilitação é reservado a líderes que concluíram a formação da Escola Rav EBBY. Entre com sua conta de líder para acessar. Assinar Premium não libera este conteúdo.'

  return (
    <section
      className="glass-card p-8 border-petroleum-800/20 dark:border-gold-500/20 space-y-5 text-center"
      aria-labelledby="imersao-material-locked"
    >
      <div className="flex justify-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-petroleum-800/10 dark:bg-gold-500/15 text-petroleum-700 dark:text-gold-400">
          <Lock className="h-7 w-7" aria-hidden="true" />
        </span>
      </div>
      <div>
        <p className="text-xs font-inter font-semibold text-petroleum-700 dark:text-gold-400 uppercase tracking-widest mb-2">
          Acesso por conclusão da formação
        </p>
        <h2
          id="imersao-material-locked"
          className="font-cinzel text-2xl sm:text-3xl font-semibold text-petroleum-800 dark:text-parchment-100"
        >
          Material completo dos facilitadores
        </h2>
      </div>
      <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-prose mx-auto">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        {!isLoggedIn && (
          <Link
            href="/auth"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-petroleum-800 dark:bg-gold-500 px-5 py-2.5 text-sm font-inter font-semibold text-parchment-50 dark:text-petroleum-950 hover:bg-petroleum-700 dark:hover:bg-gold-400 transition-colors"
          >
            Entrar na conta
          </Link>
        )}
        <Link
          href="/lideres/formacao"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-inter font-medium text-foreground hover:bg-muted transition-colors"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Formação de líderes
        </Link>
      </div>
    </section>
  )
}
