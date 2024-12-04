import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Say hello!" }],
      model: "gpt-4o",
    })

    return NextResponse.json({ 
      success: true,
      message: completion.choices[0].message.content 
    })
  } catch (error) {
    console.error('OpenAI test error:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
