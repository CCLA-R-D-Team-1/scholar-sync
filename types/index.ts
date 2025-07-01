export interface Course {
  id: string
  slug: string
  title: string
  description: string
  price: number
  originalPrice?: number
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  instructor: string
  seats: number
  enrolledCount: number
  rating: number
  reviews: number
  image: string
  tags: string[]
  syllabus: string[]
  startDate: string
  endDate: string
  schedule: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  slug: string
  title: string
  description: string
  shortDescription: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  venue: string
  capacity: number
  bookedCount: number
  price: number
  category: string
  organizer: string
  image: string
  gallery: string[]
  tags: string[]
  agenda: Array<{
    time: string
    title: string
    speaker?: string
  }>
  speakers: Array<{
    name: string
    title: string
    bio: string
    image: string
  }>
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "admin" | "student"
  avatar?: string
  university?: string
  year?: string
  major?: string
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

export interface Booking {
  id: string
  userId: string
  courseId?: string
  eventId?: string
  type: "course" | "event"
  quantity: number
  totalAmount: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: "admin" | "student"
  token: string
}

export interface DashboardStats {
  totalRevenue: number
  totalCourses: number
  totalEvents: number
  totalUsers: number
  activeBookings: number
  monthlyRevenue: Array<{
    month: string
    revenue: number
  }>
  popularCourses: Array<{
    id: string
    title: string
    enrollments: number
  }>
  recentBookings: Booking[]
}
