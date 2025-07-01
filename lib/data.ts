"use client"

import type { Course, Event, User, Booking, DashboardStats } from "@/types"
import { getItem, setItem, generateId } from "./storage"

// Sample data initialization
const SAMPLE_COURSES: Course[] = [
  {
    id: "1",
    slug: "advanced-web-development",
    title: "Advanced Web Development with React & Next.js",
    description:
      "Master modern web development with React, Next.js, and TypeScript. Build production-ready applications with best practices.",
    price: 45000,
    originalPrice: 60000,
    duration: "12 weeks",
    level: "Advanced",
    category: "Web Development",
    instructor: "Mr. Imamdeen",
    seats: 30,
    enrolledCount: 18,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Next.js", "TypeScript", "Full Stack"],
    syllabus: [
      "React Fundamentals & Hooks",
      "Next.js App Router & Server Components",
      "TypeScript Integration",
      "State Management with Zustand",
      "Database Integration",
      "Authentication & Authorization",
      "Deployment & Performance Optimization",
    ],
    startDate: "2025-08-01",
    endDate: "2025-10-26",
    schedule: "Mon, Wed, Fri - 9:00 AM to 3:00 PM",
    isActive: true,
    createdAt: "2025-07-15T10:00:00Z",
    updatedAt: "2025-07-15T10:00:00Z",
  },
  
  {
    id: "2",
    slug: "data-science-python",
    title: "Data Science & Machine Learning with Python",
    description:
      "Comprehensive course covering data analysis, visualization, and machine learning using Python and popular libraries.",
    price: 55000,
    originalPrice: 75000,
    duration: "16 weeks",
    level: "Intermediate",
    category: "Data Science",
    instructor: "Ms. Hiruni Piyumika",
    seats: 25,
    enrolledCount: 22,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "Machine Learning", "Data Analysis", "AI"],
    syllabus: [
      "Python for Data Science",
      "NumPy & Pandas",
      "Data Visualization with Matplotlib & Seaborn",
      "Statistical Analysis",
      "Machine Learning Algorithms",
      "Deep Learning Basics",
      "Real-world Projects",
    ],
    startDate: "2025-09-15",
    endDate: "2026-01-07",
    schedule: "Tue, Thu - 9:00 AM to 3:00 PM, Sat - 10:00 AM to 5:00 PM",
    isActive: true,
    createdAt: "2025-09-10T10:00:00Z",
    updatedAt: "2025-09-10T10:00:00Z",
  },
]

