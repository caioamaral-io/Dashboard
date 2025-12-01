"use client";

import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
import type { ChartConfig as BaseChartConfig } from "./ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig: BaseChartConfig = {
  Sim: { label: "Sim", color: "#2B7FFF" },
  Não: { label: "Não", color: "#8EC5FF" },
} satisfies BaseChartConfig;

const dadosAcesso = {
  Privada: { Sim: 85.2, Não: 14.8 },
  Pública: { Sim: 34.4, Não: 65.6 },
} as const;

type TipoEscola = keyof typeof dadosAcesso;

const AppPizzaChart = () => {
  const [tipoEscolaSelecionado, setTipoEscolaSelecionado] =
    React.useState<TipoEscola>("Privada");

  const chartData = React.useMemo(() => {
    const dados = dadosAcesso[tipoEscolaSelecionado];
    return [
      { chave: "Sim", resposta: "Sim", valor: dados.Sim, fill: "#2B7FFF" },
      { chave: "Não", resposta: "Não", valor: dados.Não, fill: "#8EC5FF" },
    ];
  }, [tipoEscolaSelecionado]);

  const totalPercentSim =
    chartData.find((d) => d.chave === "Sim")?.valor ?? 0;

  return (
    <div id="possui-computador" className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-medium">Possui Computador</h2>

        <Select
          value={tipoEscolaSelecionado}
          onValueChange={(value) => setTipoEscolaSelecionado(value as TipoEscola)}
        >
          <SelectTrigger className="h-7 px-2 py-0 text-xs font-normal w-[90px] rounded-none">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>

          <SelectContent align="end" className="rounded-none">
            <SelectItem value="Privada" className="text-xs rounded-none">
              Privada
            </SelectItem>
            <SelectItem value="Pública" className="text-xs rounded-none">
              Pública
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground -mt-2">
        {totalPercentSim.toFixed(1)}% dos alunos têm computador.
      </p>

      <div className="flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="h-[220px] w-full flex items-center justify-center"
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
                  labelKey="resposta"
                  nameKey="resposta"
                  indicator="line"
                  hideLabel
                  hideIndicator
                  formatter={(_, __, item) => {
                    if (!item || !("payload" in (item as any))) return null;
                    const payload = (item as any).payload;

                    return (
                      <div className="flex items-start gap-2">
                        <div
                          className="w-1 h-8 rounded-full"
                          style={{ backgroundColor: payload.fill }}
                        />
                        <div>
                          <div className="font-medium text-sm">{payload.resposta}</div>
                          <div className="text-xs text-muted-foreground">
                            {payload.valor.toFixed(1)}% dos alunos
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />

            <Pie
              data={chartData}
              dataKey="valor"
              nameKey="resposta"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry) => (
                <Cell key={entry.chave} fill={entry.fill} />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox))
                    return null;

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
                        className="fill-foreground text-2xl font-medium"
                      >
                        {tipoEscolaSelecionado}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground text-sm"
                      >
                        {totalPercentSim.toFixed(1)}%
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};

const DottedBackgroundPatternPie = () => (
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

export default AppPizzaChart;
