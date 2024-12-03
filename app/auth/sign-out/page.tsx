"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignOut() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const signOut = async () => {
      try {
        await supabase.auth.signOut()
        router.push('/') // Redirect to home page after sign out
        router.refresh()
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }

    signOut()
  }, [router, supabase.auth])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg">Signing out...</p>
      </div>
    </div>
  )
}
