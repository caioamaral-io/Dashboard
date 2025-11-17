"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

const animationConfig = {
  glowWidth: 300,
};

const chartData = [
  { ano: 2020, Publica: 505.9, Privada: 598.2 },
  { ano: 2021, Publica: 507.8, Privada: 590.9 },
  { ano: 2022, Publica: 519.5, Privada: 601.4 },
  { ano: 2023, Publica: 519.3, Privada: 611.8 },
];

const chartConfig = {
  Publica: {
    label: "Pública",
    color: "#8EC5FF",
  },
  Privada: {
    label: "Privada",
    color: "#2B7FFF",
  },
} satisfies ChartConfig;

const AppAreaChart = () => {
  const [xAxis, setXAxis] = React.useState<number | null>(null);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>
          Evolução da Nota Média Geral
        </CardTitle>
        <CardDescription>
          Comparativo entre escolas públicas e privadas
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="h-[260px] w-full flex items-center justify-center"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            onMouseMove={(e) => setXAxis(e.chartX as number)}
            onMouseLeave={() => setXAxis(null)}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="ano"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient
                id="animated-highlighted-mask-grad"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="white" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient
                id="animated-highlighted-grad-Publica"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-Publica)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Publica)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id="animated-highlighted-grad-Privada"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-Privada)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Privada)"
                  stopOpacity={0}
                />
              </linearGradient>
              {xAxis && (
                <mask id="animated-highlighted-mask">
                  <rect
                    x={xAxis - animationConfig.glowWidth / 2}
                    y={0}
                    width={animationConfig.glowWidth}
                    height="100%"
                    fill="url(#animated-highlighted-mask-grad)"
                  />
                </mask>
              )}
            </defs>
            <Area
              dataKey="Publica"
              type="natural"
              fill={"url(#animated-highlighted-grad-Publica)"}
              fillOpacity={0.4}
              stroke="var(--color-Publica)"
              stackId="a"
              strokeWidth={0.8}
              mask="url(#animated-highlighted-mask)"
            />
            <Area
              dataKey="Privada"
              type="natural"
              fill={"url(#animated-highlighted-grad-Privada)"}
              fillOpacity={0.4}
              stroke="var(--color-Privada)"
              stackId="a"
              strokeWidth={0.8}
              mask="url(#animated-highlighted-mask)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AppAreaChart;