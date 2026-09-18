import React, { useEffect } from 'react'
import { useDeck } from '../context/useDeck'
import confetti from 'canvas-confetti'
import {
  Trophy,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Home,
  Check,
  X,
} from 'lucide-react'

export const SessionSummary: React.FC = () => {
  const {
    sessionResult,
    setSessionResult,
    setScreen,
    selectDeck,
    setActiveCards,
    decks,
    resetDeckMastery,
    resetCardMastery,
    getUnmasteredCount,
  } = useDeck()

  useEffect(() => {
    if (!sessionResult) return

    const scorePercent =
      sessionResult.total > 0
        ? Math.round((sessionResult.masteredCards.length / sessionResult.total) * 100)
        : 0

    // Fire celebratory confetti for good scores
    if (scorePercent >= 60) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      })
    }
  }, [sessionResult])

  if (!sessionResult) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-400 mb-4">Ingen nylige træningsdata fundet.</p>
        <button
          onClick={() => setScreen('decks')}
          className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold"
        >
          Tilbage til oversigt
        </button>
      </div>
    )
  }

  const { deckId, deckTitle, total, masteredCards, learningCards } = sessionResult
  const scorePercent = total > 0 ? Math.round((masteredCards.length / total) * 100) : 0

  const targetDeck = decks.find((d) => d.id === deckId)
  const remainingInDeck = targetDeck ? getUnmasteredCount(targetDeck) : 0

  // Review only missed cards
  const handleReviewMissed = () => {
    if (learningCards.length === 0) return
    setActiveCards(learningCards)
    setScreen('study')
  }

  // Continue with remaining unmastered in deck
  const handleContinueRemaining = () => {
    selectDeck(deckId)
  }

  // Reset entire deck and start fresh
  const handleResetAndRestartDeck = () => {
    resetDeckMastery(deckId)
    setTimeout(() => {
      selectDeck(deckId, false, true)
    }, 10)
  }

  // Undo / reset mastery for a single card directly from summary
  const handleResetCard = (cardId: string) => {
    resetCardMastery(cardId)
    const cardToMove = masteredCards.find((c) => c.id === cardId)
    if (cardToMove) {
      setSessionResult({
        ...sessionResult,
        masteredCards: masteredCards.filter((c) => c.id !== cardId),
        learningCards: [...learningCards, cardToMove],
      })
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 pt-safe pb-safe max-w-md mx-auto w-full">
      {/* Header */}
      <div className="pt-4 pb-2 text-center">
        <div className="inline-flex p-3.5 rounded-3xl bg-amber-500/15 border border-amber-500/25 text-amber-400 mb-3 shadow-xl shadow-orange-500/10">
          <Trophy className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Træning Gennemført!</h1>
        <p className="text-xs text-slate-400 mt-1">{deckTitle}</p>
      </div>

      {/* Score Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 my-4 text-center shadow-xl">
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400 mb-1">
          {scorePercent}%
        </div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Mestringsgrad i denne session
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold">Mestrede</span>
            </div>
            <div className="text-xl font-bold text-white">{masteredCards.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Stilles ikke igen</div>
          </div>

          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3">
            <div className="flex items-center justify-center gap-1.5 text-rose-400 mb-1">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-bold">Skal øves</span>
            </div>
            <div className="text-xl font-bold text-white">{learningCards.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Stilles i næste runde</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 mb-6">
        {learningCards.length > 0 && (
          <button
            onClick={handleReviewMissed}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-98 text-slate-950 text-sm font-bold shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Øv kort der skal repeteres ({learningCards.length})</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
        )}

        {remainingInDeck > 0 && (
          <button
            onClick={handleContinueRemaining}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white text-sm font-semibold transition-all cursor-pointer shadow-md"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Fortsæt med resterende spørgsmål ({remainingInDeck} tilbage)</span>
          </button>
        )}

        <button
          onClick={handleResetAndRestartDeck}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 active:scale-98 text-slate-200 text-sm font-semibold border border-slate-700 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Nulstil hele emnet & start forfra ({targetDeck?.cards.length || total} spørgsmål)</span>
        </button>

        <button
          onClick={() => setScreen('decks')}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-850 hover:bg-slate-800 active:scale-98 text-slate-300 text-sm font-medium transition-all cursor-pointer border border-slate-800"
        >
          <Home className="w-4 h-4" />
          <span>Tilbage til oversigt</span>
        </button>
      </div>

      {/* Card Breakdown List */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Gennemgang af spørgsmål
          </h3>
          <span className="text-[11px] text-slate-500">
            Tryk på ↺ for at nulstille et spørgsmål
          </span>
        </div>

        <div className="space-y-2">
          {masteredCards.map((c) => (
            <div
              key={`mastered-${c.id}`}
              className="bg-slate-900/90 border border-emerald-500/20 rounded-xl p-3 flex items-start gap-3 justify-between"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-200">{c.question}</p>
                  <p className="text-xs text-emerald-400/90 font-semibold mt-0.5">{c.answer}</p>
                </div>
              </div>

              <button
                onClick={() => handleResetCard(c.id)}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-amber-400 px-2 py-1 rounded-lg bg-slate-800 hover:bg-amber-400/10 border border-slate-700 hover:border-amber-400/30 transition-all cursor-pointer flex-shrink-0 ml-2"
                title="Nulstil dette spørgsmål så det stilles igen"
              >
                <RotateCcw className="w-3 h-3 text-amber-400" />
                <span>Nulstil</span>
              </button>
            </div>
          ))}

          {learningCards.map((c) => (
            <div
              key={`learning-${c.id}`}
              className="bg-slate-900/90 border border-rose-500/20 rounded-xl p-3 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-200">{c.question}</p>
                <p className="text-xs text-rose-300 font-semibold mt-0.5">{c.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
