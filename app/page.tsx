"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CodeXml, ArrowRight, Star, Users, BookOpen, Calendar, TrendingUp, Play, Award, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { initializeData, getCourses, getEvents } from "@/lib/data"
import { formatCurrency } from "@/lib/storage"

export default function HomePage() {
  useEffect(() => {
    initializeData()
  }, [])

  const featuredCourses = getCourses().slice(0, 3)
  const upcomingEvents = getEvents()
    .filter((event) => event.isFeatured)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-ocean-base">

      {/*hero section*/}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight-blue">
        {/*gradient overlay*/}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-sky/30 via-action-blue/40 to-blue-black">
          <div className="absolute inset-0 bg-glass-overlay" />
        </div>

        {/*floating elements*/}
        <div className="absolute top-20 left-10 w-30 h-30 bg-action-blue rounded-full blur-2xl animate-pulse opacity-20" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-muted-cyan rounded-full blur-xl animate-pulse delay-1000 opacity-15" />
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-deep-sky rounded-full blur-3xl animate-pulse delay-500 opacity-15" />

        {/*shadows*/}
        <div className="absolute top-0 left-0 w-40 h-40 border-2 border-muted-cyan/30 rounded-lg transform rotate-45 -translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 right-0 w-60 h-60 border-2 border-action-blue/30 rounded-full translate-x-20 translate-y-20" />

        {/*main content (hero)*/}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 flex flex-col md:flex-row items-center gap-12">
          {/*left side*/}
          <div className="animate-fade-in md:w-2/3 text-center md:text-left">
            <Badge className="mb-6 bg-glass-overlay text-clean-white border border-clean-white/20 hover:bg-glass-overlay/50 backdrop-blur-sm inline-flex">
              <CodeXml className="text-muted-cyan mr-2 animate-caret-blink" />
              Developing by: X-Coders
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-clean-white mb-6 leading-tight">
              Transform Your Future
              <span className="block mt-4 bg-gradient-to-r from-muted-cyan to-action-blue bg-clip-text text-transparent">
                With Elite Learning
              </span>
            </h1>
            
            <p className="text-md md:text-xl text-clean-white/80 mb-8 max-w-2xl leading-relaxed">
              Where ambition meets opportunity, world-class learning at your fingertips! Upgrade your future. Learn from the best, anytime, anywhere.
            </p>
          </div>

          {/*right side*/}
          <div className="animate-fade-in md:w-1/3 flex flex-col items-center md:items-start">
            {/*CTA*/}
            <div className="flex flex-col gap-6 w-full mb-12">
              <Button 
                size="lg" 
                className="bg-action-blue rounded-2xl text-clean-white hover:bg-blue-hover px-6 py-6 text-md lg:text-lg font-semibold transition-all duration-300 hover:shadow-lg w-full"
              >
                Explore Premium Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-clean-white rounded-2xl text-clean-white hover:bg-clean-white hover:text-deep-navy px-8 py-4 text-md lg:text-lg bg-transparent backdrop-blur-sm w-full"
              >
                <Play className="mr-2 h-5 w-5" />
                Experience Preview
              </Button>
            </div>

            {/*stats*/}
            <div className="grid grid-cols-2 gap-4 w-full backdrop-blur-lg bg-glass-overlay rounded-xl p-6 border border-clean-white/10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-muted-cyan mb-1">10K+</div>
                <div className="text-sm text-clean-white/80">Graduates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-muted-cyan mb-1">150+</div>
                <div className="text-sm text-clean-white/80">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-muted-cyan mb-1">85+</div>
                <div className="text-sm text-clean-white/80">Experts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-muted-cyan mb-1">98%</div>
                <div className="text-sm text-clean-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/*scrollong indicator*/}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-clean-white/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-muted-cyan rounded-full animate-scroll-indicator" />
          </div>
        </div>
      </section>

      {/*section - features*/}
      <section className="py-20 bg-sky-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-deep-sky text-deep-sky">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl font-bold text-deep-navy mb-4">The Premium Learning Experience</h2>
            <p className="text-xl text-muted-slate max-w-2xl mx-auto">
              Where academic rigor meets professional excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border-hint shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-deep-sky/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-deep-sky" />
                </div>
                <h3 className="text-2xl font-bold text-deep-navy mb-4">Academic Excellence</h3>
                <p className="text-muted-slate leading-relaxed">
                  Rigorous curriculum designed by top-tier educators and industry leaders for maximum career impact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border-hint shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-action-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-8 w-8 text-action-blue" />
                </div>
                <h3 className="text-2xl font-bold text-deep-navy mb-4">Career Integration</h3>
                <p className="text-muted-slate leading-relaxed">
                  Direct pathways to top employers with our corporate partnerships and recruitment programs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border-hint shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-muted-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-muted-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-deep-navy mb-4">Prestige & Recognition</h3>
                <p className="text-muted-slate leading-relaxed">
                  Earn credentials valued by employers worldwide, backed by our reputation for excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/*section - courses*/}
      <section className="py-20 bg-ocean-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-deep-sky text-deep-sky">
              Featured Programs
            </Badge>
            <h2 className="text-4xl font-bold text-deep-navy mb-4">Our Premier Course Offerings</h2>
            <p className="text-xl text-muted-slate max-w-2xl mx-auto">
              Select from our most prestigious academic programs
            </p>
          </div>

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

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-deep-sky text-deep-sky" asChild>
              <Link href="/courses">
                Browse All Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/*section - events*/}
      <section className="py-20 bg-gradient-to-r from-deep-sky/95 to-action-blue/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-glass-overlay text-clean-white border-clean-white/20">
              Exclusive Events
            </Badge>
            <h2 className="text-4xl font-bold text-clean-white mb-4">Upcoming Academic Events</h2>
            <p className="text-xl text-clean-white/80 max-w-2xl mx-auto">
              Reserve your spot at our prestigious lectures and seminars
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="border-0 bg-glass-overlay backdrop-blur-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 relative">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={400}
                      height={300}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-sky/30 to-transparent" />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-muted-cyan text-deep-navy">{event.category}</Badge>
                      <div className="text-right">
                        <div className="text-xl font-bold text-muted-cyan">
                          {event.price === 0 ? "COMPLIMENTARY" : formatCurrency(event.price)}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-clean-white mb-2">{event.title}</h3>
                    <p className="text-clean-white/70 mb-4 line-clamp-2">{event.shortDescription}</p>
                   
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-clean-white">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.startDate).toLocaleDateString("en-LK", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center text-sm text-clean-white">
                        <Users className="h-4 w-4 mr-2" />
                        {event.bookedCount}/{event.capacity} registered
                      </div>
                    </div>
                    <Button className="w-full bg-action-blue hover:bg-blue-hover" asChild>
                      <Link href={`/events/${event.slug}`}>
                        Register Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/*section - testimonials*/}
      <section className="py-20 bg-sky-shell">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deep-navy mb-4">What Our Students Say</h2>
            <p className="text-xl text-muted-slate max-w-2xl mx-auto">
              Hear from thousands of successful graduates who transformed their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border-hint shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-muted-cyan fill-current" />
                  ))}
                </div>
                <p className="text-muted-slate mb-6 leading-relaxed">
                  "The web development course completely changed my career trajectory. The instructors are world-class
                  and the curriculum is cutting-edge."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-deep-sky/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-deep-sky font-semibold">AS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-deep-navy">Amara Silva</div>
                    <div className="text-sm text-muted-slate">Full Stack Developer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-hint shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-muted-cyan fill-current" />
                  ))}
                </div>
                <p className="text-muted-slate mb-6 leading-relaxed">
                  "The data science program gave me the skills I needed to transition into AI. The hands-on projects
                  were incredibly valuable."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-action-blue/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-action-blue font-semibold">RK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-deep-navy">Rohan Kumar</div>
                    <div className="text-sm text-muted-slate">Data Scientist</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border-hint shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-muted-cyan fill-current" />
                  ))}
                </div>
                <p className="text-muted-slate mb-6 leading-relaxed">
                  "The digital marketing course helped me grow my business by 300%. The strategies are practical and
                  immediately applicable."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted-cyan/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-muted-cyan font-semibold">NP</span>
                  </div>
                  <div>
                    <div className="font-semibold text-deep-navy">Nisha Perera</div>
                    <div className="text-sm text-muted-slate">Marketing Director</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/*section - CTA*/}
      <section className="py-20 bg-gradient-to-r from-deep-sky to-action-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-clean-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-lg lg:text-xl text-clean-white/90 mb-8 leading-relaxed">
            Join thousands of successful students who have advanced their careers with Campus. Start your journey today
            with our premium courses and expert instruction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-clean-white text-action-blue hover:bg-soft-ice px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/courses">
                Browse Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-clean-white text-clean-white hover:bg-clean-white hover:text-deep-sky px-8 py-4 text-lg bg-transparent"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
