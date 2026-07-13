'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { Bell, HeartHandshake, Megaphone, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  fetchMyNotificationsAction,
  markAllNotificationsReadAction,
  markNotificationReadAction,
} from '@/app/notifications/actions'
import type { NotificationRow } from '@/lib/prayer-notifications'

const POLL_MS = 60_000

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diffMs / 60_000)
  if (min < 1) return 'agora'
  if (min < 60) return `há ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `há ${h}h`
  const d = Math.floor(h / 24)
  return `há ${d}d`
}

function iconFor(type: string) {
  if (type === 'prayer_request_new') return HeartHandshake
  if (type === 'prayer_request_response') return HeartHandshake
  return Megaphone
}

/** Sino de notificações no header: pedidos de oração novos (líderes/mestres) e respostas (autor). */
export function NotificationBell({ hasSession }: { hasSession: boolean }) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<NotificationRow[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)
  const loadedOnceRef = useRef(false)

  const load = useCallback(async () => {
    if (!hasSession) return
    try {
      const { notifications: rows, unreadCount: count } = await fetchMyNotificationsAction()
      setNotifications(rows)
      setUnreadCount(count)
    } catch {
      /* silencioso: sino simplesmente não atualiza */
    }
  }, [hasSession])

  useEffect(() => {
    if (!hasSession) return
    void load()
    loadedOnceRef.current = true
    const interval = window.setInterval(() => void load(), POLL_MS)
    const onFocus = () => void load()
    window.addEventListener('focus', onFocus)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', onFocus)
    }
  }, [hasSession, load])

  if (!hasSession) return null

  async function onOpenChange(next: boolean) {
    setOpen(next)
    if (next) await load()
  }

  async function onSelectNotification(n: NotificationRow) {
    if (!n.read_at) {
      setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, read_at: new Date().toISOString() } : x)))
      setUnreadCount((c) => Math.max(0, c - 1))
      void markNotificationReadAction(n.id)
    }
    setOpen(false)
    if (n.link) router.push(n.link)
  }

  async function onMarkAllRead() {
    setNotifications((prev) => prev.map((x) => ({ ...x, read_at: x.read_at ?? new Date().toISOString() })))
    setUnreadCount(0)
    await markAllNotificationsReadAction()
  }

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={(next) => void onOpenChange(next)}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative p-2 rounded-lg hover:bg-muted transition-colors text-warmgray-500 hover:text-foreground"
          aria-label={unreadCount > 0 ? `Notificações (${unreadCount} não lidas)` : 'Notificações'}
        >
          <Bell className="w-4 h-4" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[9px] font-bold text-petroleum-950">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className={cn(
            'z-[100] w-[22rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-border/60 bg-background shadow-lg',
            'animate-fade-in data-[state=open]:animate-in data-[state=closed]:animate-out',
          )}
        >
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/50">
            <span className="text-sm font-inter font-semibold text-foreground">Notificações</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => void onMarkAllRead()}
                className="inline-flex items-center gap-1 text-xs font-inter text-warmgray-500 hover:text-foreground transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" aria-hidden="true" />
                Marcar todas
              </button>
            )}
          </div>

          <div className="max-h-[22rem] overflow-y-auto">
            {notifications.length === 0 && (
              <p className="px-4 py-6 text-center text-sm font-inter text-warmgray-500">
                Nenhuma notificação por aqui.
              </p>
            )}
            {notifications.map((n) => {
              const Icon = iconFor(n.type)
              const unread = !n.read_at
              return (
                <DropdownMenuItem
                  key={n.id}
                  className="cursor-pointer rounded-none p-0 focus:bg-muted"
                  onSelect={() => void onSelectNotification(n)}
                >
                  <div
                    className={cn(
                      'flex w-full items-start gap-2.5 px-3 py-2.5 text-left border-b border-border/30 last:border-b-0',
                      unread && 'bg-gold-500/[0.06]',
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0 mt-0.5',
                        unread ? 'text-gold-600 dark:text-gold-400' : 'text-warmgray-400',
                      )}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p
                        className={cn(
                          'text-sm font-inter leading-snug',
                          unread ? 'font-semibold text-foreground' : 'text-warmgray-600 dark:text-warmgray-400',
                        )}
                      >
                        {n.title}
                      </p>
                      <p className="text-xs font-inter text-warmgray-500 line-clamp-2">{n.body}</p>
                      <p className="text-[10px] font-inter text-warmgray-400">{timeAgo(n.created_at)}</p>
                    </div>
                    {unread && (
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    )}
                  </div>
                </DropdownMenuItem>
              )
            })}
          </div>
          <DropdownMenuSeparator className="h-0" />
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
