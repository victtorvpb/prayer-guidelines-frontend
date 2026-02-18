import { useRef, useState } from 'react'
import { Copy, Plus, Sparkles, X } from 'lucide-react'
import styled, { css, keyframes } from 'styled-components'

interface PrayerItem {
  id: number
  pauta: string
  versiculo: string
}

const getEmojiNumber = (index: number): string => {
  const emojiNumbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
  return emojiNumbers[index] || `${index + 1}️⃣`
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Page = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: var(--page-bg, #e9edf1);
  --accent: #2f8a86;
  --accent-dark: #247a74;
  --accent-deep: #206d6a;
  --accent-rgb: 47, 138, 134;
  --accent-soft: rgba(47, 138, 134, 0.12);
  --accent-fade: rgba(47, 138, 134, 0.22);

  &[data-theme='blue'] {
    --accent: #2e6fbf;
    --accent-dark: #2a63a8;
    --accent-deep: #24578f;
    --accent-rgb: 46, 111, 191;
    --accent-soft: rgba(46, 111, 191, 0.12);
    --accent-fade: rgba(46, 111, 191, 0.22);
  }
`

const BackgroundLayer = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background:
    radial-gradient(600px 420px at 12% 8%, rgba(var(--accent-rgb), 0.18), transparent 60%),
    radial-gradient(520px 360px at 88% 12%, rgba(var(--accent-rgb), 0.16), transparent 62%),
    radial-gradient(700px 480px at 50% 92%, rgba(31, 45, 55, 0.1), transparent 65%);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(17, 24, 32, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(17, 24, 32, 0.04) 1px, transparent 1px);
    background-size: 38px 38px;
    opacity: 0.35;
  }
`

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: min(1160px, 92vw);
  padding: 56px 0 80px;
`

const Header = styled.header`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  margin-bottom: 40px;
  animation: ${fadeUp} 0.6s ease both;
`

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(37, 106, 102, 0.18);
  color: #1c3c42;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 18px 40px -30px rgba(12, 34, 44, 0.7);
`

const PillDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--accent);
`

const Title = styled.h1`
  font-family: 'Sora', 'Manrope', sans-serif;
  font-size: clamp(2.4rem, 3vw, 3.6rem);
  color: #12212a;
  line-height: 1.1;
  font-weight: 700;
  max-width: 760px;
`

const Subtitle = styled.p`
  color: #51626e;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 640px;
`

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`

const Badge = styled.span`
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--accent-fade);
  color: #3b5562;
`

const ToggleGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(216, 227, 234, 0.85);
  box-shadow: 0 16px 32px -28px rgba(12, 44, 58, 0.6);
`

const ToggleButton = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#ffffff' : '#51626e')};
  background: ${({ $active }) => ($active ? 'var(--accent)' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $active }) => ($active ? '#ffffff' : '#2c4957')};
    background: ${({ $active }) => ($active ? 'var(--accent-dark)' : 'rgba(47, 138, 134, 0.08)')};
  }
`

const Grid = styled.div<{ $hasPreview: boolean }>`
  display: grid;
  align-items: start;
  gap: 28px;
  grid-template-columns: ${({ $hasPreview }) => ($hasPreview ? 'minmax(0, 1.05fr) minmax(0, 0.95fr)' : 'minmax(0, 1fr)')};
  ${({ $hasPreview }) =>
    !$hasPreview &&
    css`
      max-width: 860px;
      margin: 0 auto;
    `}

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.section`
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(226, 235, 240, 0.9);
  box-shadow: 0 40px 120px -80px rgba(18, 44, 58, 0.8);
  overflow: hidden;
  backdrop-filter: blur(6px);
  animation: ${fadeUp} 0.6s ease both;
`

const CardTop = styled.div`
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 50%, var(--accent-deep) 100%);
  padding: 18px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #f8fbfc;
`

const CardTopTitle = styled.h2`
  font-family: 'Sora', 'Manrope', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
`

const CardTopHint = styled.span`
  font-size: 0.85rem;
  opacity: 0.85;
`

const CardBody = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`

