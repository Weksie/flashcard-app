import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useDeck } from '../context/useDeck'
import { AB_QUESTIONS, type AbQuestion } from '../data/abQuestionsData'
import confetti from 'canvas-confetti'
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CheckCircle2,
  Circle,
  Radio,
  AlertTriangle,
  Info,
  BookOpen,
  Shuffle,
  Search,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Award,
} from 'lucide-react'

const STORAGE_PROGRESS_KEY = 'fui_ab_questions_progress_v1'

export const AbQuestionsView: React.FC = () => {
  const { setScreen, toggleSidebar } = useDeck()

  // Selected question ID: null means the main overview page
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null)
  // Search and filter for the main page
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('Alle')
  const [showExamRules, setShowExamRules] = useState(false)
  // Sub-tab view on individual question page: 'both' | 'a' | 'b'
  const [taskTab, setTaskTab] = useState<'both' | 'a' | 'b'>('both')

  // Checked goals state: { [goalId]: boolean }
  const [checkedGoals, setCheckedGoals] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROGRESS_KEY)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load checked goals', e)
    }
    return {}
  })

  // Persist checked goals
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(checkedGoals))
    } catch (e) {
      console.error('Failed to save checked goals', e)
    }
  }, [checkedGoals])

  const toggleGoal = (goalId: string) => {
    setCheckedGoals((prev) => {
      const next = { ...prev, [goalId]: !prev[goalId] }
      return next
    })
  }

  // Active question object
  const activeQuestion = useMemo(() => {
    if (selectedQuestionId === null) return null
    return AB_QUESTIONS.find((q) => q.id === selectedQuestionId) || null
  }, [selectedQuestionId])

  // Categories list
  const categories = useMemo(() => {
    const list = Array.from(new Set(AB_QUESTIONS.map((q) => q.category)))
    return ['Alle', ...list]
  }, [])

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return AB_QUESTIONS.filter((q) => {
      const matchesCategory = activeCategory === 'Alle' || q.category === activeCategory
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        q.questionNumber.toString().includes(query) ||
        q.title.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query) ||
        q.taskA.title.toLowerCase().includes(query) ||
        q.taskB.title.toLowerCase().includes(query) ||
        q.tags.some((t) => t.toLowerCase().includes(query)) ||
        (q.taskA.command && q.taskA.command.toLowerCase().includes(query)) ||
        q.taskA.goals.some((g) => g.text.toLowerCase().includes(query)) ||
        q.taskB.goals.some((g) => g.text.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [searchQuery, activeCategory])

  // Count progress for a question
  const getQuestionProgress = useCallback((q: AbQuestion) => {
    const totalGoals = q.taskA.goals.length + q.taskB.goals.length
    const checkedCount =
      q.taskA.goals.filter((g) => checkedGoals[g.id]).length +
      q.taskB.goals.filter((g) => checkedGoals[g.id]).length
    return {
      total: totalGoals,
      checked: checkedCount,
      isCompleted: totalGoals > 0 && checkedCount === totalGoals,
      percent: totalGoals > 0 ? Math.round((checkedCount / totalGoals) * 100) : 0,
    }
  }, [checkedGoals])

  // Overall total goals checked
  const overallProgress = useMemo(() => {
    let total = 0
    let checked = 0
    let completedQuestions = 0

    AB_QUESTIONS.forEach((q) => {
      const qp = getQuestionProgress(q)
      total += qp.total
      checked += qp.checked
      if (qp.isCompleted) completedQuestions++
    })

    return {
      total,
      checked,
      completedQuestions,
      percent: total > 0 ? Math.round((checked / total) * 100) : 0,
    }
  }, [getQuestionProgress])

  // Trigger random draw
  const handleDrawRandomQuestion = () => {
    const randomIdx = Math.floor(Math.random() * AB_QUESTIONS.length)
    const drawn = AB_QUESTIONS[randomIdx]
    setSelectedQuestionId(drawn.id)
    setTaskTab('both')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#3b82f6', '#10b981'],
    })
  }

  // Mark all goals of current question as complete or clear
  const handleToggleAllForCurrent = () => {
    if (!activeQuestion) return
    const qp = getQuestionProgress(activeQuestion)
    const shouldCheckAll = !qp.isCompleted

    setCheckedGoals((prev) => {
      const updated = { ...prev }
      activeQuestion.taskA.goals.forEach((g) => {
        updated[g.id] = shouldCheckAll
      })
      activeQuestion.taskB.goals.forEach((g) => {
        updated[g.id] = shouldCheckAll
      })
      return updated
    })

    if (shouldCheckAll) {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.7 },
      })
    }
  }

  // Prev / Next question navigation
  const handlePrevQuestion = () => {
    if (selectedQuestionId === null) return
    const prevId = selectedQuestionId > 1 ? selectedQuestionId - 1 : AB_QUESTIONS.length
    setSelectedQuestionId(prevId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNextQuestion = () => {
    if (selectedQuestionId === null) return
    const nextId = selectedQuestionId < AB_QUESTIONS.length ? selectedQuestionId + 1 : 1
    setSelectedQuestionId(nextId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 pt-safe pb-safe max-w-md mx-auto w-full text-slate-100">
      {/* Top Header */}
      <header className="pt-2.5 pb-2.5 flex items-center justify-between sticky top-0 bg-[#0b0f19]/90 backdrop-blur-md z-20 -mx-4 px-4 border-b border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-300 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-amber-500/40 hover:border-amber-400 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex-shrink-0 min-h-[40px]"
            title="Åbn emne-menu"
            aria-label="Åbn emne-menu"
          >
            <Menu className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Menu</span>
          </button>

          {selectedQuestionId !== null ? (
            <button
              onClick={() => setSelectedQuestionId(null)}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white transition-all py-1.5 px-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 cursor-pointer min-h-[40px] active:scale-95"
              title="Tilbage til oversigten"
            >
              <ChevronLeft className="w-4 h-4 text-amber-400" />
              <span>Oversigt</span>
            </button>
          ) : (
            <button
              onClick={() => setScreen('decks')}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-colors py-1.5 px-2 rounded-xl cursor-pointer min-h-[40px]"
              title="Tilbage til spørgsmål"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden xs:inline">C-Spørgsmål</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <div className="text-right">
            <div className="text-xs font-bold text-white flex items-center gap-1 justify-end font-display">
              <ClipboardList className="w-3.5 h-3.5 text-amber-400" />
              <span>A- & B-Spørgsmål</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              {activeQuestion ? `Spørgsmål ${activeQuestion.questionNumber} af 15` : 'Praktik & Teori'}
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* VIEW 1: MAIN OVERVIEW PAGE (When no question is selected)  */}
      {/* ========================================================= */}
      {selectedQuestionId === null ? (
        <div className="space-y-4 pb-8">
          {/* Main Hero Card */}
          <div className="bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-display">
                  Certificeringsprøve
                </span>
                <span className="text-[10px] text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-full font-semibold">
                  Juni 2026
                </span>
              </div>
              <button
                onClick={() => setShowExamRules((prev) => !prev)}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-amber-500/25 hover:border-amber-500/40 transition-colors cursor-pointer min-h-[34px] font-medium"
              >
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>{showExamRules ? 'Skjul regler' : 'Prøvevejledning'}</span>
              </button>
            </div>

            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight font-display">
              A- og B-Eksamensspørgsmål
            </h1>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed font-medium">
              Prøve til certificering i Indsatsuddannelsen. Gennemgå de 15 officielle spørgsmålssæt med specifikke opgaver og kompetencemål for opgave A og B.
            </p>
            <p className="text-[11px] text-rose-300/90 mt-2 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl leading-relaxed">
              Vær opmærksom på at dette er et supplerende hjælpemiddel. Følg altid instruktørens og censors anvisninger under certificeringen.
            </p>

            {/* Overall progress indicator */}
            <div className="mt-3.5 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-[11px] text-slate-300 font-semibold flex items-center gap-1.5 font-display">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Mestring af mål ({overallProgress.checked} / {overallProgress.total})
                </span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {overallProgress.percent}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 ring-1 ring-white/5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(overallProgress.percent, 2)}%` }}
                />
              </div>
            </div>

            {/* Quick Action: Start Full Exam Test & Draw Random Question */}
            <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => setScreen('exam-simulation')}
                className="w-full min-h-[46px] py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] cursor-pointer font-display"
              >
                <Award className="w-4 h-4" />
                <span>Start Eksamenstræning med A, B og C (Simulator)</span>
              </button>
              <button
                onClick={handleDrawRandomQuestion}
                className="w-full min-h-[42px] py-2 px-3 rounded-2xl bg-slate-850 hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700/80 transition-all active:scale-[0.98] cursor-pointer shadow-sm"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                <span>Træk et tilfældigt A/B-spørgsmål her</span>
              </button>
            </div>
          </div>

          {/* Collapsible Official Exam Rules Box */}
          {showExamRules && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs shadow-lg animate-fadeIn">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <GraduationCap className="w-4 h-4" />
                <h2>Officiel Prøvevejledning (Beredskabsstyrelsen)</h2>
              </div>
              <div className="space-y-2 text-slate-300 leading-relaxed text-[11px]">
                <p>
                  • <strong>Rækkefølge:</strong> Prøven gennemføres i rækkefølgen <strong>A, B og C</strong>. Opgave A er praktisk, opgave B er praktisk eller teoretisk, og opgave C er teoretisk.
                </p>
                <p>
                  • <strong>Spørgsmålstrækning:</strong> Når eksaminanden har trukket et spørgsmål, læser eksaminator emnet for opgave A og B (kun teksten med fed).
                </p>
                <p>
                  • <strong>Opgave A:</strong> Gennemføres under ledelse af eksaminator. Kompetencemålene skal udføres og vises på tilfredsstillende vis.
                </p>
                <p>
                  • <strong>Opgave C:</strong> Består af 12 teoretiske paratviden-spørgsmål udarbejdet af Beredskabsstyrelsen (kræver min. 29 ud af 48 point for at bestå).
                </p>
                <p>
                  • <strong>Bedømmelse:</strong> Alle 3 dele vægtes lige og skal bestås for at opnå samlet bestået. Alle 3 dele gennemføres også selvom A eller B ikke var tilfredsstillende.
                </p>
                <p className="text-amber-300/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  ⚠️ <strong>Sikkerhed & SINE:</strong> Alle opgaver skal udføres efter gældende sikkerheds- og arbejdsmiljøregler, og der forventes korrekt SINE radiokommunikation efter Center for Beredskabskommunikations retningslinjer.
                </p>
              </div>
            </div>
          )}

          {/* Search & Filter Controls */}
          <div className="space-y-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Søg i A- og B-spørgsmål (f.eks. kædesav, CAFS, 1'er)..."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer"
                >
                  Ryd
                </button>
              )}
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors cursor-pointer border ${activeCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of 15 Question Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Spørgsmål ({filteredQuestions.length} af 15)
              </span>
              <span className="text-[10px] text-slate-500">
                Tryk for at åbne eget spørgsmål
              </span>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-slate-900/60 rounded-2xl border border-slate-800">
                <Search className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-slate-300">Ingen spørgsmål fundet</p>
                <p className="text-xs text-slate-500 mt-1">Prøv et andet søgeord eller filter</p>
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const prog = getQuestionProgress(q)
                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestionId(q.id)
                      setTaskTab('both')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="bg-slate-900/90 hover:bg-slate-850/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-3.5 transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.01] cursor-pointer group relative overflow-hidden"
                  >
                    {/* Top Row: Spørgsmål #, Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {q.questionNumber}
                        </span>
                        <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          Spørgsmål {q.questionNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {prog.isCompleted ? (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            Gennemgået
                          </span>
                        ) : prog.checked > 0 ? (
                          <span className="text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                            {prog.checked}/{prog.total} mål
                          </span>
                        ) : null}
                        <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-750">
                          {q.category}
                        </span>
                      </div>
                    </div>

                    {/* Task A Preview */}
                    <div className="mb-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.2 rounded">
                          Opgave A (Praktisk)
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                        {q.taskA.title}
                      </p>
                      {q.taskA.command && (
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 italic">
                          "{q.taskA.command}"
                        </p>
                      )}
                    </div>

                    {/* Task B Preview */}
                    <div className="mb-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/15 border border-sky-500/30 px-1.5 py-0.2 rounded">
                          Opgave B ({q.taskB.typeBadge})
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200 line-clamp-1">
                        {q.taskB.title}
                      </p>
                    </div>

                    {/* Tags & Action Link */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/70 text-[10px]">
                      <div className="flex flex-wrap gap-1">
                        {q.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform ml-2">
                        <span>Åbn</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* VIEW 2: INDIVIDUAL QUESTION PAGE                          */
        /* Each question with one A and one B question on its own    */
        /* page under the main page!                                 */
        /* ========================================================= */
        activeQuestion && (
          <div className="space-y-4 pb-10">
            {/* Quick Question Selector Pills (1..15) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin -mx-1 px-1">
              <button
                onClick={() => setSelectedQuestionId(null)}
                className="px-2.5 py-1 rounded-xl border border-slate-800 bg-slate-900/90 text-slate-400 hover:text-white flex items-center gap-1 text-xs flex-shrink-0 transition-colors cursor-pointer"
                title="Tilbage til alle spørgsmål"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Oversigt</span>
              </button>

              {AB_QUESTIONS.map((q) => {
                const isSelected = q.id === selectedQuestionId
                const qp = getQuestionProgress(q)
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedQuestionId(q.id)
                      setTaskTab('both')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 transition-all cursor-pointer relative ${isSelected
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md ring-2 ring-amber-400/50'
                      : qp.isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    title={`Spørgsmål ${q.questionNumber}: ${q.title}`}
                  >
                    {q.questionNumber}
                    {qp.isCompleted && !isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-0.5 right-0.5" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Question Header Card */}
            <div className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900/95 border border-amber-500/30 rounded-2xl p-4 shadow-xl">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-amber-500/25 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xs font-extrabold shadow-inner">
                    {activeQuestion.questionNumber}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                      Spørgsmål {activeQuestion.questionNumber} af 15
                    </span>
                    <h1 className="text-base font-bold text-white tracking-tight">
                      {activeQuestion.title}
                    </h1>
                  </div>
                </div>

                {/* Mark all as checked button */}
                <button
                  onClick={handleToggleAllForCurrent}
                  className="flex items-center gap-1 text-[11px] font-medium bg-slate-900/90 hover:bg-slate-850 px-2.5 py-1.5 rounded-xl border border-slate-750 hover:border-amber-500/40 transition-colors cursor-pointer text-slate-300 hover:text-white"
                  title="Marker alle mål i dette spørgsmål som gennemgået"
                >
                  {getQuestionProgress(activeQuestion).isCompleted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Gennemført!</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Marker alle</span>
                    </>
                  )}
                </button>
              </div>

              {/* Progress for this question */}
              <div className="mt-2.5 pt-2.5 border-t border-slate-800/80">
                {(() => {
                  const qp = getQuestionProgress(activeQuestion)
                  return (
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-slate-400">
                          Kompetencemål opnået: {qp.checked} af {qp.total}
                        </span>
                        <span className="font-bold text-amber-400">{qp.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
                          style={{ width: `${qp.percent}%` }}
                        />
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* View Tab Buttons (Both, Task A, Task B) */}
              <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setTaskTab('both')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${taskTab === 'both'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750'
                    }`}
                >
                  Begge opgaver
                </button>
                <button
                  onClick={() => setTaskTab('a')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${taskTab === 'a'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750'
                    }`}
                >
                  Opgave A (Praktisk)
                </button>
                <button
                  onClick={() => setTaskTab('b')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${taskTab === 'b'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750'
                    }`}
                >
                  Opgave B ({activeQuestion.taskB.typeBadge})
                </button>
              </div>
            </div>

            {/* ======================================================= */}
            {/* OPGAVE A: PRAKTISK OPGAVE                                */}
            {/* ======================================================= */}
            {(taskTab === 'both' || taskTab === 'a') && (
              <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3.5">
                {/* Header of Task A */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                        Opgave A • Praktisk opgave
                      </span>
                    </div>
                    <h2 className="text-sm font-bold text-white">
                      {activeQuestion.taskA.title}
                    </h2>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-850 px-2 py-0.5 rounded-full border border-slate-800">
                    {activeQuestion.taskA.goals.length} mål
                  </span>
                </div>

                {/* Befaling Box (Eksaminator / Holdleder) */}
                {activeQuestion.taskA.command && (
                  <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 relative overflow-hidden">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      <span>Befaling fra Eksaminator / Holdleder:</span>
                    </div>
                    <p className="text-xs text-amber-100 font-medium italic leading-relaxed pl-1">
                      "{activeQuestion.taskA.command}"
                    </p>
                  </div>
                )}

                {/* Special Note (NB) if any */}
                {activeQuestion.taskA.note && (
                  <div className="bg-rose-500/10 border border-rose-500/25 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Særlig instruks:</span>
                    </div>
                    <p className="text-xs text-rose-200 leading-relaxed">
                      {activeQuestion.taskA.note}
                    </p>
                  </div>
                )}

                {/* Specifikke opgaver og kompetencemål */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Specifikke opgaver og kompetencemål:
                    </h3>
                    <span className="text-[10px] text-slate-500">
                      Tryk for at afkrydse
                    </span>
                  </div>

                  <div className="space-y-2">
                    {activeQuestion.taskA.goals.map((goal, index) => {
                      const isChecked = !!checkedGoals[goal.id]
                      return (
                        <div
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${isChecked
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
                            : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-850 text-slate-300'
                            }`}
                        >
                          <div className="pt-0.5 flex-shrink-0">
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500" />
                            )}
                          </div>
                          <div className="text-xs leading-relaxed flex-1">
                            <span className="font-semibold text-slate-400 mr-1.5">
                              {index + 1}.
                            </span>
                            <span className={isChecked ? 'line-through opacity-80' : ''}>
                              {goal.text}
                            </span>

                            {goal.subItems && (
                              <ul className="mt-1.5 space-y-1 pl-4 border-l border-slate-750 text-[11px] text-slate-400">
                                {goal.subItems.map((sub, sIdx) => (
                                  <li key={sIdx} className="list-disc">
                                    {sub}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Link to related Quick Note if applicable */}
                {activeQuestion.taskA.relatedNoteId && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => setScreen('quick-notes')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-xs text-amber-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span>Se taktisk skitse & bemanding i Hurtige Noter</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* ======================================================= */}
            {/* OPGAVE B: TEORETISK ELLER PRAKTISK OPGAVE                */}
            {/* ======================================================= */}
            {(taskTab === 'both' || taskTab === 'b') && (
              <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3.5">
                {/* Header of Task B */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/15 border border-sky-500/30 px-2 py-0.5 rounded-md">
                        Opgave B • {activeQuestion.taskB.typeBadge}
                      </span>
                    </div>
                    <h2 className="text-sm font-bold text-white">
                      {activeQuestion.taskB.title}
                    </h2>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-850 px-2 py-0.5 rounded-full border border-slate-800">
                    {activeQuestion.taskB.goals.length} mål
                  </span>
                </div>

                {/* Special Note (NB) if any */}
                {activeQuestion.taskB.note && (
                  <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Instruks til prøven:</span>
                    </div>
                    <p className="text-xs text-amber-200 leading-relaxed">
                      {activeQuestion.taskB.note}
                    </p>
                  </div>
                )}

                {/* Specifikke opgaver og kompetencemål */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Specifikke opgaver og kompetencemål:
                    </h3>
                    <span className="text-[10px] text-slate-500">
                      Tryk for at afkrydse
                    </span>
                  </div>

                  <div className="space-y-2">
                    {activeQuestion.taskB.goals.map((goal, index) => {
                      const isChecked = !!checkedGoals[goal.id]
                      return (
                        <div
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${isChecked
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
                            : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-850 text-slate-300'
                            }`}
                        >
                          <div className="pt-0.5 flex-shrink-0">
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500" />
                            )}
                          </div>
                          <div className="text-xs leading-relaxed flex-1">
                            <span className="font-semibold text-slate-400 mr-1.5">
                              {index + 1}.
                            </span>
                            <span className={isChecked ? 'line-through opacity-80' : ''}>
                              {goal.text}
                            </span>

                            {goal.subItems && (
                              <ul className="mt-1.5 space-y-1 pl-4 border-l border-slate-750 text-[11px] text-slate-400">
                                {goal.subItems.map((sub, sIdx) => (
                                  <li key={sIdx} className="list-disc">
                                    {sub}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Link to related Quick Note if applicable */}
                {activeQuestion.taskB.relatedNoteId && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => setScreen('quick-notes')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-xs text-sky-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-sky-400" />
                        <span>Læs uddybende teori i Hurtige Noter</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* ======================================================= */}
            {/* OPGAVE C: INFO & JUMP TO C-SPØRGSMÅL                      */}
            {/* ======================================================= */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>Opgave C (Teoretisk eksamination)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  12 mundtlige spørgsmål stillet af eksaminator. Paratviden.
                </p>
              </div>
              <button
                onClick={() => setScreen('decks')}
                className="py-1.5 px-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-semibold flex items-center gap-1 flex-shrink-0 transition-colors cursor-pointer"
              >
                <span>Flashcards</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Navigation Buttons: Prev / Next Question */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrevQuestion}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Forrige spørgsmål</span>
              </button>
              <button
                onClick={handleNextQuestion}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>Næste spørgsmål</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  )
}
