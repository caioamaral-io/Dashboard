"use client";

import { Label, Pie, PieChart } from "recharts";
import type { ChartConfig as BaseChartConfig } from "./ui/chart";
import {
 ChartContainer,
 ChartTooltip,
 ChartTooltipContent,
 ChartLegend,
 ChartLegendContent,
} from "./ui/chart";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";


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
   label: "baixa",
   categoria: "Baixa",
   faixa: "até R$ 1.980",
   color: "#2B7FFF",
 },
 baixa_media: {
   label: "média baixa",
   categoria: "Baixa-Média",
   faixa: "R$ 1.980 - R$ 3.960",
   color: "#155DFC",
 },
 media: {
   label: "média",
   categoria: "Média",
   faixa: "R$ 3.960 - R$ 7.920",
   color: "#1447E6",
 },
 media_alta: {
   label: "média alta",
   categoria: "Média-Alta",
   faixa: "R$ 7.920 - R$ 13.200",
   color: "#193CB8",
 },
 alta: {
   label: "alta",
   categoria: "Alta",
   faixa: "acima de R$ 13.200",
   color: "#8EC5FF",
 },
} satisfies ChartConfig;

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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Renda dos Alunos com Nota ≥ 713 (Pública)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="h-[260px] w-full flex items-center justify-center"
        >
          <PieChart>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#enem-pie-pattern-dots)"
            />
            <defs>
              <DottedBackgroundPatternPie />
            </defs>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelKey="renda"
                  nameKey="faixa"
                  indicator="line"
                  labelFormatter={(_, payload) => {
                    if (!payload || payload.length === 0) return null;

                    type ValidKey = Exclude<keyof typeof chartConfig, "renda">;
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-base">
        <div className="flex items-center gap-2 leading-none font-medium text-center">
          Crescimento de 5,2% na participação
        </div>
        <div className="text-muted-foreground leading-none text-center">
          Distribuição da renda dos 945 estudantes com nota ≥ 713 
        </div>
      </CardFooter>
    </Card>
  );
};

const DottedBackgroundPatternPie = () => {
  return (
    <pattern
      id="enem-pie-pattern-dots"
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
  );
};

export default AppPieChart;


