import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Check if user has admin role (you should implement your own admin check logic)
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!user || user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Admin check error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 