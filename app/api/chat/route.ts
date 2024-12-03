import { NextResponse } from "next/server"
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 3600 * 1000 // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 50 // Adjust based on your needs
const requestLog = new Map<string, { count: number; timestamp: number }>()

function isRateLimited(userId: string): boolean {
  const now = Date.now()
  const userRequests = requestLog.get(userId)

  if (!userRequests) {
    requestLog.set(userId, { count: 1, timestamp: now })
    return false
  }

  if (now - userRequests.timestamp > RATE_LIMIT_WINDOW) {
    // Reset if window has passed
    requestLog.set(userId, { count: 1, timestamp: now })
    return false
  }

  if (userRequests.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  userRequests.count++
  return false
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: corsHeaders,
  })
}

export async function POST(request: Request) {
  try {
    const { 
      messages,
      temperature = 0.7, 
      max_tokens = 1000, 
      top_p = 1, 
      frequency_penalty = 0, 
      presence_penalty = 0 
    } = await request.json()
    
    // Get user ID from session or use IP as fallback
    const userId = 'default-user' // Replace with actual user ID when auth is implemented

    if (isRateLimited(userId)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.', retryAfter: RATE_LIMIT_WINDOW / 1000 },
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': (RATE_LIMIT_WINDOW / 1000).toString(),
            ...corsHeaders
          }
        }
      )
    }

    // Try primary model first, fall back to gpt-4o if rate limited
    const modelOptions = ['gpt-4o', 'gpt-4o']
    let lastError: Error | null = null
    
    for (const currentModel of modelOptions) {
      try {
        const completion = await openai.chat.completions.create({
          model: currentModel,
          messages,
          temperature,
          max_tokens,
          top_p,
          frequency_penalty,
          presence_penalty
        })

        // If we get here, the API call was successful
        return NextResponse.json(
          {
            message: completion.choices[0].message.content,
            model: completion.model,
            usage: {
              total_tokens: completion.usage?.total_tokens || 0,
              prompt_tokens: completion.usage?.prompt_tokens || 0,
              completion_tokens: completion.usage?.completion_tokens || 0,
              estimated_cost: (completion.usage?.total_tokens || 0) * 0.000002 // $0.002 per 1K tokens
            }
          },
          { headers: corsHeaders }
        )
      } catch (error) {
        if (error instanceof Error) {
          lastError = error
          // If it's not a rate limit error, don't try other models
          if (!error.message.toLowerCase().includes('rate limit')) {
            break
          }
          // If it's the last model, don't catch the error
          if (currentModel === modelOptions[modelOptions.length - 1]) {
            throw error
          }
          // Otherwise, try the next model
          console.log(`Failed to use ${currentModel}, trying next model...`)
        }
      }
    }

    // If we get here, all models failed
    console.error('Chat API Error:', lastError)
    return NextResponse.json(
      { 
        error: 'Failed to generate response. Please try again later.',
        details: lastError?.message
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    )

  } catch (error) {
    console.error('Chat API Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: errorMessage
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    )
  }
}
