import { Metadata } from 'next'
import Gallery from '@/components/Gallery'
import { Suspense } from 'react'
import LoadingGallery from '@/components/LoadingGallery'

export const metadata: Metadata = {
  title: 'AI Gallery | Generated Artworks',
  description: 'Browse through a collection of AI-generated artworks and images',
}

export default function AIGalleryPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">AI Generated Gallery</h1>
      <Suspense fallback={<LoadingGallery />}>
        <Gallery />
      </Suspense>
    </main>
  )
}
