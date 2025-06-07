
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { CompetitorAnalysis } from "@/components/Analysis/CompetitorAnalysis";

export default function CompetitorAnalysisPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight">Competitor Analysis</h1>
              <p className="text-muted-foreground">
                Analyze competitor websites to identify opportunities and benchmark performance
              </p>
            </div>
            <CompetitorAnalysis />
          </div>
        </main>
      </div>
    </div>
  );
}
