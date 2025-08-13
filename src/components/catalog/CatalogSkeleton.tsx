export function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="group overflow-hidden hover:border-gray-200 transition-all duration-300 bg-white rounded-2xl border border-gray-100">
          {/* Image skeleton */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-full h-full bg-gray-200 animate-pulse" />
            
            {/* Badge skeleton */}
            <div className="absolute top-3 left-3">
              <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse" />
            </div>
            
            {/* Favorite button skeleton */}
            <div className="absolute top-3 right-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="p-6 space-y-4">
            {/* Title skeleton */}
            <div className="h-5 bg-gray-200 rounded animate-pulse w-4/5" />
            
            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
            
            {/* Occasions badges skeleton */}
            <div className="flex flex-wrap gap-1">
              <div className="h-5 bg-gray-200 rounded-full animate-pulse w-16" />
              <div className="h-5 bg-gray-200 rounded-full animate-pulse w-12" />
              <div className="h-5 bg-gray-200 rounded-full animate-pulse w-8" />
            </div>
            
            {/* Stats skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
