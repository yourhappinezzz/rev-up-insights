
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { MetricsChart } from "@/components/Dashboard/MetricsChart";
import { RecommendationsList } from "@/components/Dashboard/RecommendationsList";
import { Link } from "react-router-dom";
import { mockSites } from "@/lib/mockData";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  MousePointer,
  AlertTriangle,
  BarChart3,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const [lostRevenue, setLostRevenue] = useState(47832);

  useEffect(() => {
    const interval = setInterval(() => {
      setLostRevenue(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sites = mockSites;

  const handleViewDetails = (siteId: string) => {
    console.log(`Navigating to analysis for site: ${siteId}`);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="text-center py-8">
              <h1 className="text-4xl font-bold mb-4">
                AI Conversion Optimizer
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Analyze. Optimize. Convert. Repeat.
              </p>
              
              {/* Lost Opportunity Ticker */}
              <Card className="max-w-md mx-auto bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-200 dark:border-red-800">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Lost Opportunity</p>
                    <p className="text-3xl font-bold text-red-500">
                      ${lostRevenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Revenue lost today due to unoptimized conversions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$210,000</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Conversion Rate</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.75%</div>
                  <div className="flex items-center text-xs text-red-600">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -2.1% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sites</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    Sites being monitored
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <div className="flex items-center text-xs text-blue-600">
                    12 pending implementation
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sites Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sites.map((site) => (
                <Card key={site.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{site.name}</CardTitle>
                        <CardDescription>{site.url}</CardDescription>
                      </div>
                      <Badge variant={site.status === "improving" ? "default" : "destructive"}>
                        {site.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">CRO Score</span>
                          <span className="text-2xl font-bold">{site.score}</span>
                        </div>
                        <Progress value={site.score} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Rate</p>
                          <p className="text-lg font-semibold">{site.conversionRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                          <p className="text-lg font-semibold">${site.revenue.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className={`flex items-center text-sm ${site.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {site.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {Math.abs(site.change)}% vs last month
                        </div>
                        <Link to={`/analysis/${site.id}`}>
                          <Button 
                            size="sm"
                            onClick={() => handleViewDetails(site.id)}
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsChart />
              <RecommendationsList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
