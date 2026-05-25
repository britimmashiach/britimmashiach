import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { StudiesClient } from '@/components/library/StudiesClient'
import { fetchStudies } from '@/lib/studies-supabase'
import { isLegacyTehilimStudySlug } from '@/lib/tehilim-catalog'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/json-ld'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { SITE_NAME_ALT, RAV_NAME } from '@/lib/site-brand'

const origin = getPublicSiteOrigin()

export const metadata: Metadata = {
  title: 'Estudos',
  description: 'Ensinos aprofundados de Kabaláh, Toráh, Moedim, Tehilim e Halacháh pelo Rav Eliahu Barzilay.',
  alternates: { canonical: `${origin}/studies` },
  openGraph: {
    url: `${origin}/studies`,
    title: `Estudos | ${SITE_NAME_ALT}`,
    description: 'Beit Midrash digital: estudos de Kabaláh Luriana, Toráh e espiritualidade messiânica.',
    locale: 'pt_BR',
  },
}

export default async function StudiesPage() {
  const studies = (await fetchStudies()).filter((s) => !isLegacyTehilimStudySlug(s.slug))
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Estudos', path: '/studies' },
  ]

  return (
    <div className="container mx-auto px-4 py-10">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Estudos do Beit Midrash',
            url: `${origin}/studies`,
            description:
              'Ensinos do Rav Eliahu Barzilay ben Yehoshua em Kabaláh Luriana, Toráh e espiritualidade messiânica.',
            inLanguage: 'pt-BR',
            isPartOf: { '@type': 'WebSite', name: SITE_NAME_ALT, url: origin },
            author: { '@type': 'Person', name: RAV_NAME },
          },
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-gold-500" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Beit Midrash
          </span>
        </div>
        <h1 className="section-title">Estudos</h1>
        <p className="section-subtitle max-w-xl">
          Ensinos do Rav Eliahu Barzilay ben Yehoshua em Kabaláh Luriana, Toráh e espiritualidade messiânica.
        </p>
        <p className="text-sm font-inter text-warmgray-500 max-w-xl leading-relaxed">
          Complemente com{' '}
          <Link href="/parashot" className="text-gold-600 hover:underline dark:text-gold-400">
            Parashot semanais
          </Link>
          ,{' '}
          <Link href="/metodo-pardes" className="text-gold-600 hover:underline dark:text-gold-400">
            Método PaRDeS
          </Link>
          {' '}e{' '}
          <Link href="/library" className="text-gold-600 hover:underline dark:text-gold-400">
            Biblioteca espiritual
          </Link>
          .
        </p>
      </div>

      <StudiesClient studies={studies} />
    </div>
  )
}
