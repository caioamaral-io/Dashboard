"use client"

import * as React from "react"
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

export const description = "Médias por Renda e Disciplina - ENEM"

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

const rendaPorFaixa = [
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

const chartData = faixas.map((faixa, index) => ({
  faixa,
  faixa_renda: rendaPorFaixa[index]?.faixa_renda,
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

const AppBarVerticalChart = () => {
  const [activeProperty, setActiveProperty] =
    React.useState<ActiveProperty>("all")
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const activeData = React.useMemo(() => {
    if (activeIndex === null) return null
    return chartData[activeIndex]
  }, [activeIndex])

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>
            Média Notas por Prova x Renda Familiar
          </CardTitle>
          <Select
            value={activeProperty}
            onValueChange={(value: ActiveProperty) => {
              setActiveProperty(value)
            }}
          >
            <SelectTrigger className="text-xs h-7 px-2 py-0 w-[110px]">
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
        <CardDescription className="text-sm">
          {activeData
            ? `${activeData.faixa}: ${activeData.faixa_renda}`
            : "Médias por Renda e Disciplina - ENEM"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center items-center">
        <ChartContainer
          config={chartConfig}
          className="h-[220px] sm:h-[260px] w-full"
        >

          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -15,
            }}
            onMouseMove={(state: any) => {
              if (state?.activeTooltipIndex != null) {
                setActiveIndex(state.activeTooltipIndex as number)
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
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
      />
    </>
  )
}

export default AppBarVerticalChart