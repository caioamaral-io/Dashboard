"use client"

import { FileTextIcon, HomeIcon, LayersIcon, UsersIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const navigationLinks = [
	{ href: "#", label: "Dashboard", icon: HomeIcon },
	{ href: "#", label: "Projetos", icon: LayersIcon },
	{ href: "#", label: "Relatórios", icon: FileTextIcon },
	{ href: "#", label: "Equipe", icon: UsersIcon },
];

const Navbar = () => {
	const { setTheme } = useTheme();

	return (
		<header className="border-b px-4 md:px-6">
			<div className="flex h-14 items-center justify-between gap-4">
				{/* Esquerda: ícones com tooltip */}
				<div className="flex items-center gap-4">
					<div className="flex">
						<NavigationMenu>
							<NavigationMenuList className="gap-2">
								<TooltipProvider>
									{navigationLinks.map((link) => (
										<NavigationMenuItem key={link.label}>
											<Tooltip>
												<TooltipTrigger asChild>
													<NavigationMenuLink
														href={link.href}
														className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
													>
														<link.icon size={18} aria-hidden="true" />
														<span className="sr-only">{link.label}</span>
													</NavigationMenuLink>
												</TooltipTrigger>
												<TooltipContent side="bottom" className="px-2 py-1 text-xs">
													<p>{link.label}</p>
												</TooltipContent>
											</Tooltip>
										</NavigationMenuItem>
									))}
								</TooltipProvider>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</div>

				{/* Direita: botão de mudança de tema, mantido no mesmo lugar */}
				<div className="flex items-center gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
								<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
								<span className="sr-only">Toggle theme</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setTheme("light")}>
								Light
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("system")}>
								System
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
};

export default Navbar