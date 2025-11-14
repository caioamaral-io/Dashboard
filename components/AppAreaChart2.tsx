"use client"

import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

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

function CustomLegendArea2() {
  const keys: (keyof typeof chartConfig)[] = [
    "natureza",
    "humanas",
    "linguagens",
    "matematica",
    "redacao",
  ]

  const firstRow = keys.slice(0, 3)
  const secondRow = keys.slice(3)

  const renderRow = (row: (keyof typeof chartConfig)[]) => (
    <div className="flex justify-center gap-6">
      {row.map((key) => (
        <div key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="h-2.5 w-2.5 rounded-[2px]"
            style={{ backgroundColor: chartConfig[key].color as string }}
          />
          <span>{chartConfig[key].label}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="mt-3 flex flex-col items-center gap-2">
      {renderRow(firstRow)}
      {renderRow(secondRow)}
    </div>
  )
}

const AppAreaChart2 = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-1">Média Notas por Prova x Renda Familiar</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Nota média das disciplinas do ENEM por faixa de renda.
      </p>
      <div className="w-full h-[350px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="faixa"
                tickLine={true}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={true}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<CustomLegendArea2 />} />

              <defs>
                <linearGradient id="fillNatureza" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-natureza)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-natureza)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillHumanas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-humanas)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-humanas)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillLinguagens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-linguagens)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-linguagens)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillMatematica" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-matematica)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-matematica)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillRedacao" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-redacao)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-redacao)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="natureza"
                type="natural"
                fill="url(#fillNatureza)"
                fillOpacity={0.4}
                stroke="var(--color-natureza)"
                stackId="a"
              />
              <Area
                dataKey="humanas"
                type="natural"
                fill="url(#fillHumanas)"
                fillOpacity={0.4}
                stroke="var(--color-humanas)"
                stackId="a"
              />
              <Area
                dataKey="linguagens"
                type="natural"
                fill="url(#fillLinguagens)"
                fillOpacity={0.4}
                stroke="var(--color-linguagens)"
                stackId="a"
              />
              <Area
                dataKey="matematica"
                type="natural"
                fill="url(#fillMatematica)"
                fillOpacity={0.4}
                stroke="var(--color-matematica)"
                stackId="a"
              />
              <Area
                dataKey="redacao"
                type="natural"
                fill="url(#fillRedacao)"
                fillOpacity={0.4}
                stroke="var(--color-redacao)"
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}

export default AppAreaChart2