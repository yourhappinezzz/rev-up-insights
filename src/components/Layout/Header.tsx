
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Bell, Search, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
    <header className={cn(
      "flex items-center justify-between bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm",
      isMobile ? "px-4 py-3 h-16" : "px-6 py-4 h-18"
    )}>
      <div className="flex items-center flex-1 min-w-0">
        <div className={cn(
          "relative",
          isMobile ? "w-full max-w-[180px]" : "w-72"
        )}>
          <Search className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground",
            isMobile ? "w-4 h-4" : "w-4 h-4"
          )} />
          <Input
            placeholder={isMobile ? "Search..." : "Search sites, recommendations..."}
            className={cn(
              "pl-10 rounded-xl bg-muted/50 border-border/50 focus:border-primary/30 transition-all duration-200",
              isMobile ? "h-9 text-sm" : "h-10 text-sm"
            )}
          />
        </div>
      </div>

      <div className={cn(
        "flex items-center",
        isMobile ? "space-x-2" : "space-x-3"
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "rounded-xl relative transition-all duration-200 hover:bg-muted/70",
                isMobile ? "h-9 w-9 p-0" : "h-10 w-10 p-0"
              )}
            >
              <Bell className={cn(
                "transition-all duration-200",
                isMobile ? "w-4 h-4" : "w-5 h-5"
              )} />
              <Badge 
                variant="destructive" 
                className={cn(
                  "absolute -top-1 -right-1 flex items-center justify-center rounded-full border-2 border-background animate-pulse",
                  isMobile ? "px-1 min-w-[16px] h-4 text-[10px]" : "px-1.5 min-w-[18px] h-5 text-xs"
                )}
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className={cn(
              "animate-scale-in bg-background/95 backdrop-blur-sm border-border/50",
              isMobile ? "w-80" : "w-96"
            )}
          >
            <div className="p-4 border-b border-border/50">
              <h4 className="font-semibold text-sm">Notifications</h4>
              <p className="text-xs text-muted-foreground mt-1">You have 3 unread notifications</p>
            </div>
            {[
              {
                title: "New recommendation available",
                desc: "Site optimization suggestions for your homepage",
                time: "2 minutes ago"
              },
              {
                title: "Analysis completed",
                desc: "Your site analysis has finished processing",
                time: "1 hour ago"
              },
              {
                title: "Weekly report ready",
                desc: "Your weekly performance report is available",
                time: "3 hours ago"
              }
            ].map((notification, index) => (
              <DropdownMenuItem key={index} className="cursor-pointer p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.desc}</p>
                  <p className="text-xs text-muted-foreground/80">{notification.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <div className="p-3 border-t border-border/50">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-xs hover:bg-muted/50"
                onClick={handleNotificationsClick}
              >
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {!isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-xl h-10 w-10 p-0 transition-all duration-200 hover:bg-muted/70"
              >
                {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-background/95 backdrop-blur-sm border-border/50">
              <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer hover:bg-muted/50">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer hover:bg-muted/50">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer hover:bg-muted/50">
                <span className="mr-2 flex h-4 w-4 items-center justify-center text-xs">
                  <Sun className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <Moon className="h-3 w-3 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
                </span>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-xl p-0 transition-all duration-200 hover:bg-muted/70"
            >
              <Avatar className={cn(
                "border-2 border-primary/20 transition-all duration-200 hover:border-primary/40 hover:shadow-lg",
                isMobile ? "h-8 w-8" : "h-9 w-9"
              )}>
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className={cn(
              "bg-background/95 backdrop-blur-sm border-border/50",
              isMobile ? "w-48" : "w-56"
            )}
          >
            <div className="flex items-center p-3">
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-sm">AI Assistant</p>
                <p className="text-xs text-muted-foreground">admin@aico.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={handleProfileClick}
            >
              <User className={cn("mr-2", isMobile ? "h-4 w-4" : "h-4 w-4")} />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={handleSettingsClick}
            >
              <Settings className={cn("mr-2", isMobile ? "h-4 w-4" : "h-4 w-4")} />
              Settings
            </DropdownMenuItem>
            {isMobile && (
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                {theme === "light" ? "Dark" : "Light"} Mode
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-destructive hover:bg-destructive/10 focus:text-destructive transition-colors"
              onClick={handleSignOut}
            >
              <LogOut className={cn("mr-2", isMobile ? "h-4 w-4" : "h-4 w-4")} />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
