'use client'

import { useLanguage } from './LanguageProvider'
import { usePathname, useRouter } from 'next/navigation'
import { Compass, Grid, Map, Heart, MoreHorizontal } from 'lucide-react'

export default function BottomNavigation() {
  const { translations } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { icon: Compass, label: translations.discover, path: '/discover' },
    { icon: Grid, label: translations.categories, path: '/categories' },
    { icon: Map, label: translations.map, path: '/map' },
    { icon: Heart, label: translations.favorites, path: '/favorites' },
    { icon: MoreHorizontal, label: translations.more, path: '/more' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white bottom-nav">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center space-y-1 w-full py-1 ${
              pathname === item.path ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}