'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function ImageGenerationPage() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

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
    } catch (err) {
      setError("Failed to generate image. Please try again.")
      console.error('Error generating image:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">AI Image Generation</h1>
        
        <form onSubmit={generateImage} className="space-y-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your image prompt..."
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Generate Image"
            )}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}

        {imageUrl && (
          <div className="mt-8">
            <div className="relative w-full aspect-square max-w-2xl mx-auto">
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
    </div>
  )
}
