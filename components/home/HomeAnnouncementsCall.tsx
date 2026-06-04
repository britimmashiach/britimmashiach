import Link from 'next/link'
import { Megaphone, ArrowRight } from 'lucide-react'
import type { HomeAnnouncement } from '@/lib/leader-portal-supabase'

interface Props {
  announcements: HomeAnnouncement[]
}

/**
 * Chamada pública na página inicial: mostra somente o título dos avisos
 * marcados pelo Rav como visíveis na home. O contexto fica no portal de líderes.
 */
export function HomeAnnouncementsCall({ announcements }: Props) {
  if (announcements.length === 0) return null

  return (
    <section
      aria-labelledby="avisos-home-titulo"
      className="border-b border-gold-500/20 bg-gradient-to-r from-petroleum-800/5 via-gold-500/10 to-petroleum-800/5 dark:from-petroleum-950/40 dark:via-gold-500/10 dark:to-petroleum-950/40"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Megaphone className="h-4 w-4 text-gold-600 dark:text-gold-400" aria-hidden="true" />
            <h2
              id="avisos-home-titulo"
              className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400"
            >
              Avisos da kehilah
            </h2>
          </div>

          <ul className="flex flex-1 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-1">
            {announcements.map((a) => (
              <li key={a.id} className="min-w-0">
                <Link
                  href="/lideres/painel"
                  className="group inline-flex items-center gap-1.5 text-sm font-inter font-medium text-petroleum-800 dark:text-parchment-100 hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
                >
                  <span className="truncate">{a.title}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
