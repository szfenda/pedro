'use client'

import PromotionCard from './PromotionCard'

export default function PopularPromotions() {
  const promotions = [
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
      title: "Salon Beauty Plus",
      description: "Manicure hybrydowy",
      oldPrice: "120 zł",
      newPrice: "89 zł",
      discount: "-25%",
      imageUrl: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg",
      store: "Beauty Plus"
    },
    {
      id: '3',
      title: "Fitness Club Pro",
      description: "Karnet miesięczny",
      oldPrice: "199 zł",
      newPrice: "149 zł",
      discount: "-25%",
      imageUrl: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
      store: "Fitness Pro"
    }
  ]

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-row gap-x-4 py-2 px-1 min-w-max" style={{ WebkitOverflowScrolling: 'touch' }}>
        {promotions.map((promotion) => (
          <div key={promotion.id} className="min-w-[260px] max-w-[300px]">
            <PromotionCard {...promotion} />
          </div>
        ))}
      </div>
    </div>
  )
}