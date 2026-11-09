import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getImersaoBySlug } from '@/lib/imersoes-content'
import { publicJourneyLesson } from '@/lib/escola-study-content'
import { RichMarkdown } from '@/components/ui/RichMarkdown'

type Props = { params: Promise<{ slug: string; n: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, n } = await params
  const imersao = getImersaoBySlug(slug)
  const step = imersao?.steps[Number(n) - 1]
  if (!imersao || !step) return { title: 'Etapa' }
  return { title: `${step.title} · ${imersao.name}`, robots: { index: true, follow: true } }
}

export default async function ImersaoEtapaPage({ params }: Props) {
  const { slug, n } = await params
  const imersao = getImersaoBySlug(slug)
  const index = Number(n)
  const step = imersao?.steps[index - 1]
  const lesson = imersao ? publicJourneyLesson(slug, index) : null
  if (!imersao || !step || !lesson) notFound()

  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <Link href={`/imersoes/${slug}`} className="text-sm text-gold-700 dark:text-gold-400">
        ← Voltar à jornada
      </Link>
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-gold-700 dark:text-gold-400">
          {imersao.name} · etapa {index}
        </p>
        <h1 className="font-cinzel text-3xl text-petroleum-800 dark:text-parchment-100">{step.title}</h1>
        <p className="text-sm text-warmgray-600 dark:text-warmgray-400">{step.text}</p>
      </header>
      <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
        <RichMarkdown text={lesson} />
      </div>
      <p className="text-sm text-warmgray-500 border-t border-border pt-4">
        Líderes em formação respondem o questionário desta etapa em{' '}
        <Link href="/lideres/escola" className="text-gold-700 dark:text-gold-400 underline">
          Cursos da Escola
        </Link>
        , depois da leitura.
      </p>
    </article>
  )
}
