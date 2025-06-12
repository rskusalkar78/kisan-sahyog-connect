
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-card border-border hover:bg-accent hover:text-accent-foreground">
          <Globe className="h-4 w-4 mr-2" />
          {currentLang?.nativeName || 'English'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`hover:bg-accent hover:text-accent-foreground ${
              language === lang.code ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <span className="font-medium">{lang.nativeName}</span>
            <span className="text-muted-foreground ml-2">({lang.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
