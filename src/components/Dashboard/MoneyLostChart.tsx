
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DollarSign, TrendingDown, AlertTriangle } from "lucide-react";

interface MoneyLostData {
  category: string;
  amount: number;
  color: string;
}

export function MoneyLostChart() {
  const [currentLoss, setCurrentLoss] = useState(0);
  const [lossData, setLossData] = useState<MoneyLostData[]>([
    { category: "Cart Abandonment", amount: 15420, color: "#ef4444" },
    { category: "Slow Loading", amount: 8750, color: "#f97316" },
    { category: "Poor Mobile UX", amount: 12300, color: "#eab308" },
    { category: "Checkout Issues", amount: 9680, color: "#dc2626" },
    { category: "Missing Trust Signals", amount: 6420, color: "#b91c1c" }
  ]);

  // Simulate real-time money loss
  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.random() * 50 + 10; // Random increment between 10-60
      setCurrentLoss(prev => prev + increment);
      
      // Update data with small random variations
      setLossData(prev => prev.map(item => ({
        ...item,
        amount: item.amount + Math.random() * 20 - 10
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalLoss = lossData.reduce((sum, item) => sum + item.amount, 0) + currentLoss;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.category}</p>
          <p className="text-red-500 font-bold">
            ${data.amount.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          Live Money Lost
        </CardTitle>
        <CardDescription>
          Real-time revenue loss due to optimization issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Live Counter */}
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-red-600 animate-pulse">
              ${totalLoss.toLocaleString()}
            </div>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <TrendingDown className="w-4 h-4 text-red-500" />
              Lost this month
            </div>
          </div>

          {/* Circular Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={lossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {lossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {lossData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.category}</span>
                </div>
                <span className="font-medium text-red-600">
                  ${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Real-time indicator */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Updates every 2 seconds
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
