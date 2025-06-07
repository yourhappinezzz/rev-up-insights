
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  Search,
  Globe,
  Zap,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  Users,
  MousePointer,
  Target,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Plus,
  X,
  Download,
  Share2,
  Smartphone,
  BarChart3
} from "lucide-react";

interface CompetitorSite {
  id: string;
  url: string;
  name: string;
  isYourSite?: boolean;
}

interface AuditMetrics {
  seoScore: number;
  pageSpeed: number;
  mobileScore: number;
  uxScore: number;
  contentScore: number;
  ctaCount: number;
  loadTime: number;
  conversionRate: number;
  trustSignals: number;
}

interface CompetitorData extends CompetitorSite {
  metrics: AuditMetrics;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

const CHART_COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

export function CompetitorAnalysis() {
  const { toast } = useToast();
  const [competitorSites, setCompetitorSites] = useState<CompetitorSite[]>([
    { id: "your-site", url: "your-website.com", name: "Your Website", isYourSite: true }
  ]);
  const [newCompetitorUrl, setNewCompetitorUrl] = useState("");
  const [newCompetitorName, setNewCompetitorName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState<CompetitorData[]>([]);

  const mockAnalysisData: CompetitorData[] = [
    {
      id: "your-site",
      url: "your-website.com",
      name: "Your Website",
      isYourSite: true,
      metrics: {
        seoScore: 72,
        pageSpeed: 68,
        mobileScore: 85,
        uxScore: 78,
        contentScore: 80,
        ctaCount: 8,
        loadTime: 2.8,
        conversionRate: 2.4,
        trustSignals: 6
      },
      strengths: ["Strong mobile optimization", "Good content quality", "Effective trust signals"],
      weaknesses: ["Slow page speed", "Limited CTAs", "SEO optimization needed"],
      recommendations: ["Optimize images to improve page speed", "Add more strategic CTAs", "Improve meta tags and keywords"]
    },
    {
      id: "comp-1",
      url: "competitor-a.com",
      name: "Competitor A",
      metrics: {
        seoScore: 88,
        pageSpeed: 82,
        mobileScore: 79,
        uxScore: 85,
        contentScore: 75,
        ctaCount: 12,
        loadTime: 2.1,
        conversionRate: 3.2,
        trustSignals: 9
      },
      strengths: ["Excellent SEO optimization", "Fast loading speed", "Multiple effective CTAs"],
      weaknesses: ["Mobile experience could improve", "Content engagement lower"],
      recommendations: ["Learn from their SEO strategy", "Implement similar CTA placement", "Study their page speed optimizations"]
    },
    {
      id: "comp-2",
      url: "competitor-b.com",
      name: "Competitor B",
      metrics: {
        seoScore: 65,
        pageSpeed: 75,
        mobileScore: 92,
        uxScore: 82,
        contentScore: 88,
        ctaCount: 10,
        loadTime: 2.5,
        conversionRate: 2.8,
        trustSignals: 7
      },
      strengths: ["Outstanding mobile experience", "High-quality content", "Good user experience"],
      weaknesses: ["SEO needs improvement", "Fewer trust signals"],
      recommendations: ["Capitalize on their weaker SEO", "Match their mobile optimization", "Learn from their content strategy"]
    }
  ];

  const addCompetitor = () => {
    if (!newCompetitorUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a competitor URL.",
        variant: "destructive",
      });
      return;
    }

    if (competitorSites.length >= 4) {
      toast({
        title: "Maximum Reached",
        description: "You can analyze up to 3 competitors at once.",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(newCompetitorUrl.startsWith('http') ? newCompetitorUrl : `https://${newCompetitorUrl}`);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL.",
        variant: "destructive",
      });
      return;
    }

    const newCompetitor: CompetitorSite = {
      id: `comp-${Date.now()}`,
      url: newCompetitorUrl,
      name: newCompetitorName || newCompetitorUrl.replace(/^https?:\/\//, '').split('.')[0],
    };

    setCompetitorSites([...competitorSites, newCompetitor]);
    setNewCompetitorUrl("");
    setNewCompetitorName("");
  };

  const removeCompetitor = (id: string) => {
    setCompetitorSites(competitorSites.filter(site => site.id !== id));
  };

  const runAnalysis = async () => {
    if (competitorSites.length < 2) {
      toast({
        title: "Add Competitors",
        description: "Please add at least one competitor to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 500);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      
      // Filter mock data to match selected competitors
      const filteredData = mockAnalysisData.filter(data => 
        competitorSites.some(site => site.id === data.id)
      );
      setAnalysisData(filteredData);
      
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${competitorSites.length} websites`,
      });
    }, 4000);
  };

  const getMetricColor = (yourScore: number, competitorScore: number) => {
    if (yourScore > competitorScore) return "text-green-600";
    if (yourScore < competitorScore) return "text-red-600";
    return "text-yellow-600";
  };

  const getGapAnalysis = () => {
    if (analysisData.length < 2) return [];
    
    const yourSite = analysisData.find(d => d.isYourSite);
    const competitors = analysisData.filter(d => !d.isYourSite);
    
    if (!yourSite) return [];

    const gaps = [];
    
    competitors.forEach(competitor => {
      Object.entries(competitor.metrics).forEach(([metric, value]) => {
        const yourValue = yourSite.metrics[metric as keyof AuditMetrics];
        if (typeof value === 'number' && typeof yourValue === 'number' && value > yourValue) {
          const gap = value - yourValue;
          gaps.push({
            metric: metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            competitor: competitor.name,
            gap: gap,
            opportunity: `Improve by ${gap.toFixed(1)} points to match ${competitor.name}`
          });
        }
      });
    });

    return gaps.sort((a, b) => b.gap - a.gap).slice(0, 5);
  };

  const prepareChartData = () => {
    if (analysisData.length === 0) return [];
    
    const metrics = ['seoScore', 'pageSpeed', 'mobileScore', 'uxScore', 'contentScore'];
    return metrics.map(metric => {
      const data: any = { metric: metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) };
      analysisData.forEach((site, index) => {
        data[site.name] = site.metrics[metric as keyof AuditMetrics];
      });
      return data;
    });
  };

  const exportReport = () => {
    toast({
      title: "Report Exported",
      description: "Competitor analysis report has been generated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Competitor Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Competitor Websites</span>
          </CardTitle>
          <CardDescription>
            Add up to 3 competitor websites to analyze against your site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Sites */}
          <div className="space-y-2">
            {competitorSites.map((site) => (
              <div key={site.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{site.name}</p>
                    <p className="text-sm text-muted-foreground">{site.url}</p>
                  </div>
                  {site.isYourSite && <Badge variant="outline">Your Site</Badge>}
                </div>
                {!site.isYourSite && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCompetitor(site.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Add New Competitor */}
          {competitorSites.length < 4 && (
            <div className="flex space-x-2">
              <Input
                placeholder="https://competitor.com"
                value={newCompetitorUrl}
                onChange={(e) => setNewCompetitorUrl(e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Competitor Name (optional)"
                value={newCompetitorName}
                onChange={(e) => setNewCompetitorName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addCompetitor}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          )}

          <Button 
            onClick={runAnalysis} 
            disabled={isAnalyzing || competitorSites.length < 2}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Run Competitive Analysis
              </>
            )}
          </Button>

          {/* Progress */}
          {isAnalyzing && (
            <div className="space-y-2">
              <Progress value={analysisProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {analysisProgress < 30 && "Crawling websites..."}
                {analysisProgress >= 30 && analysisProgress < 60 && "Analyzing performance metrics..."}
                {analysisProgress >= 60 && analysisProgress < 90 && "Comparing conversion elements..."}
                {analysisProgress >= 90 && "Generating insights..."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisData.length > 0 && (
        <Tabs defaultValue="comparison" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={exportReport}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <TabsContent value="comparison" className="space-y-6">
            {/* Visual Summary Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>Key metrics comparison across all websites</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    seoScore: { label: "SEO Score", color: CHART_COLORS[0] },
                    pageSpeed: { label: "Page Speed", color: CHART_COLORS[1] },
                    mobileScore: { label: "Mobile Score", color: CHART_COLORS[2] },
                    uxScore: { label: "UX Score", color: CHART_COLORS[3] },
                    contentScore: { label: "Content Score", color: CHART_COLORS[4] }
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prepareChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      {analysisData.map((site, index) => (
                        <Bar 
                          key={site.id} 
                          dataKey={site.name} 
                          fill={CHART_COLORS[index % CHART_COLORS.length]} 
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Side-by-Side Audit Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      {analysisData.map(site => (
                        <TableHead key={site.id}>
                          {site.name}
                          {site.isYourSite && <Badge variant="outline" className="ml-2">You</Badge>}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">SEO Score</TableCell>
                      {analysisData.map(site => (
                        <TableCell key={site.id}>
                          <div className="flex items-center space-x-2">
                            <span>{site.metrics.seoScore}</span>
                            <Progress value={site.metrics.seoScore} className="w-16 h-2" />
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Page Speed</TableCell>
                      {analysisData.map(site => (
                        <TableCell key={site.id}>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{site.metrics.loadTime}s</span>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mobile Score</TableCell>
                      {analysisData.map(site => (
                        <TableCell key={site.id}>
                          <div className="flex items-center space-x-2">
                            <Smartphone className="w-4 h-4" />
                            <span>{site.metrics.mobileScore}</span>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CTA Count</TableCell>
                      {analysisData.map(site => (
                        <TableCell key={site.id}>
                          <div className="flex items-center space-x-2">
                            <MousePointer className="w-4 h-4" />
                            <span>{site.metrics.ctaCount}</span>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Conversion Rate</TableCell>
                      {analysisData.map(site => (
                        <TableCell key={site.id}>
                          <span>{site.metrics.conversionRate}%</span>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gaps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span>Gap Analysis & Opportunities</span>
                </CardTitle>
                <CardDescription>
                  Areas where competitors outperform you and actionable recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getGapAnalysis().map((gap, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{gap.metric}</h4>
                        <Badge variant="outline" className="text-red-600">
                          -{gap.gap.toFixed(1)} points
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{gap.opportunity}</p>
                    </div>
                  ))}
                  {getGapAnalysis().length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                      <h3 className="text-lg font-medium mb-2">You're Leading!</h3>
                      <p className="text-muted-foreground">Your website performs better than competitors in all key metrics.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysisData.filter(d => !d.isYourSite).map(competitor => (
                <Card key={competitor.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{competitor.name}</span>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </Button>
                    </CardTitle>
                    <CardDescription>{competitor.url}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Strengths
                      </h4>
                      <ul className="text-sm space-y-1">
                        {competitor.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-600 mb-2 flex items-center">
                        <TrendingDown className="w-4 h-4 mr-2" />
                        Weaknesses
                      </h4>
                      <ul className="text-sm space-y-1">
                        {competitor.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <AlertTriangle className="w-3 h-3 text-red-500 mt-1" />
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-600 mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Learn From Them
                      </h4>
                      <ul className="text-sm space-y-1">
                        {competitor.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <Target className="w-3 h-3 text-blue-500 mt-1" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
