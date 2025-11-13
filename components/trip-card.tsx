import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, DollarSign } from "lucide-react"

interface TripCardProps {
  trip: {
    id: string
    slug: string
    title: string
    destination: string
    start_date: string
    end_date: string
    budget: string
    interests: string[]
  }
}

export function TripCard({ trip }: TripCardProps) {
  const days = Math.ceil(
    (new Date(trip.end_date).getTime() - new Date(trip.start_date).getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <Link href={`/trip/${trip.slug}`}>
      <Card className="overflow-hidden border-0 bg-white h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl soft-shadow rounded-2xl">
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-lg text-balance line-clamp-2 text-foreground">{trip.title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#40916C]" />
              {trip.destination}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#52B788]" />
                {days} days
              </span>
              <span className="text-muted-foreground flex items-center gap-2 font-medium">
                <DollarSign className="w-4 h-4 text-[#74C69D]" />
                ₹{trip.budget}
              </span>
            </div>
          </div>

          {trip.interests && trip.interests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {trip.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} className="text-xs bg-[#95D5B2]/20 text-[#40916C] border-0 rounded-xl px-3 py-1 font-medium">
                  {interest}
                </Badge>
              ))}
              {trip.interests.length > 3 && (
                <Badge className="text-xs bg-[#95D5B2]/20 text-[#40916C] border-0 rounded-xl px-3 py-1 font-medium">
                  +{trip.interests.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
