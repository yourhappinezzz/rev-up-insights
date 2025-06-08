
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { SitesTab } from "@/components/Settings/SitesTab";
import { IntegrationsTab } from "@/components/Settings/IntegrationsTab";
import { NotificationsTab } from "@/components/Settings/NotificationsTab";
import { ApiTab } from "@/components/Settings/ApiTab";
import { BillingTab } from "@/components/Settings/BillingTab";

export default function Settings() {
  const { t } = useTranslation(['settings', 'common']);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{t('settings:title')}</h1>
              <p className="text-muted-foreground">
                {t('settings:subtitle')}
              </p>
            </div>

            <Tabs defaultValue="sites" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="sites">{t('settings:sites')}</TabsTrigger>
                <TabsTrigger value="integrations">{t('settings:integrations')}</TabsTrigger>
                <TabsTrigger value="notifications">{t('common:notifications')}</TabsTrigger>
                <TabsTrigger value="api">{t('settings:api')}</TabsTrigger>
                <TabsTrigger value="billing">{t('settings:billing')}</TabsTrigger>
              </TabsList>

              <TabsContent value="sites" className="space-y-6">
                <SitesTab />
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <IntegrationsTab />
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <NotificationsTab />
              </TabsContent>

              <TabsContent value="api" className="space-y-6">
                <ApiTab />
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <BillingTab />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
