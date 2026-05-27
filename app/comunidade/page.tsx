import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, ArrowRight } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { KehilahAgenda } from '@/components/community/KehilahAgenda'
import { PrayerRequestForm } from '@/components/community/PrayerRequestForm'
import { TestimonialsList } from '@/components/community/TestimonialsList'
import { fetchKehilahEvents, fetchKehilahTestimonials } from '@/lib/community-supabase'
import { CONGREGATION, SITE_ADDRESS_FULL, SITE_MAPS_URL, SITE_NAME_ALT } from '@/lib/site-brand'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { breadcrumbJsonLd } from '@/lib/json-ld'
import { getAuthSnapshot } from '@/lib/auth-snapshot'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

const APP_URL = getPublicSiteOrigin()

export const metadata: Metadata = {
  title: 'Comunidade viva',
  description:
    'Agenda da kehilah em Franca, aulas ao vivo, pedidos de oração e testemunhos da Brit Im Mashiach. Movimento, não apenas biblioteca.',
  alternates: { canonical: `${APP_URL}/comunidade` },
  openGraph: {
    url: `${APP_URL}/comunidade`,
    title: `Comunidade viva | ${SITE_NAME_ALT}`,
    description: 'Agenda, oração e testemunhos da congregação judaico-messiânica.',
    locale: 'pt_BR',
  },
}

export const dynamic = 'force-dynamic'

async function getProfileDefaults(userId: string) {
  if (!hasSupabaseServerEnv()) return { email: null, name: null }
  try {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', userId)
      .maybeSingle()
    return { email: data?.email ?? null, name: data?.full_name ?? null }
  } catch {
    return { email: null, name: null }
  }
}

export default async function ComunidadePage() {
  const [events, testimonials, auth] = await Promise.all([
    fetchKehilahEvents(12),
    fetchKehilahTestimonials(8),
    getAuthSnapshot(),
  ])

  let defaultEmail: string | null = auth.user?.email ?? null
  let defaultName: string | null = null

  if (auth.user) {
    const profile = await getProfileDefaults(auth.user.id)
    defaultEmail = defaultEmail ?? profile.email
    defaultName = profile.name
  }

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Comunidade', path: '/comunidade' },
  ]

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `Comunidade viva — ${SITE_NAME_ALT}`,
            url: `${APP_URL}/comunidade`,
            description: 'Agenda, oração e testemunhos da kehilah.',
            isPartOf: { '@type': 'WebSite', name: SITE_NAME_ALT, url: APP_URL },
          },
          breadcrumbJsonLd(crumbs),
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/40 bg-spiritual-depth bg-kabbalah-texture">
        <div className="relative container mx-auto px-4 py-14 md:py-20 max-w-3xl text-center space-y-4">
          <p className="portal-eyebrow mx-auto">
            <Users className="w-3 h-3" aria-hidden="true" />
            Kehilah viva
          </p>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight text-balance">
            Mais que biblioteca: um movimento em Franca e no mundo
          </h1>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic leading-relaxed">
            {CONGREGATION}. Cultos, estudos, oração compartilhada e caminhada messiânica com Toráh e kavanáh.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-14 max-w-3xl space-y-14">
        <Breadcrumbs items={crumbs} />

        <KehilahAgenda events={events} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <PrayerRequestForm defaultEmail={defaultEmail} defaultName={defaultName} />
          <div className="glass-card p-6 md:p-8 space-y-4">
            <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
              Participe presencialmente
            </h2>
            <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
              Shabat, estudos e Moedim na sinagoga:
            </p>
            <p className="text-sm font-inter font-medium text-petroleum-800 dark:text-parchment-100">
              {SITE_ADDRESS_FULL}
            </p>
            <a
              href={SITE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-inter text-gold-700 dark:text-gold-400 font-medium hover:underline"
            >
              Ver no Google Maps
            </a>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <Link href="/calendar" className="text-gold-700 dark:text-gold-400 font-medium hover:underline inline-flex items-center gap-1">
                  Calendário hebraico completo
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/rav" className="text-gold-700 dark:text-gold-400 font-medium hover:underline inline-flex items-center gap-1">
                  Rav Eliahu Barzilay
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/ouvidoria" className="text-gold-700 dark:text-gold-400 font-medium hover:underline inline-flex items-center gap-1">
                  Ouvidoria
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <TestimonialsList testimonials={testimonials} />
      </div>
    </div>
  )
}
