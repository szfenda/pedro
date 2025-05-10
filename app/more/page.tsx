'use client'

import { useLanguage } from '@/components/LanguageProvider'
import { 
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
  const { translations } = useLanguage()

  const sections = [
    {
      title: translations.accountManagement,
      items: [
        { icon: User, label: translations.accountDetails },
        { icon: CreditCard, label: translations.paymentCards },
        { icon: Gift, label: translations.vouchers },
        { icon: Star, label: translations.surpriseBonuses },
        { icon: Bell, label: translations.notifications }
      ]
    },
    {
      title: translations.community,
      items: [
        { icon: Users, label: translations.inviteFriends },
        { icon: MapPin, label: translations.recommendPlace },
        { icon: Store, label: translations.registerLocation }
      ]
    },
    {
      title: translations.support,
      items: [
        { icon: HelpCircle, label: translations.orderHelp },
        { icon: Settings, label: translations.appFunctionality }
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