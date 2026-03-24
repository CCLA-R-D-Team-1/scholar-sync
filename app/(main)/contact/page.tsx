"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitContactMessage } from "@/lib/data"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const set = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      await submitContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject,
        message: form.message,
      })
      setSuccess(true)
      setForm({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch {
      setError("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Mail className="h-14 w-14 mx-auto mb-6 text-blue-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-blue-200">{"We'd love to hear from you. Send us a message and we'll respond within 24 hours."}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  { icon: Mail, title: "Email", value: "info@scholarsync.lk", color: "bg-blue-100 text-blue-600" },
                  { icon: Phone, title: "Phone", value: "+94 11 234 5678", color: "bg-green-100 text-green-600" },
                  { icon: MapPin, title: "Address", value: "123 Education Lane, Colombo 03, Sri Lanka", color: "bg-purple-100 text-purple-600" },
                ].map(({ icon: Icon, title, value, color }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${color} flex-shrink-0`}><Icon className="h-5 w-5" /></div>
                    <div>
                      <p className="font-semibold text-gray-900">{title}</p>
                      <p className="text-gray-600 text-sm mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-2">Office Hours</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
                <p>Saturday: 9:00 AM – 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {success ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you for reaching out. We{"'"}ll get back to you within 24 hours.</p>
                  <Button onClick={() => setSuccess(false)}>Send Another Message</Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                  {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name <span className="text-red-500">*</span></Label>
                        <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Email <span className="text-red-500">*</span></Label>
                        <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+94 71 234 5678" />
                      </div>
                      <div className="space-y-2">
                        <Label>Subject <span className="text-red-500">*</span></Label>
                        <Input value={form.subject} onChange={(e) => set("subject", e.target.value)} placeholder="How can we help?" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Message <span className="text-red-500">*</span></Label>
                      <Textarea value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us more..." rows={5} required />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base">
                      <Send className="h-4 w-4 mr-2" />
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
