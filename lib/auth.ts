"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export async function signInWithEmail(email: string, password: string) {
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log('Sign-in response:', response)
    return response
  } catch (error) {
    console.error('Sign-in error:', error)
    throw error
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    console.log('Starting sign-up in auth.ts')
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    console.log('Sign-up response in auth.ts:', response)
    return response
  } catch (error) {
    console.error('Sign-up error in auth.ts:', error)
    throw error
  }
}

export async function signOut() {
  try {
    const response = await supabase.auth.signOut()
    console.log('Sign-out response:', response)
    return response
  } catch (error) {
    console.error('Sign-out error:', error)
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const response = await supabase.auth.getUser()
    console.log('Get user response:', response)
    return response.data.user
  } catch (error) {
    console.error('Get user error:', error)
    throw error
  }
}

export async function resetPassword(email: string) {
  try {
    const response = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    })
    console.log('Reset password response:', response)
    return response
  } catch (error) {
    console.error('Reset password error:', error)
    throw error
  }
}
