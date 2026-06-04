import { Headphones } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TanachSection } from '@/lib/tanach-books'
import { getTanachAudioFeature } from '@/lib/tanach-audio-catalog'

type Props = {
  section: TanachSection
  className?: string
  /** Se false, mostra só o ícone (útil em grelhas compactas). */
  showLabel?: boolean
}

export function TanachAudioIndicator({ section, className, showLabel = true }: Props) {
  const feature = getTanachAudioFeature(section)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border border-gold-500/25 bg-gold-500/8',
        'px-1.5 py-0.5 text-[10px] font-inter font-medium text-gold-800 dark:text-gold-300',
        className,
      )}
      title={feature.labelLong}
    >
      <Headphones className="w-3 h-3 shrink-0 opacity-90" aria-hidden="true" />
      {showLabel ? <span>{feature.labelShort}</span> : <span className="sr-only">{feature.labelShort}</span>}
    </span>
  )
}
