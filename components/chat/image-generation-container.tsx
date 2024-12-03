'use client'

import { useState } from 'react'
import { ImageGeneration } from './image-generation'

export function ImageGenerationContainer() {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)

  const generateImage = async (prompt: string) => {
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
        setGeneratedImageUrl(data.url)
      }
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ImageGeneration 
        onGenerate={generateImage}
        isLoading={isLoading}
        generatedImageUrl={generatedImageUrl}
      />
    </div>
  )
}
