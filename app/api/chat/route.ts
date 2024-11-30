import { Anthropic } from '@anthropic-ai/sdk';
import { Message } from 'ai';
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
      messages: messages.map((message: Message) => ({
        role: message.role === 'user' ? 'user' : 'assistant',
        content: message.content,
      })),
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
    });

    // Return the response
    return new NextResponse(JSON.stringify({
      role: 'assistant',
      content: response.content[0].type === 'text' ? response.content[0].text : '',
    }));
  } catch (error) {
    console.error('Error in chat route:', error);
    return new NextResponse("Error in chat route", { status: 500 });
  }
}
