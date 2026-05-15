'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Áudio ambiente (Ana BeKoach). Coloque `public/audio/ana-bekoach.mp3` com licença válida
 * (domínio público, CC0, ou direitos próprios). Se o ficheiro falhar, o botão continua visível
 * para tentar de novo ou para indicar o problema.
 */
const AUDIO_SRC = '/audio/ana-bekoach.mp3'
const DEFAULT_VOLUME = 0.22
const SESSION_PAUSED_KEY = 'brit-ambient-paused-session'

export function SiteAmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)
  /** Reprodução automática em silêncio (política do browser); primeiro toque desmuta. */
  const [mutedAutoplay, setMutedAutoplay] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const tryPlay = useCallback(async () => {
    const el = audioRef.current
    if (!el || loadFailed) return
    if (reduceMotion) return
    if (typeof window !== 'undefined' && window.sessionStorage.getItem(SESSION_PAUSED_KEY) === '1') {
      setPlaying(false)
      setNeedsTap(false)
      setMutedAutoplay(false)
      return
    }
    el.volume = DEFAULT_VOLUME
    try {
      el.muted = false
      await el.play()
      setPlaying(true)
      setNeedsTap(false)
      setMutedAutoplay(false)
    } catch {
      try {
        el.muted = true
        await el.play()
        setPlaying(true)
        setNeedsTap(false)
        setMutedAutoplay(true)
      } catch {
        setPlaying(false)
        setNeedsTap(true)
        setMutedAutoplay(false)
      }
    }
  }, [loadFailed, reduceMotion])

  useLayoutEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = audioRef.current
    if (!el) return
    void tryPlay()
  }, [mounted, tryPlay])

  const pause = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    el.pause()
    el.muted = false
    setPlaying(false)
    setMutedAutoplay(false)
    try {
      window.sessionStorage.setItem(SESSION_PAUSED_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  const resume = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    try {
      window.sessionStorage.removeItem(SESSION_PAUSED_KEY)
    } catch {
      /* ignore */
    }
    el.volume = DEFAULT_VOLUME
    el.muted = false
    void el
      .play()
      .then(() => {
        setPlaying(true)
        setNeedsTap(false)
        setMutedAutoplay(false)
      })
      .catch(() => {
        setPlaying(false)
        setNeedsTap(true)
        setMutedAutoplay(false)
      })
  }, [])

  const unmuteFromAutoplay = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    el.muted = false
    setMutedAutoplay(false)
    if (el.paused) {
      void el.play().catch(() => {
        setNeedsTap(true)
        setPlaying(false)
      })
    }
  }, [])

  const onMainClick = useCallback(() => {
    if (mutedAutoplay) {
      unmuteFromAutoplay()
      return
    }
    if (needsTap) void resume()
    else if (playing) pause()
    else void resume()
  }, [mutedAutoplay, needsTap, playing, pause, resume, unmuteFromAutoplay])

  const retryLoad = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    setLoadFailed(false)
    el.load()

    const run = async () => {
      if (typeof window !== 'undefined' && window.sessionStorage.getItem(SESSION_PAUSED_KEY) === '1') {
        setPlaying(false)
        setNeedsTap(false)
        setMutedAutoplay(false)
        return
      }
      el.volume = DEFAULT_VOLUME
      try {
        el.muted = false
        await el.play()
        setPlaying(true)
        setNeedsTap(false)
        setMutedAutoplay(false)
      } catch {
        try {
          el.muted = true
          await el.play()
          setPlaying(true)
          setNeedsTap(false)
          setMutedAutoplay(true)
        } catch {
          setPlaying(false)
          setNeedsTap(true)
          setMutedAutoplay(false)
        }
      }
    }

    const onCanPlay = () => {
      el.removeEventListener('canplay', onCanPlay)
      void run()
    }
    el.addEventListener('canplay', onCanPlay)

    queueMicrotask(() => {
      if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        el.removeEventListener('canplay', onCanPlay)
        void run()
      }
    })
  }, [])

  if (!mounted) return null

  const position =
    'fixed z-[99999] pointer-events-auto max-md:max-w-[calc(100vw-1.5rem)] bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]'

  const errorButton = (
    <button
      type="button"
      onClick={retryLoad}
      className={cn(
        position,
        'inline-flex items-center gap-2 rounded-full border shadow-lg backdrop-blur-sm',
        'border-destructive/40 bg-destructive/95 px-3 py-2 text-xs font-inter font-medium text-destructive-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/40',
      )}
      aria-label="Áudio em falta — toque para tentar carregar de novo"
      title="Confirme o ficheiro public/audio/ana-bekoach.mp3 e recarregue a página se necessário"
    >
      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
      Áudio em falta — tocar para tentar
    </button>
  )

  const mainButton = (
    <button
      type="button"
      onClick={onMainClick}
      className={cn(
        position,
        'inline-flex items-center gap-2 rounded-full border shadow-lg backdrop-blur-sm',
        needsTap || mutedAutoplay
          ? 'border-gold-500/45 bg-petroleum-950/92 px-3 py-2.5 text-parchment-50'
          : 'border-border/60 bg-background/95 px-3 py-2 text-foreground hover:border-gold-500/35 hover:bg-muted/80',
        'text-xs font-inter font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/45',
      )}
      aria-pressed={playing && !mutedAutoplay}
      aria-label={
        mutedAutoplay
          ? 'Ligar som da música de fundo — Ana BeKoach'
          : needsTap
            ? 'Ativar música de fundo — Ana BeKoach'
            : playing
              ? 'Pausar música de fundo'
              : 'Retomar música de fundo'
      }
      title={
        mutedAutoplay
          ? 'A reprodução já começou em silêncio (regra do navegador). Toque para ouvir.'
          : 'Ana BeKoach — volume baixo'
      }
    >
      {needsTap ? (
        <Volume2 className="w-4 h-4 shrink-0 text-gold-400" aria-hidden="true" />
      ) : mutedAutoplay ? (
        <VolumeX className="w-4 h-4 shrink-0 text-gold-400" aria-hidden="true" />
      ) : playing ? (
        <Pause className="w-4 h-4 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden="true" />
      ) : (
        <Play className="w-4 h-4 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden="true" />
      )}
      {needsTap
        ? 'Ativar som de fundo'
        : mutedAutoplay
          ? 'Ligar som de fundo'
          : playing
            ? 'Pausar fundo'
            : 'Tocar fundo'}
    </button>
  )

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        playsInline
        className="hidden"
        onError={() => setLoadFailed(true)}
        onLoadedData={() => setLoadFailed(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-hidden="true"
      />
      {createPortal(loadFailed ? errorButton : mainButton, document.body)}
    </>
  )
}
