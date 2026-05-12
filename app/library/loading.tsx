import { Skeleton, BookCardSkeleton } from '@/components/ui/Skeleton'

export default function LibraryLoading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-10 flex-1 max-w-lg rounded-lg" />
      </div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
