import type { Metadata } from 'next'
import Link from 'next/link'
import { Flame, ArrowRight } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { FaqSection } from '@/components/seo/FaqSection'
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/json-ld'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { SITE_NAME_ALT } from '@/lib/site-brand'
import { YAMIM_NORAIM_FAQ } from '@/lib/chag-hub-faq'

const origin = getPublicSiteOrigin()

const YAMIM = [
  {
    slug: 'rosh-hashanah',
    name: 'Rosh Hashanah',
    hebrew: 'רֹאשׁ הַשָּׁנָה',
    summary: 'Ano Novo judaico, Shofar, julgamento e Teshuváh. Início dos Dez Dias de Arrepentimento.',
  },
  {
    slug: 'yom-kippur',
    name: 'Yom Kippur',
    hebrew: 'יוֹם כִּפּוּר',
    summary: 'Dia do Perdão, jejum e oração. O dia mais sagrado do calendário, selando o julgamento.',
  },
]

export const metadata: Metadata = {
  title: 'Yamim Noraim: Rosh Hashanah e Yom Kippur',
  description:
    'Guia dos Dias Santos: Rosh Hashanah, Yom Kippur, Teshuváh e Shofar. Estudo PaRDeS na Brit Im Mashiach.',
  alternates: { canonical: `${origin}/chagim/yamim-noraim` },
  openGraph: {
    url: `${origin}/chagim/yamim-noraim`,
    title: `Yamim Noraim | ${SITE_NAME_ALT}`,
    description: 'Cluster de estudo dos Dias Santos do calendário judaico.',
    locale: 'pt_BR',
  },
}

export default function YamimNoraimPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Chagim', path: '/chagim' },
    { name: 'Yamim Noraim', path: '/chagim/yamim-noraim' },
  ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqPageJsonLd(YAMIM_NORAIM_FAQ)]} />
      <Breadcrumbs items={crumbs} />

      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Yamim Noraim · יָמִים נוֹרָאִים
          </span>
        </div>
        <h1 className="section-title">Os Dias Santos</h1>
        <p className="section-subtitle max-w-2xl">
          Rosh Hashanah e Yom Kippur concentram o trabalho espiritual de Teshuváh, Shofar e kedusháh.
          O ciclo culmina na alegria de Sukkot, mas estes dias inauguram o ano com sobriedade e esperança.
        </p>
        <p className="text-sm font-inter text-warmgray-500 max-w-2xl leading-relaxed">
          Veja também{' '}
          <Link href="/chagim/shalosh-regalim" className="text-gold-600 hover:underline dark:text-gold-400">
            Shalosh Regalim
          </Link>
          {' '}e o{' '}
          <Link href="/calendar" className="text-gold-600 hover:underline dark:text-gold-400">
            calendário hebraico
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4">
        {YAMIM.map((chag) => (
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
          Do julgamento à alegria
        </h2>
        <p className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          Os Yamim Noraim preparam Israel para o ano novo com vidui, tefilah e emendamento. Após Yom Kippur,
          o calendário avança para Sukkot, festa de confiança e hospitalidade. Na Brit Im Mashiach, estudamos
          cada etapa em Peshat litúrgico, Remez profético e Sod kabalístico quando o material está disponível.
        </p>
        <Link
          href="/chagim/sukkot"
          className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-gold-600 hover:text-gold-500 dark:text-gold-400"
        >
          Continuar com Sukkot
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </section>

      <FaqSection items={YAMIM_NORAIM_FAQ} title="Perguntas sobre os Dias Santos" id="yamim-faq" />
    </div>
  )
}
