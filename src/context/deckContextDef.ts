import { createContext } from 'react'
import type { Deck, Flashcard, ScreenState, SessionResult } from '../types'

export interface DeckContextType {
  decks: Deck[]
  activeDeck: Deck | null
  screen: ScreenState
  setScreen: (screen: ScreenState) => void
  sessionId: number
  selectDeck: (deckId: string, shuffle?: boolean, forceAll?: boolean) => void
  activeCards: Flashcard[]
  setActiveCards: (cards: Flashcard[]) => void
  markCardMastery: (cardId: string, isMastered: boolean) => void
  resetCardMastery: (cardId: string) => void
  resetDeckMastery: (deckId: string) => void
  resetAllMastery: () => void
  sessionResult: SessionResult | null
  setSessionResult: (result: SessionResult | null) => void
  addCustomDeck: (newDeck: Omit<Deck, 'id'>) => void
  updateDeck: (updatedDeck: Deck) => void
  deleteDeck: (deckId: string) => void
  resetToDefaults: () => void
  getMasteryRate: (deck: Deck) => number
  getMasteredCount: (deck: Deck) => number
  getUnmasteredCount: (deck: Deck) => number
  isCardMastered: (cardId: string) => boolean
  masteredIds: Record<string, boolean>
}

export const STORAGE_KEY = 'flashmaster_beredskab_v4'
export const MASTERY_KEY = 'flashmaster_beredskab_mastery_v4'

export const DeckContext = createContext<DeckContextType | undefined>(undefined)
