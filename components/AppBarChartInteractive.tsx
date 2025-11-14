"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Distribuição de participantes por faixa de renda (Q006)"

const chartData = [
  { faixa_renda: "Nenhuma renda", percentual: 7.7 },
  { faixa_renda: "Até 1.320", percentual: 37.9 },
  { faixa_renda: "De 1.320 até 1.980", percentual: 14.9 },
  { faixa_renda: "De 1.980 até 2.640", percentual: 9.5 },
  { faixa_renda: "De 2.640 até 3.300", percentual: 5.4 },
  { faixa_renda: "De 3.300 até 3.960", percentual: 4.2 },
  { faixa_renda: "De 3.960 até 5.280", percentual: 4.7 },
  { faixa_renda: "De 5.280 até 6.600", percentual: 3.7 },
  { faixa_renda: "De 6.600 até 7.920", percentual: 2.0 },
  { faixa_renda: "De 7.920 até 9.240", percentual: 1.4 },
  { faixa_renda: "De 9.240 até 10.560", percentual: 1.2 },
  { faixa_renda: "De 10.560 até 13.200", percentual: 1.0 },
  { faixa_renda: "De 13.200 até 15.840", percentual: 1.2 },
  { faixa_renda: "De 15.840 até 19.800", percentual: 1.1 },
  { faixa_renda: "De 19.800 até 26.400", percentual: 1.1 },
  { faixa_renda: "De 26.400 até 39.600", percentual: 1.2 },
  { faixa_renda: "Mais de 39.600", percentual: 1.8 },
]

const chartConfig = {
  percentual: {
    label: "Porcentagem",
    color: "#2563eb",
  },
} satisfies ChartConfig

export default function AppBarChartInteractive() {
  return (
    <Card className="py-0 border-0 shadow-none bg-transparent rounded-none">
      <CardHeader className="flex flex-col items-stretch !p-0">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3">
          <CardTitle>Distribuição de Participantes por Faixa de Renda</CardTitle>
          <CardDescription>
            Percentual de participantes do ENEM por faixa de renda familiar em PE
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              bottom: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="percentual"
                  labelFormatter={(_, payload) => {
                    if (!payload || payload.length === 0) return null

                    const item = payload[0]
                    return String(item?.payload?.faixa_renda ?? "")
                  }}
                />
              }
            />
            <Bar
              dataKey="percentual"
              fill="var(--color-percentual)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
