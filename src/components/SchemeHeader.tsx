
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const SchemeHeader = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">{t('nav.home')}</span>
          </Link>
          
          <h1 className="text-2xl font-bold text-primary">{t('schemes.title')}</h1>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SchemeHeader;
