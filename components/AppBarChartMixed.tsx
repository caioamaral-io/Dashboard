"use client"

import * as React from "react"
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A mixed bar chart"

const chartConfig = {
  nota_media: { label: "Nota Média" },
  Branca: { label: "Branca", color: "#8EC5FF" },
  Nao_declarado: { label: "Omisso", color: "#2B7FFF" },
  Parda: { label: "Parda", color: "#155DFC" },
  Amarela: { label: "Amarela", color: "#1447E6" },
  Preta: { label: "Preta", color: "#193CB8" },
  Indígena: { label: "Indígena", color: "#0F1F6E" },
} satisfies ChartConfig

const chartData = [
  { cor_raca: "Branca", nota_media: 562.0, fill: "var(--color-Branca)" },
  { cor_raca: "Omisso", nota_media: 523.3, fill: "var(--color-Nao_declarado)" },
  { cor_raca: "Parda", nota_media: 521.1, fill: "var(--color-Parda)" },
  { cor_raca: "Amarela", nota_media: 512.5, fill: "var(--color-Amarela)" },
  { cor_raca: "Preta", nota_media: 509.1, fill: "var(--color-Preta)" },
  { cor_raca: "Indígena", nota_media: 491.6, fill: "var(--color-Indígena)" },
]

export function ChartBarMixed() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const activeData = React.useMemo(() => {
    if (activeIndex === null) return null
    return chartData[activeIndex]
  }, [activeIndex])

  return (
    <div id="desempenho-racial" className="h-full flex flex-col gap-4">
      <div>
        <h2 className="text-md font-medium">Desempenho Racial</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {activeData
            ? `${activeData.cor_raca}: ${activeData.nota_media.toFixed(1)}`
            : "Média de notas por cor/raça"}
        </p>
      </div>

      <div className="w-full flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="h-[260px] w-full max-w-3xl"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="85%"
              fill="url(#highlighted-pattern-dots)"
            />
            <defs>
              <DottedBackgroundPattern />
            </defs>

            <XAxis
              dataKey="cor_raca"
              type="category"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              interval={0}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || value
              }
            />

            <YAxis hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="nota_media">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="duration-200"
                  fill={entry.fill}
                  fillOpacity={
                    activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3
                  }
                  stroke={activeIndex === index ? entry.fill : ""}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

const DottedBackgroundPattern = () => {
  return (
    <pattern
      id="highlighted-pattern-dots"
      x="0"
      y="0"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
    >
      <circle
        className="dark:text-muted/40 text-muted"
        cx="2"
        cy="2"
        r="1"
        fill="currentColor"
      />
    </pattern>
  )
}

export default ChartBarMixed
