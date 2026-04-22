"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, BookOpen, Users, LogOut, ChevronLeft, ChevronRight,
  Home, MessageSquare, GraduationCap, CalendarDays, ClipboardList,
  Award, FileText, FolderOpen, UserCheck, BarChart3, Layers, PhoneCall
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "@/lib/auth"

const navigation = [
  { name: "Dashboard",        href: "/admin",                    icon: LayoutDashboard },
  { name: "Leads",            href: "/admin/leads",              icon: PhoneCall },
  { name: "Students",         href: "/admin/students",           icon: Users },
  { name: "Courses",          href: "/admin/courses",            icon: BookOpen },
  { name: "Modules",          href: "/admin/modules",            icon: Layers },
  { name: "Batches",          href: "/admin/batches",            icon: CalendarDays },
  { name: "Trainers",         href: "/admin/trainers",           icon: UserCheck },
  { name: "Enrollments",      href: "/admin/enrollments",        icon: ClipboardList },
  { name: "Attendance",       href: "/admin/attendance",         icon: CalendarDays },
  { name: "Assessments",      href: "/admin/assessments",        icon: FileText },
  { name: "Certificates",     href: "/admin/certificates",       icon: Award },
  { name: "Resources",        href: "/admin/resources",          icon: FolderOpen },
  { name: "Reports",          href: "/admin/reports",            icon: BarChart3 },
  { name: "Messages",         href: "/admin/messages",           icon: MessageSquare },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push("/auth/login")
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)

  return (
    <div className={cn("flex flex-col h-full bg-[#0A1A2F] text-white transition-all duration-300 flex-shrink-0", collapsed ? "w-16" : "w-64")}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm leading-none">CADD Centre</span>
              <p className="text-xs text-gray-400">ASMS Admin</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {!collapsed && (
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-1">
            Management
          </p>
        )}
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={collapsed ? item.name : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
              isActive(item.href)
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/10",
              collapsed && "justify-center"
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/"
          title={collapsed ? "View Site" : undefined}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all",
            collapsed && "justify-center"
          )}
        >
          <Home className="h-4 w-4 flex-shrink-0" />
          {!collapsed && "View Site"}
        </Link>
        <button
          onClick={handleLogout}
          title={collapsed ? "Sign Out" : undefined}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:text-white hover:bg-red-600/20 transition-all",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  )
}
