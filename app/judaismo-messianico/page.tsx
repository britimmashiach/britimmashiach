import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, HeartHandshake, Scale, Sparkles } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqSection } from '@/components/seo/FaqSection'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SITE_NAME_ALT } from '@/lib/site-brand'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { faqPageJsonLd, breadcrumbJsonLd } from '@/lib/json-ld'

const APP_URL = getPublicSiteOrigin()

const PILLAR_FAQ = [
  {
    question: 'O que é judaísmo messiânico não trinitário?',
    answer: 'É a fé que reconhece Yeshua HaMashiach como o Mashiach prometido às tribos de Israel e às nações, mantendo Adonai Echad, o monoteísmo absoluto, a Toráh, a Halacháh e a vida comunitária judaica, sem a doutrina da trindade.',
  },
  {
    question: 'A Brit Im Mashiach considera Yeshua como Deus?',
    answer: 'Não. Cremos que Yeshua é o Mashiach ben Yosef, enviado de Israel, e não o Criador nem uma segunda ou terceira pessoa divina. Respeitamos quem pensa diferente, mas nossa confissão permanece no Shemá: Adonai Echad.',
  },
  {
    question: 'Isso é cristianismo ou judaísmo?',
    answer: 'Somos uma sinagoga judaica messiânica: praticamos Shabat, Moedim, mitzvot e estudo rabínico clássico, e reconhecemos Yeshua dentro dessa herança hebraica, não como ruptura com Israel.',
  },
  {
    question: 'Como estudar essa identidade na plataforma?',
    answer: 'Comece pelas Parashot semanais, pelo Método PaRDeS, pelos Chagim e pelos estudos públicos. O plano Premium libera PDFs das Aliyot, Kabaláh avançada e acervo reservado do Rav EBBY.',
  },
]

export const metadata: Metadata = {
  title: 'Judaísmo messiânico não trinitário',
  description:
    'Entenda a identidade da Brit Im Mashiach: Toráh, Halacháh, Yeshua HaMashiach e monoteísmo absoluto (Adonai Echad) sem trindade. Sinagoga em Franca, SP.',
  alternates: { canonical: `${APP_URL}/judaismo-messianico` },
  openGraph: {
    url: `${APP_URL}/judaismo-messianico`,
    title: `Judaísmo messiânico não trinitário | ${SITE_NAME_ALT}`,
    description:
      'Fé hebraica, Mashiach de Israel e vida judaica praticada com fidelidade à Toráh.',
    locale: 'pt_BR',
  },
}

