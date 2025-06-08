
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { Key, Webhook } from "lucide-react";

export function ApiTab() {
  const { t } = useTranslation(['settings']);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.apiKeys.title')}</CardTitle>
          <CardDescription>
            {t('settings.apiKeys.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5" />
              <div>
                <h4 className="font-medium">{t('settings.apiKeys.productionKey')}</h4>
                <p className="text-sm text-muted-foreground">aico_prod_********************************</p>
              </div>
            </div>
            <Button variant="outline" size="sm">{t('settings.apiKeys.regenerate')}</Button>
          </div>
          <Button>{t('settings.apiKeys.createNew')}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('settings.webhooks.title')}</CardTitle>
          <CardDescription>
            {t('settings.webhooks.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">{t('settings.webhooks.webhookUrl')}</Label>
            <Input
              id="webhook-url"
              placeholder={t('settings.webhooks.webhookUrlPlaceholder')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Webhook className="w-4 h-4" />
            <span className="text-sm">{t('settings.webhooks.events')}</span>
          </div>
          <Button>{t('settings.webhooks.saveWebhook')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
