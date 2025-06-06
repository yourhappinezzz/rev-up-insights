
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Globe,
  Zap,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  Users,
  MousePointer
} from "lucide-react";

export default function Analysis() {
  const { siteId } = useParams();
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const recommendations = [
    {
      id: "1",
      title: "Add trust badges and security certificates",
      description: "Display SSL certificates, payment security badges, and customer testimonials near the checkout area to increase trust and reduce abandonment.",
      impact: "High",
      expectedUplift: "+15%",
      difficulty: "Easy",
      estimatedTime: "2 hours",
      category: "Trust & Security",
      implemented: false,
      details: [
        "Add SSL certificate badge",
        "Display payment security icons", 
        "Include customer testimonials",
        "Show money-back guarantee"
      ]
    },
    {
      id: "2",
      title: "Optimize mobile checkout flow",
      description: "Simplify the mobile checkout process by reducing steps, improving form design, and adding mobile-specific payment options.",
      impact: "High", 
      expectedUplift: "+22%",
      difficulty: "Medium",
      estimatedTime: "1 week",
      category: "Mobile UX",
      implemented: false,
      details: [
        "Reduce checkout steps from 4 to 2",
        "Implement autofill for forms",
        "Add Apple Pay and Google Pay",
        "Optimize button sizes for mobile"
      ]
    },
    {
      id: "3",
      title: "A/B test call-to-action button variations",
      description: "Test different CTA button colors, sizes, and text to find the highest converting combination.",
      impact: "Medium",
      expectedUplift: "+8%", 
      difficulty: "Easy",
      estimatedTime: "3 hours",
      category: "CTA Optimization",
      implemented: true,
      details: [
        "Test 3 button colors: blue, green, orange",
        "Try different button text variations",
        "Test button placement",
        "Measure click-through rates"
      ]
    },
    {
      id: "4",
      title: "Reduce contact form fields",
      description: "Minimize form friction by removing non-essential fields and implementing progressive disclosure.",
      impact: "Medium",
      expectedUplift: "+12%",
      difficulty: "Easy", 
      estimatedTime: "1 hour",
      category: "Form Optimization",
      implemented: false,
      details: [
        "Remove optional fields",
        "Use smart defaults",
        "Implement field validation",
        "Add progress indicators"
      ]
    }
  ];

  const siteData = {
    name: "E-commerce Store",
    url: "shop.example.com",
    score: 72,
    lastAnalyzed: "2 hours ago",
    metrics: {
      conversionRate: 2.4,
      bounceRate: 45,
      avgSessionDuration: "3:24",
      pageViews: 15420
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* URL Analysis Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Website Analysis</span>
                </CardTitle>
                <CardDescription>
                  Enter a URL to get AI-powered CRO recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAnalyze} disabled={isAnalyzing || !url}>
                    {isAnalyzing ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Globe className="w-4 h-4 mr-2" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
                {isAnalyzing && (
                  <div className="mt-4 space-y-2">
                    <Progress value={33} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Crawling website and analyzing conversion potential...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Site Overview */}
            {siteId && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{siteData.name}</CardTitle>
                      <CardDescription>{siteData.url}</CardDescription>
                    </div>
                    <Badge variant="outline">Last analyzed: {siteData.lastAnalyzed}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-1">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-3xl font-bold mb-2">{siteData.score}</div>
                        <Progress value={siteData.score} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">CRO Score</p>
                      </div>
                    </div>
                    <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <MousePointer className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <div className="text-lg font-semibold">{siteData.metrics.conversionRate}%</div>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
                        <div className="text-lg font-semibold">{siteData.metrics.bounceRate}%</div>
                        <p className="text-sm text-muted-foreground">Bounce Rate</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                        <div className="text-lg font-semibold">{siteData.metrics.avgSessionDuration}</div>
                        <p className="text-sm text-muted-foreground">Avg. Session</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Users className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <div className="text-lg font-semibold">{siteData.metrics.pageViews.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">Page Views</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>
                  Prioritized list of conversion optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All ({recommendations.length})</TabsTrigger>
                    <TabsTrigger value="pending">Pending ({recommendations.filter(r => !r.implemented).length})</TabsTrigger>
                    <TabsTrigger value="implemented">Done ({recommendations.filter(r => r.implemented).length})</TabsTrigger>
                    <TabsTrigger value="high">High Impact</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <div className="space-y-4">
                      {recommendations.map((rec) => (
                        <Card key={rec.id} className={`transition-all hover:shadow-lg ${rec.implemented ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start space-x-3">
                                <Checkbox
                                  checked={rec.implemented}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-2">{rec.title}</h3>
                                  <p className="text-muted-foreground mb-3">{rec.description}</p>
                                  
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge variant={rec.impact === "High" ? "destructive" : "default"}>
                                      {rec.impact} Impact
                                    </Badge>
                                    <Badge variant="outline">{rec.expectedUplift}</Badge>
                                    <Badge variant="secondary">{rec.difficulty}</Badge>
                                    <Badge variant="outline">{rec.estimatedTime}</Badge>
                                  </div>

                                  <details className="mt-3">
                                    <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800">
                                      View Implementation Details
                                    </summary>
                                    <ul className="mt-2 ml-4 space-y-1">
                                      {rec.details.map((detail, index) => (
                                        <li key={index} className="text-sm text-muted-foreground">
                                          • {detail}
                                        </li>
                                      ))}
                                    </ul>
                                  </details>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {rec.implemented ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Button size="sm">Mark as Done</Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="pending">
                    <div className="space-y-4">
                      {recommendations.filter(r => !r.implemented).map((rec) => (
                        <div key={rec.id} className="p-4 border rounded-lg">
                          <h3 className="font-semibold">{rec.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="implemented">
                    <div className="space-y-4">
                      {recommendations.filter(r => r.implemented).map((rec) => (
                        <div key={rec.id} className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <h3 className="font-semibold">{rec.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="high">
                    <div className="space-y-4">
                      {recommendations.filter(r => r.impact === "High").map((rec) => (
                        <div key={rec.id} className="p-4 border rounded-lg border-red-200 dark:border-red-800">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <h3 className="font-semibold">{rec.title}</h3>
                            <Badge variant="destructive">High Impact</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
