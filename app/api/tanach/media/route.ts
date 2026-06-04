import { NextResponse } from 'next/server'
import { getTanachBookByApiName } from '@/lib/tanach-books'
import { fetchTanachChapterMedia } from '@/lib/tanach-chapter-media'

export const revalidate = 604_800

const JSON_CACHE = 'public, s-maxage=604800, stale-while-revalidate=86400'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const book = searchParams.get('book')?.trim() ?? ''
  const chapterRaw = searchParams.get('chapter')?.trim() ?? ''
  const chapter = Number.parseInt(chapterRaw, 10)

  const meta = getTanachBookByApiName(book)
  if (!meta || !Number.isFinite(chapter) || chapter < 1 || chapter > meta.chapters) {
    return NextResponse.json({ error: 'Livro ou capítulo inválido.' }, { status: 400 })
  }

  try {
    const media = await fetchTanachChapterMedia(book, chapter, meta.section)
    if (!media) {
      return NextResponse.json({ error: 'Áudio não disponível para este capítulo.' }, { status: 404 })
    }
    return NextResponse.json(media, { headers: { 'Cache-Control': JSON_CACHE } })
  } catch {
    return NextResponse.json({ error: 'Falha ao obter áudio.' }, { status: 502 })
  }
}
