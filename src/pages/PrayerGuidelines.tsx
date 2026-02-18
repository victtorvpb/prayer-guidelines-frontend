import { useState } from 'react'
import './PrayerGuidelines.css'

interface PrayerItem {
  id: number
  pauta: string
  versiculo: string
}

const getEmojiNumber = (index: number): string => {
  const emojiNumbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
  return emojiNumbers[index] || `${index + 1}️⃣`
}

function PrayerGuidelines() {
  const [prayerItems, setPrayerItems] = useState<PrayerItem[]>([
    { id: 1, pauta: '', versiculo: '' }
  ])
  const [generated, setGenerated] = useState<string>('')
  const [showGenerated, setShowGenerated] = useState(false)

  const addPrayerItem = () => {
    const newId = Math.max(...prayerItems.map(item => item.id)) + 1
    setPrayerItems([...prayerItems, { id: newId, pauta: '', versiculo: '' }])
  }

  const updatePrayerItem = (id: number, field: 'pauta' | 'versiculo', value: string) => {
    setPrayerItems(prayerItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const removePrayerItem = (id: number) => {
    if (prayerItems.length > 1) {
      setPrayerItems(prayerItems.filter(item => item.id !== id))
    }
  }

  const generateOutput = () => {
    const output = prayerItems
      .filter(item => item.pauta.trim() || item.versiculo.trim())
      .map((item, index) => {
        const emoji = getEmojiNumber(index)
        return `${emoji} ${item.pauta} - ${item.versiculo}`
      })
      .join('\n')
    
    setGenerated(output)
    setShowGenerated(true)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generated)
      alert('Copiado para a área de transferência!')
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  return (
    <div className="prayer-guidelines-container">
      <h1>Pautas de Oração</h1>
      
      <div className="prayer-form">
        {prayerItems.map((item, index) => (
          <div key={item.id} className="prayer-item">
            <div className="item-header">
              <h3>Pauta {index + 1}</h3>
              {prayerItems.length > 1 && (
                <button 
                  onClick={() => removePrayerItem(item.id)}
                  className="remove-btn"
                  aria-label="Remover pauta"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="input-group">
              <label htmlFor={`pauta-${item.id}`}>Pauta de Oração:</label>
              <input
                id={`pauta-${item.id}`}
                type="text"
                value={item.pauta}
                onChange={(e) => updatePrayerItem(item.id, 'pauta', e.target.value)}
                placeholder="Digite a pauta de oração"
              />
            </div>
            <div className="input-group">
              <label htmlFor={`versiculo-${item.id}`}>Versículo:</label>
              <input
                id={`versiculo-${item.id}`}
                type="text"
                value={item.versiculo}
                onChange={(e) => updatePrayerItem(item.id, 'versiculo', e.target.value)}
                placeholder="Digite o versículo"
              />
            </div>
          </div>
        ))}
        
        <div className="button-group">
          <button onClick={addPrayerItem} className="add-btn">
            + Adicionar Mais Pautas
          </button>
          <button onClick={generateOutput} className="generate-btn">
            Gerar
          </button>
        </div>
      </div>

      {showGenerated && generated && (
        <div className="generated-output">
          <div className="output-header">
            <h2>Pautas Geradas</h2>
            <button onClick={copyToClipboard} className="copy-btn">
              📋 Copiar
            </button>
          </div>
          <div className="output-content">
            {generated.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PrayerGuidelines
