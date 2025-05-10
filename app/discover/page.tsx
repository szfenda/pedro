'use client'

import { useLanguage } from '@/components/LanguageProvider'
import CitySelector from '@/components/CitySelector'
import CategorySection from '@/components/CategorySection'
import PopularPromotions from '@/components/PopularPromotions'
import { Search } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import PromotionCard from '@/components/PromotionCard'
import Image from 'next/image'

export default function DiscoverPage() {
  const { translations } = useLanguage()

  const entertainmentPromos = [
    {
      id: 'e1',
      title: 'Bilety do kina 2 za 1',
      description: 'Promocja na seanse wieczorne',
      oldPrice: '50 zł',
      newPrice: '25 zł',
      discount: '-50%',
      imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      store: 'Cinema Center'
    },
    {
      id: 'e2',
      title: 'Koncert Jazzowy',
      description: 'Bilety 30% taniej',
      oldPrice: '100 zł',
      newPrice: '70 zł',
      discount: '-30%',
      imageUrl: 'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg',
      store: 'Jazz Club'
    }
  ]
  const endingSoonPromos = [
    {
      id: 's1',
      title: 'Pizza Margherita',
      description: 'Ostatni dzień promocji!',
      oldPrice: '35 zł',
      newPrice: '20 zł',
      discount: '-43%',
      imageUrl: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
      store: 'Pizza Roma'
    },
    {
      id: 's2',
      title: 'Karnet na siłownię',
      description: 'Tylko do jutra',
      oldPrice: '120 zł',
      newPrice: '80 zł',
      discount: '-33%',
      imageUrl: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
      store: 'Fitness Pro'
    }
  ]
  const healthPromos = [
    {
      id: 'h1',
      title: 'Wizyta u dietetyka',
      description: 'Pierwsza konsultacja gratis',
      oldPrice: '150 zł',
      newPrice: '0 zł',
      discount: '-100%',
      imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
      store: 'MedCenter'
    },
    {
      id: 'h2',
      title: 'Pakiet badań',
      description: 'Zniżka na badania krwi',
      oldPrice: '200 zł',
      newPrice: '120 zł',
      discount: '-40%',
      imageUrl: 'https://images.pexels.com/photos/708848/pexels-photo-708848.jpeg',
      store: 'Lab Plus'
    }
  ]
  const beautyPromos = [
    {
      id: 'b1',
      title: 'Manicure hybrydowy',
      description: 'Promocja na nowy sezon',
      oldPrice: '120 zł',
      newPrice: '89 zł',
      discount: '-25%',
      imageUrl: 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg',
      store: 'Beauty Plus'
    },
    {
      id: 'b2',
      title: 'Masaż relaksacyjny',
      description: 'Tylko w tym tygodniu',
      oldPrice: '180 zł',
      newPrice: '120 zł',
      discount: '-33%',
      imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
      store: 'Spa Center'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image src="/images/PEDROicons.png" alt="pedro.pl" width={38} height={38} className="max-w-[38px] h-auto" />
          <span className="text-2xl font-bold tracking-tight text-gray-900">pedro.pl</span>
        </div>
        <div className="w-auto min-w-[120px]">
          <CitySelector />
        </div>
      </div>
      
      <div className="search-section">
        <div className="relative">
          <input
            type="text"
            placeholder={translations.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="categories-section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{translations.categories}</h2>
          <button className="text-primary font-medium">
            {translations.viewAll}
          </button>
        </div>
        <CategorySection />
      </div>

      <div className="popular-promotions-section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{translations.popularPromotions}</h2>
          <button className="text-primary font-medium">
            {translations.viewAll}
          </button>
        </div>
        <PopularPromotions />
      </div>

      <div className="nearby-promotions-section mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{translations.nearbyPromotions}</h2>
          <button className="text-primary font-medium">
            {translations.viewAll}
          </button>
        </div>
        <PopularPromotions />
      </div>

      <div className="entertainment-promotions-section mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Rozrywka</h2>
          <button className="text-primary font-medium">Zobacz wszystkie</button>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-x-4 py-2 px-1 min-w-max" style={{ WebkitOverflowScrolling: 'touch' }}>
            {entertainmentPromos.map((promo) => (
              <div key={promo.id} className="min-w-[260px] max-w-[300px]">
                <PromotionCard {...promo} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ending-soon-promotions-section mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Kończy się wkrótce</h2>
          <button className="text-primary font-medium">Zobacz wszystkie</button>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-x-4 py-2 px-1 min-w-max" style={{ WebkitOverflowScrolling: 'touch' }}>
            {endingSoonPromos.map((promo) => (
              <div key={promo.id} className="min-w-[260px] max-w-[300px]">
                <PromotionCard {...promo} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="health-promotions-section mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Zdrowie</h2>
          <button className="text-primary font-medium">Zobacz wszystkie</button>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-x-4 py-2 px-1 min-w-max" style={{ WebkitOverflowScrolling: 'touch' }}>
            {healthPromos.map((promo) => (
              <div key={promo.id} className="min-w-[260px] max-w-[300px]">
                <PromotionCard {...promo} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="beauty-promotions-section mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Uroda</h2>
          <button className="text-primary font-medium">Zobacz wszystkie</button>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-x-4 py-2 px-1 min-w-max" style={{ WebkitOverflowScrolling: 'touch' }}>
            {beautyPromos.map((promo) => (
              <div key={promo.id} className="min-w-[260px] max-w-[300px]">
                <PromotionCard {...promo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}