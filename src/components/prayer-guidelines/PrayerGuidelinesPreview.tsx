import { Copy } from "lucide-react";
import * as S from "./PrayerGuidelines.styles";
import type { CopyState } from "@/lib/types";

export interface PrayerGuidelinesPreviewProps {
  generated: string;
  copyState: CopyState;
  needsRegenerate: boolean;
  onCopyToClipboard: () => void;
  previewRef: React.RefObject<HTMLElement | null>;
}

export function PrayerGuidelinesPreview({
  generated,
  copyState,
  needsRegenerate,
  onCopyToClipboard,
  previewRef,
}: PrayerGuidelinesPreviewProps) {
  return (
    <S.PreviewCard ref={previewRef}>
      <S.CardTop>
        <S.CardTopTitle>Preview</S.CardTopTitle>
        <S.CardTopHint>Pronto para enviar</S.CardTopHint>
      </S.CardTop>
      <S.PreviewHeader>
        <div>
          <S.PreviewTitle>Texto pronto</S.PreviewTitle>
          <S.PreviewSubtitle>
            Copie e compartilhe com o grupo.
          </S.PreviewSubtitle>
        </div>
        <S.PrimaryButton
          type="button"
          onClick={onCopyToClipboard}
          style={{ minWidth: "auto", padding: "10px 16px" }}
        >
          <Copy size={16} />
          Copiar
        </S.PrimaryButton>
      </S.PreviewHeader>
      <S.PreviewBody>
        <S.PreviewBox>
          <S.PreviewText>{generated}</S.PreviewText>
        </S.PreviewBox>
        <S.StatusRow>
          <span>{generated.split("\n").length} linha(s)</span>
          <S.StatusText role="status" aria-live="polite" $state={copyState}>
            {copyState === "copied"
              ? "Copiado!"
              : copyState === "error"
                ? "Erro ao copiar"
                : ""}
          </S.StatusText>
        </S.StatusRow>
        {needsRegenerate ? (
          <S.RegenerateHint>
            Voce alterou o formulario. Clique em Gerar pautas para atualizar.
          </S.RegenerateHint>
        ) : null}
      </S.PreviewBody>
    </S.PreviewCard>
  );
}
