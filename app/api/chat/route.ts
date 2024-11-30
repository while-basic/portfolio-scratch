import { NextResponse } from "next/server"
import { generateChatResponse } from "@/lib/openai"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const response = await generateChatResponse(messages)
    return NextResponse.json(response)
  } catch (error) {
    console.error("[CHAT_ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
