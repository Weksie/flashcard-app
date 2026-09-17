import { useContext } from 'react'
import { DeckContext } from './deckContextDef'

export const useDeck = () => {
  const context = useContext(DeckContext)
  if (!context) {
    throw new Error('useDeck must be used within a DeckProvider')
  }
  return context
}
