"use client"

import { useState } from 'react'
import { withClientBoundary } from "@/components/client-wrapper"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { AuthDialog } from "@/components/chat/auth-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ChevronLeft, MessageSquare, Image as ImageIcon, Paintbrush } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'

function InpainterPage() {
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
              variant="ghost"
              className="justify-start"
              onClick={() => router.push('/chat/image')}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Image Generation
            </Button>
            <Button
              variant="secondary"
              className="justify-start"
            >
              <Paintbrush className="mr-2 h-4 w-4" />
              Inpainter
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-background">
        <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">AI Image Inpainting</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Upload an image and select areas to edit with AI-powered inpainting
              </p>
            </div>

            {/* Main Content */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Upload Image</h2>
                    </div>
                    <div 
                      className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 transition-colors hover:border-primary/50 cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Drag and drop your image here, or click to select
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supported formats: PNG, JPG, WEBP
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Controls Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Controls</h2>
                    </div>
                    <div className="rounded-lg border bg-card p-6">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Coming soon: Tools for masking and editing
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Brush tools for masking</li>
                          <li>• Adjustable brush size</li>
                          <li>• Eraser tool</li>
                          <li>• Undo/Redo support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-3">
                  <Button variant="outline">Reset</Button>
                  <Button disabled>Generate</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withClientBoundary(InpainterPage)
