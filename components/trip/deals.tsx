"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface TripDealsProps {
  deals: Record<string, any>
}

export function TripDeals({ deals }: TripDealsProps) {
  const platforms = [
    { name: "Booking.com", url: "https://booking.com", icon: "🏨" },
    { name: "Skyscanner", url: "https://skyscanner.com", icon: "✈️" },
    { name: "Expedia", url: "https://expedia.com", icon: "🌍" },
    { name: "Google Flights", url: "https://google.com/flights", icon: "🛫" },
  ]

  return (
    <Card className="p-8 border-0 bg-white/50 backdrop-blur space-y-8">
      <h2 className="text-2xl font-bold">Flight & Hotel Deals</h2>

      {/* Best Booking Dates */}
      <Card className="p-6 border-0 bg-gradient-to-br from-accent/10 to-secondary/10">
        <h3 className="font-semibold mb-3">Best Time to Book</h3>
        <p className="text-lg mb-3">{deals.best_booking_dates || "2-3 months in advance"}</p>
        <p className="text-sm text-muted-foreground">
          Booking your flight and accommodation at this time typically offers the best prices.
        </p>
      </Card>

      {/* Recommended Platforms */}
      <div>
        <h3 className="font-semibold mb-4">Where to Book</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="w-full justify-between bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span>{platform.name}</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          ))}
        </div>
      </div>

      {/* Money Saving Tips */}
      <Card className="p-6 border-0 bg-gradient-to-br from-primary/10 to-primary/5">
        <h3 className="font-semibold mb-4">Money Saving Tips</h3>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Be flexible with dates to find cheaper flights</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Consider booking flights on Tuesday-Thursday</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Use hotel comparison sites for better deals</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Sign up for price alerts on booking platforms</span>
          </li>
        </ul>
      </Card>
    </Card>
  )
}
