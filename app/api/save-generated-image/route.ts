import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { imageUrl, prompt } = await req.json()
    const supabase = createRouteHandlerClient({ cookies })

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Save the generated image to the database
    const { data, error } = await supabase
      .from('generated_images')
      .insert([
        {
          user_id: user.id,
          image_url: imageUrl,
          prompt: prompt,
          created_at: new Date().toISOString(),
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error saving image:', error)
      return NextResponse.json(
        { error: 'Failed to save image' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 