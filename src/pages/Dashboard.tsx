import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { MoneyLostChart } from "@/components/Dashboard/MoneyLostChart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointer,
  ShoppingCart,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const navigate = useNavigate();

  // CRO-focused metrics
  const metrics = {
    conversionRate: 3.24,
    conversionChange: 12.5,
    totalVisitors: 24867,
    visitorsChange: 8.3,
    revenue: 125430,
    revenueChange: 15.7,
    avgOrderValue: 89.50,
    aovChange: -2.1
  };

  // Conversion funnel data
  const funnelData = [
    { stage: "Visitors", count: 24867, rate: 100 },
    { stage: "Product Views", count: 12434, rate: 50.0 },
    { stage: "Add to Cart", count: 3730, rate: 15.0 },
    { stage: "Checkout", count: 1243, rate: 5.0 },
    { stage: "Purchase", count: 806, rate: 3.24 }
  ];

  // Performance trends over time
  const performanceData = [
    { date: "Jan", conversionRate: 2.8, revenue: 98000, visitors: 18500 },
    { date: "Feb", conversionRate: 2.9, revenue: 105000, visitors: 19200 },
    { date: "Mar", conversionRate: 3.1, revenue: 112000, visitors: 20100 },
    { date: "Apr", conversionRate: 3.0, revenue: 108000, visitors: 19800 },
    { date: "May", conversionRate: 3.2, revenue: 118000, visitors: 21200 },
    { date: "Jun", conversionRate: 3.24, revenue: 125430, visitors: 24867 }
  ];

  // Recent A/B tests
  const abTests = [
    {
      id: "1",
      name: "Checkout Button Color",
      status: "running",
      uplift: 8.3,
      confidence: 85,
      variant: "Green vs Blue"
    },
    {
      id: "2", 
      name: "Product Page Layout",
      status: "completed",
      uplift: 12.7,
      confidence: 95,
      variant: "Grid vs List"
    },
    {
      id: "3",
      name: "Trust Badges Position",
      status: "completed",
      uplift: 15.2,
      confidence: 98,
      variant: "Header vs Footer"
    }
  ];

  // Top recommendations
  const recommendations = [
    {
      id: "1",
      title: "Optimize mobile checkout flow",
      impact: "High",
      expectedUplift: "+18%",
      effort: "Medium",
      category: "Mobile UX"
    },
    {
      id: "2",
      title: "Add social proof to product pages",
      impact: "High", 
      expectedUplift: "+12%",
      effort: "Low",
      category: "Trust Building"
    },
    {
      id: "3",
      title: "Implement exit-intent popup",
      impact: "Medium",
      expectedUplift: "+8%",
      effort: "Low", 
      category: "Retention"
    },
    {
      id: "4",
      title: "A/B test shipping thresholds",
      impact: "Medium",
      expectedUplift: "+6%",
      effort: "Low",
      category: "Pricing"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "running":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const handleViewAllRecommendations = () => {
    navigate("/analysis");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">CRO Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Conversion optimization insights for {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={timeRange === "7d" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeRange("7d")}
                >
                  7 Days
                </Button>
                <Button 
                  variant={timeRange === "30d" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeRange("30d")}
                >
                  30 Days
                </Button>
                <Button 
                  variant={timeRange === "90d" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeRange("90d")}
                >
                  90 Days
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                    <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{metrics.conversionChange}% vs last period
                    </div>
                  </div>
                  <Target className="h-6 w-6 text-primary" />
                </CardHeader>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors</CardTitle>
                    <div className="text-2xl font-bold">{metrics.totalVisitors.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{metrics.visitorsChange}% vs last period
                    </div>
                  </div>
                  <Users className="h-6 w-6 text-blue-500" />
                </CardHeader>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
                    <div className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{metrics.revenueChange}% vs last period
                    </div>
                  </div>
                  <ShoppingCart className="h-6 w-6 text-green-500" />
                </CardHeader>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Avg Order Value</CardTitle>
                    <div className="text-2xl font-bold">${metrics.avgOrderValue}</div>
                    <div className="flex items-center text-xs text-red-600 mt-1">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      {metrics.aovChange}% vs last period
                    </div>
                  </div>
                  <MousePointer className="h-6 w-6 text-purple-500" />
                </CardHeader>
              </Card>
            </div>

            {/* Charts Row - Updated to include Money Lost Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Money Lost Chart - New Addition */}
              <MoneyLostChart />

              {/* Performance Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Trends
                  </CardTitle>
                  <CardDescription>Conversion rate and revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      conversionRate: { label: "Conversion Rate", color: "hsl(var(--primary))" },
                      revenue: { label: "Revenue", color: "hsl(var(--secondary))" }
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="conversionRate"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="revenue"
                          stroke="hsl(var(--secondary))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--secondary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Conversion Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Conversion Funnel
                  </CardTitle>
                  <CardDescription>User journey breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {funnelData.map((stage, index) => (
                      <div key={stage.stage} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-medium">{stage.stage}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">
                            {stage.count.toLocaleString()} ({stage.rate}%)
                          </span>
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${stage.rate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* A/B Tests and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active A/B Tests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    A/B Tests
                  </CardTitle>
                  <CardDescription>Current and recent experiments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {abTests.map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(test.status)}
                          <div>
                            <p className="font-medium text-sm">{test.name}</p>
                            <p className="text-xs text-muted-foreground">{test.variant}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">
                            +{test.uplift}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {test.confidence}% confidence
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>Optimization opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{rec.title}</p>
                          <p className="text-xs text-muted-foreground">{rec.category}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getImpactColor(rec.impact)}>
                            {rec.impact}
                          </Badge>
                          <span className="text-sm font-medium text-green-600">
                            {rec.expectedUplift}
                          </span>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={handleViewAllRecommendations}
                    >
                      View All Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
