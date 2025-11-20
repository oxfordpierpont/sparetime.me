"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Calendar,
  Link as LinkIcon,
  Clock,
  Settings,
  Shield,
  BarChart3,
  LogOut,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Alex Smith",
    email: "alex@example.com",
    avatar: "/avatars/default.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
      items: [
        {
          title: "Day View",
          url: "/dashboard/calendar/day",
        },
        {
          title: "Week View",
          url: "/dashboard/calendar/week",
        },
      ],
    },
    {
      title: "My Links",
      url: "/dashboard/links",
      icon: LinkIcon,
      items: [
        {
          title: "All Links",
          url: "/dashboard/links",
        },
        {
          title: "Create Link",
          url: "/dashboard/links/create",
        },
      ],
    },
    {
      title: "Requests",
      url: "/dashboard/requests",
      icon: Clock,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Protected Time",
      url: "/dashboard/protected-time",
      icon: Shield,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Privacy",
          url: "/dashboard/settings/privacy",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Sign Out",
      url: "/",
      icon: LogOut,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader className="pt-4 pb-6 px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between gap-2 w-full">
              <SidebarMenuButton size="lg" asChild className="h-auto p-0 hover:bg-transparent flex-1">
                <a href="/dashboard" className="flex items-center justify-center w-full">
                  <img
                    src="/logos/spareTme-primary-logo-design.png"
                    alt="SpareTime"
                    className="w-[60%] h-auto group-data-[collapsible=icon]:hidden"
                  />
                  <img
                    src="/logos/SVG-spareTme-primary-logo-design.svg"
                    alt="SpareTime"
                    className="hidden group-data-[collapsible=icon]:block w-8 h-auto"
                  />
                </a>
              </SidebarMenuButton>
              <SidebarTrigger className="hidden group-data-[collapsible=icon]:block shrink-0" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
