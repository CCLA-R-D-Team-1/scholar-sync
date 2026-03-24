/**
 * lib/actions.ts
 * Server Actions — only runs on the server.
 * Uses getServerCurrentUser() which reads session from cookies via next/headers.
 */
'use server'

import { createServerSupabaseClient } from './auth-server'
import { getServerCurrentUser } from './auth-server'

// ── ENROLLMENT ───────────────────────────────────────────────────────────────

export async function enrollInCourseAction(courseId: string) {
  const user = await getServerCurrentUser()
  if (!user) return { data: null, error: 'Not authenticated' }

  const supabase = await createServerSupabaseClient()

  const { data: existing } = await supabase
    .from('enrollments').select('id')
    .eq('user_id', user.id).eq('course_id', courseId).single()

  if (existing) return { data: null, error: 'already_enrolled' }

  const { data: course } = await supabase
    .from('courses').select('price, seats, enrolled_count, title')
    .eq('id', courseId).single()

  if (!course) return { data: null, error: 'Course not found' }
  if (course.enrolled_count >= course.seats) return { data: null, error: 'Course is full' }

  const { data, error } = await supabase
    .from('enrollments')
    .insert({ user_id: user.id, course_id: courseId, status: 'confirmed', payment_status: 'paid', amount_paid: course.price })
    .select().single()

  if (error) return { data: null, error: error.message }

  await supabase.rpc('increment_enrolled_count', { course_id: courseId })
  console.log(`📧 Enrollment notification → ${user.email} for "${course.title}"`)

  return { data, error: null }
}

export async function getUserEnrollmentsAction() {
  const user = await getServerCurrentUser()
  if (!user) return []

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('enrollments').select('*, courses(*)')
    .eq('user_id', user.id).order('created_at', { ascending: false })

  if (error) return []
  return data || []
}

export async function checkEnrollmentAction(courseId: string): Promise<boolean> {
  const user = await getServerCurrentUser()
  if (!user) return false

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('enrollments').select('id')
    .eq('user_id', user.id).eq('course_id', courseId).single()

  return !!data
}

export async function updateProgressAction(enrollmentId: string, progress: number) {
  const user = await getServerCurrentUser()
  if (!user) return { error: 'Not authenticated' }

  const supabase = await createServerSupabaseClient()
  const clampedProgress = Math.min(100, Math.max(0, progress))

  const { error } = await supabase
    .from('enrollments')
    .update({ progress: clampedProgress, status: clampedProgress === 100 ? 'completed' : 'confirmed', updated_at: new Date().toISOString() })
    .eq('id', enrollmentId).eq('user_id', user.id)

  return { error: error?.message || null }
}

// ── EVENT REGISTRATION ────────────────────────────────────────────────────────

export async function registerForEventAction(eventId: string) {
  const user = await getServerCurrentUser()
  if (!user) return { data: null, error: 'Not authenticated' }

  const supabase = await createServerSupabaseClient()

  const { data: existing } = await supabase
    .from('event_registrations').select('id')
    .eq('user_id', user.id).eq('event_id', eventId).single()

  if (existing) return { data: null, error: 'already_registered' }

  const { data: event } = await supabase
    .from('events').select('price, capacity, booked_count, title')
    .eq('id', eventId).single()

  if (!event) return { data: null, error: 'Event not found' }
  if (event.booked_count >= event.capacity) return { data: null, error: 'Event is full' }

  const { data, error } = await supabase
    .from('event_registrations')
    .insert({ user_id: user.id, event_id: eventId, quantity: 1, status: 'confirmed', payment_status: 'paid', amount_paid: event.price })
    .select().single()

  if (error) return { data: null, error: error.message }

  await supabase.rpc('increment_booked_count', { event_id: eventId, qty: 1 })
  console.log(`📧 Event notification → ${user.email} for "${event.title}"`)

  return { data, error: null }
}

export async function getUserEventRegistrationsAction() {
  const user = await getServerCurrentUser()
  if (!user) return []

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('event_registrations').select('*, events(*)')
    .eq('user_id', user.id).order('created_at', { ascending: false })

  if (error) return []
  return data || []
}

export async function checkEventRegistrationAction(eventId: string): Promise<boolean> {
  const user = await getServerCurrentUser()
  if (!user) return false

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('event_registrations').select('id')
    .eq('user_id', user.id).eq('event_id', eventId).single()

  return !!data
}

// ── PROFILE ───────────────────────────────────────────────────────────────────

export async function updateProfileAction(updates: {
  full_name?: string; phone?: string; university?: string
  year_of_study?: string; major?: string; avatar_url?: string
}) {
  const user = await getServerCurrentUser()
  if (!user) return { error: 'Not authenticated' }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', user.id)

  return { error: error?.message || null }
}

export async function getFullProfileAction() {
  const user = await getServerCurrentUser()
  if (!user) return null

  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  return data
}
