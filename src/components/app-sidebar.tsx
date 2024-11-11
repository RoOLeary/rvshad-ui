import { Calendar, Inbox, Settings, UserRoundPen } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

// Menu items.
const items = [
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    sublinks: [
      { title: "Sublink 1", url: "#" },
      { title: "Sublink 2", url: "#" },
      { title: "Sublink 3", url: "#" },
    ],
  },
  {
    title: "Universe",
    url: "/library/overview",
    icon: Calendar,
    sublinks: [
      { title: "Sublink A", url: "#" },
      { title: "Sublink B", url: "#" },
      { title: "Sublink C", url: "#" },
    ],
  },
];

const advancedItems = [
  {
    title: "Advanced Search",
    url: "/queries",
    icon: Calendar,
    sublinks: [
      { title: "Sublink X", url: "#" },
      { title: "Sublink Y", url: "#" },
      { title: "Sublink Z", url: "#" },
    ],
  },
  {
    title: "Q&A",
    url: "https://use-ui.findest.com/?email=ronan.oleary@findest.eu&tenant=Ro3Test",
    icon: Settings,
    sublinks: [
      { title: "Sublink I", url: "#" },
      { title: "Sublink II", url: "#" },
      { title: "Sublink III", url: "#" },
    ],
  },
];

import logoUniverse from '../assets/universe_logo_white.png';

export function AppSidebar() {
  return (
    <Sidebar className="bg-white">
      <div className="flex mx-auto w-full p-6 items-center justify-center">
        <img src={logoUniverse} className="max-w-[130px] items-center justify-center" />
      </div>
            
      <SidebarContent className="justify-between">
            
        <div className="group1 gap-10 p-4">
        <SidebarGroup>
          <SidebarGroupLabel>
           
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <br />
          <Separator />
          <SidebarGroupLabel className="mt-2">
            
            <h1 className="font-black text-md">IGOR<sup>AI</sup>search</h1>

          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {advancedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        </div>
      

      <div className="justify-end">
      <div className="group2 gap-10 p-4">

        <SidebarGroup className="mt-2">
          <SidebarGroupLabel>
            
          <h1 className="font-black text-md">Profile</h1>

          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={'#'}>
                      <UserRoundPen />
                      <span>Profile</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </div>
      </SidebarContent>
    </Sidebar>
  )
}
