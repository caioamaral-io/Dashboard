"use client";

import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
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

type RendaKey = keyof typeof chartConfig;

const chartData = [
 { faixa: "baixa", renda: 26.3, fill: "#2B7FFF" },
 { faixa: "baixa_media", renda: 18.7, fill: "#155DFC" },
 { faixa: "media", renda: 13.1, fill: "#1447E6" },
 { faixa: "media_alta", renda: 21.0, fill: "#193CB8" },
 { faixa: "alta", renda: 20.8, fill: "#8EC5FF" },
];

const AppPieChart = () => {
  const totalEstudantes = 945;
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const activeSlice = React.useMemo(() => {
    if (activeIndex === null) return null;
    return chartData[activeIndex];
  }, [activeIndex]);

  const defaultKey: RendaKey = "baixa";
  const activeKey = (activeSlice?.faixa as RendaKey) ?? defaultKey;
  const currentConfig = chartConfig[activeKey] as {
    categoria?: string;
    faixa?: string;
  };
  const currentCategoria = currentConfig.categoria ?? "";
  const currentFaixa = currentConfig.faixa ?? "";
  const currentPercent =
    activeSlice?.renda ?? chartData.find((d) => d.faixa === activeKey)?.renda ?? 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Renda dos Alunos com Nota ≥ 713 (Pública)
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Faixa: {currentCategoria} - ({currentPercent.toFixed(1)}%)
        </p>
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
                  hideLabel
                  hideIndicator
                  formatter={(_, __, item) => {
                    if (!item || !("payload" in (item as any))) return null;

                    const payloadAny = (item as any).payload as {
                      faixa: string;
                      fill?: string;
                    };

                    type ValidKey = Exclude<keyof typeof chartConfig, "renda">;
                    const key = payloadAny.faixa as ValidKey;
                    const categoria = chartConfig[key]?.categoria ?? "";
                    const faixa = chartConfig[key]?.faixa ?? "";
                    const color = payloadAny.fill || (item as any).color;

                    return (
                      <div className="flex items-start gap-2">
                        <div
                          className="w-1 h-8 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <div>
                          <div className="font-medium text-sm">{categoria}</div>
                          <div className="text-xs text-muted-foreground">{faixa}</div>
                        </div>
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
              onMouseLeave={() => setActiveIndex(null)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.faixa}
                  fill={entry.fill}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
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
          Superação socioeconômica
        </div>
        <div className="text-muted-foreground leading-none text-center">
          Alunos de baixa renda lideram em desempenho elevado 
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


