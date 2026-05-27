import { getPublicSiteOrigin } from '@/lib/public-site-url'
import {
  CONGREGATION,
  RAV_NAME,
  SITE_COUNTRY,
  SITE_LOCALITY,
  SITE_NAME,
  SITE_NAME_ALT,
  SITE_REGION,
  SITE_TAGLINE,
} from '@/lib/site-brand'

export type BreadcrumbItem = { name: string; path: string }

export function rootJsonLdGraph() {
  const origin = getPublicSiteOrigin()
  return [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: SITE_NAME,
      alternateName: [
        SITE_NAME_ALT,
        'Sinagoga Brit Im Mashiach',
        'Brit Im Mashiach Franca',
        'Congregação Brit Im Mashiach',
      ],
      description: SITE_TAGLINE,
      url: origin,
      founder: { '@type': 'Person', name: RAV_NAME },
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_LOCALITY,
        addressRegion: SITE_REGION,
        addressCountry: SITE_COUNTRY,
      },
    },
    {
      '@type': 'Synagogue',
      '@id': `${origin}/#synagogue`,
      name: 'Sinagoga Brit Im Mashiach',
      alternateName: SITE_NAME_ALT,
      url: origin,
      description:
        'Sinagoga judaico-messiânica em Franca, São Paulo, Brasil. Toráh, Shabat, Moedim e estudo kabalístico.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_LOCALITY,
        addressRegion: SITE_REGION,
        addressCountry: SITE_COUNTRY,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -20.5386,
        longitude: -47.4008,
      },
      parentOrganization: { '@id': `${origin}/#organization` },
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

export function personJsonLd(input: {
  name: string
  url: string
  description: string
  jobTitle?: string
}) {
  const origin = getPublicSiteOrigin()
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: input.name,
    url: input.url,
    description: input.description,
    jobTitle: input.jobTitle ?? 'Rav',
    worksFor: { '@type': 'Organization', name: CONGREGATION, url: origin },
    knowsAbout: [
      'Toráh',
      'Kabaláh Luriana',
      'PaRDeS',
      'Modelo Netivot',
      'Judaísmo messiânico',
      'Halacháh',
    ],
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
    datePublished: input.publishedAt,
    inLanguage: 'pt-BR',
    author: { '@type': 'Person', name: RAV_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: origin },
    articleSection: input.category,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: origin },
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

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function parashaWebPageJsonLd(input: {
  slug: string
  title: string
  description: string
  publishedAt?: string
  isPremium?: boolean
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
    ...(input.isPremium
      ? { isAccessibleForFree: false, creativeWorkStatus: 'Premium content with public summary' }
      : { isAccessibleForFree: true }),
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
