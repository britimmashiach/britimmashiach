import Link from 'next/link'
import { Crown, Eye, GraduationCap, Users } from 'lucide-react'
import type { SitePublicStats } from '@/lib/site-public-stats-shared'
import { formatPublicStat } from '@/lib/site-public-stats-shared'
import { cn } from '@/lib/utils'

type StatItem = {
  key: keyof Pick<SitePublicStats, 'members' | 'visitors' | 'leaders' | 'mestres'>
  label: string
  hint: string
  icon: typeof Users
  href?: string
  accent: string
}

const ITEMS: StatItem[] = [
  {
    key: 'visitors',
    label: 'Visitantes',
    hint: 'Quem já passou por este portal',
    icon: Eye,
    href: '/auth',
    accent: 'text-cyan-700 dark:text-cyan-400',
  },
  {
    key: 'members',
    label: 'Membros',
    hint: 'Inscritos na plataforma',
    icon: Users,
    href: '/auth',
    accent: 'text-petroleum-700 dark:text-petroleum-300',
  },
  {
    key: 'leaders',
    label: 'Líderes',
    hint: 'Manhigut em formação e serviço',
    icon: GraduationCap,
    href: '/lideres',
    accent: 'text-gold-700 dark:text-gold-400',
  },
  {
    key: 'mestres',
    label: 'Mestres',
    hint: 'Formação concluída e Gematria avançada',
    icon: Crown,
    href: '/premium',
    accent: 'text-purple-700 dark:text-purple-400',
  },
]

type HomeCommunityStatsProps = {
  stats: SitePublicStats
}

export function HomeCommunityStats({ stats }: HomeCommunityStatsProps) {
  const hasAny =
    stats.members > 0 || stats.visitors > 0 || stats.leaders > 0 || stats.mestres > 0

  if (!hasAny) return null

  return (
    <section
      className="border-b border-border/30 bg-muted/20 dark:bg-petroleum-950/40"
      aria-labelledby="kehilah-stats-titulo"
    >
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <p className="text-[10px] font-inter font-semibold text-warmgray-400 uppercase tracking-widest">
            Kehilah em crescimento
          </p>
          <h2
            id="kehilah-stats-titulo"
            className="font-cinzel text-xl md:text-2xl font-semibold text-petroleum-800 dark:text-parchment-100"
          >
            Uma comunidade que caminha junto
          </h2>
          <p className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            Cada inscrição abre a primeira Aliyáh. O Premium aprofunda Sod e Netivot. Líderes e Mestres servem a edah com profundidade.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {ITEMS.map(({ key, label, hint, icon: Icon, href, accent }) => {
            const value = formatPublicStat(stats[key])
            const inner = (
              <>
                <Icon className={cn('w-5 h-5 shrink-0', accent)} aria-hidden="true" />
                <p className="font-cinzel text-2xl md:text-3xl font-semibold text-petroleum-800 dark:text-parchment-100 tabular-nums">
                  {value}
                </p>
                <p className="font-inter text-sm font-semibold text-foreground">{label}</p>
                <p className="font-inter text-[11px] text-warmgray-500 dark:text-warmgray-400 leading-snug">
                  {hint}
                </p>
              </>
            )

            const cardClass =
              'glass-card p-4 md:p-5 flex flex-col items-center text-center gap-2 hover:border-gold-500/25 transition-colors'

            if (href) {
              return (
                <Link key={key} href={href} className={cn(cardClass, 'group')}>
                  {inner}
                </Link>
              )
            }

            return (
              <div key={key} className={cardClass}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
