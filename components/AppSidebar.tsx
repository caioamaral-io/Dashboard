import { TrendingUp } from "lucide-react"
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroupLabel, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator } from "@/components/ui/sidebar"
import Link from "next/link";
import Image from "next/image";
import Github from "@/components/icons/Github";
import Overview from "@/components/icons/Overview";
import Website from "@/components/icons/Website";
import Pitch from "@/components/icons/Pitch";

const items = [
  {
    title: "Overview",
    url: "#",
    icon: Overview,
  },
  {
    title: "Website",
    url: "#",
    icon: Website,
  },
  {
    title: "Pitch",
    url: "#",
    icon: Pitch,
  },
]


const AppSidebar = () => {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader className="py-4">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/">
                        <Image src="/logo.svg" alt="Logo" width={24} height={24}/>
                        <span className="text-lg font-regular">dataEdu</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        {/* <SidebarSeparator /> */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-base font-regular">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            {/* Colocar o Icon do Github */}
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="https://github.com/caioamaral-io/Dashboard" target="_blank" rel="noopener noreferrer">
                    <Github />
                    <span className="text-base font-regular">GitHub</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    );
};

export default AppSidebar