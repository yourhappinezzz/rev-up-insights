
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-4 py-20">
      <Card className="text-center p-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent>
          <h2 className="text-4xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">
            {t('cta.subtitle')}
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              {t('common.startFreeTrial')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
