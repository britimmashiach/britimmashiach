import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTanachBook } from '@/lib/tanach-books'
import { cn } from '@/lib/utils'

type Props = {
  params: Promise<{ book: string }>
  searchParams: Promise<{ view?: string }>
}

function viewQuery(view: string | undefined): string {
  if (view === 'he' || view === 'pt') return `?view=${view}`
  return ''
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book } = await params
  const meta = getTanachBook(book)
  if (!meta) return { title: 'Tanach' }
  return {
    title: `${meta.titlePt} — capítulos`,
    description: `Escolha um capítulo de ${meta.titlePt} (${meta.titleHe}) para leitura bilíngue.`,
  }
}

export default async function TanachBookPage({ params, searchParams }: Props) {
  const { book } = await params
  const { view } = await searchParams
  const meta = getTanachBook(book)
  if (!meta) notFound()

  const chapters = Array.from({ length: meta.chapters }, (_, i) => i + 1)
  const vq = viewQuery(view)

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <nav className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 mb-6">
        <Link href="/tanach" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
          ← Tanach
        </Link>
      </nav>

      <header className="mb-8 space-y-2">
        <h1 className="section-title">{meta.titlePt}</h1>
        <p className="font-hebrew text-2xl text-warmgray-500 dark:text-warmgray-400" dir="rtl" lang="he">
          {meta.titleHe}
        </p>
        <p className="section-subtitle">Selecione o capítulo.</p>
      </header>

      <ol className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 list-none m-0 p-0">
        {chapters.map((n) => (
          <li key={n}>
            <Link
              href={`/tanach/${meta.slug}/${n}${vq}`}
              className={cn(
                'flex h-11 items-center justify-center rounded-lg border border-border/60 text-sm font-inter font-medium',
                'text-petroleum-800 dark:text-parchment-100 bg-card/90',
                'hover:border-gold-500/40 hover:bg-gold-500/8 hover:text-gold-800 dark:hover:text-gold-200 transition-colors',
              )}
            >
              {n}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
