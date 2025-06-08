
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";
import { PlanCard } from "./PlanCard";

export function BillingTab() {
  const { t } = useTranslation(['settings']);
  const [currentPlan, setCurrentPlan] = useState("Professional");
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const [isChangingPlan, setIsChangingPlan] = useState(false);

  const plans = [
    {
      name: t('settings:plans.starter.name'),
      price: 29,
      features: [
        "1 website analysis",
        "Basic AI recommendations", 
        "Weekly performance reports",
        "Email support",
        "Dashboard access"
      ]
    },
    {
      name: t('settings:plans.professional.name'),
      price: 99,
      features: [
        "5 website analyses",
        "Advanced AI recommendations",
        "Real-time analytics", 
        "A/B testing suggestions",
        "Priority support",
        "Custom reports",
        "Integration support"
      ]
    },
    {
      name: t('settings:plans.agency.name'),
      price: 299,
      features: [
        "Unlimited website analyses",
        "White-label reports",
        "Advanced competitor analysis",
        "Custom AI model training", 
        "24/7 dedicated support",
        "API access",
        "Multi-user collaboration",
        "Custom integrations"
      ]
    }
  ];

  const handlePlanChange = (planName: string) => {
    if (planName === currentPlan) return;
    
    setIsChangingPlan(true);
    setSelectedPlan(planName);
    
    setTimeout(() => {
      setCurrentPlan(planName);
      setIsChangingPlan(false);
      
      if (planName === t('settings:plans.agency.name')) {
        toast({
          title: t('settings:chooseYourPlan.planUpgraded'),
          description: t('settings:chooseYourPlan.planUpgradedDesc', { planName }),
        });
      } else if (planName === t('settings:plans.starter.name')) {
        toast({
          title: t('settings:chooseYourPlan.planDowngraded'),
          description: t('settings:chooseYourPlan.planDowngradedDesc', { planName }),
          variant: "destructive"
        });
      } else {
        toast({
          title: t('settings:chooseYourPlan.planChanged'),
          description: t('settings:chooseYourPlan.planChangedDesc', { planName }),
        });
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.chooseYourPlan.title')}</CardTitle>
          <CardDescription>
            {t('settings.chooseYourPlan.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                currentPlan={currentPlan}
                selectedPlan={selectedPlan}
                isChangingPlan={isChangingPlan}
                onPlanChange={handlePlanChange}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('settings.billingHistory.title')}</CardTitle>
          <CardDescription>
            {t('settings.billingHistory.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">Dec 2024 - {currentPlan} Plan</p>
                <p className="text-sm text-muted-foreground">{t('settings.billingHistory.paidOn', { date: 'Dec 1, 2024' })}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  ${plans.find(p => p.name === currentPlan)?.price}.00
                </span>
                <Button variant="outline" size="sm">{t('settings.billingHistory.download')}</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <div>
                <p className="font-medium">Nov 2024 - {currentPlan} Plan</p>
                <p className="text-sm text-muted-foreground">{t('settings.billingHistory.paidOn', { date: 'Nov 1, 2024' })}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  ${plans.find(p => p.name === currentPlan)?.price}.00
                </span>
                <Button variant="outline" size="sm">{t('settings.billingHistory.download')}</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
