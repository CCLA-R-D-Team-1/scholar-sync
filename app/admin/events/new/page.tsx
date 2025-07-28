"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { createEvent } from "@/lib/data"

export default function NewEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    capacity: "",
    price: "",
    category: "",
    organizer: "",
    image: "",
    tags: "",
    isActive: true,
    isFeatured: false,
  })

  const [agenda, setAgenda] = useState([{ time: "", title: "", speaker: "" }])
  const [speakers, setSpeakers] = useState([{ name: "", title: "", bio: "", image: "" }])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-generate slug from title
    if (field === "title") {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setFormData((prev) => ({
        ...prev,
        slug,
      }))
    }
  }

  const addAgendaItem = () => {
    setAgenda([...agenda, { time: "", title: "", speaker: "" }])
  }

  const removeAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index))
  }

  const updateAgendaItem = (index: number, field: string, value: string) => {
    const updated = agenda.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setAgenda(updated)
  }

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: "", title: "", bio: "", image: "" }])
  }

  const removeSpeaker = (index: number) => {
    setSpeakers(speakers.filter((_, i) => i !== index))
  }

  const updateSpeaker = (index: number, field: string, value: string) => {
    const updated = speakers.map((speaker, i) => (i === index ? { ...speaker, [field]: value } : speaker))
    setSpeakers(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const eventData = {
        ...formData,
        capacity: Number.parseInt(formData.capacity) || 0,
        bookedCount: 0,
        price: Number.parseFloat(formData.price) || 0,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        gallery: [],
        agenda: agenda.filter((item) => item.time && item.title),
        speakers: speakers.filter((speaker) => speaker.name),
      }

      createEvent(eventData)
      router.push("/admin/events")
    } catch (error) {
      console.error("Error creating event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/events">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-1">Add a new event to your calendar</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="event-url-slug"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                    placeholder="Brief description for cards"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Full Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter detailed event description"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organizer">Organizer *</Label>
                    <Input
                      id="organizer"
                      value={formData.organizer}
                      onChange={(e) => handleInputChange("organizer", e.target.value)}
                      placeholder="Event organizer"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      placeholder="e.g., Technology"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date & Venue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange("endTime", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="venue">Venue *</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => handleInputChange("venue", e.target.value)}
                    placeholder="Event venue address"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange("capacity", e.target.value)}
                    placeholder="Maximum attendees"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Event Agenda
                  <Button type="button" variant="outline" size="sm" onClick={addAgendaItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agenda.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={item.time}
                        onChange={(e) => updateAgendaItem(index, "time", e.target.value)}
                      />
                    </div>
                    <div className="col-span-5">
                      <Label>Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateAgendaItem(index, "title", e.target.value)}
                        placeholder="Agenda item title"
                      />
                    </div>
                    <div className="col-span-4">
                      <Label>Speaker (optional)</Label>
                      <Input
                        value={item.speaker}
                        onChange={(e) => updateAgendaItem(index, "speaker", e.target.value)}
                        placeholder="Speaker name"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAgendaItem(index)}
                        disabled={agenda.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Speakers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Speakers
                  <Button type="button" variant="outline" size="sm" onClick={addSpeaker}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Speaker
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {speakers.map((speaker, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Speaker {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpeaker(index)}
                        disabled={speakers.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={speaker.name}
                          onChange={(e) => updateSpeaker(index, "name", e.target.value)}
                          placeholder="Speaker name"
                        />
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={speaker.title}
                          onChange={(e) => updateSpeaker(index, "title", e.target.value)}
                          placeholder="Job title"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Bio</Label>
                      <Textarea
                        value={speaker.bio}
                        onChange={(e) => updateSpeaker(index, "bio", e.target.value)}
                        placeholder="Speaker biography"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={speaker.image}
                        onChange={(e) => updateSpeaker(index, "image", e.target.value)}
                        placeholder="https://example.com/speaker.jpg"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="price">Price (LKR) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0 for free events"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter 0 for free events</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="image">Event Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    placeholder="Technology, Innovation, Networking"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                  />
                  <Label htmlFor="isActive">Active Event</Label>
                </div>
                <p className="text-sm text-gray-500"> {`Inactive events won't be visible to users`}</p>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                  />
                  <Label htmlFor="isFeatured">Featured Event</Label>
                </div>
                <p className="text-sm text-gray-500">Featured events appear on the homepage</p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Creating..." : "Create Event"}
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/admin/events">Cancel</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
