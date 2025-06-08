
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function LandingHeader() {
  const { t } = useTranslation();

  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            AICO
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/about">
            <Button variant="ghost">{t('common.about')}</Button>
          </Link>
          <Link to="/pricing">
            <Button variant="ghost">{t('common.pricing')}</Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost">{t('common.contact')}</Button>
          </Link>
          <LanguageSwitcher />
          <Link to="/login">
            <Button variant="ghost">{t('common.signIn')}</Button>
          </Link>
          <Link to="/signup">
            <Button>{t('common.getStarted')}</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
