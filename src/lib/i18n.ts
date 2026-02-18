export type Language = "pt-BR" | "en" | "es";

export const translations = {
  "pt-BR": {
    // Header
    header: {
      title: "Gerador de Pautas de Oração",
      subtitle:
        "Crie pautas, aplique formatação no estilo de mensagens e gere um texto pronto para compartilhar com sua equipe.",
      badges: {
        clarity: "Clareza",
        fast: "Rápido",
        shareable: "Compartilhável",
      },
    },
    // Form
    form: {
      title: "Formulário",
      hint: "Organize as pautas",
      layoutJuntos: "Juntos",
      layoutSequencial: "Sequencial",
      pautaTitle: (number: number) => `Pauta ${number}`,
      removePauta: (number: number) => `Remover pauta ${number}`,
      pautaLabel: "Pauta (mensagens)",
      pautaPlaceholder: "Ex: *Saúde da família* e direção para a semana",
      versiculoLabel: "Versículo (opcional)",
      versiculoPlaceholder: "Ex: Salmo 121:1-2",
      addPauta: "Adicionar pauta",
      generatePautas: "Gerar pautas",
      formatHint: "Selecione o texto e clique em um atalho de formatação.",
      formatBold: "Negrito",
      formatItalic: "Itálico",
      formatStrikethrough: "Tachado",
      formatMonospace: "Monoespaço",
      emptyHint: "Dica: preencha ao menos um tema ou versículo para gerar.",
    },
    // Preview
    preview: {
      title: "Preview",
      hint: "Pronto para enviar",
      readyText: "Texto pronto",
      readySubtitle: "Copie e compartilhe com o grupo.",
      copyButton: "Copiar",
      copiedMessage: "Copiado!",
      errorMessage: "Erro ao copiar",
      linesLabel: (count: number) => `${count} linha(s)`,
      regenerateHint:
        "Você alterou o formulário. Clique em Gerar pautas para atualizar.",
    },
    // Language selector
    languageSelector: {
      label: "Idioma",
    },
  },
  en: {
    // Header
    header: {
      title: "Prayer Guidelines Generator",
      subtitle:
        "Create agendas, apply message-style formatting, and generate ready-to-share text with your team.",
      badges: {
        clarity: "Clarity",
        fast: "Fast",
        shareable: "Shareable",
      },
    },
    // Form
    form: {
      title: "Form",
      hint: "Organize your agendas",
      layoutJuntos: "Together",
      layoutSequencial: "Sequential",
      pautaTitle: (number: number) => `Agenda ${number}`,
      removePauta: (number: number) => `Remove agenda ${number}`,
      pautaLabel: "Agenda (messages)",
      pautaPlaceholder: "Ex: *Family health* and direction for the week",
      versiculoLabel: "Verse (optional)",
      versiculoPlaceholder: "Ex: Psalm 121:1-2",
      addPauta: "Add agenda",
      generatePautas: "Generate agendas",
      formatHint: "Select text and click a formatting shortcut.",
      formatBold: "Bold",
      formatItalic: "Italic",
      formatStrikethrough: "Strikethrough",
      formatMonospace: "Monospace",
      emptyHint: "Tip: fill in at least one agenda or verse to generate.",
    },
    // Preview
    preview: {
      title: "Preview",
      hint: "Ready to send",
      readyText: "Ready text",
      readySubtitle: "Copy and share with your group.",
      copyButton: "Copy",
      copiedMessage: "Copied!",
      errorMessage: "Copy error",
      linesLabel: (count: number) => `${count} line(s)`,
      regenerateHint: "You changed the form. Click Generate agendas to update.",
    },
    // Language selector
    languageSelector: {
      label: "Language",
    },
  },
  es: {
    // Header
    header: {
      title: "Generador de Pautas de Oración",
      subtitle:
        "Cree pautas, aplique formato de mensajes y genere texto listo para compartir con su equipo.",
      badges: {
        clarity: "Claridad",
        fast: "Rápido",
        shareable: "Compartible",
      },
    },
    // Form
    form: {
      title: "Formulario",
      hint: "Organice sus pautas",
      layoutJuntos: "Juntos",
      layoutSequencial: "Secuencial",
      pautaTitle: (number: number) => `Pauta ${number}`,
      removePauta: (number: number) => `Eliminar pauta ${number}`,
      pautaLabel: "Pauta (mensajes)",
      pautaPlaceholder: "Ex: *Salud familiar* y dirección para la semana",
      versiculoLabel: "Versículo (opcional)",
      versiculoPlaceholder: "Ex: Salmo 121:1-2",
      addPauta: "Agregar pauta",
      generatePautas: "Generar pautas",
      formatHint: "Seleccione texto y haga clic en un atajo de formato.",
      formatBold: "Negrita",
      formatItalic: "Cursiva",
      formatStrikethrough: "Tachado",
      formatMonospace: "Monoespaciado",
      emptyHint:
        "Consejo: complete al menos una pauta o versículo para generar.",
    },
    // Preview
    preview: {
      title: "Vista previa",
      hint: "Listo para enviar",
      readyText: "Texto listo",
      readySubtitle: "Copia y comparte con tu grupo.",
      copyButton: "Copiar",
      copiedMessage: "¡Copiado!",
      errorMessage: "Error al copiar",
      linesLabel: (count: number) => `${count} línea(s)`,
      regenerateHint:
        "Cambió el formulario. Haga clic en Generar pautas para actualizar.",
    },
    // Language selector
    languageSelector: {
      label: "Idioma",
    },
  },
};
