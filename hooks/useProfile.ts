'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { useAuthSnapshot } from '@/components/layout/AuthSessionProvider'
import { createClient, supabaseConfigured } from '@/lib/supabase'
import { buildSessionDisplay, type SessionDisplay } from '@/lib/session-display'
import type { Profile } from '@/types'
import { profileHasLeaderAccess } from '@/lib/leader-access-policy'

export type { SessionDisplay }

export function useProfile() {
  const serverSnapshot = useAuthSnapshot()
  const router = useRouter()

  const [user, setUser] = useState<User | null>(serverSnapshot.user)
  const [profile, setProfile] = useState<Profile | null>(serverSnapshot.profile)
  const [loading, setLoading] = useState(!serverSnapshot.user && supabaseConfigured)

  useEffect(() => {
    setUser(serverSnapshot.user)
    setProfile(serverSnapshot.profile)
    if (serverSnapshot.user) setLoading(false)
  }, [serverSnapshot.user, serverSnapshot.profile])

  useEffect(() => {
    if (!supabaseConfigured) {
      setUser(null)
      setProfile(null)
      setLoading(false)
      return
    }

    const supabase = createClient()
    let cancelled = false

    async function applyUser(nextUser: User | null) {
      if (cancelled) return

      setUser(nextUser)
      if (!nextUser) {
        setProfile(null)
        setLoading(false)
        return
      }

      try {
        const { data } = await supabase.from('profiles').select('*').eq('id', nextUser.id).single()
        if (cancelled) return
        setProfile(data ?? null)
      } catch {
        if (!cancelled) setProfile(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        router.refresh()
      }
      void applyUser(session?.user ?? null)
    })

    void supabase.auth.getUser().then(({ data }) => {
      if (!cancelled) void applyUser(data.user ?? null)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [router])

  const sessionDisplay = useMemo(
    () => (user ? buildSessionDisplay(user, profile) : null),
    [user, profile],
  )

  const isPremium = profile?.role === 'premium' || profile?.role === 'admin'
  const isAdmin = profile?.role === 'admin'
  const isLeader = profileHasLeaderAccess(profile)

  return { user, profile, loading, sessionDisplay, isPremium, isAdmin, isLeader }
}
