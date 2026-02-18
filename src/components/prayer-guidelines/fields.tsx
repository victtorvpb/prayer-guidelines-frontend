import styled from "styled-components";
import { useLanguage } from "@/hooks/useLanguage";

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const FieldLabel = styled.label`
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4f6471;
`;

const ShortcutRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 720px) {
    display: none;
  }
`;

const ShortcutButton = styled.button`
  border-radius: 999px;
  border: 1px solid var(--accent-fade);
  background: #ffffff;
  color: #2c4957;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 6px 14px;
  cursor: pointer;
  box-shadow: 0 12px 20px -18px rgba(12, 44, 58, 0.7);
  transition: all 0.2s ease;

  &:hover {
    background: var(--accent-soft);
  }
`;

const TextArea = styled.textarea<{ $hasWarning?: boolean }>`
  border-radius: 18px;
  border: 1px solid
    ${({ $hasWarning }) =>
      $hasWarning ? "#f2c94c" : "rgba(211, 223, 231, 0.9)"};
  padding: 14px 16px;
  min-height: 120px;
  resize: vertical;
  font-size: 0.95rem;
  font-family: "Manrope", sans-serif;
  color: #1f313b;
  background: #ffffff;

  &:focus {
    outline: none;
    border-color: ${({ $hasWarning }) =>
      $hasWarning ? "#f2c94c" : "rgba(var(--accent-rgb), 0.5)"};
    box-shadow: 0 0 0 3px
      ${({ $hasWarning }) =>
        $hasWarning
          ? "rgba(242, 201, 76, 0.35)"
          : "rgba(var(--accent-rgb), 0.2)"};
  }
`;

const TextInput = styled.textarea<{ $hasWarning?: boolean }>`
  border-radius: 18px;
  border: 1px solid
    ${({ $hasWarning }) =>
      $hasWarning ? "#f2c94c" : "rgba(211, 223, 231, 0.9)"};
  padding: 12px 16px;
  font-size: 0.95rem;
  font-family: "Manrope", sans-serif;
  color: #1f313b;
  background: #ffffff;
  min-height: 64px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ $hasWarning }) =>
      $hasWarning ? "#f2c94c" : "rgba(var(--accent-rgb), 0.5)"};
    box-shadow: 0 0 0 3px
      ${({ $hasWarning }) =>
        $hasWarning
          ? "rgba(242, 201, 76, 0.35)"
          : "rgba(var(--accent-rgb), 0.2)"};
  }
`;

const HelperText = styled.span`
  font-size: 0.75rem;
  color: #6a7d88;
`;

const WarningText = styled.span`
  font-size: 0.75rem;
  color: #a1492b;
`;

type PautaFieldProps = {
  id: number;
  value: string;
  onChange: (value: string) => void;
  onFormat: (prefix: string) => void;
  textareaRef: (element: HTMLTextAreaElement | null) => void;
  hasWarning?: boolean;
  warningMessage?: string;
};

type VersiculoFieldProps = {
  id: number;
  value: string;
  onChange: (value: string) => void;
  hasWarning?: boolean;
  warningMessage?: string;
};

export type { PautaFieldProps, VersiculoFieldProps };

const PautaField = ({
  id,
  value,
  onChange,
  onFormat,
  textareaRef,
  hasWarning,
  warningMessage,
}: PautaFieldProps) => {
  const { t } = useLanguage();

  return (
    <Field>
      <SectionHeader>
        <FieldLabel htmlFor={`pauta-${id}`}>{t.form.pautaLabel}</FieldLabel>
        <ShortcutRow>
          <ShortcutButton
            type="button"
            onClick={() => onFormat("*")}
            aria-label={t.form.formatBold}
          >
            *B*
          </ShortcutButton>
          <ShortcutButton
            type="button"
            onClick={() => onFormat("_")}
            aria-label={t.form.formatItalic}
          >
            _I_
          </ShortcutButton>
          <ShortcutButton
            type="button"
            onClick={() => onFormat("~")}
            aria-label={t.form.formatStrikethrough}
          >
            ~S~
          </ShortcutButton>
          <ShortcutButton
            type="button"
            onClick={() => onFormat("`")}
            aria-label={t.form.formatMonospace}
          >
            `M`
          </ShortcutButton>
        </ShortcutRow>
      </SectionHeader>
      <TextArea
        id={`pauta-${id}`}
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.form.pautaPlaceholder}
        rows={3}
        $hasWarning={hasWarning}
      />
      <HelperText>{t.form.formatHint}</HelperText>
      {warningMessage ? <WarningText>{warningMessage}</WarningText> : null}
    </Field>
  );
};

const VersiculoField = ({
  id,
  value,
  onChange,
  hasWarning,
  warningMessage,
}: VersiculoFieldProps) => {
  const { t } = useLanguage();

  return (
    <Field>
      <FieldLabel htmlFor={`versiculo-${id}`}>
        {t.form.versiculoLabel}
      </FieldLabel>
      <TextInput
        id={`versiculo-${id}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.form.versiculoPlaceholder}
        autoComplete="off"
        rows={2}
        $hasWarning={hasWarning}
      />
      {warningMessage ? <WarningText>{warningMessage}</WarningText> : null}
    </Field>
  );
};

export { PautaField, VersiculoField };
