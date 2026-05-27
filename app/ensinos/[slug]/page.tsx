import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllEnsinosSlugs, getEnsinosPillar } from '@/lib/ensinos-pillars'
import { EnsinosPillarArticle } from '@/components/seo/EnsinosPillarArticle'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_NAME_ALT } from '@/lib/site-brand'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/json-ld'

const APP_URL = getPublicSiteOrigin()

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllEnsinosSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pillar = getEnsinosPillar(slug)
  if (!pillar) return { title: 'Ensino não encontrado' }

  const url = `${APP_URL}/ensinos/${slug}`
  return {
    title: pillar.metaTitle,
    description: pillar.description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${pillar.metaTitle} | ${SITE_NAME_ALT}`,
      description: pillar.description,
      locale: 'pt_BR',
    },
  }
}

export default async function EnsinosPillarPage({ params }: PageProps) {
  const { slug } = await params
  const pillar = getEnsinosPillar(slug)
  if (!pillar) notFound()

  const url = `${APP_URL}/ensinos/${slug}`
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Ensinos', path: '/ensinos' },
    { name: pillar.title, path: `/ensinos/${slug}` },
  ]

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pillar.title,
            description: pillar.description,
            url,
            inLanguage: 'pt-BR',
            isPartOf: { '@type': 'WebSite', name: SITE_NAME_ALT, url: APP_URL },
            about: pillar.eyebrow,
          },
          breadcrumbJsonLd(crumbs),
          faqPageJsonLd(pillar.faq),
        ]}
      />
      <EnsinosPillarArticle pillar={pillar} crumbs={crumbs} />
    </>
  )
}
