import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Crown, FileText, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  fetchChagSectionsByChagIdAdmin,
  fetchChagimSlugs,
  resolveChagBySlugAdmin,
} from '@/lib/chagim-supabase'
import { getAllChagSlugsForSitemap } from '@/lib/chagim-placeholders'
import { breadcrumbJsonLd, chagWebPageJsonLd } from '@/lib/json-ld'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { userHasPremiumAccess } from '@/lib/premium-access'
import { PremiumGate } from '@/components/ui/PremiumGate'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  const fromDb = await fetchChagimSlugs()
  const slugs = new Set([
    ...getAllChagSlugsForSitemap().map((s) => s.slug),
    ...fromDb.map((s) => s.slug),
  ])
  return [...slugs].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const chag = await resolveChagBySlugAdmin(slug)
  if (!chag) return { title: 'Chag não encontrado' }

  const origin = getPublicSiteOrigin()
  const url = `${origin}/chagim/${slug}`
  const title = chag.name
  const description = chag.summary

  if (chag.isPremium) {
    const allowed = await userHasPremiumAccess()
    if (!allowed) {
      return {
        title: `${chag.name} · Premium`,
        description,
        robots: { index: false, follow: true },
        alternates: { canonical: url },
      }
    }
  }

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url,
      title,
      description,
    },
  }
}

const PARDES_COLORS: Record<string, string> = {
  peshat: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  remez: 'bg-green-500/10 text-green-700 dark:text-green-400',
  drash: 'bg-gold-500/10 text-gold-700 dark:text-gold-400',
  sod: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
}

export default async function ChagDetailPage({ params }: Props) {
  const { slug } = await params
  const chag = await resolveChagBySlugAdmin(slug)
  if (!chag) notFound()

  const hasPremium = await userHasPremiumAccess()

  if (chag.isPremium && !hasPremium) {
    return (
      <PremiumGate
        title={chag.name}
        description="O estudo completo deste Chag (incluindo seções de Sod e materiais reservados) é exclusivo para assinantes Premium."
        backHref="/chagim"
        backLabel="Todos os Chagim"
      />
    )
  }

  const allSections = await fetchChagSectionsByChagIdAdmin(chag.id)
  const sections = hasPremium ? allSections : allSections.filter((s) => !s.isPremium)
  const lockedSectionsCount = allSections.length - sections.length
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Chagim', path: '/chagim' },
    { name: chag.name, path: `/chagim/${slug}` },
  ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <JsonLd
        data={[
          chagWebPageJsonLd({
            slug,
            name: chag.name,
            summary: chag.summary,
            publishedAt: chag.publishedAt || undefined,
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <Link
        href="/chagim"
        className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Todos os Chagim
      </Link>

      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {chag.levelPardes.map((lvl) => (
            <span
              key={lvl}
              className={cn(
                'text-xs font-inter font-medium px-2.5 py-0.5 rounded-full capitalize',
                PARDES_COLORS[lvl] ?? 'bg-muted text-warmgray-500',
              )}
            >
              {lvl}
            </span>
          ))}
          {chag.isPremium && (
            <span className="premium-badge">
              <Crown className="w-3 h-3" aria-hidden="true" />
              Premium
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-cinzel text-3xl md:text-4xl font-semibold text-petroleum-800 dark:text-parchment-100">
            {chag.name}
          </h1>
          <p
            className="font-hebrew text-2xl text-warmgray-500 dark:text-warmgray-400 flex-shrink-0"
            dir="rtl"
            lang="he"
          >
            {chag.nameHebrew}
          </p>
        </div>
        <p className="font-cormorant text-xl italic text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          {chag.summary}
        </p>
        {chag.pdfUrl && (
          <a
            href={chag.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            PDF do Chag
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </header>
      <hr className="divider-gold" />
      <article className="prose prose-sm md:prose-base max-w-none mt-8 dark:prose-invert">
        {chag.content.split('\n').map((line, i) => {
          if (line.trim() === '') return <br key={i} />
          return (
            <p key={i} className="font-inter text-base text-foreground leading-relaxed mb-4">
              {line}
            </p>
          )
        })}
      </article>
      {sections.length > 0 && (
        <section className="mt-12 space-y-8" aria-labelledby="chag-sections-heading">
          <h2
            id="chag-sections-heading"
            className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100"
          >
            Seções do estudo
          </h2>
          {sections.map((sec) => (
            <div key={sec.id} className="glass-card p-5 space-y-3">
              <h3 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
                {sec.title}
              </h3>
              {sec.content.split('\n').map((line, i) =>
                line.trim() === '' ? (
                  <br key={i} />
                ) : (
                  <p key={i} className="font-inter text-sm text-foreground leading-relaxed">
                    {line}
                  </p>
                ),
              )}
            </div>
          ))}
        </section>
      )}
      {lockedSectionsCount > 0 && (
        <section className="mt-8 glass-card p-5 border-gold-500/25 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 space-y-1">
            <p className="text-xs font-inter font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
              Seções reservadas
            </p>
            <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
              {lockedSectionsCount === 1
                ? 'Mais uma seção (Sod, Kavannot ou material aprofundado) está disponível para assinantes Premium.'
                : `Mais ${lockedSectionsCount} seções (Sod, Kavannot ou material aprofundado) estão disponíveis para assinantes Premium.`}
            </p>
          </div>
          <Link
            href="/premium"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-inter font-semibold text-petroleum-950 hover:bg-gold-400 transition-colors flex-shrink-0"
          >
            <Crown className="h-4 w-4 shrink-0" aria-hidden="true" />
            Liberar Premium
          </Link>
        </section>
      )}
      <footer className="mt-10 glass-card p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-petroleum-gradient flex items-center justify-center flex-shrink-0">
          <span className="font-hebrew text-sm text-gold-400">ר</span>
        </div>
        <div>
          <p className="text-sm font-inter font-medium text-foreground">Rav Eliahu Barzilay ben Yehoshua</p>
          <p className="text-xs font-inter text-warmgray-500">Congregação Brit Im Mashiach, Franca, São Paulo</p>
        </div>
      </footer>
    </div>
  )
}