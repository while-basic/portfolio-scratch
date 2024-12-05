'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Heart,
  Share2,
  Twitter,
  Facebook,
  Link as LinkIcon,
  Loader2
} from 'lucide-react'
import Image from 'next/image'
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from 'date-fns'
import ImageModal from '@/components/modals/image-modal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from '@/lib/auth-context'

interface GalleryImage {
  id: string
  image_url: string
  prompt: string
  created_at: string
  likes: number
  shares: number
  user_id: string
  profile: {
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
  } | null
}

export default function AIGalleryPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set())

  // Fetch gallery images
  const fetchGalleryImages = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/get-gallery-images')
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }
      
      const data = await response.json()
      console.log('Fetched gallery images:', data) // Debug log
      setImages(data)
    } catch (err) {
      console.error('Error fetching gallery images:', err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to load gallery images",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  // Handle like/unlike
  const handleLike = async (imageId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like images",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/like-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId }),
      })

      if (!response.ok) throw new Error('Failed to process like')
      
      const { liked } = await response.json()
      
      setImages(prevImages => 
        prevImages.map(img => 
          img.id === imageId
            ? { ...img, likes: img.likes + (liked ? 1 : -1) }
            : img
        )
      )

      setLikedImages(prev => {
        const next = new Set(prev)
        if (liked) {
          next.add(imageId)
        } else {
          next.delete(imageId)
        }
        return next
      })

    } catch (err) {
      console.error('Error processing like:', err)
      toast({
        title: "Error",
        description: "Failed to process like",
        variant: "destructive",
      })
    }
  }

  // Share to social media
  const shareToSocial = (platform: string, imageUrl: string, prompt: string) => {
    const text = "Check out this AI-generated image: '" + prompt + "'"
    const url = window.location.origin
    
    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case "copy":
        navigator.clipboard.writeText(imageUrl)
        toast({
          title: "Success",
          description: "Image URL copied to clipboard",
        })
        break
    }
  }

  // Load images when component mounts
  useEffect(() => {
    fetchGalleryImages()
  }, [fetchGalleryImages])

  const sortedByLikes = [...images].sort((a, b) => b.likes - a.likes)

  const handleDeleteImage = async (imageId: string) => {
    const response = await fetch(`/api/delete-from-gallery?id=${imageId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText)
    }

    // Refresh the gallery after deletion
    fetchGalleryImages()
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">AI Generated Gallery</h1>
          <p className="text-neutral-400 mb-8">
            Explore amazing AI-generated artworks created by our community. Like your favorites and share with others.
          </p>

          <Tabs defaultValue="recent" className="mb-8">
            <TabsList className="bg-neutral-900">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Most Liked</TabsTrigger>
            </TabsList>
            <TabsContent value="recent">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <ImageCard
                      key={image.id}
                      image={image}
                      onImageClick={() => setSelectedImage(image)}
                      onLike={() => handleLike(image.id)}
                      hasLiked={likedImages.has(image.id)}
                      onShare={shareToSocial}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="popular">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedByLikes.map((image) => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    onImageClick={() => setSelectedImage(image)}
                    onLike={() => handleLike(image.id)}
                    hasLiked={likedImages.has(image.id)}
                    onShare={shareToSocial}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.image_url}
          imageId={selectedImage.id}
          prompt={selectedImage.prompt}
          userName={`${selectedImage.profile?.first_name || ''} ${selectedImage.profile?.last_name || ''}`}
          createdAt={selectedImage.created_at}
          likes={selectedImage.likes}
          onLike={() => handleLike(selectedImage.id)}
          hasLiked={likedImages.has(selectedImage.id)}
          canDelete={selectedImage.user_id === user?.id}
          onDelete={() => handleDeleteImage(selectedImage.id)}
        />
      )}
    </div>
  )
}

interface ImageCardProps {
  image: GalleryImage
  onImageClick: () => void
  onLike: () => void
  hasLiked: boolean
  onShare: (platform: string, imageUrl: string, prompt: string) => void
}

function ImageCard({ image, onImageClick, onLike, hasLiked, onShare }: ImageCardProps) {
  return (
    <Card className="bg-neutral-900 border-neutral-800 overflow-hidden group">
      <div className="relative aspect-square cursor-pointer" onClick={onImageClick}>
        <Image
          src={image.image_url}
          alt={image.prompt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm line-clamp-2 mb-2">{image.prompt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {image.profile?.avatar_url ? (
                  <Image
                    src={image.profile.avatar_url}
                    alt="User avatar"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-neutral-700" />
                )}
                <span className="text-white text-sm">
                  {image.profile?.first_name} {image.profile?.last_name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={hasLiked ? "text-pink-500" : "text-white hover:text-pink-500"}
                  onClick={(e) => {
                    e.stopPropagation()
                    onLike()
                  }}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white"
                      onClick={e => e.stopPropagation()}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onShare('twitter', image.image_url, image.prompt)}>
                      <Twitter className="mr-2 h-4 w-4" />
                      Share on Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onShare('facebook', image.image_url, image.prompt)}>
                      <Facebook className="mr-2 h-4 w-4" />
                      Share on Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onShare('copy', image.image_url, image.prompt)}>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Copy Image URL
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-neutral-400">
              <span>{image.likes} likes</span>
              <span>{image.shares} shares</span>
              <span>{formatDistanceToNow(new Date(image.created_at))} ago</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
