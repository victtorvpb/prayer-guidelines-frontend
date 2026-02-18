import * as S from "./PrayerGuidelines.styles";
import type { Theme } from "@/lib/types";

export interface PrayerGuidelinesHeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function PrayerGuidelinesHeader({
  theme,
  onThemeChange,
}: Omit<PrayerGuidelinesHeaderProps, 'layoutMode' | 'onLayoutModeChange'>) {
  return (
    <>
      <S.ColorSwitcher>
        <S.ToggleGroup role="group" aria-label="Selecionar cor">
          <S.ToggleButton
            type="button"
            $active={theme === "green"}
            onClick={() => onThemeChange("green")}
          >
            Verde
          </S.ToggleButton>
          <S.ToggleButton
            type="button"
            $active={theme === "blue"}
            onClick={() => onThemeChange("blue")}
          >
            Azul
          </S.ToggleButton>
        </S.ToggleGroup>
      </S.ColorSwitcher>
      <S.Header>
        <S.Title>Gerador de Pautas de oracao</S.Title>
        <S.Subtitle>
          Crie pautas, aplique formatacao no estilo de mensagens e gere um
          texto pronto para compartilhar com sua equipe.
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
