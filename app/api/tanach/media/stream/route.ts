import { NextResponse } from 'next/server'
import { getTanachBookByApiName } from '@/lib/tanach-books'
import { resolveTanachUpstreamAudioUrl } from '@/lib/tanach-chapter-media'

export const revalidate = 604_800

const UPSTREAM_HEADERS = {
  'User-Agent': 'BritMashiach-Tanach/1.0 (+https://mechon-mamre.org/p/pt/ptmp3prq.htm)',
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const book = searchParams.get('book')?.trim() ?? ''
  const chapter = Number.parseInt(searchParams.get('chapter')?.trim() ?? '', 10)

  const meta = getTanachBookByApiName(book)
  if (!meta || !Number.isFinite(chapter) || chapter < 1 || chapter > meta.chapters) {
    return NextResponse.json({ error: 'Livro ou capítulo inválido.' }, { status: 400 })
  }

  const upstream = resolveTanachUpstreamAudioUrl(book, chapter)
  if (!upstream) {
    return NextResponse.json({ error: 'Áudio não disponível.' }, { status: 404 })
  }

  const range = req.headers.get('range')
  try {
    const upstreamRes = await fetch(upstream, {
      headers: {
        ...UPSTREAM_HEADERS,
        ...(range ? { Range: range } : {}),
      },
      cache: 'force-cache',
      next: { revalidate: 604_800 },
    })

    if (!upstreamRes.ok || !upstreamRes.body) {
      return NextResponse.json({ error: 'Fonte de áudio indisponível.' }, { status: 502 })
    }

    const headers = new Headers()
    const pass = ['content-type', 'content-length', 'content-range', 'accept-ranges'] as const
    for (const key of pass) {
      const v = upstreamRes.headers.get(key)
      if (v) headers.set(key, v)
    }
    headers.set('Cache-Control', 'public, max-age=604800, immutable')
    headers.set('X-Tanach-Audio-Source', 'mechon-mamre')

    return new NextResponse(upstreamRes.body, {
      status: upstreamRes.status,
      headers,
    })
  } catch {
    return NextResponse.json({ error: 'Falha ao obter áudio.' }, { status: 502 })
  }
}
