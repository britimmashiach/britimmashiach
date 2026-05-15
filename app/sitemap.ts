import type { MetadataRoute } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://brit-mashiach.vercel.app'

const parashotSlugs = [
  'bereshit', 'noach', 'lech-lecha', 'vayera', 'chayei-sarah', 'toldot',
  'vayetze', 'vayishlach', 'vayeshev', 'miketz', 'vayigash', 'vayechi',
  'shemot', 'vaera', 'bo', 'beshalach', 'yitro', 'mishpatim', 'terumah',
  'tetzaveh', 'ki-tisa', 'vayakhel', 'pekudei', 'vayikra', 'tzav',
  'shemini', 'tazria', 'metzora', 'acharei-mot', 'kedoshim', 'emor',
  'behar', 'bechukotai', 'bamidbar', 'nasso', 'behaalotecha', 'shelach',
  'korach', 'chukat', 'balak', 'pinchas', 'matot', 'masei', 'devarim',
  'vaetchanan', 'eikev', 'reeh', 'shoftim', 'ki-teitzei', 'ki-tavo',
  'nitzavim', 'vayeilech', 'haazinu', 'vezot-habracha',
]

const studySlugs = [
  'ain-sof-e-a-emanacao-divina',
  'chesed-de-malchut-sefirat-haomer',
  'netivot-caminho-13-dalet-keter-tiferet',
  'parashat-emor-5786',
  'tehilim-23-ado-nai-roi',
  'letra-alef-em-kabalah',
  'shabat-e-a-rainha',
  'olamot-quatro-mundos',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: APP_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${APP_URL}/calendar`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${APP_URL}/parashot`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${APP_URL}/studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${APP_URL}/library`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${APP_URL}/tanach`, lastModified: now, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${APP_URL}/tehilim`, lastModified: now, changeFrequency: 'weekly', priority: 0.65 },
    { url: `${APP_URL}/premium`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const parashaRoutes: MetadataRoute.Sitemap = parashotSlugs.map((slug) => ({
    url: `${APP_URL}/parashot/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const studyRoutes: MetadataRoute.Sitemap = studySlugs.map((slug) => ({
    url: `${APP_URL}/studies/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...parashaRoutes, ...studyRoutes]
}
