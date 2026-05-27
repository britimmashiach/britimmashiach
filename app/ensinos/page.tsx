import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, GraduationCap } from 'lucide-react'
import { ENSINOS_PILLARS } from '@/lib/ensinos-pillars'
import { SITE_NAME_ALT } from '@/lib/site-brand'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/json-ld'

const APP_URL = getPublicSiteOrigin()

export const metadata: Metadata = {
  title: 'Ensinos — guias e artigos',
  description:
    'Artigos longos sobre Kabaláh Luriana, Yeshua no judaísmo messiânico, Sefirat haOmer, Netivot e Parashá da semana. Brit Im Mashiach.',
  alternates: { canonical: `${APP_URL}/ensinos` },
  openGraph: {
    url: `${APP_URL}/ensinos`,
    title: `Ensinos | ${SITE_NAME_ALT}`,
    description: 'Guias doutrinários indexáveis para aprofundar Toráh, Kabaláh e o caminho messiânico.',
    locale: 'pt_BR',
  },
}

export default function EnsinosHubPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Ensinos', path: '/ensinos' },
  ]

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Ensinos — ${SITE_NAME_ALT}`,
            url: `${APP_URL}/ensinos`,
            description: 'Hub de artigos doutrinários e guias de estudo.',
            isPartOf: { '@type': 'WebSite', name: SITE_NAME_ALT, url: APP_URL },
          },
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/40 bg-spiritual-depth bg-kabbalah-texture">
        <div className="relative container mx-auto px-4 py-14 md:py-20 max-w-3xl text-center space-y-4">
          <p className="portal-eyebrow mx-auto">
            <GraduationCap className="w-3 h-3" aria-hidden="true" />
            Beit Midrash digital
          </p>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight">
            Ensinos e guias
          </h1>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic">
            Artigos longos para quem busca profundidade doutrinária, indexação clara e caminhos de estudo na plataforma.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-14 max-w-3xl">
        <Breadcrumbs items={crumbs} />

        <div className="grid gap-4">
          {ENSINOS_PILLARS.map((pillar) => (
            <Link
              key={pillar.slug}
              href={`/ensinos/${pillar.slug}`}
              className="glass-card p-6 group hover:-translate-y-0.5 transition-all duration-150 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-gold-600 dark:text-gold-400" aria-hidden="true" />
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {pillar.title}
                </h2>
                <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed line-clamp-2">
                  {pillar.description}
                </p>
              </div>
              <ArrowRight
                className="w-5 h-5 text-warmgray-400 group-hover:text-gold-500 shrink-0 hidden sm:block"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-xl border border-border/50 p-6 md:p-8 space-y-4">
          <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
            Comunidade viva
          </h2>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            Agenda da kehilah, pedidos de oração, testemunhos e aulas ao vivo.
          </p>
          <Link href="/comunidade" className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-gold-700 dark:text-gold-400 hover:underline">
            Ver comunidade viva
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </section>

        <p className="mt-8 text-sm font-inter text-warmgray-500 text-center">
          <Link href="/rav" className="text-gold-700 dark:text-gold-400 font-medium hover:underline">
            Conheça o Rav Eliahu Barzilay
          </Link>
          {' '}
          — autor do método e da linha doutrinária destes ensinos.
        </p>
      </div>
    </div>
  )
}
