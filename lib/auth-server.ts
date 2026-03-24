/**
 * lib/auth-server.ts
 *
 * Server-only auth helpers. Import ONLY from:
 *   - Server Actions ('use server' files)
 *   - Server Components (no 'use client' at top)
 *   - Route handlers (app/api/...)
 *
 * NEVER import this file from a Client Component — it uses next/headers.
 */
import { cookies } from 'next/headers'
import { createServerClient as createSSRClient } from '@supabase/ssr'
import type { AuthUser } from './auth'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createSSRClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server Component — cookies can't be set here; middleware handles refresh
        }
      },
    },
  })
}

/**
 * Get the authenticated user in a Server Action or Server Component.
 * Reads the session from cookies — works correctly server-side.
 */
export async function getServerCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return null

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single()

    return {
      id: user.id,
      name: profile?.full_name || user.user_metadata?.full_name || user.email!,
      email: user.email!,
      role: (profile?.role as 'admin' | 'student') || 'student',
    }
  } catch (err) {
    console.error('getServerCurrentUser error:', err)
    return null
  }
}
