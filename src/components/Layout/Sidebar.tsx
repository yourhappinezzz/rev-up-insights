
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  LayoutDashboard,
  Search,
  Settings,
  ChevronRight,
  Zap,
  Menu,
  X,
  BarChart3,
  PieChart
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analysis", href: "/analysis", icon: Search },
  { name: "Competitor Analysis", href: "/competitor-analysis", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Auto-collapse on mobile and auto-expand on desktop
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
      setMobileOpen(false);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <div className={cn(
        "relative flex flex-col h-screen bg-sidebar border-r transition-all duration-300 shadow-sm z-50",
        isMobile ? (
          mobileOpen ? "fixed left-0 top-0 w-64" : "fixed -left-64 w-64"
        ) : (
          collapsed ? "w-16" : "w-64"
        )
      )}>
        <div className="flex items-center justify-between p-3 sm:p-4 h-[61px] border-b border-sidebar-border">
          {(!collapsed || (isMobile && mobileOpen)) && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-lg shadow-lg">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                AICO
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-1.5 h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-sidebar-accent"
          >
            {(collapsed && !isMobile) || (!mobileOpen && isMobile) ? 
              <Menu className="w-3 h-3 sm:w-4 sm:h-4" /> : 
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            }
          </Button>
        </div>

        <ScrollArea className="flex-1 px-2 sm:px-3 py-3 sm:py-4">
          <nav className="space-y-1 sm:space-y-1.5">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    (collapsed && !isMobile) ? "justify-center px-2" : "justify-between"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className={cn(
                      "w-4 h-4 sm:w-5 sm:h-5", 
                      (!collapsed || (isMobile && mobileOpen)) && "mr-2 sm:mr-3"
                    )} />
                    {(!collapsed || (isMobile && mobileOpen)) && <span>{item.name}</span>}
                  </div>
                  {(!collapsed || (isMobile && mobileOpen)) && isActive && (
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-70" />
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-3 sm:p-4 border-t border-sidebar-border">
          <div className={cn(
            "flex items-center space-x-2 sm:space-x-3",
            (collapsed && !isMobile) && "justify-center"
          )}>
            <div className="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs sm:text-sm font-medium">AI</span>
            </div>
            {(!collapsed || (isMobile && mobileOpen)) && (
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium">AI Assistant</p>
                <p className="text-xs text-muted-foreground">CRO Expert</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu button for when sidebar is hidden */}
      {isMobile && !mobileOpen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm border shadow-md lg:hidden"
        >
          <Menu className="w-4 h-4" />
        </Button>
      )}
    </>
  );
}
