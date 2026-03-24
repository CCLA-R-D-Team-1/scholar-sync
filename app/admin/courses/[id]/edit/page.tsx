"use client"

import type React from "react"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getCourseById, updateCourse } from "@/lib/data"
import { slugify } from "@/lib/utils"
import type { Course } from "@/types"

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [syllabusInput, setSyllabusInput] = useState("")

  const [form, setFormState] = useState({
    title: "", short_description: "", description: "",
    price: "", original_price: "", duration: "",
    level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    category: "", instructor: "", seats: "30",
    image_url: "", start_date: "", end_date: "", schedule: "",
    is_active: true, is_featured: false,
    tags: [] as string[], syllabus: [] as string[],
  })

  const set = (field: string, value: unknown) => setFormState((p) => ({ ...p, [field]: value }))

  useEffect(() => {
    getCourseById(id).then((c) => {
      if (!c) { setError("Course not found"); setIsFetching(false); return }
      setCourse(c)
      setFormState({
        title: c.title,
        short_description: c.short_description || "",
        description: c.description,
        price: c.price.toString(),
        original_price: c.original_price?.toString() || "",
        duration: c.duration,
        level: c.level,
        category: c.category,
        instructor: c.instructor,
        seats: c.seats.toString(),
        image_url: c.image_url || "",
        start_date: c.start_date || "",
        end_date: c.end_date || "",
        schedule: c.schedule || "",
        is_active: c.is_active,
        is_featured: c.is_featured,
        tags: c.tags || [],
        syllabus: c.syllabus || [],
      })
      setIsFetching(false)
    })
  }, [id])

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) { set("tags", [...form.tags, t]); setTagInput("") }
  }
  const addSyllabus = () => {
    const s = syllabusInput.trim()
    if (s) { set("syllabus", [...form.syllabus, s]); setSyllabusInput("") }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      await updateCourse(id, {
        slug: slugify(form.title),
        title: form.title,
        description: form.description,
        short_description: form.short_description,
        price: Number(form.price),
        original_price: form.original_price ? Number(form.original_price) : undefined,
        duration: form.duration,
        level: form.level,
        category: form.category,
        instructor: form.instructor,
        seats: Number(form.seats),
        image_url: form.image_url,
        tags: form.tags,
        syllabus: form.syllabus,
        start_date: form.start_date || undefined,
        end_date: form.end_date || undefined,
        schedule: form.schedule,
        is_active: form.is_active,
        is_featured: form.is_featured,
      })
      router.push("/admin/courses")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update course")
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
  if (!course && error) return <div className="text-red-500 p-4">{error}</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild><Link href="/admin/courses"><ArrowLeft className="h-4 w-4 mr-1" />Back</Link></Button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
      </div>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>Title <span className="text-red-500">*</span></Label>
                <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Short Description</Label>
                <Input value={form.short_description} onChange={(e) => set("short_description", e.target.value)} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Full Description <span className="text-red-500">*</span></Label>
                <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={5} required />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={form.category} onChange={(e) => set("category", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Instructor</Label>
                <Input value={form.instructor} onChange={(e) => set("instructor", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Level</Label>
                <select value={form.level} onChange={(e) => set("level", e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm">
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={form.duration} onChange={(e) => set("duration", e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pricing & Seats</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Price (Rs.)</Label><Input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} /></div>
            <div className="space-y-2"><Label>Original Price (Rs.)</Label><Input type="number" value={form.original_price} onChange={(e) => set("original_price", e.target.value)} /></div>
            <div className="space-y-2"><Label>Seats</Label><Input type="number" value={form.seats} onChange={(e) => set("seats", e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Schedule</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Start Date</Label><Input type="date" value={form.start_date} onChange={(e) => set("start_date", e.target.value)} /></div>
            <div className="space-y-2"><Label>End Date</Label><Input type="date" value={form.end_date} onChange={(e) => set("end_date", e.target.value)} /></div>
            <div className="space-y-2"><Label>Schedule</Label><Input value={form.schedule} onChange={(e) => set("schedule", e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Media & Tags</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Image URL</Label><Input value={form.image_url} onChange={(e) => set("image_url", e.target.value)} /></div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add tag..." />
                <Button type="button" onClick={addTag} variant="outline"><Plus className="h-4 w-4" /></Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {tag}<button type="button" onClick={() => set("tags", form.tags.filter((t) => t !== tag))}><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Syllabus</Label>
              <div className="flex gap-2">
                <Input value={syllabusInput} onChange={(e) => setSyllabusInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSyllabus())} placeholder="Add syllabus item..." />
                <Button type="button" onClick={addSyllabus} variant="outline"><Plus className="h-4 w-4" /></Button>
              </div>
              <ol className="space-y-1 mt-2">
                {form.syllabus.map((item, i) => (
                  <li key={i} className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded text-sm">
                    <span>{i + 1}. {item}</span>
                    <button type="button" onClick={() => set("syllabus", form.syllabus.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
          <CardContent className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm font-medium">Featured</span>
            </label>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" asChild><Link href="/admin/courses">Cancel</Link></Button>
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
