import type { Metadata } from 'next'
import Link from 'next/link'
import { Flame, ArrowRight } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { FaqSection } from '@/components/seo/FaqSection'
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/json-ld'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { SITE_NAME_ALT } from '@/lib/site-brand'
import { MINOR_FESTIVALS_FAQ } from '@/lib/chag-hub-faq'

const origin = getPublicSiteOrigin()

const MINOR = [
  {
    slug: 'chanukah',
    name: 'Chanukah',
    hebrew: 'חֲנוּכָּה',
    summary: 'Festa das Luzes. Oito dias de acendimento do Chanukiá e memória da dedicação do Templo.',
  },
  {
    slug: 'purim',
    name: 'Purim',
    hebrew: 'פּוּרִים',
    summary: 'Meguiláh, alegria e salvação oculta. Inversão providencial no tempo de Mordechai e Ester.',
  },
]

export const metadata: Metadata = {
  title: 'Festividades menores: Chanukah e Purim',
  description:
    'Guia de Chanukah e Purim no calendário judaico messiânico. Estudo PaRDeS na Brit Im Mashiach.',
  alternates: { canonical: `${origin}/chagim/festividades` },
  openGraph: {
    url: `${origin}/chagim/festividades`,
    title: `Festividades menores | ${SITE_NAME_ALT}`,
    description: 'Chanukah e Purim com estudo público indexável.',
    locale: 'pt_BR',
  },
}

export default function FestividadesMenoresPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Chagim', path: '/chagim' },
    { name: 'Festividades menores', path: '/chagim/festividades' },
  ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqPageJsonLd(MINOR_FESTIVALS_FAQ)]} />
      <Breadcrumbs items={crumbs} />

      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-gold-500" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Moedim menores · חַגִּים
          </span>
        </div>
        <h1 className="section-title">Festividades menores</h1>
        <p className="section-subtitle max-w-2xl">
          Chanukah e Purim marcam o calendário com luz, alegria e memória comunitária.
          Cada festa possui página pública com resumo, FAQ e seções introdutórias na plataforma.
        </p>
        <p className="text-sm font-inter text-warmgray-500 max-w-2xl leading-relaxed">
          Veja também{' '}
          <Link href="/chagim/shalosh-regalim" className="text-gold-600 hover:underline dark:text-gold-400">
            Shalosh Regalim
          </Link>
          {' '}e{' '}
          <Link href="/chagim/yamim-noraim" className="text-gold-600 hover:underline dark:text-gold-400">
            Yamim Noraim
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4">
        {MINOR.map((chag) => (
          <Link
            key={chag.slug}
            href={`/chagim/${chag.slug}`}
            className="glass-card p-5 group hover:shadow-petroleum-sm hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {chag.name}
                </h2>
                <p className="font-hebrew text-2xl text-warmgray-500 mt-1" dir="rtl" lang="he">
                  {chag.hebrew}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-warmgray-400 group-hover:text-gold-500 shrink-0 mt-1" aria-hidden="true" />
            </div>
            <p className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
              {chag.summary}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-10 rounded-xl border border-border/50 bg-card/30 p-5 md:p-6 space-y-3">
        <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
          Purim e Chanukah no ano litúrgico
        </h2>
        <p className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          Purim, no mês de Adar, ensina simcháh responsável e discernimento da mão oculta de HaShem.
          Chanukah, em Kislev, reacende a chama quando a luz parece diminuir. Na Brit Im Mashiach,
          ambos são estudados em Peshat halachico, Remez profético e Sod kabalístico quando disponível.
        </p>
      </section>

      <FaqSection items={MINOR_FESTIVALS_FAQ} title="Perguntas sobre festividades menores" id="minor-faq" />
    </div>
  )
}
