import React from 'react'
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCourses } from "@/lib/data"
import { formatCurrency } from "@/lib/storage"


const CourseCard = () => {
    const featuredCourses = getCourses().slice(0, 3)


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden border-border-hint hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-deep-sky text-clean-white">{course.level}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-muted-cyan text-deep-navy">
                      {course.duration}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-slate">{course.category}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-muted-cyan fill-current" />
                      <span className="text-sm text-muted-slate ml-1">{course.rating} ({course.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-deep-navy mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-muted-slate mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-slate">
                      <Users className="h-4 w-4 mr-1" />
                      {course.enrolledCount} enrolled
                    </div>
                    <div className="text-right">
                      {course.originalPrice && (
                        <span className="text-sm text-muted-slate line-through">
                          {formatCurrency(course.originalPrice)}
                        </span>
                      )}
                      <div className="text-xl font-bold text-deep-sky">{formatCurrency(course.price)}</div>
                    </div>
                  </div>
                  <Button className="w-full bg-deep-sky hover:bg-blue-hover" asChild>
                    <Link href={`/courses/${course.slug}`}>
                      View Program Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
  )
}

export default CourseCard