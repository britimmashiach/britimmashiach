import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Toaster } from 'sonner'
import './globals.css'

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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://brit-mashiach.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Brit Mashiach - Plataforma Judaico-Messiânica',
    template: '%s | Brit Mashiach',
  },
  description: 'Plataforma de estudos judaico-messiânicos, Kabaláh Luriana, calendário hebraico e espiritualidade profunda sob a orientação do Rav Eliahu Barzilay ben Yehoshua.',
  keywords: ['judaísmo messiânico', 'kabaláh', 'toráh', 'parashá', 'calendário hebraico', 'estudos judaicos', 'brit mashiach', 'rav eliahu barzilay'],
  authors: [{ name: 'Rav Eliahu Barzilay ben Yehoshua', url: APP_URL }],
  creator: 'Congregação Brit Im Mashiach',
  publisher: 'Brit Mashiach',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: APP_URL,
    siteName: 'Brit Mashiach',
    title: 'Brit Mashiach - Plataforma Judaico-Messiânica',
    description: 'Estudos aprofundados, Kabaláh Luriana, calendário hebraico e espiritualidade messiânica autêntica.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Brit Mashiach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brit Mashiach',
    description: 'Plataforma judaico-messiânica de estudos e espiritualidade profunda.',
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
  '@type': 'Organization',
  name: 'Brit Mashiach',
  description: 'Plataforma judaico-messiânica de estudos espirituais',
  url: APP_URL,
  founder: {
    '@type': 'Person',
    name: 'Rav Eliahu Barzilay ben Yehoshua',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Franca',
    addressRegion: 'São Paulo',
    addressCountry: 'BR',
  },
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
        </ThemeProvider>
      </body>
    </html>
  )
}
