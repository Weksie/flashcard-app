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
  Award,
  TrendingUp,
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
      <header className="pt-3 pb-3 flex items-center justify-between border-b border-slate-800/60 mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-amber-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 rounded-xl shadow-md shadow-amber-500/5 transition-all active:scale-95 cursor-pointer flex-shrink-0 group min-h-[44px]"
            title="Åbn emne-menu"
            aria-label="Åbn emne-menu"
          >
            <Menu className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-wide">Menu</span>
          </button>
          <div className="relative">
            <AppLogo className="w-9 h-9 flex-shrink-0 drop-shadow-md" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-display flex items-center gap-2">
              <span>C-Spørgsmål til FUI</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Funktionsuddannelse Indsats</p>
          </div>
        </div>

        {totalMastered > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Vil du nulstille alle mestrede spørgsmål i hele appen?')) {
                resetAllMastery()
              }
            }}
            className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-amber-300 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/30 transition-all cursor-pointer active:scale-95 min-h-[40px]"
            title="Nulstil alle mestrede spørgsmål"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nulstil</span>
          </button>
        )}
      </header>

      {/* Quick Navigation Banners: Eksamenstræning & Eksamenskrav */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <button
          onClick={() => setScreen('exam-simulation')}
          className="flex items-center gap-2.5 p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 hover:border-amber-400/60 text-left transition-all duration-200 group shadow-lg shadow-amber-500/5 cursor-pointer active:scale-[0.98] min-h-[58px]"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/25 text-amber-300 border border-amber-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate font-display">
              Eksamenstræning
            </div>
            <p className="text-[10px] text-amber-300/80 font-medium truncate">A, B & C prøve</p>
          </div>
        </button>

        <button
          onClick={() => setScreen('exam-info')}
          className="flex items-center gap-2.5 p-3 rounded-2xl bg-gradient-to-br from-blue-500/15 via-slate-900 to-slate-900 border border-slate-800 hover:border-blue-400/50 text-left transition-all duration-200 group shadow-md cursor-pointer active:scale-[0.98] min-h-[58px]"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/25 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors truncate font-display">
              C-Prøve krav
            </div>
            <p className="text-[10px] text-slate-400 font-medium truncate">Censorkrav & point</p>
          </div>
        </button>
      </div>

      {/* Progress & Overview Bento Card */}
      <div className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800/90 rounded-2xl p-3.5 sm:p-4 mb-5 backdrop-blur-md shadow-xl relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 min-w-0">
            <TrendingUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 font-display truncate">
              Samlet Fremgang
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 font-display">
            {totalMastered} af {totalQuestions} <span className="text-amber-400/80 font-normal">({avgMastery}%)</span>
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden mb-3 p-0.5 ring-1 ring-white/5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-400 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${Math.max(avgMastery, 2)}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-800/60 rounded-xl py-2 px-1 border border-slate-750/80 min-w-0">
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-tight truncate px-0.5">
              Kategorier
            </div>
            <div className="text-base sm:text-lg font-black text-white mt-0.5 font-display">
              {decks.length}
            </div>
          </div>
          <div className="bg-slate-800/60 rounded-xl py-2 px-1 border border-slate-750/80 min-w-0">
            <div className="text-emerald-400 text-[10px] uppercase font-bold tracking-tight truncate px-0.5">
              Mestret
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5 font-display">
              {totalMastered}
            </div>
          </div>
          <div className="bg-slate-800/60 rounded-xl py-2 px-1 border border-slate-750/80 min-w-0">
            <div className="text-amber-400 text-[10px] uppercase font-bold tracking-tight truncate px-0.5" title="Mangler at blive mestret">
              Mangler
            </div>
            <div className="text-base sm:text-lg font-black text-amber-400 mt-0.5 font-display">
              {Math.max(0, totalQuestions - totalMastered)}
            </div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
          Vælg Emne til Træning
        </h2>
        <span className="text-xs font-medium text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">{decks.length} sæt</span>
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
              className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 hover:border-amber-500/40 rounded-2xl p-4 transition-all duration-200 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${deck.color} flex items-center justify-center text-white shadow-lg shadow-black/40 flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      {getDeckIcon(deck.icon)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-white leading-tight font-display group-hover:text-amber-200 transition-colors truncate">
                        {deck.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {deck.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress bar per deck */}
                <div className="mt-2.5 mb-3.5">
                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 mb-1.5 font-medium min-w-0">
                    <span className="min-w-0 truncate">
                      {isFullyMastered ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">Alle {deck.cards.length} mestret</span>
                        </span>
                      ) : (
                        <span className="truncate">
                          <strong className="text-slate-100 font-semibold">{unmasteredCount}</strong> tilbage af {deck.cards.length}
                        </span>
                      )}
                    </span>

                    {masteredCount > 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setInspectDeck(deck)
                        }}
                        className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-semibold cursor-pointer p-1 -m-1 flex-shrink-0 whitespace-nowrap"
                        title="Se mestrede spørgsmål og nulstil individuelle"
                      >
                        <span>{masteredCount} mestret</span>
                        <span className="text-[10px] text-amber-500/90 underline font-normal">(Se)</span>
                      </button>
                    ) : (
                      <span className="text-slate-500 flex-shrink-0 whitespace-nowrap">0 mestret</span>
                    )}
                  </div>
                  <div className="w-full h-2 bg-slate-800/90 rounded-full overflow-hidden p-0.5 ring-1 ring-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${isFullyMastered
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}
                      style={{ width: `${mastery}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Start & Reset Buttons */}
              <div className="flex items-center gap-2 pt-2.5 border-t border-slate-800/70">
                {isFullyMastered ? (
                  <>
                    <button
                      onClick={() => handleResetAndStart(deck.id, false)}
                      className="flex-1 min-w-0 min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all cursor-pointer font-display"
                      title="Nulstil alle mestrede spørgsmål og start forfra"
                    >
                      <RotateCcw className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Start Forfra</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-80 flex-shrink-0" />
                    </button>

                    <button
                      onClick={() => handleResetAndStart(deck.id, true)}
                      className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-750 active:scale-95 text-emerald-300 hover:text-emerald-200 border border-slate-700/80 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md flex-shrink-0"
                      title="Nulstil og start med tilfældige spørgsmål"
                    >
                      <Shuffle className="w-4 h-4 flex-shrink-0" />
                      <span>Bland</span>
                    </button>

                    <button
                      onClick={() => setInspectDeck(deck)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 active:scale-95 text-slate-300 hover:text-white border border-slate-750 transition-colors cursor-pointer flex-shrink-0"
                      title="Se og administrer mestrede spørgsmål"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => selectDeck(deck.id, false)}
                      className="flex-1 min-w-0 min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-600/25 transition-all cursor-pointer font-display"
                      title={`Start træning (${unmasteredCount} spørgsmål)`}
                    >
                      <BookOpen className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Start ({unmasteredCount})</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-80 flex-shrink-0" />
                    </button>

                    <button
                      onClick={() => selectDeck(deck.id, true)}
                      className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-750 active:scale-95 text-amber-300 hover:text-amber-200 border border-slate-750 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md flex-shrink-0"
                      title="Start med tilfældig rækkefølge (kun ikke-mestrede spørgsmål)"
                    >
                      <Shuffle className="w-4 h-4 flex-shrink-0" />
                      <span>Bland</span>
                    </button>

                    {masteredCount > 0 && (
                      <button
                        onClick={() => resetDeckMastery(deck.id)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl bg-slate-800/90 hover:bg-amber-500/20 active:scale-95 text-slate-400 hover:text-amber-300 border border-slate-750 transition-colors cursor-pointer flex-shrink-0"
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

