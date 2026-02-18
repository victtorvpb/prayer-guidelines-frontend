import { EMOJI_NUMBERS, PAUTA_WARNINGS, VERSICULO_WARNINGS } from "./constants";

export function getEmojiNumber(index: number): string {
  return EMOJI_NUMBERS[index] || `${index + 1}️⃣`;
}

export function getPautaWarning(index: number): string {
  return PAUTA_WARNINGS[index] ?? PAUTA_WARNINGS[0];
}

export function getVersiculoWarning(index: number): string {
  return VERSICULO_WARNINGS[index] ?? VERSICULO_WARNINGS[0];
}
