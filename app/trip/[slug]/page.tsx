import { getSupabaseServer } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, MapPin, Calendar, DollarSign, Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TripItinerary } from "@/components/trip/itinerary"
import { TripBudgetPlanner } from "@/components/trip/budget-planner"
import { TripDeals } from "@/components/trip/deals"
import { LocalGuideChat } from "@/components/trip/local-guide-chat"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const supabase = await getSupabaseServer()
  const { data: trip } = await supabase.from("trips").select("*").eq("slug", slug).single()

  return {
    title: trip?.title || "Travel Plan",
    description: `Travel plan for ${trip?.destination}`,
  }
}

export default async function TripPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const supabase = await getSupabaseServer()
  
  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!trip) {
    notFound()
  }

  const days = Math.ceil(
    (new Date(trip.end_date).getTime() - new Date(trip.start_date).getTime()) / (1000 * 60 * 60 * 24),
  )

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[#1a1a1a]">{trip.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-[#6b7280]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#40916C]/10 rounded-xl flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-[#40916C]" />
                </div>
                <span className="font-medium">{trip.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#52B788]/10 rounded-xl flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-[#52B788]" />
                </div>
                <span className="font-medium">
                  {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#74C69D]/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-[#74C69D]" />
                </div>
                <span className="font-medium">₹{trip.budget}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="lg" asChild className="rounded-2xl border-2 border-[#40916C] text-[#40916C] hover:bg-[#40916C] hover:text-white transition-all duration-300">
            <Link href="/">
              <Share2 className="mr-2 h-5 w-5" />
              Share Plan
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="itinerary" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#f8faf9] rounded-2xl p-1 h-auto">
            <TabsTrigger value="itinerary" className="rounded-xl data-[state=active]:green-gradient data-[state=active]:text-white font-medium py-3">Itinerary</TabsTrigger>
            <TabsTrigger value="budget" className="rounded-xl data-[state=active]:green-gradient data-[state=active]:text-white font-medium py-3">Budget</TabsTrigger>
            <TabsTrigger value="deals" className="rounded-xl data-[state=active]:green-gradient data-[state=active]:text-white font-medium py-3">Deals</TabsTrigger>
            <TabsTrigger value="guide" className="rounded-xl data-[state=active]:green-gradient data-[state=active]:text-white font-medium py-3">Local Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="mt-8">
            <Card className="p-8 border-0 bg-white soft-shadow rounded-3xl">
              <TripItinerary itinerary={trip.itinerary} days={days} />
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="mt-8">
            <Card className="p-8 border-0 bg-white soft-shadow rounded-3xl">
              <TripBudgetPlanner budgetPlan={trip.budget_plan || {}} />
            </Card>
          </TabsContent>

          <TabsContent value="deals" className="mt-8">
            <Card className="p-8 border-0 bg-white soft-shadow rounded-3xl">
              <TripDeals deals={trip.deals} />
            </Card>
          </TabsContent>

          <TabsContent value="guide" className="mt-8">
            <Card className="p-8 border-0 bg-white soft-shadow rounded-3xl">
              <LocalGuideChat destination={trip.destination} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}