export default function JudaismoMessianicoPage() {
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Judaísmo messiânico', path: '/judaismo-messianico' },
  ]

  return (
    <div className="min-h-screen">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Judaísmo messiânico não trinitário',
            url: `${APP_URL}/judaismo-messianico`,
            description:
              'Página pilar sobre a identidade judaico-messiânica não trinitária da Congregação Brit Im Mashiach.',
            isPartOf: { '@type': 'WebSite', name: SITE_NAME_ALT, url: APP_URL },
          },
          breadcrumbJsonLd(crumbs),
          faqPageJsonLd(PILLAR_FAQ),
        ]}
      />

      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-petroleum-gradient opacity-[0.04] dark:opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.gold.500/10),transparent_55%)]" />
        <div className="relative container mx-auto px-4 py-14 md:py-20 max-w-3xl text-center space-y-4">
          <p className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest">
            Identidade de fé
          </p>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight">
            Judaísmo messiânico não trinitário
          </h1>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic max-w-2xl mx-auto">
            Toráh, Israel, Yeshua HaMashiach e Adonai Echad: restauração da fé hebraica original na Brit Im Mashiach.
          </p>
        </div>
      </section>

      <article className="container mx-auto px-4 py-10 md:py-14 max-w-3xl space-y-10">
        <Breadcrumbs items={crumbs} />

        <section className="space-y-4">
          <div className="flex gap-3 items-start">
            <HeartHandshake className="w-6 h-6 shrink-0 text-gold-600 dark:text-gold-400 mt-1" aria-hidden />
            <div className="space-y-4 font-inter text-base md:text-[17px] leading-relaxed text-petroleum-800 dark:text-parchment-100/95">
              <p>
                O judaísmo messiânico não trinitário afirma que Yeshua HaMashiach ben Yosef cumpre as promessas messiânicas
                às tribos de Israel e às nações, sem negar o monoteísmo revelado no Shemá. Na Brit Im Mashiach, essa convicção
                se expressa em Shabat, Chagim, mitzvot, estudo talmúdico e kabaláh, com reverência aos Sábios de Israel.
              </p>
              <p>
                Não definimos Yeshua como Deus Criador nem adotamos a trindade. Respeitamos outros caminhos de fé, mas
                permanecemos firmes em <strong className="font-semibold">Adonai Echad</strong>, Elohim único de Avraham,
                Yitzchak e Yaakov.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border/50 bg-background/80 dark:bg-petroleum-950/40 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-petroleum-800 dark:text-parchment-100">
            <Scale className="w-5 h-5 text-gold-600 shrink-0" aria-hidden />
            <h2 className="font-cinzel text-xl font-semibold">Toráh, Halacháh e comunidade</h2>
          </div>
          <p className="font-inter text-base md:text-[17px] leading-relaxed text-foreground/95">
            Praticamos a vida judaica em Franca, São Paulo, guardando o calendário bíblico, a kashrut conforme nossa halacháh
            comunitária e o ciclo das Parashot. Cada mandamento possui Peshat, Remez, Drash e Sod, e o estudo semanal forma
            discípulos com santidade, tikkun e serviço ao Eterno.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-petroleum-800 dark:text-parchment-100">
            <BookOpen className="w-5 h-5 text-petroleum-600 shrink-0" aria-hidden />
            <h2 className="font-cinzel text-xl font-semibold">Como aprofundar no site</h2>
          </div>
          <ul className="space-y-3 font-inter text-base leading-relaxed">
            {[
              { href: '/metodo-pardes', label: 'Método PaRDeS', desc: 'os quatro níveis de estudo da Toráh' },
              { href: '/parashot', label: 'Parashot semanais', desc: 'Aliyot diárias com introdução pública e estudo Premium' },
              { href: '/chagim', label: 'Chagim e Moedim', desc: 'festas bíblicas com kavanáh e tradição' },
              { href: '/rav', label: 'O Rav', desc: 'metodologia, Netivot e manifesto doutrinário' },
              { href: '/ensinos', label: 'Ensinos e guias', desc: 'artigos SEO sobre Toráh e Kabaláh' },
              { href: '/sobre', label: 'Quem somos', desc: 'história e missão da congregação' },
              { href: '/faq', label: 'Perguntas frequentes', desc: 'Premium, estudo gratuito e identidade' },
            ].map(({ href, label, desc }) => (
              <li key={href}>
                <Link href={href} className="text-petroleum-700 dark:text-gold-400 font-medium hover:underline">
                  {label}
                </Link>
                <span className="text-warmgray-600 dark:text-warmgray-400"> — {desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-purple-900/20 dark:border-purple-400/20 bg-purple-950/[0.03] dark:bg-purple-950/20 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-purple-950 dark:text-purple-100">
            <Sparkles className="w-5 h-5 shrink-0" aria-hidden />
            <h2 className="font-cinzel text-xl font-semibold">Restauração e redenção</h2>
          </div>
          <p className="font-inter text-base md:text-[17px] leading-relaxed text-petroleum-800 dark:text-parchment-100/95">
            Cremos que o retorno às raízes hebraicas, a reunificação espiritual de Israel e a preparação para a geuláh
            passam pelo estudo fiel da Toráh, pela brit com o Mashiach e pela comunidade que ora, aprende e pratica mitzvot
            com kavanáh. Esta página resume nossa confissão pública; o caminho completo se vive na sinagoga e na plataforma.
          </p>
        </section>

        <FaqSection items={PILLAR_FAQ} title="Perguntas sobre nossa identidade" />
      </article>
    </div>
  )
}
