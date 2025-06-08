
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BenefitsSection() {
  const { t } = useTranslation();

  const benefits = [
    t('benefits.increaseConversions'),
    t('benefits.realTimeMonitoring'),
    t('benefits.aiOptimization'),
    t('benefits.easyIntegration'),
    t('benefits.comprehensiveAnalytics')
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">{t('benefits.title')}</h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/signup">
              <Button size="lg">
                {t('benefits.getStartedToday')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <Card className="p-8">
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">+40%</div>
                <div className="text-muted-foreground">{t('benefits.averageIncrease')}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">$2.3M</div>
                  <div className="text-sm text-muted-foreground">{t('benefits.revenueGenerated')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-sm text-muted-foreground">{t('benefits.websitesOptimized')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
