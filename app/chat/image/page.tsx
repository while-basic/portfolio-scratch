/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { 
  Loader2, 
  ChevronLeft, 
  MessageSquare, 
  Image as ImageIcon, 
  Paintbrush,
  Share2,
  History,
  Twitter,
  Facebook,
  Link as LinkIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { withClientBoundary } from "@/components/client-wrapper"
import { useAuth } from "@/lib/auth-context"
import { AuthDialog } from "@/components/chat/auth-dialog"
import Image from 'next/image'
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface GeneratedImage {
  id: string
  image_url: string
  prompt: string
  created_at: string
}

function ImageGenerationPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [showSidebar] = useState(true)
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [imageHistory, setImageHistory] = useState<GeneratedImage[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(!loading && !user)

  // Fetch image history
  const fetchImageHistory = useCallback(async () => {
    setLoadingHistory(true)
    try {
      const response = await fetch('/api/get-generated-images')
      if (!response.ok) throw new Error('Failed to fetch history')
      const data = await response.json()
      setImageHistory(data)
    } catch (err) {
      console.error('Error fetching history:', err)
      toast({
        title: "Error",
        description: "Failed to load image history",
        variant: "destructive",
      })
    } finally {
      setLoadingHistory(false)
    }
  }, [toast])

  const formatShareText = (prompt: string) => {
    return encodeURIComponent(`Check out this AI-generated image: ${prompt}`)
  }

  // Share to social media
  const shareToSocial = (platform: string, imageUrl: string, prompt: string) => {
    const text = formatShareText(prompt)
    const url = window.location.origin
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'copy':
        navigator.clipboard.writeText(imageUrl)
        toast({
          title: "Success",
          description: "Image URL copied to clipboard",
        })
        break
    }
  }

  // Share to AI Gallery
  const shareToGallery = async (imageId: string) => {
    try {
      const response = await fetch('/api/share-to-gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId }),
      })

      if (!response.ok) throw new Error('Failed to share to gallery')

      toast({
        title: "Success",
        description: "Image shared to AI Gallery",
      })
    } catch (err) {
      console.error('Error sharing to gallery:', err)
      toast({
        title: "Error",
        description: "Failed to share to gallery",
        variant: "destructive",
      })
    }
  }

  const saveGeneratedImage = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch('/api/save-generated-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to save image')
      }

      toast({
        title: "Success",
        description: "Image saved to your history",
      })
      
      // Refresh history after saving
      fetchImageHistory()
    } catch (err) {
      console.error('Error saving image:', err)
      toast({
        title: "Error",
        description: "Failed to save image to history",
        variant: "destructive",
      })
    }
  }

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt) return

    setIsLoading(true)
    setError('')
    setImageUrl('')

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      setImageUrl(data.url)
      
      // Save the generated image to history
      await saveGeneratedImage(data.url, prompt)
    } catch (err) {
      setError('Failed to generate image. Please try again.')
      console.error('Error generating image:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Update auth dialog state when auth state changes
  useEffect(() => {
    setShowAuthDialog(!loading && !user)
  }, [loading, user])

  // Load image history when component mounts
  useEffect(() => {
    if (user) {
      fetchImageHistory()
    }
  }, [user, fetchImageHistory])

  if (showAuthDialog) {
    return <AuthDialog open={true} onOpenChange={() => router.push('/chat')} />
  }

  return (
    <div className="flex h-[100dvh] bg-background">
      {/* Left Navigation */}
      <div className={cn(
        "w-[260px] border-r border-border flex flex-col bg-card",
        showSidebar ? "" : "hidden lg:flex"
      )}>
        <div className="flex items-center h-14 px-3 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => router.push('/chat')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Button>
            <Button
              variant="secondary"
              className="justify-start"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Image Generation
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => router.push('/chat/inpainter')}
            >
              <Paintbrush className="mr-2 h-4 w-4" />
              Inpainter
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Coming Soon Banner */}
        <div className="w-full bg-pink-500/5 py-2 px-4 text-center border-b border-pink-500/10">
          <p className="text-sm">
            <span className="mr-2">🎨</span>
            <span className="font-semibold">AI Image Generation Coming Soon!</span>
            {" - "}
            <span className="text-muted-foreground">
              We are currently enhancing our AI image generation capabilities. Stay tuned for an amazing visual experience!
            </span>
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">AI Image Generation</h1>
                  <p className="mt-2 text-lg text-muted-foreground">
                    Create unique and creative images using advanced AI image generation
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowHistory(true)}
                >
                  <History className="mr-2 h-4 w-4" />
                  View History
                </Button>
              </div>

              <Card className="mt-8">
                <div className="p-6">
                  <form onSubmit={generateImage} className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter your image description..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="flex-1"
                        disabled={isLoading}
                      />
                      <Button 
                        type="submit" 
                        disabled={isLoading || !prompt}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          'Generate'
                        )}
                      </Button>
                    </div>
                    
                    {error && (
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                  </form>

                  {isLoading && (
                    <div className="mt-8 text-center">
                      <p className="text-muted-foreground mb-4">Our AI artists are preparing their digital brushes...</p>
                      <div className="w-64 h-2 bg-secondary rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-progress"></div>
                      </div>
                    </div>
                  )}

                  {imageUrl && (
                    <div className="mt-8">
                      <div className="relative aspect-square w-full max-w-2xl mx-auto">
                        <div className="absolute top-2 right-2 z-10">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => shareToSocial('twitter', imageUrl, prompt)}>
                                <Twitter className="mr-2 h-4 w-4" />
                                Share on Twitter
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => shareToSocial('facebook', imageUrl, prompt)}>
                                <Facebook className="mr-2 h-4 w-4" />
                                Share on Facebook
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => shareToGallery(imageUrl)}>
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Share to AI Gallery
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => shareToSocial('copy', imageUrl, prompt)}>
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Copy Image URL
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <Image
                          src={imageUrl}
                          alt="Generated image"
                          fill
                          className="object-contain rounded-lg"
                          priority
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your Generated Images</DialogTitle>
          </DialogHeader>
          
          {loadingHistory ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {imageHistory.map((image) => (
                <div key={image.id} className="relative aspect-square group">
                  <Image
                    src={image.image_url}
                    alt={image.prompt}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col justify-between p-4">
                    <p className="text-white text-sm line-clamp-3">{image.prompt}</p>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => shareToSocial('twitter', image.image_url, image.prompt)}>
                            <Twitter className="mr-2 h-4 w-4" />
                            Share on Twitter
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('facebook', image.image_url, image.prompt)}>
                            <Facebook className="mr-2 h-4 w-4" />
                            Share on Facebook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToGallery(image.id)}>
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Share to AI Gallery
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareToSocial('copy', image.image_url, image.prompt)}>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Copy Image URL
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default withClientBoundary(ImageGenerationPage)
