
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
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
  ExternalLink
} from "lucide-react";

interface CompetitorData {
  url: string;
  name: string;
  score: number;
  conversionRate: number;
  loadTime: number;
  mobileOptimized: boolean;
  hasSSL: boolean;
  socialProof: number;
  ctaCount: number;
  formOptimization: number;
  trustSignals: string[];
  weaknesses: string[];
  strengths: string[];
  recommendations: string[];
}

export function CompetitorAnalysis() {
  const { toast } = useToast();
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [competitorData, setCompetitorData] = useState<CompetitorData | null>(null);

  const mockCompetitorData: CompetitorData = {
    url: "competitor-site.com",
    name: "Competitor Store",
    score: 68,
    conversionRate: 1.8,
    loadTime: 3.2,
    mobileOptimized: true,
    hasSSL: true,
    socialProof: 7,
    ctaCount: 12,
    formOptimization: 75,
    trustSignals: ["SSL Certificate", "Customer Reviews", "Money-back Guarantee", "Secure Payment"],
    weaknesses: [
      "Slow loading speed (3.2s)",
      "Too many form fields in checkout",
      "Missing mobile-specific CTAs",
      "No exit-intent popups",
      "Limited social proof on product pages"
    ],
    strengths: [
      "Strong SSL implementation",
      "Good mobile responsiveness",
      "Clear value propositions",
      "Multiple payment options",
      "Active customer reviews"
    ],
    recommendations: [
      "Optimize images to reduce load time by 40%",
      "Reduce checkout form fields from 8 to 4",
      "Add urgency indicators on product pages",
      "Implement exit-intent popups",
      "Add more customer testimonials"
    ]
  };

  const handleAnalyzeCompetitor = async () => {
    if (!competitorUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a competitor URL to analyze.",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(competitorUrl.startsWith('http') ? competitorUrl : `https://${competitorUrl}`);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://competitor.com).",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCompetitorData(null);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      setCompetitorData({
        ...mockCompetitorData,
        url: competitorUrl,
        name: competitorUrl.replace(/^https?:\/\//, '').split('.')[0]
      });
      
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${competitorUrl}`,
      });
    }, 4000);
  };

  return (
    <Card className="card-shake">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="w-5 h-5" />
          <span>Competitor Analysis</span>
        </CardTitle>
        <CardDescription>
          Analyze competitor websites to identify opportunities and benchmark performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* URL Input */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              placeholder="https://competitor-site.com"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeCompetitor()}
            />
          </div>
          <Button onClick={handleAnalyzeCompetitor} disabled={isAnalyzing || !competitorUrl.trim()}>
            {isAnalyzing ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze
              </>
            )}
          </Button>
        </div>

        {/* Progress */}
        {isAnalyzing && (
          <div className="space-y-2">
            <Progress value={analysisProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {analysisProgress < 30 && "Crawling website structure..."}
              {analysisProgress >= 30 && analysisProgress < 60 && "Analyzing conversion elements..."}
              {analysisProgress >= 60 && analysisProgress < 90 && "Evaluating user experience..."}
              {analysisProgress >= 90 && "Generating insights..."}
            </p>
          </div>
        )}

        {/* Results */}
        {competitorData && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold mb-2">{competitorData.score}</div>
                <Progress value={competitorData.score} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">CRO Score</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <MousePointer className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-lg font-semibold">{competitorData.conversionRate}%</div>
                <p className="text-sm text-muted-foreground">Est. Conversion Rate</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                <div className="text-lg font-semibold">{competitorData.loadTime}s</div>
                <p className="text-sm text-muted-foreground">Load Time</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-lg font-semibold">{competitorData.ctaCount}</div>
                <p className="text-sm text-muted-foreground">CTA Elements</p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Technical Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>SSL Certificate</span>
                        {competitorData.hasSSL ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mobile Optimized</span>
                        {competitorData.mobileOptimized ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Form Optimization</span>
                        <Badge variant="outline">{competitorData.formOptimization}%</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Trust Signals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {competitorData.trustSignals.map((signal, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{signal}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="strengths" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span>What They're Doing Right</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {competitorData.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <p className="text-sm">{strength}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weaknesses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingDown className="w-5 h-5 text-red-500" />
                      <span>Areas for Improvement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {competitorData.weaknesses.map((weakness, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                          <p className="text-sm">{weakness}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="opportunities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-500" />
                      <span>Your Competitive Advantages</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {competitorData.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                          <p className="text-sm">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Analyzed: {competitorData.url}
                </span>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Site
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