const Section = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(216, 227, 234, 0.85);
  background: #ffffff;
  padding: 20px 22px;
  box-shadow: 0 18px 40px -32px rgba(14, 46, 60, 0.45);
  display: flex;
  flex-direction: column;
  gap: 18px;
  animation: ${fadeUp} 0.6s ease both;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: #2c4552;
  letter-spacing: 0.14em;
`

const SectionIndex = styled.span`
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
`

const GhostButton = styled.button`
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
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const FieldLabel = styled.label`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4f6471;
`

const ShortcutRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

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
`

const TextArea = styled.textarea`
  border-radius: 18px;
  border: 1px solid rgba(211, 223, 231, 0.9);
  padding: 14px 16px;
  min-height: 120px;
  resize: vertical;
  font-size: 0.95rem;
  font-family: 'Manrope', sans-serif;
  color: #1f313b;
  background: #ffffff;

  &:focus {
    outline: none;
    border-color: rgba(var(--accent-rgb), 0.5);
    box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.2);
  }
`

const TextInput = styled.textarea`
  border-radius: 18px;
  border: 1px solid rgba(211, 223, 231, 0.9);
  padding: 12px 16px;
  font-size: 0.95rem;
  font-family: 'Manrope', sans-serif;
  color: #1f313b;
  background: #ffffff;
  min-height: 64px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: rgba(var(--accent-rgb), 0.5);
    box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.2);
  }
`

const HelperText = styled.span`
  font-size: 0.75rem;
  color: #6a7d88;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`

const PrimaryButton = styled.button`
  flex: 1;
  min-width: 220px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 60%, var(--accent-deep) 100%);
  color: #f8fbfc;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 12px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 18px 35px -24px rgba(15, 63, 68, 0.8);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

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
`

const SecondaryButton = styled.button`
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
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--accent-soft);
    transform: translateY(-1px);
  }
`

const Hint = styled.div`
  border-radius: 18px;
  border: 1px dashed rgba(var(--accent-rgb), 0.35);
  background: rgba(255, 255, 255, 0.85);
  padding: 12px 14px;
  font-size: 0.8rem;
  color: #6a7d88;
`

const PreviewCard = styled(Card)`
  position: sticky;
  top: 24px;
  animation-delay: 0.08s;
`

const PreviewHeader = styled.div`
  padding: 24px 26px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`

const PreviewTitle = styled.h3`
  font-family: 'Sora', 'Manrope', sans-serif;
  font-size: 1.4rem;
  margin: 0 0 6px;
  color: #1a2e37;
`

const PreviewSubtitle = styled.p`
  margin: 0;
  color: #5a707c;
  font-size: 0.95rem;
`

const PreviewBody = styled.div`
  padding: 18px 26px 26px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const PreviewBox = styled.div`
  border-radius: 22px;
  border: 1px solid rgba(216, 227, 234, 0.9);
  background: #ffffff;
  padding: 18px 20px;
  min-height: 220px;
`

const PreviewText = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'JetBrains Mono', 'SFMono-Regular', Menlo, monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  color: #15323f;
`

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #5a707c;
`

const StatusText = styled.span<{ $state: 'idle' | 'copied' | 'error' }>`
  color: ${({ $state }) => {
    if ($state === 'copied') return '#1e7b5b'
    if ($state === 'error') return '#bb3246'
    return '#5a707c'
  }};
  transition: color 0.2s ease;
`

const RegenerateHint = styled.div`
  border-radius: 18px;
  border: 1px dashed rgba(var(--accent-rgb), 0.35);
  background: rgba(255, 255, 255, 0.85);
  padding: 12px 14px;
  font-size: 0.8rem;
  color: #5a707c;
