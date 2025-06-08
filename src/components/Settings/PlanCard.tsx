
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PlanCardProps {
  plan: {
    name: string;
    price: number;
    features: string[];
  };
  currentPlan: string;
  selectedPlan: string;
  isChangingPlan: boolean;
  onPlanChange: (planName: string) => void;
}

export function PlanCard({ 
  plan, 
  currentPlan, 
  selectedPlan, 
  isChangingPlan, 
  onPlanChange 
}: PlanCardProps) {
  const { t } = useTranslation(['settings']);

  return (
    <div 
      className={`relative p-6 border rounded-lg transition-all flex flex-col ${
        currentPlan === plan.name 
          ? "border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20" 
          : "border hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{plan.name}</h3>
        {currentPlan === plan.name && (
          <Badge className="bg-blue-500">{t('settings:chooseYourPlan.current')}</Badge>
        )}
      </div>
      
      <p className="text-3xl font-bold mb-4">
        ${plan.price}
        <span className="text-sm font-normal text-muted-foreground">{t('settings:chooseYourPlan.month')}</span>
      </p>
      
      <ul className="space-y-3 mb-6 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      
      <Button 
        className="w-full mt-auto" 
        variant={currentPlan === plan.name ? "secondary" : "default"}
        disabled={currentPlan === plan.name || isChangingPlan}
        onClick={() => onPlanChange(plan.name)}
      >
        {isChangingPlan && selectedPlan === plan.name ? (
          t('settings:chooseYourPlan.changingPlan')
        ) : currentPlan === plan.name ? (
          t('settings:chooseYourPlan.currentPlan')
        ) : (
          t('settings:chooseYourPlan.selectPlan')
        )}
      </Button>
    </div>
  );
}
