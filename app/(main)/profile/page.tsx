"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User, Mail, Phone, GraduationCap, Save,
  AlertCircle, CheckCircle, ChevronLeft,
  BookOpen, Calendar, Shield,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getFullProfileAction, updateProfileAction } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { formatDate } from "@/lib/utils"

interface FormState {
  full_name: string
  phone: string
  university: string
  year_of_study: string
  major: string
}

interface FormErrors {
  full_name?: string
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.full_name.trim()) errors.full_name = "Full name is required"
  if (form.full_name.trim().length < 2) errors.full_name = "Name must be at least 2 characters"
  return errors
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [form, setForm] = useState<FormState>({
    full_name: "",
    phone: "",
    university: "",
    year_of_study: "",
    major: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const user = await getCurrentUser()
      if (!user) {
        router.push("/auth/login?redirect=/profile")
        return
      }
      const p = await getFullProfileAction()
      if (p) {
        setProfile(p)
        setForm({
          full_name: p.full_name || "",
          phone: p.phone || "",
          university: p.university || "",
          year_of_study: p.year_of_study || "",
          major: p.major || "",
        })
      }
      setIsLoading(false)
    }
    load()
  }, [router])

  const setField = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => { const n = { ...prev }; delete n[key as keyof FormErrors]; return n })
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSaving(true)
    setSaveMessage(null)

    const { error } = await updateProfileAction({
      full_name: form.full_name.trim(),
      phone: form.phone.trim() || undefined,
      university: form.university.trim() || undefined,
      year_of_study: form.year_of_study.trim() || undefined,
      major: form.major.trim() || undefined,
    })

    setIsSaving(false)

    if (error) {
      setSaveMessage({ type: "error", text: error })
    } else {
      setSaveMessage({ type: "success", text: "Profile updated successfully!" })
      setProfile((p: any) => ({ ...p, ...form }))
      setTimeout(() => setSaveMessage(null), 4000)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const initials = profile?.full_name
    ?.split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?"

  const isAdmin = profile?.role === "admin"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage your account information</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg shadow-blue-500/20">
              {initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900">{profile?.full_name || "Unknown User"}</h2>
              <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
                <Mail className="h-3.5 w-3.5" />
                {profile?.email}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isAdmin
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}>
                  <Shield className="h-3 w-3" />
                  {profile?.role === "admin" ? "Administrator" : "Student"}
                </span>
                {profile?.is_active && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle className="h-3 w-3" /> Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-gray-50">
            {profile?.university && (
              <div className="flex items-start gap-2">
                <GraduationCap className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">University</p>
                  <p className="text-sm font-medium text-gray-700">{profile.university}</p>
                </div>
              </div>
            )}
            {profile?.major && (
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Major</p>
                  <p className="text-sm font-medium text-gray-700">{profile.major}</p>
                </div>
              </div>
            )}
            {profile?.year_of_study && (
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Year of Study</p>
                  <p className="text-sm font-medium text-gray-700">{profile.year_of_study}</p>
                </div>
              </div>
            )}
            {profile?.created_at && (
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Member Since</p>
                  <p className="text-sm font-medium text-gray-700">{formatDate(profile.created_at)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900">Edit Information</h2>

          {/* Save message */}
          {saveMessage && (
            <div className={`flex items-center gap-2 p-3.5 rounded-xl text-sm font-medium ${
              saveMessage.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}>
              {saveMessage.type === "success"
                ? <CheckCircle className="h-4 w-4 flex-shrink-0" />
                : <AlertCircle className="h-4 w-4 flex-shrink-0" />
              }
              {saveMessage.text}
            </div>
          )}

          {/* Personal Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Personal</h3>

            <div className="space-y-1.5">
              <Label htmlFor="full_name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="full_name"
                  value={form.full_name}
                  onChange={setField("full_name")}
                  className={`pl-9 ${errors.full_name ? "border-red-400 focus:ring-red-400" : ""}`}
                  placeholder="Your full name"
                />
              </div>
              {errors.full_name && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />{errors.full_name}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={setField("phone")}
                  className="pl-9"
                  placeholder="+94 77 000 0000"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={profile?.email || ""}
                  className="pl-9 bg-gray-50 text-gray-500 cursor-not-allowed"
                  disabled
                  readOnly
                />
              </div>
              <p className="text-xs text-gray-400">Email cannot be changed here. Contact support if needed.</p>
            </div>
          </div>

          {/* Academic Section */}
          <div className="space-y-4 pt-2 border-t border-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />Academic Information
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="university">University / Institution</Label>
              <Input
                id="university"
                value={form.university}
                onChange={setField("university")}
                placeholder="e.g. University of Colombo"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="year_of_study">Year of Study</Label>
                <Input
                  id="year_of_study"
                  value={form.year_of_study}
                  onChange={setField("year_of_study")}
                  placeholder="e.g. 2nd Year"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="major">Major / Field</Label>
                <Input
                  id="major"
                  value={form.major}
                  onChange={setField("major")}
                  placeholder="e.g. Computer Science"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 border-t border-gray-50">
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-11 font-semibold"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" /> Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </span>
              )}
            </Button>
          </div>
        </form>

        {/* Quick links */}
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <Link href="/my-courses" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> My Courses
          </Link>
          <span className="text-gray-300">·</span>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
