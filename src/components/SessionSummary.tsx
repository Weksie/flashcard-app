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
        <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-amber-500/25 to-orange-500/10 border border-amber-500/30 text-amber-300 mb-3 shadow-xl shadow-amber-500/15">
          <Trophy className="w-10 h-10 text-amber-400 drop-shadow" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight font-display">Træning Gennemført!</h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">{deckTitle}</p>
      </div>

      {/* Score Bento Card */}
      <div className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800/90 rounded-3xl p-5 my-4 text-center shadow-xl relative overflow-hidden">
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 mb-1 font-display">
          {scorePercent}%
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 font-display">
          Mestringsgrad i denne session
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3.5 border-t border-slate-800/80">
          <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-3.5 text-center shadow-inner">
            <div className="flex items-center justify-center gap-1.5 text-emerald-300 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold font-display uppercase tracking-wide">Mestrede</span>
            </div>
            <div className="text-2xl font-black text-white font-display">{masteredCards.length}</div>
            <div className="text-[10px] text-emerald-300/80 mt-0.5 font-medium">Stilles ikke igen</div>
          </div>

          <div className="bg-rose-500/15 border border-rose-500/30 rounded-2xl p-3.5 text-center shadow-inner">
            <div className="flex items-center justify-center gap-1.5 text-rose-300 mb-1">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-bold font-display uppercase tracking-wide">Skal øves</span>
            </div>
            <div className="text-2xl font-black text-white font-display">{learningCards.length}</div>
            <div className="text-[10px] text-rose-300/80 mt-0.5 font-medium">Stilles i næste runde</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 mb-6">
        {learningCards.length > 0 && (
          <button
            onClick={handleReviewMissed}
            className="w-full min-h-[50px] flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-[0.98] text-slate-950 text-sm font-bold shadow-lg shadow-orange-500/25 transition-all cursor-pointer font-display"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Øv kort der skal repeteres ({learningCards.length})</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
        )}

        {remainingInDeck > 0 && (
          <button
            onClick={handleContinueRemaining}
            className="w-full min-h-[50px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white text-sm font-bold transition-all cursor-pointer shadow-lg shadow-blue-600/20 font-display"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Fortsæt med resterende ({remainingInDeck} tilbage)</span>
          </button>
        )}

        <button
          onClick={handleResetAndRestartDeck}
          className="w-full min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-850 hover:bg-slate-800 active:scale-[0.98] text-slate-200 text-sm font-semibold border border-slate-700/80 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>Nulstil hele emnet & start forfra ({targetDeck?.cards.length || total} spørgsmål)</span>
        </button>

        <button
          onClick={() => setScreen('decks')}
          className="w-full min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 active:scale-[0.98] text-slate-300 hover:text-white text-sm font-medium transition-all cursor-pointer border border-slate-800"
        >
          <Home className="w-4 h-4 text-amber-400" />
          <span>Tilbage til oversigt</span>
        </button>
      </div>

      {/* Card Breakdown List */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
            Gennemgang af spørgsmål
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">
            Tryk på ↺ for at nulstille
          </span>
        </div>

        <div className="space-y-2.5">
          {masteredCards.map((c) => (
            <div
              key={`mastered-${c.id}`}
              className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3.5 flex items-start gap-3 justify-between shadow-sm"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-100">{c.question}</p>
                  <p className="text-xs text-emerald-300 font-medium mt-1 leading-relaxed">{c.answer}</p>
                </div>
              </div>

              <button
                onClick={() => handleResetCard(c.id)}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-amber-400 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-400/10 border border-slate-700 hover:border-amber-400/30 transition-all cursor-pointer flex-shrink-0 ml-2 active:scale-95 min-h-[36px]"
                title="Nulstil dette spørgsmål så det stilles igen"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Nulstil</span>
              </button>
            </div>
          ))}

          {learningCards.map((c) => (
            <div
              key={`learning-${c.id}`}
              className="bg-slate-900/90 border border-rose-500/30 rounded-2xl p-3.5 flex items-start gap-3 shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-100">{c.question}</p>
                <p className="text-xs text-rose-300 font-medium mt-1 leading-relaxed">{c.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
