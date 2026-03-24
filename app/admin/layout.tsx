"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { getCurrentUser } from "@/lib/auth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) {
        router.push("/auth/login?redirect=/admin&message=Please log in to access the admin panel")
        return
      }
      if (user.role !== "admin") {
        // Student trying to access admin — send to their dashboard
        router.push("/dashboard")
        return
      }
      setIsAuthorized(true)
      setIsLoading(false)
    })
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-sm text-gray-500 mt-3">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) return null

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
