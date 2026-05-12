import { type LucideIcon, SearchX, BookOpen, Library } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center space-y-4', className)}>
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <Icon className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="space-y-1 max-w-xs">
        <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
          {title}
        </h3>
        {description && (
          <p className="text-sm font-inter text-warmgray-500 dark:text-warmgray-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}

export function NoStudiesFound() {
  return (
    <EmptyState
      icon={BookOpen}
      title="Nenhum estudo encontrado"
      description="Tente ajustar os filtros ou buscar por outro termo."
    />
  )
}

export function NoLibraryResults() {
  return (
    <EmptyState
      icon={Library}
      title="Nenhum título encontrado"
      description="Tente buscar por outro termo ou categoria."
    />
  )
}
