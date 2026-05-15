import { NextResponse, type NextRequest } from 'next/server'
import { fetchTanachChapter, TANACH_CHAPTER_REVALIDATE } from '@/lib/sefaria-tanach'

const CACHE_CONTROL = `public, s-maxage=${TANACH_CHAPTER_REVALIDATE}, stale-while-revalidate=${TANACH_CHAPTER_REVALIDATE * 2}`

export async function GET(req: NextRequest) {
  const book = req.nextUrl.searchParams.get('book')
  const chRaw = req.nextUrl.searchParams.get('chapter')
  if (!book || !chRaw) {
    return NextResponse.json({ error: 'Parâmetros book e chapter são obrigatórios.' }, { status: 400 })
  }
  const chapter = Number.parseInt(chRaw, 10)
  if (!Number.isFinite(chapter)) {
    return NextResponse.json({ error: 'Capítulo inválido.' }, { status: 400 })
  }

  const body = await fetchTanachChapter(book, chapter)
  if (!body) {
    return NextResponse.json({ error: 'Livro, capítulo ou texto indisponível no Sefaria.' }, { status: 502 })
  }

  return NextResponse.json(body, {
    headers: { 'Cache-Control': CACHE_CONTROL },
  })
}
