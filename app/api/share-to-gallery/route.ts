import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { imageId } = await req.json()
    const supabase = createRouteHandlerClient({ cookies })

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get the image details
    const { data: imageData, error: imageError } = await supabase
      .from('generated_images')
      .select('*')
      .eq('id', imageId)
      .single()

    if (imageError || !imageData) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    // Share to gallery
    const { data, error } = await supabase
      .from('ai_gallery')
      .insert([
        {
          user_id: user.id,
          image_url: imageData.image_url,
          prompt: imageData.prompt,
          created_at: new Date().toISOString(),
          likes: 0,
          shares: 0,
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error sharing to gallery:', error)
      return NextResponse.json(
        { error: 'Failed to share to gallery' },
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