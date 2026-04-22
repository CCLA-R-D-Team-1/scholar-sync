import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/my-courses', '/my-attendance', '/my-results', '/my-progress', '/my-certificates', '/resources']
const ADMIN_ROUTES = ['/admin']

type CookieToSet = { name: string; value: string; options?: CookieOptions }

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route))
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))

  if (!isAdminRoute && !isProtectedRoute) {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request: { headers: request.headers } })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  const isAuthenticated = !!user && !error

  if (isAdminRoute) {
    if (!isAuthenticated) {
      const url = new URL('/auth/login', request.url)
      url.searchParams.set('redirect', pathname)
      url.searchParams.set('message', 'Please sign in to access the admin panel')
      return NextResponse.redirect(url)
    }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    const isStaff = ['admin', 'academic_manager', 'coordinator'].includes(profile?.role ?? '')

    if (!isStaff) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

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
    '/my-attendance/:path*',
    '/my-results/:path*',
    '/my-progress/:path*',
    '/my-certificates/:path*',
    '/resources/:path*',
  ],
}
