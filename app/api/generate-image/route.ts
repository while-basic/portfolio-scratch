import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 30000,
})

async function generateImageWithRetry(prompt: string, retries = 3): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "512x512", // Using a smaller size for better reliability
    })

    if (!response.data?.[0]?.url) {
      throw new Error('No image URL in response')
    }

    return response.data[0].url
  } catch (error) {
    if (retries > 0 && error instanceof Error) {
      console.log(`Retrying image generation... (${retries} attempts left)`)
      // Wait for 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000))
      return generateImageWithRetry(prompt, retries - 1)
    }
    throw error
  }
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    console.log('Attempting to generate image with prompt:', prompt)
    
    try {
      const imageUrl = await generateImageWithRetry(prompt)
      console.log('Successfully generated image:', imageUrl)
      
      return NextResponse.json({ 
        url: imageUrl,
        type: 'image_generation'
      })
    } catch (error) {
      console.error('Error generating image:', error)
      
      // Check for specific error types
      if (error instanceof Error) {
        if (error.message.includes('billing')) {
          return NextResponse.json(
            { error: 'OpenAI API billing error. Please check your account.' },
            { status: 402 }
          )
        }
        if (error.message.includes('rate limit')) {
          return NextResponse.json(
            { error: 'Rate limit exceeded. Please try again later.' },
            { status: 429 }
          )
        }
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to generate image',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Request processing error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    )
  }
}
