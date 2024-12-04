"use client"

import { useState } from 'react'
import { ImageGenerationContainer } from '@/components/chat/image-generation-container'
import { Button } from "@/components/ui/button"
import { ChevronLeft, MessageSquare, Image as ImageIcon, Paintbrush } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { withClientBoundary } from "@/components/client-wrapper"
import { useAuth } from "@/lib/auth-context"
import { AuthDialog } from "@/components/chat/auth-dialog"

function ImageGenerationPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showSidebar] = useState(true)

  // Show auth dialog if user is not logged in
  if (!loading && !user) {
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
        {/* Fixed Header Section */}
        <div className="w-full bg-background px-4 sm:px-6 lg:px-8 pt-20 pb-4">
          <div className="max-w-4xl mx-auto">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">AI Image Generation</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Create unique and creative images using advanced AI image generation
              </p>
            </div>
          </div>
        </div>

        {/* Image Generation Container in a scrollable container */}
        <div className="flex-1 overflow-hidden relative">
          <ImageGenerationContainer />
        </div>
      </div>
    </div>
  )
}

export default withClientBoundary(ImageGenerationPage)
