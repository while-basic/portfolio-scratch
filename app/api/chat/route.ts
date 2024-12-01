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

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, {
    headers: corsHeaders,
  })
}

export async function POST(request: Request) {
  try {
    const { messages, model } = await request.json()

    const completion = await openai.chat.completions.create({
      model: model || 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    })

    return NextResponse.json(
      { content: completion.choices[0].message.content },
      { headers: corsHeaders }
    )

  } catch (error: any) {
    console.error("[CHAT_ERROR]", error)
    
    if (error?.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { message: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers: corsHeaders }
      )
    }

    return NextResponse.json(
      { message: error.message || 'An error occurred' },
      { status: 500, headers: corsHeaders }
    )
  }
}
