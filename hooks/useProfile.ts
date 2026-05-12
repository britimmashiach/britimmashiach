'use client'

import { useEffect, useState } from 'react'
import { createClient, supabaseConfigured } from '@/lib/supabase'
import type { Profile } from '@/types'

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        if (!supabaseConfigured) {
          if (!cancelled) setLoading(false)
          return
        }
        const supabase = createClient()
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
  }, [])

  const isPremium = profile?.role === 'premium' || profile?.role === 'admin'
  const isAdmin = profile?.role === 'admin'

  return { profile, loading, isPremium, isAdmin }
}
