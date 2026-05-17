import { sefariaRef } from '@/lib/tanach-books'

const SEFARIA_RELATED = 'https://www.sefaria.org/api/related'

export type TorahVerseMedia = {
  verse: number
  anchorRef: string
  startTime: number
  endTime: number
}

export type TorahChapterMedia = {
  ref: string
  mediaUrl: string
  license: string
  verses: TorahVerseMedia[]
}

type SefariaMediaItem = {
  media_url?: string
  license?: string
  start_time?: number
  end_time?: number
  anchorRef?: string
}

type SefariaRelatedJson = {
  media?: SefariaMediaItem[]
}

function parseVerseFromAnchor(anchorRef: string): number | null {
  const m = anchorRef.match(/:(\d+)\s*$/)
  if (!m) return null
  const n = Number.parseInt(m[1], 10)
  return Number.isFinite(n) && n > 0 ? n : null
}

function pickChapterMedia(items: SefariaMediaItem[]): SefariaMediaItem | null {
  const withUrl = items.filter((m) => typeof m.media_url === 'string' && m.media_url.length > 0)
  if (withUrl.length === 0) return null
  const pocket = withUrl.find((m) => m.media_url!.includes('PocketTorah'))
  return pocket ?? withUrl[0]
}

export async function fetchTorahChapterMedia(
  bookApi: string,
  chapter: number,
): Promise<TorahChapterMedia | null> {
  const ref = sefariaRef(bookApi, chapter)
  const res = await fetch(`${SEFARIA_RELATED}/${encodeURIComponent(ref)}`, {
    next: { revalidate: 604_800 },
  })
  if (!res.ok) return null

  const json = (await res.json()) as SefariaRelatedJson
  const items = json.media ?? []
  const chapterMedia = pickChapterMedia(items)
  if (!chapterMedia?.media_url) return null

  const verses: TorahVerseMedia[] = []
  for (const item of items) {
    if (!item.anchorRef || item.start_time == null || item.end_time == null) continue
    const verse = parseVerseFromAnchor(item.anchorRef)
    if (verse == null) continue
    verses.push({
      verse,
      anchorRef: item.anchorRef,
      startTime: item.start_time,
      endTime: item.end_time,
    })
  }

  verses.sort((a, b) => a.verse - b.verse)

  return {
    ref,
    mediaUrl: chapterMedia.media_url,
    license: chapterMedia.license ?? 'CC-BY-SA',
    verses,
  }
}
