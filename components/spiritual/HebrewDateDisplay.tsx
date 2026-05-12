'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { HebrewDateSkeleton } from '@/components/ui/Skeleton'

interface HebrewDateData {
  hebrewDate: string
  gregorianFormatted: string
  dayOfWeek: string
  parasha: string | null
  omerDay: number | null
  omerText: string | null
  holidays: string[]
}

interface HebrewDateDisplayProps {
  className?: string
  compact?: boolean
}

export function HebrewDateDisplay({ className, compact = false }: HebrewDateDisplayProps) {
  const [data, setData] = useState<HebrewDateData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/hebrew-date', { signal: controller.signal })
      .then((r) => r.json() as Promise<HebrewDateData>)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  if (loading) {
    return compact
      ? <div className={cn('space-y-1', className)}><div className="skeleton h-5 w-36 rounded" /><div className="skeleton h-3 w-24 rounded" /></div>
      : <HebrewDateSkeleton className={className} />
  }

  if (!data) return null

  if (compact) {
    return (
      <div className={cn('text-center', className)}>
        <p className="font-cinzel text-sm text-gold-600 dark:text-gold-400 tracking-wide">
          {data.hebrewDate}
        </p>
        <p className="text-[11px] font-inter text-warmgray-500 dark:text-warmgray-400 capitalize mt-0.5">
          {data.dayOfWeek}
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="font-cinzel text-2xl md:text-3xl font-semibold text-petroleum-800 dark:text-parchment-100">
          {data.hebrewDate}
        </h2>
        <span className="text-sm font-inter text-warmgray-500 dark:text-warmgray-400 capitalize">
          {data.dayOfWeek}
        </span>
      </div>
      <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 capitalize">
        {data.gregorianFormatted}
      </p>

      {data.holidays.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {data.holidays.map((h) => (
            <span
              key={h}
              className="text-xs font-inter font-medium bg-gold-500/12 text-gold-700 dark:text-gold-400 px-2.5 py-0.5 rounded-full"
            >
              {h}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
