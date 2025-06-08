
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Search,
  Settings,
  BarChart3,
  Zap,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Target,
  Brain,
  Bot
} from "lucide-react";

const navigation = [
  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: LayoutDashboard,
    description: "Overview & metrics"
  },
  { 
    name: "Analysis", 
    href: "/analysis", 
    icon: Search,
    description: "Site optimization"
  },
  { 
    name: "Competitor Analysis", 
    href: "/competitor-analysis", 
    icon: BarChart3,
    description: "Market insights"
  },
  { 
    name: "Settings", 
    href: "/settings", 
    icon: Settings,
    description: "Account preferences"
  },
];

export function ModernSidebar() {
  const location = useLocation();
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiResponses, setAiResponses] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleAiChat = async () => {
    if (!aiMessage.trim()) return;
    
    const userMessage = aiMessage;
    setAiMessage("");
    setAiResponses(prev => [...prev, { type: 'user', message: userMessage }]);
    setIsAiThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your current conversion rate of 3.24%, I recommend testing a more prominent call-to-action button above the fold. This could potentially increase conversions by 15-20%.",
        "I notice your bounce rate is higher than average. Consider implementing progressive disclosure in your onboarding flow to reduce cognitive load.",
        "Your mobile traffic shows engagement issues. I suggest A/B testing a simplified mobile checkout process with fewer form fields.",
        "The heat map data indicates users are missing your value proposition. Try moving your key benefits higher on the page with visual hierarchy improvements.",
        "Your exit-intent data suggests price sensitivity. Consider testing a limited-time offer popup or social proof elements to build trust."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiResponses(prev => [...prev, { type: 'ai', message: randomResponse }]);
      setIsAiThinking(false);
    }, 1500);
  };

  return (
    <Sidebar className="border-r border-border/40 bg-gradient-to-b from-sidebar to-sidebar/95">
      <SidebarHeader className="p-6 border-b border-sidebar-border/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-xl shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-sidebar animate-pulse" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AICO
            </h1>
            <p className="text-xs text-muted-foreground">CRO Analytics Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild className={cn(
                      "group relative h-11 rounded-lg transition-all duration-200",
                      isActive ? 
                        "bg-primary/10 text-primary border border-primary/20 shadow-sm" : 
                        "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )}>
                      <Link to={item.href} className="flex items-center space-x-3 px-3">
                        <item.icon className={cn(
                          "w-5 h-5 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                        )} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground/70">{item.description}</div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Assistant Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Brain className="w-3 h-3" />
            AI Assistant
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-3">
              {/* AI Chat Toggle */}
              <Button
                onClick={() => setAiChatOpen(!aiChatOpen)}
                variant={aiChatOpen ? "default" : "outline"}
                className="w-full h-auto p-3 flex items-start space-x-3 rounded-lg border border-border/50 bg-gradient-to-r from-background to-muted/20 hover:from-primary/5 hover:to-primary/10 transition-all duration-200"
              >
                <div className="relative">
                  <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">CRO Expert</div>
                  <div className="text-xs text-muted-foreground">Ask optimization questions</div>
                </div>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </Button>

              {/* AI Chat Interface */}
              {aiChatOpen && (
                <div className="space-y-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="max-h-40 overflow-y-auto space-y-2 text-xs">
                    {aiResponses.length === 0 && (
                      <div className="text-muted-foreground text-center py-2">
                        👋 Ask me about conversion optimization!
                      </div>
                    )}
                    {aiResponses.map((response, index) => (
                      <div key={index} className={cn(
                        "p-2 rounded-md",
                        response.type === 'user' ? 
                          "bg-primary/10 text-primary ml-2" : 
                          "bg-background border border-border/50 mr-2"
                      )}>
                        <div className="flex items-start gap-2">
                          {response.type === 'ai' && <Bot className="w-3 h-3 mt-0.5 text-primary" />}
                          <span className="text-xs leading-relaxed">{response.message}</span>
                        </div>
                      </div>
                    ))}
                    {isAiThinking && (
                      <div className="bg-background border border-border/50 mr-2 p-2 rounded-md">
                        <div className="flex items-center gap-2">
                          <Bot className="w-3 h-3 text-primary" />
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
                      placeholder="Ask about CRO..."
                      className="flex-1 px-2 py-1 text-xs bg-background border border-border/50 rounded focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    />
                    <Button
                      onClick={handleAiChat}
                      size="sm"
                      className="px-2 py-1 h-auto"
                      disabled={!aiMessage.trim() || isAiThinking}
                    >
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Quick AI Insights */}
              <div className="space-y-2">
                <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-700">Live Insight</span>
                    <Badge variant="secondary" className="text-xs px-1 py-0">NEW</Badge>
                  </div>
                  <p className="text-xs text-green-600/80 leading-relaxed">
                    Your conversion rate improved 12% this week. Consider scaling the winning variant.
                  </p>
                </div>

                <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">Opportunity</span>
                  </div>
                  <p className="text-xs text-blue-600/80 leading-relaxed">
                    Mobile users show 23% higher intent. Optimize mobile checkout flow.
                  </p>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/30">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-sidebar" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">AI Assistant</p>
            <p className="text-xs text-muted-foreground">CRO Expert • Online</p>
          </div>
          <div className="text-xs text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
