import React, { useState } from 'react'
import { useDeck } from '../context/useDeck'
import type { Deck, Flashcard } from '../types'
import { X, Plus, Trash2, FileText, Check, AlertCircle } from 'lucide-react'

interface ManageQuestionsModalProps {
  isOpen: boolean
  onClose: () => void
  editingDeck?: Deck | null
}

export const ManageQuestionsModal: React.FC<ManageQuestionsModalProps> = ({
  isOpen,
  onClose,
  editingDeck,
}) => {
  if (!isOpen) return null

  return <ManageQuestionsContent onClose={onClose} editingDeck={editingDeck} />
}

const ManageQuestionsContent: React.FC<{
  onClose: () => void
  editingDeck?: Deck | null
}> = ({ onClose, editingDeck }) => {
  const { addCustomDeck, updateDeck } = useDeck()

  const [activeTab, setActiveTab] = useState<'editor' | 'bulk'>('editor')
  const [title, setTitle] = useState(() => editingDeck?.title || '')
  const [description, setDescription] = useState(() => editingDeck?.description || '')
  const [cards, setCards] = useState<Flashcard[]>(() => (editingDeck ? [...editingDeck.cards] : []))
  const [bulkText, setBulkText] = useState('')
  const [error, setError] = useState<string | null>(null)

  // New card draft in editor tab
  const [draftQuestion, setDraftQuestion] = useState('')
  const [draftAnswer, setDraftAnswer] = useState('')
  const [draftHint, setDraftHint] = useState('')

  // Add individual card
  const handleAddCard = () => {
    if (!draftQuestion.trim() || !draftAnswer.trim()) {
      setError('Udfyld venligst både spørgsmål og svar.')
      return
    }

    const newCard: Flashcard = {
      id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      question: draftQuestion.trim(),
      answer: draftAnswer.trim(),
      hint: draftHint.trim() || undefined,
    }

    setCards((prev) => [...prev, newCard])
    setDraftQuestion('')
    setDraftAnswer('')
    setDraftHint('')
    setError(null)
  }

  // Remove card
  const handleRemoveCard = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId))
  }

  // Parse bulk text
  const handleParseBulk = () => {
    if (!bulkText.trim()) {
      setError('Indsæt venligst spørgsmålsdata.')
      return
    }

    try {
      // First check if it is JSON
      if (bulkText.trim().startsWith('[')) {
        const parsed = JSON.parse(bulkText)
        if (Array.isArray(parsed)) {
          const formatted: Flashcard[] = parsed.map((item, idx) => ({
            id: `card-bulk-${Date.now()}-${idx}`,
            question: item.question || item.q || 'Uden titel',
            answer: item.answer || item.a || 'Uden svar',
            hint: item.hint || item.h || undefined,
            category: item.category || undefined,
          }))
          setCards((prev) => [...prev, ...formatted])
          setBulkText('')
          setActiveTab('editor')
          setError(null)
          return
        }
      }
    } catch {
      // Not JSON, continue to pipe / delimiter parsing
    }

    // Line by line parsing: "Question | Answer | Hint"
    const lines = bulkText.split('\n')
    const newParsedCards: Flashcard[] = []

    lines.forEach((line, index) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return

      // Split by pipe '|'
      const parts = trimmed.split('|').map((p) => p.trim())
      if (parts.length >= 2) {
        newParsedCards.push({
          id: `card-bulk-${Date.now()}-${index}`,
          question: parts[0],
          answer: parts[1],
          hint: parts[2] || undefined,
        })
      }
    })

    if (newParsedCards.length === 0) {
      setError('Kunne ikke fortolke nogen spørgsmål. Brug formatet: Spørgsmål | Svar | Valgfrit hint')
      return
    }

    setCards((prev) => [...prev, ...newParsedCards])
    setBulkText('')
    setActiveTab('editor')
    setError(null)
  }

  const handleLoadSample = () => {
    setBulkText(
      `Hvad er tilbageløbssikring? | Ventil der hindrer forurenet vand i at løbe tilbage i drikkevandsnettet. | Beredskabsstyrelsen B-vand\nHvor mange bar yder en standard højtryksslange? | 40 bar nominelt arbejdstryk. | Højtryksudlægning`
    )
  }

  const handleSave = () => {
    if (!title.trim()) {
      setError('Angiv venligst en titel til emnesættet.')
      return
    }

    if (cards.length === 0) {
      setError('Tilføj mindst ét spørgsmål til sættet.')
      return
    }

    if (editingDeck) {
      updateDeck({
        ...editingDeck,
        title: title.trim(),
        description: description.trim() || `${cards.length} spørgsmål`,
        cards,
      })
    } else {
      addCustomDeck({
        title: title.trim(),
        description: description.trim() || `${cards.length} brugerdefinerede spørgsmål`,
        icon: 'Sparkles',
        color: 'from-amber-600 to-orange-500',
        cards,
      })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/85 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="bg-[#0e1424] border border-slate-750 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div>
            <h2 className="text-base font-bold text-white font-display">
              {editingDeck ? 'Rediger Emnesæt' : 'Opret Nyt Emnesæt'}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {cards.length} {cards.length === 1 ? 'spørgsmål' : 'spørgsmål'} tilføjet
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-4 mt-3 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Deck Details */}
          <div className="space-y-2.5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-display">
                Titel på sæt
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="fx Eget repetitionssæt"
                className="mt-1 w-full bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-display">
                Beskrivelse (valgfri)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="fx Spørgsmål til holdtræning"
                className="mt-1 w-full bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex rounded-2xl bg-slate-900/90 p-1 border border-slate-750">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer font-display ${
                activeTab === 'editor'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Enkelt Spørgsmål
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer font-display ${
                activeTab === 'bulk'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Masseimport (Tekst)
            </button>
          </div>

          {/* Tab 1: Single Card Form */}
          {activeTab === 'editor' && (
            <div className="space-y-3 bg-slate-900/70 p-3.5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-200 font-display">Tilføj Spørgsmål</span>
              <input
                type="text"
                value={draftQuestion}
                onChange={(e) => setDraftQuestion(e.target.value)}
                placeholder="Spørgsmål (Forside af kortet)"
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <input
                type="text"
                value={draftAnswer}
                onChange={(e) => setDraftAnswer(e.target.value)}
                placeholder="Svar (Bagside af kortet)"
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <input
                type="text"
                value={draftHint}
                onChange={(e) => setDraftHint(e.target.value)}
                placeholder="Valgfrit stikord / hint"
                className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                onClick={handleAddCard}
                className="w-full min-h-[42px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-all font-display"
              >
                <Plus className="w-4 h-4" />
                <span>Tilføj Spørgsmål</span>
              </button>
            </div>
          )}

          {/* Tab 2: Bulk Import */}
          {activeTab === 'bulk' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-400 font-display">
                  Format: "Spørgsmål | Svar | Valgfrit hint"
                </label>
                <button
                  onClick={handleLoadSample}
                  className="text-[11px] text-amber-400 hover:underline font-medium cursor-pointer"
                >
                  Indsæt eksempel
                </button>
              </div>
              <textarea
                rows={6}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="Spørgsmål 1 | Svar 1&#10;Spørgsmål 2 | Svar 2 | Valgfrit hint"
                className="w-full bg-slate-950 border border-slate-750 rounded-xl p-3 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                onClick={handleParseBulk}
                className="w-full min-h-[42px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-all font-display"
              >
                <FileText className="w-4 h-4" />
                <span>Fortolk & Tilføj</span>
              </button>
            </div>
          )}

          {/* Card List in Deck */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-display">
              Kort i dette sæt ({cards.length})
            </h4>
            {cards.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">Ingen spørgsmål tilføjet endnu.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cards.map((c, i) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-2 shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-amber-400 font-mono">#{i + 1}</span>
                        <p className="text-xs font-semibold text-white truncate">{c.question}</p>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.answer}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveCard(c.id)}
                      className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Fjern kort"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-800 flex items-center gap-2.5 bg-slate-900/95">
          <button
            onClick={onClose}
            className="flex-1 min-h-[42px] py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
          >
            Annuller
          </button>
          <button
            onClick={handleSave}
            className="flex-1 min-h-[42px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 cursor-pointer active:scale-95 transition-all font-display"
          >
            <Check className="w-4 h-4" />
            <span>Gem Emnesæt</span>
          </button>
        </div>
      </div>
    </div>
  )
}
