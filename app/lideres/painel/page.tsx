import type { Metadata } from 'next'
import Link from 'next/link'
import { getAuthSnapshot } from '@/lib/auth-snapshot'
import { profileHasLeaderAccess } from '@/lib/leader-access-policy'
import { getManhigutProgressFromProfile } from '@/lib/manhigut-progress'
import { fetchManhigutModulesForLeader } from '@/lib/leader-modules-supabase'
import { fetchLeaderAnnouncements, fetchLeaderResources } from '@/lib/leader-portal-supabase'
import { ManhigutSalutation } from '@/components/leaders/ManhigutSalutation'
import { ManhigutProgressCard } from '@/components/leaders/ManhigutProgressCard'
import { LeaderAnnouncements } from '@/components/leaders/LeaderAnnouncements'
import { LeaderResourcesList } from '@/components/leaders/LeaderResourcesList'
import { ShlomoStamDownload } from '@/components/leaders/ShlomoStamDownload'
import { MinistryChecklist } from '@/components/leaders/MinistryChecklist'
import { LeaderGate } from '@/components/ui/LeaderGate'
import { BookOpen, Calendar, FileText, MessageCircle, Crown, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painel de Líderes',
  description: 'Materiais e avisos para líderes aprovados da Brit Im Mashiach.',
}

export const dynamic = 'force-dynamic'

const resources = [
  {
    icon: GraduationCap,
    title: 'Formação Manhigut',
    text: 'Beit Midrash do Manhig: vinte e quatro módulos kabalísticos para líderes, com reverência à jornada evangélica e profundidade rabínica.',
    href: '/lideres/formacao',
    cta: 'Abrir formação',
    featured: true,
  },
  {
    icon: FileText,
    title: 'Roteiros de estudo',
    text: 'Guias para conduzir estudos em casa ou células. Em expansão.',
    href: '/studies',
    cta: 'Ver estudos públicos',
  },
  {
    icon: Calendar,
    title: 'Calendário litúrgico',
    text: 'Moedim, Parashot e zmanim para planejar reuniões e ensino.',
    href: '/calendar',
    cta: 'Abrir calendário',
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
    title: 'Conteúdo Premium',
    text: 'Líderes podem assinar Premium separadamente para Netivot e Kabalá aprofundada.',
    href: '/premium',
    cta: 'Sobre Premium',
  },
]

export default async function LideresPainelPage() {
  const auth = await getAuthSnapshot()
  const isLoggedIn = Boolean(auth.user)
  const hasLeader = isLoggedIn && profileHasLeaderAccess(auth.profile)

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <LeaderGate resourceName="o Painel de Líderes" />
      </div>
    )
  }

  if (!hasLeader) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <LeaderGate
          resourceName="o Painel de Líderes"
          description="Sua conta está ativa, mas ainda não consta como líder aprovado. O Rav EBBY libera o acesso manualmente após conversa e discernimento. Premium pago não libera este painel."
        />
      </div>
    )
  }

  const firstName = auth.sessionDisplay?.firstName ?? 'Líder'
  const progress = getManhigutProgressFromProfile(auth.profile)
  const [modules, announcements, leaderResources] = await Promise.all([
    fetchManhigutModulesForLeader(auth.user?.id ?? null),
    fetchLeaderAnnouncements(),
    fetchLeaderResources(),
  ])
  const availableCount = modules.filter((m) => m.status === 'available').length

  return (
    <div className="min-h-screen">
      <section className="border-b border-border/40 bg-petroleum-800/5 dark:bg-petroleum-950/40">
        <div className="container mx-auto px-4 py-10 max-w-4xl space-y-2">
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Portal de líderes
          </p>
          <ManhigutSalutation firstName={firstName} compact className="mb-1" />
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 max-w-2xl">
            Bem-vindo ao painel reservado a líderes aprovados. Acompanhe sua Formação Manhigut, os avisos do
            Rav, os materiais exclusivos e seu checklist de ministério.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-4xl space-y-10">
        <ManhigutProgressCard progress={progress} availableCount={availableCount} />

        <LeaderAnnouncements announcements={announcements} />

        <ShlomoStamDownload />

        <div className="grid gap-5 sm:grid-cols-2">
          {resources.map(({ icon: Icon, title, text, href, cta, featured }) => (
            <div
              key={title}
              className={`glass-card p-6 space-y-3 flex flex-col${featured ? ' ring-1 ring-gold-500/25 bg-gold-500/5' : ''}`}
            >
              <Icon className="w-7 h-7 text-gold-600 dark:text-gold-400" aria-hidden />
              <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">{title}</h2>
              <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed flex-1">{text}</p>
              <Link href={href} className="text-sm font-inter font-semibold text-petroleum-700 dark:text-gold-400 hover:underline">
                {cta} →
              </Link>
            </div>
          ))}
        </div>

        <LeaderResourcesList resources={leaderResources} />

        <MinistryChecklist />

        <div className="glass-card p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3">
            <MessageCircle className="w-6 h-6 text-gold-600 shrink-0 mt-0.5" aria-hidden />
            <div>
              <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
                Fale com a liderança
              </h2>
              <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
                Dúvidas sobre ministério, eventos ou materiais novos.
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
