'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export function ImageGeneration() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const generateImage = async () => {
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      if (data.url) {
        setGeneratedImage(data.url)
      }
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex space-x-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && generateImage()}
        />
        <Button 
          onClick={generateImage}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </Button>
      </div>

      {generatedImage && (
        <Card className="p-4">
          <div className="relative w-full aspect-square">
            <Image
              src={generatedImage}
              alt="Generated image"
              fill
              className="object-contain"
            />
          </div>
        </Card>
      )}
    </div>
  )
}
