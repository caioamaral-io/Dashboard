"use client";

import { Label, Pie, PieChart } from "recharts";
import type { ChartConfig as BaseChartConfig } from "./ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { TrendingUp } from "lucide-react";

type ChartConfig = BaseChartConfig & {
  [key: string]: {
    label?: string;
    categoria?: string;
    faixa?: string;
    color?: string;
  };
};

const chartConfig = {
  renda: {
    label: "Renda",
  },
  baixa: {
    categoria: "Baixa",
    faixa: "até R$ 1.980",
    color: "#2B7FFF",
  },
  baixa_media: {
    categoria: "Baixa-Média",
    faixa: "R$ 1.980 - R$ 3.960",
    color: "#155DFC",
  },
  media: {
    categoria: "Média",
    faixa: "R$ 3.960 - R$ 7.920",
    color: "#1447E6",
  },
  media_alta: {
    categoria: "Média-Alta",
    faixa: "R$ 7.920 - R$ 13.200",
    color: "#193CB8",
  },
  alta: {
    categoria: "Alta",
    faixa: "acima de R$ 13.200",
    color: "#8EC5FF",
  },
} satisfies ChartConfig;

// Dados do gráfico
const chartData = [
  { faixa: "baixa", renda: 26.3, fill: "#2B7FFF" },
  { faixa: "baixa_media", renda: 18.7, fill: "#155DFC" },
  { faixa: "media", renda: 13.1, fill: "#1447E6" },
  { faixa: "media_alta", renda: 21.0, fill: "#193CB8" },
  { faixa: "alta", renda: 20.8, fill: "#8EC5FF" },
];

const AppPieChart = () => {
  const totalEstudantes = 945;

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">
        Renda dos Alunos com Nota ≥ 713 (Pública)
      </h1>

      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelKey="renda"
                nameKey="faixa"
                indicator="line"
                labelFormatter={(_, payload) => {
                  if (!payload || payload.length === 0) return null;

                  type ValidKey = Exclude<keyof typeof chartConfig, 'renda'>;
                  const key = payload[0].payload.faixa as ValidKey;
                  const categoria = chartConfig[key]?.categoria ?? "";
                  const faixa = chartConfig[key]?.faixa ?? "";

                  return (
                    <div>
                      <div className="font-medium text-sm">{categoria}</div>
                      <div className="text-xs text-muted-foreground">{faixa}</div>
                    </div>
                  );
                }}
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="renda"
            nameKey="faixa"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalEstudantes.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Estudantes
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default AppPieChart;
