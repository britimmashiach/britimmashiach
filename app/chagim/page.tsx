import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchChagim } from '@/lib/chagim-supabase'
import { ChagimClient } from '@/components/chagim/ChagimClient'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { FaqSection } from '@/components/seo/FaqSection'
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/json-ld'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { SITE_NAME_ALT } from '@/lib/site-brand'
import { CHAG_HUB_FAQ } from '@/lib/chag-hub-faq'

const origin = getPublicSiteOrigin()

export const metadata: Metadata = {
  title: 'Chagim e Moedim',
  description:
    'Festividades do calendário judaico com estudo PaRDeS: Pesach, Shavuot, Sukkot, Yamim Noraim e mais. Brit Im Mashiach.',
  alternates: { canonical: `${origin}/chagim` },
  openGraph: {
    url: `${origin}/chagim`,
    title: `Chagim | ${SITE_NAME_ALT}`,
    description: 'Moedim bíblicos com estudo estruturado e material público indexável.',
    locale: 'pt_BR',
  },
}

// Evita pré-render estático no `next build` quando as env vars do Supabase
// ainda não estão disponíveis no CI (o cliente @supabase/ssr exige URL e key).
export const dynamic = 'force-dynamic'

export default async function ChagimPage() {
  const chagim = await fetchChagim()
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Chagim', path: '/chagim' },
  ]

  return (
    <div className="container mx-auto px-4 py-10">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqPageJsonLd(CHAG_HUB_FAQ)]} />
      <Breadcrumbs items={crumbs} />

      <p className="text-sm font-inter text-warmgray-500 max-w-2xl mb-6 leading-relaxed -mt-2">
        Explore o{' '}
        <Link href="/chagim/shalosh-regalim" className="text-gold-600 hover:underline dark:text-gold-400">
          guia Shalosh Regalim
        </Link>
        {' '}(Pesach, Shavuot, Sukkot), os{' '}
        <Link href="/chagim/yamim-noraim" className="text-gold-600 hover:underline dark:text-gold-400">
          Yamim Noraim
        </Link>
        , o{' '}
        <Link href="/calendar" className="text-gold-600 hover:underline dark:text-gold-400">
          calendário hebraico
        </Link>
        {' '}e a{' '}
        <Link href="/judaismo-messianico" className="text-gold-600 hover:underline dark:text-gold-400">
          identidade messiânica
        </Link>
        {' '}da congregação.
      </p>

      <ChagimClient chagim={chagim} />

      <FaqSection items={CHAG_HUB_FAQ} title="Perguntas sobre Chagim" id="chagim-hub-faq" />
    </div>
  )
}
