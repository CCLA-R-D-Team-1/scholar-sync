"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  BookOpen, CheckCircle, Clock, ArrowRight,
  ChevronLeft, BarChart3, Minus, Plus,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getUserEnrollmentsAction, updateProgressAction } from "@/lib/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { formatDate, formatCurrency } from "@/lib/utils"

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<Record<string, string>>({})
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser()
      if (!user) {
        router.push("/auth/login?redirect=/my-courses")
        return
      }
      const data = await getUserEnrollmentsAction()
      setEnrollments(data)
      setIsLoading(false)
    }
    load()
  }, [router])

  const handleProgressUpdate = async (enrollmentId: string, newProgress: number) => {
    setUpdating(enrollmentId)
    const { error } = await updateProgressAction(enrollmentId, newProgress)
    if (!error) {
      setEnrollments((prev) =>
        prev.map((e) =>
          e.id === enrollmentId
            ? { ...e, progress: newProgress, status: newProgress === 100 ? "completed" : "confirmed" }
            : e
        )
      )
      if (newProgress === 100) {
        setFeedback((f) => ({ ...f, [enrollmentId]: "🎉 Course completed!" }))
        setTimeout(() => setFeedback((f) => { const n = { ...f }; delete n[enrollmentId]; return n }), 3000)
      }
    } else {
      setFeedback((f) => ({ ...f, [enrollmentId]: "Failed to update. Try again." }))
      setTimeout(() => setFeedback((f) => { const n = { ...f }; delete n[enrollmentId]; return n }), 3000)
    }
    setUpdating(null)
  }

  const adjustProgress = (enrollmentId: string, current: number, delta: number) => {
    const next = Math.min(100, Math.max(0, current + delta))
    handleProgressUpdate(enrollmentId, next)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const completed = enrollments.filter((e) => e.status === "completed")
  const active = enrollments.filter((e) => e.status !== "completed")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8 ml-8">
          {enrollments.length} course{enrollments.length !== 1 ? "s" : ""} enrolled
          {completed.length > 0 && ` · ${completed.length} completed`}
        </p>

        {enrollments.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <BookOpen className="h-14 w-14 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">No courses yet</h2>
            <p className="text-gray-400 text-sm mb-6">Start your learning journey today</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Active Courses */}
            {active.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  In Progress — {active.length}
                </h2>
                <div className="space-y-4">
                  {active.map((enrollment) => (
                    <CourseCard
                      key={enrollment.id}
                      enrollment={enrollment}
                      updating={updating}
                      feedback={feedback[enrollment.id]}
                      onPreset={(p) => handleProgressUpdate(enrollment.id, p)}
                      onAdjust={(delta) => adjustProgress(enrollment.id, enrollment.progress || 0, delta)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Completed Courses */}
            {completed.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Completed — {completed.length}
                </h2>
                <div className="space-y-4">
                  {completed.map((enrollment) => (
                    <CourseCard
                      key={enrollment.id}
                      enrollment={enrollment}
                      updating={updating}
                      feedback={feedback[enrollment.id]}
                      onPreset={(p) => handleProgressUpdate(enrollment.id, p)}
                      onAdjust={(delta) => adjustProgress(enrollment.id, enrollment.progress || 0, delta)}
                      readOnly
                    />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </div>
  )
}

// ── Sub-component: CourseCard ─────────────────────────────────────────────────

function CourseCard({
  enrollment,
  updating,
  feedback,
  onPreset,
  onAdjust,
  readOnly = false,
}: {
  enrollment: any
  updating: string | null
  feedback?: string
  onPreset: (p: number) => void
  onAdjust: (delta: number) => void
  readOnly?: boolean
}) {
  const course = enrollment.courses
  const progress = enrollment.progress || 0
  const isCompleted = enrollment.status === "completed"
  const isUpdating = updating === enrollment.id

  const levelColors: Record<string, string> = {
    Beginner: "bg-emerald-100 text-emerald-700",
    Intermediate: "bg-amber-100 text-amber-700",
    Advanced: "bg-rose-100 text-rose-700",
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-4 min-w-0">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isCompleted ? "bg-emerald-100" : "bg-blue-100"}`}>
            {isCompleted
              ? <CheckCircle className="h-6 w-6 text-emerald-600" />
              : <BookOpen className="h-6 w-6 text-blue-600" />
            }
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              {course?.title}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">by {course?.instructor}</p>
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="h-3 w-3" />{course?.duration}
              </span>
              {course?.level && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[course.level] || "bg-gray-100 text-gray-600"}`}>
                  {course.level}
                </span>
              )}
              {course?.category && (
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                  {course.category}
                </span>
              )}
              {isCompleted && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Completed
                </span>
              )}
            </div>
          </div>
        </div>

        <Link href={`/courses/${course?.slug}`} className="flex-shrink-0">
          <Button variant="outline" size="sm" className="gap-1">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-gray-400" />
            Progress
          </span>
          <span className={`text-sm font-bold ${isCompleted ? "text-emerald-600" : "text-blue-600"}`}>
            {progress}%
          </span>
        </div>
        <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
              isCompleted
                ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                : "bg-gradient-to-r from-blue-400 to-blue-600"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Feedback message */}
      {feedback && (
        <div className={`text-sm px-3 py-2 rounded-lg mb-3 ${
          feedback.startsWith("🎉") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
        }`}>
          {feedback}
        </div>
      )}

      {/* Progress Controls */}
      {!readOnly && (
        <div className="border-t border-gray-50 pt-4">
          <p className="text-xs text-gray-400 mb-3">Update your progress:</p>

          {/* Preset buttons */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {[0, 25, 50, 75, 100].map((preset) => (
              <button
                key={preset}
                onClick={() => onPreset(preset)}
                disabled={isUpdating || progress === preset}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                  progress === preset
                    ? "border-blue-300 bg-blue-50 text-blue-500 cursor-not-allowed"
                    : "border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                } disabled:opacity-50`}
              >
                {isUpdating ? "..." : `${preset}%`}
              </button>
            ))}
          </div>

          {/* Fine-grained controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAdjust(-5)}
              disabled={isUpdating || progress === 0}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 transition-all"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-xs text-gray-400">Fine-tune (±5%)</span>
            <button
              onClick={() => onAdjust(5)}
              disabled={isUpdating || progress === 100}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 transition-all"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Enrolled date */}
      <div className="border-t border-gray-50 pt-3 mt-4">
        <p className="text-xs text-gray-400">
          Enrolled on {formatDate(enrollment.created_at)}
          {course?.start_date && ` · Course starts ${formatDate(course.start_date)}`}
        </p>
      </div>
    </div>
  )
}
