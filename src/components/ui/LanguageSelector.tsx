import styled from "styled-components";
import type { Language } from "@/lib/i18n";
import { useLanguage } from "@/hooks/useLanguage";

const Container = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const LanguageSwitchButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? "rgba(var(--accent-rgb), 0.2)" : "transparent"};
  border: 1px solid
    ${({ $active }) => ($active ? "var(--accent)" : "rgba(211, 223, 231, 0.9)")};
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(var(--accent-rgb), 0.15);
    border-color: var(--accent);
  }
`;

const Label = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6a7d88;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-right: 4px;

  @media (max-width: 720px) {
    display: none;
  }
`;

const flags: Record<Language, string> = {
  "pt-BR": "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const languages: Language[] = ["pt-BR", "en", "es"];

  return (
    <Container>
      <Label>{t.languageSelector.label}</Label>
      {languages.map((lang) => (
        <LanguageSwitchButton
          key={lang}
          $active={language === lang}
          onClick={() => setLanguage(lang)}
          title={`Change language to ${lang}`}
          aria-label={`Change language to ${lang}`}
          aria-pressed={language === lang}
        >
          {flags[lang]}
        </LanguageSwitchButton>
      ))}
    </Container>
  );
}
