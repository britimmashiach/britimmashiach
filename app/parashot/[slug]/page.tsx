import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Crown, FileText, ExternalLink } from 'lucide-react'
import { fetchParashaBySlug, fetchAliyotByParasha } from '@/lib/parashot-supabase'
import { getParashaTitle, getParashaEntry } from '@/lib/parashot-registry'
import { AliyotList } from '@/components/parashot/AliyotList'
import { ParashaPremiumGate } from '@/components/parashot/ParashaPremiumGate'
import { getBookTheme } from '@/lib/book-themes'
import { cn } from '@/lib/utils'
import { userHasPremiumParashaAccess } from '@/lib/parashot-access-server'
import { OFFICIAL_PARASHOT } from '@/lib/parashot-registry'
import { fetchParashaSlugs } from '@/lib/parashot-supabase'
import { parashaWebPageJsonLd } from '@/lib/json-ld'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { JsonLd } from '@/components/seo/JsonLd'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const fromDb = await fetchParashaSlugs()
  const slugs = new Set([...OFFICIAL_PARASHOT.map((p) => p.slug), ...fromDb.map((p) => p.slug)])
  return [...slugs].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const parasha = await fetchParashaBySlug(slug)
  if (!parasha) return { title: 'Parashá não encontrada' }

  const origin = getPublicSiteOrigin()
  const url = `${origin}/parashot/${slug}`
  const title = `Parasháh ${getParashaTitle(parasha.slug)}`
  const description = parasha.summary || `Estudo da Parasháh ${getParashaTitle(slug)} com Aliyot e análise PaRDeS.`

  if (parasha.isPremium) {
    const allowed = await userHasPremiumParashaAccess()
    if (!allowed) {
      return {
        title: `${getParashaTitle(slug)} · Premium`,
        description: 'Estudo completo desta Parasháh disponível para assinantes Premium.',
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

export default async function ParashaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const parasha = await fetchParashaBySlug(slug)
  if (!parasha) notFound()

  const canReadFull = !parasha.isPremium || (await userHasPremiumParashaAccess())
  if (!canReadFull) {
    return <ParashaPremiumGate slug={slug} />
  }

  const jsonLd = parashaWebPageJsonLd({
    slug: parasha.slug,
    title: getParashaTitle(parasha.slug),
    description: parasha.summary,
    publishedAt: parasha.publishedAt,
  })

  const aliyot = await fetchAliyotByParasha(parasha.id)

  const entry = getParashaEntry(parasha.slug)
  const book = entry?.book ?? parasha.book
  const bookTheme = getBookTheme(book)

  return (
    <div className="relative min-h-screen">
      <JsonLd data={jsonLd} />
      {/* Glow sutil por livro — quase imperceptível, sentido, não visto */}
      {bookTheme.glow && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: bookTheme.glow }}
          aria-hidden="true"
        />
      )}

      <div className="container mx-auto px-4 py-10 max-w-3xl relative">
        <Link
          href="/parashot"
          className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Todas as Parashot
        </Link>

        {/* Cabeçalho */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('text-xs font-inter font-medium px-2.5 py-0.5 rounded-full', bookTheme.accentClass)}>
              {book}
            </span>
            <span className="text-xs font-inter text-warmgray-400">
              Semana {entry?.weekNumber ?? parasha.weekNumber}
            </span>
            {parasha.isPremium && (
              <span className="premium-badge">
                <Crown className="w-3 h-3" />
                Premium
              </span>
            )}
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-cinzel text-4xl font-semibold text-petroleum-800 dark:text-parchment-100">
                {getParashaTitle(parasha.slug)}
              </h1>
              {parasha.haftarah && (
                <p className="font-inter text-xs text-warmgray-500 mt-1">
                  Haftarah: {parasha.haftarah}
                  {parasha.haftarahHebrew && (
                    <span className="font-hebrew mr-1" dir="rtl"> · {parasha.haftarahHebrew}</span>
                  )}
                </p>
              )}
            </div>
            <p className="font-hebrew text-3xl text-warmgray-500 dark:text-warmgray-400 flex-shrink-0" dir="rtl">
              {parasha.nameHebrew}
            </p>
          </div>

          {parasha.summary && (
            <div className="glass-card p-4 border-gold-500/20 bg-gold-500/5">
              <p className="font-cormorant text-lg italic text-petroleum-800 dark:text-parchment-200 leading-relaxed">
                {parasha.summary}
              </p>
            </div>
          )}

          {parasha.pdfUrl && (
            <a
              href={parasha.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              Baixar PDF desta Parashá
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          )}
        </div>

        <hr className="divider-gold" />

        {/* Aliyot */}
        <div className="mt-8">
          <AliyotList aliyot={aliyot} />
        </div>

        {/* Assinatura */}
        <div className="mt-10 glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-petroleum-gradient flex items-center justify-center flex-shrink-0">
            <span className="font-hebrew text-sm text-gold-400">ר</span>
          </div>
          <div>
            <p className="text-sm font-inter font-medium text-foreground">Rav Eliahu Barzilay ben Yehoshua</p>
            <p className="text-xs font-inter text-warmgray-500">Congregação Brit Im Mashiach, Franca, São Paulo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
