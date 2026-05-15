import type { MetadataRoute } from 'next'
import { TANACH_BOOKS } from '@/lib/tanach-books'
import { OFFICIAL_PARASHOT } from '@/lib/parashot-registry'
import { getAllChagSlugsForSitemap } from '@/lib/chagim-placeholders'
import { fetchChagimSlugs } from '@/lib/chagim-supabase'
import { fetchParashaSlugs } from '@/lib/parashot-supabase'
import { fetchStudySlugs } from '@/lib/studies-supabase'
import { getPublicSiteOrigin } from '@/lib/public-site-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getPublicSiteOrigin()
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: origin, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${origin}/calendar`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${origin}/parashot`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${origin}/chagim`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${origin}/studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${origin}/library`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${origin}/tanach`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${origin}/tehilim`, lastModified: now, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${origin}/premium`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const [studySlugs, parashaDbSlugs, chagDbSlugs] = await Promise.all([
    fetchStudySlugs(),
    fetchParashaSlugs(),
    fetchChagimSlugs(),
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

  const tanachChapterRoutes: MetadataRoute.Sitemap = TANACH_BOOKS.flatMap((b) =>
    Array.from({ length: b.chapters }, (_, i) => ({
      url: `${origin}/tanach/${b.slug}/${i + 1}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.45,
    })),
  )

  return [
    ...staticRoutes,
    ...parashaRoutes,
    ...studyRoutes,
    ...chagRoutes,
    ...tanachBookRoutes,
    ...tanachChapterRoutes,
  ]
}
