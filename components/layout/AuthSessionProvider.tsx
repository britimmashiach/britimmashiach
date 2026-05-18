'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { AuthSnapshot } from '@/lib/auth-snapshot'

const AuthSessionContext = createContext<AuthSnapshot | null>(null)

export function AuthSessionProvider({
  children,
  snapshot,
}: {
  children: ReactNode
  snapshot: AuthSnapshot
}) {
  return <AuthSessionContext.Provider value={snapshot}>{children}</AuthSessionContext.Provider>
}

export function useAuthSnapshot(): AuthSnapshot {
  const ctx = useContext(AuthSessionContext)
  if (!ctx) {
    return { user: null, profile: null, sessionDisplay: null }
  }
  return ctx
}
