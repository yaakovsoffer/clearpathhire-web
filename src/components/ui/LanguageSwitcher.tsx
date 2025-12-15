import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
      aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
      <span className="text-xs font-medium uppercase">{language === "en" ? "ES" : "EN"}</span>
    </Button>
  );
};

export default LanguageSwitcher;
