'use client'

import { useLanguage } from '@/components/LanguageProvider'
import PromotionCard from '@/components/PromotionCard'
import { useFavorites } from '@/components/FavoritesProvider'

export default function FavoritesPage() {
  const { translations } = useLanguage()
  const { favorites } = useFavorites()

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{translations.favorites}</h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          {translations.noFavorites}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((promo) => (
            <PromotionCard key={promo.id} {...promo} />
          ))}
        </div>
      )}
    </div>
  )
}