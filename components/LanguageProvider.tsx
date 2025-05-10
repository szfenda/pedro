'use client'

import React, { createContext, useContext, useState } from 'react'

type Language = 'pl' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Record<string, string>
}

const translations = {
  pl: {
    discover: 'Odkrywaj',
    categories: 'Kategorie',
    map: 'Mapa',
    favorites: 'Ulubione',
    more: 'Więcej',
    searchPlaceholder: 'Szukaj promocji, usług, lokalizacji...',
    popularPromotions: 'Popularne Promocje',
    nearbyPromotions: 'Promocje w pobliżu',
    viewAll: 'Zobacz wszystkie',
    restaurants: 'Restauracje',
    beauty: 'Uroda',
    health: 'Zdrowie',
    entertainment: 'Rozrywka',
    shopping: 'Zakupy',
    sports: 'Sport',
    education: 'Edukacja',
    travel: 'Podróże',
    accountManagement: 'Zarządzanie Kontem',
    accountDetails: 'Dane konta',
    paymentCards: 'Karty płatnicze',
    vouchers: 'Vouchery',
    surpriseBonuses: 'Bonusy-niespodzianki',
    notifications: 'Powiadomienia',
    community: 'Społeczność',
    inviteFriends: 'Zaproś znajomych',
    recommendPlace: 'Poleć miejsce',
    registerLocation: 'Zarejestruj lokal',
    support: 'Wsparcie',
    orderHelp: 'Pomoc z zamówieniem',
    appFunctionality: 'Funkcjonalność aplikacji',
    currentLocation: 'Obecna lokalizacja',
    distance: 'Odległość',
    noFavorites: 'Nie masz jeszcze ulubionych promocji',
    selectCity: 'Wybierz miasto',
    changeLanguage: 'Zmień język',
    settings: 'Ustawienia'
  },
  en: {
    discover: 'Discover',
    categories: 'Categories',
    map: 'Map',
    favorites: 'Favorites',
    more: 'More',
    searchPlaceholder: 'Search promotions, services, locations...',
    popularPromotions: 'Popular Promotions',
    nearbyPromotions: 'Nearby Promotions',
    viewAll: 'View all',
    restaurants: 'Restaurants',
    beauty: 'Beauty',
    health: 'Health',
    entertainment: 'Entertainment',
    shopping: 'Shopping',
    sports: 'Sports',
    education: 'Education',
    travel: 'Travel',
    accountManagement: 'Account Management',
    accountDetails: 'Account Details',
    paymentCards: 'Payment Cards',
    vouchers: 'Vouchers',
    surpriseBonuses: 'Surprise Bonuses',
    notifications: 'Notifications',
    community: 'Community',
    inviteFriends: 'Invite Friends',
    recommendPlace: 'Recommend Place',
    registerLocation: 'Register Location',
    support: 'Support',
    orderHelp: 'Order Help',
    appFunctionality: 'App Functionality',
    currentLocation: 'Current Location',
    distance: 'Distance',
    noFavorites: 'You don\'t have any favorite promotions yet',
    selectCity: 'Select City',
    changeLanguage: 'Change Language',
    settings: 'Settings'
  }
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'pl',
  setLanguage: () => {},
  translations: translations.pl,
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pl')

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
