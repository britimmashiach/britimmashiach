import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, ArrowRight, HeartHandshake, Flame } from 'lucide-react'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { RAV_NAME, SITE_NAME_ALT } from '@/lib/site-brand'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/json-ld'
import { IMERSOES, type ImersaoSlug } from '@/lib/imersoes-content'

const origin = getPublicSiteOrigin()

const PAGE_DESCRIPTION =
  'Imersões da Escola Rav EBBY: IECL (Imersão Espiritual, Cura e Libertação) e Avodat HaNefesh (Tikkun, Cura e Retorno). Restauração da alma com base na Toráh, Teshuváh e Tikkun.'

export const metadata: Metadata = {
  title: 'Imersões',
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${origin}/imersoes` },
  openGraph: {
    url: `${origin}/imersoes`,
    title: `Imersões | ${SITE_NAME_ALT}`,
    description: PAGE_DESCRIPTION,
    locale: 'pt_BR',
  },
}

const ICON_BY_SLUG: Record<ImersaoSlug, typeof Sparkles> = {
  iecl: Flame,
  'avodat-hanefesh': HeartHandshake,
}

export default function ImersoesPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Imersões', path: '/imersoes' },
  ]

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Imersões da Escola Rav EBBY',
            description: PAGE_DESCRIPTION,
            url: `${origin}/imersoes`,
            inLanguage: 'pt-BR',
            isPartOf: { '@type': 'WebSite', name: SITE_NAME_ALT, url: origin },
            about: { '@type': 'Thing', name: 'Cura Interior e Libertação judaico-messiânica' },
            author: { '@type': 'Person', name: RAV_NAME },
          },
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="border-b border-border/40 bg-petroleum-gradient/5">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/12 border border-gold-500/25">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" aria-hidden="true" />
            <span className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest">
              Escola Rav EBBY
            </span>
          </div>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Imersões
          </h1>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic max-w-2xl mx-auto">
            Encontros intensivos de restauração da alma, com base na Toráh, na tradição judaica e no caminho de Teshuváh.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          {IMERSOES.map((imersao) => {
            const Icon = ICON_BY_SLUG[imersao.slug]
            return (
              <Link
                key={imersao.slug}
                href={`/imersoes/${imersao.slug}`}
                className="glass-card p-7 space-y-4 group hover:border-gold-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/12 text-gold-600 dark:text-gold-400 shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
                      {imersao.name}
                    </h2>
                    {imersao.nameHebrew && (
                      <p className="font-hebrew text-sm text-warmgray-500" dir="rtl" lang="he">
                        {imersao.nameHebrew}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-[11px] font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                  {imersao.tagline}
                </p>
                <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
                  {imersao.short}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-inter font-semibold text-petroleum-700 dark:text-gold-400 group-hover:gap-2.5 transition-all">
                  Conhecer a imersão
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>

        <p className="text-center text-xs font-inter text-warmgray-500 mt-10 max-w-xl mx-auto leading-relaxed">
          As imersões não substituem cuidado médico, psicológico ou psiquiátrico. Participação mediante triagem,
          consentimento informado e supervisão. O material completo de facilitação é reservado a líderes que concluíram a
          formação da Escola Rav EBBY.
        </p>
      </section>
    </div>
  )
}
