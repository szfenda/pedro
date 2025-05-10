'use client'

import { useParams } from 'next/navigation'
import { Heart, Share2, ChevronLeft, MapPin, Star } from 'lucide-react'
import { useFavorites } from '@/components/FavoritesProvider'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const MOCK_PROMOS = [
  {
    id: 'b2',
    title: 'Masaż relaksacyjny -30%',
    description: '60-minutowy masaż relaksacyjny całego ciała. Idealny na zrelaksowanie się po ciężkim dniu pracy.',
    oldPrice: '150.00 zł',
    newPrice: '105.00 zł',
    discount: '-30%',
    imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
    store: 'Salon Piękności Harmonia',
    location: 'ul. Piękna 15, Warszawa',
    rating: 4.9,
    reviews: 28,
    bought: 75,
    validUntil: '2024-08-16',
    save: '45.00 zł',
    companyDesc: 'Profesjonalny salon kosmetyczny oferujący szeroki zakres usług pielęgnacyjnych dla kobiet i mężczyzn.',
    hours: 'Pon-Pt: 10:00-20:00, Sob: 10:00-16:00',
  },
  // ... inne oferty
]

export default function PromotionDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const promo = MOCK_PROMOS.find(p => p.id === id) || MOCK_PROMOS[0]
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const favorite = isFavorite(promo.id)

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24">
      <div className="relative">
        <button className="absolute top-3 left-3 z-10 p-2 bg-white rounded-full shadow" onClick={() => router.back()}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <Image src={promo.imageUrl} alt={promo.title} width={600} height={300} className="w-full h-56 object-cover rounded-b-2xl" />
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={() => {
              if (favorite) removeFavorite(promo.id)
              else addFavorite(promo)
            }}
            className="p-2 bg-white rounded-full shadow"
          >
            <Heart className={`w-6 h-6 ${favorite ? 'text-primary fill-current' : 'text-gray-400'}`} />
          </button>
          <button className="p-2 bg-white rounded-full shadow">
            <Share2 className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <span className="absolute top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{promo.discount}</span>
      </div>
      <div className="px-4 pt-4">
        <h1 className="text-xl font-bold mb-1">{promo.title}</h1>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <span> <span className="font-medium text-black">{promo.store}</span></span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary font-bold text-2xl">{promo.newPrice}</span>
          <span className="line-through text-gray-400 text-lg">{promo.oldPrice}</span>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded ml-2">Oszczędzasz: {promo.save}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
          <span>Kupiono: {promo.bought}</span>
          <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /> {promo.rating} ({promo.reviews})</span>
          <span>Ważne do: {promo.validUntil}</span>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Opis</h2>
          <p className="text-sm text-gray-700">{promo.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Lokalizacja</h2>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-primary" /> {promo.location}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-semibold">Opinie</h2>
            <button className="text-primary text-sm font-medium">Zobacz wszystkie</button>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold">{promo.rating}</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(promo.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-500">{promo.reviews} opinii</span>
          </div>
          <button className="border border-primary text-primary rounded-lg px-4 py-2 text-sm font-medium mt-2">Napisz opinię</button>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-1">O firmie</h2>
          <p className="text-sm text-gray-700 mb-2">{promo.companyDesc}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>{promo.hours}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-4 h-4 text-primary" /> {promo.location}
          </div>
          <button className="w-full border rounded-lg py-2 mt-2 font-medium">Zobacz profil firmy</button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-20 max-w-md mx-auto px-4 py-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg shadow transition">Kup teraz</button>
      </div>
    </div>
  )
} 