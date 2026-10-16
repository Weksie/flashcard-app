import React, { useState, useEffect, useRef } from 'react'
import { useDeck } from '../context/useDeck'
import {
  ChevronLeft,
  RotateCw,
  Shuffle,
  Check,
  X,
  HelpCircle,
  Lightbulb,
} from 'lucide-react'
import type { Flashcard } from '../types'
import { shuffleArray } from '../utils/shuffle'

export const FlashcardView: React.FC = () => {
  const {
    activeDeck,
    activeCards,
    markCardMastery,
    resetDeckMastery,
    selectDeck,
    setScreen,
    setSessionResult,
    masteredIds,
  } = useDeck()

  const [cards, setCards] = useState<Flashcard[]>(() => (activeCards ? [...activeCards] : []))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)

  // Track session outcomes
  const [masteredSessionCards, setMasteredSessionCards] = useState<Flashcard[]>([])
  const [learningSessionCards, setLearningSessionCards] = useState<Flashcard[]>([])

  // Touch / Drag State
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState<'left' | 'right' | null>(null)
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const currentCard = cards[currentIndex]

  // Shuffle toggle
  const toggleShuffle = () => {
    setIsShuffled((prev) => !prev)
    setCards((prev) => {
      const remaining = prev.slice(currentIndex)
      const finished = prev.slice(0, currentIndex)
      const shuffled = shuffleArray(remaining)
      return [...finished, ...shuffled]
    })
  }

  // Answer handler
  const handleAnswer = (mastered: boolean) => {
    if (!currentCard || isAnimatingOut) return

    // Trigger directional slide out animation
    setIsAnimatingOut(mastered ? 'right' : 'left')

    // Record card mastery
    markCardMastery(currentCard.id, mastered)

    if (mastered) {
      setMasteredSessionCards((prev) => [...prev, currentCard])
    } else {
      setLearningSessionCards((prev) => [...prev, currentCard])
    }

    setTimeout(() => {
      setIsAnimatingOut(null)
      setDragOffset({ x: 0, y: 0 })
      setIsFlipped(false)
      setShowHint(false)

      const nextIndex = currentIndex + 1
      if (nextIndex < cards.length) {
        setCurrentIndex(nextIndex)
      } else {
        // Complete session
        const finalMastered = mastered
          ? [...masteredSessionCards, currentCard]
          : masteredSessionCards
        const finalLearning = !mastered
          ? [...learningSessionCards, currentCard]
          : learningSessionCards

        setSessionResult({
          deckId: activeDeck?.id || '',
          deckTitle: activeDeck?.title || 'Study Session',
          total: cards.length,
          masteredCards: finalMastered,
          learningCards: finalLearning,
          timestamp: Date.now(),
        })
        setScreen('summary')
      }
    }, 280)
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimatingOut) return
    const touch = e.touches[0]
    dragStartRef.current = { x: touch.clientX, y: touch.clientY }
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isAnimatingOut) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - dragStartRef.current.x
    const deltaY = touch.clientY - dragStartRef.current.y
    // Dampen vertical movement to focus on horizontal swipe
    setDragOffset({ x: deltaX, y: deltaY * 0.2 })
  }

  const handleTouchEnd = () => {
    if (!isDragging || isAnimatingOut) return
    setIsDragging(false)
    const threshold = 85
    if (dragOffset.x > threshold) {
      handleAnswer(true)
    } else if (dragOffset.x < -threshold) {
      handleAnswer(false)
    } else {
      // Return smoothly to center
      setDragOffset({ x: 0, y: 0 })
    }
  }

  // Mouse handlers for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimatingOut) return
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isAnimatingOut) return
    const deltaX = e.clientX - dragStartRef.current.x
    const deltaY = e.clientY - dragStartRef.current.y
    setDragOffset({ x: deltaX, y: deltaY * 0.2 })
  }

  const handleMouseUp = () => {
    if (!isDragging || isAnimatingOut) return
    setIsDragging(false)
    const threshold = 85
    if (dragOffset.x > threshold) {
      handleAnswer(true)
    } else if (dragOffset.x < -threshold) {
      handleAnswer(false)
    } else {
      setDragOffset({ x: 0, y: 0 })
    }
  }

  const handleAnswerRef = useRef(handleAnswer)
  useEffect(() => {
    handleAnswerRef.current = handleAnswer
  })

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        setIsFlipped((f) => !f)
      } else if (e.key === 'ArrowRight' || e.key === '2') {
        e.preventDefault()
        handleAnswerRef.current(true)
      } else if (e.key === 'ArrowLeft' || e.key === '1') {
        e.preventDefault()
        handleAnswerRef.current(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!currentCard) {
    const isCompleted = activeDeck && activeDeck.cards.length > 0 && activeDeck.cards.every((c) => !!masteredIds[c.id])

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-xl shadow-emerald-500/10">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          {isCompleted ? 'Alle spørgsmål er mestret! 🎉' : 'Ingen spørgsmål tilbage'}
        </h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          {isCompleted
            ? `Du har mestret alle ${activeDeck.cards.length} spørgsmål i dette emne. Mestrede spørgsmål stilles ikke igen, medmindre du nulstiller dem.`
            : 'Der er ingen udestående spørgsmål i denne omgang.'}
        </p>
        <div className="w-full space-y-2.5">
          {activeDeck && (
            <button
              onClick={() => {
                resetDeckMastery(activeDeck.id)
                setTimeout(() => {
                  selectDeck(activeDeck.id, false, true)
                }, 10)
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-98 text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span>Nulstil mestrede & start forfra</span>
            </button>
          )}
          <button
            onClick={() => setScreen('decks')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Tilbage til oversigt
          </button>
        </div>
      </div>
    )
  }

  const progressPercent = Math.round(((currentIndex + 1) / cards.length) * 100)
  const rotationDeg = dragOffset.x * 0.08
  const rightOpacity = Math.min(Math.max(dragOffset.x / 80, 0), 1)
  const leftOpacity = Math.min(Math.max(-dragOffset.x / 80, 0), 1)

  return (
    <div className="flex-1 flex flex-col min-h-0 px-4 pt-safe pb-safe max-w-md mx-auto w-full select-none overflow-hidden">
      {/* Top Navigation */}
      <header className="pt-2 pb-2.5 flex items-center justify-between gap-2 border-b border-slate-800/60 mb-2">
        <button
          onClick={() => setScreen('decks')}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
          aria-label="Back to decks"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center flex-1 min-w-0 px-2">
          <h2 className="text-sm font-bold text-white truncate font-display">
            {activeDeck?.title || 'Træning'}
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
            <span className="font-semibold text-slate-300">
              Kort {currentIndex + 1} af {cards.length}
            </span>
            {activeDeck && activeDeck.cards.length > cards.length && (
              <span className="text-[10px] text-amber-400 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded-full border border-amber-500/20">
                +{activeDeck.cards.length - cards.length} mestret
              </span>
            )}
          </div>
        </div>

        <button
          onClick={toggleShuffle}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all cursor-pointer active:scale-95 ${
            isShuffled
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title={isShuffled ? 'Blanding aktiv' : 'Bland kort'}
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden mb-3 p-0.5 ring-1 ring-white/5">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-400 rounded-full transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${Math.max(progressPercent, 3)}%` }}
        />
      </div>

      {/* Flashcard Area */}
      <div
        className="flex-1 flex flex-col justify-center items-center relative perspective-1000 py-1 min-h-[380px]"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onClick={() => {
            if (Math.abs(dragOffset.x) < 5) {
              setIsFlipped((prev) => !prev)
            }
          }}
          style={{
            transform: isAnimatingOut
              ? `translateX(${isAnimatingOut === 'right' ? '120%' : '-120%'}) rotate(${
                  isAnimatingOut === 'right' ? '25deg' : '-25deg'
                })`
              : `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotationDeg}deg)`,
            transition: isDragging
              ? 'none'
              : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          className="relative w-full h-full max-h-[470px] preserve-3d transition-transform duration-500 rounded-3xl cursor-pointer"
        >
          {/* SWIPE OVERLAY INDICATORS */}
          {/* Mastered Badge (Right Swipe) */}
          <div
            style={{ opacity: isAnimatingOut === 'right' ? 1 : rightOpacity }}
            className="absolute top-6 left-6 z-50 pointer-events-none px-4 py-2 rounded-2xl border-2 border-emerald-400 bg-emerald-500/25 text-emerald-300 font-extrabold text-sm uppercase tracking-wider shadow-xl transform -rotate-12 transition-opacity font-display"
          >
            Kan det ✓
          </div>

          {/* Learning Badge (Left Swipe) */}
          <div
            style={{ opacity: isAnimatingOut === 'left' ? 1 : leftOpacity }}
            className="absolute top-6 right-6 z-50 pointer-events-none px-4 py-2 rounded-2xl border-2 border-rose-400 bg-rose-500/25 text-rose-300 font-extrabold text-sm uppercase tracking-wider shadow-xl transform rotate-12 transition-opacity font-display"
          >
            Skal øves ✕
          </div>

          {/* FRONT OF CARD (Question) */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-750 bg-gradient-to-b from-slate-900 via-slate-900 to-[#0c1220] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 ${
              isFlipped ? 'rotate-y-180 pointer-events-none' : ''
            }`}
          >
            {/* Front Header */}
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase font-display">
                {currentCard.category || 'C-SPØRGSMÅL'}
              </span>

              {currentCard.hint && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowHint((h) => !h)
                  }}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    showHint
                      ? 'bg-amber-500/25 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:text-amber-300 hover:border-amber-500/30'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold">{showHint ? 'Skjul tip' : 'Se tip'}</span>
                </button>
              )}
            </div>

            {/* Front Body (Question Text) */}
            <div className="my-auto py-4 text-center">
              <p className="text-lg sm:text-xl font-bold text-white leading-relaxed px-1 font-display tracking-tight">
                {currentCard.question}
              </p>

              {/* Collapsible Hint */}
              {showHint && currentCard.hint && (
                <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm text-left shadow-inner">
                  <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-400">
                    <HelpCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Hjælpetip / Stikord:</span>
                  </div>
                  <p className="leading-relaxed text-amber-100/90 font-medium">{currentCard.hint}</p>
                </div>
              )}
            </div>

            {/* Front Footer */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-semibold py-1">
              <RotateCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Tryk på kortet for at se svaret</span>
            </div>
          </div>

          {/* BACK OF CARD (Answer) */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-emerald-500/40 bg-gradient-to-b from-[#0a1b15] via-slate-900 to-slate-950 shadow-[0_16px_40px_-8px_rgba(16,185,129,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 ${
              !isFlipped ? 'rotate-y-180 pointer-events-none' : ''
            }`}
          >
            {/* Back Header */}
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-display flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>OFFICIELT SVAR</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">Kort {currentIndex + 1}</span>
            </div>

            {/* Back Body (Answer Text) */}
            <div className="my-auto py-3 text-center overflow-y-auto max-h-[280px] px-1">
              <div className="text-base sm:text-lg font-semibold text-emerald-200 leading-relaxed whitespace-pre-line text-left">
                {currentCard.answer}
              </div>
            </div>

            {/* Back Footer */}
            <div className="flex items-center justify-center gap-2 text-xs text-emerald-400/80 font-semibold py-1">
              <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tryk for at vende tilbage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Tip Banner */}
      <div className="flex items-center justify-between px-3 text-[11px] text-slate-400 font-semibold py-1.5">
        <span className="flex items-center gap-1 text-rose-400/90">
          <span>← Swipe venstre:</span>
          <span className="font-bold">Skal øves</span>
        </span>
        <span className="flex items-center gap-1 text-emerald-400/90">
          <span>Swipe højre:</span>
          <span className="font-bold">Kan det →</span>
        </span>
      </div>

      {/* Bottom Ergonomic Thumb Buttons */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1.5 pb-2">
        {/* Still Learning / Need Review Button */}
        <button
          onClick={() => handleAnswer(false)}
          className="min-h-[58px] min-w-0 flex flex-col items-center justify-center gap-1 py-2 px-1.5 sm:px-2 rounded-2xl bg-gradient-to-b from-rose-500/20 to-rose-600/10 hover:from-rose-500/30 hover:to-rose-600/20 active:scale-95 border border-rose-500/40 text-rose-300 transition-all cursor-pointer shadow-lg shadow-rose-950/40 group"
          title="Skal øves igen (Tast [1] eller [←])"
        >
          <div className="w-7 h-7 rounded-full bg-rose-500/25 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
            <X className="w-4 h-4 text-rose-300" />
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs font-bold font-display truncate">Skal øves</span>
            <span className="hidden sm:inline text-[9px] text-rose-400/70 bg-rose-950/60 px-1 rounded flex-shrink-0">[1]</span>
          </div>
        </button>

        {/* Flip Card Button */}
        <button
          onClick={() => setIsFlipped((prev) => !prev)}
          className="min-h-[58px] min-w-0 flex flex-col items-center justify-center gap-1 py-2 px-1.5 sm:px-2 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-850 hover:from-slate-750 hover:to-slate-800 active:scale-95 border border-slate-700 text-slate-100 transition-all cursor-pointer shadow-lg group"
          title="Vend kort (Tast [Mellemrum])"
        >
          <div className="w-7 h-7 rounded-full bg-slate-700/80 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
            <RotateCw className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs font-bold font-display truncate">Vend kort</span>
            <span className="hidden sm:inline text-[9px] text-slate-400 bg-slate-900/60 px-1 rounded flex-shrink-0">[␣]</span>
          </div>
        </button>

        {/* Mastered Button */}
        <button
          onClick={() => handleAnswer(true)}
          className="min-h-[58px] min-w-0 flex flex-col items-center justify-center gap-1 py-2 px-1.5 sm:px-2 rounded-2xl bg-gradient-to-b from-emerald-500/25 to-teal-600/15 hover:from-emerald-500/35 hover:to-teal-600/25 active:scale-95 border border-emerald-500/40 text-emerald-300 transition-all cursor-pointer shadow-lg shadow-emerald-950/40 group"
          title="Marker som mestret (Tast [2] eller [→])"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500/25 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
            <Check className="w-4 h-4 text-emerald-300" />
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs font-bold font-display truncate">Kan det</span>
            <span className="hidden sm:inline text-[9px] text-emerald-400/70 bg-emerald-950/60 px-1 rounded flex-shrink-0">[2]</span>
          </div>
        </button>
      </div>
    </div>
  )
}
