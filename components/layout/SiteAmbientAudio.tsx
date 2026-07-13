'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TORAH_AUDIO_PLAY_EVENT, TORAH_AUDIO_STOP_EVENT } from '@/lib/ambient-audio-bus'

/**
 * Áudio ambiente (Ana BeKoach). Coloque `public/audio/ana-bekoach.mp3` com licença válida.
 * Autoplay: browsers permitem começar em silêncio; o som audível exige um toque (política do browser).
 */
const AUDIO_SRC = '/audio/ana-bekoach.mp3'
const DEFAULT_VOLUME = 0.22
const SESSION_PAUSED_KEY = 'brit-ambient-paused-session'
const RETRY_MS = [0, 400, 1200, 2800] as const

function isSessionPaused(): boolean {
  try {
    return typeof window !== 'undefined' && window.sessionStorage.getItem(SESSION_PAUSED_KEY) === '1'
  } catch {
    return false
  }
}

export function SiteAmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const userPausedRef = useRef(false)
  const duckedByTorahRef = useRef(false)
  const wasPlayingBeforeTorahRef = useRef(false)
  const unmuteAttemptedRef = useRef(false)
  const [mounted, setMounted] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)
  const [mutedAutoplay, setMutedAutoplay] = useState(false)

  const startPlayback = useCallback(async (preferAudible = false) => {
    const el = audioRef.current
    if (!el || loadFailed || userPausedRef.current || isSessionPaused()) return false

    el.volume = DEFAULT_VOLUME

    if (preferAudible) {
      try {
        el.muted = false
        await el.play()
        setPlaying(true)
        setNeedsTap(false)
        setMutedAutoplay(false)
        return true
      } catch {
        /* tenta mutado */
      }
    }

    try {
      el.muted = true
      await el.play()
      setPlaying(true)
      setNeedsTap(false)
      setMutedAutoplay(true)
      return true
    } catch {
      setPlaying(false)
      setNeedsTap(true)
      setMutedAutoplay(false)
      return false
    }
  }, [loadFailed])

  const tryAudibleAutoplay = useCallback(async () => {
    const el = audioRef.current
    if (!el || loadFailed || userPausedRef.current || isSessionPaused()) return
    el.volume = DEFAULT_VOLUME
    try {
      el.muted = false
      await el.play()
      setPlaying(true)
      setNeedsTap(false)
      setMutedAutoplay(false)
    } catch {
      void startPlayback(false)
    }
  }, [loadFailed, startPlayback])

  const scheduleRetries = useCallback(() => {
    const timers = RETRY_MS.map((ms) =>
      window.setTimeout(() => {
        const el = audioRef.current
        if (!el || userPausedRef.current || isSessionPaused()) return
        if (!el.paused) return
        void startPlayback(false)
      }, ms),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [startPlayback])

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || loadFailed) return
    const el = audioRef.current
    if (!el) return

    const onReady = () => {
      void startPlayback(false)
    }

    el.addEventListener('canplay', onReady)
    if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void startPlayback(false)
    }

    const clearRetries = scheduleRetries()

  return () => {
      el.removeEventListener('canplay', onReady)
      clearRetries()
    }
  }, [mounted, loadFailed, startPlayback, scheduleRetries])

  const unmuteFromAutoplay = useCallback(() => {
    const el = audioRef.current
    if (!el || unmuteAttemptedRef.current) return
    unmuteAttemptedRef.current = true
    el.volume = DEFAULT_VOLUME
    el.muted = false
    void el
      .play()
      .then(() => {
        setPlaying(true)
        setMutedAutoplay(false)
        setNeedsTap(false)
      })
      .catch(() => {
        unmuteAttemptedRef.current = false
        el.muted = true
        void el.play().catch(() => {
          setNeedsTap(true)
          setPlaying(false)
        })
      })
  }, [])

  useEffect(() => {
    if (!mounted) return

    const duckForTorah = () => {
      const el = audioRef.current
      if (!el || userPausedRef.current || isSessionPaused()) return
      wasPlayingBeforeTorahRef.current = !el.paused
      duckedByTorahRef.current = true
      el.pause()
      setPlaying(false)
    }

    const unduckAfterTorah = () => {
      if (!duckedByTorahRef.current) return
      duckedByTorahRef.current = false
      if (userPausedRef.current || isSessionPaused() || !wasPlayingBeforeTorahRef.current) return
      void startPlayback(false)
    }

    window.addEventListener(TORAH_AUDIO_PLAY_EVENT, duckForTorah)
    window.addEventListener(TORAH_AUDIO_STOP_EVENT, unduckAfterTorah)
    return () => {
      window.removeEventListener(TORAH_AUDIO_PLAY_EVENT, duckForTorah)
      window.removeEventListener(TORAH_AUDIO_STOP_EVENT, unduckAfterTorah)
    }
  }, [mounted, startPlayback])

  useEffect(() => {
    if (!mounted) return
    if (isSessionPaused()) return
    if (!mutedAutoplay && !needsTap) return

    // Sem `once: true`: se a primeira tentativa falhar (rede lenta, gesto
    // não reconhecido a tempo, etc.), o listener continua ativo para tentar
    // de novo no próximo toque/clique/tecla, em vez de morrer silenciosamente.
    const onGesture = () => {
      if (mutedAutoplay) unmuteFromAutoplay()
      else if (needsTap) void tryAudibleAutoplay()
    }

    const opts: AddEventListenerOptions = { passive: true, capture: true }
    const events = ['pointerdown', 'mousedown', 'keydown', 'touchstart', 'click'] as const
    events.forEach((ev) => document.addEventListener(ev, onGesture, opts))
    return () => {
      events.forEach((ev) => document.removeEventListener(ev, onGesture, opts))
    }
  }, [mounted, mutedAutoplay, needsTap, unmuteFromAutoplay, tryAudibleAutoplay])

  // Retoma quando a aba volta a ficar visível (alguns navegadores pausam
  // mídia de abas em segundo plano) e quando a rede/foco da janela retornam.
  useEffect(() => {
    if (!mounted) return

    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      if (userPausedRef.current || isSessionPaused() || duckedByTorahRef.current) return
      const el = audioRef.current
      if (!el || !el.paused) return
      void startPlayback(false)
    }

    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onVisible)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onVisible)
    }
  }, [mounted, startPlayback])

  const pause = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    userPausedRef.current = true
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
    userPausedRef.current = false
    unmuteAttemptedRef.current = false
    try {
      window.sessionStorage.removeItem(SESSION_PAUSED_KEY)
    } catch {
      /* ignore */
    }
    void tryAudibleAutoplay()
  }, [tryAudibleAutoplay])

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
    userPausedRef.current = false
    unmuteAttemptedRef.current = false
    el.load()
    const onCanPlay = () => {
      el.removeEventListener('canplay', onCanPlay)
      void startPlayback(false)
    }
    el.addEventListener('canplay', onCanPlay)
  }, [startPlayback])

  const setAudioRef = useCallback(
    (node: HTMLAudioElement | null) => {
      audioRef.current = node
      if (node && !isSessionPaused() && !userPausedRef.current) {
        node.volume = DEFAULT_VOLUME
        void startPlayback(false)
      }
    },
    [startPlayback],
  )

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
      title="Confirme o ficheiro public/audio/ana-bekoach.mp3"
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
          ? 'Ligar som da música de fundo'
          : needsTap
            ? 'Ativar música de fundo'
            : playing
              ? 'Pausar música de fundo'
              : 'Retomar música de fundo'
      }
      title={
        mutedAutoplay
          ? 'A música já está a tocar em silêncio. Toque para ouvir (regra do navegador).'
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
        ref={setAudioRef}
        src={AUDIO_SRC}
        loop
        autoPlay
        muted
        preload="auto"
        playsInline
        className="hidden"
        onError={() => setLoadFailed(true)}
        onLoadedData={() => {
          setLoadFailed(false)
          if (!userPausedRef.current && !isSessionPaused()) void startPlayback(false)
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-hidden="true"
      />
      {createPortal(loadFailed ? errorButton : mainButton, document.body)}
    </>
  )
}
