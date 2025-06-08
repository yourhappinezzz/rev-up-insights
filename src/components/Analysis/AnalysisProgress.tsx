
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { Search, Zap } from "lucide-react";

interface AnalysisProgressProps {
  isAnalyzing: boolean;
  analysisProgress: number;
  onRunAnalysis: () => void;
  canAnalyze: boolean;
}

export function AnalysisProgress({ 
  isAnalyzing, 
  analysisProgress, 
  onRunAnalysis, 
  canAnalyze 
}: AnalysisProgressProps) {
  const { t } = useTranslation();

  const handleRunAnalysis = () => {
    console.log("Button clicked - canAnalyze:", canAnalyze, "isAnalyzing:", isAnalyzing);
    if (!isAnalyzing && canAnalyze) {
      console.log("Calling onRunAnalysis function");
      onRunAnalysis();
    } else {
      console.log("Analysis blocked - either already analyzing or can't analyze");
    }
  };

  console.log("AnalysisProgress rendered - canAnalyze:", canAnalyze, "isAnalyzing:", isAnalyzing);

  const getProgressText = () => {
    if (analysisProgress < 30) return t('competitorAnalysis.crawlingWebsites');
    if (analysisProgress < 60) return t('competitorAnalysis.analyzingMetrics');
    if (analysisProgress < 90) return t('competitorAnalysis.comparingElements');
    return t('competitorAnalysis.generatingInsights');
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleRunAnalysis} 
        disabled={isAnalyzing || !canAnalyze}
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <Zap className="w-4 h-4 mr-2 animate-spin" />
            {t('analysis.analyzing')}
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            {t('competitorAnalysis.runCompetitiveAnalysis')}
          </>
        )}
      </Button>

      {isAnalyzing && (
        <div className="space-y-2">
          <Progress value={analysisProgress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {getProgressText()}
          </p>
        </div>
      )}
    </div>
  );
}
