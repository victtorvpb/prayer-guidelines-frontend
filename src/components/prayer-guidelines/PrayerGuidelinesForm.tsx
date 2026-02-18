import { Plus, Sparkles, X } from "lucide-react";
import * as S from "./PrayerGuidelines.styles";
import { CONTENT_LIMITS } from "@/lib/constants";
import { getPautaWarning, getVersiculoWarning } from "@/lib/prayer.utils";
import { PautaField, VersiculoField } from "./index";
import type { PrayerItem, LayoutMode } from "@/lib/types";

const PAUTA_LIMIT = CONTENT_LIMITS.PAUTA;
const VERSICULO_LIMIT = CONTENT_LIMITS.VERSICULO;

export interface PrayerGuidelinesFormProps {
  prayerItems: PrayerItem[];
  layoutMode: LayoutMode;
  hasAnyContent: boolean;
  pautaRefs: React.MutableRefObject<Record<number, HTMLTextAreaElement | null>>;
  pautaWarningIndexRef: React.MutableRefObject<Record<number, number>>;
  versiculoWarningIndexRef: React.MutableRefObject<Record<number, number>>;
  onUpdateItem: (
    id: number,
    field: "pauta" | "versiculo",
    value: string
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
  pautaWarningIndexRef,
  versiculoWarningIndexRef,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  onApplyFormat,
  onGenerateOutput,
  onLayoutModeChange,
}: PrayerGuidelinesFormProps) {
  return (
    <>
      <S.CardTop>
        <S.CardTopLeft>
          <div>
            <S.CardTopTitle>Formulario</S.CardTopTitle>
            <S.CardTopHint>Organize as pautas</S.CardTopHint>
          </div>
        </S.CardTopLeft>
        <S.CardTopRight>
          <S.LayoutSelector>
            <S.LayoutButton
              type="button"
              $active={layoutMode === "combined"}
              onClick={() => onLayoutModeChange("combined")}
              title="Layout mode: Juntos"
            >
              Juntos
            </S.LayoutButton>
            <S.LayoutButton
              type="button"
              $active={layoutMode === "sequential"}
              onClick={() => onLayoutModeChange("sequential")}
              title="Layout mode: Sequencial"
            >
              Sequencial
            </S.LayoutButton>
          </S.LayoutSelector>
        </S.CardTopRight>
      </S.CardTop>
      <S.CardBody>
      {prayerItems.map((item, index) => {
        const number = index + 1;
        const pautaLength = item.pauta.trim().length;
        const versiculoLength = item.versiculo.trim().length;
        const pautaWarningIndex =
          pautaWarningIndexRef.current[item.id] ?? 0;
        const versiculoWarningIndex =
          versiculoWarningIndexRef.current[item.id] ?? 0;
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
                Pauta {number}
              </S.SectionTitle>
              {prayerItems.length > 1 ? (
                <S.GhostButton
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  aria-label={`Remover pauta ${number}`}
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
          Adicionar pauta
        </S.SecondaryButton>
        <S.PrimaryButton
          type="button"
          onClick={onGenerateOutput}
          disabled={!hasAnyContent}
        >
          <Sparkles size={16} />
          Gerar pautas
        </S.PrimaryButton>
      </S.ButtonRow>

      {!hasAnyContent ? (
        <S.Hint>
          Dica: preencha ao menos um tema ou versiculo para gerar.
        </S.Hint>
      ) : null}
      </S.CardBody>
    </>
  );
}
