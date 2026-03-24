export interface Course {
  id: string
  slug: string
  title: string
  description: string
  short_description: string | null
  price: number
  original_price: number | null
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  instructor: string
  seats: number
  enrolled_count: number
  rating: number
  review_count: number
  image_url: string | null
  tags: string[]
  syllabus: string[]
  start_date: string | null
  end_date: string | null
  schedule: string | null
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  slug: string
  title: string
  description: string
  short_description: string | null
  start_date: string
  end_date: string | null
  start_time: string | null
  end_time: string | null
  venue: string
  capacity: number
  booked_count: number
  price: number
  category: string
  organizer: string
  image_url: string | null
  tags: string[]
  agenda: { time: string; title: string; speaker?: string }[]
  speakers: { name: string; title: string; bio: string; image: string }[]
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: 'admin' | 'student'
  avatar_url: string | null
  university: string | null
  year_of_study: string | null
  major: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  amount_paid: number
  progress: number        // 0–100
  notes: string | null
  created_at: string
  updated_at: string
  courses?: Course
  profiles?: Profile
}

export interface EventRegistrationWithEvent extends EventRegistration {
  events?: Event
}

export interface EventRegistration {
  id: string
  user_id: string
  event_id: string
  quantity: number
  status: 'pending' | 'confirmed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  amount_paid: number
  notes: string | null
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  is_read: boolean
  replied_at: string | null
  created_at: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'student'
}

export interface DashboardStats {
  totalRevenue: number
  totalCourses: number
  totalEvents: number
  totalStudents: number
  monthlyRevenue: { month: string; revenue: number }[]
  recentEnrollments: Enrollment[]
}
