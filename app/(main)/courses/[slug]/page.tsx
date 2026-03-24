"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft, Clock, Users, Star, Calendar,
  BookOpen, CheckCircle, Tag, Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { getCourseBySlug } from "@/lib/data"
import { enrollInCourseAction, checkEnrollmentAction } from "@/lib/actions"
import { getCurrentUser } from "@/lib/auth"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { Course } from "@/types"

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [enrollMsg, setEnrollMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null)
  const [userReady, setUserReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const [c, user] = await Promise.all([
        getCourseBySlug(slug),
        getCurrentUser(),
      ])
      setCourse(c)

      if (user && c) {
        const enrolled = await checkEnrollmentAction(c.id)
        setIsEnrolled(enrolled)
      }
      setUserReady(!!user)
      setIsLoading(false)
    }
    load()
  }, [slug])

  const handleEnroll = async () => {
    const user = await getCurrentUser()
    if (!user) {
      router.push(`/auth/login?redirect=/courses/${slug}`)
      return
    }
    if (!course) return

    setEnrolling(true)
    setEnrollMsg(null)

    const { error } = await enrollInCourseAction(course.id)

    if (error === "already_enrolled") {
      setIsEnrolled(true)
      setEnrollMsg({ type: "info", text: "You are already enrolled in this course." })
    } else if (error) {
      setEnrollMsg({ type: "error", text: error })
    } else {
      setIsEnrolled(true)
      setEnrollMsg({ type: "success", text: "🎉 You're enrolled! Head to My Courses to start learning." })
    }

    setEnrolling(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">Course not found</h2>
          <Button asChild className="mt-4">
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  const seatsLeft = course.seats - course.enrolled_count
  const isFull = seatsLeft <= 0
  const discount = course.original_price
    ? Math.round((1 - course.price / course.original_price) * 100)
    : 0

  const levelColors: Record<string, string> = {
    Beginner: "bg-emerald-700/50 text-emerald-200",
    Intermediate: "bg-amber-700/50 text-amber-200",
    Advanced: "bg-rose-700/50 text-rose-200",
  }

  const msgColors = {
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    error: "bg-red-50 text-red-700 border border-red-200",
    info: "bg-blue-50 text-blue-700 border border-blue-200",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <Button variant="ghost" asChild className="text-blue-200 hover:text-white mb-6 -ml-2">
            <Link href="/courses">
              <ArrowLeft className="h-4 w-4 mr-1" />All Courses
            </Link>
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-blue-700/50 text-blue-200 border-blue-600">{course.category}</Badge>
                <Badge className={levelColors[course.level] || ""}>{course.level}</Badge>
                {course.is_featured && <Badge className="bg-yellow-400 text-yellow-900">⭐ Featured</Badge>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-blue-200 text-lg mb-6">
                {course.short_description || course.description.slice(0, 180) + "..."}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-blue-200">
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" />by {course.instructor}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{course.duration}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{course.enrolled_count} enrolled</span>
                {course.rating > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    {course.rating.toFixed(1)} ({course.review_count} reviews)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.description}</p>
            </div>

            {course.syllabus && course.syllabus.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You{"'"}ll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.syllabus.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.tags && course.tags.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5" />Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span key={tag} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
              )}

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">{formatCurrency(course.price)}</span>
                {course.original_price && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">{formatCurrency(course.original_price)}</span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {discount}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Enroll Button */}
              {isEnrolled ? (
                <div className="space-y-3 mb-4">
                  <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-700 py-3 px-4 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" /> Already Enrolled
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/my-courses">Go to My Courses →</Link>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleEnroll}
                  disabled={isFull || enrolling}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold rounded-xl mb-4 disabled:opacity-60"
                >
                  {enrolling ? (
                    <span className="flex items-center gap-2">
                      <LoadingSpinner size="sm" /> Enrolling...
                    </span>
                  ) : isFull ? (
                    "Fully Booked"
                  ) : !userReady ? (
                    <span className="flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Sign In to Enroll
                    </span>
                  ) : (
                    "Enroll Now"
                  )}
                </Button>
              )}

              {/* Enroll message */}
              {enrollMsg && (
                <div className={`text-sm px-3 py-2.5 rounded-xl mb-4 ${msgColors[enrollMsg.type]}`}>
                  {enrollMsg.text}
                </div>
              )}

              {seatsLeft > 0 && seatsLeft <= 5 && !isEnrolled && (
                <p className="text-center text-sm text-red-600 font-medium mb-4">
                  ⚡ Only {seatsLeft} seat{seatsLeft !== 1 ? "s" : ""} left!
                </p>
              )}

              {/* Details */}
              <div className="space-y-3 text-sm text-gray-600 border-t pt-4">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-medium text-gray-900">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level</span>
                  <span className="font-medium text-gray-900">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seats Available</span>
                  <span className="font-medium text-gray-900">
                    {isFull ? "Full" : `${seatsLeft} / ${course.seats}`}
                  </span>
                </div>
                {course.start_date && (
                  <div className="flex justify-between">
                    <span>Starts</span>
                    <span className="font-medium text-gray-900">{formatDate(course.start_date)}</span>
                  </div>
                )}
                {course.end_date && (
                  <div className="flex justify-between">
                    <span>Ends</span>
                    <span className="font-medium text-gray-900">{formatDate(course.end_date)}</span>
                  </div>
                )}
                {course.schedule && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500 mb-1">Schedule</p>
                    <p className="font-medium text-gray-900 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />{course.schedule}
                    </p>
                  </div>
                )}
              </div>

              {!userReady && (
                <p className="text-center text-xs text-gray-400 mt-4">
                  <Link href="/auth/login" className="text-blue-600 hover:underline">Sign in</Link> or{" "}
                  <Link href="/auth/register" className="text-blue-600 hover:underline">register</Link> to enroll
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
