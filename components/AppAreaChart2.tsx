"use client"

import * as React from "react"
import { TrendingDown } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export const description = "Notas médias ENEM por disciplina e faixa de renda"

const chartConfig = {
  natureza: {
    label: "Natureza",
    color: "#8EC5FF",
  },
  humanas: {
    label: "Humanas",
    color: "#5DA7FF",
  },
  linguagens: {
    label: "Códigos",
    color: "#2B7FFF",
  },
  matematica: {
    label: "Matemática",
    color: "#155DFC",
  },
  redacao: {
    label: "Redação",
    color: "#1447E6",
  },
} satisfies ChartConfig

const faixas = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
]

const chartData = faixas.map((faixa, index) => ({
  faixa,
  natureza: [
    450, 460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590,
    600, 610,
  ][index],
  humanas: [
    460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600,
    610, 620,
  ][index],
  linguagens: [
    470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610,
    620, 630,
  ][index],
  matematica: [
    440, 455, 470, 485, 500, 515, 530, 545, 560, 575, 590, 605, 620, 635, 650,
    665, 680,
  ][index],
  redacao: [
    420, 435, 450, 465, 480, 495, 510, 525, 540, 555, 570, 585, 600, 615, 630,
    645, 660,
  ][index],
}))

type ActiveProperty = keyof typeof chartConfig | "all"

const AppAreaChart2 = () => {
  const [activeProperty, setActiveProperty] =
    React.useState<ActiveProperty>("all")

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>
            Média Notas por Prova x Renda Familiar
            <Badge
              variant="outline"
              className="text-emerald-500 bg-emerald-500/10 border-none ml-2 inline-flex items-center gap-1 text-[11px] px-2 py-0.5"
            >
              <TrendingDown className="h-3 w-3" />
              <span>-5,2%</span>
            </Badge>
          </CardTitle>
          <Select
            value={activeProperty}
            onValueChange={(value: ActiveProperty) => {
              setActiveProperty(value)
            }}
          >
            <SelectTrigger className="text-xs !h-6 !px-1.5">
              <SelectValue placeholder="Selecionar disciplina" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Disciplinas</SelectLabel>
                <SelectItem className="text-xs" value="all">
                  Todas
                </SelectItem>
                <SelectItem className="text-xs" value="natureza">
                  Natureza
                </SelectItem>
                <SelectItem className="text-xs" value="humanas">
                  Humanas
                </SelectItem>
                <SelectItem className="text-xs" value="linguagens">
                  Códigos
                </SelectItem>
                <SelectItem className="text-xs" value="matematica">
                  Matemática
                </SelectItem>
                <SelectItem className="text-xs" value="redacao">
                  Redação
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Notas médias por faixa de renda e disciplina do ENEM.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}

            layout="vertical"

            margin={{
              left: -15,
            }}
          >
            <YAxis
              type="category"
              dataKey="faixa"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value}
            />
            <XAxis
              type="number"

              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              stackId="a"
              barSize={8}
              className="dark:text-[#1A1A1C] text-[#E4E4E7]"
              dataKey="natureza"
              fill="var(--color-natureza)"
              radius={4}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              background={{ fill: "currentColor", radius: 4 }}
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="humanas"
              fill="var(--color-humanas)"
              radius={4}
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="linguagens"
              fill="var(--color-linguagens)"
              radius={4}
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="matematica"
              fill="var(--color-matematica)"
              radius={4}
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="redacao"
              fill="var(--color-redacao)"
              radius={4}
              overflow="visible"
            />

          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const CustomGradientBar = (
  props: React.SVGProps<SVGRectElement> & {
    dataKey?: string
    activeProperty?: ActiveProperty | null
    glowOpacity?: number
  },
) => {
  const { fill, x, y, width, height, dataKey, activeProperty, radius } = props

  const isActive = activeProperty === "all" ? true : activeProperty === dataKey

  return (
    <>
      <rect
        x={x}
        y={y}
        rx={radius}
        width={width}
        height={height}
        stroke="none"
        fill={fill}
        opacity={isActive ? 1 : 0.1}
        filter={
          isActive && activeProperty !== "all"
            ? `url(#glow-chart-${dataKey})`
            : undefined
        }
      />
      <defs>
        <filter
          id={`glow-chart-${dataKey}`}
          x="-200%"
          y="-200%"
          width="600%"
          height="600%"
        >
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </>
  )
}

export default AppAreaChart2