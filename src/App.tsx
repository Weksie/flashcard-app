import { useState } from 'react'
import { DeckProvider } from './context/DeckContext'
import { useDeck } from './context/useDeck'
import { DeckSelector } from './components/DeckSelector'
import { FlashcardView } from './components/FlashcardView'
import { SessionSummary } from './components/SessionSummary'
import { Smartphone, Monitor } from 'lucide-react'

const AppContent: React.FC = () => {
  const { screen, sessionId } = useDeck()
  const [forcePhoneFrame, setForcePhoneFrame] = useState(false)

  return (
    <div className="min-h-[100dvh] bg-slate-950 flex flex-col items-center justify-center sm:p-4 selection:bg-orange-500 selection:text-white">
      {/* Desktop Helper Bar (visible on larger screens to toggle simulated phone bezel) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md px-3 py-1.5 mb-2 text-xs text-slate-400 bg-slate-900/60 rounded-xl border border-slate-800">
        <span className="flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-orange-400" />
          Mobil Visning
        </span>
        <button
          onClick={() => setForcePhoneFrame((prev) => !prev)}
          className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white cursor-pointer"
        >
          <Monitor className="w-3 h-3" />
          <span>{forcePhoneFrame ? 'Uden ramme' : 'Med telefonramme'}</span>
        </button>
      </div>

      {/* Main Mobile Screen Container */}
      <div
        className={`w-full max-w-md h-[100dvh] sm:h-[844px] flex flex-col bg-slate-950 relative overflow-hidden transition-all duration-300 ${
          forcePhoneFrame
            ? 'sm:rounded-[48px] sm:border-[8px] sm:border-slate-800 sm:shadow-[0_0_50px_rgba(0,0,0,0.8)]'
            : 'sm:rounded-3xl sm:border sm:border-slate-800 sm:shadow-2xl'
        }`}
      >
        {/* Simulated Phone Speaker / Dynamic Island notch on large screens if framed */}
        {forcePhoneFrame && (
          <div className="hidden sm:flex justify-center pt-2 pb-1 bg-transparent absolute top-0 inset-x-0 z-50 pointer-events-none">
            <div className="w-24 h-4 bg-slate-850 rounded-full border border-slate-800 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-2" />
              <div className="w-8 h-1 rounded-full bg-slate-800" />
            </div>
          </div>
        )}

        {/* Screen Routing */}
        <main className="flex-1 flex flex-col min-h-0 relative">
          {screen === 'decks' && <DeckSelector />}
          {screen === 'study' && <FlashcardView key={sessionId} />}
          {screen === 'summary' && <SessionSummary />}
        </main>
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
