
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { BarChart3, ShoppingCart, CreditCard } from "lucide-react";

export function IntegrationsTab() {
  const { t } = useTranslation(['settings']);

  const integrations = [
    {
      name: t('settings:dataIntegrations.googleAnalytics'),
      icon: BarChart3,
      description: t('settings:dataIntegrations.googleAnalyticsDesc'),
      status: "connected",
      lastSync: "2 hours ago"
    },
    {
      name: t('settings:dataIntegrations.shopify'),
      icon: ShoppingCart, 
      description: t('settings:dataIntegrations.shopifyDesc'),
      status: "disconnected",
      lastSync: null
    },
    {
      name: t('settings:dataIntegrations.stripe'),
      icon: CreditCard,
      description: t('settings:dataIntegrations.stripeDesc'),
      status: "connected",
      lastSync: "5 minutes ago"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.dataIntegrations.title')}</CardTitle>
          <CardDescription>
            {t('settings.dataIntegrations.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-lg">
                  <integration.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  {integration.lastSync && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('settings.dataIntegrations.lastSync', { time: integration.lastSync })}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                  {t(`settings.dataIntegrations.${integration.status}`)}
                </Badge>
                <Button variant="outline" size="sm">
                  {integration.status === "connected" ? t('settings.dataIntegrations.configure') : t('settings.dataIntegrations.connect')}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('settings.dataIntegrations.connectionTest.title')}</CardTitle>
          <CardDescription>
            {t('settings.dataIntegrations.connectionTest.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>{t('settings.dataIntegrations.connectionTest.run')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
