import { stripSefariaHtml } from '@/lib/strip-sefaria-html'
import { TANACH_BOOKS, sefariaRef } from '@/lib/tanach-books'

const SEFARIA_TEXTS = 'https://www.sefaria.org/api/texts'
const PT_PRIMARY = 'Tanach Completo em Português [pt]'
const PT_FALLBACK = 'Sefaria Community Translation [pt]'

export const TANACH_CHAPTER_REVALIDATE = 604_800

export type TanachChapterPayload = {
  ref: string
  heRef: string
  he: string[]
  translation: string[]
  locale: 'pt' | 'en'
  versionTitle: string
  sefariaUrl: string
  attribution: { source: string; url: string; translationVersion: string }
}

type SefariaTextJson = {
  ref?: string
  heRef?: string
  he?: string[] | string
  text?: string[] | string
  versionTitle?: string
  actualLanguage?: string
}

function allowedRef(book: string, chapter: number): boolean {
  const b = TANACH_BOOKS.find((x) => x.apiName === book)
  return !!b && chapter >= 1 && chapter <= b.chapters
}

function toStringArray(v: string[] | string | undefined): string[] {
  if (Array.isArray(v)) return v
  if (typeof v === 'string' && v.length > 0) return [v]
  return []
}

function padOrTrimVerses(raw: string[], targetLen: number): string[] {
  const stripped = raw.map(stripSefariaHtml)
  if (stripped.length >= targetLen) return stripped.slice(0, targetLen)
  const out = [...stripped]
  while (out.length < targetLen) out.push('')
  return out
}

function isFullParallelTranslation(heLen: number, trRaw: string[]): boolean {
  if (heLen <= 0 || trRaw.length !== heLen) return false
  return trRaw.every((s) => stripSefariaHtml(s).trim().length > 0)
}

function inferLocaleFromVersion(versionTitle: string | undefined, actualLanguage: string | undefined): 'pt' | 'en' {
  const lang = (actualLanguage || '').toLowerCase()
  if (lang === 'pt') return 'pt'
  const t = (versionTitle || '').toLowerCase()
  if (t.includes('[pt]') || t.includes('português') || t.includes('portugues')) return 'pt'
  return 'en'
}

async function fetchSefaria(refDot: string, ven?: string) {
  const q = ven ? `?ven=${encodeURIComponent(ven)}` : ''
  const url = `${SEFARIA_TEXTS}/${encodeURIComponent(refDot)}${q}`
  return fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: TANACH_CHAPTER_REVALIDATE },
  })
}

/** Busca capítulo do Tanach no Sefaria (uso em Server Components e API). */
export async function fetchTanachChapter(
  book: string,
  chapter: number,
): Promise<TanachChapterPayload | null> {
  if (!allowedRef(book, chapter)) return null

  const refDot = sefariaRef(book, chapter)
  const baseRes = await fetchSefaria(refDot)
  if (!baseRes.ok) return null

  const base = (await baseRes.json()) as SefariaTextJson
  const hePlain = toStringArray(base.he).map(stripSefariaHtml)
  const n = hePlain.length
  if (n === 0) return null

  let translation = padOrTrimVerses(toStringArray(base.text), n)
  let versionTitle = base.versionTitle ?? ''
  let locale = inferLocaleFromVersion(base.versionTitle, base.actualLanguage)
  let venUsed = versionTitle || '(edição padrão Sefaria)'

  for (const ven of [PT_PRIMARY, PT_FALLBACK]) {
    const res = await fetchSefaria(refDot, ven)
    if (!res.ok) continue
    const data = (await res.json()) as SefariaTextJson
    const trRaw = toStringArray(data.text)
    if (!isFullParallelTranslation(n, trRaw)) continue
    translation = trRaw.map(stripSefariaHtml)
    versionTitle = data.versionTitle ?? ven
    locale = 'pt'
    venUsed = ven
    break
  }

  const ref = base.ref ?? refDot.replace('.', ' ')
  const heRef = base.heRef ?? ''
  const sefariaUrl = `https://www.sefaria.org/${encodeURIComponent(ref.replace(/ /g, '_'))}`

  return {
    ref,
    heRef,
    he: hePlain,
    translation,
    locale,
    versionTitle,
    sefariaUrl,
    attribution: {
      source: 'Sefaria',
      url: 'https://www.sefaria.org',
      translationVersion: venUsed,
    },
  }
}
