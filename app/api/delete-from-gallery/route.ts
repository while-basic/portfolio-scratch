import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { imageId } = await req.json()
    
    if (!imageId) {
      return new NextResponse("Image ID is required", { status: 400 })
    }

    const supabase = createRouteHandlerClient({ cookies })
    
    // Delete the image from ai_gallery
    const { error } = await supabase
      .from('ai_gallery')
      .delete()
      .eq('id', imageId)

    if (error) {
      console.error('Error deleting image:', error)
      return new NextResponse(error.message, { status: 500 })
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('Error in delete-from-gallery:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 