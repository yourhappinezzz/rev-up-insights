
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/ThemeProvider";
import { Bell, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function MobileHeader() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-3 h-14 sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <SidebarTrigger className="h-8 w-8" />
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-xl relative h-8 w-8 p-0"
            >
              <Bell className="w-4 h-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 flex items-center justify-center rounded-full border-2 border-background px-1 min-w-[16px] h-4 text-[10px]"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b border-border/50">
              <h4 className="font-semibold text-sm">Notifications</h4>
              <p className="text-xs text-muted-foreground mt-1">3 unread</p>
            </div>
            {[
              {
                title: "New recommendation",
                desc: "Homepage optimization ready",
                time: "2m ago"
              },
              {
                title: "Analysis completed",
                desc: "Site analysis finished",
                time: "1h ago"
              },
              {
                title: "Weekly report",
                desc: "Performance report available",
                time: "3h ago"
              }
            ].map((notification, index) => (
              <DropdownMenuItem key={index} className="cursor-pointer p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.desc}</p>
                  <p className="text-xs text-muted-foreground/80">{notification.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <div className="p-2 border-t border-border/50">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-xs"
                onClick={handleNotificationsClick}
              >
                View all
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-xl p-0 h-8 w-8"
            >
              <Avatar className="h-7 w-7 border-2 border-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="flex items-center p-3">
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-sm">AI Assistant</p>
                <p className="text-xs text-muted-foreground">admin@aico.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={handleProfileClick}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={handleSettingsClick}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
              {theme === "light" ? "Dark" : "Light"} Mode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
