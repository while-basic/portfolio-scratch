import { Anthropic } from '@anthropic-ai/sdk';
import { AnthropicStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

// Create an Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Ensure the API key is set
    if (!process.env.ANTHROPIC_API_KEY) {
      return new NextResponse("Anthropic API key not configured", { status: 500 });
    }

    // Create the stream
    const response = await anthropic.messages.create({
      messages: messages.map((message: any) => ({
        role: message.role,
        content: message.content,
      })),
      model: 'claude-3-opus-20240229',
      stream: true,
      max_tokens: 1024,
    });

    // Convert the response into a friendly stream
    const stream = AnthropicStream(response);

    // Return the stream with the correct headers
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat API:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Error processing your request' }),
      { status: 500 }
    );
  }
}
