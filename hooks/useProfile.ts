'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase'
import type { Profile } from '@/types'

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user || cancelled) { setLoading(false); return }

        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (!cancelled) setProfile(data)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [supabase])

  const isPremium = profile?.role === 'premium' || profile?.role === 'admin'
  const isAdmin = profile?.role === 'admin'

  return { profile, loading, isPremium, isAdmin }
}
