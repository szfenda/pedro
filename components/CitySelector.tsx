'use client'

import { useState, useEffect } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { useLanguage } from './LanguageProvider'

export default function CitySelector() {
  const { translations } = useLanguage()
  // Używamy translations.nearYou do inicjalizacji i jako identyfikatora
  const nearYouText = translations.nearYou || 'Blisko Ciebie' 
  const [selectedCity, setSelectedCity] = useState(nearYouText)
  const [isOpen, setIsOpen] = useState(false)
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null)

  const cities = [
    nearYouText,
    'Warszawa',
    'Kraków',
    'Gdańsk',
    'Wrocław',
    'Poznań',
    'Łódź',
    'Szczecin',
    'Katowice',
    'Lublin',
    'Bydgoszcz'
  ]

  useEffect(() => {
    // Aktualizujemy selectedCity, jeśli zmienił się język, a wybrane jest "Blisko Ciebie"
    if (selectedCity === cities[0] && selectedCity !== nearYouText) {
      setSelectedCity(nearYouText)
    }
    if (selectedCity === nearYouText && !userCoords) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => setUserCoords(null),
          { enableHighAccuracy: true, timeout: 10000 }
        )
      }
    }
  }, [selectedCity, userCoords])

  return (
    <div className="city-selector relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1 min-w-[100px] max-w-[160px] bg-white border border-gray-200 rounded-lg shadow-sm font-medium text-sm text-gray-800 hover:bg-gray-50 transition"
      >
        <MapPin className="text-primary w-4 h-4" />
        <span className="font-medium truncate">{selectedCity}</span>
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full max-h-64 overflow-y-auto bg-white rounded-lg shadow-lg">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => {
                setSelectedCity(city)
                if (city === nearYouText) {
                  setUserCoords(null)
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (pos) => setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                      () => setUserCoords(null),
                      { enableHighAccuracy: true, timeout: 10000 }
                    )
                  }
                }
                setIsOpen(false)
              }}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
