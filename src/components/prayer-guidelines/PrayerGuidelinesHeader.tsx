import * as S from "./PrayerGuidelines.styles";

export function PrayerGuidelinesHeader() {
  return (
    <>
      <S.ColorSwitcher>
        <S.LogoInline>
          <S.LogoImage src="/logo_zion.png" alt="Zion" />
        </S.LogoInline>
      </S.ColorSwitcher>
      <S.Header>
        <S.Title>Gerador de Pautas de oracao</S.Title>
        <S.Subtitle>
          Crie pautas, aplique formatacao no estilo de mensagens e gere um texto
          pronto para compartilhar com sua equipe.
        </S.Subtitle>
        <S.BadgeRow>
          <S.Badge>Clareza</S.Badge>
          <S.Badge>Rapido</S.Badge>
          <S.Badge>Compartilhavel</S.Badge>
        </S.BadgeRow>
      </S.Header>
    </>
  );
}
