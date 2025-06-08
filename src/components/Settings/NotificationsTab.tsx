
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

export function NotificationsTab() {
  const { t } = useTranslation(['settings', 'common']);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.emailNotifications.title')}</CardTitle>
          <CardDescription>
            {t('settings.emailNotifications.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('settings.emailNotifications.weeklyReports')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('settings.emailNotifications.weeklyReportsDesc')}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('settings.emailNotifications.criticalIssues')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('settings.emailNotifications.criticalIssuesDesc')}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('settings.emailNotifications.newRecommendations')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('settings.emailNotifications.newRecommendationsDesc')}
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('settings.pushNotifications.title')}</CardTitle>
          <CardDescription>
            {t('settings.pushNotifications.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{t('settings.pushNotifications.conversionAnomalies')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('settings.pushNotifications.conversionAnomaliesDesc')}
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
