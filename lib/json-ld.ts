import { getPublicSiteOrigin } from '@/lib/public-site-url'

const ORG_NAME = 'Brit Im Mashiach'
const AUTHOR_NAME = 'Rav Eliahu Barzilay ben Yehoshua'

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
    author: { '@type': 'Person', name: AUTHOR_NAME },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: origin,
    },
    inLanguage: 'pt-BR',
    articleSection: input.category,
    isAccessibleForFree: true,
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
    isPartOf: {
      '@type': 'WebSite',
      name: ORG_NAME,
      url: origin,
    },
    author: { '@type': 'Person', name: AUTHOR_NAME },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: origin,
    },
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
    isPartOf: {
      '@type': 'WebSite',
      name: ORG_NAME,
      url: origin,
    },
  }
}
