'use client'

import { useEffect, useMemo, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient, supabaseConfigured } from '@/lib/supabase'
import type { Profile } from '@/types'
import type { UserRole } from '@/types'

/** Dados derivados para avatar / badge no header (sessão ativa mesmo sem linha em `profiles`). */
export type SessionDisplay = {
  firstName: string
  initials: string
  role: UserRole
  email: string
}

function buildSessionDisplay(user: User, profile: Profile | null): SessionDisplay {
  const email = user.email ?? ''
  const metaName =
    typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name.trim() : ''
  const full = profile?.full_name?.trim() || metaName
  const display = full || email.split('@')[0] || 'Conta'
  const firstName = display.split(/\s+/).filter(Boolean)[0] || 'Conta'
  const initialsSource = full || email || 'U'
  const parts = initialsSource.split(/\s+/).filter(Boolean)
  const initials =
    parts.length >= 2
      ? `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
      : (parts[0]?.slice(0, 2).toUpperCase() || 'U')
  const role: UserRole = profile?.role ?? 'free'
  return { firstName, initials, role, email }
}

export function useProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabaseConfigured) {
      setUser(null)
      setProfile(null)
      setLoading(false)
      return
    }

    const supabase = createClient()
    let cancelled = false

    async function applySession(session: import('@supabase/supabase-js').Session | null) {
      const u = session?.user ?? null
      setUser(u)
      if (!u) {
        setProfile(null)
        if (!cancelled) setLoading(false)
        return
      }
      const { data } = await supabase.from('profiles').select('*').eq('id', u.id).single()
      if (cancelled) return
      setProfile(data ?? null)
      setLoading(false)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void applySession(session ?? null)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  const sessionDisplay = useMemo(() => (user ? buildSessionDisplay(user, profile) : null), [user, profile])

  const isPremium = profile?.role === 'premium' || profile?.role === 'admin'
  const isAdmin = profile?.role === 'admin'

  return { user, profile, loading, sessionDisplay, isPremium, isAdmin }
}
