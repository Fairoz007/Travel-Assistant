import Groq from "groq-sdk"
import type { NextRequest } from "next/server"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function POST(request: NextRequest) {
  try {
    const { destination, message, conversationHistory } = await request.json()

    const systemPrompt = `You are a knowledgeable local guide for ${destination}.
Provide authentic, helpful recommendations for:
- Great food places and local restaurants
- Hidden gems and off-the-beaten-path spots
- Photography locations and timing
- Local tips and cultural insights
- Practical advice for visitors

Keep responses concise, friendly, and actionable. No login or database storage required.`

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ]

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.7,
      stream: true,
    })

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || ""
          if (content) {
            controller.enqueue(new TextEncoder().encode(content))
          }
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Error in local guide chat:", error)
    return new Response("Error generating response", { status: 500 })
  }
}
