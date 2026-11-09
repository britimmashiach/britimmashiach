'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { countPendingColacaoAction } from '@/app/admin/escola-actions'

export function AdminColacaoBanner({ isAdmin }: { isAdmin: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isAdmin) return
    let cancelled = false

    const refresh = () => {
      void countPendingColacaoAction().then((n) => {
        if (!cancelled) setCount(n)
      })
    }

    refresh()
    const interval = window.setInterval(refresh, 45_000)
    const onFocus = () => refresh()
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') refresh()
    })

    return () => {
      cancelled = true
      window.clearInterval(interval)
      window.removeEventListener('focus', onFocus)
    }
  }, [isAdmin])

  if (!isAdmin || count < 1) return null

  return (
    <div
      className="border-b border-gold-500/40 bg-gold-500/15 text-petroleum-900 dark:text-parchment-100"
      role="status"
    >
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-sm font-inter">
        <span className="inline-flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-gold-700 dark:text-gold-400" aria-hidden />
          {count} colação(ões) da Escola aguardando sua assinatura.
        </span>
        <Link
          href="/admin#escola-colacao"
          className="font-semibold text-petroleum-800 dark:text-gold-400 underline-offset-2 hover:underline"
        >
          Revisar agora
        </Link>
      </div>
    </div>
  )
}
