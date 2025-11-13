"use client"

import { TrendingUp } from "lucide-react"
import { BarChart, Bar, CartesianGrid, Rectangle, XAxis, YAxis, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { ano: 2020, participantes: 27451 },
  { ano: 2021, participantes: 29963 },
  { ano: 2022, participantes: 32060 },
  { ano: 2023, participantes: 34652 },
]

const barColors = ["#8EC5FF", "#2B7FFF", "#155DFC", "#1447E6", "#193CB8"]


const chartConfig = {
  participantes: {
    label: "Número de Participantes",
    color: barColors[0],
  },
  ano: {
    label: "Ano",
  },
} satisfies ChartConfig

export default function AppBarChartActive() {
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value)
  }

  return (
    <div className="w-full">
      <h1 className="text-lg font-medium mb-6">
        Participantes do ENEM por Ano - PE
      </h1>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="ano"
            tickLine={true}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis
            tickFormatter={formatNumber}
            tickLine={true}
            axisLine={false}
            width={80}
          />

          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name, item) => (
                  <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] mr-2"
                      style={{
                        backgroundColor: barColors[item.payload.ano - 2020]
                      }}
                    />
                    {chartConfig.participantes.label}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      {new Intl.NumberFormat('pt-BR').format(value as number)}
                    </div>
                  </div>
                )}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar
            dataKey="participantes"
            radius={8}
            activeIndex={chartData.length - 1} 
            activeBar={({ ...props }) => (
              <Rectangle
                {...props}
                fillOpacity={0.8}
                stroke={barColors[props.index % barColors.length]}
                strokeDasharray={4}
                strokeDashoffset={4}
              />
            )}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}