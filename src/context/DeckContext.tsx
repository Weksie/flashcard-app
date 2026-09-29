import React, { useState, useEffect } from 'react'
import type { Deck, Flashcard, ScreenState } from '../types'
import { DEFAULT_DECKS } from '../data/defaultDecks'
import { DeckContext, STORAGE_KEY, MASTERY_KEY } from './deckContextDef'
import { shuffleArray } from '../utils/shuffle'

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [decks, setDecks] = useState<Deck[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load decks from localStorage', e)
    }
    return DEFAULT_DECKS
  })

  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(MASTERY_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load mastery data', e)
    }
    return {}
  })

  const [activeDeckId, setActiveDeckId] = useState<string | null>(null)
  const [activeCards, setActiveCards] = useState<Flashcard[]>([])
  const [screen, setScreen] = useState<ScreenState>('decks')
  const [sessionResult, setSessionResult] = useState<any>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  // Sync decks to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    } catch (e) {
      console.error('Failed to save decks', e)
    }
  }, [decks])

  // Sync mastery state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(MASTERY_KEY, JSON.stringify(masteredIds))
    } catch (e) {
      console.error('Failed to save mastery data', e)
    }
  }, [masteredIds])

  const [sessionId, setSessionId] = useState<number>(0)

  const activeDeck = decks.find((d) => d.id === activeDeckId) || null

  const selectDeck = (deckId: string, shuffle: boolean = false, forceAll: boolean = false) => {
    const target = decks.find((d) => d.id === deckId)
    if (target) {
      setActiveDeckId(deckId)
      // Only include cards that are not mastered, unless forceAll is explicitly set
      const cardsToUse = forceAll
        ? target.cards
        : target.cards.filter((card) => !masteredIds[card.id])

      let mapped = cardsToUse.map((card) => ({
        ...card,
        isMastered: !!masteredIds[card.id],
      }))
      if (shuffle) {
        mapped = shuffleArray(mapped)
      }
      setSessionId(Date.now())
      setActiveCards(mapped)
      setScreen('study')
    }
  }

  const markCardMastery = (cardId: string, isMastered: boolean) => {
    setMasteredIds((prev) => {
      const updated = { ...prev }
      if (isMastered) {
        updated[cardId] = true
      } else {
        delete updated[cardId]
      }
      return updated
    })

    setActiveCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isMastered } : c))
    )
  }

  const resetCardMastery = (cardId: string) => {
    setMasteredIds((prev) => {
      const updated = { ...prev }
      delete updated[cardId]
      return updated
    })

    setActiveCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isMastered: false } : c))
    )
  }

  const resetDeckMastery = (deckId: string) => {
    const target = decks.find((d) => d.id === deckId)
    if (!target) return

    setMasteredIds((prev) => {
      const updated = { ...prev }
      target.cards.forEach((c) => delete updated[c.id])
      return updated
    })

    if (activeDeckId === deckId) {
      setActiveCards((prev) => prev.map((c) => ({ ...c, isMastered: false })))
    }
  }

  const resetAllMastery = () => {
    setMasteredIds({})
    setActiveCards((prev) => prev.map((c) => ({ ...c, isMastered: false })))
  }

  const isCardMastered = (cardId: string) => !!masteredIds[cardId]

  const getMasteredCount = (deck: Deck): number => {
    return deck.cards.filter((c) => !!masteredIds[c.id]).length
  }

  const getUnmasteredCount = (deck: Deck): number => {
    return deck.cards.length - getMasteredCount(deck)
  }

  const getMasteryRate = (deck: Deck): number => {
    if (deck.cards.length === 0) return 0
    const masteredCount = getMasteredCount(deck)
    return Math.round((masteredCount / deck.cards.length) * 100)
  }

  const addCustomDeck = (newDeckData: Omit<Deck, 'id'>) => {
    const newDeck: Deck = {
      ...newDeckData,
      id: `custom-${Date.now()}`,
      isCustom: true,
    }
    setDecks((prev) => [newDeck, ...prev])
  }

  const updateDeck = (updatedDeck: Deck) => {
    setDecks((prev) =>
      prev.map((d) => (d.id === updatedDeck.id ? updatedDeck : d))
    )
    if (activeDeckId === updatedDeck.id) {
      setActiveCards(
        updatedDeck.cards.map((c) => ({
          ...c,
          isMastered: !!masteredIds[c.id],
        }))
      )
    }
  }

  const deleteDeck = (deckId: string) => {
    setDecks((prev) => prev.filter((d) => d.id !== deckId))
    if (activeDeckId === deckId) {
      setActiveDeckId(null)
      setScreen('decks')
    }
  }

  const resetToDefaults = () => {
    setDecks(DEFAULT_DECKS)
    setMasteredIds({})
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(MASTERY_KEY)
    setScreen('decks')
  }

  return (
    <DeckContext.Provider
      value={{
        decks,
        activeDeck,
        screen,
        setScreen,
        sessionId,
        selectDeck,
        activeCards,
        setActiveCards,
        markCardMastery,
        resetCardMastery,
        resetDeckMastery,
        resetAllMastery,
        sessionResult,
        setSessionResult,
        addCustomDeck,
        updateDeck,
        deleteDeck,
        resetToDefaults,
        getMasteryRate,
        getMasteredCount,
        getUnmasteredCount,
        isCardMastered,
        masteredIds,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </DeckContext.Provider>
  )
}
