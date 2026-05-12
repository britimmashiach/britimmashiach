import { Skeleton, StudyCardSkeleton } from '@/components/ui/Skeleton'

export default function StudiesLoading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
      <Skeleton className="h-10 w-full max-w-lg mb-8 rounded-lg" />
      <div className="flex gap-2 mb-8 flex-wrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <StudyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
