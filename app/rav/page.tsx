import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Layers,
  Sparkles,
  HeartHandshake,
  Scale,
  ArrowRight,
  GraduationCap,
} from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { FaqSection } from '@/components/seo/FaqSection'
import { CONGREGATION, RAV_NAME, SITE_NAME_ALT } from '@/lib/site-brand'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { breadcrumbJsonLd, faqPageJsonLd, personJsonLd } from '@/lib/json-ld'

const APP_URL = getPublicSiteOrigin()

const RAV_FAQ = [
  {
    question: 'Quem é o Rav Eliahu Barzilay ben Yehoshua?',
    answer: 'É o Rav da Congregação Brit Im Mashiach em Franca, SP, responsável pela linha doutrinária, pelas Aliyot semanais PaRDeS e pelo Modelo Netivot aplicado na plataforma digital.',
  },
  {
    question: 'O que é o Método Rav EBBY?',
    answer: 'É a aplicação sistemática de PaRDeS (Peshat, Remez, Drash, Sod) em cada Aliyáh, com comentários clássicos, Kabaláh Luriana, Mussar e correlação responsável com a vida messiânica da kehilah.',
  },
  {
    question: 'Como estudar com o Rav pela internet?',
    answer: 'Comece pelas Parashot e pelos ensinos públicos. Os portões internos liberam PDFs completos, Sod, Netivot e biblioteca. Líderes aprovados acessam o programa Manhigut separadamente.',
  },
]

const TIMELINE = [
  {
    period: 'Formação',
    text: 'Estudo intensivo da Toráh, Halacháh, comentários clássicos (Rashi, Ramban, Ibn Ezra, Sforno) e tradição kabalística (Zohar, Luria, Cordovero).',
  },
  {
    period: 'Chamado pastoral',
    text: 'Serviço à kehilah judaico-messiânica: Shabat, Moedim, ensino público e formação de discípulos com kavanáh e kedusháh.',
  },
  {
    period: 'Método PaRDeS nas Aliyot',
    text: 'Desenvolvimento do formato semanal de sete Aliyot com análise completa em quatro níveis, Mussar prático e síntese sefirótica.',
  },
  {
    period: 'Modelo Netivot',
    text: 'Sistematização dos 32 caminhos do Etz Chaim como ferramenta proprietária de ensino, integrada ao Sod de cada porção.',
  },
  {
    period: 'Plataforma digital',
    text: 'Beit Midrash online da Brit Im Mashiach: Parashot, calendário, biblioteca, Tehilim, Chagim e portões internos para o caminho profundo.',
  },
]

export const metadata: Metadata = {
  title: 'Rav Eliahu Barzilay ben Yehoshua',
  description:
    'Página oficial do Rav da Brit Im Mashiach: metodologia PaRDeS, Modelo Netivot, visão da kehilah e manifesto doutrinário. Franca, SP.',
  alternates: { canonical: `${APP_URL}/rav` },
  openGraph: {
    url: `${APP_URL}/rav`,
    title: `Rav Eliahu Barzilay | ${SITE_NAME_ALT}`,
    description: 'Autoridade espiritual, método de estudo e visão da congregação judaico-messiânica.',
    locale: 'pt_BR',
  },
}

