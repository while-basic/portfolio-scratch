import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // First get the gallery images
    const { data: galleryData, error: galleryError } = await supabase
      .from('ai_gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (galleryError) {
      console.error('Error fetching gallery images:', galleryError)
      return NextResponse.json(
        { error: 'Failed to fetch gallery images' },
        { status: 500 }
      )
    }

    // Then fetch the profiles for each user_id
    if (galleryData && galleryData.length > 0) {
      const userIds = galleryData.map(item => item.user_id)
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', userIds)

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError)
        return NextResponse.json(
          { error: 'Failed to fetch user profiles' },
          { status: 500 }
        )
      }

      // Combine the data
      const combinedData = galleryData.map(galleryItem => {
        const profile = profilesData.find(p => p.id === galleryItem.user_id)
        return {
          ...galleryItem,
          profile: profile || null
        }
      })

      return NextResponse.json(combinedData)
    }

    return NextResponse.json(galleryData)
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 