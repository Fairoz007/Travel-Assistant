"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ItineraryDay {
  day: number
  title: string
  activities: string[]
  estimated_cost?: number
}

interface TripItineraryProps {
  itinerary: ItineraryDay[]
}

export function TripItinerary({ itinerary }: TripItineraryProps) {
  return (
    <Card className="p-8 border-0 bg-white/50 backdrop-blur space-y-6">
      <h2 className="text-2xl font-bold">Day-by-Day Itinerary</h2>
      <div className="space-y-4">
        {Array.isArray(itinerary) && itinerary.length > 0 ? (
          itinerary.map((day: ItineraryDay, idx: number) => (
            <Card key={idx} className="p-6 border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">Day {day.day || idx + 1}</Badge>
                    <h3 className="text-lg font-semibold">{day.title}</h3>
                  </div>
                  {day.estimated_cost && (
                    <span className="text-lg font-semibold text-primary">₹{day.estimated_cost}</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {Array.isArray(day.activities) &&
                    day.activities.map((activity: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary font-bold">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No itinerary available</p>
        )}
      </div>
    </Card>
  )
}
