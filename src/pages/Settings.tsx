import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockSites } from "@/lib/mockData";
import { useTranslation } from "react-i18next";
import {
  BarChart3,
  ShoppingCart,
  CreditCard,
  Mail,
  Bell,
  Shield,
  Key,
  Webhook,
  Globe,
  Trash2,
  Plus,
  Check
} from "lucide-react";

export default function Settings() {
  const { t } = useTranslation(['settings', 'common']);
  const [sites, setSites] = useState(mockSites);
  const [currentPlan, setCurrentPlan] = useState("Professional");
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  
  const plans = [
    {
      name: t('settings:plans.starter.name'),
      price: 29,
      features: t('settings:plans.starter.features', { returnObjects: true }) as string[]
    },
    {
      name: t('settings:plans.professional.name'),
      price: 99,
      features: t('settings:plans.professional.features', { returnObjects: true }) as string[]
    },
    {
      name: t('settings:plans.agency.name'),
      price: 299,
      features: t('settings:plans.agency.features', { returnObjects: true }) as string[]
    }
  ];

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

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      siteName: "",
      siteUrl: ""
    }
  });

  const onSubmit = (data: { siteName: string, siteUrl: string }) => {
    // Generate a unique ID for the new site
    const newSiteId = `${sites.length + 1}`;
    
    // Create the new site object
    const newSite = {
      id: newSiteId,
      name: data.siteName,
      url: data.siteUrl,
      score: 0,
      conversionRate: 0,
      revenue: 0,
      change: 0,
      status: "pending",
      lastAnalyzed: "Never"
    };

    // Add the new site to the sites array
    setSites([...sites, newSite]);
    
    // Show success message
    toast({
      title: t('settings:addSite.siteAdded'),
      description: t('settings:addSite.siteAddedDesc', { siteName: data.siteName }),
    });
    
    // Reset the form
    reset();
  };

  const deleteSite = (siteId: string) => {
    setSites(sites.filter(site => site.id !== siteId));
    toast({
      title: t('settings:addSite.siteRemoved'),
      description: t('settings:addSite.siteRemovedDesc'),
      variant: "destructive"
    });
  };

  const handlePlanChange = (planName: string) => {
    if (planName === currentPlan) return;
    
    setIsChangingPlan(true);
    setSelectedPlan(planName);
    
    // Simulate plan change
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
                <Card>
                  <CardHeader>
                    <CardTitle>{t('settings.managedSites.title')}</CardTitle>
                    <CardDescription>
                      {t('settings.managedSites.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('settings.managedSites.name')}</TableHead>
                          <TableHead>{t('settings.managedSites.url')}</TableHead>
                          <TableHead>{t('settings.managedSites.status')}</TableHead>
                          <TableHead>{t('settings.managedSites.conversionRate')}</TableHead>
                          <TableHead>{t('settings.managedSites.lastAnalyzed')}</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sites.length > 0 ? (
                          sites.map((site) => (
                            <TableRow key={site.id}>
                              <TableCell className="font-medium">{site.name}</TableCell>
                              <TableCell>{site.url}</TableCell>
                              <TableCell>
                                <Badge variant={site.status === "improving" ? "default" : site.status === "declining" ? "destructive" : "secondary"}>
                                  {site.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{site.conversionRate}%</TableCell>
                              <TableCell>{site.lastAnalyzed}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => deleteSite(site.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                              {t('settings.managedSites.noSites')}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('settings.addSite.title')}</CardTitle>
                    <CardDescription>
                      {t('settings.addSite.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="siteName">{t('settings:addSite.siteName')}</Label>
                          <Input 
                            id="siteName" 
                            placeholder={t('settings:addSite.siteNamePlaceholder')}
                            {...register("siteName", { required: t('settings:addSite.siteNameRequired') })}
                          />
                          {errors.siteName && (
                            <p className="text-sm text-destructive">{errors.siteName.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="siteUrl">{t('settings:addSite.siteUrl')}</Label>
                          <Input 
                            id="siteUrl" 
                            placeholder={t('settings:addSite.siteUrlPlaceholder')}
                            {...register("siteUrl", { 
                              required: t('settings:addSite.siteUrlRequired'),
                              pattern: {
                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                message: t('settings:addSite.siteUrlInvalid')
                              }
                            })}
                          />
                          {errors.siteUrl && (
                            <p className="text-sm text-destructive">{errors.siteUrl.message}</p>
                          )}
                        </div>
                      </div>
                      <Button type="submit" className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" /> {t('settings:addSite.addSite')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
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
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
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
              </TabsContent>

              <TabsContent value="api" className="space-y-6">
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
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
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
                        <div 
                          key={plan.name}
                          className={`relative p-6 border rounded-lg transition-all flex flex-col ${
                            currentPlan === plan.name 
                              ? "border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20" 
                              : "border hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">{plan.name}</h3>
                            {currentPlan === plan.name && (
                              <Badge className="bg-blue-500">{t('settings.chooseYourPlan.current')}</Badge>
                            )}
                          </div>
                          
                          <p className="text-3xl font-bold mb-4">
                            ${plan.price}
                            <span className="text-sm font-normal text-muted-foreground">{t('settings.chooseYourPlan.month')}</span>
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
                            onClick={() => handlePlanChange(plan.name)}
                          >
                            {isChangingPlan && selectedPlan === plan.name ? (
                              t('settings.chooseYourPlan.changingPlan')
                            ) : currentPlan === plan.name ? (
                              t('settings.chooseYourPlan.currentPlan')
                            ) : (
                              t('settings.chooseYourPlan.selectPlan')
                            )}
                          </Button>
                        </div>
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
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
