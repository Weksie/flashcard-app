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
      <header className="pt-2.5 pb-2.5 flex items-center justify-between sticky top-0 bg-[#0b0f19]/90 backdrop-blur-md z-10 -mx-4 px-4 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 hover:border-amber-400 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex-shrink-0 min-h-[40px]"
            title="Åbn emne-menu"
            aria-label="Åbn emne-menu"
          >
            <Menu className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Menu</span>
          </button>
          <button
            onClick={() => setScreen('decks')}
            className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-colors py-1.5 pr-2 rounded-xl cursor-pointer min-h-[40px]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>C-Spørgsmål</span>
          </button>
        </div>

        <span className="text-[11px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider font-display">
          Censorkrav
        </span>
      </header>

      {/* Hero Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/25 to-orange-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-inner flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white font-display">Krav til C-Spørgsmål</h1>
            <p className="text-xs text-slate-400 font-medium">Funktionsuddannelse Indsats</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          Officielle bedømmelsesregler, pointfordeling og censorkrav til den teoretiske C-prøve.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-5">
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-2.5 sm:p-3 text-center shadow-md min-w-0">
          <div className="text-lg sm:text-xl font-extrabold text-amber-400 font-display">12</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight sm:tracking-wider mt-0.5 font-display truncate">Spørgsmål</div>
        </div>
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-2.5 sm:p-3 text-center shadow-md min-w-0">
          <div className="text-lg sm:text-xl font-extrabold text-orange-400 font-display">4 pt</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight sm:tracking-wider mt-0.5 font-display truncate" title="Maksimum point pr. svar">Maks / svar</div>
        </div>
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-2.5 sm:p-3 text-center shadow-md min-w-0">
          <div className="text-lg sm:text-xl font-extrabold text-emerald-400 font-display">29 / 48</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight sm:tracking-wider mt-0.5 font-display truncate" title="Point krævet for at bestå">For at bestå</div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-4 mb-6">
        {/* Section 1: Gennemførelse */}
        <section className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800/90 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2.5 text-amber-300 text-sm font-bold font-display">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h2>Gennemførelse af C-Spørgsmål</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Eksaminator gennemfører C-Spørgsmål ved at stille <strong className="text-white">12 spørgsmål</strong> til eksaminanden. Efter hvert spørgsmål svarer eksaminanden, hvorefter eksaminator og censor på medbragte skemaer noterer antal point for svaret. Eksaminandens besvarelse bedømmes på om han har vist forståelse for det adspurgte.
          </p>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              Hvis eksaminanden ikke har forstået spørgsmålet, kan eksaminator uddybe dette uden dog at hjælpe med besvarelsen.
            </p>
            <p>
              Eksaminandens svar skal som udgangspunkt ikke kommenteres. Hvis besvarelsen ikke forstås af eksaminator eller censor kan der eventuelt kort stilles opklarende spørgsmål.
            </p>
            <p className="text-amber-300 font-semibold pt-1 border-t border-slate-800/60">
              💡 C-spørgsmålene afprøver eksaminandens paratviden.
            </p>
          </div>
        </section>

        {/* Section 2: Pointgivning */}
        <section className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800/90 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2.5 text-orange-300 text-sm font-bold font-display">
            <Award className="w-4 h-4 text-orange-400" />
            <h2>Pointgivning for C-Spørgsmål</h2>
          </div>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Vedrørende pointgivningen i besvarelsen af C-spørgsmålene overholdes følgende regler:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-300 mb-4">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <span>Der tildeles <strong className="text-white">kun 4 point</strong> hvis svaret er fuldstændig korrekt.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <span>De 4 mulige point pr. svar fordeles ligeligt ud over eksaminandens besvarelse.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <span>Eventuelle ulige fordelinger i de enkelte spørgsmål vægtes til <strong className="text-amber-300">eksaminandens fordel</strong>.</span>
            </li>
          </ul>

          {/* Vægtnings-eksempler boks */}
          <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-2 font-display">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Eksempler på point-fordeling:</span>
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong className="text-white">3 korrekte svar ud af 5 mulige:</strong> udløser <strong className="text-amber-300">3 point</strong> <span className="text-slate-400 text-[11px]">(men 4 korrekte ud af 5 mulige udløser stadigvæk 3 point)</span>.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong className="text-white">1 korrekt svar ud af 3 mulige:</strong> udløser <strong className="text-amber-300">2 point</strong>.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Beståelseskrav & Regler */}
        <section className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800/90 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2.5 text-emerald-300 text-sm font-bold font-display">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h2>Beståelseskrav & Regler</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2.5 bg-emerald-500/15 border border-emerald-500/25 rounded-2xl p-3 shadow-inner">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-white text-sm font-display">Mindst 29 point for at bestå:</strong>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Eksaminanden skal opnå mindst <strong className="text-emerald-300">29 point</strong> ud af de 48 mulige point for at bestå C-delen af prøven (ca. 60,4%).
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed">
                Ved eventuel uenighed om pointgivningen er <strong className="text-white">censors pointgivning</strong> altid den gældende.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed">
                Eksaminanden skal have reel mulighed for at besvare <strong className="text-white">alle 12 spørgsmål</strong>.
              </p>
            </li>
          </ul>

          <div className="mt-3.5 pt-3 border-t border-slate-800 text-xs text-slate-400 italic">
            På baggrund af de tildelte point for de enkelte spørgsmål gives den samlede bedømmelse Bestået / Ikke bestået.
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto pt-2 pb-6 space-y-2.5">
        <button
          onClick={() => setScreen('exam-simulation')}
          className="w-full min-h-[48px] py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-[0.98] text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer font-display"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>Start Komplet Eksamenstræning (A, B & C)</span>
        </button>
        <button
          onClick={() => setScreen('decks')}
          className="w-full min-h-[44px] py-2.5 px-4 bg-slate-900/90 hover:bg-slate-850 active:scale-[0.98] text-slate-300 hover:text-white font-semibold rounded-2xl flex items-center justify-center gap-2 border border-slate-800 transition-all cursor-pointer text-xs"
        >
          <span>Gå til C-spørgsmålene</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </div>
  )
}

export default ExamRequirementsView
