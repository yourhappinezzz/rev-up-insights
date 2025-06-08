
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  LayoutDashboard,
  Search,
  Settings,
  Zap,
  BarChart3,
  User,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analysis", href: "/analysis", icon: Search },
  { name: "Competitor Analysis", href: "/competitor-analysis", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  return (
    <Sidebar className="border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-lg shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {state === "expanded" && (
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              AICO
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarMenu>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
            
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link to={item.href} className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full flex items-center justify-center shadow-md">
            <User className="w-5 h-5 text-white" />
          </div>
          {state === "expanded" && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">AI Assistant</p>
              <p className="text-xs text-muted-foreground">CRO Expert</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
