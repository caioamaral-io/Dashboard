import { Home, Inbox, Calendar, Search, Settings } from "lucide-react"
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroupLabel, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator } from "@/components/ui/sidebar"
import Link from "next/link";
import Image from "next/image";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
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
        <SidebarSeparator />
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
        </SidebarFooter>
      </Sidebar>
    );
};

export default AppSidebar