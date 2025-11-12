"use client"

import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig = {
  publica: {
    label: "Pública",
    color: "#2563eb",
  },
  privada: {
    label: "Privada",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const chartData = [
  { subject: "Ciências da Natureza", publica: 469, privada: 538 },
  { subject: "Ciências Humanas", publica: 498, privada: 574 },
  { subject: "Linguagens e Códigos", publica: 501, privada: 560 },
  { subject: "Matemática", publica: 498, privada: 618 },
  { subject: "Redação", publica: 600, privada: 780 },
  { subject: "Média Geral", publica: 511, privada: 605 },
]

const subjectAbbr: Record<string, string> = {
  "Ciências da Natureza": "Natureza",
  "Ciências Humanas": "Humanas",
  "Linguagens e Códigos": "Linguagens",
  "Matemática": "Matématica",
  "Redação": "Redação",
  "Média Geral": "Média",
}

    const AppBarChart = () => {
    return (
        <div className="">
            <h1 className="text-lg font-medium mb-6">Desempenho: Escolas Públicas x Privadas - ENEM PE</h1>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="subject"
                        tickLine={true}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value: string) => subjectAbbr[value] ?? value}
                    />
                    <YAxis
                        tickLine={true}
                        tickMargin={10}
                        axisLine={false} 
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="publica" fill="var(--color-publica)" radius={4} />
                    <Bar dataKey="privada" fill="var(--color-privada)" radius={4} />
                </BarChart>
            </ChartContainer> 
        </div>
    );
};
 
export default AppBarChart;