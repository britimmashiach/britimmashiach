import type { MetadataRoute } from 'next'
import { TANACH_BOOKS } from '@/lib/tanach-books'
import { OFFICIAL_PARASHOT } from '@/lib/parashot-registry'
import { getAllChagSlugsForSitemap } from '@/lib/chagim-placeholders'
import { fetchChagimSlugs } from '@/lib/chagim-supabase'
import { fetchParashaSlugs } from '@/lib/parashot-supabase'
import { fetchStudySlugs } from '@/lib/studies-supabase'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { getShopCatalog } from '@/lib/shop-catalog'
import { getAllEnsinosSlugs } from '@/lib/ensinos-pillars'

/** Sitemap gerado no build — evita timeout em runtime na Vercel. */
export const dynamic = 'force-static'

/** Capítulos do Tanach ficam fora do sitemap principal (evita timeout/500 com ~900 URLs). */
const INCLUDE_TANACH_CHAPTERS = false

function staticRoutes(origin: string, now: Date): MetadataRoute.Sitemap {
  return [
    { url: origin, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${origin}/sobre`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${origin}/rav`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${origin}/manifesto`, lastModified: now, changeFrequency: 'monthly', priority: 0.92 },
    { url: `${origin}/ensinos`, lastModified: now, changeFrequency: 'weekly', priority: 0.86 },
    { url: `${origin}/comunidade`, lastModified: now, changeFrequency: 'weekly', priority: 0.87 },
    { url: `${origin}/judaismo-messianico`, lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${origin}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${origin}/ouvidoria`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${origin}/metodo-pardes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${origin}/imersoes`, lastModified: now, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${origin}/imersoes/iecl`, lastModified: now, changeFrequency: 'monthly', priority: 0.74 },
    { url: `${origin}/imersoes/avodat-hanefesh`, lastModified: now, changeFrequency: 'monthly', priority: 0.74 },
    { url: `${origin}/calendar`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${origin}/parashot`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${origin}/chagim`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${origin}/chagim/shalosh-regalim`, lastModified: now, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${origin}/chagim/yamim-noraim`, lastModified: now, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${origin}/chagim/festividades`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${origin}/studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${origin}/library`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${origin}/tanach`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${origin}/tehilim`, lastModified: now, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${origin}/premium`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${origin}/loja`, lastModified: now, changeFrequency: 'weekly', priority: 0.55 },
    { url: `${origin}/lideres`, lastModified: now, changeFrequency: 'monthly', priority: 0.45 },
  ]
}

async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    console.error(`[sitemap] ${label}:`, err)
    return fallback
  }
}

async function buildFullSitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getPublicSiteOrigin()
  const now = new Date()

  const [studySlugs, parashaDbSlugs, chagDbSlugs, shopProducts] = await Promise.all([
    safe('fetchStudySlugs', fetchStudySlugs, []),
    safe('fetchParashaSlugs', fetchParashaSlugs, []),
    safe('fetchChagimSlugs', fetchChagimSlugs, []),
    safe('getShopCatalog', getShopCatalog, []),
  ])

  const chagSlugs = new Set([
    ...getAllChagSlugsForSitemap().map((s) => s.slug),
    ...chagDbSlugs.map((s) => s.slug),
  ])

  const parashaSlugs = new Set([
    ...OFFICIAL_PARASHOT.map((p) => p.slug),
    ...parashaDbSlugs.map((p) => p.slug),
  ])

  const parashaRoutes: MetadataRoute.Sitemap = [...parashaSlugs].map((slug) => ({
    url: `${origin}/parashot/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  const studyRoutes: MetadataRoute.Sitemap = studySlugs.map(({ slug }) => ({
    url: `${origin}/studies/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  const chagRoutes: MetadataRoute.Sitemap = [...chagSlugs].map((slug) => ({
    url: `${origin}/chagim/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.62,
  }))

  const tanachBookRoutes: MetadataRoute.Sitemap = TANACH_BOOKS.map((b) => ({
    url: `${origin}/tanach/${b.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }))

  const tanachChapterRoutes: MetadataRoute.Sitemap = INCLUDE_TANACH_CHAPTERS
    ? TANACH_BOOKS.flatMap((b) =>
        Array.from({ length: b.chapters }, (_, i) => ({
          url: `${origin}/tanach/${b.slug}/${i + 1}`,
          lastModified: now,
          changeFrequency: 'yearly' as const,
          priority: 0.45,
        })),
      )
    : []

  const ensinosRoutes: MetadataRoute.Sitemap = getAllEnsinosSlugs().map((slug) => ({
    url: `${origin}/ensinos/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.84,
  }))

  const shopRoutes: MetadataRoute.Sitemap = shopProducts.map((p) => ({
    url: `${origin}/loja/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    ...staticRoutes(origin, now),
    ...ensinosRoutes,
    ...parashaRoutes,
    ...studyRoutes,
    ...chagRoutes,
    ...shopRoutes,
    ...tanachBookRoutes,
    ...tanachChapterRoutes,
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    return await buildFullSitemap()
  } catch (err) {
    console.error('[sitemap] falha ao gerar mapa completo:', err)
    const origin = getPublicSiteOrigin()
    return staticRoutes(origin, new Date())
  }
}
