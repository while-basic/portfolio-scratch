import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { imageUrl, prompt } = body

    if (!imageUrl || !prompt) {
      return new NextResponse("Missing imageUrl or prompt", { status: 400 })
    }

    const supabase = createRouteHandlerClient({ cookies })
    
    // Get the current user's session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('Session error:', sessionError)
      return new NextResponse(`Authentication error: ${sessionError.message}`, { status: 401 })
    }

    if (!session) {
      return new NextResponse("No active session found", { status: 401 })
    }

    // Insert the image into the gallery
    const { error: insertError } = await supabase
      .from('ai_gallery')
      .insert([
        {
          user_id: session.user.id,
          image_url: imageUrl,
          prompt: prompt,
        }
      ])

    if (insertError) {
      console.error('Error sharing image:', insertError)
      return new NextResponse(`Database error: ${insertError.message}`, { status: 500 })
    }

    return new NextResponse("Image shared successfully", { status: 200 })
  } catch (error) {
    console.error('Error in share-to-gallery route:', error)
    return new NextResponse(`Server error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 })
  }
} 