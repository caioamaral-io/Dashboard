"use client"

import * as React from "react"
import type { SVGProps } from "react"
import { Bar, BarChart, XAxis } from "recharts"
import { AnimatePresence, motion } from "framer-motion"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { JetBrains_Mono } from "next/font/google"

export const description =
  "Distribuição de participantes por faixa de renda (Q006)"

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const chartData = [
  { faixa_renda: "Nenhuma renda", percentual: 7.7 },
  { faixa_renda: "Até 1.320", percentual: 37.9 },
  { faixa_renda: "De 1.320 até 1.980", percentual: 14.9 },
  { faixa_renda: "De 1.980 até 2.640", percentual: 9.5 },
  { faixa_renda: "De 2.640 até 3.300", percentual: 5.4 },
  { faixa_renda: "De 3.300 até 3.960", percentual: 4.2 },
  { faixa_renda: "De 3.960 até 5.280", percentual: 4.7 },
  { faixa_renda: "De 5.280 até 6.600", percentual: 3.7 },
  { faixa_renda: "De 6.600 até 7.920", percentual: 2.0 },
  { faixa_renda: "De 7.920 até 9.240", percentual: 1.4 },
  { faixa_renda: "De 9.240 até 10.560", percentual: 1.2 },
  { faixa_renda: "De 10.560 até 13.200", percentual: 1.0 },
  { faixa_renda: "De 13.200 até 15.840", percentual: 1.2 },
  { faixa_renda: "De 15.840 até 19.800", percentual: 1.1 },
  { faixa_renda: "De 19.800 até 26.400", percentual: 1.1 },
  { faixa_renda: "De 26.400 até 39.600", percentual: 1.2 },
  { faixa_renda: "Mais de 39.600", percentual: 1.8 },
]

const chartConfig = {
  percentual: {
    label: "Porcentagem",
    color: "var(--secondary-foreground)",
  },
} satisfies ChartConfig

const AppBarChartInteractive = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined,
  )

  const activeData = React.useMemo(() => {
    if (activeIndex === undefined) return null
    return chartData[activeIndex]
  }, [activeIndex])

  const currentValue = activeData?.percentual ?? chartData[1]?.percentual
  const currentLabel = activeData?.faixa_renda ?? "Até 1.320"

  return (
    <div  id="grafico-distribuicao-renda" className="flex flex-col gap-3">
      <div>
        <h2
          className={cn(
            jetBrainsMono.className,
            "text-2xl tracking-tighter font-medium",
          )}
        >
          {currentValue.toFixed(1)}%
        </h2>

        <p className="text-sm">
          Distribuição de participantes por faixa de renda (Q006)
        </p>

        <p className="text-sm text-muted-foreground mt-1">
          Faixa selecionada: {currentLabel}
        </p>
      </div>

      <div className="flex justify-center items-center">
        <AnimatePresence mode="wait">
          <ChartContainer
            config={chartConfig}
            className="h-[220px] sm:h-[240px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              <XAxis
                dataKey="faixa_renda"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
                tickFormatter={(_, index) => String.fromCharCode(65 + index)}
              />

              <Bar
                dataKey="percentual"
                fill="var(--secondary-foreground)"
                shape={
                  <CustomBar
                    setActiveIndex={setActiveIndex}
                    activeIndex={activeIndex}
                  />
                }
              />
            </BarChart>
          </ChartContainer>
        </AnimatePresence>
      </div>
    </div>
  )
}

interface CustomBarProps extends SVGProps<SVGSVGElement> {
  setActiveIndex: (index?: number) => void
  index?: number
  activeIndex?: number
  value?: string | number
}

const CustomBar = (props: CustomBarProps) => {
  const { fill, x, y, width, height, index, activeIndex, value } = props as any

  const xPos = Number(x || 0)
  const realWidth = Number(width || 0)
  const isActive = index === activeIndex
  const collapsedWidth = 2
  const barX = isActive ? xPos : xPos + (realWidth - collapsedWidth) / 2
  const textX = xPos + realWidth / 2

  return (
    <g onMouseEnter={() => props.setActiveIndex(index)}>
      <motion.rect
        style={{ willChange: "transform, width" }}
        y={y}
        initial={{ width: collapsedWidth, x: barX }}
        animate={{ width: isActive ? realWidth : collapsedWidth, x: barX }}
        transition={{
          duration: activeIndex === index ? 0.5 : 1,
          type: "spring",
        }}
        height={height}
        fill={fill}
      />

      {isActive && (
        <motion.text
          style={{ willChange: "transform, opacity" }}
          className={jetBrainsMono.className}
          key={index}
          initial={{ opacity: 0, y: -10, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
          transition={{ duration: 0.1 }}
          x={textX}
          y={Number(y) - 5}
          textAnchor="middle"
          fill={fill}
        >
          {typeof value === "number" ? `${value.toFixed(1)}%` : value}
        </motion.text>
      )}
    </g>
  )
}

export default AppBarChartInteractive
