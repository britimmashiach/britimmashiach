import { Skeleton } from '@/components/ui/Skeleton'

export default function ParashotLoading() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card p-4 space-y-2">
            <Skeleton className="h-8 w-8 mx-auto rounded" />
            <Skeleton className="h-4 w-16 mx-auto" />
            <Skeleton className="h-3 w-24 mx-auto" />
          </div>
        ))}
      </div>
      <div className="space-y-10">
        {Array.from({ length: 3 }).map((_, b) => (
          <div key={b}>
            <Skeleton className="h-6 w-24 mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card p-5 space-y-3">
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-20 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
