import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { CONGREGATION, RAV_NAME, SITE_NAME, SITE_NAME_ALT, SITE_TAGLINE } from '@/lib/site-brand'

export type BreadcrumbItem = { name: string; path: string }

export function rootJsonLdGraph() {
  const origin = getPublicSiteOrigin()
  return [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: SITE_NAME,
      alternateName: SITE_NAME_ALT,
      description: SITE_TAGLINE,
      url: origin,
      founder: { '@type': 'Person', name: RAV_NAME },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Franca',
        addressRegion: 'São Paulo',
        addressCountry: 'BR',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      name: SITE_NAME,
      alternateName: SITE_NAME_ALT,
      url: origin,
      description: SITE_TAGLINE,
      inLanguage: 'pt-BR',
      publisher: { '@id': `${origin}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${origin}/studies?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${origin}/#beit-midrash`,
      name: CONGREGATION,
      url: origin,
      parentOrganization: { '@id': `${origin}/#organization` },
      knowsAbout: [
        'Toráh',
        'Kabaláh Luriana',
        'Parashot',
        'Calendário hebraico',
        'Tanach',
        'Moedim',
      ],
    },
  ]
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  const origin = getPublicSiteOrigin()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${origin}${item.path}`,
    })),
  }
}

export function studyArticleJsonLd(input: {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  category: string
}) {
  const origin = getPublicSiteOrigin()
  const url = `${origin}/studies/${input.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.excerpt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: input.publishedAt,
    author: { '@type': 'Person', name: RAV_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: origin,
    },
    inLanguage: 'pt-BR',
    articleSection: input.category,
    isAccessibleForFree: true,
    about: { '@type': 'Thing', name: 'Estudos de Toráh e Kabaláh' },
  }
}

export function chagWebPageJsonLd(input: {
  slug: string
  name: string
  summary: string
  publishedAt?: string
}) {
  const origin = getPublicSiteOrigin()
  const url = `${origin}/chagim/${input.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.summary,
    url,
    inLanguage: 'pt-BR',
    ...(input.publishedAt ? { datePublished: input.publishedAt } : {}),
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: origin },
    author: { '@type': 'Person', name: RAV_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: origin },
    about: { '@type': 'Event', name: input.name },
  }
}

export function parashaWebPageJsonLd(input: {
  slug: string
  title: string
  description: string
  publishedAt?: string
}) {
  const origin = getPublicSiteOrigin()
  const url = `${origin}/parashot/${input.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Parasháh ${input.title}`,
    description: input.description,
    url,
    inLanguage: 'pt-BR',
    ...(input.publishedAt ? { datePublished: input.publishedAt } : {}),
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: origin },
    author: { '@type': 'Person', name: RAV_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: origin },
    about: { '@type': 'Book', name: 'Toráh' },
  }
}

export function tanachChapterWebPageJsonLd(input: {
  bookSlug: string
  titlePt: string
  titleHe: string
  chapter: number
  ref: string
  verseCount: number
}) {
  const origin = getPublicSiteOrigin()
  const url = `${origin}/tanach/${input.bookSlug}/${input.chapter}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${input.titlePt} ${input.chapter} — Tanach`,
    description: `Leitura bilíngue de ${input.titleHe} (${input.ref}), ${input.verseCount} versículos. Texto massorético e tradução via Sefaria.`,
    url,
    inLanguage: ['he', 'pt-BR'],
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: origin },
    about: { '@type': 'Book', name: 'Tanach' },
  }
}
