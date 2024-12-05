import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Get gallery images with user profiles
    const { data: galleryData, error: galleryError } = await supabase
      .from('ai_gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (galleryError) {
      console.error('Error fetching gallery images:', galleryError)
      return new NextResponse(`Failed to fetch gallery images: ${galleryError.message}`, { status: 500 })
    }

    // Get all unique user IDs from gallery images
    const userIds = Array.from(new Set(galleryData.map(item => item.user_id)))

    // Fetch profiles for these users
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .in('id', userIds)

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError)
      return new NextResponse(`Failed to fetch profiles: ${profilesError.message}`, { status: 500 })
    }

    // Create a map of profiles for quick lookup
    const profilesMap = new Map(profilesData.map(profile => [profile.id, profile]))

    // Combine the data
    const transformedData = galleryData.map(item => ({
      id: item.id,
      image_url: item.image_url,
      prompt: item.prompt,
      created_at: item.created_at,
      likes: item.likes || 0,
      shares: item.shares || 0,
      user_id: item.user_id,
      profile: profilesMap.get(item.user_id) || {
        first_name: null,
        last_name: null,
        avatar_url: null
      }
    }))

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error in get-gallery-images route:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new NextResponse(`Internal Server Error: ${errorMessage}`, { status: 500 })
  }
} 