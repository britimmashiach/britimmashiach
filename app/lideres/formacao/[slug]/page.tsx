import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, GraduationCap } from 'lucide-react'
import { LeaderPortalGuard } from '@/components/leaders/LeaderPortalGuard'
import { ManhigutSalutation } from '@/components/leaders/ManhigutSalutation'
import { RichMarkdown } from '@/components/ui/RichMarkdown'
import { getAuthSnapshot } from '@/lib/auth-snapshot'
import { fetchManhigutModuleBySlug, fetchManhigutModuleSlugs } from '@/lib/leader-modules-supabase'
import { prepareManhigutMarkdownForDisplay } from '@/lib/manhigut-content'
import { getCurriculumBySlug } from '@/lib/manhigut-curriculum'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return fetchManhigutModuleSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const curriculum = getCurriculumBySlug(slug)
  if (!curriculum) return { title: 'Módulo não encontrado' }

  return {
    title: `Manhigut · Mês ${curriculum.monthNum}`,
    description: curriculum.subtitle,
    robots: { index: false, follow: false },
  }
}

export default async function ManhigutModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const curriculum = getCurriculumBySlug(slug)
  if (!curriculum) notFound()

  const auth = await getAuthSnapshot()

  return (
    <LeaderPortalGuard resourceName="este módulo de formação">
      <ModuleReader slug={slug} userId={auth.user?.id ?? null} firstName={auth.sessionDisplay?.firstName ?? null} />
    </LeaderPortalGuard>
  )
}

async function ModuleReader({
  slug,
  userId,
  firstName,
}: {
  slug: string
  userId: string | null
  firstName: string | null
}) {
  const mod = await fetchManhigutModuleBySlug(slug, userId)
  const displayContent = mod ? prepareManhigutMarkdownForDisplay(mod.content) : ''

  if (!mod || mod.status !== 'available') {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
        <Link
          href="/lideres/formacao"
          className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Voltar à formação
        </Link>
        <div className="glass-card p-8 text-center space-y-3">
          <GraduationCap className="w-10 h-10 mx-auto text-warmgray-400" aria-hidden />
          <h1 className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Módulo em preparação
          </h1>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 max-w-md mx-auto">
            O Rav EBBY ainda está finalizando este módulo para publicação no portal. Continue acompanhando
            a grade na página de formação.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Link
        href="/lideres/formacao"
        className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Voltar à formação Manhigut
      </Link>

      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-inter">
          <span className="px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-700 dark:text-gold-400 font-medium">
            Estágio {mod.stage} · {mod.stageLabel}
          </span>
          <span className="text-warmgray-400">Mês {String(mod.monthNum).padStart(2, '0')}</span>
          <span className="flex items-center gap-1 text-warmgray-400">
            <Clock className="w-3 h-3" aria-hidden />
            {mod.readingTimeMinutes} min
          </span>
        </div>

        <h1 className="font-cinzel text-3xl md:text-4xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight">
          {mod.title}
        </h1>

        {mod.subtitle && (
          <p className="font-cormorant text-lg italic text-warmgray-600 dark:text-warmgray-400">
            {mod.subtitle}
          </p>
        )}

        {mod.excerpt && (
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed border-l-2 border-gold-500/40 pl-4">
            {mod.excerpt}
          </p>
        )}

        <p className="text-xs font-inter text-warmgray-400">Por rav EBBY · Programa Manhigut</p>
      </header>

      <hr className="divider-gold mb-6" />

      <ManhigutSalutation firstName={firstName} className="mb-8" />

      <article className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
        <RichMarkdown text={displayContent} />
      </article>

      <div className="mt-10 glass-card p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-petroleum-gradient flex items-center justify-center flex-shrink-0">
          <span className="font-hebrew text-sm text-gold-400">ר</span>
        </div>
        <div>
          <p className="text-sm font-inter font-medium text-foreground">Rav Eliahu Barzilay ben Yehoshua</p>
          <p className="text-xs font-inter text-warmgray-500">
            Beit Midrash do Manhig · Brit Im Mashiach, Franca SP
          </p>
        </div>
      </div>
    </div>
  )
}
