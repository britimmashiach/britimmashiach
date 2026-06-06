import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Users, ListChecks, ShieldCheck } from 'lucide-react'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { RAV_NAME, SITE_NAME_ALT } from '@/lib/site-brand'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/json-ld'
import { IMERSOES, getImersaoBySlug } from '@/lib/imersoes-content'
import { ImersaoMaterial } from '@/components/imersoes/ImersaoMaterial'

const origin = getPublicSiteOrigin()

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return IMERSOES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const imersao = getImersaoBySlug(slug)
  if (!imersao) return { title: 'Imersão não encontrada' }

  const url = `${origin}/imersoes/${imersao.slug}`
  const title = `${imersao.name} · ${imersao.tagline}`
  return {
    title,
    description: imersao.short,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${title} | ${SITE_NAME_ALT}`,
      description: imersao.short,
      locale: 'pt_BR',
    },
  }
}

export default async function ImersaoPage({ params }: PageProps) {
  const { slug } = await params
  const imersao = getImersaoBySlug(slug)
  if (!imersao) notFound()

  const url = `${origin}/imersoes/${imersao.slug}`
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Imersões', path: '/imersoes' },
    { name: imersao.name, path: `/imersoes/${imersao.slug}` },
  ]

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${imersao.name} — ${imersao.tagline}`,
            description: imersao.short,
            url,
            inLanguage: 'pt-BR',
            isPartOf: { '@type': 'WebSite', name: SITE_NAME_ALT, url: origin },
            author: { '@type': 'Person', name: RAV_NAME },
            publisher: { '@type': 'Organization', name: SITE_NAME_ALT, url: origin },
          },
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="border-b border-border/40 bg-petroleum-gradient/5">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl text-center space-y-4">
          <p className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest">
            {imersao.tagline}
          </p>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100">
            {imersao.name}
          </h1>
          {imersao.nameHebrew && (
            <p className="font-hebrew text-2xl text-warmgray-500" dir="rtl" lang="he">
              {imersao.nameHebrew}
            </p>
          )}
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic max-w-2xl mx-auto">
            {imersao.short}
          </p>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 max-w-3xl space-y-12">
        <p className="font-inter text-base leading-relaxed text-petroleum-800 dark:text-parchment-100/95">
          {imersao.intro}
        </p>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden="true" />
            <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
              Para quem é
            </h2>
          </div>
          <ul className="space-y-2 font-inter text-sm text-foreground/90 leading-relaxed list-none">
            {imersao.forWho.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-gold-600 dark:text-gold-400 select-none flex-shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden="true" />
            <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
              Como é a jornada
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {imersao.steps.map((step, idx) => (
              <div key={step.title} className="rounded-xl border border-border/50 bg-card/40 p-5">
                <p className="font-cinzel text-sm font-semibold text-gold-700 dark:text-gold-400 mb-1">
                  {idx + 1}. {step.title}
                </p>
                <p className="font-inter text-sm leading-relaxed text-foreground/90">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gold-500/20 bg-gold-500/5 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden="true" />
            <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
              Salvaguardas e limites
            </h2>
          </div>
          <ul className="space-y-2 font-inter text-sm text-foreground/90 leading-relaxed list-none">
            {imersao.safeguards.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-gold-600 dark:text-gold-400 select-none flex-shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-2">
          <ImersaoMaterial manuals={imersao.manuals} />
        </section>
      </article>
    </div>
  )
}
