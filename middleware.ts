import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is signed in and the current path is /auth/sign-in or /auth/sign-up redirect the user to /
  if (session && (req.nextUrl.pathname === '/auth/sign-in' || req.nextUrl.pathname === '/auth/sign-up')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // If user is not signed in and the current path is /dashboard or /profile, redirect the user to /auth/sign-in
  if (!session && (req.nextUrl.pathname === '/dashboard' || req.nextUrl.pathname === '/profile')) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login') {
    const adminToken = req.cookies.get('admin_token')
    if (!adminToken || adminToken.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/', '/auth/sign-in', '/auth/sign-up', '/dashboard', '/profile', '/admin/:path*']
}
