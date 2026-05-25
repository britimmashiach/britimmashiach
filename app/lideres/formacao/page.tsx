import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { LeaderPortalGuard, getLeaderFirstName } from '@/components/leaders/LeaderPortalGuard'
import { ManhigutCurriculumGrid } from '@/components/leaders/ManhigutCurriculumGrid'
import { ManhigutPastoralNote, ManhigutStageProgress } from '@/components/leaders/ManhigutPastoralNote'
import { getAuthSnapshot } from '@/lib/auth-snapshot'
import { fetchManhigutModulesForLeader } from '@/lib/leader-modules-supabase'
import { MANHIGUT_PROGRAM } from '@/lib/manhigut-curriculum'

export const metadata: Metadata = {
  title: 'Formação Manhigut',
  description:
    'Beit Midrash do Manhig: formação kabalística para líderes da Brit Im Mashiach, com respeito pastoral à jornada evangélica.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function LideresFormacaoPage() {
  const auth = await getAuthSnapshot()
  const firstName = await getLeaderFirstName()

  return (
    <LeaderPortalGuard resourceName="a Formação Manhigut">
      <FormacaoContent userId={auth.user?.id ?? null} firstName={firstName} />
    </LeaderPortalGuard>
  )
}

async function FormacaoContent({ userId, firstName }: { userId: string | null; firstName: string }) {
  const modules = await fetchManhigutModulesForLeader(userId)
  const availableCount = modules.filter((m) => m.status === 'available').length

  return (
    <div className="min-h-screen">
      <section className="border-b border-border/40 bg-petroleum-800/5 dark:bg-petroleum-950/40">
        <div className="container mx-auto px-4 py-10 max-w-4xl space-y-4">
          <Link
            href="/lideres/painel"
            className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Voltar ao painel
          </Link>
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            Programa Manhigut
          </p>
          <h1 className="font-cinzel text-3xl font-semibold text-petroleum-800 dark:text-parchment-100">
            {MANHIGUT_PROGRAM.name}
          </h1>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 max-w-2xl leading-relaxed">
            Shalom, {firstName}. Esta formação de vinte e quatro meses prepara o líder para ministrar com
            profundidade kabalística autêntica, fidelidade à Toráh e reverência a Yeshua como Mashiach judaico,
            sem desprezar quem ainda caminha entre tradições evangélicas e messiânicas.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        <ManhigutPastoralNote />
        <ManhigutStageProgress availableCount={availableCount} />
        <ManhigutCurriculumGrid modules={modules} />
      </section>
    </div>
  )
}
