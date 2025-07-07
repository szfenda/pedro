# Architektura Aplikacji Pedro.pl

## Przegląd Architektury

Pedro.pl jest aplikacją webową zbudowaną w architekturze monolitycznej z wykorzystaniem Next.js 15 jako głównego frameworka. Aplikacja jest zaprojektowana jako Progressive Web App (PWA) z możliwością instalacji na urządzeniach mobilnych.

## Stack Technologiczny

### Frontend
- **Framework:** Next.js 15.2.3 (React 18.2.0)
- **Styling:** Tailwind CSS 3.3.3 + CSS Modules
- **Komponenty UI:** Radix UI (kompletny zestaw komponentów)
- **Ikony:** Lucide React
- **Animacje:** Framer Motion 12.0.6
- **Formularze:** React Hook Form 7.53.0 + Zod 3.23.8
- **Stan aplikacji:** React Context API

### Backend
- **ORM:** Prisma 6.3.0
- **Baza danych:** PostgreSQL (Supabase)
- **Backend Service:** Supabase (Auth, Realtime, Storage)
- **API:** Next.js API Routes (REST) + Supabase Client

### Narzędzia deweloperskie
- **TypeScript:** 5.2.2
- **ESLint:** 8.49.0
- **PostCSS:** 8.4.30

## Struktura Katalogów

```
pedro/
├── app/                    # Next.js App Router
│   ├── categories/        # Strona kategorii
│   ├── discover/          # Strona główna odkrywania
│   ├── favorites/         # Ulubione promocje
│   ├── map/              # Mapa promocji
│   ├── more/             # Dodatkowe opcje
│   ├── promotion/        # Szczegóły promocji
│   ├── globals.css       # Globalne style
│   ├── layout.tsx        # Główny layout aplikacji
│   └── page.tsx          # Strona startowa (loader)
├── components/           # Komponenty React
│   ├── ui/              # Komponenty UI (Radix)
│   └── ...              # Komponenty biznesowe
├── contexts/            # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Biblioteki pomocnicze
├── prisma/             # Konfiguracja Prisma
│   └── schema.prisma   # Schemat bazy danych
├── public/             # Zasoby statyczne
└── docs/               # Dokumentacja
    └── technical/      # Dokumentacja techniczna
```

## Architektura Komponentów

### Hierarchia Komponentów

```
RootLayout
├── LanguageProvider
├── FavoritesProvider
├── LocationProvider
├── ThemeProvider
├── [Page Component]
│   ├── CitySelector
│   ├── SearchBar
│   ├── CategorySection
│   ├── PromotionCard
│   └── PopularPromotions
└── BottomNavigation
```

### Główne Komponenty

1. **BottomNavigation** - Nawigacja dolna z 5 zakładkami
2. **PromotionCard** - Karta promocji z obrazem, ceną i rabatem
3. **CategorySection** - Sekcja kategorii na stronie głównej
4. **CitySelector** - Wybór miasta dla lokalizacji promocji
5. **FavoritesProvider** - Zarządzanie ulubionymi promocjami

## Przepływ Danych

### 1. Context Providers
- **LanguageProvider** - Zarządzanie językiem (PL/EN)
- **FavoritesProvider** - Stan ulubionych promocji
- **LocationProvider** - Lokalizacja użytkownika i wybrane miasto
- **ThemeProvider** - Motyw aplikacji (jasny/ciemny)

### 2. Routing
- Wykorzystuje Next.js App Router
- Każda główna funkcjonalność ma własny folder w `/app`
- Dynamiczne routy dla promocji: `/promotion/[id]`

### 3. Stan Aplikacji
- Lokalny stan komponentów (useState)
- Globalne contexty dla współdzielonych danych
- Brak zewnętrznego state managementu (Redux/Zustand)

## Wzorce Projektowe

### 1. Component Composition
- Małe, reużywalne komponenty
- Kompozycja zamiast dziedziczenia
- Props drilling minimalizowany przez Context API

### 2. Server Components
- Domyślnie wszystkie komponenty są Server Components
- Client Components oznaczone `'use client'`
- Optymalizacja renderowania po stronie serwera

### 3. Responsive Design
- Mobile-first approach
- Breakpointy Tailwind: sm (640px), md (768px), lg (1024px)
- PWA z viewport meta tags

## Integracje

### Obecne
1. **Prisma + PostgreSQL** - Baza danych
2. **Next.js Image Optimization** - Optymalizacja obrazów
3. **PWA Manifest** - Instalacja aplikacji

### Planowane (według PRD)
1. **Payment Gateway** - Bramka płatności
2. **SMS/Email Service** - Powiadomienia
3. **Maps API** - Integracja z mapami
4. **Analytics** - Google Analytics / Mixpanel
5. **CDN** - Content Delivery Network

## Bezpieczeństwo

### Obecne zabezpieczenia
- HTTPS enforcement
- Content Security Policy (CSP)
- Sanityzacja inputów użytkownika

### Do implementacji
- Autentykacja użytkowników (JWT/Session)
- Rate limiting
- CORS configuration
- SQL injection protection (Prisma)

## Wydajność

### Optymalizacje
1. **Next.js Optimizations**
   - Automatic code splitting
   - Image optimization
   - Font optimization
   - Static generation gdzie możliwe

2. **Caching Strategy**
   - Browser caching dla assetów
   - API response caching (planowane)
   - Supabase edge caching

3. **Bundle Size**
   - Tree shaking
   - Dynamic imports dla dużych komponentów
   - Minimalizacja CSS z Tailwind

## Skalowalność

### Horyzontalna
- Stateless aplikacja
- Możliwość uruchomienia wielu instancji
- Load balancer ready

### Wertykalna
- Optymalizacja zapytań do bazy
- Indeksy na często używanych kolumnach
- Connection pooling w Prisma

## Monitoring (Do implementacji)

1. **Application Performance Monitoring (APM)**
   - Response times
   - Error rates
   - User sessions

2. **Infrastructure Monitoring**
   - CPU/Memory usage
   - Database performance
   - Network latency

3. **Business Metrics**
   - User engagement
   - Conversion rates
   - Feature adoption