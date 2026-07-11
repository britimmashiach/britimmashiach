'use client'

import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
  reached: boolean
}

function computeParts(targetMs: number): CountdownParts {
  const totalMs = Math.max(targetMs - Date.now(), 0)
  const totalSeconds = Math.floor(totalMs / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalMs,
    reached: totalMs <= 0,
  }
}

/** Contagem regressiva ao vivo (dias, horas, minutos, segundos) até `targetMs`. */
export function useCountdown(targetMs: number | null): CountdownParts | null {
  const [parts, setParts] = useState<CountdownParts | null>(
    targetMs ? computeParts(targetMs) : null,
  )

  useEffect(() => {
    if (!targetMs) {
      setParts(null)
      return
    }
    setParts(computeParts(targetMs))
    const intv = window.setInterval(() => {
      setParts(computeParts(targetMs))
    }, 1000)
    return () => window.clearInterval(intv)
  }, [targetMs])

  return parts
}
