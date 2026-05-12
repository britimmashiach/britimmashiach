/**
 * Origem pública do site (links em e-mails, redirects).
 * Vercel: defina NEXT_PUBLIC_APP_URL com o domínio canônico (ex.: https://britimmashiach.com).
 */
export function getPublicSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, '').replace(/\/$/, '')
    return `https://${host}`
  }
  return 'http://localhost:3000'
}
