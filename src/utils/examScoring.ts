import type { Flashcard } from '../types'

export const C_EXAM_PASSING_THRESHOLD = 29
export const C_EXAM_MAX_POINTS = 48
export const C_EXAM_QUESTIONS_COUNT = 12
export const C_QUESTION_MAX_POINTS = 4

/**
 * Calculates official points (0 to 4) for a C-question based on Beredskabsstyrelsen rules:
 * - Maximum 4 points per question.
 * - Only 4 points if the answer is completely correct (100%).
 * - The 4 possible points are distributed equally across parts.
 * - Any uneven distributions are rounded up in the examinee's favor.
 * - However, if not completely correct, maximum is 3 points.
 *
 * Official Examples from Beredskabsstyrelsen 2026:
 * - 3 correct out of 5 parts => 3 points
 * - 4 correct out of 5 parts => 3 points
 * - 1 correct out of 3 parts => 2 points
 */
export function calculateCPoints(correctCount: number, totalParts: number): number {
  if (totalParts <= 0 || correctCount <= 0) return 0
  if (correctCount >= totalParts) return 4

  const rawPoints = (correctCount / totalParts) * 4
  // Round up in the candidate's favor, but capped at 3 since it is not completely correct
  const points = Math.min(3, Math.ceil(rawPoints))
  return points
}

/**
 * Randomly picks 12 distinct C-questions from the question pool.
 */
export function pickRandomCQuestions(pool: Flashcard[], count = C_EXAM_QUESTIONS_COUNT): Flashcard[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * Evaluates whether Task A or B is passed based on competence goals.
 * To pass, all critical goals must be met and at least 75% of total points achieved.
 */
export function evaluatePracticalTask(
  evaluations: Record<string, 'passed' | 'partial' | 'failed' | 'unanswered'>,
  totalGoals: number
): {
  isPassed: boolean
  scorePercent: number
  passedCount: number
  partialCount: number
  failedCount: number
} {
  let passedCount = 0
  let partialCount = 0
  let failedCount = 0

  Object.values(evaluations).forEach((status) => {
    if (status === 'passed') passedCount++
    else if (status === 'partial') partialCount++
    else if (status === 'failed') failedCount++
  })

  // 2 points for passed, 1 for partial, 0 for failed
  const maxScore = totalGoals * 2
  const achievedScore = passedCount * 2 + partialCount * 1
  const scorePercent = maxScore > 0 ? Math.round((achievedScore / maxScore) * 100) : 0

  // Passing criteria: No critical fails (failedCount === 0) and at least 65% of total points
  const isPassed = failedCount === 0 && scorePercent >= 65 && (passedCount + partialCount) >= totalGoals

  return {
    isPassed,
    scorePercent,
    passedCount,
    partialCount,
    failedCount,
  }
}

/**
 * Breakdown of answer text into estimated bullet points or parts
 */
export function estimateAnswerParts(answer: string): string[] {
  // Split on newlines, numbered items (1., 2.), or bullet dashes
  const lines = answer
    .split(/\n|(?=\b\d+\.\s)|(?=[•-])/)
    .map((l) => l.replace(/^[\d+.\-•\s]+/, '').trim())
    .filter((l) => l.length > 3)

  if (lines.length >= 2) {
    return lines
  }

  // If text is comma/og separated with multiple items
  if (answer.includes(',') || answer.toLowerCase().includes(' og ')) {
    const parts = answer
      .split(/,\s*|\s+og\s+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 3)
    if (parts.length >= 2) return parts
  }

  return [answer]
}
