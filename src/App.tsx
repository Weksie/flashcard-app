import { useState } from 'react'
import { DeckProvider } from './context/DeckContext'
import { useDeck } from './context/useDeck'
import { DeckSelector } from './components/DeckSelector'
import { FlashcardView } from './components/FlashcardView'
import { SessionSummary } from './components/SessionSummary'
import { ExamRequirementsView } from './components/ExamRequirementsView'
import { QuickNotesView } from './components/QuickNotesView'
import { AbQuestionsView } from './components/AbQuestionsView'
import { ExamSimulationView } from './components/ExamSimulationView'
import { Sidebar } from './components/Sidebar'
import { Smartphone, Monitor } from 'lucide-react'

const AppContent: React.FC = () => {
  const { screen, sessionId } = useDeck()
  const [forcePhoneFrame, setForcePhoneFrame] = useState(false)

  return (
    <div className="relative min-h-[100dvh] bg-[#070b14] flex flex-col items-center justify-center sm:p-4 selection:bg-amber-500 selection:text-white overflow-hidden">
      {/* Ambient background glow flares on desktop */}
      <div className="hidden sm:block pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-500/15 via-orange-500/5 to-transparent blur-3xl rounded-full opacity-80" />
      <div className="hidden sm:block pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-blue-600/10 via-indigo-500/5 to-transparent blur-3xl rounded-full opacity-70" />

      {/* Desktop Helper Bar (visible on larger screens to toggle simulated phone bezel) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md px-3.5 py-2 mb-2.5 text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg z-10">
        <span className="flex items-center gap-2 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>FUI Brandmand Mobil-app</span>
        </span>
        <button
          onClick={() => setForcePhoneFrame((prev) => !prev)}
          className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300 hover:text-white px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all cursor-pointer active:scale-95"
        >
          <Monitor className="w-3 h-3 text-amber-400" />
          <span>{forcePhoneFrame ? 'Enkel visning' : 'Telefonramme'}</span>
        </button>
      </div>

      {/* Main Mobile Screen Container */}
      <div
        className={`w-full max-w-md h-[100dvh] sm:h-[844px] flex flex-col bg-[#0b0f19] relative overflow-hidden transition-all duration-300 z-10 ${
          forcePhoneFrame
            ? 'sm:rounded-[48px] sm:border-[8px] sm:border-slate-800/90 sm:shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)]'
            : 'sm:rounded-3xl sm:border sm:border-slate-800/80 sm:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)]'
        }`}
      >
        {/* Simulated Phone Speaker / Dynamic Island notch on large screens if framed */}
        {forcePhoneFrame && (
          <div className="hidden sm:flex justify-center pt-2 pb-1 bg-transparent absolute top-0 inset-x-0 z-50 pointer-events-none">
            <div className="w-24 h-4 bg-slate-900 rounded-full border border-slate-750 flex items-center justify-center shadow-inner">
              <div className="w-2 h-2 rounded-full bg-slate-950 mr-2 border border-slate-800" />
              <div className="w-8 h-1 rounded-full bg-slate-800" />
            </div>
          </div>
        )}

        {/* Screen Routing */}
        <main className="flex-1 flex flex-col min-h-0 relative">
          {screen === 'decks' && <DeckSelector />}
          {screen === 'study' && <FlashcardView key={sessionId} />}
          {screen === 'summary' && <SessionSummary />}
          {screen === 'exam-info' && <ExamRequirementsView />}
          {screen === 'quick-notes' && <QuickNotesView />}
          {screen === 'ab-questions' && <AbQuestionsView />}
          {screen === 'exam-simulation' && <ExamSimulationView />}
        </main>

        {/* Global Slide-in Navigation Drawer */}
        <Sidebar />
      </div>
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <DeckProvider>
      <AppContent />
    </DeckProvider>
  )
}

export default App
