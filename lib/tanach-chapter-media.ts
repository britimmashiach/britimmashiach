import { sefariaRef } from '@/lib/tanach-books'
import { buildMechonChapterFileId, mechonChapterMediaUrl } from '@/lib/mechon-mamre-media'
import { fetchTorahChapterMedia } from '@/lib/sefaria-media'

export type TanachVerseMedia = {
  verse: number
  anchorRef?: string
  startTime: number
  endTime: number
}

export type TanachMediaProvider = 'sefaria' | 'mechon'
export type TanachMediaMode = 'chapter-sync' | 'chapter'

export type TanachChapterMedia = {
  ref: string
  provider: TanachMediaProvider
  mode: TanachMediaMode
  /** URL absoluta (Sefaria/PocketTorah) ou rota interna de streaming (Mechon). */
  mediaUrl: string
  license: string
  verses: TanachVerseMedia[]
  /** Mensagem contextual para o utilizador (ex.: fallback na Toráh). */
  playbackNote?: string
  attribution: {
    label: string
    href: string
  }
}

/** @deprecated Use TanachChapterMedia */
export type TorahChapterMedia = TanachChapterMedia

function proxyStreamPath(bookApi: string, chapter: number): string {
  return `/api/tanach/media/stream?book=${encodeURIComponent(bookApi)}&chapter=${encodeURIComponent(String(chapter))}`
}

export async function fetchTanachChapterMedia(
  bookApi: string,
  chapter: number,
  section: 'torah' | 'neviim' | 'ketuvim',
): Promise<TanachChapterMedia | null> {
  const ref = sefariaRef(bookApi, chapter)

  if (section === 'torah') {
    const sefaria = await fetchTorahChapterMedia(bookApi, chapter)
    if (sefaria) {
      return {
        ref: sefaria.ref,
        provider: 'sefaria',
        mode: 'chapter-sync',
        mediaUrl: sefaria.mediaUrl,
        license: sefaria.license,
        verses: sefaria.verses,
        attribution: {
          label: 'PocketTorah',
          href: 'https://github.com/rneher/PocketTorah',
        },
      }
    }
  }

  const fileId = buildMechonChapterFileId(bookApi, chapter)
  if (!fileId) return null

  return {
    ref,
    provider: 'mechon',
    mode: 'chapter',
    mediaUrl: proxyStreamPath(bookApi, chapter),
    license: 'Talking Bibles International (1992), via Mechon Mamre',
    verses: [],
    playbackNote:
      section === 'torah'
        ? 'Neste capítulo a sincronização por versículo não está disponível; a leitura é do capítulo completo.'
        : undefined,
    attribution: {
      label: 'Mechon Mamre',
      href: 'https://mechon-mamre.org/p/pt/ptmp3prq.htm',
    },
  }
}

/** URL upstream (para o proxy server-side). */
export function resolveTanachUpstreamAudioUrl(bookApi: string, chapter: number): string | null {
  return mechonChapterMediaUrl(bookApi, chapter)
}
