
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CompetitorInput } from "./CompetitorInput";
import { AnalysisProgress } from "./AnalysisProgress";
import { AnalysisResults } from "./AnalysisResults";

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

export function CompetitorAnalysis() {
  const { toast } = useToast();
  const [competitorSites, setCompetitorSites] = useState<CompetitorSite[]>([
    { id: "your-site", url: "your-website.com", name: "Your Website", isYourSite: true }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState<CompetitorData[]>([]);

  console.log("CompetitorAnalysis component rendered");
  console.log("Current competitor sites:", competitorSites);
  console.log("Analysis data:", analysisData);

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

  const runAnalysis = async () => {
    console.log("Starting analysis...");
    
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
      
      console.log("Analysis complete, setting data:", filteredData);
      
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${competitorSites.length} websites`,
      });
    }, 4000);
  };

  const exportReport = () => {
    console.log("Exporting report...");
    toast({
      title: "Report Exported",
      description: "Competitor analysis report has been generated.",
    });
  };

  return (
    <div className="space-y-6">
      <CompetitorInput 
        competitorSites={competitorSites}
        onCompetitorSitesChange={setCompetitorSites}
      />
      
      <AnalysisProgress
        isAnalyzing={isAnalyzing}
        analysisProgress={analysisProgress}
        onRunAnalysis={runAnalysis}
        canAnalyze={competitorSites.length >= 2}
      />

      {analysisData.length > 0 && (
        <AnalysisResults 
          analysisData={analysisData}
          onExportReport={exportReport}
        />
      )}
    </div>
  );
}
