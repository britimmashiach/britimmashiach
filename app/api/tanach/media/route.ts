import { NextResponse } from 'next/server'
import { fetchTorahChapterMedia } from '@/lib/sefaria-media'
import { getTanachBookByApiName } from '@/lib/tanach-books'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const book = searchParams.get('book')?.trim() ?? ''
  const chapterRaw = searchParams.get('chapter')?.trim() ?? ''
  const chapter = Number.parseInt(chapterRaw, 10)

  const meta = getTanachBookByApiName(book)
  if (!meta || meta.section !== 'torah' || !Number.isFinite(chapter) || chapter < 1 || chapter > meta.chapters) {
    return NextResponse.json({ error: 'Livro ou capítulo inválido.' }, { status: 400 })
  }

  try {
    const media = await fetchTorahChapterMedia(book, chapter)
    if (!media) {
      return NextResponse.json({ error: 'Áudio não disponível para este capítulo.' }, { status: 404 })
    }
    return NextResponse.json(media)
  } catch {
    return NextResponse.json({ error: 'Falha ao obter áudio.' }, { status: 502 })
  }
}
