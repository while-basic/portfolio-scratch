import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export async function POST(request: Request) {
  try {
    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Verify authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body = await request.json();
    const { prompt, context } = body;

    if (!prompt) {
      return new NextResponse(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Make request to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful writing assistant. Provide clear, concise, and relevant suggestions based on the user's request."
        },
        {
          role: "user",
          content: `Context: ${context}\n\nRequest: ${prompt}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Return the suggestion
    return new NextResponse(
      JSON.stringify({ 
        suggestion: completion.choices[0].message.content 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('AI assist error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to get AI assistance' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