const SAMPLE_EVENTS: Event[] = [
  {
    id: "1",
    slug: "tech-summit-2024",
    title: "Campus Tech Summit 2024",
    description:
      "Join us for the biggest technology conference of the year featuring industry leaders, innovative workshops, and networking opportunities.",
    shortDescription: "The biggest tech conference with industry leaders and workshops.",
    startDate: "2024-03-15",
    endDate: "2024-03-16",
    startTime: "09:00",
    endTime: "17:00",
    venue: "University of Colombo - Main Auditorium",
    capacity: 500,
    bookedCount: 287,
    price: 2500,
    category: "Technology",
    organizer: "Campus Tech Society",
    image: "/placeholder.svg?height=400&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    tags: ["Technology", "Innovation", "Networking", "Workshops"],
    agenda: [
      { time: "09:00", title: "Registration & Welcome Coffee" },
      { time: "10:00", title: "Keynote: Future of AI", speaker: "Dr. Nimal Silva" },
      { time: "11:30", title: "Panel: Startup Ecosystem in Sri Lanka" },
      { time: "13:00", title: "Lunch Break" },
      { time: "14:00", title: "Workshop: Building Scalable Applications" },
      { time: "15:30", title: "Tech Showcase & Demo" },
      { time: "16:30", title: "Networking Session" },
    ],
    speakers: [
      {
        name: "Dr. Nimal Silva",
        title: "AI Research Director",
        bio: "Leading AI researcher with 15+ years of experience in machine learning and neural networks.",
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "Sarah Fernando",
        title: "Tech Entrepreneur",
        bio: "Founder of multiple successful startups in the fintech and edtech space.",
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
  },
]

// Data management functions
export function initializeData(): void {
  // Initialize courses if not exists
  const existingCourses = getItem<Course[]>("courses", [])
  if (existingCourses.length === 0) {
    setItem("courses", SAMPLE_COURSES)
  }

  // Initialize events if not exists
  const existingEvents = getItem<Event[]>("events", [])
  if (existingEvents.length === 0) {
    setItem("events", SAMPLE_EVENTS)
  }

  // Initialize users with default admin
  const existingUsers = getItem<User[]>("users", [])
  if (existingUsers.length === 0) {
    const defaultUsers: User[] = [
      {
        id: "1",
        name: "Admin User",
        email: "admin@campus.lk",
        role: "admin",
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "John Doe",
        email: "john@student.lk",
        role: "student",
        university: "University of Colombo",
        year: "3rd Year",
        major: "Computer Science",
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ]
    setItem("users", defaultUsers)
  }

  // Initialize bookings
  const existingBookings = getItem<Booking[]>("bookings", [])
  if (existingBookings.length === 0) {
    setItem("bookings", [])
  }
}

// CRUD operations for courses
export function getCourses(): Course[] {
  return getItem<Course[]>("courses", [])
}

export function getCourse(id: string): Course | undefined {
  const courses = getCourses()
  return courses.find((course) => course.id === id)
}

export function getCourseBySlug(slug: string): Course | undefined {
  const courses = getCourses()
  return courses.find((course) => course.slug === slug)
}

export function createCourse(courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Course {
  const courses = getCourses()
  const newCourse: Course = {
    ...courseData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  courses.push(newCourse)
  setItem("courses", courses)
  return newCourse
}

export function updateCourse(id: string, updates: Partial<Course>): Course | null {
  const courses = getCourses()
  const index = courses.findIndex((course) => course.id === id)
  if (index === -1) return null

  courses[index] = {
    ...courses[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  setItem("courses", courses)
  return courses[index]
}

export function deleteCourse(id: string): boolean {
  const courses = getCourses()
  const filteredCourses = courses.filter((course) => course.id !== id)
  if (filteredCourses.length === courses.length) return false

  setItem("courses", filteredCourses)
  return true
}

// CRUD operations for events
export function getEvents(): Event[] {
  return getItem<Event[]>("events", [])
}

export function getEvent(id: string): Event | undefined {
  const events = getEvents()
  return events.find((event) => event.id === id)
}

export function getEventBySlug(slug: string): Event | undefined {
  const events = getEvents()
  return events.find((event) => event.slug === slug)
}

export function createEvent(eventData: Omit<Event, "id" | "createdAt" | "updatedAt">): Event {
  const events = getEvents()
  const newEvent: Event = {
    ...eventData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  events.push(newEvent)
  setItem("events", events)
  return newEvent
}

export function updateEvent(id: string, updates: Partial<Event>): Event | null {
  const events = getEvents()
  const index = events.findIndex((event) => event.id === id)
  if (index === -1) return null

  events[index] = {
    ...events[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  setItem("events", events)
  return events[index]
}

export function deleteEvent(id: string): boolean {
  const events = getEvents()
  const filteredEvents = events.filter((event) => event.id !== id)
  if (filteredEvents.length === events.length) return false

  setItem("events", filteredEvents)
  return true
}

// CRUD operations for users
export function getUsers(): User[] {
  return getItem<User[]>("users", [])
}

export function getUser(id: string): User | undefined {
  const users = getUsers()
  return users.find((user) => user.id === id)
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers()
  return users.find((user) => user.email === email)
}

export function createUser(userData: Omit<User, "id" | "createdAt">): User {
  const users = getUsers()
  const newUser: User = {
    ...userData,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  setItem("users", users)
  return newUser
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const users = getUsers()
  const index = users.findIndex((user) => user.id === id)
  if (index === -1) return null

  users[index] = { ...users[index], ...updates }
  setItem("users", users)
  return users[index]
}

export function deleteUser(id: string): boolean {
  const users = getUsers()
  const filteredUsers = users.filter((user) => user.id !== id)
  if (filteredUsers.length === users.length) return false

  setItem("users", filteredUsers)
  return true
}

// CRUD operations for bookings
export function getBookings(): Booking[] {
  return getItem<Booking[]>("bookings", [])
}

export function getBooking(id: string): Booking | undefined {
  const bookings = getBookings()
  return bookings.find((booking) => booking.id === id)
}

export function createBooking(bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt">): Booking {
  const bookings = getBookings()
  const newBooking: Booking = {
    ...bookingData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  bookings.push(newBooking)
  setItem("bookings", bookings)
  return newBooking
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking | null {
  const bookings = getBookings()
  const index = bookings.findIndex((booking) => booking.id === id)
  if (index === -1) return null

  bookings[index] = {
    ...bookings[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  setItem("bookings", bookings)
  return bookings[index]
}

export function deleteBooking(id: string): boolean {
  const bookings = getBookings()
  const filteredBookings = bookings.filter((booking) => booking.id !== id)
  if (filteredBookings.length === bookings.length) return false

  setItem("bookings", filteredBookings)
  return true
}

// Dashboard statistics
export function getDashboardStats(): DashboardStats {
  const courses = getCourses()
  const events = getEvents()
  const users = getUsers()
  const bookings = getBookings()

  const totalRevenue = bookings.filter((b) => b.paymentStatus === "paid").reduce((sum, b) => sum + b.totalAmount, 0)

  const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i).toLocaleDateString("en-US", { month: "short" })
    const revenue = bookings
      .filter((b) => {
        const bookingMonth = new Date(b.createdAt).getMonth()
        return bookingMonth === i && b.paymentStatus === "paid"
      })
      .reduce((sum, b) => sum + b.totalAmount, 0)
    return { month, revenue }
  })

  const popularCourses = courses
    .sort((a, b) => b.enrolledCount - a.enrolledCount)
    .slice(0, 5)
    .map((course) => ({
      id: course.id,
      title: course.title,
      enrollments: course.enrolledCount,
    }))

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)

  return {
    totalRevenue,
    totalCourses: courses.length,
    totalEvents: events.length,
    totalUsers: users.filter((u) => u.role === "student").length,
    activeBookings: bookings.filter((b) => b.status === "confirmed").length,
    monthlyRevenue,
    popularCourses,
    recentBookings,
  }
}
