import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BottomNavigation from '@/components/BottomNavigation'
import { LanguageProvider } from '@/components/LanguageProvider'
import { FavoritesProvider } from '@/components/FavoritesProvider'
import { LocationProvider } from '@/contexts/LocationContext'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#6B46C1'
}

export const metadata: Metadata = {
  title: 'Pedro.pl - Promocje i Kupony',
  description: 'Znajdź najlepsze promocje, zniżki i kupony na pedro.pl',
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Pedro.pl'
  },
  formatDetection: {
    telephone: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pedro.pl" />
        <link rel="icon" href="/images/favicon.png" />
        <link rel="apple-touch-icon" href="/images/icon.png" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <FavoritesProvider>
            <LocationProvider>
              <div className="min-h-screen pb-16">
                {children}
                <BottomNavigation />
              </div>
            </LocationProvider>
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}