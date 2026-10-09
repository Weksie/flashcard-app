import React, { useState } from 'react'
import { useDeck } from '../context/useDeck'
import { MasteredQuestionsModal } from './MasteredQuestionsModal'
import { AppLogo } from './AppLogo'
import type { Deck } from '../types'
import {
  Sparkles,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Flame,
  Droplet,
  Building2,
  AlertTriangle,
  Shield,
  Wrench,
  HeartPulse,
  Radio,
  Car,
  Shuffle,
  CheckCircle2,
  GraduationCap,
  Menu,
} from 'lucide-react'

export const DeckSelector: React.FC = () => {
  const {
    decks,
    selectDeck,
    getMasteryRate,
    getMasteredCount,
    getUnmasteredCount,
    resetDeckMastery,
    resetAllMastery,
    masteredIds,
    setScreen,
    toggleSidebar,
  } = useDeck()

  const [inspectDeck, setInspectDeck] = useState<Deck | null>(null)

  const getDeckIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5" />
      case 'Droplet':
        return <Droplet className="w-5 h-5" />
      case 'Building2':
        return <Building2 className="w-5 h-5" />
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5" />
      case 'Shield':
        return <Shield className="w-5 h-5" />
      case 'Wrench':
        return <Wrench className="w-5 h-5" />
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />
      case 'Radio':
        return <Radio className="w-5 h-5" />
      case 'Car':
        return <Car className="w-5 h-5" />
      default:
        return <Sparkles className="w-5 h-5" />
    }
  }

  // Count unique questions from the first deck (which is Alle Spørgsmål)
  const totalQuestions = decks[0]?.cards.length || 111
  const totalMastered = Object.keys(masteredIds).length
  const avgMastery =
    totalQuestions > 0 ? Math.round((totalMastered / totalQuestions) * 100) : 0

  const handleResetAndStart = (deckId: string, shuffle: boolean = false) => {
    resetDeckMastery(deckId)
    // Small timeout ensures react state has updated the cleared masteredIds
    setTimeout(() => {
      selectDeck(deckId, shuffle, true)
    }, 10)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 pt-safe pb-safe max-w-md mx-auto w-full">
      {/* App Header */}
      <header className="pt-2 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
            title="Åbn emne-menu"
            aria-label="Åbn emne-menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <AppLogo className="w-9 h-9 flex-shrink-0 drop-shadow-md" />
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">C-Spørgsmål til FUI</h1>
            <p className="text-xs text-slate-400">Funktionsuddannelse Indsats</p>
          </div>
        </div>

        {totalMastered > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Vil du nulstille alle mestrede spørgsmål i hele appen?')) {
                resetAllMastery()
              }
            }}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
            title="Nulstil alle mestrede spørgsmål"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Nulstil</span>
          </button>
        )}
      </header>

      {/* Quick Navigation Banner (Eksamenskrav) */}
      <div className="mb-4">
        <button
          onClick={() => setScreen('exam-info')}
          className="w-full flex items-center justify-between p-2.5 px-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-left transition-all group shadow-md cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-1">
            <div className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                Eksamenskrav & point
              </div>
              <p className="text-[10px] text-slate-400 truncate">Censorkrav og bedømmelse til C-prøven</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </button>
      </div>

      {/* Progress & Overview Card */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 mb-5 backdrop-blur-sm shadow-xl">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-medium text-slate-400">Samlet Fremgang</span>
          <span className="text-xs font-bold text-amber-400">
            {totalMastered} / {totalQuestions} mestrede ({avgMastery}%)
          </span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3.5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${avgMastery}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="bg-slate-800/50 rounded-xl py-2 px-3 border border-slate-750">
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Kategorier</div>
            <div className="text-base font-bold text-white mt-0.5">{decks.length}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl py-2 px-3 border border-slate-750">
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Udestående</div>
            <div className="text-base font-bold text-amber-400 mt-0.5">
              {Math.max(0, totalQuestions - totalMastered)}
            </div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Vælg Emne
        </h2>
        <span className="text-xs text-slate-500">{decks.length} sæt</span>
      </div>

      {/* Decks List */}
      <div className="space-y-3 pb-8">
        {decks.map((deck) => {
          const mastery = getMasteryRate(deck)
          const masteredCount = getMasteredCount(deck)
          const unmasteredCount = getUnmasteredCount(deck)
          const isFullyMastered = unmasteredCount === 0 && deck.cards.length > 0

          return (
            <div
              key={deck.id}
              className="group relative bg-slate-900 border border-slate-800/90 rounded-2xl p-4 transition-all duration-200 hover:border-slate-700 active:scale-[0.99] shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${deck.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}
                    >
                      {getDeckIcon(deck.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {deck.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {deck.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress bar per deck */}
                <div className="mt-3 mb-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <span>
                      {isFullyMastered ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Alle {deck.cards.length} spørgsmål mestret
                        </span>
                      ) : (
                        <span>
                          <strong className="text-slate-200">{unmasteredCount}</strong> tilbage af {deck.cards.length}
                        </span>
                      )}
                    </span>

                    {masteredCount > 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setInspectDeck(deck)
                        }}
                        className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-semibold cursor-pointer"
                        title="Se mestrede spørgsmål og nulstil individuelle"
                      >
                        <span>{masteredCount} mestret</span>
                        <span className="text-[10px] text-amber-500/80 underline font-normal">(Se)</span>
                      </button>
                    ) : (
                      <span className="text-slate-500">0 mestret</span>
                    )}
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isFullyMastered
                        ? 'bg-emerald-400'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}
                      style={{ width: `${mastery}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Start & Reset Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                {isFullyMastered ? (
                  <>
                    <button
                      onClick={() => handleResetAndStart(deck.id, false)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                      title="Nulstil alle mestrede spørgsmål og start forfra"
                    >
                      <RotateCcw className="w-4 h-4 flex-shrink-0" />
                      <span>Nulstil & Start forfra</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />
                    </button>

                    <button
                      onClick={() => handleResetAndStart(deck.id, true)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 active:scale-95 text-emerald-400 hover:text-emerald-300 border border-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md"
                      title="Nulstil og start med tilfældige spørgsmål"
                    >
                      <Shuffle className="w-4 h-4 flex-shrink-0" />
                      <span>Tilfældig</span>
                    </button>

                    <button
                      onClick={() => setInspectDeck(deck)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 active:scale-95 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      title="Se og administrer mestrede spørgsmål"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => selectDeck(deck.id, false)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-98 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
                      title={`Start træning (${unmasteredCount} spørgsmål)`}
                    >
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      <span>Start ({unmasteredCount})</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />
                    </button>

                    <button
                      onClick={() => selectDeck(deck.id, true)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 active:scale-95 text-amber-400 hover:text-amber-300 border border-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md"
                      title="Start med tilfældig rækkefølge (kun ikke-mestrede spørgsmål)"
                    >
                      <Shuffle className="w-4 h-4 flex-shrink-0" />
                      <span>Tilfældig</span>
                    </button>

                    {masteredCount > 0 && (
                      <button
                        onClick={() => resetDeckMastery(deck.id)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-amber-500/15 active:scale-95 text-slate-400 hover:text-amber-400 border border-slate-750 transition-colors cursor-pointer"
                        title="Nulstil alle mestrede spørgsmål i dette sæt (så stilles de igen)"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Inspect / Manage Mastered Questions Modal */}
      <MasteredQuestionsModal
        isOpen={!!inspectDeck}
        onClose={() => setInspectDeck(null)}
        deck={inspectDeck}
      />
    </div>
  )
}

