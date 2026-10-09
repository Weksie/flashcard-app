import React from 'react'
import { useDeck } from '../context/useDeck'
import {
  Menu,
  ChevronLeft,
  GraduationCap,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

export const ExamRequirementsView: React.FC = () => {
  const { setScreen, toggleSidebar } = useDeck()

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 pt-safe pb-safe max-w-md mx-auto w-full text-slate-100">
      {/* Top Navigation Bar */}
      <header className="pt-2 pb-3 flex items-center justify-between sticky top-0 bg-slate-950/90 backdrop-blur-md z-10 -mx-4 px-4 border-b border-slate-900/60 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
            title="Åbn emne-menu"
            aria-label="Åbn emne-menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            onClick={() => setScreen('decks')}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition-colors py-1.5 pr-2 rounded-lg cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>C-Spørgsmål</span>
          </button>
        </div>

        <span className="text-[11px] font-semibold text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
          C-Spørgsmål
        </span>
      </header>

      {/* Hero Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Krav til C-Spørgsmål</h1>
            <p className="text-xs text-slate-400">Funktionsuddannelse Indsats</p>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          Prøve til certificering i Funktionsuddannelse Indsats, C-Spørgsmål
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 text-center">
          <div className="text-lg font-bold text-amber-400">12</div>
          <div className="text-[10px] text-slate-400 font-medium">Spørgsmål</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 text-center">
          <div className="text-lg font-bold text-orange-400">4 pt</div>
          <div className="text-[10px] text-slate-400 font-medium">Maks pr. svar</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 text-center">
          <div className="text-lg font-bold text-emerald-400">29 / 48</div>
          <div className="text-[10px] text-slate-400 font-medium">For at bestå</div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-4 mb-6">
        {/* Section 1: Gennemførelse */}
        <section className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2 text-amber-400 text-sm font-semibold">
            <BookOpen className="w-4 h-4" />
            <h2>Gennemførelse af C-Spørgsmål</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Eksaminator gennemfører C-Spørgsmål ved at stille <strong>12 spørgsmål</strong> til eksaminanden. Efter hvert spørgsmål svarer eksaminanden, hvorefter eksaminator og censor på medbragte skemaer noterer antal point for svaret. Eksaminandens besvarelse bedømmes på om han har vist forståelse for det adspurgte.
          </p>
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-400 leading-relaxed">
            <p className="mb-2">
              Hvis eksaminanden ikke har forstået spørgsmålet, kan eksaminator uddybe dette uden dog at hjælpe med besvarelsen.
            </p>
            <p className="mb-2">
              Eksaminandens svar skal som udgangspunkt ikke kommenteres. Hvis besvarelsen ikke forstås af eksaminator eller censor kan der eventuelt kort stilles opklarende spørgsmål.
            </p>
            <p className="text-amber-300/90 font-medium">
              💡 C-spørgsmålene afprøver eksaminandens paratviden.
            </p>
          </div>
        </section>

        {/* Section 2: Pointgivning */}
        <section className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2 text-orange-400 text-sm font-semibold">
            <Award className="w-4 h-4" />
            <h2>Pointgivning for C-Spørgsmål</h2>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Vedrørende pointgivningen i besvarelsen af C-spørgsmålene overholdes følgende:
          </p>
          <ul className="space-y-2 text-xs text-slate-300 mb-4">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <span>Der tildeles <strong>kun 4 point</strong> hvis svaret er fuldstændig korrekt.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <span>De 4 mulige point pr. svar fordeles ligeligt ud over eksaminandens besvarelse.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <span>Eventuelle ulige fordelinger i de enkelte spørgsmål vægtes til <strong>eksaminandens fordel</strong>.</span>
            </li>
          </ul>

          {/* Vægtnings-eksempler boks */}
          <div className="bg-amber-950/20 border border-amber-500/25 rounded-xl p-3.5 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Eksempler på point-fordeling:</span>
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>3 korrekte svar ud af 5 mulige:</strong> udløser <strong>3 point</strong> <span className="text-slate-400 text-[11px]">(men 4 korrekte svar ud af 5 mulige udløser stadigvæk kun 3 point)</span>.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>1 korrekt svar ud af 3 mulige:</strong> udløser <strong>2 point</strong>.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Beståelseskrav & Regler */}
        <section className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2 text-emerald-400 text-sm font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <h2>Beståelseskrav & Regler</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2 bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-white">Mindst 29 point:</strong>
                <p className="text-slate-300 mt-0.5">
                  Eksaminanden skal opnå mindst <strong>29 point</strong> ud af de 48 mulige point for at bestå C-del af denne prøve (ca. 60,4%).
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <p>
                Ved eventuel uenighed om pointgivningen er <strong>censors pointgivning</strong> den gældende.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <p>
                Eksaminanden skal have mulighed for at besvare <strong>alle spørgsmålene</strong>.
              </p>
            </li>
          </ul>

          <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 italic">
            På baggrund af tildelte point for de enkelte spørgsmål gives en endelig bedømmelse.
          </div>
        </section>
      </div>

      {/* Start Quiz Action Button */}
      <div className="mt-auto pt-2 pb-6">
        <button
          onClick={() => setScreen('decks')}
          className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
        >
          <span>Gå til C-spørgsmålene</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ExamRequirementsView
