import type { TanachSection } from '@/lib/tanach-books'

export type TanachAudioPlaybackMode = 'verse-sync' | 'chapter'

export type TanachAudioFeature = {
  playbackMode: TanachAudioPlaybackMode
  labelShort: string
  labelLong: string
}

/** Metadados de áudio por secção do Tanach (UI e SEO). */
export function getTanachAudioFeature(section: TanachSection): TanachAudioFeature {
  if (section === 'torah') {
    return {
      playbackMode: 'verse-sync',
      labelShort: 'Áudio com versículos',
      labelLong:
        'Toráh: leitura sincronizada versículo a versículo (PocketTorah via Sefaria), com leitura de capítulo quando a sincronização não estiver disponível.',
    }
  }
  return {
    playbackMode: 'chapter',
    labelShort: 'Áudio do capítulo',
    labelLong: 'Neviim e Ketuvim: leitura clara do capítulo inteiro em hebraico (Mechon Mamre).',
  }
}

export function tanachAudioSummaryForSeo(section: TanachSection): string {
  if (section === 'torah') return 'áudio em hebraico com sincronização por versículo'
  return 'áudio em hebraico por capítulo'
}
