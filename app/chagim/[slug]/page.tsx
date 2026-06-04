import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Crown } from 'lucide-react'
import { PdfButton } from '@/components/ui/PdfButton'
import {
  fetchChagSectionsByChagIdAdmin,
  fetchChagimSlugs,
  resolveChagBySlugAdmin,
} from '@/lib/chagim-supabase'
import { getAllChagSlugsForSitemap } from '@/lib/chagim-placeholders'
import { breadcrumbJsonLd, chagWebPageJsonLd, faqPageJsonLd } from '@/lib/json-ld'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { FaqSection } from '@/components/seo/FaqSection'
import { userHasPremiumAccess } from '@/lib/premium-access'
import { PremiumGate } from '@/components/ui/PremiumGate'
import { SignupGate } from '@/components/ui/SignupGate'
import { RichMarkdown } from '@/components/ui/RichMarkdown'
import { ChagHero } from '@/components/chagim/ChagHero'
import { getChagHeroProps } from '@/lib/chag-hero-props'
import { getAuthSnapshot } from '@/lib/auth-snapshot'
import { getChagFaqItems } from '@/lib/chag-seo-faq'
import { ChagRelatedLinks } from '@/components/chagim/ChagRelatedLinks'
import { ChagPardesTabs } from '@/components/chagim/ChagPardesTabs'
import { buildChagPardesPanels, chagHasPardesContent } from '@/lib/chag-pardes'

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

export default async function ChagDetailPage({ params }: Props) {
  const { slug } = await params
  const chag = await resolveChagBySlugAdmin(slug)
  if (!chag) notFound()

  const auth = await getAuthSnapshot()
  const isLoggedIn = !!auth.user
  const hasPremium = await userHasPremiumAccess()

  const heroProps = getChagHeroProps(slug)
  const allSections = await fetchChagSectionsByChagIdAdmin(chag.id)
  const publicSections = allSections.filter((s) => !s.isPremium)
  const displaySections = hasPremium ? allSections : publicSections
  const sections = heroProps ? displaySections.filter((s) => s.orderNum !== 1) : displaySections
  const lockedSectionsCount = hasPremium ? 0 : allSections.filter((s) => s.isPremium).length
  const fullyPremiumLocked = chag.isPremium && !hasPremium
  const faqItems = getChagFaqItems(chag.name, chag.isPremium)
  const pardesPanels = buildChagPardesPanels(chag, hasPremium)
  const showPardes = chagHasPardesContent(chag)

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
            peshat: chag.peshat,
            remez: chag.remez,
            drash: hasPremium ? chag.drash : undefined,
            sod: hasPremium ? chag.sod : undefined,
          }),
          breadcrumbJsonLd(crumbs),
          faqPageJsonLd(faqItems),
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

      {heroProps ? (
        <>
          <ChagHero {...heroProps} />
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            {chag.isPremium && (
              <span className="premium-badge">
                <Crown className="w-3 h-3" aria-hidden="true" />
                Premium
              </span>
            )}
            {chag.pdfUrl && isLoggedIn && hasPremium && (
              <PdfButton
                url={chag.pdfUrl}
                title={`${chag.name} — PDF`}
                label="Ler PDF do Chag"
              />
            )}
          </div>
        </>
      ) : (
        <>
          <header className="space-y-4 mb-8">
            {chag.isPremium && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="premium-badge">
                  <Crown className="w-3 h-3" aria-hidden="true" />
                  Premium
                </span>
              </div>
            )}
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
            {chag.pdfUrl && isLoggedIn && hasPremium && (
              <PdfButton url={chag.pdfUrl} title={`${chag.name} — PDF`} label="Ler PDF do Chag" />
            )}
          </header>
          {chag.content && (
            <>
              <hr className="divider-gold" />
              <article className="max-w-none mt-8">
                <RichMarkdown text={chag.content} />
              </article>
            </>
          )}
        </>
      )}

      {showPardes && <ChagPardesTabs chagName={chag.name} panels={pardesPanels} />}

      {sections.length > 0 && (
        <section className="mt-12 space-y-8" aria-labelledby="chag-sections-heading">
          <h2
            id="chag-sections-heading"
            className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100"
          >
            Seções do estudo
          </h2>
          {sections.map((sec) => (
            <div key={sec.id} className="glass-card p-5 md:p-6 space-y-2">
              <h3 className="font-cinzel text-lg md:text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
                {sec.title}
              </h3>
              <RichMarkdown text={sec.content} />
            </div>
          ))}
        </section>
      )}

      {fullyPremiumLocked && (
        <PremiumGate
          inline
          title={`Estudo completo de ${chag.name}`}
          description="O resumo e as seções públicas acima permanecem disponíveis para indexação. Kavannot, Sod, Tikun Leil e materiais kabalísticos avançados são exclusivos para assinantes Premium."
          backHref="/chagim"
          backLabel="Todos os Chagim"
        />
      )}

      {!fullyPremiumLocked && lockedSectionsCount > 0 && (
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

      <FaqSection items={faqItems} />

      <ChagRelatedLinks slug={slug} category={chag.category} />

      {!isLoggedIn && (
        <SignupGate
          resourceName={chag.name}
          description="Cadastre-se gratuitamente para salvar progresso, acessar PDFs quando liberados e receber novidades da congregação. O conteúdo introdutório desta página já está público para estudo e busca."
        />
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
