'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useFavorites } from './FavoritesProvider'
import { useRouter } from 'next/navigation'

export interface PromotionCardProps {
  id: string
  title: string
  description: string
  oldPrice: string
  newPrice: string
  discount: string
  imageUrl: string
  store: string
}

export default function PromotionCard({
  id,
  title,
  description,
  oldPrice,
  newPrice,
  discount,
  imageUrl,
  store,
}: PromotionCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(id)
  const router = useRouter()

  return (
    <div
      className="promotion-card p-4 cursor-pointer group"
      onClick={e => {
        if ((e.target as HTMLElement).closest('button[data-heart]')) return
        router.push(`/promotion/${id}`)
      }}
    >
      <div className="relative h-48 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-lg object-contain"
        />
        <button
          data-heart
          type="button"
          onClick={e => {
            e.stopPropagation()
            if (favorite) removeFavorite(id)
            else addFavorite({ id, title, description, oldPrice, newPrice, discount, imageUrl, store })
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
        >
          <Heart
            className={`w-5 h-5 ${favorite ? 'text-primary fill-current' : 'text-gray-500'}`}
          />
        </button>
      </div>
      <div className="space-y-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-gray-500 line-through text-sm">{oldPrice}</span>
            <div className="text-primary font-bold text-xl">{newPrice}</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-primary font-bold">{discount}</span>
            <span className="text-sm text-gray-500">{store}</span>
          </div>
        </div>
      </div>
    </div>
  )
}