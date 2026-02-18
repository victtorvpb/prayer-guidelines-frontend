import { useRef, useState } from "react";

import {
  PrayerGuidelinesHeader,
  PrayerGuidelinesForm,
  PrayerGuidelinesPreview,
} from "@/components/prayer-guidelines";
import {
  CONTENT_LIMITS,
  PAUTA_WARNINGS,
  VERSICULO_WARNINGS,
} from "@/lib/constants";
import type { PrayerItem, LayoutMode, CopyState } from "@/lib/types";
import { getEmojiNumber } from "@/lib/prayer.utils";
import * as S from "@/components/prayer-guidelines/PrayerGuidelines.styles";

const PAUTA_LIMIT = CONTENT_LIMITS.PAUTA;
const VERSICULO_LIMIT = CONTENT_LIMITS.VERSICULO;

function PrayerGuidelines() {
  const [prayerItems, setPrayerItems] = useState<PrayerItem[]>([
    { id: 1, pauta: "", versiculo: "" },
  ]);
  const [generated, setGenerated] = useState<string>("");
  const [showGenerated, setShowGenerated] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [needsRegenerate, setNeedsRegenerate] = useState(false);
  const theme = "green";
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("combined");
  const pautaRefs = useRef<Record<number, HTMLTextAreaElement | null>>({});
  const [pautaWarningIndices, setPautaWarningIndices] = useState<
    Record<number, number>
  >({});
  const [versiculoWarningIndices, setVersiculoWarningIndices] = useState<
    Record<number, number>
  >({});
  const previewRef = useRef<HTMLElement | null>(null);

  // Prayer item management
  const addPrayerItem = () => {
    setPrayerItems((current) => {
      const maxId = current.reduce((max, item) => Math.max(max, item.id), 0);
      const newId = maxId + 1;
      return [...current, { id: newId, pauta: "", versiculo: "" }];
    });
    setNeedsRegenerate(showGenerated);
    setCopyState("idle");
  };

  const updatePrayerItem = (
    id: number,
    field: "pauta" | "versiculo",
    value: string,
  ) => {
    setPrayerItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

    const trimmedLength = value.trim().length;
    if (field === "pauta") {
      setPautaWarningIndices((current) => {
        const next = { ...current };
        if (trimmedLength > PAUTA_LIMIT) {
          if (next[id] === undefined) {
            next[id] = Math.floor(Math.random() * PAUTA_WARNINGS.length);
          }
        } else {
          delete next[id];
        }
        return next;
      });
    } else {
      setVersiculoWarningIndices((current) => {
        const next = { ...current };
        if (trimmedLength > VERSICULO_LIMIT) {
          if (next[id] === undefined) {
            next[id] = Math.floor(Math.random() * VERSICULO_WARNINGS.length);
          }
        } else {
          delete next[id];
        }
        return next;
      });
    }
    setNeedsRegenerate(showGenerated);
    setCopyState("idle");
  };

  const removePrayerItem = (id: number) => {
    if (prayerItems.length > 1) {
      setPrayerItems((current) => current.filter((item) => item.id !== id));
      setPautaWarningIndices((current) => {
        if (!(id in current)) return current;
        const next = { ...current };
        delete next[id];
        return next;
      });
      setVersiculoWarningIndices((current) => {
        if (!(id in current)) return current;
        const next = { ...current };
        delete next[id];
        return next;
      });
      setNeedsRegenerate(showGenerated);
      setCopyState("idle");
    }
  };

  // Text generation
  const output = (() => {
    const filtered = prayerItems.filter(
      (item) => item.pauta.trim() || item.versiculo.trim(),
    );

    if (layoutMode === "sequential") {
      // Sequential mode: All pautas first, then all versiculos
      const pautas = filtered
        .map((item, index) => {
          const emoji = getEmojiNumber(index);
          const pauta = item.pauta.trim();
          if (pauta) return `${emoji} ${pauta}`;
          return null;
        })
        .filter(Boolean)
        .join("\n\n");

      const versiculos = filtered
        .map((item) => {
          const versiculo = item.versiculo.trim();
          if (versiculo) return `📖 ${versiculo}`;
          return null;
        })
        .filter(Boolean)
        .join("\n\n");

      return [pautas, versiculos].filter(Boolean).join("\n\n");
    }

    // Combined mode: pauta with versiculo (default)
    return filtered
      .map((item, index) => {
        const emoji = getEmojiNumber(index);
        const pauta = item.pauta.trim();
        const versiculo = item.versiculo.trim();
        if (pauta && versiculo) return `${emoji} ${pauta}\n📖 ${versiculo}`;
        if (pauta) return `${emoji} ${pauta}`;
        return `${emoji} ${versiculo}`;
      })
      .join("\n\n");
  })();

  const hasAnyContent = output.length > 0;

  // Text formatting
  const applyPautaFormat = (id: number, prefix: string, suffix = prefix) => {
    const textarea = pautaRefs.current[id];
    const item = prayerItems.find((entry) => entry.id === id);
    if (!textarea || !item) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = item.pauta.slice(start, end);
    const nextValue = `${item.pauta.slice(0, start)}${prefix}${selectedText}${suffix}${item.pauta.slice(end)}`;

    updatePrayerItem(id, "pauta", nextValue);

    requestAnimationFrame(() => {
      const nextCursor =
        start + prefix.length + selectedText.length + suffix.length;
      textarea.focus();
      textarea.setSelectionRange(nextCursor, nextCursor);
    });
  };

  // Output generation
  const generateOutput = () => {
    if (!hasAnyContent) return;
    setGenerated(output);
    setShowGenerated(true);
    setNeedsRegenerate(false);
    setCopyState("idle");
    window.setTimeout(() => {
      if (!window.matchMedia("(max-width: 720px)").matches) return;
      const preview = previewRef.current;
      if (!preview) return;
      const rect = preview.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!inView) {
        preview.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  };

  // Clipboard management
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generated);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1400);
    } catch (err) {
      console.error("Erro ao copiar:", err);
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2000);
    }
  };

  return (
    <S.Page data-theme={theme}>
      <S.BackgroundLayer />
      <S.Container>
        <PrayerGuidelinesHeader />

        <S.Grid $hasPreview={showGenerated && !!generated}>
          <S.Card>
            <PrayerGuidelinesForm
              prayerItems={prayerItems}
              layoutMode={layoutMode}
              hasAnyContent={hasAnyContent}
              pautaRefs={pautaRefs}
              pautaWarningIndices={pautaWarningIndices}
              versiculoWarningIndices={versiculoWarningIndices}
              onUpdateItem={updatePrayerItem}
              onRemoveItem={removePrayerItem}
              onAddItem={addPrayerItem}
              onApplyFormat={applyPautaFormat}
              onGenerateOutput={generateOutput}
              onLayoutModeChange={setLayoutMode}
            />
          </S.Card>

          {showGenerated && generated ? (
            <PrayerGuidelinesPreview
              generated={generated}
              copyState={copyState}
              needsRegenerate={needsRegenerate}
              onCopyToClipboard={copyToClipboard}
              previewRef={previewRef}
            />
          ) : null}
        </S.Grid>
      </S.Container>
    </S.Page>
  );
}

export default PrayerGuidelines;
