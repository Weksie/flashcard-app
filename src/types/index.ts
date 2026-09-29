export interface Flashcard {
  id: string
  question: string
  answer: string
  hint?: string
  category?: string
  isMastered?: boolean
  timesReviewed?: number
  lastReviewed?: number
}

export interface Deck {
  id: string
  title: string
  description: string
  icon: string
  color: string
  cards: Flashcard[]
  isCustom?: boolean
}

export type ScreenState = 'decks' | 'study' | 'summary' | 'exam-info' | 'quick-notes'

export interface SessionResult {
  deckId: string
  deckTitle: string
  total: number
  masteredCards: Flashcard[]
  learningCards: Flashcard[]
  timestamp: number
}
