'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

function AuthSessionToastInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('auth') !== 'confirmed') return
    toast.success('Conta ativa', {
      description: 'E-mail confirmado. Você já pode navegar pela plataforma.',
    })
    const params = new URLSearchParams(searchParams.toString())
    params.delete('auth')
    const q = params.toString()
    const clean = q ? `${pathname}?${q}` : pathname
    window.history.replaceState(null, '', clean)
  }, [pathname, searchParams])

  return null
}

/** Toast após /auth/callback (query `auth=confirmed`) em qualquer rota. */
export function AuthSessionToast() {
  return (
    <Suspense fallback={null}>
      <AuthSessionToastInner />
    </Suspense>
  )
}
