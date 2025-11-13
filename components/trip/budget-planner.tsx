"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface BudgetPlan {
  daily_average?: number
  total?: string
  breakdown?: Record<string, number>
}

interface TripBudgetPlannerProps {
  budgetPlan: BudgetPlan
}

export function TripBudgetPlanner({ budgetPlan }: TripBudgetPlannerProps) {
  const categories = [
    { name: "Accommodation", value: 30 },
    { name: "Food", value: 25 },
    { name: "Activities", value: 25 },
    { name: "Transport", value: 15 },
    { name: "Shopping", value: 5 },
  ]

  return (
    <Card className="p-8 border-0 bg-white/50 backdrop-blur space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Budget Breakdown</h2>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-0 bg-gradient-to-br from-primary/10 to-primary/5">
            <p className="text-sm text-muted-foreground mb-1">Daily Average</p>
            <p className="text-3xl font-bold text-primary">₹{budgetPlan.daily_average || 5000}</p>
          </Card>

          <Card className="p-6 border-0 bg-gradient-to-br from-secondary/10 to-secondary/5">
            <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
            <p className="text-3xl font-bold text-secondary">{budgetPlan.total || "Flexible"}</p>
          </Card>
        </div>

        {/* Chart */}
        <div className="w-full h-80 bg-white/20 rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categories}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4a8ef5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Categories */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Card key={cat.name} className="p-4 border-0 bg-gradient-to-br from-secondary/10 to-accent/5">
              <div className="flex items-center justify-between">
                <span className="font-medium">{cat.name}</span>
                <span className="text-lg font-semibold">{cat.value}%</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border/40">
        <p className="text-sm text-muted-foreground">
          These are suggested percentages based on typical travel patterns. Adjust based on your preferences.
        </p>
      </div>
    </Card>
  )
}
