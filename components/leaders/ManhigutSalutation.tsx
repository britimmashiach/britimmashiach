import { cn } from '@/lib/utils'
import { getLiturgicalGreeting } from '@/lib/liturgical-greeting'

interface Props {
  firstName?: string | null
  className?: string
  compact?: boolean
}

/**
 * Saudação do Beit Midrash: hora do dia + Shalom U'Vrachá (sempre adequado).
 */
export function ManhigutSalutation({ firstName, className, compact }: Props) {
  const { text } = getLiturgicalGreeting()

  return (
    <div className={cn('space-y-0.5', className)}>
      <p
        className={cn(
          'font-cinzel font-semibold text-[#FF9900] dark:text-gold-400',
          compact ? 'text-xl' : 'text-2xl md:text-3xl',
        )}
      >
        {text}!
      </p>
      <p
        className={cn(
          'font-cinzel font-semibold text-[#FF9900] dark:text-gold-400',
          compact ? 'text-lg' : 'text-xl md:text-2xl',
        )}
      >
        Shalom U'Vrachá{firstName ? `, ${firstName}` : ','}
      </p>
    </div>
  )
}
