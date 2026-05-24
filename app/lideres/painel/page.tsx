import type { Metadata } from 'next'
import Link from 'next/link'
import { getAuthSnapshot } from '@/lib/auth-snapshot'
import { userHasLeaderAccess } from '@/lib/leader-access'
import { LeaderGate } from '@/components/ui/LeaderGate'
import { BookOpen, Calendar, FileText, MessageCircle, Crown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painel de Lideres',
  description: 'Materiais e avisos para lideres aprovados da Brit Im Mashiach.',
}

export const dynamic = 'force-dynamic'

const resources = [
  {
    icon: FileText,
    title: 'Roteiros de estudo',
    text: 'Guias para conduzir estudos em casa ou celulas. Em expansao.',
    href: '/studies',
    cta: 'Ver estudos publicos',
  },
  {
    icon: Calendar,
    title: 'Calendario liturgico',
    text: 'Moedim, Parashot e zmanim para planejar reunioes e ensino.',
    href: '/calendar',
    cta: 'Abrir calendario',
  },
  {
    icon: BookOpen,
    title: 'Parashot da semana',
    text: 'Aliyot e material PaRDeS para preparar mensagens.',
    href: '/parashot',
    cta: 'Ver Parashot',
  },
  {
    icon: Crown,
    title: 'Conteudo Premium',
    text: 'Lideres podem assinar Premium separadamente para Netivot e Kabala aprofundada.',
    href: '/premium',
    cta: 'Sobre Premium',
  },
]

export default async function LideresPainelPage() {
  const auth = await getAuthSnapshot()
  const isLoggedIn = Boolean(auth.user)
  const hasLeader = isLoggedIn && (await userHasLeaderAccess())

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <LeaderGate resourceName="o Painel de Lideres" />
      </div>
    )
  }

  if (!hasLeader) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <LeaderGate
          resourceName="o Painel de Lideres"
          description="Sua conta esta ativa, mas ainda nao consta como lider aprovado. O Rav EBBY libera o acesso manualmente apos conversa e discernimento. Premium pago nao libera este painel."
        />
      </div>
    )
  }

  const firstName = auth.sessionDisplay?.firstName ?? 'Lider'

  return (
    <div className="min-h-screen">
      <section className="border-b border-border/40 bg-petroleum-800/5 dark:bg-petroleum-950/40">
        <div className="container mx-auto px-4 py-10 max-w-4xl space-y-2">
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Portal de lideres
          </p>
          <h1 className="font-cinzel text-3xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Shalom, {firstName}
          </h1>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 max-w-2xl">
            Bem-vindo ao painel reservado a lideres aprovados. Novos modulos (PDFs exclusivos, checklist de
            ministerio, avisos do Rav) serao adicionados aqui.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {resources.map(({ icon: Icon, title, text, href, cta }) => (
            <div key={title} className="glass-card p-6 space-y-3 flex flex-col">
              <Icon className="w-7 h-7 text-gold-600 dark:text-gold-400" aria-hidden />
              <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">{title}</h2>
              <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed flex-1">{text}</p>
              <Link href={href} className="text-sm font-inter font-semibold text-petroleum-700 dark:text-gold-400 hover:underline">
                {cta} →
              </Link>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3">
            <MessageCircle className="w-6 h-6 text-gold-600 shrink-0 mt-0.5" aria-hidden />
            <div>
              <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
                Fale com a lideranca
              </h2>
              <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
                Duvidas sobre ministerio, eventos ou materiais novos.
              </p>
            </div>
          </div>
          <Link
            href="/sobre"
            className="shrink-0 rounded-lg border border-border px-4 py-2 text-sm font-inter font-medium hover:bg-muted transition-colors"
          >
            Contatos
          </Link>
        </div>
      </section>
    </div>
  )
}
