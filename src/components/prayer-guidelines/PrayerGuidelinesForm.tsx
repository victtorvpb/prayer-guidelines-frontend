import { Plus, Sparkles, X } from "lucide-react";
import * as S from "./PrayerGuidelines.styles";
import { CONTENT_LIMITS } from "@/lib/constants";
import { getPautaWarning, getVersiculoWarning } from "@/lib/prayer.utils";
import { PautaField, VersiculoField } from "./index";
import type { PrayerItem, LayoutMode } from "@/lib/types";
import type { MutableRefObject } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const PAUTA_LIMIT = CONTENT_LIMITS.PAUTA;
const VERSICULO_LIMIT = CONTENT_LIMITS.VERSICULO;

export interface PrayerGuidelinesFormProps {
  prayerItems: PrayerItem[];
  layoutMode: LayoutMode;
  hasAnyContent: boolean;
  pautaRefs: MutableRefObject<Record<number, HTMLTextAreaElement | null>>;
  pautaWarningIndices: Record<number, number>;
  versiculoWarningIndices: Record<number, number>;
  onUpdateItem: (
    id: number,
    field: "pauta" | "versiculo",
    value: string,
  ) => void;
  onRemoveItem: (id: number) => void;
  onAddItem: () => void;
  onApplyFormat: (id: number, prefix: string, suffix?: string) => void;
  onGenerateOutput: () => void;
  onLayoutModeChange: (mode: LayoutMode) => void;
}

export function PrayerGuidelinesForm({
  prayerItems,
  layoutMode,
  hasAnyContent,
  pautaRefs,
  pautaWarningIndices,
  versiculoWarningIndices,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  onApplyFormat,
  onGenerateOutput,
  onLayoutModeChange,
}: PrayerGuidelinesFormProps) {
  const { t } = useLanguage();

  return (
    <>
      <S.CardTop>
        <S.CardTopLeft>
          <div>
            <S.CardTopTitle>{t.form.title}</S.CardTopTitle>
            <S.CardTopHint>{t.form.hint}</S.CardTopHint>
          </div>
        </S.CardTopLeft>
        <S.CardTopRight>
          <S.LayoutSelector>
            <S.LayoutButton
              type="button"
              $active={layoutMode === "combined"}
              onClick={() => onLayoutModeChange("combined")}
              title={`Layout mode: ${t.form.layoutJuntos}`}
              aria-label={t.form.layoutJuntos}
              aria-pressed={layoutMode === "combined"}
            >
              {t.form.layoutJuntos}
            </S.LayoutButton>
            <S.LayoutButton
              type="button"
              $active={layoutMode === "sequential"}
              onClick={() => onLayoutModeChange("sequential")}
              title={`Layout mode: ${t.form.layoutSequencial}`}
              aria-label={t.form.layoutSequencial}
              aria-pressed={layoutMode === "sequential"}
            >
              {t.form.layoutSequencial}
            </S.LayoutButton>
          </S.LayoutSelector>
        </S.CardTopRight>
      </S.CardTop>
      <S.CardBody>
        {prayerItems.map((item, index) => {
          const number = index + 1;
          const pautaLength = item.pauta.trim().length;
          const versiculoLength = item.versiculo.trim().length;
          const pautaWarningIndex = pautaWarningIndices[item.id] ?? 0;
          const versiculoWarningIndex = versiculoWarningIndices[item.id] ?? 0;
          const pautaWarning =
            pautaLength > PAUTA_LIMIT
              ? getPautaWarning(pautaWarningIndex)
              : undefined;
          const versiculoWarning =
            versiculoLength > VERSICULO_LIMIT
              ? getVersiculoWarning(versiculoWarningIndex)
              : undefined;

          return (
            <S.Section
              key={item.id}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <S.SectionHeader>
                <S.SectionTitle>
                  <S.SectionIndex>{number}</S.SectionIndex>
                  {t.form.pautaTitle(number)}
                </S.SectionTitle>
                {prayerItems.length > 1 ? (
                  <S.GhostButton
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={t.form.removePauta(number)}
                  >
                    <X size={16} />
                  </S.GhostButton>
                ) : null}
              </S.SectionHeader>

              <PautaField
                id={item.id}
                value={item.pauta}
                onChange={(value) => onUpdateItem(item.id, "pauta", value)}
                onFormat={(prefix) => onApplyFormat(item.id, prefix)}
                textareaRef={(element) => {
                  pautaRefs.current[item.id] = element;
                }}
                hasWarning={pautaLength > PAUTA_LIMIT}
                warningMessage={pautaWarning}
              />

              <VersiculoField
                id={item.id}
                value={item.versiculo}
                onChange={(value) => onUpdateItem(item.id, "versiculo", value)}
                hasWarning={versiculoLength > VERSICULO_LIMIT}
                warningMessage={versiculoWarning}
              />
            </S.Section>
          );
        })}

        <S.ButtonRow>
          <S.SecondaryButton type="button" onClick={onAddItem}>
            <Plus size={16} />
            {t.form.addPauta}
          </S.SecondaryButton>
          <S.PrimaryButton
            type="button"
            onClick={onGenerateOutput}
            disabled={!hasAnyContent}
          >
            <Sparkles size={16} />
            {t.form.generatePautas}
          </S.PrimaryButton>
        </S.ButtonRow>

        {!hasAnyContent ? <S.Hint>{t.form.emptyHint}</S.Hint> : null}
      </S.CardBody>
    </>
  );
}
