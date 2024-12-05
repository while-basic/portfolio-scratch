export default function LoadingGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="relative aspect-square bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  )
} 