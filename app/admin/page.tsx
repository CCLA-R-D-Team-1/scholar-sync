"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, BookOpen, Calendar, Users, TrendingUp, ArrowUpRight, MoreHorizontal } from "lucide-react"
import { getDashboardStats } from "@/lib/data"
import { formatCurrency, formatDateTime } from "@/lib/utils"

export default function AdminDashboard() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getDashboardStats>> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setError("Failed to load stats"))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-8 bg-gray-200 rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return <div className="text-red-500 p-4">{error || "No data available"}</div>
  }

  const statCards = [
    { title: "Total Revenue", value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Active Courses", value: stats.totalCourses.toString(), icon: BookOpen, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Total Events", value: stats.totalEvents.toString(), icon: Calendar, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Total Students", value: stats.totalStudents.toString(), icon: Users, color: "text-orange-600", bgColor: "bg-orange-100" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">{"Welcome back! Here's what's happening."}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" asChild><Link href="/admin/courses/new">Add Course</Link></Button>
          <Button asChild><Link href="/admin/events/new">Add Event</Link></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600 ml-1">Live data</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Monthly Revenue
              <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.monthlyRevenue.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 w-16">{month.month}</span>
                  <div className="flex items-center space-x-2 flex-1 mx-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max((month.revenue / (Math.max(...stats.monthlyRevenue.map((m) => m.revenue)) || 1)) * 100, 2)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-28 text-right">{formatCurrency(month.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Enrollments
              <Button variant="ghost" size="sm" asChild><Link href="/admin/courses">View All</Link></Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentEnrollments.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">No enrollments yet</p>
            ) : (
              <div className="space-y-3">
                {stats.recentEnrollments.slice(0, 6).map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm line-clamp-1">
                        {(enrollment as any).profiles?.full_name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {(enrollment as any).courses?.title || "Unknown course"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm text-gray-900">{formatCurrency(enrollment.amount_paid)}</p>
                      <Badge className="text-xs bg-green-100 text-green-800 mt-1">{enrollment.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Enrollment Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Student</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Course</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEnrollments.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{(e as any).profiles?.full_name || "—"}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{(e as any).courses?.title || "—"}</td>
                    <td className="py-3 px-4 font-semibold">{formatCurrency(e.amount_paid)}</td>
                    <td className="py-3 px-4">
                      <Badge className={e.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {e.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{formatDateTime(e.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
