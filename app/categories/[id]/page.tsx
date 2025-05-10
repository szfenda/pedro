'use client'

import { useLanguage } from '@/components/LanguageProvider'
import PromotionCard from '@/components/PromotionCard'
import { useParams } from 'next/navigation'

export default function CategoryDetailPage() {
  const { translations } = useLanguage()
  const params = useParams()
  const categoryId = params.id as string

  const categoryPromotions = {
    restaurants: [
      {
        id: '1',
        title: "Restauracja Włoska Roma",
        description: "Wszystkie pizze 40% taniej",
        oldPrice: "49.99 zł",
        newPrice: "29.99 zł",
        discount: "-40%",
        imageUrl: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
        store: "Roma Italian"
      },
      {
        id: '2',
        title: "Sushi Master",
        description: "Zestaw 32 kawałki",
        oldPrice: "159.99 zł",
        newPrice: "119.99 zł",
        discount: "-25%",
        imageUrl: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
        store: "Sushi Master"
      }
    ],
    beauty: [
      {
        id: '3',
        title: "Salon Beauty Plus",
        description: "Manicure hybrydowy",
        oldPrice: "120 zł",
        newPrice: "89 zł",
        discount: "-25%",
        imageUrl: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg",
        store: "Beauty Plus"
      }
    ],
    health: [
      {
        id: '4',
        title: "Centrum Medyczne",
        description: "Konsultacja dietetyczna",
        oldPrice: "200 zł",
        newPrice: "150 zł",
        discount: "-25%",
        imageUrl: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
        store: "MedCenter"
      }
    ],
    entertainment: [
      {
        id: '5',
        title: "Kino Centrum",
        description: "Bilety na premierę",
        oldPrice: "35 zł",
        newPrice: "25 zł",
        discount: "-30%",
        imageUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
        store: "Cinema Center"
      }
    ],
    shopping: [
      {
        id: '7',
        title: "Centrum Handlowe Galaxy",
        description: "Wyprzedaż sezonowa",
        oldPrice: "299 zł",
        newPrice: "149 zł",
        discount: "-50%",
        imageUrl: "https://images.pexels.com/photos/5872361/pexels-photo-5872361.jpeg",
        store: "Galaxy Mall"
      }
    ],
    sports: [
      {
        id: '6',
        title: "Fitness Club Pro",
        description: "Karnet miesięczny",
        oldPrice: "199 zł",
        newPrice: "149 zł",
        discount: "-25%",
        imageUrl: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
        store: "Fitness Pro"
      }
    ],
    education: [
      {
        id: '8',
        title: "Szkoła Językowa",
        description: "Kurs angielskiego",
        oldPrice: "1200 zł",
        newPrice: "899 zł",
        discount: "-25%",
        imageUrl: "https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg",
        store: "Language School"
      }
    ],
    travel: [
      {
        id: '9',
        title: "Biuro Podróży",
        description: "Wakacje w Grecji",
        oldPrice: "3999 zł",
        newPrice: "2999 zł",
        discount: "-25%",
        imageUrl: "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg",
        store: "Travel Agency"
      }
    ]
  }

  const promotions = categoryPromotions[categoryId as keyof typeof categoryPromotions] || []

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        {translations[categoryId as keyof typeof translations] || categoryId}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} {...promotion} />
        ))}
      </div>
    </div>
  )
}