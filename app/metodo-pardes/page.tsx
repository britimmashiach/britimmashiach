import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Layers } from 'lucide-react'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { RAV_NAME, SITE_NAME_ALT } from '@/lib/site-brand'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { breadcrumbJsonLd } from '@/lib/json-ld'

const origin = getPublicSiteOrigin()

const PAGE_DESCRIPTION =
  'PaRDeS: Peshat, Remez, Drash e Sod. Entenda os quatro níveis de estudo da Toráh aplicados pelo Rav EBBY na Brit Im Mashiach.'

export const metadata: Metadata = {
  title: 'Método PaRDeS',
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${origin}/metodo-pardes` },
  openGraph: {
    url: `${origin}/metodo-pardes`,
    title: `Método PaRDeS | ${SITE_NAME_ALT}`,
    description: 'Os quatro níveis clássicos de interpretação da Toráh na tradição judaica.',
    locale: 'pt_BR',
  },
}

const LEVELS = [
  {
    id: 'peshat',
    hebrew: 'פשט',
    title: 'Peshat',
    subtitle: 'Análise literal e halachica',
    color: 'text-green-700 dark:text-green-400',
    body: 'O sentido direto do texto: contexto histórico, linguagem, halacháh e narrativa. É a base que sustenta os demais níveis sem substituí-los.',
  },
  {
    id: 'remez',
    hebrew: 'רמז',
    title: 'Remez',
    subtitle: 'O princípio velado',
    color: 'text-blue-700 dark:text-blue-400',
    body: 'Alusões, correspondências e princípios que o texto sugere além da leitura superficial. Conecta versículos, temas e arquetipos.',
  },
  {
    id: 'drash',
    hebrew: 'דרש',
    title: 'Drash',
    subtitle: 'O ensino homilético',
    color: 'text-amber-800 dark:text-amber-400',
    body: 'Ensino dos sábios, Midrash, aggadáh e aplicação prática para a comunidade. É onde a Toráh dialoga com a vida da congregação.',
  },
  {
    id: 'sod',
    hebrew: 'סוד',
    title: 'Sod',
    subtitle: 'O segredo kabalístico',
    color: 'text-purple-700 dark:text-purple-400',
    body: 'Dimensão mística: Sefirot, Netivot, Zohar, Luria e tikun. Reservada ao aprofundamento, sempre ancorada na Toráh e na tradição.',
  },
]

export default function MetodoPardesPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Método PaRDeS', path: '/metodo-pardes' },
  ]

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Método PaRDeS — os quatro níveis de estudo da Toráh',
            description: PAGE_DESCRIPTION,
            url: `${origin}/metodo-pardes`,
            author: { '@type': 'Person', name: RAV_NAME },
            publisher: { '@type': 'Organization', name: SITE_NAME_ALT, url: origin },
            inLanguage: 'pt-BR',
            about: { '@type': 'Thing', name: 'PaRDeS — interpretação da Toráh' },
          },
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="border-b border-border/40 bg-petroleum-gradient/5">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/12 border border-gold-500/25">
            <Layers className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" aria-hidden="true" />
            <span className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest">
              Método Rav EBBY
            </span>
          </div>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100">
            PaRDeS
          </h1>
          <p className="font-hebrew text-2xl text-warmgray-500" dir="rtl">
            פרדס
          </p>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic max-w-2xl mx-auto">
            Os quatro níveis clássicos de interpretação da Toráh: literal, alusivo, homilético e kabalístico.
          </p>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 max-w-3xl space-y-10">
        <p className="font-inter text-base leading-relaxed text-petroleum-800 dark:text-parchment-100/95">
          Na Brit Im Mashiach, cada Parasháh semanal é estudada nos quatro níveis PaRDeS, com comentários dos sábios,
          correlação responsável com a Brit Hadashá, Mussar prático e leitura sefirótica. O objetivo não é acumular
          informação, mas formar discípulos capazes de habitar a Toráh com profundidade e fidelidade halachica.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {LEVELS.map((level) => (
            <section
              key={level.id}
              id={level.id}
              className="rounded-xl border border-border/50 bg-card/40 p-5"
            >
              <p className="font-hebrew text-lg text-warmgray-500 mb-1" dir="rtl">
                {level.hebrew}
              </p>
              <h2 className={`font-cinzel text-xl font-semibold ${level.color}`}>
                {level.title}
              </h2>
              <p className="text-[11px] font-inter font-medium text-warmgray-500 uppercase tracking-wide mt-1 mb-3">
                {level.subtitle}
              </p>
              <p className="font-inter text-sm leading-relaxed text-foreground">
                {level.body}
              </p>
            </section>
          ))}
        </div>

        <section className="rounded-xl border border-gold-500/20 bg-gold-500/5 p-6 space-y-3">
          <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Como praticar na plataforma
          </h2>
          <ul className="space-y-2 font-inter text-sm text-foreground leading-relaxed list-disc pl-5">
            <li>Leia a Parasháh da semana em <Link href="/parashot" className="text-gold-600 hover:underline">Parashot</Link></li>
            <li>Acompanhe o calendário litúrgico em <Link href="/calendar" className="text-gold-600 hover:underline">Calendário</Link></li>
            <li>Conheça o <Link href="/rav" className="text-gold-600 hover:underline">Rav Eliahu Barzilay</Link> e o método aplicado nas Aliyot</li>
            <li>Leia os guias em <Link href="/ensinos" className="text-gold-600 hover:underline">Ensinos</Link> e aprofunde em <Link href="/studies" className="text-gold-600 hover:underline">Estudos</Link></li>
            <li>Assinantes Premium acessam PDFs completos das sete Aliyot com PaRDeS integral</li>
          </ul>
        </section>

        <div className="flex items-center gap-3 pt-4">
          <BookOpen className="w-5 h-5 text-gold-500 shrink-0" aria-hidden="true" />
          <p className="text-sm font-inter text-warmgray-500">
            Dúvidas? Veja também a página de{' '}
            <Link href="/faq" className="text-gold-600 hover:underline">
              perguntas frequentes
            </Link>
            .
          </p>
        </div>
      </article>
    </div>
  )
}
