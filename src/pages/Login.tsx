
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Zap, Mail, Lock, Github } from "lucide-react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4">
      <div className="w-full max-w-md space-y-4 sm:space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-3 sm:mb-4">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to AICO
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base px-2">
            AI-powered conversion optimization at your fingertips
          </p>
        </div>

        <Card className="mx-2 sm:mx-0">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl">Sign in to your account</CardTitle>
            <CardDescription className="text-sm">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="pl-10 h-11 sm:h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11 sm:h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-11 sm:h-12 text-sm sm:text-base" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="space-y-4">
              <Separator className="my-4" />
              <div className="text-center text-sm text-muted-foreground">
                Or continue with
              </div>
              
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Button variant="outline" className="h-11 sm:h-12 text-sm">
                  <svg className="w-4 h-4 mr-1 sm:mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="hidden xs:inline">Google</span>
                </Button>
                <Button variant="outline" className="h-11 sm:h-12 text-sm">
                  <Github className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">GitHub</span>
                </Button>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground px-4">
          <p>
            By signing in, you agree to our{" "}
            <Link to="/terms" className="hover:text-foreground underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="hover:text-foreground underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
