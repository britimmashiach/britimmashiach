import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Calendar, Library, Star, Flame, Crown, ChevronRight } from 'lucide-react'
import { HebrewDateDisplay } from '@/components/spiritual/HebrewDateDisplay'
import { OmerCounter } from '@/components/spiritual/OmerCounter'
import { ParashaWidget } from '@/components/spiritual/ParashaWidget'
import { HebrewDateSkeleton } from '@/components/ui/Skeleton'
import { getHebrewDateInfo } from '@/lib/hebrew-date'
import { cn } from '@/lib/utils'

// Aproximação gregoriana do próximo Chag (sem @hebcal/core no server component)
function getNextChagName(): { name: string; slug: string; hebrew: string } | null {
  const month = new Date().getMonth() + 1
  const upcoming: Record<number, { name: string; slug: string; hebrew: string }> = {
    1:  { name: 'Purim',        slug: 'purim',         hebrew: 'פּוּרִים' },
    2:  { name: 'Purim',        slug: 'purim',         hebrew: 'פּוּרִים' },
    3:  { name: 'Pesach',       slug: 'pesach',        hebrew: 'פֶּסַח' },
    4:  { name: 'Shavuot',      slug: 'shavuot',       hebrew: 'שָׁבוּעוֹת' },
    5:  { name: 'Shavuot',      slug: 'shavuot',       hebrew: 'שָׁבוּעוֹת' },
    6:  { name: 'Shavuot',      slug: 'shavuot',       hebrew: 'שָׁבוּעוֹת' },
    7:  { name: 'Rosh Hashaná', slug: 'rosh-hashanah', hebrew: 'רֹאשׁ הַשָּׁנָה' },
    8:  { name: 'Rosh Hashaná', slug: 'rosh-hashanah', hebrew: 'רֹאשׁ הַשָּׁנָה' },
    9:  { name: 'Yom Kippur',   slug: 'yom-kippur',    hebrew: 'יוֹם כִּפּוּר' },
    10: { name: 'Chanukah',     slug: 'chanukah',      hebrew: 'חֲנוּכָּה' },
    11: { name: 'Chanukah',     slug: 'chanukah',      hebrew: 'חֲנוּכָּה' },
    12: { name: 'Chanukah',     slug: 'chanukah',      hebrew: 'חֲנוּכָּה' },
  }
  return upcoming[month] ?? null
}

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
    href: '/premium',
    icon: Star,
    title: 'Premium',
    description: 'Kabaláh Luriana, Modelo Netivot, 49 Portões da Alma e todos os cursos.',
  },
]

export default function HomePage() {
  const hebrewInfo = getHebrewDateInfo(new Date())
  const nextChag = getNextChagName()

  return (
    <div className="min-h-screen">

      {/* Hero — portal de entrada no ciclo espiritual */}
      <section className="relative overflow-hidden border-b border-border/30 bg-parchment-50 dark:bg-petroleum-950">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 85% 0%, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative container mx-auto px-4 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Esquerda: contexto espiritual do momento */}
            <div className="space-y-7">
              <Suspense fallback={<HebrewDateSkeleton />}>
                <HebrewDateDisplay />
              </Suspense>

              <div className="space-y-3">
                <h1 className="font-cormorant text-5xl md:text-6xl font-light text-petroleum-800 dark:text-parchment-100 leading-tight text-balance">
                  Que a luz de Toráh{' '}
                  <em className="font-semibold text-gold-600 dark:text-gold-400 not-italic">
                    ilumine
                  </em>{' '}
                  seu caminho
                </h1>
                <p className="font-inter text-sm text-warmgray-500 dark:text-warmgray-400 leading-relaxed max-w-sm">
                  Estudos aprofundados, Kabaláh Luriana e o calendário hebraico vivo.
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
              <div className="flex items-center gap-6 pt-1">
                <Link
                  href="/studies"
                  className="text-sm font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors inline-flex items-center gap-1.5"
                >
                  Estudos
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/premium"
                  className="text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5 text-gold-500/70" aria-hidden="true" />
                  Premium
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
                Siga o ciclo anual da Toráh. Cada dia da semana corresponde a uma Aliyáh,
                do Domingo ao Shabat. A primeira Aliyáh está disponível a todos.
              </p>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 flex-shrink-0">
              <Link href="/parashot" className="btn-gold text-sm whitespace-nowrap">
                Estudar esta semana
              </Link>
              <Link
                href="/premium"
                className="text-xs font-inter text-warmgray-500 hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                <Crown className="w-3 h-3 text-gold-500/70" aria-hidden="true" />
                Acesso completo com Premium
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

      <hr className="divider-gold container mx-auto px-4" />

      {/* Ecossistema */}
      <section className="container mx-auto px-4 py-14 md:py-16" aria-labelledby="ecossistema-titulo">
        <div className="text-center mb-10">
          <h2 id="ecossistema-titulo" className="section-title">Ecossistema Espiritual</h2>
          <p className="section-subtitle mt-1">Tudo que você precisa para aprofundar sua caminhada</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Convite Premium */}
      <section className="relative overflow-hidden bg-petroleum-800 dark:bg-petroleum-950" aria-label="Plano Premium">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08), transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative container mx-auto px-4 py-16 text-center space-y-5">
          <h2 className="font-cinzel text-3xl md:text-4xl font-semibold text-parchment-100 max-w-2xl mx-auto leading-tight text-balance">
            Acesso completo ao ecossistema Brit Mashiach
          </h2>

          <p className="font-cormorant text-xl text-parchment-300/80 italic max-w-xl mx-auto">
            Kabaláh Luriana, Modelo Netivot, 49 Portões da Alma, Siddur completo e todos os cursos do Rav EBBY.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <Link href="/premium" className="btn-gold text-sm px-7 py-3">
              Assinar por R$ 47/mês
            </Link>
            <Link
              href="/studies"
              className="text-parchment-400 hover:text-parchment-100 text-sm font-inter transition-colors inline-flex items-center gap-1.5"
            >
              Ver conteúdo gratuito
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
