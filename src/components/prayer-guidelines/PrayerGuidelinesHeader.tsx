import * as S from "./PrayerGuidelines.styles";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";

export function PrayerGuidelinesHeader() {
  const { t } = useLanguage();

  return (
    <>
      <S.HeaderTop>
        <div />
        <LanguageSelector />
      </S.HeaderTop>
      <S.Header>
        <S.Title>{t.header.title}</S.Title>
        <S.Subtitle>{t.header.subtitle}</S.Subtitle>
        <S.BadgeRow>
          <S.Badge>{t.header.badges.clarity}</S.Badge>
          <S.Badge>{t.header.badges.fast}</S.Badge>
          <S.Badge>{t.header.badges.shareable}</S.Badge>
        </S.BadgeRow>
      </S.Header>
    </>
  );
}
