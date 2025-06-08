
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { MobileHeader } from "@/components/Layout/MobileHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import CompetitorAnalysis from "./pages/CompetitorAnalysis";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const publicPages = ['/', '/login', '/signup', '/pricing', '/contact', '/about', '/terms', '/privacy'];
  const isPublicPage = publicPages.includes(location.pathname);

  if (isPublicPage) {
    return (
      <div className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }

  if (isMobile) {
    return (
      <SidebarProvider>
        <div className="min-h-screen w-full flex flex-col bg-background">
          <AppSidebar />
          <MobileHeader />
          <main className="flex-1 overflow-auto px-3 py-4">
            <div className="w-full max-w-full space-y-4">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analysis/:siteId?" element={<Analysis />} />
                <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-auto bg-background p-6">
            <div className="w-full max-w-full space-y-6">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analysis/:siteId?" element={<Analysis />} />
                <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="aico-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
