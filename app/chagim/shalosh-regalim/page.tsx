import type { Metadata } from 'next'
import Link from 'next/link'
import { Flame, ArrowRight } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { FaqSection } from '@/components/seo/FaqSection'
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/json-ld'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { SITE_NAME_ALT } from '@/lib/site-brand'
import { SHALOSH_REGALIM_FAQ } from '@/lib/chag-hub-faq'

const origin = getPublicSiteOrigin()

const REGALIM = [
  {
    slug: 'pesach',
    name: 'Pesach',
    hebrew: 'פֶּסַח',
    summary: 'Libertação do Egito, Matsot e memória do pacto. O Seder abre o ciclo das peregrinações.',
  },
  {
    slug: 'shavuot',
    name: 'Shavuot',
    hebrew: 'שָׁבוּעוֹת',
    summary: 'Matan Toráh no Sinai, primícias do trigo e conclusão do Omer. Festa da revelação.',
  },
  {
    slug: 'sukkot',
    name: 'Sukkot',
    hebrew: 'סֻכּוֹת',
    summary: 'Tabernáculos, Arbaat Haminim e alegria plena. Confiança na Providência após o julgamento.',
  },
]

export const metadata: Metadata = {
  title: 'Shalosh Regalim: Pesach, Shavuot e Sukkot',
  description:
    'Guia das três peregrinações do calendário judaico: Pesach, Shavuot e Sukkot. Estudo PaRDeS na Brit Im Mashiach.',
  alternates: { canonical: `${origin}/chagim/shalosh-regalim` },
  openGraph: {
    url: `${origin}/chagim/shalosh-regalim`,
    title: `Shalosh Regalim | ${SITE_NAME_ALT}`,
    description: 'Cluster de estudo das três festas de peregrinação.',
    locale: 'pt_BR',
  },
}

export default function ShaloshRegalimPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Chagim', path: '/chagim' },
    { name: 'Shalosh Regalim', path: '/chagim/shalosh-regalim' },
  ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqPageJsonLd(SHALOSH_REGALIM_FAQ)]} />
      <Breadcrumbs items={crumbs} />

      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-gold-500" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Shalosh Regalim · שָׁלוֹשׁ רְגָלִים
          </span>
        </div>
        <h1 className="section-title">As três peregrinações</h1>
        <p className="section-subtitle max-w-2xl">
          Pesach, Shavuot e Sukkot estruturam o ano litúrgico de Israel: libertação, revelação e confiança.
          Cada Moed possui estudo público indexável na plataforma, com aprofundamento Premium quando aplicável.
        </p>
        <p className="text-sm font-inter text-warmgray-500 max-w-2xl leading-relaxed">
          Volte ao{' '}
          <Link href="/chagim" className="text-gold-600 hover:underline dark:text-gold-400">
            índice de Chagim
          </Link>
          {' '}ou explore o{' '}
          <Link href="/metodo-pardes" className="text-gold-600 hover:underline dark:text-gold-400">
            Método PaRDeS
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        {REGALIM.map((chag) => (
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
          Shavuot no ciclo anual
        </h2>
        <p className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          Entre Pesach e Shavuot contamos o Omer: 49 dias de preparação interior. Shavuot celebra a entrega da Toráh,
          a leitura de Rut e, na tradição kabalística, a Tikun Leil. Na Brit Im Mashiach, o estudo de Shavuot integra
          Peshat dos mandamentos, Remez agrícola das primícias e Sod da revelação no Sinai.
        </p>
        <Link
          href="/chagim/shavuot"
          className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-gold-600 hover:text-gold-500 dark:text-gold-400"
        >
          Ir para o estudo de Shavuot
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </section>

      <FaqSection items={SHALOSH_REGALIM_FAQ} title="Perguntas sobre as peregrinações" id="regalim-faq" />
    </div>
  )
}
