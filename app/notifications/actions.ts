'use server'

import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import {
  fetchRecentNotifications,
  fetchUnreadNotificationCount,
  markAllNotificationsRead,
  markNotificationRead,
  type NotificationRow,
} from '@/lib/prayer-notifications'

async function getCurrentUserId(): Promise<string | null> {
  if (!hasSupabaseServerEnv()) return null
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user?.id ?? null
}

export async function fetchMyNotificationsAction(): Promise<{
  notifications: NotificationRow[]
  unreadCount: number
}> {
  const userId = await getCurrentUserId()
  if (!userId) return { notifications: [], unreadCount: 0 }

  const [notifications, unreadCount] = await Promise.all([
    fetchRecentNotifications(userId, 15),
    fetchUnreadNotificationCount(userId),
  ])

  return { notifications, unreadCount }
}

export async function markNotificationReadAction(id: string): Promise<{ ok: boolean }> {
  const userId = await getCurrentUserId()
  if (!userId) return { ok: false }
  const ok = await markNotificationRead(userId, id)
  return { ok }
}

export async function markAllNotificationsReadAction(): Promise<{ ok: boolean }> {
  const userId = await getCurrentUserId()
  if (!userId) return { ok: false }
  const ok = await markAllNotificationsRead(userId)
  return { ok }
}
