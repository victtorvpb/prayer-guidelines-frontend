import styled, { css, keyframes } from "styled-components";

/* ========================
   Animations
   ======================== */

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ========================
   Layout
   ======================== */

export const Page = styled.div`
  background: linear-gradient(
    135deg,
    rgba(216, 227, 234, 0.32) 0%,
    rgba(216, 227, 234, 0.08) 50%,
    rgba(216, 227, 234, 0.16) 100%
  );
  min-height: 100vh;
  position: relative;
  padding: 6px 12px 24px;

  &[data-theme="blue"] {
    --accent: #2e6fbf;
    --accent-rgb: 46, 111, 191;
    --accent-fade: rgba(46, 111, 191, 0.12);
    --accent-soft: rgba(46, 111, 191, 0.08);
    --accent-dark: #2148ad;
    --accent-deep: #0f3b74;
  }

  &[data-theme="green"] {
    --accent: #2f8a86;
    --accent-rgb: 47, 138, 134;
    --accent-fade: rgba(47, 138, 134, 0.12);
    --accent-soft: rgba(47, 138, 134, 0.08);
    --accent-dark: #1b5551;
    --accent-deep: #0f3d3d;
  }
`;

export const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    600px circle at 20% 30%,
    rgba(47, 138, 134, 0.14) 0%,
    transparent 40%
  );
  pointer-events: none;
  z-index: -1;
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

/* ========================
   Header
   ======================== */

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 6px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 0;
  align-items: center;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  line-height: 1.3;
  color: #1a2e37;
  font-weight: 700;

  @media (max-width: 720px) {
    font-size: 1.4rem;
  }
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #5a7080;
  font-weight: 400;
`;

export const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(var(--accent-rgb), 0.12);
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 8px 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

/* ========================
   Theme Toggle
   ======================== */

export const ToggleGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const ColorSwitcher = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 2px;

  @media (max-width: 720px) {
    margin-bottom: 2px;
  }
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  border-radius: 999px;
  padding: 8px 16px;
  border: 1px solid rgba(var(--accent-rgb), 0.3);
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(135deg, rgba(var(--accent-rgb), 0.15) 0%, rgba(var(--accent-rgb), 0.05) 100%)"
      : "#ffffff"};
  color: ${({ $active }) => ($active ? "var(--accent)" : "#5a7080")};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: rgba(var(--accent-rgb), 0.5);
    background: ${({ $active }) =>
      $active
        ? "linear-gradient(135deg, rgba(var(--accent-rgb), 0.2) 0%, rgba(var(--accent-rgb), 0.08) 100%)"
        : "rgba(var(--accent-rgb), 0.05)"};
  }
`;

/* ========================
   Grid & Layout
   ======================== */

export const Grid = styled.div<{ $hasPreview: boolean }>`
  display: ${({ $hasPreview }) => ($hasPreview ? "grid" : "flex")};
  gap: 18px;
  grid-template-columns: ${({ $hasPreview }) =>
    $hasPreview ? "1fr 1fr" : "none"};

  ${({ $hasPreview }) =>
    !$hasPreview &&
    css`
      flex-direction: column;
      width: 100%;
    `}

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
`;

/* ========================
   Card Sections
   ======================== */

export const Card = styled.section`
  border-radius: 28px;
  border: 1px solid rgba(216, 227, 234, 0.85);
  background: #ffffff;
  padding: 30px 32px;
  box-shadow: 0 18px 40px -32px rgba(14, 46, 60, 0.45);

  @media (max-width: 720px) {
    border-radius: 24px;
    padding: 20px;
  }
`;

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px 28px;
  margin: -30px -32px 26px -32px;
  background: linear-gradient(
    135deg,
    var(--accent) 0%,
    var(--accent-dark) 50%,
    var(--accent-deep) 100%
  );
  color: #f8fbfc;
  border-radius: 28px 28px 0 0;

  @media (max-width: 720px) {
    margin: -20px -20px 20px -20px;
    padding: 18px 20px;
    border-radius: 24px 24px 0 0;
  }
`;

export const CardTopLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CardTopRight = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
`;

export const LayoutSelector = styled.div`
  display: flex;
  gap: 8px;
`;

