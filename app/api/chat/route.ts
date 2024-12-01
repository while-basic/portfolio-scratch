import { NextResponse } from "next/server"
import OpenAI from 'openai'

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

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
    const { messages, model = 'gpt-4', summarize = false } = await request.json()

    if (summarize) {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'Please provide a brief summary (1 sentence or less) of the following conversation. Focus on the main topics and key points discussed.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 150,
      })

      return NextResponse.json({ content: completion.choices[0].message.content }, { headers: corsHeaders })
    }

    const completion = await openai.chat.completions.create({
      model: model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    return NextResponse.json(
      {
        content: completion.choices[0].message.content,
        usage: {
          total_tokens: completion.usage?.total_tokens || 0,
          prompt_tokens: completion.usage?.prompt_tokens || 0,
          completion_tokens: completion.usage?.completion_tokens || 0,
          estimated_cost: (completion.usage?.total_tokens || 0) * 0.000015
        }
      },
      { headers: corsHeaders }
    )

  } catch (error) {
    console.error("[CHAT_ERROR]", error)
    
    if (error instanceof OpenAI.APIError && error.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { message: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers: corsHeaders }
      )
    }

    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500, headers: corsHeaders }
    )
  }
}
