import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Layers, Scale, Sparkles, Star } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { FaqSection } from '@/components/seo/FaqSection'
import {
  CONGREGATION,
  RAV_NAME,
  SITE_ADDRESS_FULL,
  SITE_NAME_ALT,
} from '@/lib/site-brand'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/json-ld'

const APP_URL = getPublicSiteOrigin()

const MANIFESTO_FAQ = [
  {
    question: 'A Brit Im Mashiach é igreja ou sinagoga?',
    answer:
      'Somos sinagoga judaico-messiânica: vida litúrgica judaica (Shabat, Moedim, Toráh) com fé no Mashiach de Israel, sem trindade e sem ruptura com a herança hebraica.',
  },
  {
    question: 'Vocês consideram Yeshua como Deus?',
    answer:
      'Não. Cremos em Adonai Echad. Yeshua é reconhecido como Mashiach ben Yosef, não como o Ein Sof nem segunda pessoa divina.',
  },
  {
    question: 'O que é o Modelo Netivot?',
    answer:
      'É o sistema proprietário do Rav Eliahu Barzilay que aplica os 32 caminhos do Etz Chaim (Kabaláh Luriana) ao estudo semanal da Toráh, integrado ao método PaRDeS.',
  },
  {
    question: 'Onde fica a congregação?',
    answer: `Cultos e encontros presenciais em ${SITE_ADDRESS_FULL}. A plataforma digital estende o Beit Midrash para irmãos distantes.`,
  },
]

const SECTIONS = [
  {
    id: 'kehilah',
    icon: Sparkles,
    title: 'Visão da kehilah',
    paragraphs: [
      'A Congregação Brit Im Mashiach existe para restaurar Israel e acolher as nações na luz da Toráh, com kedusháh, comunidade e estudo profundo. Não somos entretenimento religioso nem rede social espiritual: somos Beit Midrash vivo em Franca, SP, com mesa de Shabat, oração e formação de discípulos.',
      'A plataforma britimmashiach.com estende o ensino do Rav para quem está longe, mas sempre aponta de volta à vida presencial da sinagoga. Líderes passam pelo discernimento pastoral; o Premium sustenta o conteúdo digital sem substituir a kehilah.',
    ],
  },
  {
    id: 'yeshua',
    icon: Star,
    title: 'Yeshua HaMashiach',
    paragraphs: [
      'Reconhecemos Yeshua como o Mashiach prometido às tribos de Israel e às nações, na linhagem de Yosef e Davi. Mantemos o Shemá como fundamento: Adonai Echad. Não professamos trindade nem substituímos o Criador pelo enviado.',
      'Yeshua ilumina o cumprimento da Toráh na congregação; não a abole. A correlação com princípios da Brit Hadashá é feita com responsabilidade doutrinária, sempre subordinada à Toráh Kedushah do Sinai.',
    ],
    link: { href: '/ensinos/yeshua-judaismo-messianico', label: 'Yeshua no judaísmo messiânico' },
  },
  {
    id: 'torah',
    icon: BookOpen,
    title: 'Toráh',
    paragraphs: [
      'A Toráh é árvore de vida. Não a reduzimos a opinião nem a curiosidade acadêmica: é o eixo pelo qual Israel encontra santidade, tikun e a promessa do Mashiach.',
      'Estudamos o ciclo semanal das Parashot com sete Aliyot, Tanach, Tehilim, Chagim e calendário hebraico. O método sobe de Peshat a Sod sem pular etapas — quem não firma o literal não flutua no místico.',
    ],
    link: { href: '/ensinos/parasha-da-semana', label: 'Parashá da semana' },
  },
  {
    id: 'halachah',
    icon: Scale,
    title: 'Halacháh',
    paragraphs: [
      'Praticamos Shabat, Moedim, kashrut comunitária e vida congregacional segundo o discernimento do Rav e os princípios da tradição rabínica aplicada à realidade messiânica da kehilah.',
      'O estudo kabalístico nunca dispensa a obediência prática. Mussar, oração com kavanáh e ética diária são portas obrigatórias antes dos portões internos do Sod.',
    ],
    link: { href: '/judaismo-messianico', label: 'Judaísmo messiânico — pilar doutrinário' },
  },
  {
    id: 'kabalah',
    icon: Layers,
    title: 'Kabaláh Luriana',
    paragraphs: [
      'Seguimos a escola do Ari haKadosh: Tzimtzum, Shevirat haKelim, Tikun, Sefirot e Olamot — sempre dentro do quadro da Toráh, Zohar, Etz Chaim e comentários clássicos, sem ocultismo nem sincretismo.',
      'A Kabaláh orienta a kavanáh da oração, a leitura sefirótica das Aliyot e o refinamento da alma nos ciclos do calendário (Omer, Yamim Noraim, Moedim).',
    ],
    link: { href: '/ensinos/kabalah-luriana', label: 'Kabaláh Luriana — guia' },
  },
  {
    id: 'netivot',
    icon: Layers,
    title: 'Modelo Netivot',
    paragraphs: [
      'Os trinta e dois caminhos do Etz Chaim ligam as dez Sefirot pelas letras hebraicas. O Modelo Netivot do Rav Eliahu Barzilay ben Yehoshua (EBBY) nomeia e aplica esses caminhos de forma didática em cada Aliyáh semanal.',
      'Netivot pertencem ao nível Sod, mas nunca flutuam sem Peshat e Halacháh. É o diferencial doutrinário da Brit Im Mashiach no estudo profundo da Toráh.',
    ],
    link: { href: '/ensinos/netivot', label: 'Modelo Netivot — artigo' },
  },
]

