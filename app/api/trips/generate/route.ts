import Groq from "groq-sdk"
import { type NextRequest } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 50)
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServer()
    const { from, destination, startDate, endDate, budget, style, interests, notes } = await request.json()

    const prompt = `Generate a clean structured travel plan in JSON format:

From: ${from}
Destination: ${destination}
Start Date: ${startDate}
End Date: ${endDate}
Budget: ₹${budget} (Indian Rupees)
Style: ${style}
Interests: ${interests.join(", ")}
Notes: ${notes || "None"}

Return a JSON object with these exact fields:
- title: Catchy trip title (string)
- itinerary: Array of daily plans, each object must have: day (number starting from 1), title (string), activities (array of strings), estimated_cost (optional number in INR)
- packing_list: Array of strings (items to pack)
- budget_plan: Object with daily_average (number in INR) and total (string)
- deals: Object with best_booking_dates (string)
- location_info: Object with destination details

IMPORTANT: Generate valid JSON only, no extra text, no line breaks in strings, no comments. All costs must be in Indian Rupees (INR). The JSON must parse correctly.`

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: "You are a travel planning expert. Generate a detailed travel plan based on the user's request. Return the plan as a valid JSON object." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    })

    const planText = completion.choices[0].message.content
    let aiData: any = {}

    try {
      aiData = JSON.parse(planText)
    } catch {
      aiData = {
        title: `${destination} Adventure (${style})`,
        itinerary: [],
        packing_list: ["Passport", "Clothing", "Toiletries"],
        budget_plan: { daily_average: 5000, total: budget },
        deals: { best_booking_dates: "2-3 months in advance" },
        location_info: {}
      }
    }

    const slug = generateSlug(aiData.title || `${destination}-trip`)

    // Insert the trip into the database
    const { data: insertedTrip, error: insertError } = await supabase
      .from("trips")
      .insert({
        slug,
        title: aiData.title || `${destination} Trip`,
        destination,
        start_date: startDate,
        end_date: endDate,
        budget,
        interests,
        itinerary: aiData.itinerary || [],
        packing_list: aiData.packing_list || [],
        budget_plan: aiData.budget_plan || {},
        deals: aiData.deals || {},
        location_info: aiData.location_info || {}
      })
      .select()
      .single()

    if (insertError) {
      console.error("Error inserting trip:", insertError)
      return new Response(JSON.stringify({ error: "Failed to save trip" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({
      slug,
      title: insertedTrip.title,
      from,
      destination: insertedTrip.destination,
      startDate: insertedTrip.start_date,
      endDate: insertedTrip.end_date,
      budget: insertedTrip.budget,
      style,
      interests: insertedTrip.interests,
      notes,
      itinerary: insertedTrip.itinerary,
      packing_list: insertedTrip.packing_list,
      budget_plan: insertedTrip.budget_plan,
      deals: insertedTrip.deals,
      location_info: insertedTrip.location_info
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error("Error generating trip:", error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    })
  }
}