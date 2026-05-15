import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { AuthSessionToast } from '@/components/layout/AuthSessionToast'
import { SiteAmbientAudio } from '@/components/layout/SiteAmbientAudio'
import { Toaster } from 'sonner'
import './globals.css'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { rootJsonLdGraph } from '@/lib/json-ld'
import { SITE_NAME, SITE_TAGLINE, RAV_NAME } from '@/lib/site-brand'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const APP_URL = getPublicSiteOrigin()

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${SITE_NAME} — Plataforma Judaico-Messiânica`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_TAGLINE} Sob a orientação do ${RAV_NAME}.`,
  keywords: [
    'judaísmo messiânico',
    'kabaláh luriana',
    'toráh',
    'parashá',
    'calendário hebraico',
    'tanach',
    'chagim',
    'brit im mashiach',
    'rav eliahu barzilay',
  ],
  authors: [{ name: RAV_NAME, url: APP_URL }],
  creator: 'Congregação Brit Im Mashiach',
  publisher: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: APP_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Plataforma Judaico-Messiânica`,
    description: SITE_TAGLINE,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_TAGLINE,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: APP_URL,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F4E8' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1d25' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': rootJsonLdGraph(),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-1">
            <PageWrapper>{children}</PageWrapper>
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            richColors
            toastOptions={{
              classNames: {
                toast: 'font-inter text-sm rounded-xl border border-border/60',
              },
            }}
          />
          <AuthSessionToast />
        </ThemeProvider>
        <SiteAmbientAudio />
      </body>
    </html>
  )
}
