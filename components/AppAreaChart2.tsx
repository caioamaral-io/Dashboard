"use client"

import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

const chartConfig = {
  Sim: {
    label: "Sim",
    color: "#2563eb",
  },
  Nao: {
    label: "Não",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const chartData = [
  {
    condicao: "Acesso à Internet",
    Sim: 536.8,
    Nao: 481.1,
  },
  {
    condicao: "Tem Computador",
    Sim: 576.3,
    Nao: 499.5,
  },
]

const AppAreaChart2 = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-1">Desempenho x Acesso à Tecnologia</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Nota média do ENEM por condição de acesso à internet e computador.
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
                dataKey="condicao"
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
              <ChartLegend content={<ChartLegendContent />} />
              <defs>
                <linearGradient id="fillSim" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-Sim)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-Sim)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillNao" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-Nao)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-Nao)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="Sim"
                type="natural"
                fill="url(#fillSim)"
                fillOpacity={0.4}
                stroke="var(--color-Sim)"
                stackId="a"
              />
              <Area
                dataKey="Nao"
                type="natural"
                fill="url(#fillNao)"
                fillOpacity={0.4}
                stroke="var(--color-Nao)"
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