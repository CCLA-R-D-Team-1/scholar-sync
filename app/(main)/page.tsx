"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight, BookOpen, Users, Award, CheckCircle,
  GraduationCap, Layers, Clock, ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFeaturedCourses } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import type { Course } from "@/types"

const PROGRAMS = [
  {
    category: "BIM",
    title: "Building Information Modelling",
    desc: "Industry-standard BIM training using Revit Architecture, Revit MEP, Navisworks and Project Management.",
    modules: ["Revit Architecture", "Revit MEP", "Navisworks", "Project Management"],
    hours: 148,
    color: "from-blue-600 to-cyan-600",
  },
  {
    category: "CAD",
    title: "Computer-Aided Design",
    desc: "Foundation and advanced CAD skills for engineering, architecture and manufacturing applications.",
    modules: ["2D Drafting", "3D Modelling", "Technical Documentation", "Industry Applications"],
    hours: 80,
    color: "from-purple-600 to-blue-600",
  },
  {
    category: "Project Management",
    title: "Project Management",
    desc: "Expert-level project planning and control using MS Project and Primavera for construction projects.",
    modules: ["Scheduling", "Resource Planning", "WBS & Reporting", "Primavera P6"],
    hours: 240,
    color: "from-cyan-600 to-teal-600",
  },
]

const CERTIFICATE_LEVELS = [
  { level: "Proficient Certificate", hours: "~80 hours", color: "bg-green-100 text-green-800 border-green-200" },
  { level: "Master Certificate",     hours: "~160 hours", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { level: "Expert Certificate",     hours: "~240 hours", color: "bg-purple-100 text-purple-800 border-purple-200" },
]

const LIFECYCLE = [
  { step: "1", label: "Registration",      icon: Users },
  { step: "2", label: "Enrollment",        icon: BookOpen },
  { step: "3", label: "Batch Allocation",  icon: Layers },
  { step: "4", label: "Module Learning",   icon: GraduationCap },
  { step: "5", label: "Assessment",        icon: CheckCircle },
  { step: "6", label: "Certification",     icon: Award },
]

const levelColor = (l: string) =>
  l === "Expert Certificate"   ? "bg-purple-100 text-purple-800" :
  l === "Master Certificate"   ? "bg-blue-100 text-blue-800" :
                                  "bg-green-100 text-green-800"

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getFeaturedCourses().then(setCourses).finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="min-h-screen">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1A2F] via-[#0D2340] to-[#0A2A4A] text-white pt-24 pb-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6">
            <GraduationCap className="h-4 w-4" />
            CADD Centre Lanka — Industry-Oriented Training
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Academic & Student
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Management System
            </span>
          </h1>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-10">
            Centralised management of BIM, CAD and Project Management training — from student registration through to professional certification.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/40 gap-2">
              <Link href="/courses">Browse Programmes <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/auth/register">Student Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATE LEVELS ──────────────────────────────── */}
      <section className="bg-gray-50 py-12 px-4 border-b">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Certificate Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CERTIFICATE_LEVELS.map(({ level, hours, color }) => (
              <div key={level} className={`flex items-center justify-between border rounded-xl px-5 py-4 ${color}`}>
                <div>
                  <p className="font-bold text-sm">{level}</p>
                  <p className="text-xs opacity-80 mt-0.5">{hours}</p>
                </div>
                <Award className="h-6 w-6 opacity-60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMMES ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">CADD Programmes</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Software-based practical training aligned to international BIM and engineering standards</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROGRAMS.map(prog => (
              <div key={prog.category} className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`bg-gradient-to-br ${prog.color} p-6 text-white`}>
                  <span className="text-xs font-semibold bg-white/20 rounded-full px-3 py-1">{prog.category}</span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{prog.title}</h3>
                  <div className="flex items-center gap-1.5 text-white/80 text-sm">
                    <Clock className="h-3.5 w-3.5" /> {prog.hours} hours
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">{prog.desc}</p>
                  <div className="space-y-1.5">
                    {prog.modules.map((m, i) => (
                      <div key={m} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                        {m}
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-5" variant="outline">
                    <Link href="/courses">View Courses <ChevronRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT LIFECYCLE ───────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Student Journey</h2>
          <p className="text-gray-500 mb-12">From registration to professional certification — every step tracked</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {LIFECYCLE.map((item, i) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center mb-2">
                    <item.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{item.label}</span>
                </div>
                {i < LIFECYCLE.length - 1 && <ArrowRight className="h-4 w-4 text-blue-300 -mt-4 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ────────────────────────────────── */}
      {(isLoading || courses.length > 0) && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
                <p className="text-gray-500 mt-1">Start your CADD journey today</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/courses">All Courses <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map(course => (
                  <Link key={course.id} href={`/courses/${course.slug}`}
                    className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="h-40 bg-gradient-to-br from-blue-600 to-cyan-700 flex items-center justify-center relative">
                      {course.image_url
                        ? <img src={course.image_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        : <BookOpen className="h-12 w-12 text-white/30" />}
                      <div className="absolute top-3 left-3">
                        <Badge className={levelColor(course.level)}>{course.level}</Badge>
                      </div>
                      {course.is_featured && (
                        <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">⭐ Featured</div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">{course.category}</p>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{course.title}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.short_description || course.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.total_hours}h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">{formatCurrency(course.price)}</span>
                          {course.original_price && (
                            <span className="text-sm text-gray-400 line-through ml-2">{formatCurrency(course.original_price)}</span>
                          )}
                        </div>
                        <span className="text-sm text-blue-600 font-medium group-hover:underline">Enroll →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── STATS ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0A1A2F] to-[#0D2340] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "3",    label: "Industry Programmes" },
            { value: "148h", label: "BIM Programme Hours" },
            { value: "5",    label: "User Roles Supported" },
            { value: "QR",   label: "Verified Certificates" },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-sm text-blue-200 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start?</h2>
          <p className="text-gray-500 mb-8">Register as a student and gain access to BIM, CAD and Project Management training at CADD Centre Lanka.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/auth/register">Create Student Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
