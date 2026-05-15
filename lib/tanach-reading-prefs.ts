import { getTanachBook } from '@/lib/tanach-books'

const KEY_VIEW = 'brit-tanach-view'
const KEY_LAST = 'brit-tanach-last'

export type TanachViewPref = 'both' | 'he' | 'pt'

export type TanachLastRead = {
  bookSlug: string
  chapter: number
  updatedAt: number
}

export type TanachResumeScope = 'torah' | 'psalms' | 'any'

function safeParseView(raw: string | null): TanachViewPref {
  if (raw === 'he' || raw === 'pt' || raw === 'both') return raw
  return 'both'
}

export function loadTanachViewPref(): TanachViewPref {
  try {
    const v = localStorage.getItem(KEY_VIEW)
    return safeParseView(v)
  } catch {
    return 'both'
  }
}

export function saveTanachViewPref(view: TanachViewPref): void {
  try {
    localStorage.setItem(KEY_VIEW, view)
  } catch {
    /* ignore */
  }
}

export function loadTanachLastRead(): TanachLastRead | null {
  try {
    const raw = localStorage.getItem(KEY_LAST)
    if (!raw) return null
    const j = JSON.parse(raw) as Partial<TanachLastRead>
    if (!j.bookSlug || typeof j.chapter !== 'number') return null
    return {
      bookSlug: j.bookSlug,
      chapter: j.chapter,
      updatedAt: typeof j.updatedAt === 'number' ? j.updatedAt : Date.now(),
    }
  } catch {
    return null
  }
}

export function saveTanachLastRead(bookSlug: string, chapter: number): void {
  try {
    const payload: TanachLastRead = {
      bookSlug,
      chapter,
      updatedAt: Date.now(),
    }
    localStorage.setItem(KEY_LAST, JSON.stringify(payload))
  } catch {
    /* ignore */
  }
}

function viewQuery(view: TanachViewPref): string {
  return view === 'both' ? '' : `?view=${view}`
}

function slugAllowedForResume(scope: TanachResumeScope, slug: string): boolean {
  if (scope === 'any') return true
  if (scope === 'psalms') return slug === 'psalms'
  if (scope === 'torah') return getTanachBook(slug)?.section === 'torah'
  return false
}

/** Href para retomar a última leitura no dispositivo, se couber no `scope`; caso contrário `fallbackHref`. */
export function resolveTanachResumeHref(fallbackHref: string, scope: TanachResumeScope): string {
  const last = loadTanachLastRead()
  if (!last) return fallbackHref
  if (!slugAllowedForResume(scope, last.bookSlug)) return fallbackHref
  const meta = getTanachBook(last.bookSlug)
  if (!meta || last.chapter < 1 || last.chapter > meta.chapters) return fallbackHref
  const view = loadTanachViewPref()
  return `/tanach/${last.bookSlug}/${last.chapter}${viewQuery(view)}`
}
