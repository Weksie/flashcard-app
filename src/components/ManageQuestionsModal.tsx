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
      setError('Please provide both a question and an answer.')
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
      setError('Please paste question data.')
      return
    }

    try {
      // First check if it is JSON
      if (bulkText.trim().startsWith('[')) {
        const parsed = JSON.parse(bulkText)
        if (Array.isArray(parsed)) {
          const formatted: Flashcard[] = parsed.map((item, idx) => ({
            id: `card-bulk-${Date.now()}-${idx}`,
            question: item.question || item.q || 'Untitled Question',
            answer: item.answer || item.a || 'Untitled Answer',
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

      // Split by "|" or tab
      const parts = trimmed.includes('|') ? trimmed.split('|') : trimmed.split('\t')
      if (parts.length >= 2) {
        newParsedCards.push({
          id: `card-bulk-${Date.now()}-${index}`,
          question: parts[0].trim(),
          answer: parts[1].trim(),
          hint: parts[2]?.trim() || undefined,
        })
      }
    })

    if (newParsedCards.length === 0) {
      setError(
        'Could not parse cards. Use format: "Question | Answer" on each line.'
      )
      return
    }

    setCards((prev) => [...prev, ...newParsedCards])
    setBulkText('')
    setActiveTab('editor')
    setError(null)
  }

  // Load sample bulk text
  const handleLoadSample = () => {
    setBulkText(
      `What is the largest ocean on Earth? | Pacific Ocean | Covers more than 30% of the Earth's surface\n` +
      `How many continents are there? | 7 Continents | Africa, Antarctica, Asia, Europe, North America, Oceania, South America\n` +
      `Who wrote Romeo and Juliet? | William Shakespeare | English playwright and poet\n` +
      `What is the boiling point of water in Celsius? | 100°C | At standard atmospheric pressure`
    )
  }

  // Save whole deck
  const handleSave = () => {
    if (!title.trim()) {
      setError('Please provide a deck title.')
      return
    }
    if (cards.length === 0) {
      setError('Please add at least one question.')
      return
    }

    if (editingDeck) {
      updateDeck({
        ...editingDeck,
        title: title.trim(),
        description: description.trim() || `${cards.length} questions`,
        cards,
      })
    } else {
      addCustomDeck({
        title: title.trim(),
        description: description.trim() || `${cards.length} custom questions`,
        icon: 'Sparkles',
        color: 'from-violet-600 to-indigo-500',
        cards,
      })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">
              {editingDeck ? 'Edit Question Deck' : 'Create Question Deck'}
            </h2>
            <p className="text-xs text-slate-400">
              {cards.length} {cards.length === 1 ? 'question' : 'questions'} added
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-4 mt-3 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Deck Details */}
          <div className="space-y-2">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Deck Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Biology Exam Prep"
                className="mt-1 w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Description (optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Chapter 1-4 definitions"
                className="mt-1 w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex rounded-xl bg-slate-800/70 p-1 border border-slate-750">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'editor'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Add Card by Card
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'bulk'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bulk Paste / Import
            </button>
          </div>

          {/* Tab 1: Single Card Form */}
          {activeTab === 'editor' && (
            <div className="space-y-3 bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300">Add New Card</span>
              <input
                type="text"
                value={draftQuestion}
                onChange={(e) => setDraftQuestion(e.target.value)}
                placeholder="Question / Front of card"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
              />
              <input
                type="text"
                value={draftAnswer}
                onChange={(e) => setDraftAnswer(e.target.value)}
                placeholder="Answer / Back of card"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
              />
              <input
                type="text"
                value={draftHint}
                onChange={(e) => setDraftHint(e.target.value)}
                placeholder="Optional Hint"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
              />
              <button
                onClick={handleAddCard}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>
          )}

          {/* Tab 2: Bulk Import */}
          {activeTab === 'bulk' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-400">
                  Paste "Question | Answer | Hint" lines:
                </label>
                <button
                  onClick={handleLoadSample}
                  className="text-[11px] text-indigo-400 hover:underline"
                >
                  Load Sample
                </button>
              </div>
              <textarea
                rows={6}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="Question 1 | Answer 1&#10;Question 2 | Answer 2 | Optional hint"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 font-mono focus:outline-hidden focus:border-indigo-500"
              />
              <button
                onClick={handleParseBulk}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Parse & Add Questions</span>
              </button>
            </div>
          )}

          {/* Card List in Deck */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Cards in this Deck ({cards.length})
            </h4>
            {cards.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">No cards added yet.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cards.map((c, i) => (
                  <div
                    key={c.id}
                    className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-750 flex items-start justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-indigo-400">#{i + 1}</span>
                        <p className="text-xs font-semibold text-white truncate">{c.question}</p>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.answer}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveCard(c.id)}
                      className="text-slate-400 hover:text-rose-400 p-1"
                      title="Remove card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-2 bg-slate-900/90">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Save Deck</span>
          </button>
        </div>
      </div>
    </div>
  )
}
