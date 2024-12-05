import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { imageId } = await req.json()

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has already liked the image
    const { data: existingLike } = await supabase
      .from('image_likes')
      .select()
      .eq('image_id', imageId)
      .eq('user_id', user.id)
      .single()

    if (existingLike) {
      // Unlike: Remove the like and decrement the count
      await supabase
        .from('image_likes')
        .delete()
        .eq('image_id', imageId)
        .eq('user_id', user.id)

      await supabase.rpc('decrement_likes', {
        image_id: imageId
      })

      return NextResponse.json({ liked: false })
    } else {
      // Like: Add the like and increment the count
      await supabase
        .from('image_likes')
        .insert({
          image_id: imageId,
          user_id: user.id
        })

      await supabase.rpc('increment_likes', {
        image_id: imageId
      })

      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error('Error processing like:', error)
    return NextResponse.json(
      { error: 'Failed to process like' },
      { status: 500 }
    )
  }
} 