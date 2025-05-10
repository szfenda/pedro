'use client'

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
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/LanguageProvider'

export default function CategoriesPage() {
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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{translations.categories}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => router.push(`/categories/${category.id}`)}
            className={`flex flex-col items-center justify-center aspect-square min-h-[120px] min-w-[120px] sm:min-h-[140px] sm:min-w-[140px] rounded-xl shadow-md transition-all duration-200 cursor-pointer ${category.color}`}
          >
            <div className="mb-2">
              <category.icon className="w-8 h-8 text-white" />
            </div>
            <span className="text-white font-semibold text-base text-center drop-shadow-sm">
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}