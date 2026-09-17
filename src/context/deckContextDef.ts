import { createContext } from 'react'
import type { Deck, Flashcard, ScreenState, SessionResult } from '../types'

export interface DeckContextType {
  decks: Deck[]
  activeDeck: Deck | null
  screen: ScreenState
  setScreen: (screen: ScreenState) => void
  sessionId: number
  selectDeck: (deckId: string, shuffle?: boolean) => void
  activeCards: Flashcard[]
  setActiveCards: (cards: Flashcard[]) => void
  markCardMastery: (cardId: string, isMastered: boolean) => void
  sessionResult: SessionResult | null
  setSessionResult: (result: SessionResult | null) => void
  resetDeckMastery: (deckId: string) => void
  addCustomDeck: (newDeck: Omit<Deck, 'id'>) => void
  updateDeck: (updatedDeck: Deck) => void
  deleteDeck: (deckId: string) => void
  resetToDefaults: () => void
  getMasteryRate: (deck: Deck) => number
}

export const STORAGE_KEY = 'flashmaster_beredskab_v4'
export const MASTERY_KEY = 'flashmaster_beredskab_mastery_v4'

export const DeckContext = createContext<DeckContextType | undefined>(undefined)
