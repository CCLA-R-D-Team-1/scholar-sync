"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, Filter, BookOpen, Clock, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getCourses } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import type { Course } from "@/types"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filtered, setFiltered] = useState<Course[]>([])
  const [search, setSearch] = useState("")
  const [level, setLevel] = useState("all")
  const [category, setCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCourses(true).then((data) => {
      setCourses(data)
      setFiltered(data)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    let res = courses
    if (search) res = res.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()))
    if (level !== "all") res = res.filter(c => c.level === level)
    if (category !== "all") res = res.filter(c => c.category === category)
    setFiltered(res)
  }, [search, level, category, courses])

  const categories = ["all", ...Array.from(new Set(courses.map(c => c.category)))]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const levelColor = (l: string) => ({ Beginner: "bg-emerald-100 text-emerald-700", Intermediate: "bg-amber-100 text-amber-700", Advanced: "bg-rose-100 text-rose-700" }[l] || "")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <BookOpen className="h-14 w-14 mx-auto mb-6 text-blue-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-8">
            Unlock your potential with industry-leading courses taught by expert instructors
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="pl-12 py-3 text-gray-900 bg-white rounded-xl shadow-lg border-0 text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          <Filter className="h-4 w-4 text-gray-500" />
          <div className="flex flex-wrap gap-2">
            {levels.map(l => (
              <button key={l} onClick={() => setLevel(l)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${level === l ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 border hover:border-blue-300"}`}>
                {l === "all" ? "All Levels" : l}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 ml-4">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? "bg-purple-600 text-white shadow-md" : "bg-white text-gray-600 border hover:border-purple-300"}`}>
                {c === "all" ? "All Categories" : c}
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-500 mb-6 text-sm">{filtered.length} course{filtered.length !== 1 ? "s" : ""} found</p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No courses found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <Link key={course.id} href={`/courses/${course.slug}`} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
                  {course.image_url ? (
                    <img src={course.image_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-white/30" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge className={levelColor(course.level)}>{course.level}</Badge>
                  </div>
                  {course.is_featured && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">⭐ Featured</div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">{course.category}</p>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.short_description || course.description}</p>
                  <p className="text-xs text-gray-500 mb-3">by {course.instructor}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.enrolled_count} enrolled</span>
                    {course.rating > 0 && <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />{course.rating.toFixed(1)}</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">{formatCurrency(course.price)}</span>
                      {course.original_price && (
                        <span className="text-sm text-gray-400 line-through ml-2">{formatCurrency(course.original_price)}</span>
                      )}
                    </div>
                    <span className="text-sm text-blue-600 font-medium group-hover:underline">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
