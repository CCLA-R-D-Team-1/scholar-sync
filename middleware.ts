import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Routes that need authentication
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/my-courses']
const ADMIN_ROUTES = ['/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r))
  const isProtectedRoute = PROTECTED_ROUTES.some((r) => pathname.startsWith(r))

  // Skip middleware entirely for routes we don't protect
  if (!isAdminRoute && !isProtectedRoute) {
    return NextResponse.next()
  }

  // Build a response object we can mutate (to refresh cookies)
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // Create SSR-aware Supabase client that reads/writes cookies correctly
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // getUser() validates the JWT and refreshes the session if needed
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  const isAuthenticated = !!user && !error

  // ── Admin routes ────────────────────────────────────────────────────────────
  if (isAdminRoute) {
    if (!isAuthenticated) {
      const url = new URL('/auth/login', request.url)
      url.searchParams.set('redirect', pathname)
      url.searchParams.set('message', 'Please sign in to access the admin panel')
      return NextResponse.redirect(url)
    }

    // Fetch role from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // ── Protected student routes ─────────────────────────────────────────────
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('redirect', pathname)
    url.searchParams.set('message', 'Please sign in to continue')
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/my-courses/:path*',
  ],
}
