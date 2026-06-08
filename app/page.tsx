import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar, Library, Star, Flame, Crown, ChevronRight, ShoppingBag, DoorOpen, Sparkles, Users } from 'lucide-react'
import { RAV_NAME, SEO_HOME_DESCRIPTION, SEO_HOME_TITLE, SITE_NAME_ALT } from '@/lib/site-brand'
import { getPublicSiteOrigin } from '@/lib/public-site-url'

const APP_URL = getPublicSiteOrigin()

// A home tem conteudo sensivel a data (contagem do Omer, "Aliyah de hoje",
// data hebraica), entao precisa ser sempre calculada na hora. Sem isso, snapshots
// ISR/CDN podem ficar presos numa data antiga (ex.: mostrar o Omer fora do periodo).
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: SEO_HOME_TITLE,
  description: SEO_HOME_DESCRIPTION,
  alternates: { canonical: APP_URL },
  openGraph: {
    url: APP_URL,
    title: SEO_HOME_TITLE,
    description: SEO_HOME_DESCRIPTION,
    locale: 'pt_BR',
    siteName: SITE_NAME_ALT,
  },
}
import { HebrewDateDisplay } from '@/components/spiritual/HebrewDateDisplay'
import { OmerCounter } from '@/components/spiritual/OmerCounter'
import { ParashaWidget } from '@/components/spiritual/ParashaWidget'
import { HebrewDateSkeleton } from '@/components/ui/Skeleton'
import { getHebrewDateInfo, getNextChag } from '@/lib/hebrew-date'
import { fetchHomeAnnouncements } from '@/lib/leader-portal-supabase'
import { HomeAnnouncementsCall } from '@/components/home/HomeAnnouncementsCall'
import { cn } from '@/lib/utils'

