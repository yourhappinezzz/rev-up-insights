
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LandingFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">AICO</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.product')}</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link to="/pricing" className="hover:text-foreground transition-colors">
                {t('common.pricing')}
              </Link>
              <Link to="/dashboard" className="hover:text-foreground transition-colors">
                {t('common.dashboard')}
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.company')}</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">
                {t('common.about')}
              </Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                {t('common.contact')}
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t('footer.legal')}</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">
                {t('common.termsOfService')}
              </Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                {t('common.privacyPolicy')}
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            © 2024 AICO. {t('common.allRightsReserved')}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{t('footer.madeWithLove')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
