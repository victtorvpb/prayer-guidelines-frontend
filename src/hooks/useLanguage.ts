import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { translations } from "@/lib/i18n";

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  const t = translations[context.language];

  return {
    language: context.language,
    setLanguage: context.setLanguage,
    t,
  };
}
