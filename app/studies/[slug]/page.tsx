import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Crown, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fetchStudyBySlugAdmin, fetchStudySlugs } from '@/lib/studies-supabase'
import { breadcrumbJsonLd, studyArticleJsonLd } from '@/lib/json-ld'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { JsonLd } from '@/components/seo/JsonLd'
import { userHasPremiumAccess } from '@/lib/premium-access'
import { PremiumGate } from '@/components/ui/PremiumGate'

export const revalidate = 3600

export async function generateStaticParams() {
  return fetchStudySlugs()
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = await fetchStudyBySlugAdmin(slug)
  if (!study) return { title: 'Estudo não encontrado' }

  const origin = getPublicSiteOrigin()
  const url = `${origin}/studies/${slug}`
  const title = study.title
  const description = study.excerpt

  if (study.isPremium) {
    const allowed = await userHasPremiumAccess()
    if (!allowed) {
      return {
        title: `${title} · Premium`,
        description: 'Estudo completo disponível para assinantes Premium.',
        robots: { index: false, follow: true },
        alternates: { canonical: url },
      }
    }
  }

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url,
      title,
      description,
      publishedTime: study.publishedAt,
    },
  }
}

const categoryColors: Record<string, string> = {
  kabalah: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  parasha: 'bg-green-500/10 text-green-700 dark:text-green-400',
  tehilim: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  netivot: 'bg-gold-500/10 text-gold-700 dark:text-gold-400',
  shiur: 'bg-warmgray-500/10 text-warmgray-600 dark:text-warmgray-400',
  moedim: 'bg-red-500/10 text-red-700 dark:text-red-400',
  'alef-beit': 'bg-warmgray-500/10 text-warmgray-600 dark:text-warmgray-400',
}

export default async function StudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = await fetchStudyBySlugAdmin(slug)

  if (!study) notFound()

  if (study.isPremium && !(await userHasPremiumAccess())) {
    return (
      <PremiumGate
        title={study.title}
        description="O conteúdo completo deste estudo é exclusivo para assinantes Premium. Ative o plano para liberar o material e o restante do acervo do Rav EBBY."
        backHref="/studies"
        backLabel="Voltar aos estudos"
      />
    )
  }

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Estudos', path: '/studies' },
    { name: study.title, path: `/studies/${slug}` },
  ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <JsonLd
        data={[
          studyArticleJsonLd({
            slug: study.slug,
            title: study.title,
            excerpt: study.excerpt,
            publishedAt: study.publishedAt,
            category: study.category,
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <Link href="/studies" className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Voltar aos estudos
      </Link>

      {/* Cabeçalho */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn(
            'text-xs font-inter font-medium px-2.5 py-0.5 rounded-full capitalize',
            categoryColors[study.category] ?? categoryColors.shiur,
          )}>
            {study.category}
          </span>
          {study.isPremium && (
            <span className="premium-badge">
              <Crown className="w-3 h-3" />
              Premium
            </span>
          )}
          <span className="flex items-center gap-1 text-xs font-inter text-warmgray-400">
            <Clock className="w-3 h-3" />
            {study.readingTime} min de leitura
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-cinzel text-3xl md:text-4xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight">
            {study.title}
          </h1>
          <p className="font-hebrew text-xl text-warmgray-500 dark:text-warmgray-400" dir="rtl">
            {study.titleHebrew}
          </p>
        </div>

        <p className="font-cormorant text-xl italic text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          {study.excerpt}
        </p>

        <div className="flex items-center gap-1.5 text-xs font-inter text-warmgray-400">
          <span>Rav Eliahu Barzilay ben Yehoshua</span>
          <span>·</span>
          <span>{new Date(study.publishedAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <hr className="divider-gold" />

      {/* Conteúdo */}
      <div className="prose prose-sm md:prose-base max-w-none mt-8
        prose-headings:font-cinzel prose-headings:text-petroleum-800 dark:prose-headings:text-parchment-100
        prose-p:font-inter prose-p:text-foreground prose-p:leading-relaxed
        prose-strong:text-petroleum-800 dark:prose-strong:text-parchment-100
        prose-hr:border-border/40
        dark:prose-invert">
        {study.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            const text = line.replace('## ', '')
            const isHebrew = text.includes('פ') || text.includes('ר') || text.includes('ד') || text.includes('ס')
            return (
              <h2 key={i} className={cn(
                'font-cinzel text-xl font-semibold mt-10 mb-4',
                isHebrew ? 'text-gold-600 dark:text-gold-400' : 'text-petroleum-800 dark:text-parchment-100',
              )}>
                {text}
              </h2>
            )
          }
          if (line.startsWith('---')) {
            return <hr key={i} className="divider-gold" />
          }
          if (line.trim() === '') return <br key={i} />
          return (
            <p key={i} className="font-inter text-base text-foreground leading-relaxed mb-4">
              {line}
            </p>
          )
        })}
      </div>

      {/* Tags */}
      <div className="mt-10 pt-6 border-t border-border/40 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 text-xs font-inter text-warmgray-500 bg-muted px-2.5 py-1 rounded-full">
            <Tag className="w-2.5 h-2.5" />
            {tag}
          </span>
        ))}
      </div>

      {/* Assinatura do Rav */}
      <div className="mt-8 glass-card p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-petroleum-gradient flex items-center justify-center flex-shrink-0">
          <span className="font-hebrew text-sm text-gold-400">ר</span>
        </div>
        <div>
          <p className="text-sm font-inter font-medium text-foreground">Rav Eliahu Barzilay ben Yehoshua</p>
          <p className="text-xs font-inter text-warmgray-500">Congregação Brit Im Mashiach, Franca, São Paulo</p>
        </div>
      </div>
    </div>
  )
}
