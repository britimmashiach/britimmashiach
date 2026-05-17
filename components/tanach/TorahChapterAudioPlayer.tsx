'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Headphones, Loader2, Pause, Play, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { notifyTorahAudioPlay, notifyTorahAudioStop } from '@/lib/ambient-audio-bus'
import type { TorahChapterMedia } from '@/lib/sefaria-media'

const SPEEDS = [0.75, 1, 1.25] as const
type Speed = (typeof SPEEDS)[number]

type Props = {
  apiBook: string
  chapter: number
  verseCount: number
  onActiveVerseChange?: (verse: number | null) => void
}

export function TorahChapterAudioPlayer({ apiBook, chapter, verseCount, onActiveVerseChange }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [open, setOpen] = useState(false)
  const [media, setMedia] = useState<TorahChapterMedia | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<Speed>(1)
  const [activeVerse, setActiveVerse] = useState<number | null>(null)
  const torahActiveRef = useRef(false)

  const updateActiveVerse = useCallback(
    (verse: number | null) => {
      setActiveVerse(verse)
      onActiveVerseChange?.(verse)
    },
    [onActiveVerseChange],
  )

  const stopTorahAmbient = useCallback(() => {
    if (!torahActiveRef.current) return
    torahActiveRef.current = false
    notifyTorahAudioStop()
  }, [])

  const endPlayback = useCallback(() => {
    const el = audioRef.current
    if (el) {
      el.pause()
      el.currentTime = 0
    }
    setPlaying(false)
    updateActiveVerse(null)
    stopTorahAmbient()
  }, [stopTorahAmbient, updateActiveVerse])

  const loadMedia = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/tanach/media?book=${encodeURIComponent(apiBook)}&chapter=${encodeURIComponent(String(chapter))}`,
      )
      const json = (await res.json()) as TorahChapterMedia & { error?: string }
      if (!res.ok) throw new Error(json.error || 'Áudio indisponível.')
      setMedia(json)
    } catch (e) {
      setMedia(null)
      setError(e instanceof Error ? e.message : 'Erro ao carregar áudio.')
    } finally {
      setLoading(false)
    }
  }, [apiBook, chapter])

  useEffect(() => {
    if (!open) return
    void loadMedia()
  }, [open, loadMedia])

  useEffect(() => {
    return () => {
      endPlayback()
    }
  }, [apiBook, chapter, endPlayback])

  const findVerseAtTime = useCallback(
    (t: number): number | null => {
      if (!media?.verses.length) return null
      for (const v of media.verses) {
        if (t >= v.startTime && t < v.endTime) return v.verse
      }
      const last = media.verses[media.verses.length - 1]
      if (last && t >= last.startTime) return last.verse
      return null
    },
    [media],
  )

  const onTimeUpdate = useCallback(() => {
    const el = audioRef.current
    if (!el || !media) return
    updateActiveVerse(findVerseAtTime(el.currentTime))
    const last = media.verses[media.verses.length - 1]
    if (last && el.currentTime >= last.endTime - 0.05) {
      endPlayback()
    }
  }, [media, findVerseAtTime, updateActiveVerse, endPlayback])

  const playFrom = useCallback(
    (startTime: number, endTime?: number) => {
      const el = audioRef.current
      if (!el || !media) return

      if (!torahActiveRef.current) {
        torahActiveRef.current = true
        notifyTorahAudioPlay()
      }

      el.playbackRate = speed
      el.currentTime = startTime

      const playPromise = el.play()
      if (playPromise) {
        void playPromise.catch(() => {
          setError('Não foi possível reproduzir. Toque novamente.')
          endPlayback()
        })
      }
      setPlaying(true)

      if (endTime != null) {
        const checkEnd = () => {
          if (!audioRef.current) return
          if (audioRef.current.currentTime >= endTime - 0.05) {
            audioRef.current.removeEventListener('timeupdate', checkEnd)
            if (media.verses[media.verses.length - 1]?.endTime === endTime) {
              endPlayback()
            } else {
              el.pause()
              setPlaying(false)
              updateActiveVerse(null)
              stopTorahAmbient()
            }
          }
        }
        el.addEventListener('timeupdate', checkEnd)
      }
    },
    [media, speed, endPlayback, updateActiveVerse, stopTorahAmbient],
  )

  const togglePlay = useCallback(() => {
    const el = audioRef.current
    if (!el || !media) return

    if (playing) {
      el.pause()
      setPlaying(false)
      stopTorahAmbient()
      return
    }

    const first = media.verses[0]
    const start = first?.startTime ?? 0
    playFrom(start)
  }, [media, playing, playFrom, stopTorahAmbient])

  const playVerse = useCallback(
    (verse: number) => {
      if (!media) return
      const seg = media.verses.find((v) => v.verse === verse)
      if (!seg) return
      playFrom(seg.startTime, seg.endTime)
    },
    [media, playFrom],
  )

  const closePanel = useCallback(() => {
    endPlayback()
    setOpen(false)
    setMedia(null)
    setError(null)
  }, [endPlayback])

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg border border-gold-500/35 bg-gold-500/10 px-3 py-2',
          'text-xs font-inter font-medium text-gold-800 dark:text-gold-300',
          'hover:bg-gold-500/15 transition-colors',
        )}
      >
        <Headphones className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        Ouvir leitura em áudio
      </button>
    )
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-gold-500/30 bg-card/80 backdrop-blur-sm p-4 space-y-3',
        'shadow-[inset_0_1px_0_rgba(201,168,76,0.08)]',
      )}
      role="region"
      aria-label="Leitor de áudio da Toráh"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-inter font-semibold uppercase tracking-wider text-gold-600/90 dark:text-gold-400/90">
            Áudio do capítulo
          </p>
          <p className="text-xs font-inter text-warmgray-600 dark:text-warmgray-300 mt-0.5">
            Toque em reproduzir quando quiser ouvir. A música de fundo pausa automaticamente.
          </p>
        </div>
        <button
          type="button"
          onClick={closePanel}
          className="rounded-lg p-1.5 text-warmgray-500 hover:text-foreground hover:bg-muted/60 transition-colors"
          aria-label="Fechar leitor de áudio"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {loading && (
        <p className="flex items-center gap-2 text-xs font-inter text-warmgray-500">
          <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
          A carregar áudio…
        </p>
      )}

      {error && (
        <p className="text-xs font-inter text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      {media && !loading && (
        <>
          <audio
            ref={audioRef}
            src={media.mediaUrl}
            preload="metadata"
            className="hidden"
            onTimeUpdate={onTimeUpdate}
            onPause={() => {
              if (audioRef.current?.ended) return
              setPlaying(false)
              stopTorahAmbient()
            }}
            onEnded={endPlayback}
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              disabled={!media.mediaUrl}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-inter font-medium',
                'bg-gold-500/20 text-gold-900 dark:text-gold-100 border border-gold-500/40',
                'hover:bg-gold-500/30 transition-colors disabled:opacity-50',
              )}
            >
              {playing ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  Reproduzir capítulo
                </>
              )}
            </button>

            <div className="flex items-center gap-1" role="group" aria-label="Velocidade">
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSpeed(s)
                    if (audioRef.current) audioRef.current.playbackRate = s
                  }}
                  className={cn(
                    'rounded-md px-2 py-1 text-[10px] font-inter font-medium border transition-colors',
                    speed === s
                      ? 'border-gold-500/45 bg-gold-500/15 text-gold-800 dark:text-gold-200'
                      : 'border-border/50 text-warmgray-600 dark:text-warmgray-400 hover:border-gold-500/25',
                  )}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>

          {media.verses.length > 0 && (
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto" role="list" aria-label="Versículos">
              {Array.from({ length: verseCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  role="listitem"
                  onClick={() => playVerse(n)}
                  disabled={!media.verses.some((v) => v.verse === n)}
                  className={cn(
                    'h-7 min-w-[1.75rem] rounded-md text-[10px] font-cinzel font-semibold border transition-colors',
                    activeVerse === n
                      ? 'border-gold-500/50 bg-gold-500/25 text-gold-900 dark:text-gold-100'
                      : 'border-border/40 text-warmgray-600 dark:text-warmgray-400 hover:border-gold-500/30 disabled:opacity-30',
                  )}
                  aria-label={`Ouvir versículo ${n}`}
                  aria-current={activeVerse === n ? 'true' : undefined}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          <p className="text-[10px] font-inter text-warmgray-500 dark:text-warmgray-400 leading-relaxed">
            Áudio:{' '}
            <a
              href="https://github.com/rneher/PocketTorah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-600 dark:text-gold-400 hover:underline"
            >
              PocketTorah
            </a>{' '}
            ({media.license}) via Sefaria.
          </p>
        </>
      )}
    </div>
  )
}
