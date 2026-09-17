import React from 'react'
import { useDeck } from '../context/useDeck'
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
} from 'lucide-react'

export const DeckSelector: React.FC = () => {
  const { decks, selectDeck, getMasteryRate, resetDeckMastery } = useDeck()

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
  const avgMastery =
    decks.length > 0
      ? Math.round(decks.reduce((acc, d) => acc + getMasteryRate(d), 0) / decks.length)
      : 0

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 pt-safe pb-safe max-w-md mx-auto w-full">
      {/* App Header */}
      <header className="pt-2 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-600/25">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Indsats C-Prøve</h1>
            <p className="text-xs text-slate-400">Funktionsuddannelse Indsats</p>
          </div>
        </div>
      </header>

      {/* Progress & Overview Card */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 mb-5 backdrop-blur-sm shadow-xl">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-medium text-slate-400">Samlet Fremgang</span>
          <span className="text-xs font-bold text-amber-400">{avgMastery}% Mestrede</span>
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
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Spørgsmål</div>
            <div className="text-base font-bold text-white mt-0.5">{totalQuestions}</div>
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
                    <span>{deck.cards.length} spørgsmål</span>
                    <span
                      className={
                        mastery === 100
                          ? 'text-emerald-400 font-bold'
                          : mastery > 0
                          ? 'text-amber-400 font-semibold'
                          : 'text-slate-500'
                      }
                    >
                      {mastery}% mestret
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        mastery === 100
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
                <button
                  onClick={() => selectDeck(deck.id, false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-98 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
                  title="Start i normal rækkefølge"
                >
                  <BookOpen className="w-4 h-4 flex-shrink-0" />
                  <span>Start</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />
                </button>

                <button
                  onClick={() => selectDeck(deck.id, true)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 active:scale-95 text-amber-400 hover:text-amber-300 border border-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md"
                  title="Start med tilfældig rækkefølge (blandede spørgsmål)"
                >
                  <Shuffle className="w-4 h-4 flex-shrink-0" />
                  <span>Tilfældig</span>
                </button>

                {mastery > 0 && (
                  <button
                    onClick={() => resetDeckMastery(deck.id)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 active:scale-95 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Nulstil fremgang for dette sæt"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
