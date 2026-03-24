import { supabase } from './supabase'

// ── COURSES ──────────────────────────────────────────────────────────────────

export async function getCourses(activeOnly = true) {
  let query = supabase.from('courses').select('*').order('created_at', { ascending: false })
  if (activeOnly) query = query.eq('is_active', true)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function getFeaturedCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('rating', { ascending: false })
    .limit(6)
  if (error) throw error
  return data || []
}

export async function getCourseBySlug(slug: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

export async function getCourseById(id: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function createCourse(course: {
  slug: string; title: string; description: string; short_description?: string
  price: number; original_price?: number; duration: string; level: string
  category: string; instructor: string; seats: number; image_url?: string
  tags: string[]; syllabus: string[]; start_date?: string; end_date?: string
  schedule?: string; is_active: boolean; is_featured: boolean
}) {
  const { data, error } = await supabase.from('courses').insert({
    ...course,
    enrolled_count: 0,
    rating: 0,
    review_count: 0,
  }).select().single()
  if (error) throw error
  return data
}

export async function updateCourse(id: string, updates: Partial<{
  slug: string; title: string; description: string; short_description: string
  price: number; original_price: number; duration: string; level: string
  category: string; instructor: string; seats: number; image_url: string
  tags: string[]; syllabus: string[]; start_date: string; end_date: string
  schedule: string; is_active: boolean; is_featured: boolean
}>) {
  const { data, error } = await supabase
    .from('courses')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCourse(id: string) {
  const { error } = await supabase.from('courses').delete().eq('id', id)
  if (error) throw error
}

// ── EVENTS ────────────────────────────────────────────────────────────────────

export async function getEvents(activeOnly = true) {
  let query = supabase.from('events').select('*').order('start_date', { ascending: true })
  if (activeOnly) query = query.eq('is_active', true)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function getFeaturedEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('start_date', { ascending: true })
    .limit(4)
  if (error) throw error
  return data || []
}

export async function getEventBySlug(slug: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

export async function getEventById(id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function createEvent(event: {
  slug: string; title: string; description: string; short_description?: string
  start_date: string; end_date?: string; start_time?: string; end_time?: string
  venue: string; capacity: number; price: number; category: string; organizer: string
  image_url?: string; tags: string[]; agenda: object[]; speakers: object[]
  is_active: boolean; is_featured: boolean
}) {
  const { data, error } = await supabase.from('events').insert({
    ...event,
    booked_count: 0,
  }).select().single()
  if (error) throw error
  return data
}

export async function updateEvent(id: string, updates: Partial<{
  slug: string; title: string; description: string; short_description: string
  start_date: string; end_date: string; start_time: string; end_time: string
  venue: string; capacity: number; price: number; category: string; organizer: string
  image_url: string; tags: string[]; agenda: object[]; speakers: object[]
  is_active: boolean; is_featured: boolean
}>) {
  const { data, error } = await supabase
    .from('events')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw error
}

// ── USERS / PROFILES ──────────────────────────────────────────────────────────

export async function getUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function updateUserRole(userId: string, role: 'admin' | 'student') {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function toggleUserActive(userId: string, isActive: boolean) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── ENROLLMENTS ──────────────────────────────────────────────────────────────

export async function enrollInCourse(userId: string, courseId: string, amountPaid: number) {
  const { data, error } = await supabase.from('enrollments').insert({
    user_id: userId,
    course_id: courseId,
    status: 'confirmed',
    payment_status: 'paid',
    amount_paid: amountPaid,
  }).select().single()
  if (error) throw error
  // Increment enrolled_count
  await supabase.rpc('increment_enrolled_count', { course_id: courseId })
  return data
}

export async function getUserEnrollments(userId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ── EVENT REGISTRATIONS ───────────────────────────────────────────────────────

export async function registerForEvent(userId: string, eventId: string, quantity: number, amountPaid: number) {
  const { data, error } = await supabase.from('event_registrations').insert({
    user_id: userId,
    event_id: eventId,
    quantity,
    status: 'confirmed',
    payment_status: 'paid',
    amount_paid: amountPaid,
  }).select().single()
  if (error) throw error
  // Increment booked_count
  await supabase.rpc('increment_booked_count', { event_id: eventId, qty: quantity })
  return data
}

export async function getUserEventRegistrations(userId: string) {
  const { data, error } = await supabase
    .from('event_registrations')
    .select('*, events(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) return []
  return data || []
}

export async function checkUserEnrollment(userId: string, courseId: string): Promise<boolean> {
  const { data } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single()
  return !!data
}

export async function checkUserEventRegistration(userId: string, eventId: string): Promise<boolean> {
  const { data } = await supabase
    .from('event_registrations')
    .select('id')
    .eq('user_id', userId)
    .eq('event_id', eventId)
    .single()
  return !!data
}

// ── CONTACT MESSAGES ─────────────────────────────────────────────────────────

export async function submitContactMessage(msg: {
  name: string; email: string; phone?: string; subject: string; message: string
}) {
  const { data, error } = await supabase.from('contact_messages').insert(msg).select().single()
  if (error) throw error
  return data
}

export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function markMessageAsRead(id: string) {
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id)
  if (error) throw error
}

// ── DASHBOARD STATS ───────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [
    { count: totalCourses },
    { count: totalEvents },
    { count: totalUsers },
    { data: enrollmentData },
    { data: recentEnrollments },
  ] = await Promise.all([
    supabase.from('courses').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('enrollments').select('amount_paid, created_at'),
    supabase.from('enrollments').select('*, profiles(full_name, email), courses(title)').order('created_at', { ascending: false }).limit(10),
  ])

  const totalRevenue = enrollmentData?.reduce((sum, e) => sum + (e.amount_paid || 0), 0) || 0

  // Monthly revenue from last 6 months
  const now = new Date()
  const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    const month = d.toLocaleString('default', { month: 'short', year: '2-digit' })
    const revenue = enrollmentData?.filter(e => {
      const ed = new Date(e.created_at)
      return ed.getMonth() === d.getMonth() && ed.getFullYear() === d.getFullYear()
    }).reduce((sum, e) => sum + (e.amount_paid || 0), 0) || 0
    return { month, revenue }
  })

  return {
    totalRevenue,
    totalCourses: totalCourses || 0,
    totalEvents: totalEvents || 0,
    totalStudents: totalUsers || 0,
    monthlyRevenue,
    recentEnrollments: recentEnrollments || [],
  }
}
