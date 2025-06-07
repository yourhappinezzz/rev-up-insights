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
  const [sites, setSites] = useState(mockSites);
  const [currentPlan, setCurrentPlan] = useState("Professional");
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  const [isChangingPlan, setIsChangingPlan] = useState(false);
  
  const plans = [
    {
      name: "Starter",
      price: 29,
      features: [
        "3 websites",
        "Basic recommendations", 
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: 99,
      features: [
        "10 websites",
        "Advanced AI recommendations",
        "Real-time metrics",
        "Priority support"
      ]
    },
    {
      name: "Agency",
      price: 299,
      features: [
        "Unlimited websites",
        "White-label reports",
        "Multi-client management",
        "Dedicated support"
      ]
    }
  ];

  const integrations = [
    {
      name: "Google Analytics 4",
      icon: BarChart3,
      description: "Connect GA4 to track conversion metrics and user behavior",
      status: "connected",
      lastSync: "2 hours ago"
    },
    {
      name: "Shopify",
      icon: ShoppingCart, 
      description: "Sync e-commerce data, orders, and revenue metrics",
      status: "disconnected",
      lastSync: null
    },
    {
      name: "Stripe",
      icon: CreditCard,
      description: "Track payment conversions and revenue attribution",
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
      title: "Site added",
      description: `${data.siteName} was successfully added.`,
    });
    
    // Reset the form
    reset();
  };

  const deleteSite = (siteId: string) => {
    setSites(sites.filter(site => site.id !== siteId));
    toast({
      title: "Site removed",
      description: "The site was successfully removed.",
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
      
      if (planName === "Agency") {
        toast({
          title: "Plan upgraded!",
          description: `Successfully upgraded to ${planName} plan.`,
        });
      } else if (planName === "Starter") {
        toast({
          title: "Plan downgraded",
          description: `Successfully changed to ${planName} plan.`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Plan changed",
          description: `Successfully changed to ${planName} plan.`,
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
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account, integrations, and preferences
              </p>
            </div>

            <Tabs defaultValue="sites" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="sites">Sites</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="api">API & Webhooks</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="sites" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Managed Sites</CardTitle>
                    <CardDescription>
                      View and manage the websites AICO is monitoring for conversion optimization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>URL</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Conversion Rate</TableHead>
                          <TableHead>Last Analyzed</TableHead>
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
                              No sites added yet. Add your first site below.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Add New Site</CardTitle>
                    <CardDescription>
                      Add a website to monitor for conversion optimization opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="siteName">Site Name</Label>
                          <Input 
                            id="siteName" 
                            placeholder="My E-commerce Store" 
                            {...register("siteName", { required: "Site name is required" })}
                          />
                          {errors.siteName && (
                            <p className="text-sm text-destructive">{errors.siteName.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="siteUrl">Site URL</Label>
                          <Input 
                            id="siteUrl" 
                            placeholder="https://example.com" 
                            {...register("siteUrl", { 
                              required: "Site URL is required",
                              pattern: {
                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                message: "Please enter a valid URL"
                              }
                            })}
                          />
                          {errors.siteUrl && (
                            <p className="text-sm text-destructive">{errors.siteUrl.message}</p>
                          )}
                        </div>
                      </div>
                      <Button type="submit" className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" /> Add Site
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Integrations</CardTitle>
                    <CardDescription>
                      Connect your analytics and e-commerce platforms to enable accurate conversion tracking
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
                                Last sync: {integration.lastSync}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                            {integration.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {integration.status === "connected" ? "Configure" : "Connect"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Connection Test</CardTitle>
                    <CardDescription>
                      Test your integrations to ensure data is flowing correctly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button>Run Connection Test</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>
                      Configure when you want to receive email updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Weekly CRO Reports</h4>
                        <p className="text-sm text-muted-foreground">
                          Summary of conversion improvements and recommendations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Critical Issues</h4>
                        <p className="text-sm text-muted-foreground">
                          Immediate alerts for significant conversion drops
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">New Recommendations</h4>
                        <p className="text-sm text-muted-foreground">
                          When AI identifies new optimization opportunities
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Push Notifications</CardTitle>
                    <CardDescription>
                      Real-time browser notifications for urgent updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Conversion Anomalies</h4>
                        <p className="text-sm text-muted-foreground">
                          Unusual patterns in conversion data
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
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage API keys for programmatic access to AICO
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Key className="w-5 h-5" />
                        <div>
                          <h4 className="font-medium">Production API Key</h4>
                          <p className="text-sm text-muted-foreground">aico_prod_********************************</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                    <Button>Create New API Key</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>
                      Configure webhooks to receive real-time updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input
                        id="webhook-url"
                        placeholder="https://your-app.com/webhooks/aico"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Webhook className="w-4 h-4" />
                      <span className="text-sm">Events: Recommendations, Metric Updates, Alerts</span>
                    </div>
                    <Button>Save Webhook</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Your Plan</CardTitle>
                    <CardDescription>
                      Select the plan that best fits your conversion optimization needs
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
                              <Badge className="bg-blue-500">Current</Badge>
                            )}
                          </div>
                          
                          <p className="text-3xl font-bold mb-4">
                            ${plan.price}
                            <span className="text-sm font-normal text-muted-foreground">/month</span>
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
                              "Changing Plan..."
                            ) : currentPlan === plan.name ? (
                              "Current Plan"
                            ) : (
                              "Select Plan"
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      Download invoices and view payment history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Dec 2024 - {currentPlan} Plan</p>
                          <p className="text-sm text-muted-foreground">Paid on Dec 1, 2024</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            ${plans.find(p => p.name === currentPlan)?.price}.00
                          </span>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Nov 2024 - {currentPlan} Plan</p>
                          <p className="text-sm text-muted-foreground">Paid on Nov 1, 2024</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            ${plans.find(p => p.name === currentPlan)?.price}.00
                          </span>
                          <Button variant="outline" size="sm">Download</Button>
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
