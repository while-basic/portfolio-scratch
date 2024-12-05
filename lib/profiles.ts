import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']

export type ProfileWithStringSkills = Omit<Profile, 'skills'> & {
  skills: string | string[] | null;
}

export async function getProfile(): Promise<ProfileWithStringSkills> {
  const supabase = createClientComponentClient<Database>()
  const { data: { user } } = await supabase.auth.getUser()

  try {
    if (!user?.id) {
      throw new Error('User not found')
    }

    // First try to get existing profile
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching profile:', fetchError)
      throw fetchError
    }

    // If profile exists, return it
    if (existingProfile) {
      const profile: ProfileWithStringSkills = {
        ...existingProfile,
        skills: existingProfile.skills || null
      }
      return profile
    }

    // If no profile exists, create a new one
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: user.id,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (createError) {
      console.error('Error creating profile:', createError)
      throw createError
    }

    return {
      ...newProfile,
      skills: null
    }
  } catch (error) {
    console.error('Error in getProfile:', error)
    throw error
  }
}

export async function updateProfile(updates: Partial<ProfileWithStringSkills>): Promise<ProfileWithStringSkills> {
  const supabase = createClientComponentClient<Database>()
  const { data: { user } } = await supabase.auth.getUser()

  try {
    if (!user?.id) {
      throw new Error('User not found')
    }

    // Convert skills array to string for storage if it exists
    const updatesForDb = {
      ...updates,
      skills: Array.isArray(updates.skills) ? updates.skills : updates.skills?.split(',').map(s => s.trim()),
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updatesForDb,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      throw error
    }

    return {
      ...data,
      skills: data.skills || null
    }
  } catch (error) {
    console.error('Error in updateProfile:', error)
    throw error
  }
}

export async function uploadProfileImage(
  file: File,
  bucket: 'avatars' | 'covers',
  userId: string
): Promise<{ url: string | null; error: Error | null }> {
  const supabase = createClientComponentClient<Database>()
  
  try {
    // Create unique file path
    const fileExt = file.name.split('.').pop()
    const fileName = `${bucket}_${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${userId}/${fileName}`

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file, {
        upsert: true,
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath)

    return { url: publicUrl, error: null }
  } catch (error) {
    console.error(`Error uploading ${bucket} image:`, error)
    return { url: null, error: error instanceof Error ? error : new Error('Unknown error occurred') }
  }
}
