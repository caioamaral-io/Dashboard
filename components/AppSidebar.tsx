"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, LayoutGrid, CodeXml, Play } from "lucide-react";

type NavChild = {
  path: string;
  name: string;
};

type NavItem = {
  path: string;
  name: string;
  icon: LucideIcon;
  children?: NavChild[];
};

const items: NavItem[] = [
  { path: "/", name: "Dash", icon: LayoutGrid},
  {
    path: "/developers",
    name: "Developers",
    icon: CodeXml, 
    children: [
      { path: "https://docsedu.vercel.app", name: "Documentation" },
      { path: "https://github.com/caioamaral-io/Dashboard", name: "Open Source" },
      { path: "https://sites.google.com/cesar.school/projetos-05-grupo-01/home", name: "Site" },
    ],
  },
  { path: "/pitch", name: "Pitch", icon: Play }, 
];

interface ChildItemProps {
  child: NavChild;
  isActive: boolean;
  isExpanded: boolean;
  shouldShow: boolean;
  onSelect?: () => void;
  index: number;
}

const ChildItem = ({ child, isActive, isExpanded, shouldShow, onSelect, index }: ChildItemProps) => {
  const showChild = isExpanded && shouldShow;

  return (
    <Link href={child.path} onClick={() => onSelect?.()} className="block group/child">
      <div className="relative">
        <div
          className={`ml-[35px] mr-[15px] h-[32px] flex items-center border-l border-border pl-3 transition-all duration-200 ease-out ${
            showChild ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          }`}
          style={{
            transitionDelay: showChild ? `${40 + index * 20}ms` : `${index * 20}ms`,
          }}
        >
          <span
            className={`text-xs font-medium transition-colors duration-200 whitespace-nowrap overflow-hidden ${
              isActive ? "text-primary" : "text-muted-foreground group-hover/child:text-primary"
            }`}
          >
            {child.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

interface ItemProps {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  isItemExpanded: boolean;
  onToggle: (path: string) => void;
  onSelect?: () => void;
}

const Item = ({ item, isActive, isExpanded, isItemExpanded, onToggle, onSelect }: ItemProps) => {
  const pathname = usePathname();
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const shouldShowChildren = isExpanded && isItemExpanded;

  const handleChevronClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(item.path);
  };

  return (
    <div className="group">
      <Link href={item.path} onClick={() => onSelect?.()} className="group">
        <div className="relative">
           <div
            className={`border h-[40px] transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ml-[15px] mr-[15px] ${
              isActive ? "bg-accent/60 border-border/80" : "border-transparent hover:bg-accent/60 hover:border-border/80"
            } ${isExpanded ? "w-[calc(100%-30px)]" : "w-[40px]"}`}
          />

          <div className="absolute top-0 left-[15px] w-[40px] h-[40px] flex items-center justify-center text-muted-foreground group-hover:text-primary">
            <Icon size={20} />
          </div>

          {isExpanded && (
            <div className="absolute top-0 left-[55px] right-[4px] h-[40px] flex items-center pointer-events-none">
              <span
                className={`text-sm font-medium transition-opacity duration-200 ease-in-out whitespace-nowrap overflow-hidden ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                } ${hasChildren ? "pr-2" : ""}`}
              >
                {item.name}
              </span>
              {hasChildren && (
                <button
                  type="button"
                  onClick={handleChevronClick}
                  className={`w-8 h-8 flex items-center justify-center transition-all duration-200 ml-auto mr-3 text-muted-foreground hover:text-primary pointer-events-auto ${
                    shouldShowChildren ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </Link>

      {hasChildren && (
        <div className={`transition-all duration-300 ease-out overflow-hidden ${shouldShowChildren ? "max-h-96 mt-1" : "max-h-0"}`}>
          {item.children!.map((child, index) => {
            const isChildActive = pathname === child.path;
            return (
              <ChildItem
                key={child.path}
                child={child}
                isActive={isChildActive}
                isExpanded={isExpanded}
                shouldShow={shouldShowChildren}
                onSelect={onSelect}
                index={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

interface MainMenuProps {
  onSelect?: () => void;
  isExpanded: boolean;
}

const MainMenu = ({ onSelect, isExpanded }: MainMenuProps) => {
  const pathname = usePathname();
  const part = pathname?.split("/")[1];
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    setExpandedItem(null);
  }, [isExpanded]);

  return (
    <div className="mt-6 w-full">
      <nav className="w-full">
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const isActive = (pathname === "/" && item.path === "/") || (pathname !== "/" && item.path.startsWith(`/${part}`));

            return (
              <Item
                key={item.path}
                item={item}
                isActive={isActive}
                isExpanded={isExpanded}
                isItemExpanded={expandedItem === item.path}
                onToggle={(path) => setExpandedItem(expandedItem === path ? null : path)}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      </nav>
    </div>
  );
};

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`h-screen flex-shrink-0 flex-col justify-between fixed top-0 left-0 pb-4 items-center hidden md:flex z-40 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] bg-background border-r border-border ${
        isExpanded ? "w-[240px]" : "w-[70px]"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`absolute top-0 left-0 h-[70px] flex items-center bg-background border-b border-border transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isExpanded ? "w-full" : "w-[69px]"
        }`}
      >
        {/* Logo */}
        <div className="absolute left-0 w-[70px] h-[70px] flex items-center justify-center z-20">
          <Link href="/" className="transition-none">
            {/* Logo Light Mode */}
            <img
              src="/logo-black.svg"
              alt="Logo"
              className="h-[35px] w-[35px] dark:hidden object-contain"
            />

            {/* Logo Dark Mode */}
            <img
              src="/logo-light.svg"
              alt="Logo"
              className="h-[30px] w-[30px] hidden dark:block object-contain"
            />
          </Link>
        </div>
      </div>

      {isExpanded && (
        <div className="absolute left-[65px] h-[70px] flex items-center">
          <span className="text-lg font-regular tracking-tight">
            dataEdu
          </span>
        </div>
      )}

      <div className="flex flex-col w-full pt-[70px] flex-1">
        <MainMenu isExpanded={isExpanded} />
      </div>
    </aside>
  );
};

export default AppSidebar;
