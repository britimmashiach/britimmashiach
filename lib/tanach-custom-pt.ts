import { readFile } from 'fs/promises'
import path from 'path'
import { getTanachBook } from '@/lib/tanach-books'

const DATA_ROOT = path.join(process.cwd(), 'data', 'traducoes-pt')

export const CUSTOM_PT_ATTRIBUTION = {
  source: 'Brit Im Mashiach',
  translationVersion: 'Tradução Brit Im Mashiach (revisada)',
} as const

export type CustomPtChapterFile = {
  book: string
  chapter: number
  title?: string
  verses: string[]
}

function chapterFilePath(slug: string, chapter: number): string {
  const ch = String(chapter).padStart(3, '0')
  return path.join(DATA_ROOT, slug, `${ch}.json`)
}

/** Carrega tradução local revisada, se existir e estiver alinhada ao hebraico. */
export async function loadCustomPtChapter(
  bookSlug: string,
  chapter: number,
  hebrewVerseCount: number,
): Promise<{ verses: string[]; title: string } | null> {
  const meta = getTanachBook(bookSlug)
  if (!meta) return null

  const filePath = chapterFilePath(meta.slug, chapter)
  let raw: string
  try {
    raw = await readFile(filePath, 'utf8')
  } catch {
    return null
  }

  let parsed: CustomPtChapterFile
  try {
    parsed = JSON.parse(raw) as CustomPtChapterFile
  } catch {
    return null
  }

  if (!Array.isArray(parsed.verses) || parsed.verses.length !== hebrewVerseCount) {
    return null
  }

  const verses = parsed.verses.map((v) => String(v).trim())
  if (verses.some((v) => v.length === 0)) return null

  return {
    verses,
    title: parsed.title?.trim() || CUSTOM_PT_ATTRIBUTION.translationVersion,
  }
}
