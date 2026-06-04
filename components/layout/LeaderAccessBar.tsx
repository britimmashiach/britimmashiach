'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, ArrowRight } from 'lucide-react'
import { useProfile } from '@/hooks/useProfile'

/**
 * Faixa de acesso rápido à área de líderes, logo abaixo do header.
 * Líder aprovado vai direto ao painel; demais visitantes à página de apresentação.
 * Fica oculta quando o usuário já está navegando dentro de /lideres.
 */
export function LeaderAccessBar() {
  const pathname = usePathname()
  const { isLeader } = useProfile()

  if (pathname.startsWith('/lideres')) return null

  const href = isLeader ? '/lideres/painel' : '/lideres'
  const label = isLeader ? 'Abrir o Portal de Líderes' : 'Conheça a Área de Líderes'

  return (
    <div className="border-b border-gold-500/20 bg-gradient-to-r from-petroleum-800/5 via-gold-500/10 to-petroleum-800/5 dark:from-petroleum-950/40 dark:via-gold-500/10 dark:to-petroleum-950/40">
      <div className="container mx-auto px-4">
        <Link
          href={href}
          className="group flex items-center justify-center gap-2 py-2.5 text-center"
          aria-label={label}
        >
          <Users className="w-4 h-4 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-inter font-medium text-petroleum-800 dark:text-parchment-100">
            <span className="font-semibold">Líderes:</span> {label}
          </span>
          <ArrowRight
            className="w-3.5 h-3.5 shrink-0 text-gold-600 dark:text-gold-400 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  )
}
