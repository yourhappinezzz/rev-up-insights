
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  Lock,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 210000,
    conversionRate: 1.75,
    activeSites: 2,
    recommendations: 18
  });

  // Mock data for charts
  const tvlData = [
    { name: 'Daily', value: 10.2, color: '#00D4FF' },
    { name: 'Weekly', value: 68.7, color: '#0099CC' }
  ];

  const fearGreedData = [
    { name: 'Greed', value: 72, color: '#00FF88' },
    { name: 'Fear', value: 28, color: '#1a1a1a' }
  ];

  const trendingProjects = [
    { name: 'E-commerce Store', type: 'Project', change: 12.4, positive: true },
    { name: 'SaaS Landing', type: 'Project', change: 8.7, positive: true },
    { name: 'Marketing Site', type: 'Platform', change: -3.2, positive: false },
    { name: 'Mobile App', type: 'Platform', change: 15.3, positive: true },
    { name: 'Blog Site', type: 'Project', change: 9.1, positive: true },
    { name: 'Portfolio', type: 'Platform', change: 4.3, positive: true },
    { name: 'Landing Page', type: 'Platform', change: 21.8, positive: true }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-900 text-white">
          <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">Your CRO insights for {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-gray-400">Market Cap</CardTitle>
                    <div className="text-2xl font-bold text-white">$2475.39B</div>
                    <div className="flex items-center text-xs text-green-400 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      2.3% vs yesterday
                    </div>
                  </div>
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </CardHeader>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-gray-400">Conversion Rate</CardTitle>
                    <div className="text-2xl font-bold text-white">$61284.23</div>
                    <div className="flex items-center text-xs text-green-400 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      4.2% vs yesterday
                    </div>
                  </div>
                  <Activity className="h-6 w-6 text-yellow-400" />
                </CardHeader>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-gray-400">Total Value Locked</CardTitle>
                    <div className="text-2xl font-bold text-white">$46.89B</div>
                    <div className="flex items-center text-xs text-green-400 mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      10.2% vs yesterday
                    </div>
                  </div>
                  <DollarSign className="h-6 w-6 text-green-400" />
                </CardHeader>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium text-gray-400">24h Trading Volume</CardTitle>
                    <div className="text-2xl font-bold text-white">$87.29B</div>
                    <div className="flex items-center text-xs text-red-400 mt-1">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      2.8% vs yesterday
                    </div>
                  </div>
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </CardHeader>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* TVL Change Chart */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-gray-400" />
                    <CardTitle className="text-white">Total Value Locked</CardTitle>
                  </div>
                  <div className="text-2xl font-bold text-white">$46.89B</div>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center">
                    <div className="relative">
                      <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                          <Pie
                            data={tvlData}
                            cx={100}
                            cy={100}
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={180}
                            endAngle={0}
                            dataKey="value"
                          >
                            {tvlData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">TVL Change</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Daily</div>
                      <div className="text-green-400 font-semibold">↗ 10.2%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Weekly</div>
                      <div className="text-green-400 font-semibold">↗ 68.7%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fear & Greed Index */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <CardTitle className="text-white">Fear & Greed Index</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center">
                    <div className="relative">
                      <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                          <Pie
                            data={fearGreedData}
                            cx={100}
                            cy={100}
                            innerRadius={60}
                            outerRadius={90}
                            startAngle={180}
                            endAngle={0}
                            dataKey="value"
                          >
                            {fearGreedData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">72</div>
                          <div className="text-green-400 font-semibold">Greed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <div className="text-sm text-gray-400">Yesterday: 65 → 7</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trending Section */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <CardTitle className="text-white">Trending</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">All</Button>
                    <Button size="sm" variant="ghost" className="text-gray-400">Projects</Button>
                    <Button size="sm" variant="ghost" className="text-gray-400">Platforms</Button>
                    <Button size="sm" variant="ghost" className="text-gray-400">Funds</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                  {trendingProjects.map((project, index) => (
                    <Card key={index} className="bg-gray-700 border-gray-600 p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white text-sm">{project.name}</h3>
                        </div>
                        <div className="text-xs text-gray-400">{project.type}</div>
                        <div className={`text-sm font-semibold ${project.positive ? 'text-green-400' : 'text-red-400'}`}>
                          {project.positive ? '↗' : '↘'} {Math.abs(project.change)}%
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
