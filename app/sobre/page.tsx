import type { Metadata } from 'next'
import { Landmark, Scale, BookMarked, Sparkles, HeartHandshake } from 'lucide-react'
import { SITE_NAME_ALT, CONGREGATION } from '@/lib/site-brand'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { JsonLd } from '@/components/seo/JsonLd'

const APP_URL = getPublicSiteOrigin()

export const metadata: Metadata = {
  title: 'Quem somos',
  description:
    `${SITE_NAME_ALT}: sinagoga judaico-messiânica em Franca (SP), Toráh, Halacháh, PaRDeS e fé em Yeshua HaMashiach sem trindade.`,
  alternates: { canonical: `${APP_URL}/sobre` },
  openGraph: {
    url: `${APP_URL}/sobre`,
    title: `Quem somos | ${SITE_NAME_ALT}`,
    description:
      'Identidade, fé e caminho da congregação: Toráh, tradições de Israel e estudo nos quatro níveis da Toráh.',
    locale: 'pt_BR',
  },
}

export default function QuemSomosPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `Quem somos — ${SITE_NAME_ALT}`,
          url: `${APP_URL}/sobre`,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME_ALT, url: APP_URL },
          description:
            'Página institucional da congregação judaico-messiânica Brit Im Mashiach.',
        }}
      />

      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-petroleum-gradient opacity-[0.04] dark:opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.gold.500/10),transparent_55%)]" />
        <div className="relative container mx-auto px-4 py-14 md:py-20 max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/12 border border-gold-500/25">
            <Landmark className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" aria-hidden />
            <span className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest">
              {CONGREGATION}
            </span>
          </div>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight">
            Quem somos
          </h1>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic">
            Sinagoga judaico-messiânica dedicada à restauração da Toráh, da identidade de Israel e da fé hebraica original.
          </p>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 md:py-16 max-w-3xl space-y-10">
        <section className="space-y-4" aria-labelledby="bloco-fe">
          <h2 id="bloco-fe" className="sr-only">
            Fé e identidade messiânica
          </h2>
          <div className="flex gap-3 items-start">
            <HeartHandshake className="w-6 h-6 shrink-0 text-gold-600 dark:text-gold-400 mt-1" aria-hidden />
            <div className="space-y-4 font-inter text-base md:text-[17px] leading-relaxed text-petroleum-800 dark:text-parchment-100/95">
              <p>
                Somos uma sinagoga judaico-messiânica dedicada à restauração da Toráh, da identidade de Israel e da fé hebraica original em{' '}
                <strong className="font-semibold text-petroleum-900 dark:text-parchment-50">Yeshua HaMashiach ben Yosef</strong>.
                Reconhecemos Yeshua como o Mashiach prometido às tribos de Israel e às nações, porém não o definimos como Deus, o Criador, nem seguimos a doutrina da trindade.
              </p>
              <p>
                Respeitamos os que assim crêem. Nossa base é o monoteísmo absoluto revelado nas Escrituras Sagradas{' '}
                <strong className="font-semibold text-petroleum-900 dark:text-parchment-50">(ADO-NAI ECHAD)</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border/50 bg-background/80 dark:bg-petroleum-950/40 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-petroleum-800 dark:text-parchment-100">
            <Scale className="w-5 h-5 text-gold-600 shrink-0" aria-hidden />
            <h2 className="font-cinzel text-xl font-semibold">Vida judaica e compromisso</h2>
          </div>
          <p className="font-inter text-base md:text-[17px] leading-relaxed text-foreground/95">
            Buscamos viver uma prática judaica fundamentada na Toráh, na Halacháh, nas tradições de Israel e nos ensinamentos dos Sábios, buscando unir fidelidade bíblica, profundidade espiritual e vida comunitária. Guardamos o Shabat, os Chagim bíblicos, as mitzvot e o ciclo sagrado estabelecido pela Toráh, compreendendo que cada mandamento possui dimensões espirituais, proféticas e restauradoras.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-petroleum-800 dark:text-parchment-100">
            <BookMarked className="w-5 h-5 text-petroleum-600 shrink-0" aria-hidden />
            <h2 className="font-cinzel text-xl font-semibold">Linha de estudo</h2>
          </div>
          <p className="font-inter text-base md:text-[17px] leading-relaxed text-foreground/95">
            Nossa linha de estudo integra o método <strong className="font-semibold">PaRDeS</strong>, contemplando os níveis{' '}
            <strong className="font-semibold">Peshat</strong>, <strong className="font-semibold">Remez</strong>,{' '}
            <strong className="font-semibold">Drash</strong> e <strong className="font-semibold">Sod</strong>, permitindo uma leitura profunda das Escrituras. Também utilizamos fontes tradicionais como o Talmud, Midrashim, Zohar HaKadosh, Bahir, Chok LeYisrael, Sefer Yetziráh e os ensinamentos dos mekubalím e sábios de Israel ao longo das gerações.
          </p>
        </section>

        <section className="rounded-xl border border-purple-900/20 dark:border-purple-400/20 bg-purple-950/[0.03] dark:bg-purple-950/20 p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-purple-950 dark:text-purple-100">
            <Sparkles className="w-5 h-5 shrink-0" aria-hidden />
            <h2 className="font-cinzel text-xl font-semibold">Visão e comunidade</h2>
          </div>
          <p className="font-inter text-base md:text-[17px] leading-relaxed text-petroleum-800 dark:text-parchment-100/95">
            Cremos que a restauração espiritual dos últimos tempos envolve o retorno às raízes hebraicas da fé, a reunificação de Israel e a preparação do mundo para a redenção messiânica. Nossa comunidade busca formar discípulos comprometidos com a santidade, a sabedoria, o Tikkun da alma e o serviço ao Eterno com Kavanáh, Kedusháh e amor à Toráh.
          </p>
          <p className="font-inter text-base md:text-[17px] leading-relaxed text-petroleum-800 dark:text-parchment-100/95">
            Somos uma casa de estudo, oração e crescimento espiritual, aberta àqueles que desejam aprofundar-se na herança espiritual de Israel, viver uma fé alinhada às Escrituras e caminhar em aliança com o Elohim de Avraham, Yitzchak e Yaakov.
          </p>
        </section>
      </article>
    </div>
  )
}