export const LayoutButton = styled.button<{ $active: boolean }>`
  border-radius: 999px;
  padding: 8px 14px;
  border: ${({ $active }) =>
    $active ? "2px solid rgba(255, 255, 255, 0.4)" : "2px solid transparent"};
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.95)" : "rgba(var(--accent-rgb), 0.3)"};
  color: ${({ $active }) =>
    $active ? "var(--accent)" : "rgba(255, 255, 255, 0.9)"};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "rgba(255, 255, 255, 1)" : "rgba(var(--accent-rgb), 0.4)"};
    border-color: ${({ $active }) =>
      $active ? "rgba(255, 255, 255, 0.6)" : "transparent"};
  }
`;

export const CardTopTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: #ffffff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const CardTopHint = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

/* ========================
   Prayer Items / Sections
   ======================== */

export const Section = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(216, 227, 234, 0.85);
  background: #ffffff;
  padding: 20px 22px;
  box-shadow: 0 18px 40px -32px rgba(14, 46, 60, 0.45);
  display: flex;
  flex-direction: column;
  gap: 18px;
  animation: ${fadeUp} 0.6s ease both;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: #2c4552;
  letter-spacing: 0.14em;
`;

export const SectionIndex = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(var(--accent-rgb), 0.15);
  color: var(--accent);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`;

/* ========================
   Buttons
   ======================== */

export const GhostButton = styled.button`
  border: none;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #5b6f79;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 228, 214, 0.8);
    color: #b24d2b;
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  min-width: 220px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(
    135deg,
    var(--accent) 0%,
    var(--accent-dark) 60%,
    var(--accent-deep) 100%
  );
  color: #f8fbfc;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--accent),
      0 22px 40px -24px rgba(15, 63, 68, 0.85);
  }
  font-size: 0.95rem;
  font-weight: 700;
  padding: 12px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 18px 35px -24px rgba(15, 63, 68, 0.8);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 22px 40px -24px rgba(15, 63, 68, 0.85);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const SecondaryButton = styled.button`
  flex: 1;
  min-width: 220px;
  border-radius: 999px;
  border: 1px solid var(--accent-fade);
  background: #ffffff;
  color: #24424f;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 12px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 16px 32px -28px rgba(12, 44, 58, 0.7);
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: var(--accent-soft);
    transform: translateY(-1px);
  }

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--accent),
      0 16px 32px -28px rgba(12, 44, 58, 0.7);
  }
`;

/* ========================
   Hints & Messages
   ======================== */

export const Hint = styled.div`
  border-radius: 18px;
  border: 1px dashed rgba(var(--accent-rgb), 0.35);
  background: rgba(255, 255, 255, 0.85);
  padding: 12px 14px;
  font-size: 0.8rem;
  color: #6a7d88;
`;

/* ========================
   Preview Section
   ======================== */

export const PreviewCard = styled(Card)`
  position: sticky;
  top: 24px;
  animation-delay: 0.08s;
`;

export const PreviewHeader = styled.div`
  padding: 24px 26px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const PreviewTitle = styled.h3`
  font-family: "Sora", "Manrope", sans-serif;
  font-size: 1.4rem;
  margin: 0 0 6px;
  color: #1a2e37;
`;

export const PreviewSubtitle = styled.p`
  margin: 0;
  color: #5a707c;
  font-size: 0.95rem;
`;

export const PreviewBody = styled.div`
  padding: 18px 26px 26px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PreviewBox = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(216, 227, 234, 0.9);
  background: #ffffff;
  padding: 18px 20px;
  min-height: 220px;
`;

export const PreviewText = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: "JetBrains Mono", "SFMono-Regular", Menlo, monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  color: #15323f;
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #5a707c;
`;

export const StatusText = styled.span<{ $state: "idle" | "copied" | "error" }>`
  color: ${({ $state }) => {
    if ($state === "copied") return "#1e7b5b";
    if ($state === "error") return "#bb3246";
    return "#5a707c";
  }};
  transition: color 0.2s ease;
`;

export const RegenerateHint = styled.div`
  border-radius: 18px;
  border: 1px dashed rgba(var(--accent-rgb), 0.35);
  background: rgba(255, 255, 255, 0.85);
  padding: 12px 14px;
  font-size: 0.8rem;
  color: #5a707c;
`;
