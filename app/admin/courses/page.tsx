"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getCourses, deleteCourse, updateCourse } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import type { Course } from "@/types"

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const loadCourses = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getCourses(false) // all courses including inactive
      setCourses(data)
    } catch {
      setError("Failed to load courses")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { loadCourses() }, [loadCourses])

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    c.instructor.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this course? This cannot be undone.")) return
    try {
      await deleteCourse(id)
      loadCourses()
    } catch {
      alert("Failed to delete course")
    }
  }

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      await updateCourse(id, { is_active: !current })
      loadCourses()
    } catch {
      alert("Failed to update course")
    }
  }

  const levelColor = (level: string) => ({
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  }[level] || "bg-gray-100 text-gray-800")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-1">{courses.length} courses total</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/admin/courses/new"><Plus className="h-4 w-4 mr-2" />New Course</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />)}</div>
          ) : error ? (
            <p className="text-red-500 text-center py-4">{error}</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No courses found</p>
              <Button asChild><Link href="/admin/courses/new">Create your first course</Link></Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{course.title}</p>
                        <p className="text-xs text-gray-500">{course.instructor}</p>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{course.category}</Badge></TableCell>
                    <TableCell><Badge className={levelColor(course.level)}>{course.level}</Badge></TableCell>
                    <TableCell className="font-medium">{formatCurrency(course.price)}</TableCell>
                    <TableCell>{course.enrolled_count}/{course.seats}</TableCell>
                    <TableCell>
                      <Badge className={course.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {course.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">•••</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/courses/${course.slug}`} target="_blank">
                              <Eye className="h-4 w-4 mr-2" />View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleActive(course.id, course.is_active)}>
                            {course.is_active
                              ? <><ToggleLeft className="h-4 w-4 mr-2" />Deactivate</>
                              : <><ToggleRight className="h-4 w-4 mr-2" />Activate</>
                            }
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(course.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
