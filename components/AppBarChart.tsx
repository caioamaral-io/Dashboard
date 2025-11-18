"use client"


import * as React from "react"
import { Bar, BarChart, Cell, XAxis } from "recharts"


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


const chartData = [
  { subject: "Ciências da Natureza", publica: 469, privada: 538 },
  { subject: "Ciências Humanas", publica: 498, privada: 574 },
  { subject: "Linguagens e Códigos", publica: 501, privada: 560 },
  { subject: "Matemática", publica: 498, privada: 618 },
  { subject: "Redação", publica: 600, privada: 780 },
  { subject: "Média", publica: 513, privada: 614 },
]


const chartConfig = {
  publica: {
    label: "Pública",
    color: "#8EC5FF",
  },
  privada: {
    label: "Privada",
    color: "#2B7FFF",
  },
} satisfies ChartConfig


const subjectAbbr: Record<string, string> = {
  "Ciências da Natureza": "CN",
  "Ciências Humanas": "CH",
  "Linguagens e Códigos": "LG",
  "Matemática": "MT",
  "Redação": "RD",
  "Média": "MÉD",
}


const AppBarChart = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Escolas Públicas x Privadas</span>
        </CardTitle>
        <CardDescription className="text-md">Desempenho médio no ENEM - Pernambuco</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
              fill="url(#enem-public-private-pattern-dots)"
            />
            <defs>
              <DottedBackgroundPattern />
            </defs>
            <XAxis
              dataKey="subject"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => subjectAbbr[value] ?? value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="publica" fill="var(--color-publica)" radius={4}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-publica-${index}`}
                  fillOpacity={
                    activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3
                  }
                  stroke={activeIndex === index ? "var(--color-publica)" : ""}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="duration-200"
                />
              ))}
            </Bar>
            <Bar dataKey="privada" fill="var(--color-privada)" radius={4}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-privada-${index}`}
                  fillOpacity={
                    activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3
                  }
                  stroke={activeIndex === index ? "var(--color-privada)" : ""}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


const DottedBackgroundPattern = () => {
  return (
    <pattern
      id="enem-public-private-pattern-dots"
      x="0"
      y="0"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
    >
      <circle
        className="text-muted dark:text-muted/40"
        cx="2"
        cy="2"
        r="1"
        fill="currentColor"
      />
    </pattern>
  )
}


export default AppBarChart;

