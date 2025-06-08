
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Trash2, Plus } from "lucide-react";
import { mockSites } from "@/lib/mockData";

export function SitesTab() {
  const { t } = useTranslation(['settings']);
  const [sites, setSites] = useState(mockSites);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      siteName: "",
      siteUrl: ""
    }
  });

  const onSubmit = (data: { siteName: string, siteUrl: string }) => {
    const newSiteId = `${sites.length + 1}`;
    
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

    setSites([...sites, newSite]);
    
    toast({
      title: t('settings:addSite.siteAdded'),
      description: t('settings:addSite.siteAddedDesc', { siteName: data.siteName }),
    });
    
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

  return (
    <div className="space-y-6">
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
    </div>
  );
}
