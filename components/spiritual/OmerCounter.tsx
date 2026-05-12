'use client'

import { cn } from '@/lib/utils'

interface OmerCounterProps {
  day: number | null
  text: string | null
  className?: string
}

const SEFIROT_GRADIENTS: Record<string, string> = {
  Chesed:   'from-blue-400/20 to-blue-500/8 border-blue-400/20',
  Gevuráh:  'from-red-400/20 to-red-500/8 border-red-400/20',
  Tiferet:  'from-gold-400/20 to-gold-500/8 border-gold-400/20',
  Netzach:  'from-green-400/20 to-green-500/8 border-green-400/20',
  Hod:      'from-amber-400/20 to-amber-500/8 border-amber-400/20',
  Yesod:    'from-purple-400/20 to-purple-500/8 border-purple-400/20',
  Malchut:  'from-warmgray-400/20 to-warmgray-500/8 border-warmgray-400/20',
}

function getSefirah(text: string): string {
  for (const name of Object.keys(SEFIROT_GRADIENTS)) {
    if (text.includes(name)) return name
  }
  return 'Tiferet'
}

export function OmerCounter({ day, text, className }: OmerCounterProps) {
  if (!day || !text) return null

  const sefirah = getSefirah(text)
  const gradient = SEFIROT_GRADIENTS[sefirah] ?? SEFIROT_GRADIENTS.Tiferet
  const progress = Math.round((day / 49) * 100)
  const week = Math.floor((day - 1) / 7) + 1
  const dayOfWeek = ((day - 1) % 7) + 1
  const combination = text.replace(`Dia ${day} - `, '')

  return (
    <div className={cn('glass-card p-4 space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-inter font-semibold text-warmgray-400 uppercase tracking-widest">
          Sefirat haÔmer
        </span>
        <span className="text-xs font-inter text-warmgray-400" aria-label={`Dia ${day} de 49`}>
          {day}/49
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0',
            'bg-gradient-to-br border',
            gradient,
          )}
          aria-hidden="true"
        >
          <span className="font-cinzel text-xl font-bold text-petroleum-800 dark:text-parchment-100">
            {day}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-inter text-sm font-medium text-foreground leading-snug truncate">
            {combination}
          </p>
          <p className="text-xs font-inter text-warmgray-400 mt-0.5">
            {week}ª semana, {dayOfWeek}º dia
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-inter text-warmgray-400 mb-1.5">
          <span>Progresso</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuenow={day} aria-valuemin={1} aria-valuemax={49}>
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
