'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ImageIcon, ZoomInIcon, DownloadIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

export interface ImageGenerationProps {
  onGenerate: (prompt: string) => Promise<void>
  isLoading: boolean
  generatedImageUrl: string | null
}

export function ImageGeneration({ onGenerate, isLoading, generatedImageUrl }: ImageGenerationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [prompt, setPrompt] = useState('')

  const handleSubmit = async () => {
    if (prompt.trim() && !isLoading) {
      await onGenerate(prompt)
      setPrompt('')
    }
  }

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'generated-image.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Image Display Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {generatedImageUrl ? (
          <Card className="p-4 group relative cursor-pointer hover:shadow-lg transition-all duration-200">
            <div className="relative w-full aspect-square">
              <Image
                src={generatedImageUrl}
                alt="Generated image"
                fill
                className="object-contain rounded-md"
                onClick={() => setIsDialogOpen(true)}
              />
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDialogOpen(true)
                  }}
                >
                  <ZoomInIcon className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (generatedImageUrl) {
                      handleDownload(generatedImageUrl)
                    }
                  }}
                >
                  <DownloadIcon className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
            <ImageIcon className="h-12 w-12" />
            <p>Generated images will appear here</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-background">
        <div className="flex space-x-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {generatedImageUrl && (
            <div className="relative w-full aspect-square">
              <Image
                src={generatedImageUrl}
                alt="Generated image preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
