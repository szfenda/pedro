'use client'

import { useLanguage } from '@/components/LanguageProvider'
import { MapPin, Navigation } from 'lucide-react'
import { useState } from 'react'

export default function MapPage() {
  const { translations } = useLanguage()
  const [distance, setDistance] = useState('1')
  const [searchCity, setSearchCity] = useState('')

  const distances = [
    { value: '1', label: '1km' },
    { value: '3', label: '3km' },
    { value: '6', label: '6km' }
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-4">
        <div className="search-bar p-4">
          <input
            type="text"
            placeholder={translations.searchPlaceholder}
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200"
          />
        </div>

        <div className="map-controls p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{translations.distance}</span>
            <div className="flex gap-2">
              {distances.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDistance(d.value)}
                  className={`px-4 py-2 rounded-full ${
                    distance === d.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-lg">
            <Navigation className="w-5 h-5" />
            <span>{translations.currentLocation}</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md h-[60vh] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="w-8 h-8 mx-auto mb-2" />
            <p>{translations.nearbyPromotions}</p>
          </div>
        </div>
      </div>
    </div>
  )
}