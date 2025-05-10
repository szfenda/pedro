'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { PromotionCardProps } from './PromotionCard'

interface FavoritesContextType {
  favorites: PromotionCardProps[]
  isFavorite: (id: string) => boolean
  addFavorite: (promo: PromotionCardProps) => void
  removeFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<PromotionCardProps[]>([])

  // localStorage sync
  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) setFavorites(JSON.parse(stored))
  }, [])
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = (id: string) => favorites.some(fav => fav.id === id)
  const addFavorite = (promo: PromotionCardProps) => {
    if (!isFavorite(promo.id)) setFavorites(prev => [...prev, promo])
  }
  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
} 