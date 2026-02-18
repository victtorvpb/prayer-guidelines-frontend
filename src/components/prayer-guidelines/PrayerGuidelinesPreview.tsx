import { Copy } from "lucide-react";
import * as S from "./PrayerGuidelines.styles";
import type { CopyState } from "@/lib/types";
import type { RefObject } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export interface PrayerGuidelinesPreviewProps {
  generated: string;
  copyState: CopyState;
  needsRegenerate: boolean;
  onCopyToClipboard: () => void;
  previewRef: RefObject<HTMLElement | null>;
}

export function PrayerGuidelinesPreview({
  generated,
  copyState,
  needsRegenerate,
  onCopyToClipboard,
  previewRef,
}: PrayerGuidelinesPreviewProps) {
  const { t } = useLanguage();

  return (
    <S.PreviewCard ref={previewRef}>
      <S.CardTop>
        <S.CardTopTitle>{t.preview.title}</S.CardTopTitle>
        <S.CardTopHint>{t.preview.hint}</S.CardTopHint>
      </S.CardTop>
      <S.PreviewHeader>
        <div>
          <S.PreviewTitle>{t.preview.readyText}</S.PreviewTitle>
          <S.PreviewSubtitle>{t.preview.readySubtitle}</S.PreviewSubtitle>
        </div>
        <S.PrimaryButton
          type="button"
          onClick={onCopyToClipboard}
          style={{ minWidth: "auto", padding: "10px 16px" }}
        >
          <Copy size={16} />
          {t.preview.copyButton}
        </S.PrimaryButton>
      </S.PreviewHeader>
      <S.PreviewBody>
        <S.PreviewBox>
          <S.PreviewText>{generated}</S.PreviewText>
        </S.PreviewBox>
        <S.StatusRow>
          <span>{t.preview.linesLabel(generated.split("\n").length)}</span>
          <S.StatusText role="status" aria-live="polite" $state={copyState}>
            {copyState === "copied"
              ? t.preview.copiedMessage
              : copyState === "error"
                ? t.preview.errorMessage
                : ""}
          </S.StatusText>
        </S.StatusRow>
        {needsRegenerate ? (
          <S.RegenerateHint>{t.preview.regenerateHint}</S.RegenerateHint>
        ) : null}
      </S.PreviewBody>
    </S.PreviewCard>
  );
}
