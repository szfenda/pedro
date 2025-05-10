'use client'

import { useLanguage } from '@/components/LanguageProvider'
import {
  Languages, // Import ikony dla języka
  User,
  CreditCard,
  Gift, 
  Star, 
  Bell, 
  Users, 
  MapPin, 
  Store,
  HelpCircle,
  Settings
} from 'lucide-react'

export default function MorePage() {
  const { language, setLanguage, translations } = useLanguage()

  const sections = [
    {
      title: translations.accountManagement,
      items: [
        { icon: User, label: translations.accountDetails, action: () => {} },
        { icon: CreditCard, label: translations.paymentCards, action: () => {} },
        { icon: Gift, label: translations.vouchers, action: () => {} },
        { icon: Star, label: translations.surpriseBonuses, action: () => {} },
        { icon: Bell, label: translations.notifications, action: () => {} }
      ]
    },
    {
      title: translations.community,
      items: [
        { icon: Users, label: translations.inviteFriends, action: () => {} },
        { icon: MapPin, label: translations.recommendPlace, action: () => {} },
        { icon: Store, label: translations.registerLocation, action: () => {} }
      ]
    },
    {
      title: translations.support,
      items: [
        { icon: HelpCircle, label: translations.orderHelp, action: () => {} },
        { icon: Settings, label: translations.appFunctionality, action: () => {} }
      ]
    },
    {
      title: translations.settings,
      items: [
        { 
          icon: Languages, 
          label: language === 'pl' ? 'Change to English' : 'Zmień na Polski',
          action: () => setLanguage(language === 'pl' ? 'en' : 'pl') 
        }
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      {sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          <div className="bg-white rounded-lg shadow-md">
            {section.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={item.action} // Dodajemy obsługę kliknięcia
                className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
              >
                <item.icon className="w-6 h-6 text-primary" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
