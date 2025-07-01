"use client"

import type { AuthUser, User } from "@/types"
import { getItem, setItem, removeItem } from "./storage"
import { getUserByEmail } from "./data"

const AUTH_KEY = "campus_auth_user"

export function getCurrentUser(): AuthUser | null {
  return getItem<AuthUser | null>(AUTH_KEY, null)
}

export function setCurrentUser(user: AuthUser): void {
  setItem(AUTH_KEY, user)
  // set cookie for middleware
  if (typeof document !== "undefined") {
    document.cookie = `campus_auth_user=${JSON.stringify(user)}; path=/; max-age=${60 * 60 * 24 * 7}`
  }
}

export function logout(): void {
  removeItem(AUTH_KEY)
  // clear cookie
  if (typeof document !== "undefined") {
    document.cookie = "campus_auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.role === "admin"
}

export function requireAuth(): AuthUser {
  const user = getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export function requireAdmin(): AuthUser {
  const user = requireAuth()
  if (user.role !== "admin") {
    throw new Error("Admin access required")
  }
  return user
}

export function authenticateUser(email: string, password: string): User | null {
  const user = getUserByEmail(email)

  if (!user) {
    return null
  }

  // For demo purposes, accept any password with 6+ characters
  // In production, you'd verify against a hashed password
  if (password.length >= 6) {
    return user
  }

  return null
}
