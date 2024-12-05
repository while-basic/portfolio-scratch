import { Metadata } from 'next'
import Gallery from '@/components/Gallery'
import { Suspense } from 'react'
import LoadingGallery from '@/components/LoadingGallery'
import FeaturedImages from '@/components/FeaturedImages'

export const metadata: Metadata = {
  title: 'AI Gallery | Generated Artworks',
  description: 'Browse through a collection of AI-generated artworks and images',
}

export default function AIGalleryPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Generated Gallery</h1>
        <p className="text-gray-600 max-w-2xl">
          Explore amazing AI-generated artworks created by our community. 
          Filter by category, like your favorites, or share your own creations.
        </p>
      </header>
      
      <FeaturedImages />
      
      <Suspense fallback={<LoadingGallery />}>
        <Gallery />
      </Suspense>
    </main>
  )
}
