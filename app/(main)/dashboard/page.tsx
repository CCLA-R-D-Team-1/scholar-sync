"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  BookOpen, Award, ArrowRight, CheckCircle,
  GraduationCap, ClipboardList, CalendarDays,
  BarChart3, FolderOpen, Layers,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getUserEnrollmentsAction } from "@/lib/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { AuthUser } from "@/lib/auth"

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const u = await getCurrentUser()
      if (!u) { router.push("/auth/login?redirect=/dashboard"); return }
      if (["admin", "academic_manager", "coordinator"].includes(u.role)) {
        router.push("/admin"); return
      }
      setUser(u)
      const e = await getUserEnrollmentsAction()
      setEnrollments(e)
      setIsLoading(false)
    }
    load()
  }, [router])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><LoadingSpinner size="lg" /></div>
  }

  const completed = enrollments.filter(e => e.status === "completed").length
  const active = enrollments.filter(e => e.status === "confirmed").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Your CADD Centre Lanka student portal</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm"><Link href="/profile">My Profile</Link></Button>
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Enrolled Courses", value: enrollments.length, icon: BookOpen,      bg: "bg-blue-50",   text: "text-blue-600" },
            { label: "Active",           value: active,             icon: ClipboardList, bg: "bg-cyan-50",   text: "text-cyan-600" },
            { label: "Completed",        value: completed,          icon: CheckCircle,   bg: "bg-green-50",  text: "text-green-600" },
            { label: "Certificates",     value: completed,          icon: Award,         bg: "bg-yellow-50", text: "text-yellow-600" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`h-5 w-5 ${s.text}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {enrollments.length === 0 && (
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-8 text-white mb-8 text-center">
            <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-80" />
            <h2 className="text-xl font-bold mb-2">Start Your BIM & CAD Training</h2>
            <p className="text-blue-200 mb-5 text-sm">Enroll in a CADD programme to begin tracking your progress here.</p>
            <Button asChild className="bg-white text-blue-700 hover:bg-blue-50">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* My Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" /> My Courses
              </h2>
              <Link href="/my-courses" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {enrollments.length === 0 ? (
              <div className="text-center py-10">
                <BookOpen className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-3">No courses enrolled yet</p>
                <Button asChild size="sm" variant="outline"><Link href="/courses">Browse courses</Link></Button>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.slice(0, 5).map(enrollment => {
                  const isCompleted = enrollment.status === "completed"
                  const modulesDone = enrollment.courses?.modules?.filter((_: any, i: number) => i < 2).length || 0
                  const totalModules = enrollment.courses?.modules?.length || 0
                  return (
                    <Link key={enrollment.id} href={`/courses/${enrollment.courses?.slug}`} className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                        {isCompleted ? <CheckCircle className="h-5 w-5 text-emerald-600" /> : <BookOpen className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {enrollment.courses?.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${isCompleted ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                            {enrollment.status}
                          </Badge>
                          {enrollment.batch && (
                            <span className="text-xs text-gray-400">{enrollment.batch.name}</span>
                          )}
                          {totalModules > 0 && (
                            <span className="text-xs text-gray-400">{totalModules} modules</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Quick Links Portal */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-600" /> Student Portal
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "My Courses",     href: "/my-courses",     icon: BookOpen,     bg: "bg-blue-50",   text: "text-blue-700" },
                { label: "Attendance",     href: "/my-attendance",  icon: CalendarDays, bg: "bg-cyan-50",   text: "text-cyan-700" },
                { label: "Results",        href: "/my-results",     icon: BarChart3,    bg: "bg-purple-50", text: "text-purple-700" },
                { label: "Certificates",   href: "/my-certificates",icon: Award,        bg: "bg-yellow-50", text: "text-yellow-700" },
                { label: "E-books",        href: "/resources",      icon: FolderOpen,   bg: "bg-green-50",  text: "text-green-700" },
                { label: "Module Progress",href: "/my-progress",    icon: Layers,       bg: "bg-orange-50", text: "text-orange-700" },
              ].map(item => (
                <Link key={item.label} href={item.href}>
                  <div className={`${item.bg} rounded-xl p-4 text-center hover:opacity-80 transition-opacity cursor-pointer`}>
                    <item.icon className={`h-6 w-6 ${item.text} mx-auto mb-2`} />
                    <p className={`text-sm font-medium ${item.text}`}>{item.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Module Progress */}
        {enrollments.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-600" /> Module Overview
            </h2>
            {enrollments.map(enrollment => (
              <div key={enrollment.id} className="mb-5 last:mb-0">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-800">{enrollment.courses?.title}</p>
                  <Badge className={enrollment.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                    {enrollment.status}
                  </Badge>
                </div>
                {enrollment.courses?.modules && enrollment.courses.modules.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {enrollment.courses.modules.map((mod: any, i: number) => (
                      <div key={mod.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">{i + 1}</span>
                          <p className="text-xs font-medium text-gray-800 truncate">{mod.title}</p>
                        </div>
                        <p className="text-xs text-gray-500">{mod.duration_hours}h</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Module details not available</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
