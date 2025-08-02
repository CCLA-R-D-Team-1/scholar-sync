"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, User, Search, X, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCurrentUser, logout } from "@/lib/auth"
import type { AuthUser } from "@/types"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    window.location.href = "/"
  }

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="w-full px-4 pt-15">
        <nav className={`backdrop-blur-md rounded-3xl mx-auto max-w-7xl shadow-lg border transition-all ${
          isScrolled 
            ? "bg-deep-sky/80 border-muted-slate/30 w-55 hover:w-full overflow-hidden duration-600 ease-out" 
            : "bg-deep-sky/30 border-transparent duration-500 ease-in-out"
        }`}>
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 group">
              {/*logo and name*/}
              <Link href="/" className="flex items-center space-x-2 min-w-max">
                <div className="relative">
                  <GraduationCap className="h-7 w-7 text-muted-cyan animate-pulse" />
                  <div className="absolute inset-0 h-7 w-7 bg-muted-cyan/20 rounded-full blur-sm"></div>
                </div>
                <span className="text-clean-white text-xl font-bold tracking-tight transition-all duration-300">
                  Scholar Sync
                </span>
              </Link>

              {/*desktop nav - left side*/}
              <div className={`hidden md:flex items-center transition-all duration-300 ${
                isScrolled ? "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0" : "opacity-100"
              }`}>
                <div className="flex items-center space-x-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-action-blue/30 rounded-lg ${
                        pathname === item.href
                          ? "text-clean-white bg-action-blue/50"
                          : "text-muted-slate hover:text-clean-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/*desktop nav - right side*/}
              <div className={`hidden md:flex items-center space-x-4 transition-all duration-300 ${
                isScrolled ? "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0" : "opacity-100"
              }`}>
                {/*search*/}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-slate" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="pl-10 w-64 bg-deep-sky/50 border-muted-slate/30 text-clean-white placeholder:text-muted-slate"
                  />
                </div>

                {/*user dropdown*/}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-slate hover:text-clean-white hover:bg-action-blue/30"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {user.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-deep-sky border-muted-slate/30">
                      <DropdownMenuItem asChild className="text-muted-slate hover:bg-action-blue/30">
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="text-muted-slate hover:bg-action-blue/30">
                        <Link href="/bookings">My Bookings</Link>
                      </DropdownMenuItem>
                      {user.role === "admin" && (
                        <>
                          <DropdownMenuSeparator className="bg-muted-slate/30" />
                          <DropdownMenuItem asChild className="text-muted-slate hover:bg-action-blue/30">
                            <Link href="/admin">Admin Dashboard</Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator className="bg-muted-slate/30" />
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="text-muted-slate hover:bg-action-blue/30"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-muted-slate hover:text-clean-white hover:bg-action-blue/30"
                    >
                      <Link href="/auth/login">Login</Link>
                    </Button>
                    <Button 
                      size="sm" 
                      asChild 
                      className="bg-gradient-to-b from-action-blue via-blue-600 to-blue-hover hover:from-muted-cyan/95 hover:via-action-blue/95 hover:to-blue-hover/95 text-ocean-base/95 font-bold px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-muted-cyan/30 border-0"
                    >
                      <Link href="/auth/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>

              {/*mobile hamburger*/}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-slate hover:text-clean-white hover:bg-action-blue/30 rounded-lg"
                    >
                      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-deep-sky/80 backdrop-blur-md border-muted-slate/30 rounded-l-2xl">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <GraduationCap className="h-6 w-6 text-muted-cyan" />
                          <div className="absolute inset-0 h-6 w-6 bg-muted-cyan/20 rounded-full blur-sm"></div>
                        </div>
                        <span className="text-clean-white text-lg font-bold">
                          Scholar Sync
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="text-muted-slate hover:text-clean-white hover:bg-action-blue/30 rounded-lg"
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg ${
                            pathname === item.href
                              ? "text-clean-white bg-action-blue/50"
                              : "text-muted-slate hover:text-clean-white hover:bg-action-blue/30"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}

                      <div className="pt-4">
                        {user ? (
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-muted-cyan/10 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-muted-cyan" />
                              </div>
                              <div>
                                <p className="font-medium text-clean-white">{user.name}</p>
                                <p className="text-sm text-muted-slate">{user.email}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Button 
                                variant="outline" 
                                className="w-full justify-start bg-transparent text-muted-slate border-muted-slate/30 hover:bg-action-blue/30 hover:text-clean-white" 
                                asChild
                              >
                                <Link href="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full justify-start bg-transparent text-muted-slate border-muted-slate/30 hover:bg-action-blue/30 hover:text-clean-white" 
                                asChild
                              >
                                <Link href="/bookings" onClick={() => setIsOpen(false)}>My Bookings</Link>
                              </Button>
                              {user.role === "admin" && (
                                <Button 
                                  variant="outline" 
                                  className="w-full justify-start bg-transparent text-muted-slate border-muted-slate/30 hover:bg-action-blue/30 hover:text-clean-white" 
                                  asChild
                                >
                                  <Link href="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent text-muted-slate border-muted-slate/30 hover:bg-action-blue/30 hover:text-clean-white"
                                onClick={() => {
                                  handleLogout()
                                  setIsOpen(false)
                                }}
                              >
                                Logout
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Button 
                              variant="outline" 
                              className="w-full bg-transparent text-muted-slate border-muted-slate/30 hover:bg-action-blue/30 hover:text-clean-white" 
                              asChild
                            >
                              <Link href="/auth/login" onClick={() => setIsOpen(false)}>Login</Link>
                            </Button>
                            <Button 
                              className="w-full bg-gradient-to-r from-muted-cyan via-action-blue to-blue-hover hover:from-muted-cyan/95 hover:via-action-blue/95 hover:to-blue-hover/95 text-deep-navy font-bold py-3 rounded-full transition-all duration-200 shadow-lg"
                              asChild
                            >
                              <Link href="/auth/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
export default Navbar