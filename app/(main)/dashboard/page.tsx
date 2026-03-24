"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  BookOpen, Calendar, TrendingUp, Award,
  ArrowRight, Clock, MapPin, CheckCircle,
  GraduationCap, Zap,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getUserEnrollmentsAction, getUserEventRegistrationsAction } from "@/lib/actions"
import { formatDate, formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { AuthUser } from "@/lib/auth"

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [registrations, setRegistrations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const u = await getCurrentUser()
      if (!u) {
        router.push("/auth/login?redirect=/dashboard")
        return
      }
      if (u.role === "admin") {
        router.push("/admin")
        return
      }
      setUser(u)
      const [e, r] = await Promise.all([
        getUserEnrollmentsAction(),
        getUserEventRegistrationsAction(),
      ])
      setEnrollments(e)
      setRegistrations(r)
      setIsLoading(false)
    }
    load()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((s, e) => s + (e.progress || 0), 0) / enrollments.length)
    : 0
  const completed = enrollments.filter((e) => e.status === "completed").length
  const inProgress = enrollments.filter((e) => e.status === "confirmed" && (e.progress || 0) > 0).length

  const stats = [
    { label: "Courses Enrolled", value: enrollments.length, icon: BookOpen, color: "blue", bg: "bg-blue-50", text: "text-blue-600" },
    { label: "Events Registered", value: registrations.length, icon: Calendar, color: "purple", bg: "bg-purple-50", text: "text-purple-600" },
    { label: "Avg Progress", value: `${avgProgress}%`, icon: TrendingUp, color: "emerald", bg: "bg-emerald-50", text: "text-emerald-600" },
    { label: "Completed", value: completed, icon: Award, color: "amber", bg: "bg-amber-50", text: "text-amber-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Here's an overview of your learning journey
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/profile">My Profile</Link>
            </Button>
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, bg, text }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`h-5 w-5 ${text}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        {enrollments.length === 0 && registrations.length === 0 && (
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8 text-center">
            <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-80" />
            <h2 className="text-xl font-bold mb-2">Start Your Learning Journey</h2>
            <p className="text-blue-200 mb-5 text-sm">Enroll in courses and register for events to see your progress here.</p>
            <div className="flex justify-center gap-3">
              <Button asChild className="bg-white text-blue-700 hover:bg-blue-50">
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* My Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                My Courses
              </h2>
              <Link href="/my-courses" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {enrollments.length === 0 ? (
              <div className="text-center py-10">
                <BookOpen className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-3">No courses enrolled yet</p>
                <Button asChild size="sm" variant="outline">
                  <Link href="/courses">Browse courses</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.slice(0, 4).map((enrollment) => {
                  const progress = enrollment.progress || 0
                  const isCompleted = enrollment.status === "completed"
                  return (
                    <Link
                      key={enrollment.id}
                      href={`/courses/${enrollment.courses?.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                        {isCompleted
                          ? <CheckCircle className="h-5 w-5 text-emerald-600" />
                          : <BookOpen className="h-5 w-5 text-blue-600" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {enrollment.courses?.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${isCompleted ? "bg-emerald-500" : "bg-blue-500"}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8 flex-shrink-0">{progress}%</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
                {enrollments.length > 4 && (
                  <Link href="/my-courses" className="flex items-center justify-center text-sm text-blue-600 hover:text-blue-700 pt-2 border-t border-gray-50">
                    +{enrollments.length - 4} more courses
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* My Events */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                My Events
              </h2>
              <Link href="/events" className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1 font-medium">
                Browse <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {registrations.length === 0 ? (
              <div className="text-center py-10">
                <Calendar className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-3">No events registered yet</p>
                <Button asChild size="sm" variant="outline">
                  <Link href="/events">Explore events</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.slice(0, 4).map((reg) => (
                  <Link
                    key={reg.id}
                    href={`/events/${reg.events?.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                        {reg.events?.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        {reg.events?.start_date && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(reg.events.start_date)}
                          </span>
                        )}
                        {reg.events?.venue && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{reg.events.venue.split(",")[0]}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0">
                      Registered
                    </span>
                  </Link>
                ))}
                {registrations.length > 4 && (
                  <Link href="/events" className="flex items-center justify-center text-sm text-purple-600 hover:text-purple-700 pt-2 border-t border-gray-50">
                    +{registrations.length - 4} more events
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Progress Overview */}
        {enrollments.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Learning Progress
              </h2>
              <Link href="/my-courses" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
                Manage <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{enrollments.length}</p>
                <p className="text-xs text-blue-500 mt-0.5">Total Enrolled</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-amber-700">{inProgress}</p>
                <p className="text-xs text-amber-500 mt-0.5">In Progress</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-700">{completed}</p>
                <p className="text-xs text-emerald-500 mt-0.5">Completed</p>
              </div>
            </div>

            {/* Per-course progress bars */}
            <div className="space-y-3">
              {enrollments.map((enrollment) => {
                const progress = enrollment.progress || 0
                const isCompleted = enrollment.status === "completed"
                return (
                  <div key={enrollment.id} className="flex items-center gap-3">
                    <div className="w-36 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">{enrollment.courses?.title}</p>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${isCompleted ? "bg-emerald-500" : progress > 0 ? "bg-blue-500" : "bg-gray-300"}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-500 w-10 text-right">{progress}%</span>
                    {isCompleted && (
                      <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
