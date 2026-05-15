import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTanachBook } from '@/lib/tanach-books'
import { TanachReader } from '@/components/tanach/TanachReader'

type Props = { params: Promise<{ book: string; chapter: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book, chapter } = await params
  const meta = getTanachBook(book)
  const ch = Number.parseInt(chapter, 10)
  if (!meta || !Number.isFinite(ch)) return { title: 'Tanach' }
  return {
    title: `${meta.titlePt} ${ch} — bilíngue`,
    description: `Leitura bilíngue de ${meta.titleHe} capítulo ${ch}.`,
  }
}

export default async function TanachChapterPage({ params }: Props) {
  const { book, chapter } = await params
  const meta = getTanachBook(book)
  const ch = Number.parseInt(chapter, 10)
  if (!meta || !Number.isFinite(ch) || ch < 1 || ch > meta.chapters) notFound()

  return (
    <div className="container mx-auto px-4 py-10">
      <TanachReader
        apiBook={meta.apiName}
        bookSlug={meta.slug}
        titlePt={meta.titlePt}
        titleHe={meta.titleHe}
        chapter={ch}
        section={meta.section}
      />
    </div>
  )
}
