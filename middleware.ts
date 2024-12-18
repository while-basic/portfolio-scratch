import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")

  if (isAuthPage) {
    if (token) {
      // If user is already logged in and tries to access auth pages,
      // redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    // Allow access to auth pages for non-authenticated users
    return NextResponse.next()
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/auth/sign-in", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"]
}
