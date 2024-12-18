import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  if (isAuthPage) {
    if (session) {
      // If user is already logged in and tries to access auth pages,
      // redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // Allow access to auth pages for non-authenticated users
    return res
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
}
