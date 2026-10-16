import React, { useEffect } from 'react'
import { useDeck } from '../context/useDeck'
import { AppLogo } from './AppLogo'
import {
  X,
  BookOpen,
  FileText,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Shield,
  ClipboardCheck,
  Award,
} from 'lucide-react'

export const Sidebar: React.FC = () => {
  const { screen, setScreen, isSidebarOpen, setIsSidebarOpen, decks, masteredIds } = useDeck()

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSidebarOpen, setIsSidebarOpen])

  const totalQuestions = decks[0]?.cards.length || 111
  const totalMastered = Object.keys(masteredIds).length
  const avgMastery = totalQuestions > 0 ? Math.round((totalMastered / totalQuestions) * 100) : 0

  const handleNavigate = (targetScreen: 'decks' | 'quick-notes' | 'exam-info' | 'ab-questions' | 'exam-simulation') => {
    setScreen(targetScreen)
    setIsSidebarOpen(false)
  }

  const isQuestionsActive = screen === 'decks' || screen === 'study' || screen === 'summary'
  const isExamSimActive = screen === 'exam-simulation'
  const isAbActive = screen === 'ab-questions'
  const isNotesActive = screen === 'quick-notes'
  const isExamActive = screen === 'exam-info'

  return (
    <>
      {/* Dimmed Backdrop */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden={!isSidebarOpen}
      />

      {/* Drawer Container (scoped to max width for mobile frame or full screen) */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[#0c1220] border-r border-slate-800/90 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Hovedmenu"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/95">
          <div className="flex items-center gap-3">
            <AppLogo className="w-9 h-9 flex-shrink-0 drop-shadow-md" />
            <div>
              <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 font-display">
                <span>FUI Beredskab</span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
                  Indsats
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Funktionsuddannelse Indsats</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-750 transition-all cursor-pointer active:scale-95"
            aria-label="Luk menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Topic Navigation */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-5">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2.5 font-display">
              Emner & Områder
            </div>
            <nav className="space-y-2">
              {/* Item 1: C-Spørgsmål (Main) */}
              <button
                onClick={() => handleNavigate('decks')}
                className={`w-full min-h-[54px] flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 group cursor-pointer active:scale-[0.98] ${isQuestionsActive
                  ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-md shadow-amber-500/5'
                  : 'bg-slate-900/70 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isQuestionsActive
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-inner'
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-300 group-hover:scale-105'
                      }`}
                  >
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate flex items-center gap-1.5 font-display text-white">
                      <span>C-Spørgsmål</span>
                      {isQuestionsActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">111 flashcards & kategorier</p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${isQuestionsActive
                    ? 'text-amber-400 translate-x-0.5'
                    : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                />
              </button>

              {/* Item 2: Eksamenstræning (Simulator) */}
              <button
                onClick={() => handleNavigate('exam-simulation')}
                className={`w-full min-h-[54px] flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 group cursor-pointer active:scale-[0.98] ${isExamSimActive
                  ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-md shadow-amber-500/5'
                  : 'bg-slate-900/70 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isExamSimActive
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-inner'
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-300 group-hover:scale-105'
                      }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate flex items-center gap-1.5 font-display text-white">
                      <span>Eksamenstræning</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
                        A, B & C
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">Prøvesimulation med point</p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${isExamSimActive
                    ? 'text-amber-400 translate-x-0.5'
                    : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                />
              </button>

              {/* Item 3: A- og B-Spørgsmål */}
              <button
                onClick={() => handleNavigate('ab-questions')}
                className={`w-full min-h-[54px] flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 group cursor-pointer active:scale-[0.98] ${isAbActive
                  ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-md shadow-amber-500/5'
                  : 'bg-slate-900/70 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isAbActive
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-inner'
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-300 group-hover:scale-105'
                      }`}
                  >
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate flex items-center gap-1.5 font-display text-white">
                      <span>A- & B-Spørgsmål</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 border border-blue-500/30 px-1.5 py-0.5 rounded-full">
                        Praktik
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">15 opgavesæt til certificering</p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${isAbActive
                    ? 'text-amber-400 translate-x-0.5'
                    : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                />
              </button>

              {/* Item 4: Hurtige Noter */}
              <button
                onClick={() => handleNavigate('quick-notes')}
                className={`w-full min-h-[54px] flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 group cursor-pointer active:scale-[0.98] ${isNotesActive
                  ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-md shadow-amber-500/5'
                  : 'bg-slate-900/70 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isNotesActive
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-inner'
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-300 group-hover:scale-105'
                      }`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate flex items-center gap-1.5 font-display text-white">
                      <span>Hurtige noter</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                        Opslag
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">Noter og referenceark</p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${isNotesActive
                    ? 'text-amber-400 translate-x-0.5'
                    : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                />
              </button>

              {/* Item 5: Eksamenskrav */}
              <button
                onClick={() => handleNavigate('exam-info')}
                className={`w-full min-h-[54px] flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 group cursor-pointer active:scale-[0.98] ${isExamActive
                  ? 'bg-amber-500/15 border-amber-500/40 text-white shadow-md shadow-amber-500/5'
                  : 'bg-slate-900/70 border-slate-800/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isExamActive
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-inner'
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-300 group-hover:scale-105'
                      }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate font-display text-white">C-Prøve Krav & Point</div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">Regler, censorkrav & point</p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${isExamActive
                    ? 'text-amber-400 translate-x-0.5'
                    : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                />
              </button>
            </nav>
          </div>

          {/* Quick Deck Info Box */}
          <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3.5 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 font-display">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Mestring af pensum
              </span>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">{avgMastery}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2 p-0.5 ring-1 ring-white/5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(avgMastery, 2)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              {totalMastered} af {totalQuestions} spørgsmål mestret
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3.5 border-t border-slate-800/80 bg-slate-900/95 text-center">
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Beredskabsstyrelsen • FUI Indsats</span>
          </div>
        </div>
      </aside>
    </>
  )
}
