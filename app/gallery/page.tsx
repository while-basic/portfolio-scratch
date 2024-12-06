"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { ImageCarouselModal } from "@/components/ui/image-carousel-modal"
// import { Skeleton } from "@/components/ui/skeleton"
import { PostCard } from "@/components/shared/post-card"

interface GalleryItem {
  id: string
  title: string
  category: string
  content: string
  imageSrc: string
  additionalImages?: string[]
  user: {
    name: string
    image: string
    username: string
  }
  likes: number
  comments: number
  createdAt: string
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null)
  const { ref } = useInView({
    onChange: (/* inView */) => {
      // Load more content when the ref element comes into view
      loadMoreContent();
    },
  });
  const [/* loading */] = useState(false)

  const loadMoreContent = () => {
    // Implement load more logic here
  };

  const categories = [
    { name: "All", count: 16 },
    { name: "AI Art", count: 8 },
    { name: "Text Generation", count: 4 },
    { name: "Image Generation", count: 4 },
  ]

  // Mock data - replace with actual API call
  const galleryItems: GalleryItem[] = Array(12).fill(null).map((_, i) => ({
    id: `gallery-${i}`,
    title: `AI Artwork ${i + 1}`,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].name,
    content: "This amazing piece was created using AI. #AIArt #Creative",
    imageSrc: `/placeholder-${(i % 3) + 1}.jpg`,
    user: {
      name: `Artist ${i + 1}`,
      image: `/placeholder-avatar.jpg`,
      username: `artist${i + 1}`,
    },
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - Math.random() * 10000000).toISOString(),
  }))

  const handleImageClick = (item: GalleryItem) => {
    setSelectedGalleryItem(item)
    setSelectedImageIndex(0)
    setIsModalOpen(true)
  }

  const filteredItems = galleryItems.filter(
    item => selectedCategory === "All" || item.category === selectedCategory
  )

  const formatImageForCarousel = (src: string) => ({
    src,
    alt: "AI-generated artwork",
    title: selectedGalleryItem?.title,
    description: selectedGalleryItem?.content,
  })

  return (
    <div className="container py-8">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Badge
            key={category.name}
            variant={selectedCategory === category.name ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name} ({category.count})
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <PostCard
            key={item.id}
            post={item}
            onImageClick={() => handleImageClick(item)}
          />
        ))}
        
        {/* loading && (
          <>
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
          </>
        )} */}
      </div>

      <div ref={ref} className="h-10" />

      {selectedGalleryItem && (
        <ImageCarouselModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          images={[
            formatImageForCarousel(selectedGalleryItem.imageSrc),
            ...(selectedGalleryItem.additionalImages || []).map(formatImageForCarousel)
          ]}
          initialIndex={selectedImageIndex}
          title={selectedGalleryItem.title}
          description={selectedGalleryItem.content}
        />
      )}
    </div>
  )
}
