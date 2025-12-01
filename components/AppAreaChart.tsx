"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    color: "#1447E6",
  },
} satisfies ChartConfig;

const AppAreaChart = () => {
  const [xAxis, setXAxis] = React.useState<number | null>(null);
  const [yearRange, setYearRange] = React.useState<"4" | "3" | "2">("4");

  const filteredData = React.useMemo(() => {
    const range = parseInt(yearRange, 10);
    return chartData.slice(-range);
  }, [yearRange]);

  return (
    <div id="evolucao-media-geral" className="flex flex-col h-full">
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="leading-tight text-md font-medium">
            Evolução da Média Geral
          </h2>
          <Select
            value={yearRange}
            onValueChange={(value: "4" | "3" | "2") => setYearRange(value)}
          >
            <SelectTrigger className="h-7 px-2 py-0 text-xs w-[120px] rounded-none">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-none">
              <SelectItem className="text-xs rounded-none" value="4">
                Last 4 years
              </SelectItem>
              <SelectItem className="text-xs rounded-none" value="3">
                Last 3 years
              </SelectItem>
              <SelectItem className="text-xs rounded-none" value="2">
                Last 2 years
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">Públicas x Privadas</p>
      </div>

      <ChartContainer
        config={chartConfig}
        className="h-[260px] w-full flex items-center justify-center"
      >
        <AreaChart
          accessibilityLayer
          data={filteredData}
          margin={{ left: 24, right: 24 }}
          onMouseMove={(e) => setXAxis(e.chartX as number)}
          onMouseLeave={() => setXAxis(null)}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <YAxis
            tick={false}
            tickLine={false}
            axisLine={false}
            width={0}
            domain={["dataMin - 5", "dataMax + 5"]}
          />
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
            dataKey="Privada"
            type="natural"
            fill={"url(#animated-highlighted-grad-Privada)"}
            fillOpacity={0.4}
            stroke="var(--color-Privada)"
            strokeWidth={0.8}
            mask="url(#animated-highlighted-mask)"
          />
          <Area
            dataKey="Publica"
            type="natural"
            fill={"url(#animated-highlighted-grad-Publica)"}
            fillOpacity={0.4}
            stroke="var(--color-Publica)"
            strokeWidth={0.8}
            mask="url(#animated-highlighted-mask)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;
