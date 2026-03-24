"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Calendar, Users, Award, Star, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFeaturedCourses, getFeaturedEvents } from "@/lib/data"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { Course, Event } from "@/types"

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([getFeaturedCourses(), getFeaturedEvents()]).then(([c, e]) => {
      setCourses(c)
      setEvents(e)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1A2F] via-[#13293D] to-[#1B3A57] text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 py-28 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 px-4 py-2 rounded-full text-blue-300 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Sri Lanka{"'"}s Premier Education Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Learn from the{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
                Best Minds
              </span>
              {" "}in Tech
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Transform your career with world-class courses, expert mentorship, and a thriving community of learners across Sri Lanka.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-base font-semibold rounded-xl shadow-lg shadow-blue-500/25">
                <Link href="/courses">Explore Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/10 px-8 py-4 text-base rounded-xl">
                <Link href="/events">View Events</Link>
              </Button>
            </div>
            <div className="flex gap-8 mt-12 pt-12 border-t border-white/10">
              {[["500+", "Students"], ["50+", "Courses"], ["20+", "Expert Instructors"], ["95%", "Success Rate"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-white">{num}</p>
                  <p className="text-sm text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Scholar Sync?</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">We combine cutting-edge curriculum with real-world application to ensure your success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: "Expert-Led Courses", desc: "Learn from industry professionals with years of hands-on experience", color: "bg-blue-50 text-blue-600" },
              { icon: Users, title: "Community Learning", desc: "Join a vibrant community of learners and collaborate on real projects", color: "bg-purple-50 text-purple-600" },
              { icon: Award, title: "Certificates", desc: "Earn recognized certifications that boost your career prospects", color: "bg-amber-50 text-amber-600" },
              { icon: Star, title: "Top Rated", desc: "Consistently rated 4.8+ stars by thousands of satisfied students", color: "bg-emerald-50 text-emerald-600" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-2">Featured Courses</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Start Learning Today</h2>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/courses">View All <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <div key={i} className="h-72 bg-white rounded-2xl animate-pulse" />)}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No courses yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link key={course.id} href={`/courses/${course.slug}`} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
                  <div className="h-44 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
                    {course.image_url && <img src={course.image_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                    <div className="absolute top-3 left-3">
                      <Badge className={{ Beginner: "bg-emerald-100 text-emerald-700", Intermediate: "bg-amber-100 text-amber-700", Advanced: "bg-rose-100 text-rose-700" }[course.level] || ""}>{course.level}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold text-blue-600 mb-1">{course.category}</p>
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">{course.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">by {course.instructor}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">{formatCurrency(course.price)}</span>
                      <span className="text-xs text-gray-500">{course.enrolled_count} enrolled</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Events */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-purple-600 font-semibold text-sm uppercase tracking-wide mb-2">Upcoming Events</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Don{"'"}t Miss Out</h2>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/events">View All <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => <div key={i} className="h-52 bg-gray-100 rounded-2xl animate-pulse" />)}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No upcoming events. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.slice(0, 4).map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group flex gap-5 bg-gray-50 rounded-2xl p-6 hover:bg-blue-50 hover:shadow-md transition-all duration-300 border border-transparent hover:border-blue-200">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex flex-col items-center justify-center text-white">
                    <span className="text-lg font-bold leading-none">{new Date(event.start_date).getDate()}</span>
                    <span className="text-xs uppercase">{new Date(event.start_date).toLocaleString("default", { month: "short" })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-purple-600 mb-1">{event.category}</p>
                    <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-purple-700 transition-colors">{event.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{event.venue}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-gray-900">{event.price === 0 ? "Free" : formatCurrency(event.price)}</span>
                      <span className="text-xs text-gray-400">{event.booked_count}/{event.capacity} registered</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">Join thousands of students already learning with Scholar Sync. Your future starts today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 font-semibold rounded-xl">
              <Link href="/auth/register">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-xl">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
