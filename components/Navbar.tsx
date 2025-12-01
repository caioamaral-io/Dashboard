"use client"

import { FileTextIcon, LayoutGrid, LayersIcon, Github, Moon, Sun, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { Lora } from "next/font/google"
import { useState } from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const navigationLinks = [
  { href: "https://dataedu.vercel.app", label: "Dashboard", icon: LayoutGrid },
  { href: "https://github.com/caioamaral-io/Dashboard", label: "Github", icon: Github },
  { href: "https://docsedu.vercel.app", label: "Documentation", icon: FileTextIcon },
  { href: "#", label: "Site", icon: LayersIcon },
]

const charts = [
  { id: "grafico-escolas-publicas-privadas", label: "Públicas x Privadas" },
  { id: "grafico-distribuicao-renda", label: "Distribuição por Renda" },
  { id: "participantes-enem-por-ano", label: "Participantes Por Ano" },
  { id: "evolucao-media-geral", label: "Evolução Média Geral" },
  { id: "possui-computador", label: "Possui Computador" },
  { id: "desempenho-racial", label: "Desempenho Racial" },
  { id: "notas-vs-renda", label: "Notas x Renda" },
]

const Navbar = () => {
  const { setTheme } = useTheme()
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const filteredCharts = charts.filter((chart) =>
    chart.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (chartId: string) => {
    const element = document.getElementById(chartId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setQuery("")
    setIsFocused(false)
  }

  return (
    <header className="border-b px-4 md:px-6"> 
      <div className="flex h-[69px] items-center justify-between gap-4">

        {/* Barra de pesquisa */}
        <div className="flex-1 flex justify-start relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-[14px] w-[14px] text-neutral-500 dark:text-neutral-400" />
          <input
            type="text"
            placeholder="Find graph"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)} 
            className="w-full text-sm pl-7 py-2 focus:outline-none rounded-none placeholder-neutral-400 dark:placeholder-neutral-700"
          />

          {isFocused && query && filteredCharts.length > 0 && (
            <ul className="absolute z-50 mt-1 w-44 bg-background border border-border rounded-md shadow-md max-h-40 overflow-auto text-xs">
              {filteredCharts.map((chart) => (
                <li
                  key={chart.id}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-accent/20"
                  onMouseDown={() => handleSelect(chart.id)}
                >
                  {chart.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Ícones / Toggle theme */}
        <div className="flex items-center gap-4">
          {/* Ícones em telas menores */}
          <NavigationMenu className="flex md:hidden">
            <NavigationMenuList className="gap-2">
              <TooltipProvider>
                {navigationLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <NavigationMenuLink
                          href={link.href}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
                        >
                          <link.icon size={18} aria-hidden="true" />
                          <span className="sr-only">{link.label}</span>
                        </NavigationMenuLink>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="px-3 py-1 text-xs rounded-md border border-border bg-background text-foreground shadow-sm"
                      >
                        <p className="leading-none">{link.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </NavigationMenuItem>
                ))}
              </TooltipProvider>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Toggle themme */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative h-8 w-8 flex items-center justify-center rounded-none"
              >
                <Sun className="absolute h-4 w-4 transition-all dark:hidden" />
                <Moon className="absolute h-4 w-4 transition-all hidden dark:block" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="py-1 px-1 text-xs min-w-[6rem] rounded-none">
              <DropdownMenuItem className="py-2 text-xs rounded-none" onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 text-xs rounded-none" onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 text-xs rounded-none" onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Navbar