const recentStudies = [
  {
    id: '1',
    slug: 'ain-sof-e-a-emanacao-divina',
    title: 'Ein Sof e a Emanação Divina',
    excerpt: 'O Infinito além de toda limitação. Como o Ein Sof se contrai em Tzimtzum e emana os Olamot.',
    category: 'kabalah',
    readingTime: 18,
    isPremium: false,
  },
  {
    id: '2',
    slug: 'netivot-caminho-13-dalet-keter-tiferet',
    title: 'Netivot: Caminho 13 — Dalet',
    excerpt: 'O mistério do caminho de Dalet que une Keter a Tiferet. Análise completa segundo o Modelo Netivot.',
    category: 'netivot',
    readingTime: 22,
    isPremium: true,
  },
  {
    id: '3',
    slug: 'tehilim-23-ado-nai-roi',
    title: 'Tehilim 23: Ado-nai Roi',
    excerpt: 'Ado-nai é meu pastor. Análise PaRDeS completa com as dimensões ocultas do Salmo mais amado.',
    category: 'tehilim',
    readingTime: 15,
    isPremium: false,
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  kabalah: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  netivot: 'bg-gold-500/10 text-gold-700 dark:text-gold-400',
  tehilim: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
}

const ecosystemCards = [
  {
    href: '/calendar',
    icon: Calendar,
    title: 'Calendário Hebraico',
    description: 'Moedim, Shabatot, Rosh Chódeshs e o ciclo litúrgico completo do ano.',
  },
  {
    href: '/parashot',
    icon: BookOpen,
    title: 'Parashot Semanais',
    description: 'Porções da Toráh com análise PaRDeS: Peshat, Remez, Drash e Sod.',
  },
  {
    href: '/library',
    icon: Library,
    title: 'Biblioteca Espiritual',
    description: 'Siddur, Machzor, Tehilim, comentários cabalísticos e obras do Rav.',
  },
  {
    href: '/loja',
    icon: ShoppingBag,
    title: 'Acqua Rios',
    description: 'Velas decorativas e artigos Kosher para o lar. Loja Acqua Rios da congregação.',
  },
  {
    href: '/premium',
    icon: Star,
    title: 'Portões do Sod',
    description: 'Aliyot completas, Netivot, 49 Portões da Alma e os níveis profundos do caminho.',
  },
]

export default async function HomePage() {
  const hebrewInfo = getHebrewDateInfo(new Date())
  const nextChag = getNextChag(new Date())
  const homeAnnouncements = await fetchHomeAnnouncements()

  return (
    <div className="min-h-screen">

      <HomeAnnouncementsCall announcements={homeAnnouncements} />

      {/* Hero — portal de entrada no ciclo espiritual */}
      <section className="relative overflow-hidden border-b border-border/30 bg-spiritual-depth bg-kabbalah-texture">
        <div className="relative container mx-auto px-4 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Esquerda: portal iniciático */}
            <div className="space-y-7">
              <p className="portal-eyebrow">
                <DoorOpen className="w-3 h-3" aria-hidden="true" />
                Portal de entrada
              </p>

              <Suspense fallback={<HebrewDateSkeleton />}>
                <HebrewDateDisplay />
              </Suspense>

              <div className="space-y-4">
                <h1 className="font-cormorant text-4xl md:text-[2.75rem] font-light text-petroleum-800 dark:text-parchment-100 leading-[1.15] text-balance">
                  Você está entrando em um ecossistema de{' '}
                  <em className="font-semibold text-gold-600 dark:text-gold-400 not-italic">
                    Toráh
                  </em>
                  , Kabaláh e transformação da alma
                </h1>
                <p className="font-cormorant text-lg md:text-xl italic text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-md">
                  Não é apenas informação: é um caminho vivo. Cada semana abre uma Aliyáh; cada estudo aprofunda Peshat, Remez, Drash e Sod.
                </p>
                <p className="font-inter text-sm text-warmgray-500 dark:text-warmgray-400 leading-relaxed max-w-md">
                  Brit Im Mashiach — sinagoga e Beit Midrash digital sob a orientação do {RAV_NAME}.
                </p>
              </div>

              {/* Próximo Chag — indicador sutil */}
              {nextChag && (
                <div className="flex items-center gap-2 text-xs font-inter text-warmgray-400">
                  <Flame className="w-3 h-3 text-gold-500/70 flex-shrink-0" aria-hidden="true" />
                  <span>Em breve:</span>
                  <span
                    className="font-hebrew text-sm text-warmgray-500 dark:text-warmgray-400"
                    dir="rtl"
                    lang="he"
                  >
                    {nextChag.hebrew}
                  </span>
                  <Link
                    href="/chagim"
                    className="text-warmgray-500 hover:text-foreground transition-colors hover:underline underline-offset-2 decoration-gold-500/40"
                  >
                    {nextChag.name}
                  </Link>
                </div>
              )}

              {/* CTAs quietas — links, não botões */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                <Link
                  href="/studies"
                  className="text-sm font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors inline-flex items-center gap-1.5"
                >
                  Estudos
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/loja"
                  className="text-sm font-inter font-medium text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                  Acqua Rios
                </Link>
                <Link
                  href="/premium"
                  className="text-sm font-inter font-medium text-gold-700 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5" aria-hidden="true" />
                  Portões internos
                </Link>
              </div>
            </div>

            {/* Direita: ciclo da semana */}
            <div className="space-y-3">
              <ParashaWidget name={hebrewInfo.parasha} />
              <OmerCounter day={hebrewInfo.omerDay} text={hebrewInfo.omerText} />

              {/* Citação contemplativa */}
              <figure className="pl-4 border-l-2 border-gold-500/25 py-1">
                <blockquote className="font-cormorant text-base italic text-petroleum-700 dark:text-parchment-300 leading-relaxed">
                  {'\u201C'}
                  Quão preciosa é a tua misericórdia, ó Elohim! Os filhos dos homens se refugiam à sombra das tuas asas.
                  {'\u201D'}
                </blockquote>
                <figcaption className="text-[10px] font-inter text-warmgray-400 mt-1.5 not-italic uppercase tracking-widest">
                  Tehilim 36:8
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Parashá da semana — entrada do ciclo */}
      <section className="container mx-auto px-4 py-14 md:py-16" aria-labelledby="ciclo-titulo">
        <div className="glass-card p-6 md:p-8 border-gold-500/20 bg-gold-500/[0.02]">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1 space-y-3">
              <p className="text-[10px] font-inter font-semibold text-warmgray-400 uppercase tracking-widest">
                Parashá da semana
              </p>
              <h2 id="ciclo-titulo" className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
                {hebrewInfo.parasha ?? 'Parashá'}
              </h2>
              <p className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-md">
                A primeira Aliyáh é aberta a todos. Os portões das Aliyot seguintes, do Sod e dos PDFs completos pertencem a quem entra no caminho com profundidade.
              </p>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 flex-shrink-0">
              <Link href="/parashot" className="btn-gold text-sm whitespace-nowrap">
                Estudar esta semana
              </Link>
              <Link
                href="/premium"
                className="text-xs font-inter text-gold-700 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-300 transition-colors inline-flex items-center gap-1"
              >
                <Crown className="w-3 h-3" aria-hidden="true" />
                Continuar para os portões internos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Estudos recentes */}
      <section className="container mx-auto px-4 py-14 md:py-16" aria-labelledby="estudos-titulo">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 id="estudos-titulo" className="section-title">Estudos</h2>
            <p className="section-subtitle mt-0.5">Ensinos do Rav EBBY</p>
          </div>
          <Link
            href="/studies"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-inter font-medium text-warmgray-500 hover:text-foreground transition-colors"
          >
            Ver todos
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentStudies.map((study) => (
            <Link
              key={study.id}
              href={study.category === 'tehilim' ? '/tehilim' : `/studies/${study.slug}`}
              className="glass-card p-5 group hover:-translate-y-0.5 transition-all duration-150 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  'text-xs font-inter font-medium px-2.5 py-0.5 rounded-full capitalize',
                  CATEGORY_COLORS[study.category] ?? 'bg-muted text-muted-foreground',
                )}>
                  {study.category}
                </span>
                {study.isPremium && (
                  <span className="premium-badge" aria-label="Premium">
                    <Crown className="w-3 h-3" aria-hidden="true" />
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-snug">
                  {study.title}
                </h3>
                <p className="font-cormorant text-base italic text-warmgray-600 dark:text-warmgray-400 leading-relaxed line-clamp-2">
                  {study.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/30">
                <span className="text-xs font-inter text-warmgray-400">
                  {study.readingTime} min
                </span>
                <ArrowRight
                  className="w-4 h-4 text-warmgray-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Autoridade do Rav — ponte para legitimidade */}
      <section className="container mx-auto px-4 pb-4 md:pb-6" aria-labelledby="rav-titulo">
        <div className="glass-card p-6 md:p-8 border-petroleum-800/10 dark:border-gold-500/15 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="flex-1 space-y-3">
            <p className="text-[10px] font-inter font-semibold text-warmgray-400 uppercase tracking-widest">
              Orientação espiritual
            </p>
            <h2 id="rav-titulo" className="font-cinzel text-xl md:text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
              {RAV_NAME}
            </h2>
            <p className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-xl">
              Método PaRDeS, Kabaláh Luriana e o Modelo Netivot proprietário. O ensino une Toráh, Halacháh, comentários clássicos e a visão da kehilah messiânica em Franca.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/manifesto" className="btn-ghost text-sm border border-border/60">
              Manifesto
            </Link>
            <Link href="/metodo-pardes" className="btn-ghost text-sm border border-border/60">
              Método PaRDeS
            </Link>
            <Link href="/rav" className="btn-gold text-sm inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Página oficial do Rav
            </Link>
          </div>
        </div>
      </section>

      <hr className="divider-gold container mx-auto px-4" />

      {/* Ecossistema */}
      <section className="container mx-auto px-4 py-14 md:py-16" aria-labelledby="ecossistema-titulo">
        <div className="text-center mb-10">
          <h2 id="ecossistema-titulo" className="section-title">Ecossistema Espiritual</h2>
          <p className="section-subtitle mt-1">Tudo que você precisa para aprofundar sua caminhada</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {ecosystemCards.map(({ href, icon: Icon, title, description }) => (
            <Link
              key={href}
              href={href}
              className="glass-card p-5 group hover:-translate-y-0.5 transition-all duration-150 space-y-3"
            >
              <Icon
                className="w-4.5 h-4.5 text-warmgray-400 dark:text-warmgray-500 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors"
                aria-hidden="true"
              />

              <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                {title}
              </h3>

              <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
                {description}
              </p>

              <div className="flex items-center gap-1 text-xs font-inter text-warmgray-400 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                Explorar
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Imersões — Cura, Libertação e Tikkun */}
      <section className="container mx-auto px-4 py-14 md:py-16" aria-labelledby="imersoes-titulo">
        <div className="glass-card p-6 md:p-8 border-gold-500/20 bg-gold-500/[0.02] space-y-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[10px] font-inter font-semibold text-warmgray-400 uppercase tracking-widest">
                Escola Rav EBBY
              </p>
              <h2 id="imersoes-titulo" className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
                Imersões de Cura e Libertação
              </h2>
              <p className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-xl">
                Encontros intensivos de restauração da alma, com base na Toráh, em Teshuváh e Tikkun. Sempre com triagem, consentimento e supervisão.
              </p>
            </div>
            <Link
              href="/imersoes"
              className="text-sm font-inter font-medium text-gold-700 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-300 transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              Ver as imersões
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/imersoes/iecl"
              className="rounded-xl border border-border/50 bg-card/40 p-5 group hover:border-gold-500/40 transition-colors space-y-2"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden="true" />
                <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                  IECL
                </h3>
              </div>
              <p className="text-[11px] font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                Imersão Espiritual · Cura · Libertação
              </p>
              <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
                Cura Interior e libertação judaico-messiânica: restauração emocional, relacional e espiritual.
              </p>
            </Link>

            <Link
              href="/imersoes/avodat-hanefesh"
              className="rounded-xl border border-border/50 bg-card/40 p-5 group hover:border-gold-500/40 transition-colors space-y-2"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden="true" />
                <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                  Avodat HaNefesh
                </h3>
              </div>
              <p className="text-[11px] font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                Imersão de Tikkun · Cura · Retorno
              </p>
              <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
                O trabalho da alma: Teshuváh, Middot, ferramentas espirituais e Cura Interior na vida diária.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Comunidade viva */}
      <section className="container mx-auto px-4 py-14 md:py-16" aria-labelledby="comunidade-titulo">
        <div className="glass-card p-6 md:p-8 border-petroleum-800/10 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="flex-1 space-y-3">
            <p className="text-[10px] font-inter font-semibold text-warmgray-400 uppercase tracking-widest">
              Kehilah em movimento
            </p>
            <h2 id="comunidade-titulo" className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
              Comunidade viva em Franca
            </h2>
            <p className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-xl">
              Cultos de Shabat, estudos da Parashá, pedidos de oração e testemunhos. A plataforma serve a kehilah, não a substitui.
            </p>
          </div>
          <Link href="/comunidade" className="btn-gold text-sm inline-flex items-center gap-1.5 shrink-0">
            <Users className="w-4 h-4" aria-hidden="true" />
            Agenda e oração
          </Link>
        </div>
      </section>

      {/* Continuação natural — portões do Sod */}
      <section className="relative overflow-hidden bg-petroleum-800 dark:bg-petroleum-950 bg-kabbalah-texture" aria-label="Portões internos do caminho">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(201,168,76,0.14), transparent 65%), radial-gradient(ellipse 50% 40% at 0% 80%, rgba(56,120,160,0.12), transparent 55%)',
          }}
          aria-hidden="true"
        />

        <div className="relative container mx-auto px-4 py-16 text-center space-y-5">
          <p className="text-[10px] font-inter font-semibold text-gold-400/90 uppercase tracking-[0.25em]">
            Continuação do caminho
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-semibold text-parchment-100 max-w-2xl mx-auto leading-tight text-balance">
            A primeira Aliyáh é aberta. Os portões internos pertencem aos que entram no caminho
          </h2>

          <p className="font-cormorant text-xl text-parchment-300/85 italic max-w-xl mx-auto leading-relaxed">
            Sod, Netivot, 49 Portões da Alma, biblioteca completa e o ensino reservado do Rav — não como assinatura avulsa, mas como aprofundamento inevitável de quem já caminha na Toráh.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <Link href="/premium" className="btn-gold text-sm px-7 py-3">
              Entrar nos portões internos
            </Link>
            <Link
              href="/parashot"
              className="text-parchment-400 hover:text-parchment-100 text-sm font-inter transition-colors inline-flex items-center gap-1.5"
            >
              Começar pela Aliyáh aberta
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
