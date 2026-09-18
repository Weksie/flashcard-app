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
      <header className="pt-2 pb-2 flex items-center justify-between gap-2">
        <button
          onClick={() => setScreen('decks')}
          className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white active:bg-slate-800 transition-colors"
          aria-label="Back to decks"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="text-center flex-1 min-w-0 px-2">
          <h2 className="text-sm font-bold text-white truncate">
            {activeDeck?.title || 'Træning'}
          </h2>
          <div className="flex items-center justify-center gap-1 text-xs text-slate-400 font-medium">
            <span>
              Kort {currentIndex + 1} af {cards.length}
            </span>
            {activeDeck && activeDeck.cards.length > cards.length && (
              <span className="text-[10px] text-amber-400/90 font-normal">
                ({activeDeck.cards.length - cards.length} mestrede udeladt)
              </span>
            )}
          </div>
        </div>

        <button
          onClick={toggleShuffle}
          className={`p-2 rounded-full transition-colors ${
            isShuffled
              ? 'bg-indigo-600/30 text-indigo-400'
              : 'text-slate-400 hover:text-white active:bg-slate-800'
          }`}
          title={isShuffled ? 'Shuffled' : 'Shuffle cards'}
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Flashcard Area */}
      <div
        className="flex-1 flex flex-col justify-center items-center relative perspective-1000 py-2 min-h-[360px]"
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
          className="relative w-full h-full max-h-[460px] preserve-3d transition-transform duration-500 rounded-3xl cursor-pointer"
        >
          {/* SWIPE OVERLAY INDICATORS */}
          {/* Mastered Badge (Right Swipe) */}
          <div
            style={{ opacity: isAnimatingOut === 'right' ? 1 : rightOpacity }}
            className="absolute top-6 left-6 z-50 pointer-events-none px-3.5 py-1.5 rounded-xl border-2 border-emerald-400 bg-emerald-500/20 text-emerald-400 font-extrabold text-sm uppercase tracking-wider shadow-lg transform -rotate-12 transition-opacity"
          >
            Kan det ✓
          </div>

          {/* Learning Badge (Left Swipe) */}
          <div
            style={{ opacity: isAnimatingOut === 'left' ? 1 : leftOpacity }}
            className="absolute top-6 right-6 z-50 pointer-events-none px-3.5 py-1.5 rounded-xl border-2 border-rose-400 bg-rose-500/20 text-rose-400 font-extrabold text-sm uppercase tracking-wider shadow-lg transform rotate-12 transition-opacity"
          >
            Skal øves ✕
          </div>

          {/* FRONT OF CARD (Question) */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 flex flex-col justify-between border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-925 shadow-2xl transition-all duration-300 ${
              isFlipped ? 'rotate-y-180 pointer-events-none' : ''
            }`}
          >
            {/* Front Header */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-amber-500/15 text-amber-400 border border-amber-500/20">
                {currentCard.category || 'SPØRGSMÅL'}
              </span>

              {currentCard.hint && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowHint((h) => !h)
                  }}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    showHint
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-amber-300'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Skjul tip' : 'Tip'}</span>
                </button>
              )}
            </div>

            {/* Front Body (Question Text) */}
            <div className="my-auto py-4 text-center">
              <p className="text-lg md:text-xl font-semibold text-slate-100 leading-relaxed px-2">
                {currentCard.question}
              </p>

              {/* Collapsible Hint */}
              {showHint && currentCard.hint && (
                <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs text-left animate-fadeIn">
                  <div className="font-bold flex items-center gap-1 mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Tip</span>
                  </div>
                  {currentCard.hint}
                </div>
              )}
            </div>

            {/* Front Footer */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium py-1">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Tryk for at se svaret</span>
            </div>
          </div>

          {/* BACK OF CARD (Answer) */}
          <div
            className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 flex flex-col justify-between border border-amber-900/60 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl transition-all duration-300 ${
              !isFlipped ? 'rotate-y-180 pointer-events-none' : ''
            }`}
          >
            {/* Back Header */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                SVAR
              </span>
              <span className="text-[11px] font-medium text-slate-400">Kort {currentIndex + 1}</span>
            </div>

            {/* Back Body (Answer Text) */}
            <div className="my-auto py-4 text-center overflow-y-auto max-h-[260px] px-2">
              <div className="text-base md:text-lg font-semibold text-emerald-300 leading-relaxed whitespace-pre-line text-left md:text-center">
                {currentCard.answer}
              </div>
            </div>

            {/* Back Footer */}
            <div className="flex items-center justify-center gap-2 text-xs text-amber-300/70 font-medium py-1">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Tryk for at vende tilbage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Tip Banner */}
      <div className="flex items-center justify-between px-2 text-[11px] text-slate-500 font-medium py-1">
        <span>← Swipe: Skal øves</span>
        <span>Swipe: Kan det →</span>
      </div>

      {/* Bottom Ergonomic Thumb Buttons */}
      <div className="grid grid-cols-3 gap-3 pt-2 pb-3">
        {/* Still Learning / Need Review Button */}
        <button
          onClick={() => handleAnswer(false)}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 active:scale-95 border border-rose-500/30 text-rose-300 transition-all cursor-pointer shadow-lg shadow-rose-950/30"
          title="Skal øves igen (Swipe Venstre)"
        >
          <div className="w-7 h-7 rounded-full bg-rose-500/20 flex items-center justify-center">
            <X className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-xs font-bold">Skal øves</span>
        </button>

        {/* Flip Card Button */}
        <button
          onClick={() => setIsFlipped((prev) => !prev)}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-slate-800 hover:bg-slate-750 active:scale-95 border border-slate-700 text-slate-200 transition-all cursor-pointer shadow-lg"
          title="Vend kort (Mellemrum)"
        >
          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
            <RotateCw className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-xs font-bold">Vend</span>
        </button>

        {/* Mastered Button */}
        <button
          onClick={() => handleAnswer(true)}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 active:scale-95 border border-emerald-500/30 text-emerald-300 transition-all cursor-pointer shadow-lg shadow-emerald-950/30"
          title="Marker som mestret (Swipe Højre)"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-xs font-bold">Kan det</span>
        </button>
      </div>
    </div>
  )
}
