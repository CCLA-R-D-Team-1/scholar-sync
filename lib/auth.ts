import { createBrowserClient } from '@supabase/ssr'
import type { UserRole } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function getClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    const supabase = getClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (error) return { user: null, error: error.message }
    if (!data.user) return { user: null, error: 'Registration failed' }

    await supabase.from('profiles').upsert(
      { id: data.user.id, email, full_name: fullName, role: 'student', is_active: true },
      { onConflict: 'id', ignoreDuplicates: true },
    )

    return { user: { id: data.user.id, name: fullName, email, role: 'student' }, error: null }
  } catch (err) {
    console.error('signUp error:', err)
    return { user: null, error: 'An unexpected error occurred' }
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    const supabase = getClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error('signIn Supabase error:', error.message)
      return { user: null, error: 'Invalid email or password' }
    }
    if (!data.user) return { user: null, error: 'Login failed' }

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', data.user.id)
      .single()

    if (!profile) {
      await supabase.from('profiles').upsert(
        {
          id: data.user.id,
          email: data.user.email!,
          full_name: data.user.user_metadata?.full_name || email,
          role: 'student',
          is_active: true,
        },
        { onConflict: 'id', ignoreDuplicates: false },
      )
      return {
        user: {
          id: data.user.id,
          name: data.user.user_metadata?.full_name || email,
          email: data.user.email!,
          role: 'student',
        },
        error: null,
      }
    }

    return {
      user: {
        id: data.user.id,
        name: profile.full_name || email,
        email: data.user.email!,
        role: (profile.role as UserRole) || 'student',
      },
      error: null,
    }
  } catch (err) {
    console.error('signIn unexpected error:', err)
    return { user: null, error: 'An unexpected error occurred' }
  }
}

export async function signOut(): Promise<void> {
  await getClient().auth.signOut()
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = getClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
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
      role: (profile?.role as UserRole) || 'student',
    }
  } catch (err) {
    console.error('getCurrentUser error:', err)
    return null
  }
}

export async function getProfile(userId: string) {
  const { data } = await getClient().from('profiles').select('*').eq('id', userId).single()
  return data
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}
