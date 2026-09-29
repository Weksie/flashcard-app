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

  const handleNavigate = (targetScreen: 'decks' | 'quick-notes' | 'exam-info') => {
    setScreen(targetScreen)
    setIsSidebarOpen(false)
  }

  const isQuestionsActive = screen === 'decks' || screen === 'study' || screen === 'summary'
  const isNotesActive = screen === 'quick-notes'
  const isExamActive = screen === 'exam-info'

  return (
    <>
      {/* Dimmed Backdrop */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden={!isSidebarOpen}
      />

      {/* Drawer Container (scoped to max width for mobile frame or full screen) */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 border-r border-slate-800/90 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Hovedmenu"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <AppLogo className="w-8 h-8 flex-shrink-0 drop-shadow" />
            <div>
              <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>FUI Beredskab</span>
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded">
                  Indsats
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Funktionsuddannelse</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Luk menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Topic Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Emner & Områder
            </div>
            <nav className="space-y-1.5">
              {/* Item 1: C-Spørgsmål (Main) */}
              <button
                onClick={() => handleNavigate('decks')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all group cursor-pointer ${isQuestionsActive
                  ? 'bg-amber-500/10 border-amber-500/30 text-white shadow-sm'
                  : 'bg-slate-850/60 border-slate-800/70 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700/80'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isQuestionsActive
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-300'
                      }`}
                  >
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate flex items-center gap-1.5">
                      <span>C-Spørgsmål</span>
                      {isQuestionsActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">111 flashcards & kategorier</p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${isQuestionsActive
                    ? 'text-amber-400 translate-x-0.5'
                    : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                />
              </button>

              {/* Item 2: Hurtige Noter */}
              <button
                onClick={() => handleNavigate('quick-notes')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all group cursor-pointer ${isNotesActive
                  ? 'bg-amber-500/10 border-amber-500/30 text-white shadow-sm'
                  : 'bg-slate-850/60 border-slate-800/70 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700/80'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isNotesActive
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-300'
                      }`}
                  >
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate flex items-center gap-1.5">
                      <span>Hurtige noter</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1 py-0.2 rounded">
                        Ny
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">Nyttige noter til forskellige emner</p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform flex-shrink-0 ${isNotesActive
                    ? 'text-amber-400 translate-x-0.5'
                    : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                />
              </button>

              {/* Item 3: Eksamenskrav */}
              <button
                onClick={() => handleNavigate('exam-info')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all group cursor-pointer ${isExamActive
                  ? 'bg-amber-500/10 border-amber-500/30 text-white shadow-sm'
                  : 'bg-slate-850/60 border-slate-800/70 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700/80'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isExamActive
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 group-hover:text-amber-300'
                      }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Krav & Pointgivning</div>
                    <p className="text-[11px] text-slate-400 truncate">Regler, censorkrav & point</p>
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
          <div className="bg-slate-850/70 border border-slate-800 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Mestring af pensum
              </span>
              <span className="text-xs font-bold text-amber-400">{avgMastery}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${avgMastery}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400">
              {totalMastered} af {totalQuestions} spørgsmål mestret
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/90 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-amber-500/80" />
            <span>Beredskabsstyrelsen • FUI</span>
          </div>
        </div>
      </aside>
    </>
  )
}
