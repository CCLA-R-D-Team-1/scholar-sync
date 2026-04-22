"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Mail, Phone, GraduationCap, Save, CheckCircle, ChevronLeft, BookOpen, Shield } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getFullProfileAction, updateProfileAction } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const ROLE_LABELS: Record<string, string> = {
  admin:            "Administrator",
  academic_manager: "Academic Manager",
  trainer:          "Trainer",
  student:          "Student",
  coordinator:      "Coordinator",
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [form, setForm] = useState({ full_name: "", phone: "", education_background: "" })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving]   = useState(false)
  const [msg, setMsg]             = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser()
      if (!user) { router.push("/auth/login"); return }
      const p = await getFullProfileAction()
      if (p) {
        setProfile(p)
        setForm({
          full_name:          p.full_name || "",
          phone:              p.phone || "",
          education_background: p.education_background || "",
        })
      }
      setIsLoading(false)
    }
    load()
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.full_name.trim()) { setMsg({ type: "error", text: "Full name is required" }); return }
    setIsSaving(true)
    const { error } = await updateProfileAction(form)
    setIsSaving(false)
    setMsg(error
      ? { type: "error", text: error }
      : { type: "success", text: "Profile updated successfully!" })
    setTimeout(() => setMsg(null), 3000)
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50"><LoadingSpinner size="lg" /></div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-sm text-gray-500">Manage your CADD Centre Lanka student account</p>
          </div>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {profile?.full_name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{profile?.full_name || "—"}</h2>
              <p className="text-sm text-gray-500">{profile?.email}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize flex items-center gap-1">
                  <Shield className="h-3 w-3" /> {ROLE_LABELS[profile?.role] || profile?.role}
                </span>
                {profile?.student_id && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                    {profile.student_id}
                  </span>
                )}
              </div>
            </div>
          </div>

          {msg && (
            <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg mb-4 ${
              msg.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}>
              {msg.type === "success" && <CheckCircle className="h-4 w-4 flex-shrink-0" />}
              {msg.text}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="full_name" className="pl-10" placeholder="Your full name"
                  value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="email" className="pl-10 bg-gray-50" value={profile?.email || ""} disabled />
              </div>
              <p className="text-xs text-gray-400">Email cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="phone" className="pl-10" placeholder="07X XXX XXXX"
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education Background</Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="education" className="pl-10" placeholder="e.g. A/L, Diploma, BSc Engineering"
                  value={form.education_background} onChange={e => setForm(f => ({ ...f, education_background: e.target.value }))} />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 gap-2" disabled={isSaving}>
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "My Courses",    href: "/my-courses" },
              { label: "Dashboard",     href: "/dashboard" },
              { label: "Certificates",  href: "/my-certificates" },
              { label: "Browse Courses",href: "/courses" },
            ].map(item => (
              <Link key={item.label} href={item.href}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline py-1.5 px-2 rounded hover:bg-blue-50 transition-colors">
                {item.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
