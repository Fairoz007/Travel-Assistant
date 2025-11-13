"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"

interface Trip {
  id: string
  slug: string
  title: string
  destination: string
  start_date: string
  end_date: string
  budget: string
  interests: string[]
}

export function useTripSearch(query: string) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const searchTrips = async () => {
      if (query.length === 0) {
        // Fetch latest trips
        const supabase = getSupabaseClient()
        setIsLoading(true)
        const { data, error } = await supabase
          .from("trips")
          .select("id, slug, title, destination, start_date, end_date, budget, interests")
          .order("created_at", { ascending: false })
          .limit(6)

        if (error) console.error("Error fetching trips:", error)
        setTrips(data || [])
        setIsLoading(false)
        return
      }

      // Search trips
      const supabase = getSupabaseClient()
      setIsLoading(true)
      const { data, error } = await supabase
        .from("trips")
        .select("id, slug, title, destination, start_date, end_date, budget, interests")
        .or(`title.ilike.%${query}%,destination.ilike.%${query}%,interests.cs.{${query}}`)
        .limit(6)

      if (error) console.error("Error searching trips:", error)
      setTrips(data || [])
      setIsLoading(false)
    }

    const timeout = setTimeout(searchTrips, 300)
    return () => clearTimeout(timeout)
  }, [query])

  return { trips, isLoading }
}
