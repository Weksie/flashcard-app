import React, { useState, useEffect, useMemo } from 'react'
import { useDeck } from '../context/useDeck'
import { AB_QUESTIONS } from '../data/abQuestionsData'
import { ALL_QUESTIONS } from '../data/defaultDecks'
import type { Flashcard } from '../types'
import confetti from 'canvas-confetti'
import {
  calculateCPoints,
  C_EXAM_PASSING_THRESHOLD,
  C_EXAM_MAX_POINTS,
  C_EXAM_QUESTIONS_COUNT,
  evaluatePracticalTask,
  estimateAnswerParts,
} from '../utils/examScoring'
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Award,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  RotateCcw,
  Flame,
  Filter,
  Check,
  GraduationCap,
  Info,
  ArrowRight,
  BadgeAlert,
  User,
  Edit3,
  Scale,
} from 'lucide-react'

type SimulationStep = 'draw' | 'taskA' | 'taskB' | 'taskC' | 'results'
type GoalStatus = 'passed' | 'partial' | 'failed' | 'unanswered'

interface CQuestionState {
  card: Flashcard
  pointsAwarded: number
  isAnswerRevealed: boolean
  userNotes: string
  selectedPartsCorrect?: number
  totalParts?: number
}

export const ExamSimulationView: React.FC = () => {
  const { setScreen, toggleSidebar } = useDeck()

  // Main flow step
  const [step, setStep] = useState<SimulationStep>('draw')

  // Available & excluded question set IDs
  const [excludedQuestionIds, setExcludedQuestionIds] = useState<number[]>([])
  const [showPoolModal, setShowPoolModal] = useState(false)

  // Currently selected A/B Question Set (1-15)
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Task A evaluations: { [goalId]: GoalStatus }
  const [taskAGoals, setTaskAGoals] = useState<Record<string, GoalStatus>>({})
  const [taskAFollowUpAnswered, setTaskAFollowUpAnswered] = useState(false)

  // Task B evaluations: { [goalId]: GoalStatus }
  const [taskBGoals, setTaskBGoals] = useState<Record<string, GoalStatus>>({})
  const [taskBFollowUpAnswered, setTaskBFollowUpAnswered] = useState(false)

  // Task C: 12 randomized questions
  const [cQuestions, setCQuestions] = useState<CQuestionState[]>([])
  const [currentCIndex, setCurrentCIndex] = useState(0)
  const [showExaminerElaboration, setShowExaminerElaboration] = useState(false)
  const [cViewMode, setCViewMode] = useState<'question' | 'comparison'>('question')

  // Active A/B Question
  const activeQuestion = useMemo(() => {
    if (selectedQuestionId === null) return null
    return AB_QUESTIONS.find((q) => q.id === selectedQuestionId) || null
  }, [selectedQuestionId])

  // Available questions pool after exclusions
  const availablePool = useMemo(() => {
    return AB_QUESTIONS.filter((q) => !excludedQuestionIds.includes(q.id))
  }, [excludedQuestionIds])

  // Total Task C score
  const totalCScore = useMemo(() => {
    return cQuestions.reduce((sum, q) => sum + q.pointsAwarded, 0)
  }, [cQuestions])

  const isCPassed = totalCScore >= C_EXAM_PASSING_THRESHOLD

  // Evaluation for Task A & B
  const evalA = useMemo(() => {
    const totalGoals = activeQuestion?.taskA.goals.length || 0
    return evaluatePracticalTask(taskAGoals, totalGoals)
  }, [taskAGoals, activeQuestion])

  const evalB = useMemo(() => {
    const totalGoals = activeQuestion?.taskB.goals.length || 0
    return evaluatePracticalTask(taskBGoals, totalGoals)
  }, [taskBGoals, activeQuestion])

  const isExamPassed = evalA.isPassed && evalB.isPassed && isCPassed

  // Handle Draw random question
  const handleDrawQuestion = () => {
    if (availablePool.length === 0) {
      alert('Der er ingen spørgsmål tilbage i puljen. Tilføj spørgsmål i pulje-styringen.')
      return
    }

    setIsDrawing(true)
    let counter = 0
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availablePool.length)
      setSelectedQuestionId(availablePool[randomIndex].id)
      counter++
      if (counter > 8) {
        clearInterval(interval)
        setIsDrawing(false)
      }
    }, 80)
  }

  // Handle select specific question
  const handleSelectSpecific = (id: number) => {
    setSelectedQuestionId(id)
  }

  // Start the practical examination
  const startExamWithCurrentQuestion = () => {
    if (!selectedQuestionId) return

    // Initialize 12 random C-questions from the 111-question pool
    const shuffledC = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, C_EXAM_QUESTIONS_COUNT)
    const initialC: CQuestionState[] = shuffledC.map((card) => {
      const parts = estimateAnswerParts(card.answer)
      return {
        card,
        pointsAwarded: 0,
        isAnswerRevealed: false,
        userNotes: '',
        totalParts: Math.max(1, parts.length),
      }
    })

    setCQuestions(initialC)
    setCurrentCIndex(0)
    setCViewMode('question')
    setTaskAGoals({})
    setTaskBGoals({})
    setTaskAFollowUpAnswered(false)
    setTaskBFollowUpAnswered(false)
    setStep('taskA')
  }

  // Trigger confetti when passing results
  useEffect(() => {
    if (step === 'results' && isExamPassed) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444'],
      })
    }
  }, [step, isExamPassed])

  // Scoring a C-question with direct points (0-4)
  const handleAwardCPoints = (points: number) => {
    setCQuestions((prev) => {
      const next = [...prev]
      if (next[currentCIndex]) {
        next[currentCIndex] = {
          ...next[currentCIndex],
          pointsAwarded: points,
        }
      }
      return next
    })
  }

  // Scoring a C-question by calculating parts correct out of total parts
  const handleAwardCParts = (correct: number, total: number) => {
    const pts = calculateCPoints(correct, total)
    setCQuestions((prev) => {
      const next = [...prev]
      if (next[currentCIndex]) {
        next[currentCIndex] = {
          ...next[currentCIndex],
          selectedPartsCorrect: correct,
          totalParts: total,
          pointsAwarded: pts,
        }
      }
      return next
    })
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 pt-safe pb-safe max-w-md mx-auto w-full text-slate-100">
      {/* Top Navigation Bar */}
      <header className="pt-2.5 pb-2.5 flex items-center justify-between sticky top-0 bg-[#0b0f19]/90 backdrop-blur-md z-20 -mx-4 px-4 border-b border-slate-800/80 mb-3">
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
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-colors py-1.5 px-2 rounded-xl cursor-pointer min-h-[40px]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Forside</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {step !== 'draw' && (
            <button
              onClick={() => {
                if (window.confirm('Vil du afbryde den igangværende prøve og starte forfra?')) {
                  setStep('draw')
                }
              }}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 hover:text-rose-300 bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer min-h-[36px] active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>Afbryd</span>
            </button>
          )}

          <span className="text-[11px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase font-display tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulation</span>
          </span>
        </div>
      </header>

      {/* Mini Breadcrumb / Stage Tracker */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800/90 rounded-2xl p-2.5 mb-4 text-xs font-display">
        <button
          disabled={step === 'draw'}
          onClick={() => setStep('taskA')}
          className={`flex items-center gap-1 font-bold transition-colors cursor-pointer ${step === 'taskA' ? 'text-amber-400' : evalA.isPassed ? 'text-emerald-400' : 'text-slate-500'
            }`}
        >
          <span>A: Praktisk</span>
          {evalA.isPassed && <Check className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
        <span className="text-slate-600">→</span>
        <button
          disabled={step === 'draw' || !evalA.isPassed}
          onClick={() => setStep('taskB')}
          className={`flex items-center gap-1 font-bold transition-colors cursor-pointer ${step === 'taskB' ? 'text-amber-400' : evalB.isPassed ? 'text-emerald-400' : 'text-slate-500'
            }`}
        >
          <span>B: Opgave B</span>
          {evalB.isPassed && <Check className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
        <span className="text-slate-600">→</span>
        <button
          disabled={step === 'draw' || !evalB.isPassed}
          onClick={() => setStep('taskC')}
          className={`flex items-center gap-1 font-bold transition-colors cursor-pointer ${step === 'taskC' ? 'text-amber-400' : isCPassed ? 'text-emerald-400' : 'text-slate-500'
            }`}
        >
          <span>C: 12 Spørgsmål</span>
          {isCPassed && <Check className="w-3.5 h-3.5 text-emerald-400" />}
        </button>
        <span className="text-slate-600">→</span>
        <span
          className={`font-bold ${step === 'results' ? 'text-amber-400' : 'text-slate-500'
            }`}
        >
          Resultat
        </span>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: DRAW & SETUP */}
      {/* ========================================================================= */}
      {step === 'draw' && (
        <div className="space-y-4 pb-8 animate-fadeIn">
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border border-amber-500/30 p-4 sm:p-5 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/25 border border-amber-500/40 flex items-center justify-center text-amber-300 flex-shrink-0 shadow-inner">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight font-display">
                  Prøvesimulering til FUI
                </h1>
                <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                  Simulation af A-, B- og C-prøven med censorkrav
                </p>
              </div>
            </div>
            <div className="mt-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300 font-display">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Officielle eksamensregler:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Prøven gennemføres i den rækkefølge, du vælger at starte med. For at bestå skal du gennemføre Opgave A og B tilfredsstillende og opnå <strong className="text-amber-300">mindst 29 ud af 48 point på C-spørgsmålene</strong>.
              </p>
              <p className="text-[11px] text-rose-300/90 pt-1 border-t border-slate-800/80 leading-relaxed">
                Dette er en træningssimulator designet til at styrke din paratviden og metodiske fremgangsmåde.
              </p>
            </div>
          </div>

          {/* Action Card: Draw Question */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Shuffle className="w-4 h-4 text-amber-400" />
                  <span>Træk et spørgsmål</span>
                </h2>
                <p className="text-[11px] text-slate-400">
                  {availablePool.length} ud af {AB_QUESTIONS.length} spørgsmål i puljen
                </p>
              </div>

              <button
                onClick={() => setShowPoolModal(true)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                title="Administrer spørgsmålspulje"
              >
                <Filter className="w-3 h-3" />
                <span>Pulje ({excludedQuestionIds.length} fjernet)</span>
              </button>
            </div>

            {/* Big Draw Button */}
            <button
              onClick={handleDrawQuestion}
              disabled={isDrawing}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer active:scale-98 ${isDrawing
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold shadow-amber-500/20'
                }`}
            >
              <Shuffle className={`w-4 h-4 ${isDrawing ? 'animate-spin' : ''}`} />
              <span>{isDrawing ? 'Trækker spørgsmål...' : 'Træk tilfældigt spørgsmål'}</span>
            </button>

            {/* Manual Selector Dropdown */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Eller vælg manuelt:</span>
              <select
                value={selectedQuestionId || ''}
                onChange={(e) => handleSelectSpecific(Number(e.target.value))}
                className="bg-slate-950 border border-slate-750 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-amber-500 focus:outline-none"
              >
                <option value="" disabled>
                  Vælg opgavesæt...
                </option>
                {AB_QUESTIONS.map((q) => (
                  <option key={q.id} value={q.id}>
                    Spørgsmål {q.questionNumber}: {q.title.substring(0, 32)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Drawn Question Card */}
          {activeQuestion && (
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-2xl p-4 shadow-xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                  Trukket Spørgsmål #{activeQuestion.questionNumber}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {activeQuestion.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">
                {activeQuestion.title}
              </h3>

              {/* Examiner's bold reading script */}
              <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-3.5 space-y-2.5">
                <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Eksaminator oplæser (kun skrift med fed):</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-200 pl-2 border-l-2 border-amber-500/50">
                  <p>
                    Opgave A:{' '}
                    <strong className="text-white font-bold tracking-wide">
                      {activeQuestion.taskA.title}
                    </strong>
                  </p>
                  <p>
                    Opgave B:{' '}
                    <strong className="text-white font-bold tracking-wide">
                      {activeQuestion.taskB.title}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Opgave A</div>
                  <div className="font-semibold text-amber-400 text-xs mt-0.5">
                    {activeQuestion.taskA.typeBadge}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {activeQuestion.taskA.goals.length} kompetencemål
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Opgave B</div>
                  <div className="font-semibold text-sky-400 text-xs mt-0.5">
                    {activeQuestion.taskB.typeBadge}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {activeQuestion.taskB.goals.length} kompetencemål
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={startExamWithCurrentQuestion}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>Gå til eksamensbordet & Start Opgave A</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: OPGAVE A (PRAKTISK) */}
      {/* ========================================================================= */}
      {step === 'taskA' && activeQuestion && (
        <div className="space-y-4 pb-8 animate-fadeIn">
          {/* Task Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                Opgave A • Praktisk
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {evalA.passedCount + evalA.partialCount}/{activeQuestion.taskA.goals.length} mål vurderet
              </span>
            </div>

            <h2 className="text-base font-bold text-white tracking-tight">
              {activeQuestion.taskA.title}
            </h2>

            {/* Examiner command */}
            {activeQuestion.taskA.command && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-bold text-amber-300 block mb-0.5">
                  📢 Eksaminator/Holdleder giver befaling:
                </span>
                "{activeQuestion.taskA.command}"
              </div>
            )}
          </div>

          {/* Interactive Goals List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Gennemførsel af kompetencemål
              </h3>
              <span className="text-[11px] text-slate-500">
                Udfør & bedøm undervejs
              </span>
            </div>

            {activeQuestion.taskA.goals.map((goal, idx) => {
              const status = taskAGoals[goal.id] || 'unanswered'
              return (
                <div
                  key={goal.id}
                  className={`bg-slate-900/80 border rounded-2xl p-3.5 transition-all shadow-md ${status === 'passed'
                    ? 'border-emerald-500/50 bg-emerald-950/10'
                    : status === 'partial'
                      ? 'border-amber-500/50 bg-amber-950/10'
                      : status === 'failed'
                        ? 'border-rose-500/50 bg-rose-950/10'
                        : 'border-slate-800'
                    }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300 flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {goal.text}
                      </p>

                      {goal.subItems && goal.subItems.length > 0 && (
                        <ul className="mt-2 space-y-1 text-[11px] text-slate-400 list-disc list-inside bg-slate-950/50 p-2 rounded-lg">
                          {goal.subItems.map((sub, sIdx) => (
                            <li key={sIdx}>{sub}</li>
                          ))}
                        </ul>
                      )}

                      {/* Interactive Evaluation Question for test-taker */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                        <div className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
                          <span className="font-semibold text-slate-300">
                            Hvor godt udførte du dette trin?
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                          <button
                            onClick={() =>
                              setTaskAGoals((prev) => ({ ...prev, [goal.id]: 'passed' }))
                            }
                            className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${status === 'passed'
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm'
                              : 'bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 border-slate-700'
                              }`}
                          >
                            ✓ Fuldstændigt
                          </button>

                          <button
                            onClick={() =>
                              setTaskAGoals((prev) => ({ ...prev, [goal.id]: 'partial' }))
                            }
                            className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${status === 'partial'
                              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm'
                              : 'bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 border-slate-700'
                              }`}
                          >
                            ~ Delvist
                          </button>

                          <button
                            onClick={() =>
                              setTaskAGoals((prev) => ({ ...prev, [goal.id]: 'failed' }))
                            }
                            className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${status === 'failed'
                              ? 'bg-rose-500 text-white border-rose-400 font-bold shadow-sm'
                              : 'bg-slate-800/80 hover:bg-rose-500/20 text-slate-300 border-slate-700'
                              }`}
                          >
                            ✕ Ikke opfyldt
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Examiner Follow-up Questions Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <HelpCircle className="w-4 h-4" />
              <span>Opfølgende spørgsmål fra eksaminator & censor</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Efter gennemførelse af opgave A kan der eventuelt stilles spørgsmål af eksaminator og censor."
            </p>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-2">
              <p className="font-medium text-amber-200">
                💬 Spørgsmål: "Forklar dine sikkerhedsforanstaltninger, valg af værnemidler og hvordan du sikrede ordentlig kommunikation under udførelsen."
              </p>
              <label className="flex items-center gap-2 cursor-pointer pt-1 text-slate-300 text-xs">
                <input
                  type="checkbox"
                  checked={taskAFollowUpAnswered}
                  onChange={(e) => setTaskAFollowUpAnswered(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400"
                />
                <span>Jeg har svaret tilfredsstillende på censors spørgsmål</span>
              </label>
            </div>
          </div>

          {/* Next Button */}
          <div className="pt-2">
            <button
              onClick={() => setStep('taskB')}
              disabled={evalA.passedCount + evalA.partialCount < activeQuestion.taskA.goals.length}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${evalA.passedCount + evalA.partialCount >= activeQuestion.taskA.goals.length
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 active:scale-98'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
                }`}
            >
              <span>Videre til Opgave B</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            {evalA.passedCount + evalA.partialCount < activeQuestion.taskA.goals.length && (
              <p className="text-[11px] text-center text-slate-500 mt-2">
                Bedøm alle kompetencemål for at gå videre.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: OPGAVE B (PRAKTISK ELLER TEORETISK) */}
      {/* ========================================================================= */}
      {step === 'taskB' && activeQuestion && (
        <div className="space-y-4 pb-8 animate-fadeIn">
          {/* Task Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                Opgave B • {activeQuestion.taskB.typeBadge}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {evalB.passedCount + evalB.partialCount}/{activeQuestion.taskB.goals.length} mål vurderet
              </span>
            </div>

            <h2 className="text-base font-bold text-white tracking-tight">
              {activeQuestion.taskB.title}
            </h2>

            {activeQuestion.taskB.command && (
              <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-3 text-xs text-sky-200/90 leading-relaxed">
                <span className="font-bold text-sky-300 block mb-0.5">
                  📢 Opgaveinstruks:
                </span>
                "{activeQuestion.taskB.command}"
              </div>
            )}
          </div>

          {/* Interactive Goals List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Kompetencemål for Opgave B
              </h3>
              <span className="text-[11px] text-slate-500">
                Forklar eller demonstrér
              </span>
            </div>

            {activeQuestion.taskB.goals.map((goal, idx) => {
              const status = taskBGoals[goal.id] || 'unanswered'
              return (
                <div
                  key={goal.id}
                  className={`bg-slate-900/80 border rounded-2xl p-3.5 transition-all shadow-md ${status === 'passed'
                    ? 'border-emerald-500/50 bg-emerald-950/10'
                    : status === 'partial'
                      ? 'border-amber-500/50 bg-amber-950/10'
                      : status === 'failed'
                        ? 'border-rose-500/50 bg-rose-950/10'
                        : 'border-slate-800'
                    }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300 flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {goal.text}
                      </p>

                      {goal.subItems && goal.subItems.length > 0 && (
                        <ul className="mt-2 space-y-1 text-[11px] text-slate-400 list-disc list-inside bg-slate-950/50 p-2 rounded-lg">
                          {goal.subItems.map((sub, sIdx) => (
                            <li key={sIdx}>{sub}</li>
                          ))}
                        </ul>
                      )}

                      {/* Interactive Evaluation */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                        <div className="text-[11px] text-slate-400 mb-1.5 flex items-center justify-between">
                          <span className="font-semibold text-slate-300">
                            Besvarelse / forklaring til censor:
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                          <button
                            onClick={() =>
                              setTaskBGoals((prev) => ({ ...prev, [goal.id]: 'passed' }))
                            }
                            className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${status === 'passed'
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-sm'
                              : 'bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 border-slate-700'
                              }`}
                          >
                            ✓ Fuldstændigt
                          </button>

                          <button
                            onClick={() =>
                              setTaskBGoals((prev) => ({ ...prev, [goal.id]: 'partial' }))
                            }
                            className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${status === 'partial'
                              ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm'
                              : 'bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 border-slate-700'
                              }`}
                          >
                            ~ Delvist
                          </button>

                          <button
                            onClick={() =>
                              setTaskBGoals((prev) => ({ ...prev, [goal.id]: 'failed' }))
                            }
                            className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${status === 'failed'
                              ? 'bg-rose-500 text-white border-rose-400 font-bold shadow-sm'
                              : 'bg-slate-800/80 hover:bg-rose-500/20 text-slate-300 border-slate-700'
                              }`}
                          >
                            ✕ Ikke opfyldt
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Censor Follow-up Note */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2.5">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
              <HelpCircle className="w-4 h-4" />
              <span>Opfølgende spørgsmål til Opgave B</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Efter både opgave A og B kan der eventuelt stilles spørgsmål af eksaminator og censor og derefter fortsættes der med opgave C."
            </p>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-2">
              <p className="font-medium text-sky-200">
                💬 Censor: "Begrund dit valg af slukningsmiddel, sikkerhedsafstand eller fremgangsmåde i henhold til teorien."
              </p>
              <label className="flex items-center gap-2 cursor-pointer pt-1 text-slate-300 text-xs">
                <input
                  type="checkbox"
                  checked={taskBFollowUpAnswered}
                  onChange={(e) => setTaskBFollowUpAnswered(e.target.checked)}
                  className="rounded border-slate-700 text-sky-500 focus:ring-sky-400"
                />
                <span>Jeg har svaret tilfredsstillende på censors uddybende spørgsmål</span>
              </label>
            </div>
          </div>

          {/* Next Button */}
          <div className="pt-2">
            <button
              onClick={() => setStep('taskC')}
              disabled={evalB.passedCount + evalB.partialCount < activeQuestion.taskB.goals.length}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${evalB.passedCount + evalB.partialCount >= activeQuestion.taskB.goals.length
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 active:scale-98'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
                }`}
            >
              <span>Fortsæt til Opgave C (12 C-Spørgsmål)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            {evalB.passedCount + evalB.partialCount < activeQuestion.taskB.goals.length && (
              <p className="text-[11px] text-center text-slate-500 mt-2">
                Bedøm alle kompetencemål for at gå videre til Opgave C.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: OPGAVE C (12 TEORETISKE SPØRGSMÅL FRA CENSOR) */}
      {/* ========================================================================= */}
      {step === 'taskC' && cQuestions.length > 0 && (
        <div className="space-y-4 pb-8 animate-fadeIn">
          {/* Live Score Tracker Banner */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Opgave C Point:</span>
                <span
                  className={`font-black text-sm ${totalCScore >= C_EXAM_PASSING_THRESHOLD
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                    }`}
                >
                  {totalCScore} / {C_EXAM_MAX_POINTS} pt
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-400">
                Krav:{' '}
                <span className="text-emerald-400 font-bold">
                  Mindst {C_EXAM_PASSING_THRESHOLD} point
                </span>
              </div>
            </div>

            {/* Visual Bar with Threshold Marker at 29 / 48 (60.4%) */}
            <div className="relative w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${Math.min(100, (totalCScore / C_EXAM_MAX_POINTS) * 100)}%` }}
              />
              {/* Threshold tick mark at 29/48 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10"
                style={{ left: `${(C_EXAM_PASSING_THRESHOLD / C_EXAM_MAX_POINTS) * 100}%` }}
                title="Krav til bestået (29 point)"
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>0 point</span>
              <span className="text-rose-400 font-bold">▲ 29 pt (Bestået grænse)</span>
              <span>48 point</span>
            </div>
          </div>

          {/* Current C Question Card */}
          {(() => {
            const currentQ = cQuestions[currentCIndex]
            if (!currentQ) return null
            const parts = estimateAnswerParts(currentQ.card.answer)

            return (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    Spørgsmål {currentCIndex + 1} af {C_EXAM_QUESTIONS_COUNT}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {currentQ.card.category || 'Teori'}
                  </span>
                </div>

                {/* Visual Step Indicator for current question: 1. Besvarelse -> 2. Sammenligning & Point */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 border border-slate-800 rounded-xl text-[11px]">
                  <button
                    onClick={() => setCViewMode('question')}
                    className={`flex-1 py-1 px-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${cViewMode === 'question'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-300'
                      }`}
                  >
                    <span>1. Besvar spørgsmål</span>
                    {currentQ.isAnswerRevealed && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>

                  <span className="text-slate-600">→</span>

                  <button
                    onClick={() => {
                      setCQuestions((prev) => {
                        const next = [...prev]
                        if (next[currentCIndex]) {
                          next[currentCIndex].isAnswerRevealed = true
                        }
                        return next
                      })
                      setCViewMode('comparison')
                    }}
                    className={`flex-1 py-1 px-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${cViewMode === 'comparison'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-300'
                      }`}
                  >
                    <span>2. Sammenlign & Point</span>
                    {currentQ.pointsAwarded > 0 && (
                      <span className="text-[10px] px-1 rounded bg-amber-500/20 text-amber-400">
                        {currentQ.pointsAwarded}p
                      </span>
                    )}
                  </button>
                </div>

                {/* ========================================================================= */}
                {/* PHASE 1: QUESTION & CANDIDATE ANSWER */}
                {/* ========================================================================= */}
                {cViewMode === 'question' ? (
                  <div className="space-y-3.5 animate-fadeIn">
                    {/* Question asked by examiner */}
                    <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 space-y-2">
                      <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>Eksaminator stiller spørgsmålet:</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {currentQ.card.question}
                      </h3>
                    </div>

                    {/* Examiner clarification / elaboration toggle */}
                    <div>
                      <button
                        onClick={() => setShowExaminerElaboration((prev) => !prev)}
                        className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>
                          {showExaminerElaboration
                            ? 'Skjul eksaminators uddybning'
                            : 'Eksaminator uddyber (uden at hjælpe)'}
                        </span>
                      </button>

                      {showExaminerElaboration && (
                        <div className="mt-2 p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed animate-fadeIn">
                          <p>
                            💡 <em>"Hvis eksaminanden ikke har forstået spørgsmålet, kan eksaminator uddybe dette uden dog at hjælpe med besvarelsen."</em>
                          </p>
                          <p className="mt-1 text-slate-400 text-[11px]">
                            Fokuser på de væsentlige faglige begreber, definitioner eller rækkefølger.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Candidate scratchpad */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-400 block">
                        Formuler dit svar her (eller forbered hvad du vil sige til eksaminator):
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Indtast stikord eller dit svar..."
                        value={currentQ.userNotes}
                        onChange={(e) => {
                          const val = e.target.value
                          setCQuestions((prev) => {
                            const next = [...prev]
                            if (next[currentCIndex]) {
                              next[currentCIndex].userNotes = val
                            }
                            return next
                          })
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 resize-none shadow-inner"
                      />
                    </div>

                    {/* Submit / Proceed to comparison button */}
                    <button
                      onClick={() => {
                        setCQuestions((prev) => {
                          const next = [...prev]
                          if (next[currentCIndex]) {
                            next[currentCIndex].isAnswerRevealed = true
                          }
                          return next
                        })
                        setCViewMode('comparison')
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-98"
                    >
                      <span>Afgiv svar & se sammenligning med facit</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>

                    {/* Previous navigation if not first */}
                    {currentCIndex > 0 && (
                      <div className="pt-1 flex justify-start">
                        <button
                          onClick={() => {
                            setCurrentCIndex(currentCIndex - 1)
                            setCViewMode('comparison')
                            setShowExaminerElaboration(false)
                          }}
                          className="flex items-center gap-1 text-xs py-1.5 px-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Forrige spørgsmål ({currentCIndex})</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ========================================================================= */
                  /* PHASE 2: COMPARISON & POINT ALLOCATION RIGHT AFTER EACH QUESTION */
                  /* ========================================================================= */
                  <div className="space-y-3.5 animate-fadeIn">
                    {/* Compact Question Recap */}
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Spørgsmål {currentCIndex + 1}
                      </span>
                      <p className="font-semibold text-white leading-relaxed">
                        {currentQ.card.question}
                      </p>
                    </div>

                    {/* Dual Comparison: Test-taker's Answer vs. Examiner's Model Answer */}
                    <div className="space-y-2.5">
                      {/* Candidate's answer */}
                      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-amber-400" />
                            <span>Testtagerens svar:</span>
                          </span>
                          <button
                            onClick={() => setCViewMode('question')}
                            className="text-[10px] text-slate-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                            title="Rediger din besvarelse"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Rediger svar</span>
                          </button>
                        </div>

                        <div className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-900/70 p-2.5 rounded-lg border border-slate-800/80 whitespace-pre-line">
                          {currentQ.userNotes.trim() ? (
                            currentQ.userNotes
                          ) : (
                            <span className="text-slate-500 italic">
                              Mundtligt svar afgivet foran eksaminator.
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Examiner's Model Answer */}
                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3 space-y-1.5 animate-fadeIn">
                        <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Censors officielle svar (Facit):</span>
                        </div>
                        <div className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 whitespace-pre-line">
                          {currentQ.card.answer}
                        </div>
                      </div>
                    </div>

                    {/* Point allocation section */}
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-amber-400" />
                          <span>Censors pointfordeling:</span>
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded border ${currentQ.pointsAwarded === 4
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : currentQ.pointsAwarded >= 2
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                              : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                            }`}
                        >
                          Tildelt: {currentQ.pointsAwarded} / 4 point
                        </span>
                      </div>

                      {/* Direct Point Selectors (0, 1, 2, 3, 4 pt) */}
                      <div className="grid grid-cols-5 gap-1 text-center text-xs">
                        {[0, 1, 2, 3, 4].map((pt) => (
                          <button
                            key={pt}
                            onClick={() => handleAwardCPoints(pt)}
                            className={`py-2 px-1 rounded-lg font-bold border transition-all cursor-pointer ${currentQ.pointsAwarded === pt
                              ? pt === 4
                                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                                : pt >= 2
                                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                                  : 'bg-rose-500 text-white border-rose-400 shadow-sm'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                              }`}
                          >
                            <div>{pt} pt</div>
                            <div className="text-[8px] font-normal opacity-80 mt-0.5">
                              {pt === 4
                                ? 'Fuldt'
                                : pt === 3
                                  ? 'Næsten'
                                  : pt === 2
                                    ? 'Delvist'
                                    : pt === 1
                                      ? 'Svagt'
                                      : '0 pt'}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Sub-parts Official Calculator (e.g. 3 out of 5 parts) */}
                      {parts.length >= 2 && (
                        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2.5 space-y-2 text-[11px]">
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="font-medium">
                              Eller beregn efter del-elementer ({parts.length} punkter):
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {Array.from({ length: parts.length + 1 }, (_, i) => i).map((count) => {
                              const calcPts = calculateCPoints(count, parts.length)
                              return (
                                <button
                                  key={count}
                                  onClick={() => handleAwardCParts(count, parts.length)}
                                  className={`px-2 py-1 rounded border text-[11px] font-medium transition-colors cursor-pointer ${currentQ.selectedPartsCorrect === count
                                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                                    }`}
                                >
                                  {count}/{parts.length} ({calcPts} pt)
                                </button>
                              )
                            })}
                          </div>
                          <p className="text-[10px] text-slate-500 italic">
                            * Vægtes efter officielle regler: kun 4 point ved 100% korrekt. Ulige fordelinger afrundes til fordel for eksaminanden.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Navigation Button to Next Question or Final Results */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      {currentCIndex < C_EXAM_QUESTIONS_COUNT - 1 ? (
                        <button
                          onClick={() => {
                            setCurrentCIndex(currentCIndex + 1)
                            setCViewMode('question')
                            setShowExaminerElaboration(false)
                          }}
                          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
                        >
                          <span>Godkend point & Gå til spørgsmål {currentCIndex + 2}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setStep('results')}
                          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
                        >
                          <span>Godkend point & Afslut prøven (Se resultat)</span>
                          <Award className="w-4 h-4" />
                        </button>
                      )}

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <button
                          onClick={() => setCViewMode('question')}
                          className="py-1 px-2 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Tilbage til spørgsmål</span>
                        </button>

                        {currentCIndex > 0 && (
                          <button
                            onClick={() => {
                              setCurrentCIndex(currentCIndex - 1)
                              setCViewMode('comparison')
                              setShowExaminerElaboration(false)
                            }}
                            className="py-1 px-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <span>Forrige spørgsmål ({currentCIndex})</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: FINAL RESULTS & BEDØMMELSE */}
      {/* ========================================================================= */}
      {step === 'results' && activeQuestion && (
        <div className="space-y-4 pb-8 animate-fadeIn">
          {/* Hero Banner: Passed / Not Passed */}
          <div
            className={`rounded-3xl p-5 text-center border-2 shadow-2xl relative overflow-hidden ${isExamPassed
              ? 'bg-gradient-to-b from-emerald-950/60 via-slate-900 to-slate-950 border-emerald-500/50'
              : 'bg-gradient-to-b from-rose-950/60 via-slate-900 to-slate-950 border-rose-500/50'
              }`}
          >
            <div className="flex justify-center mb-2.5">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${isExamPassed
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
              >
                {isExamPassed ? (
                  <Award className="w-9 h-9" />
                ) : (
                  <BadgeAlert className="w-9 h-9" />
                )}
              </div>
            </div>

            <span
              className={`text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border inline-block mb-1.5 ${isExamPassed
                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/20 border-rose-500/30 text-rose-300'
                }`}
            >
              Endelig Eksamensbedømmelse
            </span>

            <h1 className="text-2xl font-black text-white tracking-tight">
              {isExamPassed ? 'EKSAMEN BESTÅET!' : 'IKKE BESTÅET'}
            </h1>

            <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
              {isExamPassed
                ? 'Tillykke! Du har gennemført Opgave A og B tilfredsstillende og opnået mindst 29 point på C-spørgsmålene.'
                : 'Du har desværre ikke opfyldt samtlige krav for certificering. Gennemgå detaljerne herunder og prøv igen.'}
            </p>
          </div>

          {/* Detailed Score Breakdown Cards */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Resultatoversigt for de 3 opgaver
            </h3>

            {/* Task A Summary */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs ${evalA.isPassed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                >
                  A
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Opgave A (Praktisk)</span>
                    <span className="text-[10px] text-slate-400">
                      ({evalA.passedCount}/{activeQuestion.taskA.goals.length} mål)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    {activeQuestion.taskA.title}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${evalA.isPassed
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                  }`}
              >
                {evalA.isPassed ? 'Bestået' : 'Ikke bestået'}
              </span>
            </div>

            {/* Task B Summary */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs ${evalB.isPassed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                >
                  B
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Opgave B ({activeQuestion.taskB.typeBadge})</span>
                    <span className="text-[10px] text-slate-400">
                      ({evalB.passedCount}/{activeQuestion.taskB.goals.length} mål)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    {activeQuestion.taskB.title}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${evalB.isPassed
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                  }`}
              >
                {evalB.isPassed ? 'Bestået' : 'Ikke bestået'}
              </span>
            </div>

            {/* Task C Summary */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs ${isCPassed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                >
                  C
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Opgave C (Teoretisk)</span>
                    <span
                      className={`text-xs font-bold ${isCPassed ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                    >
                      {totalCScore} / {C_EXAM_MAX_POINTS} pt
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Krav: Mindst 29 point ({isCPassed ? `+${totalCScore - 29} over grænsen` : `${29 - totalCScore} point under`})
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${isCPassed
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                  }`}
              >
                {isCPassed ? 'Bestået' : 'Ikke bestået'}
              </span>
            </div>
          </div>

          {/* Detailed C Questions Review Accordion */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Gennemgang af de 12 C-spørgsmål</span>
              <span className="text-[11px] text-amber-400">{totalCScore} point i alt</span>
            </h3>

            <div className="space-y-2">
              {cQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">
                      Spørgsmål {idx + 1} • {q.card.category || 'Teori'}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.2 rounded border ${q.pointsAwarded === 4
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                        : q.pointsAwarded >= 2
                          ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                          : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                        }`}
                    >
                      {q.pointsAwarded} / 4 pt
                    </span>
                  </div>

                  <p className="font-semibold text-slate-200">{q.card.question}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800/60">
                    <strong className="text-slate-300">Censors facit:</strong> {q.card.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                setStep('draw')
                setSelectedQuestionId(null)
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tag en ny prøve (træk nyt spørgsmål)</span>
            </button>

            <button
              onClick={() => setScreen('decks')}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              Gå tilbage til oversigt
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PULJE-STYRING (FJERN/TILFØJ SPØRGSMÅL FRA PULJEN) */}
      {/* ========================================================================= */}
      {showPoolModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-4 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div>
                <h3 className="text-sm font-bold text-white">Administrer spørgsmålspulje</h3>
                <p className="text-[11px] text-slate-400">
                  Censor kan fjerne spørgsmål hvis de er trukket for tit eller mangler materiel.
                </p>
              </div>
              <button
                onClick={() => setShowPoolModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {AB_QUESTIONS.map((q) => {
                const isExcluded = excludedQuestionIds.includes(q.id)
                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setExcludedQuestionIds((prev) =>
                        isExcluded ? prev.filter((id) => id !== q.id) : [...prev, q.id]
                      )
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${isExcluded
                      ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                      : 'bg-slate-800/50 border-slate-750 text-slate-200 hover:bg-slate-800'
                      }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold truncate">
                        #{q.questionNumber}: {q.title}
                      </div>
                      <div className="text-[10px] text-slate-400">{q.category}</div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border flex-shrink-0 ${isExcluded
                        ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
                        : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                        }`}
                    >
                      {isExcluded ? 'Fjernet' : 'Aktiv'}
                    </span>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => setShowPoolModal(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Færdig
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