export const metadata: Metadata = {
  title: 'Manifesto — visão, Toráh e identidade da kehilah',
  description:
    'Manifesto oficial da Sinagoga Brit Im Mashiach: visão da kehilah, Yeshua, Toráh, Halacháh, Kabaláh Luriana e Modelo Netivot. Franca, SP.',
  alternates: { canonical: `${APP_URL}/manifesto` },
  openGraph: {
    url: `${APP_URL}/manifesto`,
    title: `Manifesto | ${SITE_NAME_ALT}`,
    description:
      'Posição doutrinária da congregação judaico-messiânica Brit Im Mashiach em Franca, SP.',
    locale: 'pt_BR',
  },
}

export default function ManifestoPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Manifesto', path: '/manifesto' },
  ]

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          faqPageJsonLd(MANIFESTO_FAQ),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `Manifesto — ${SITE_NAME_ALT}`,
            url: `${APP_URL}/manifesto`,
            description:
              'Manifesto doutrinário da Sinagoga Brit Im Mashiach: Toráh, Yeshua, Halacháh, Kabaláh e Netivot.',
            inLanguage: 'pt-BR',
            about: { '@type': 'Organization', name: CONGREGATION },
            author: { '@type': 'Person', name: RAV_NAME },
          },
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/40 bg-spiritual-depth bg-kabbalah-texture">
        <div className="relative container mx-auto px-4 py-14 md:py-20 max-w-3xl text-center space-y-5">
          <p className="portal-eyebrow mx-auto">
            <Star className="w-3 h-3" aria-hidden="true" />
            Identidade da congregação
          </p>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight text-balance">
            Manifesto Brit Im Mashiach
          </h1>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic max-w-2xl mx-auto leading-relaxed">
            Visão da kehilah, fé messiânica dentro do monoteísmo hebraico, Toráh viva, Halacháh, Kabaláh Luriana e o Modelo Netivot.
          </p>
        </div>
      </section>

      <article className="container mx-auto px-4 py-10 md:py-14 max-w-3xl space-y-12">
        <Breadcrumbs items={crumbs} />

        <p className="font-inter text-base md:text-[17px] leading-relaxed text-foreground/95">
          Este documento consolida a identidade pública da {CONGREGATION} sob a orientação do {RAV_NAME}.
          Para a biografia e metodologia do Rav, veja também{' '}
          <Link href="/rav" className="text-gold-700 dark:text-gold-400 font-medium hover:underline">
            a página do Rav
          </Link>
          .
        </p>

        {SECTIONS.map((section) => {
          const Icon = section.icon
          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 space-y-4 rounded-xl border border-border/50 bg-background/80 dark:bg-petroleum-950/40 p-6 md:p-8"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-gold-600 shrink-0" aria-hidden="true" />
                <h2 className="font-cinzel text-xl md:text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
                  {section.title}
                </h2>
              </div>
              {section.paragraphs.map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="font-inter text-base md:text-[17px] leading-relaxed text-foreground/95"
                >
                  {para}
                </p>
              ))}
              {'link' in section && section.link && (
                <Link
                  href={section.link.href}
                  className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-gold-700 dark:text-gold-400 hover:underline"
                >
                  {section.link.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}
            </section>
          )
        })}

        <section className="rounded-xl border border-gold-500/25 bg-gold-500/[0.04] dark:bg-gold-500/[0.06] p-6 md:p-8 space-y-4">
          <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Caminhos de estudo
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 font-inter text-sm">
            {[
              { href: '/ensinos/kabalah-luriana', label: 'Kabaláh Luriana' },
              { href: '/ensinos/sefirot', label: 'As dez Sefirot' },
              { href: '/ensinos/sefirat-haomer', label: 'Sefirat haOmer' },
              { href: '/ensinos/netivot', label: 'Netivot' },
              { href: '/parashot', label: 'Parashot' },
              { href: '/comunidade', label: 'Comunidade' },
              { href: '/metodo-pardes', label: 'Método PaRDeS' },
              { href: '/premium', label: 'Portões internos' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-gold-700 dark:text-gold-400 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection items={MANIFESTO_FAQ} title="Perguntas sobre nossa identidade" />
      </article>
    </div>
  )
}
