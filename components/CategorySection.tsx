'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from './LanguageProvider'
import { 
  Utensils, 
  Sparkles, 
  Heart, 
  Music, 
  ShoppingBag, 
  Dumbbell, 
  GraduationCap, 
  Plane 
} from 'lucide-react'

export default function CategorySection() {
  const router = useRouter()
  const { translations } = useLanguage()

  const categories = [
    { id: 'restaurants', icon: Utensils, label: translations.restaurants, color: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'beauty', icon: Sparkles, label: translations.beauty, color: 'bg-pink-500 hover:bg-pink-600' },
    { id: 'health', icon: Heart, label: translations.health, color: 'bg-red-500 hover:bg-red-600' },
    { id: 'entertainment', icon: Music, label: translations.entertainment, color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'shopping', icon: ShoppingBag, label: translations.shopping, color: 'bg-violet-500 hover:bg-violet-600' },
    { id: 'sports', icon: Dumbbell, label: translations.sports, color: 'bg-green-500 hover:bg-green-600' },
    { id: 'education', icon: GraduationCap, label: translations.education, color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'travel', icon: Plane, label: translations.travel, color: 'bg-cyan-500 hover:bg-cyan-600' },
  ]

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-x-4 py-2 px-1 min-w-max scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => router.push(`/categories/${category.id}`)}
            className={`min-w-[110px] flex flex-col items-center justify-center rounded-xl shadow-md p-4 transition-all duration-200 cursor-pointer ${category.color}`}
            style={{ flex: '0 0 auto' }}
          >
            <div className="mb-2">
              <category.icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-white font-semibold text-sm text-center drop-shadow-sm">
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}