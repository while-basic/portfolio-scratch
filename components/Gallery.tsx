'use client';

import React, { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import Image from 'next/image'
import { ImageData } from '@/types/gallery'
import LoadingGallery from '@/components/LoadingGallery'
import LoadingSpinner from '@/components/LoadingSpinner'

// Mock data generator for demo purposes
const generateMockImages = (page: number): ImageData[] => {
  return Array.from({ length: 9 }, (_, i) => ({
    id: `${page}-${i}`,
    url: `https://images.unsplash.com/photo-${1500000000 + (page * 9 + i)}?auto=format&fit=crop&w=800&q=60`,
    description: `AI Generated Image ${page * 9 + i}`,
    createdAt: new Date().toISOString()
  }))
}

export default function Gallery() {
  const { ref, inView } = useInView()

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['gallery-images'],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return {
          images: generateMockImages(pageParam),
          nextPage: pageParam < 5 ? pageParam + 1 : null
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        throw new Error(`Failed to fetch images: ${errorMessage}`)
      }
    },
    getNextPageParam: (lastPage: { nextPage: number | null }) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  const categories = ['All', 'Landscapes', 'Portraits', 'Abstract'];

  const [activeCategory, setActiveCategory] = useState('All');

  if (isLoading) return <LoadingGallery />
  
  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading images: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="flex gap-4 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full ${
              activeCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.images.map((image: ImageData) => (
            <div key={image.id} className="relative aspect-square">
              <Image
                src={image.url}
                alt={image.description}
                fill
                className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                priority={pageIndex === 0}
              />
            </div>
          ))}
        </React.Fragment>
      ))}
      
      <div ref={ref} className="h-10 col-span-full flex justify-center">
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  )
}
