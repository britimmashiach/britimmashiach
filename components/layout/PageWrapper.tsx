'use client'

import { usePathname } from 'next/navigation'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // key={pathname} força desmontagem/remontagem em cada navegação,
  // ativando animate-fade-in e criando continuidade orgânica entre rotas
  return (
    <div key={pathname} className="animate-fade-in">
      {children}
    </div>
  )
}
