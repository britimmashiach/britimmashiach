import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTanachBook } from '@/lib/tanach-books'
import { fetchTanachChapter, TANACH_CHAPTER_REVALIDATE } from '@/lib/sefaria-tanach'
import { breadcrumbJsonLd, tanachChapterWebPageJsonLd } from '@/lib/json-ld'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { TanachReader } from '@/components/tanach/TanachReader'
import { JsonLd } from '@/components/seo/JsonLd'

type Props = { params: Promise<{ book: string; chapter: string }> }

export const revalidate = TANACH_CHAPTER_REVALIDATE

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book, chapter } = await params
  const meta = getTanachBook(book)
  const ch = Number.parseInt(chapter, 10)
  if (!meta || !Number.isFinite(ch)) return { title: 'Tanach' }

  const origin = getPublicSiteOrigin()
  const url = `${origin}/tanach/${meta.slug}/${ch}`
  const title = `${meta.titlePt} ${ch} — Tanach bilíngue`
  const description = `Leitura bilíngue de ${meta.titleHe} capítulo ${ch}: hebraico massorético e tradução alinhada (Sefaria).`

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
    },
  }
}

export default async function TanachChapterPage({ params }: Props) {
  const { book, chapter } = await params
  const meta = getTanachBook(book)
  const ch = Number.parseInt(chapter, 10)
  if (!meta || !Number.isFinite(ch) || ch < 1 || ch > meta.chapters) notFound()

  const initialData = await fetchTanachChapter(meta.apiName, ch)
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Tanach', path: '/tanach' },
    { name: meta.titlePt, path: `/tanach/${meta.slug}` },
    { name: `Capítulo ${ch}`, path: `/tanach/${meta.slug}/${ch}` },
  ]

  return (
    <div className="container mx-auto px-4 py-10">
      <JsonLd
        data={[
          ...(initialData
            ? [
                tanachChapterWebPageJsonLd({
                  bookSlug: meta.slug,
                  titlePt: meta.titlePt,
                  titleHe: meta.titleHe,
                  chapter: ch,
                  ref: initialData.ref,
                  verseCount: initialData.he.length,
                }),
              ]
            : []),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <TanachReader
        apiBook={meta.apiName}
        bookSlug={meta.slug}
        titlePt={meta.titlePt}
        titleHe={meta.titleHe}
        chapter={ch}
        section={meta.section}
        initialData={initialData}
      />
    </div>
  )
}
