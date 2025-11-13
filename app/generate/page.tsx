"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

const INTERESTS = [
  "Adventure",
  "Culture",
  "Food",
  "Nature",
  "History",
  "Art",
  "Beach",
  "Mountains",
  "Shopping",
  "Photography",
]

const TRAVEL_STYLES = ["Budget", "Comfortable", "Luxury", "Backpacking"]

export default function GeneratePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    destination: "",
    from: "",
    startDate: "",
    endDate: "",
    budget: "",
    style: "Comfortable",
    interests: [] as string[],
    notes: "",
  })

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/trips/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to generate trip")

      const { slug } = await response.json()
      router.push(`/trip/${slug}`)
    } catch (error) {
      console.error("Error generating trip:", error)
      alert("Failed to generate trip. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-[#e5e7eb]/60 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 rounded-xl hover:bg-[#95D5B2]/10 transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text">Plan Your Journey</h1>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">Tell us about your ideal trip and let AI create the perfect itinerary for you</p>
          </div>

          <Card className="p-8 md:p-12 border-0 bg-white soft-shadow rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* From and Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-display font-semibold text-[#1a1a1a] block">From</label>
                  <Input
                    required
                    placeholder="e.g., New York"
                    value={formData.from}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        from: e.target.value,
                      }))
                    }
                    className="rounded-2xl border-2 border-[#e5e7eb] focus:border-[#40916C] focus:ring-[#40916C] py-4 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-display font-semibold text-[#1a1a1a] block">Destination</label>
                  <Input
                    required
                    placeholder="e.g., Tokyo, Paris, Bali"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }))
                    }
                    className="rounded-2xl border-2 border-[#e5e7eb] focus:border-[#40916C] focus:ring-[#40916C] py-4 text-lg"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-display font-semibold text-[#1a1a1a] block">Start Date</label>
                  <Input
                    required
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="rounded-2xl border-2 border-[#e5e7eb] focus:border-[#40916C] focus:ring-[#40916C] py-4 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-display font-semibold text-[#1a1a1a] block">End Date</label>
                  <Input
                    required
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="rounded-2xl border-2 border-[#e5e7eb] focus:border-[#40916C] focus:ring-[#40916C] py-4 text-lg"
                  />
                </div>
              </div>

              {/* Budget and Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-display font-semibold text-[#1a1a1a] block">Budget (₹)</label>
                  <Input
                    required
                    placeholder="e.g., 100000"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        budget: e.target.value,
                      }))
                    }
                    className="rounded-2xl border-2 border-[#e5e7eb] focus:border-[#40916C] focus:ring-[#40916C] py-4 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-display font-semibold text-[#1a1a1a] block">Travel Style</label>
                  <select
                    className="w-full px-4 py-4 rounded-2xl border-2 border-[#e5e7eb] bg-white focus:border-[#40916C] focus:ring-[#40916C] text-lg"
                    value={formData.style}
                    onChange={(e) => setFormData((prev) => ({ ...prev, style: e.target.value }))}
                  >
                    {TRAVEL_STYLES.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <label className="text-sm font-display font-semibold text-[#1a1a1a] block">Interests</label>
                <div className="flex flex-wrap gap-3">
                  {INTERESTS.map((interest) => (
                    <Badge
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`cursor-pointer transition-all duration-200 rounded-2xl px-4 py-2 text-sm font-medium ${
                        formData.interests.includes(interest)
                          ? "green-gradient text-white shadow-md"
                          : "bg-[#f8faf9] text-[#6b7280] border-2 border-[#e5e7eb] hover:border-[#40916C] hover:bg-[#40916C]/5"
                      }`}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <label className="text-sm font-display font-semibold text-[#1a1a1a] block">Additional Notes (Optional)</label>
                <Textarea
                  placeholder="Any specific preferences, travel companions, accessibility needs..."
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  className="min-h-32 rounded-2xl border-2 border-[#e5e7eb] focus:border-[#40916C] focus:ring-[#40916C] text-lg resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full gap-3 green-gradient text-white rounded-2xl py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {isLoading ? (
                  <>
                    <Spinner className="w-5 h-5" />
                    Generating Your Perfect Trip...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate My Trip Plan
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  )
}
