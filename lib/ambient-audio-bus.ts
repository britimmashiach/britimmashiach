/** Eventos para coordenar Ana BeKoach com áudio da Toráh no Tanach. */

export const TORAH_AUDIO_PLAY_EVENT = 'brit:torah-audio-play'
export const TORAH_AUDIO_STOP_EVENT = 'brit:torah-audio-stop'

export function notifyTorahAudioPlay(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(TORAH_AUDIO_PLAY_EVENT))
}

export function notifyTorahAudioStop(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(TORAH_AUDIO_STOP_EVENT))
}
