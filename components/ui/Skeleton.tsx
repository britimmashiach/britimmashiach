import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton', className)}
      aria-hidden="true"
    />
  )
}

export function StudyCardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-1.5 pt-1">
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="flex justify-between pt-2 border-t border-border/40">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}

export function BookCardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <Skeleton className="h-36 w-full rounded-lg" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export function HebrewDateSkeleton({ className }: { className?: string }) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-72" />
    </div>
  )
}