`

function PrayerGuidelines() {
  const [prayerItems, setPrayerItems] = useState<PrayerItem[]>([{ id: 1, pauta: '', versiculo: '' }])
  const [generated, setGenerated] = useState<string>('')
  const [showGenerated, setShowGenerated] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const [needsRegenerate, setNeedsRegenerate] = useState(false)
  const [theme, setTheme] = useState<'green' | 'blue'>('green')
  const pautaRefs = useRef<Record<number, HTMLTextAreaElement | null>>({})

  const addPrayerItem = () => {
    setPrayerItems((current) => {
      const newId = Math.max(...current.map((item) => item.id)) + 1
      return [...current, { id: newId, pauta: '', versiculo: '' }]
    })
    setNeedsRegenerate(showGenerated)
    setCopyState('idle')
  }

  const updatePrayerItem = (id: number, field: 'pauta' | 'versiculo', value: string) => {
    setPrayerItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    )
    setNeedsRegenerate(showGenerated)
    setCopyState('idle')
  }

  const removePrayerItem = (id: number) => {
    if (prayerItems.length > 1) {
      setPrayerItems((current) => current.filter((item) => item.id !== id))
      setNeedsRegenerate(showGenerated)
      setCopyState('idle')
    }
  }

  const output = prayerItems
    .filter((item) => item.pauta.trim() || item.versiculo.trim())
    .map((item, index) => {
      const emoji = getEmojiNumber(index)
      const pauta = item.pauta.trim()
      const versiculo = item.versiculo.trim()
      if (pauta && versiculo) return `${emoji} ${pauta}\n📖 ${versiculo}`
      if (pauta) return `${emoji} ${pauta}`
      return `${emoji} ${versiculo}`
    })
    .join('\n\n')

  const hasAnyContent = output.length > 0

  const applyPautaFormat = (id: number, prefix: string, suffix = prefix) => {
    const textarea = pautaRefs.current[id]
    const item = prayerItems.find((entry) => entry.id === id)
    if (!textarea || !item) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = item.pauta.slice(start, end)
    const nextValue = `${item.pauta.slice(0, start)}${prefix}${selectedText}${suffix}${item.pauta.slice(end)}`

    updatePrayerItem(id, 'pauta', nextValue)

    requestAnimationFrame(() => {
      const nextCursor = start + prefix.length + selectedText.length + suffix.length
      textarea.focus()
      textarea.setSelectionRange(nextCursor, nextCursor)
    })
  }

  const generateOutput = () => {
    if (!hasAnyContent) return
    setGenerated(output)
    setShowGenerated(true)
    setNeedsRegenerate(false)
    setCopyState('idle')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generated)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 1400)
    } catch (err) {
      console.error('Erro ao copiar:', err)
      setCopyState('error')
      window.setTimeout(() => setCopyState('idle'), 2000)
    }
  }

  return (
    <Page data-theme={theme}>
      <BackgroundLayer />
      <Container>
        <Header>
          <Pill>
            <PillDot />
            Gerador de Pautas
          </Pill>
          <Title>Pautas de Oracao com cara de produto moderno</Title>
          <Subtitle>
            Crie pautas, aplique formatacao no estilo WhatsApp e gere um texto pronto para compartilhar com sua equipe.
          </Subtitle>
          <BadgeRow>
            <Badge>Clareza</Badge>
            <Badge>Rapido</Badge>
            <Badge>Compartilhavel</Badge>
          </BadgeRow>
          <ToggleGroup role="group" aria-label="Selecionar cor">
            <ToggleButton type="button" $active={theme === 'green'} onClick={() => setTheme('green')}>
              Verde
            </ToggleButton>
            <ToggleButton type="button" $active={theme === 'blue'} onClick={() => setTheme('blue')}>
              Azul
            </ToggleButton>
          </ToggleGroup>
        </Header>

        <Grid $hasPreview={showGenerated && !!generated}>
          <Card>
            <CardTop>
              <CardTopTitle>Formulario</CardTopTitle>
              <CardTopHint>Organize as pautas</CardTopHint>
            </CardTop>
            <CardBody>
              {prayerItems.map((item, index) => {
                const number = index + 1
                return (
                  <Section key={item.id} style={{ animationDelay: `${index * 0.06}s` }}>
                    <SectionHeader>
                      <SectionTitle>
                        <SectionIndex>{number}</SectionIndex>
                        Pauta {number}
                      </SectionTitle>
                      {prayerItems.length > 1 ? (
                        <GhostButton type="button" onClick={() => removePrayerItem(item.id)} aria-label={`Remover pauta ${number}`}>
                          <X size={16} />
                        </GhostButton>
                      ) : null}
                    </SectionHeader>

                    <Field>
                      <SectionHeader>
                        <FieldLabel htmlFor={`pauta-${item.id}`}>Pauta (WhatsApp)</FieldLabel>
                        <ShortcutRow>
                          <ShortcutButton type="button" onClick={() => applyPautaFormat(item.id, '*')}>
                            *B*
                          </ShortcutButton>
                          <ShortcutButton type="button" onClick={() => applyPautaFormat(item.id, '_')}>
                            _I_
                          </ShortcutButton>
                          <ShortcutButton type="button" onClick={() => applyPautaFormat(item.id, '~')}>
                            ~S~
                          </ShortcutButton>
                          <ShortcutButton type="button" onClick={() => applyPautaFormat(item.id, '`')}>
                            `M`
                          </ShortcutButton>
                        </ShortcutRow>
                      </SectionHeader>
                      <TextArea
                        id={`pauta-${item.id}`}
                        ref={(element) => {
                          pautaRefs.current[item.id] = element
                        }}
                        value={item.pauta}
                        onChange={(event) => updatePrayerItem(item.id, 'pauta', event.target.value)}
                        placeholder="Ex: *Saude da familia* e direcao para a semana"
                        rows={3}
                      />
                      <HelperText>Selecione o texto e clique em um atalho de formatacao.</HelperText>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor={`versiculo-${item.id}`}>Versiculo (opcional)</FieldLabel>
                      <TextInput
                        id={`versiculo-${item.id}`}
                        value={item.versiculo}
                        onChange={(event) => updatePrayerItem(item.id, 'versiculo', event.target.value)}
                        placeholder="Ex: Salmo 121:1-2"
                        autoComplete="off"
                        rows={2}
                      />
                    </Field>
                  </Section>
                )
              })}

              <ButtonRow>
                <SecondaryButton type="button" onClick={addPrayerItem}>
                  <Plus size={16} />
                  Adicionar pauta
                </SecondaryButton>
                <PrimaryButton type="button" onClick={generateOutput} disabled={!hasAnyContent}>
                  <Sparkles size={16} />
                  Gerar pautas
                </PrimaryButton>
              </ButtonRow>

              {!hasAnyContent ? <Hint>Dica: preencha ao menos um tema ou versiculo para gerar.</Hint> : null}
            </CardBody>
          </Card>

          {showGenerated && generated ? (
            <PreviewCard>
              <CardTop>
                <CardTopTitle>Preview</CardTopTitle>
                <CardTopHint>Pronto para enviar</CardTopHint>
              </CardTop>
              <PreviewHeader>
                <div>
                  <PreviewTitle>Texto pronto</PreviewTitle>
                  <PreviewSubtitle>Copie e compartilhe com o grupo.</PreviewSubtitle>
                </div>
                <PrimaryButton type="button" onClick={copyToClipboard} style={{ minWidth: 'auto', padding: '10px 16px' }}>
                  <Copy size={16} />
                  Copiar
                </PrimaryButton>
              </PreviewHeader>
              <PreviewBody>
                <PreviewBox>
                  <PreviewText>{generated}</PreviewText>
                </PreviewBox>
                <StatusRow>
                  <span>{generated.split('\n').length} linha(s)</span>
                  <StatusText role="status" aria-live="polite" $state={copyState}>
                    {copyState === 'copied' ? 'Copiado!' : copyState === 'error' ? 'Erro ao copiar' : ''}
                  </StatusText>
                </StatusRow>
                {needsRegenerate ? <RegenerateHint>Voce alterou o formulario. Clique em Gerar pautas para atualizar.</RegenerateHint> : null}
              </PreviewBody>
            </PreviewCard>
          ) : null}
        </Grid>
      </Container>
    </Page>
  )
}

export default PrayerGuidelines
