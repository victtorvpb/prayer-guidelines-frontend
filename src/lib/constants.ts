// Content limits
export const CONTENT_LIMITS = {
  PAUTA: 200,
  VERSICULO: 100,
} as const;

// Emoji numbers for list items
export const EMOJI_NUMBERS = [
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "🔟",
] as const;

// Warning messages for pauta (prayer topic)
export const PAUTA_WARNINGS = [
  "😅 Calma ai! Isso nao e redacao do ENEM.",
  "✍️ Pauta longa demais. Bora resumir?",
  "📚 Ta escrevendo muito. Alguem vai ler isso tudo?",
  "🧠 Menos palavras, mais impacto.",
  "🧹 Texto comprido pede uma vassoura. Enxuga ai!",
] as const;

// Warning messages for versiculo (Bible verse)
export const VERSICULO_WARNINGS = [
  "📖 Versiculo grande. Que tal cortar?",
  "🫣 Ta longo. Vale o resumo?",
  "✂️ Encurta o versiculo pra caber melhor.",
  "🙃 Passou de 50! Respira e resume.",
  "⚡ Direto ao ponto fica mais forte.",
] as const;

// Theme options
export const THEMES = ["green", "blue"] as const;
