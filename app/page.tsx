"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Sparkles, MapPin, DollarSign, Compass } from "lucide-react"
import { TripCard } from "@/components/trip-card"
import { useTripSearch } from "@/hooks/use-trip-search"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { trips, isLoading } = useTripSearch(searchQuery)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-[#e5e7eb]/60 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-display font-bold gradient-text">Travel Assistant</div>
          <Link href="/explore">
            <Button variant="ghost" className="rounded-xl hover:bg-[#95D5B2]/10 transition-colors duration-200">Explore Plans</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-balance leading-tight">
              Plan Your Perfect Trip with <span className="gradient-text">AI Magic</span>
            </h1>
            <p className="text-xl text-[#6b7280] max-w-3xl mx-auto text-balance leading-relaxed">
              Create personalized itineraries, get budget breakdowns, discover hidden gems, and get real-time local
              insights. All without logging in.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
            <Link href="/generate">
              <Button size="lg" className="w-full sm:w-auto gap-3 green-gradient text-white rounded-2xl px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Sparkles className="w-5 h-5" />
                Generate a New Plan
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-3 rounded-2xl px-8 py-4 text-lg font-medium border-2 border-[#40916C] text-[#40916C] hover:bg-[#40916C] hover:text-white transition-all duration-300">
                <MapPin className="w-5 h-5" />
                Explore Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Latest Trips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#1a1a1a]">Discover Amazing Travel Plans</h2>
            <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">Explore community-created itineraries and get inspired for your next adventure</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
              <Input
                placeholder="Search by destination, interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg rounded-2xl border-2 border-[#e5e7eb] focus:border-[#40916C] focus:ring-[#40916C] bg-white shadow-sm"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-[#f8faf9] rounded-2xl animate-pulse soft-shadow" />
              ))}
            </div>
          ) : trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#95D5B2]/20 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-[#40916C]" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-medium text-[#1a1a1a]">
                    {searchQuery ? "No plans found" : "No plans yet"}
                  </p>
                  <p className="text-[#6b7280]">
                    {searchQuery ? "Try a different search term" : "Be the first to create an amazing travel plan!"}
                  </p>
                </div>
                {!searchQuery && (
                  <Link href="/generate">
                    <Button className="green-gradient text-white rounded-2xl px-6 py-3 font-medium hover:shadow-lg transition-all duration-300">
                      Create Your First Plan
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-[#f8faf9]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a1a1a] mb-4">Plan Like Never Before</h2>
          <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">Experience the future of travel planning with our AI-powered features</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Sparkles,
              title: "AI Itineraries",
              description: "AI-generated day-by-day plans tailored to your interests",
              color: "#2D6A4F",
            },
            {
              icon: DollarSign,
              title: "Budget Planner",
              description: "Smart expense tracking and daily budget breakdowns",
              color: "#40916C",
            },
            {
              icon: Compass,
              title: "Local Guides",
              description: "Real-time chat with AI for authentic local recommendations",
              color: "#52B788",
            },
            {
              icon: MapPin,
              title: "Deal Finder",
              description: "Get flight and hotel booking suggestions and best dates",
              color: "#74C69D",
            },
          ].map(({ icon: Icon, title, description, color }, i) => (
            <Card
              key={i}
              className="p-8 border-0 bg-white soft-shadow rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-lg text-[#1a1a1a]">{title}</h3>
                  <p className="text-[#6b7280] leading-relaxed">{description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb]/60 mt-20 py-16 bg-[#f8faf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold gradient-text">Travel Assistant</h3>
              <p className="text-[#6b7280] max-w-md mx-auto">Create and share your travel plans with the world. No signup required.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/generate">
                <Button variant="outline" className="rounded-xl border-[#40916C] text-[#40916C] hover:bg-[#40916C] hover:text-white transition-colors duration-200">
                  Start Planning
                </Button>
              </Link>
              <Link href="/explore">
                <Button variant="ghost" className="rounded-xl hover:bg-[#95D5B2]/10 transition-colors duration-200">
                  Explore Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
