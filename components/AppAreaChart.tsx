"use client"

import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

const chartConfig = {
  Publica: {
    label: "Pública",
    color: "#2563eb",
  },
  Privada: {
    label: "Privada",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const chartData = [
  { ano: 2020, Publica: 505.9, Privada: 598.2 },
  { ano: 2021, Publica: 507.8, Privada: 590.9 },
  { ano: 2022, Publica: 519.5, Privada: 601.4 },
  { ano: 2023, Publica: 519.3, Privada: 611.8 },
]

    const AppAreaChart = () => {
    return (
        <div className="">
            <h1 className="text-lg font-medium mb-1">Evolução da Nota Média Geral</h1>
            <p className="text-sm text-muted-foreground mb-4">Comparativo entre escolas públicas e privadas</p>
            <div className="w-full h-[350px]">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="ano"
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
                            <linearGradient id="fillPublica" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor="var(--color-Publica)"
                                stopOpacity={0.8}
                                />
                                <stop
                                offset="95%"
                                stopColor="var(--color-Publica)"
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillPrivada" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor="var(--color-Privada)"
                                stopOpacity={0.8}
                                />
                                <stop
                                offset="95%"
                                stopColor="var(--color-Privada)"
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                            </defs>
                            <Area
                                dataKey="Privada"
                                type="natural"
                                fill="url(#fillPrivada)"
                                fillOpacity={0.4}
                                stroke="var(--color-Privada)"
                                stackId="a"
                            />
                            <Area
                                dataKey="Publica"
                                type="natural"
                                fill="url(#fillPublica)"
                                fillOpacity={0.4}
                                stroke="var(--color-Publica)"
                                stackId="a"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        </div>
    );
};
 
export default AppAreaChart;