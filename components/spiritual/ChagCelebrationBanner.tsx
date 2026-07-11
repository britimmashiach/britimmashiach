import Link from 'next/link'
import { PartyPopper } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HOLIDAY_ICON } from '@/lib/holiday-visual'
import { holidayBannerTone, isCelebratoryHoliday } from '@/lib/chag-countdown'
import type { HolidayKey } from '@/lib/hebrew-date'

interface ChagCelebrationBannerProps {
  holidayKey: HolidayKey
  holidayName: string
  dayNumber: number
  totalDays: number
  className?: string
}

const TONE_CLASSES = {
  festive: {
    wrapper:
      'border-gold-500/30 bg-gradient-to-r from-gold-500/15 via-gold-400/25 to-gold-500/15 dark:from-gold-500/10 dark:via-gold-400/15 dark:to-gold-500/10',
    icon: 'text-gold-600 dark:text-gold-400',
    label: 'text-gold-700 dark:text-gold-400',
    link: 'text-gold-700 dark:text-gold-300 hover:text-gold-900 dark:hover:text-gold-100 decoration-gold-500/50',
  },
  solemn: {
    wrapper:
      'border-petroleum-500/30 bg-gradient-to-r from-petroleum-800/15 via-petroleum-600/20 to-petroleum-800/15 dark:from-petroleum-950/40 dark:via-petroleum-800/30 dark:to-petroleum-950/40',
    icon: 'text-petroleum-700 dark:text-petroleum-300',
    label: 'text-petroleum-700 dark:text-petroleum-300',
    link: 'text-petroleum-700 dark:text-petroleum-300 hover:text-petroleum-900 dark:hover:text-petroleum-100 decoration-petroleum-500/50',
  },
} as const

/** Banner de comemoração exibido apenas nos dias memoráveis do calendário (Chagim festivos). */
export function ChagCelebrationBanner({
  holidayKey,
  holidayName,
  dayNumber,
  totalDays,
  className,
}: ChagCelebrationBannerProps) {
  if (!isCelebratoryHoliday(holidayKey)) return null

  const Icon = HOLIDAY_ICON[holidayKey] ?? PartyPopper
  const tone = TONE_CLASSES[holidayBannerTone(holidayKey)]
  const dayLabel = totalDays > 1 ? `Dia ${dayNumber} de ${totalDays} · ` : ''

  return (
    <section
      aria-label={`Hoje é ${holidayName}`}
      className={cn('relative overflow-hidden border-b animate-fade-in', tone.wrapper, className)}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-center">
          <Icon className={cn('w-4 h-4 flex-shrink-0', tone.icon)} aria-hidden="true" />
          <p className="font-inter text-sm font-semibold uppercase tracking-wide">
            <span className={tone.label}>
              {dayLabel}Hoje é {holidayName}!
            </span>
          </p>
          <Link
            href="/chagim"
            className={cn(
              'text-xs font-inter font-medium underline underline-offset-2 transition-colors',
              tone.link,
            )}
          >
            Celebrar e estudar
          </Link>
        </div>
      </div>
    </section>
  )
}
