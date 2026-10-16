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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0e1424] border border-slate-750 rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">Mestrede Spørgsmål</h3>
              <p className="text-xs text-slate-400 font-medium truncate max-w-[220px]">
                {deck.title} ({masteredCards.length} af {deck.cards.length})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer active:scale-95"
            aria-label="Luk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Subheader / Actions */}
        {masteredCards.length > 0 && (
          <div className="px-4 py-2.5 bg-slate-850/80 border-b border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">
              Nulstil for at få spørgsmålet stillet igen
            </span>
            <button
              onClick={() => resetDeckMastery(deck.id)}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold px-2.5 py-1 rounded-lg hover:bg-amber-400/10 transition-colors cursor-pointer min-h-[36px]"
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
              <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-3 text-slate-400 shadow-inner">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
              <p className="text-sm font-bold text-white mb-1 font-display">
                Ingen mestrede spørgsmål endnu
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Spørgsmål du svarer "Kan det" til vil blive markeret som mestrede og fjernet fra fremtidige træninger.
              </p>
            </div>
          ) : (
            masteredCards.map((card) => (
              <div
                key={card.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-2 hover:border-slate-700 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-amber-500/15 text-amber-300 border border-amber-500/25 uppercase font-display">
                    {card.category || deck.title}
                  </span>
                  <button
                    onClick={() => resetCardMastery(card.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 min-h-[36px]"
                    title="Nulstil dette spørgsmål så det stilles igen"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nulstil</span>
                  </button>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-100 leading-snug">
                    {card.question}
                  </p>
                  <p className="text-xs text-emerald-300 font-medium mt-1.5 leading-relaxed whitespace-pre-line">
                    {card.answer}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-900/95 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">Nulstillede spørgsmål inkluderes straks</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 min-h-[40px] rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-bold transition-all cursor-pointer active:scale-95 font-display"
          >
            Luk
          </button>
        </div>
      </div>
    </div>
  )
}