export default function RavPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'O Rav', path: '/rav' },
  ]

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          personJsonLd({
            name: RAV_NAME,
            url: `${APP_URL}/rav`,
            description:
              'Rav da Congregação Brit Im Mashiach. Ensina Toráh, Kabaláh Luriana e o Modelo Netivot no método PaRDeS.',
            jobTitle: 'Rav',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            name: RAV_NAME,
            url: `${APP_URL}/rav`,
            mainEntity: { '@type': 'Person', name: RAV_NAME },
          },
          breadcrumbJsonLd(crumbs),
          faqPageJsonLd(RAV_FAQ),
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/40 bg-spiritual-depth bg-kabbalah-texture">
        <div className="relative container mx-auto px-4 py-14 md:py-20 max-w-3xl text-center space-y-5">
          <p className="portal-eyebrow mx-auto">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            Orientação espiritual
          </p>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight text-balance">
            {RAV_NAME}
          </h1>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic max-w-2xl mx-auto leading-relaxed">
            Rav da {CONGREGATION}. Toráh, Kabaláh Luriana, PaRDeS e o Modelo Netivot ao serviço da restauração messiânica de Israel.
          </p>
          <p className="text-sm font-inter text-warmgray-500 dark:text-warmgray-400">
            Assinatura nas obras: Rav.: EBBY
          </p>
        </div>
      </section>

      <article className="container mx-auto px-4 py-10 md:py-14 max-w-3xl space-y-12">
        <Breadcrumbs items={crumbs} />

        <section className="space-y-4" aria-labelledby="manifesto-titulo">
          <h2 id="manifesto-titulo" className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Manifesto doutrinário
          </h2>
          <div className="rounded-xl border border-gold-500/25 bg-gold-500/[0.04] dark:bg-gold-500/[0.06] p-6 md:p-8 space-y-4 font-inter text-base md:text-[17px] leading-relaxed text-petroleum-800 dark:text-parchment-100/95">
            <p>
              A Toráh é árvore de vida. Não a reduzimos a informação nem a opinião religiosa: ela é o eixo pelo qual
              Israel e as nações encontram santidade, tikun e a promessa do Mashiach.
            </p>
            <p>
              Ensinamos com{' '}
              <strong className="font-semibold">Adonai Echad</strong>, com Yeshua HaMashiach reconhecido dentro da
              herança hebraica, sem trindade, e com Halacháh viva na congregação. O estudo sobe de Peshat a Sod sem
              pular etapas: quem não firma o literal não flutua no místico.
            </p>
            <p>
              A Brit Im Mashiach existe para formar discípulos que guardam Shabat e Moedim, honram os Sábios, praticam
              Mussar e entram nos portões internos do conhecimento quando estão prontos para sustentar o caminho.
            </p>
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="linha-tempo">
          <h2 id="linha-tempo" className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Linha do tempo espiritual
          </h2>
          <ol className="relative border-l border-gold-500/30 pl-6 space-y-8">
            {TIMELINE.map((item) => (
              <li key={item.period} className="relative">
                <span
                  className="absolute -left-[1.65rem] top-1.5 w-2.5 h-2.5 rounded-full bg-gold-500 ring-4 ring-background"
                  aria-hidden="true"
                />
                <p className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest mb-1">
                  {item.period}
                </p>
                <p className="font-inter text-base leading-relaxed text-warmgray-700 dark:text-warmgray-300">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-xl border border-border/50 bg-background/80 dark:bg-petroleum-950/40 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gold-600 shrink-0" aria-hidden="true" />
            <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
              Metodologia — Método PaRDeS
            </h2>
          </div>
          <p className="font-inter text-base md:text-[17px] leading-relaxed text-foreground/95">
            Cada Aliyáh semanal segue estrutura fixa: termos-chave, texto hebraico, transliteração, tradução, quatro níveis
            PaRDeS, comentários (Rashi, Ibn Ezra, Ramban, Sforno), ensino do Rav, Chazal, Talmud, Zohar, Mussar com três
            práticas, correlação messiânica com salvaguarda halachica, Sefirot, Netivot, conclusão e poesia final.
          </p>
          <Link
            href="/metodo-pardes"
            className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-gold-700 dark:text-gold-400 hover:underline"
          >
            Ver o Método PaRDeS em detalhe
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </section>

        <section className="rounded-xl border border-purple-900/20 dark:border-purple-400/20 bg-purple-950/[0.03] dark:bg-purple-950/20 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-700 dark:text-purple-300 shrink-0" aria-hidden="true" />
            <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
              Modelo Netivot
            </h2>
          </div>
          <p className="font-inter text-base md:text-[17px] leading-relaxed text-petroleum-800 dark:text-parchment-100/95">
            Os trinta e dois caminhos do Etz Chaim não são decoração: nomeiam como as letras do Alef-Beit conectam as
            Sefirot em cada porção. O Modelo Netivot do Rav EBBY é o diferencial doutrinário da plataforma, aplicado na
            seção Sod e na síntese sefirótica de cada Aliyáh.
          </p>
          <Link
            href="/ensinos/netivot"
            className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-gold-700 dark:text-gold-400 hover:underline"
          >
            Artigo: Modelo Netivot
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-gold-600 shrink-0" aria-hidden="true" />
            <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
              Visão da kehilah
            </h2>
          </div>
          <p className="font-inter text-base md:text-[17px] leading-relaxed text-foreground/95">
            A congregação em Franca é casa de estudo, oração e crescimento. A plataforma estende o Beit Midrash para
            irmãos distantes, sempre apontando de volta à mesa comunitária do Shabat. Líderes passam pelo discernimento
            pastoral do Rav no programa Manhigut; o Premium sustenta o conteúdo digital sem substituir a vida presencial.
          </p>
          <Link href="/sobre" className="text-sm font-inter text-gold-700 dark:text-gold-400 font-medium hover:underline">
            Quem somos — congregação
          </Link>
        </section>

        <section className="rounded-xl border border-border/50 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-petroleum-600 shrink-0" aria-hidden="true" />
            <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
              Caminhos de estudo
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              { href: '/parashot', label: 'Parashot semanais' },
              { href: '/ensinos', label: 'Guias e artigos' },
              { href: '/studies', label: 'Estudos do Rav' },
              { href: '/premium', label: 'Portões internos' },
              { href: '/lideres', label: 'Formação de líderes' },
              { href: '/comunidade', label: 'Comunidade viva' },
              { href: '/ouvidoria', label: 'Falar com a congregação' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-sm font-inter text-petroleum-700 dark:text-gold-400 font-medium hover:underline py-1"
                >
                  <GraduationCap className="w-4 h-4 shrink-0 opacity-60" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection items={RAV_FAQ} title="Perguntas sobre o Rav" />
      </article>
    </div>
  )
}
