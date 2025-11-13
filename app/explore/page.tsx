"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"
import { TripCard } from "@/components/trip-card"
// Using the premium DatePicker component with advanced styling
import DatePicker from "@/components/ui/custom-date-picker"

const DESTINATIONS = ["All"]
const BUDGETS = ["All", "Under ₹50K", "₹50K-₹1L", "₹1L-₹2.5L", "₹2.5L+"]

export default function ExplorePage() {
  const [trips, setTrips] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDestination, setSelectedDestination] = useState("All")
  const [selectedBudget, setSelectedBudget] = useState("All")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true)
      const supabase = getSupabaseClient()

      let query = supabase
        .from("trips")
        .select("id, slug, title, destination, start_date, end_date, budget, interests")
        .order("created_at", { ascending: false })

      if (selectedDestination !== "All") {
        query = query.eq("destination", selectedDestination)
      }

      if (selectedBudget !== "All") {
        query = query.eq("budget", selectedBudget)
      }

      if (startDate) {
        query = query.gte("start_date", startDate.toISOString().split('T')[0])
      }

      if (endDate) {
        query = query.lte("end_date", endDate.toISOString().split('T')[0])
      }

      const { data, error } = await query

      if (error) console.error("Error fetching trips:", error)
      setTrips(data || [])
      setIsLoading(false)
    }

    fetchTrips()
  }, [selectedDestination, selectedBudget, startDate, endDate])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-[#e5e7eb]/60 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 rounded-xl hover:bg-[#95D5B2]/10 transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text">Explore Travel Plans</h1>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">Discover amazing itineraries created by the community</p>
          </div>

          {/* Filters */}
          <div className="space-y-8 bg-white soft-shadow p-8 rounded-3xl border-0">
            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold text-[#1a1a1a]">Destination</h3>
              <div className="flex flex-wrap gap-3">
                {DESTINATIONS.map((dest) => (
                  <Badge
                    key={dest}
                    onClick={() => setSelectedDestination(dest)}
                    className={`cursor-pointer transition-all duration-200 rounded-2xl px-4 py-2 text-sm font-medium ${
                      selectedDestination === dest
                        ? "green-gradient text-white shadow-md"
                        : "bg-[#f8faf9] text-[#6b7280] border-2 border-[#e5e7eb] hover:border-[#40916C] hover:bg-[#40916C]/5"
                    }`}
                  >
                    {dest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-display font-semibold text-[#1a1a1a]">Budget Range</h3>
              <div className="flex flex-wrap gap-3">
                {BUDGETS.map((budget) => (
                  <Badge
                    key={budget}
                    onClick={() => setSelectedBudget(budget)}
                    className={`cursor-pointer transition-all duration-200 rounded-2xl px-4 py-2 text-sm font-medium ${
                      selectedBudget === budget
                        ? "green-gradient text-white shadow-md"
                        : "bg-[#f8faf9] text-[#6b7280] border-2 border-[#e5e7eb] hover:border-[#40916C] hover:bg-[#40916C]/5"
                    }`}
                  >
                    {budget}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-display font-bold text-[#2D6A4F] tracking-tight">
                Travel Dates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  placeholder="Select your departure date"
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  placeholder="Select your return date"
                />
              </div>
            </div>
          </div>

          {/* Trip Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
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
                  <p className="text-xl font-medium text-[#1a1a1a]">No plans found</p>
                  <p className="text-[#6b7280]">Try adjusting your filters or check back later for new plans</p>
                </div>
                <Link href="/generate">
                  <Button className="green-gradient text-white rounded-2xl px-6 py-3 font-medium hover:shadow-lg transition-all duration-300">
                    Create the First Plan
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
