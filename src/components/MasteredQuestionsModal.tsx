import React from 'react'
import { useDeck } from '../context/useDeck'
import type { Deck } from '../types'
import { X, RotateCcw, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react'

interface MasteredQuestionsModalProps {
  isOpen: boolean
  onClose: () => void
  deck: Deck | null
}

export const MasteredQuestionsModal: React.FC<MasteredQuestionsModalProps> = ({
  isOpen,
  onClose,
  deck,
}) => {
  const { masteredIds, resetCardMastery, resetDeckMastery } = useDeck()

  if (!isOpen || !deck) return null

  const masteredCards = deck.cards.filter((c) => !!masteredIds[c.id])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Mestrede Spørgsmål</h3>
              <p className="text-xs text-slate-400 truncate max-w-[220px]">
                {deck.title} ({masteredCards.length} af {deck.cards.length})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Luk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Subheader / Actions */}
        {masteredCards.length > 0 && (
          <div className="px-4 py-2.5 bg-slate-850 border-b border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Nulstil for at få spørgsmålet stillet igen
            </span>
            <button
              onClick={() => resetDeckMastery(deck.id)}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold px-2 py-1 rounded-lg hover:bg-amber-400/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nulstil alle ({masteredCards.length})</span>
            </button>
          </div>
        )}

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {masteredCards.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-3 text-slate-500">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-300 mb-1">
                Ingen mestrede spørgsmål endnu
              </p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Spørgsmål du svarer "Kan det" til vil blive markeret som mestrede og fjernet fra fremtidige træninger.
              </p>
            </div>
          ) : (
            masteredCards.map((card) => (
              <div
                key={card.id}
                className="bg-slate-850/70 border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-2 hover:border-slate-750 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {card.category || deck.title}
                  </span>
                  <button
                    onClick={() => resetCardMastery(card.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-amber-500/15 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/30 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                    title="Nulstil dette spørgsmål så det stilles igen"
                  >
                    <RotateCcw className="w-3 h-3 text-amber-400" />
                    <span>Nulstil</span>
                  </button>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-100 leading-snug">
                    {card.question}
                  </p>
                  <p className="text-xs text-emerald-400/90 font-medium mt-1 leading-relaxed whitespace-pre-line">
                    {card.answer}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Nulstillede spørgsmål inkluderes straks i træningen</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold transition-colors cursor-pointer"
          >
            Luk
          </button>
        </div>
      </div>
    </div>
  )
}
