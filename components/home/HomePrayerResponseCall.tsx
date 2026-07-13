'use client'

import { useState } from 'react'
import { HeartHandshake, X } from 'lucide-react'
import { markNotificationReadAction } from '@/app/notifications/actions'
import type { NotificationRow } from '@/lib/prayer-notifications'

interface Props {
  notifications: NotificationRow[]
}

/**
 * Chamada na tela inicial quando o pedido de oração da pessoa recebeu resposta.
 * Some da tela ao ser dispensada (marca como lida, sem precisar reabrir depois).
 */
export function HomePrayerResponseCall({ notifications }: Props) {
  const [dismissed, setDismissed] = useState<string[]>([])
  const visible = notifications.filter((n) => !dismissed.includes(n.id))

  if (visible.length === 0) return null

  function dismiss(id: string) {
    setDismissed((prev) => [...prev, id])
    void markNotificationReadAction(id)
  }

  return (
    <section aria-label="Resposta ao seu pedido de oração" className="container mx-auto px-4 pt-6">
      <div className="space-y-3">
        {visible.map((n) => (
          <div
            key={n.id}
            className="glass-card flex items-start gap-3 border-gold-500/30 bg-gold-500/[0.06] p-4 md:p-5"
          >
            <HeartHandshake className="h-5 w-5 shrink-0 text-gold-600 dark:text-gold-400 mt-0.5" aria-hidden="true" />
            <div className="flex-1 space-y-1 min-w-0">
              <p className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100">
                {n.title}
              </p>
              <p className="text-sm font-inter text-warmgray-700 dark:text-warmgray-300 whitespace-pre-wrap">
                {n.body}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dismiss(n.id)}
              className="shrink-0 rounded-lg p-1.5 text-warmgray-400 hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Fechar aviso"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
