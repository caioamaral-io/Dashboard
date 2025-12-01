"use client"

import * as React from "react"
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

const chartData = [
	{ ano: 2020, participantes: 27451 },
	{ ano: 2021, participantes: 29963 },
	{ ano: 2022, participantes: 32060 },
	{ ano: 2023, participantes: 34652 },
]

const barColors: Record<number, string> = {
	2020: "#8EC5FF",
	2021: "#2B7FFF",
	2022: "#1447E6",
	2023: "#193CB8",
}

const chartConfig = {
	participantes: {
		label: "Participantes",
		color: "var(--chart-1)",
	},
	ano: {
		label: "Ano",
	},
} satisfies ChartConfig

const AppBarChartActive = () => {
	const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

	const formatNumber = (value: number) => {
		return new Intl.NumberFormat("pt-BR").format(value)
	}

	return (
		<div id="participantes-enem-por-ano" className="w-full flex flex-col gap-4">
			<div className="flex flex-col text-left">
				<h2 className="text-md font-medium flex items-center gap-2">
					<span>Participantes do ENEM por ano</span>
					<span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-[2px] text-[10px] sm:text-[11px] font-medium text-blue-500">
						<TrendingUp className="h-3 w-3" />
						<span>+26,24%</span>
					</span>
				</h2>
				<p className="text-sm text-muted-foreground">
					2020 - 2023
				</p>
			</div>

			<ChartContainer
				config={chartConfig}
				className="h-[260px] w-full flex justify-center items-center"
			>
				<BarChart
					accessibilityLayer
					data={chartData}
					onMouseLeave={() => setActiveIndex(null)}
				>
					<rect
						x="0"
						y="0"
						width="100%"
						height="85%"
						fill="url(#enem-participantes-pattern-dots)"
					/>
					<defs>
						<DottedBackgroundPattern />
					</defs>
					<XAxis
						dataKey="ano"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<YAxis hide />

					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								hideLabel
								formatter={(value, name, item) => (
									<div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
										<div
											className="h-2.5 w-2.5 shrink-0 rounded-[2px] mr-2"
											style={{
												backgroundColor:
													barColors[(item?.payload as any)?.ano as number] ??
													chartConfig.participantes.color,
											}}
										/>

										{chartConfig.participantes.label}
										<div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
											{new Intl.NumberFormat('pt-BR').format(value as number)}
										</div>
									</div>
								)}
							/>
						}
					/>
					<Bar
						dataKey="participantes"
						fill="var(--color-participantes)"
						activeIndex={chartData.length - 1}
					>
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-participantes-${index}`}
								fill={barColors[entry.ano]}
								fillOpacity={
									activeIndex === null ? 1 : activeIndex === index ? 1 : 0.3
								}
								stroke={activeIndex === index ? barColors[entry.ano] : ""}
								onMouseEnter={() => setActiveIndex(index)}
								className="duration-200"
							/>
						))}
					</Bar>
				</BarChart>
			</ChartContainer>
		</div>
	)
}

const DottedBackgroundPattern = () => {
	return (
		<pattern
			id="enem-participantes-pattern-dots"
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
	)
}

export default AppBarChartActive