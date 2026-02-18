import { useState } from "react";
import type { ReactNode } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import type { Language } from "@/lib/i18n";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
