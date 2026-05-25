import type { Metadata } from 'next'
import Link from 'next/link'
import { HelpCircle } from 'lucide-react'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { SITE_NAME_ALT } from '@/lib/site-brand'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqSection } from '@/components/seo/FaqSection'
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/json-ld'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SITE_FAQ_ITEMS } from '@/lib/parasha-seo-faq'

const origin = getPublicSiteOrigin()

export const metadata: Metadata = {
  title: 'Perguntas frequentes',
  description: `Dúvidas sobre ${SITE_NAME_ALT}: Toráh, Parashot, PaRDeS, Premium, judaísmo messiânico não trinitário e estudos do Rav EBBY.`,
  alternates: { canonical: `${origin}/faq` },
  openGraph: {
    url: `${origin}/faq`,
    title: `FAQ | ${SITE_NAME_ALT}`,
    description: 'Perguntas frequentes sobre estudo da Toráh, Premium e a congregação Brit Im Mashiach.',
    locale: 'pt_BR',
  },
}

export default function FaqPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <JsonLd data={[faqPageJsonLd(SITE_FAQ_ITEMS), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />

      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-gold-500" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Ajuda
          </span>
        </div>
        <h1 className="section-title">Perguntas frequentes</h1>
        <p className="section-subtitle max-w-xl">
          Respostas sobre a plataforma, o estudo semanal da Toráh e a identidade da Brit Im Mashiach.
        </p>
      </div>

      <FaqSection items={SITE_FAQ_ITEMS} title="Sobre a plataforma e os estudos" id="site-faq" />

      <nav className="mt-10 flex flex-wrap gap-3 text-sm font-inter">
        <Link href="/sobre" className="text-gold-600 hover:text-gold-500 dark:text-gold-400">
          Quem somos
        </Link>
        <span className="text-warmgray-400" aria-hidden="true">·</span>
        <Link href="/judaismo-messianico" className="text-gold-600 hover:text-gold-500 dark:text-gold-400">
          Judaísmo messiânico
        </Link>
        <span className="text-warmgray-400" aria-hidden="true">·</span>
        <Link href="/chagim/shalosh-regalim" className="text-gold-600 hover:text-gold-500 dark:text-gold-400">
          Shalosh Regalim
        </Link>
        <span className="text-warmgray-400" aria-hidden="true">·</span>
        <Link href="/metodo-pardes" className="text-gold-600 hover:text-gold-500 dark:text-gold-400">
          Método PaRDeS
        </Link>
        <span className="text-warmgray-400" aria-hidden="true">·</span>
        <Link href="/parashot" className="text-gold-600 hover:text-gold-500 dark:text-gold-400">
          Parashot
        </Link>
        <span className="text-warmgray-400" aria-hidden="true">·</span>
        <Link href="/premium" className="text-gold-600 hover:text-gold-500 dark:text-gold-400">
          Plano Premium
        </Link>
      </nav>
    </div>
  )
}
