import type { MetadataRoute } from 'next'
import { getPublicSiteOrigin } from '@/lib/public-site-url'

export default function robots(): MetadataRoute.Robots {
  const origin = getPublicSiteOrigin()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/profile', '/admin', '/auth'],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  }
}
