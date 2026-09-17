import React, { useState, useEffect } from 'react'
import type { Deck, Flashcard } from '../types'
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
  const [screen, setScreen] = useState<'decks' | 'study' | 'summary'>('decks')
  const [sessionResult, setSessionResult] = useState<any>(null)

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

  const selectDeck = (deckId: string, shuffle: boolean = false) => {
    const target = decks.find((d) => d.id === deckId)
    if (target) {
      setActiveDeckId(deckId)
      // Inject saved mastery state into cards
      let mapped = target.cards.map((card) => ({
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
    setMasteredIds((prev) => ({
      ...prev,
      [cardId]: isMastered,
    }))

    setActiveCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isMastered } : c))
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

  const getMasteryRate = (deck: Deck): number => {
    if (deck.cards.length === 0) return 0
    const masteredCount = deck.cards.filter((c) => !!masteredIds[c.id]).length
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
        sessionResult,
        setSessionResult,
        resetDeckMastery,
        addCustomDeck,
        updateDeck,
        deleteDeck,
        resetToDefaults,
        getMasteryRate,
      }}
    >
      {children}
    </DeckContext.Provider>
  )
}
