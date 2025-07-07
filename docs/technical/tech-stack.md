# Stack Technologiczny Pedro.pl

## Frontend

### Framework główny
- **Next.js 15.2.3**
  - Wybór: Server-side rendering, SEO, routing, optymalizacje
  - App Router dla lepszej wydajności
  - Server Components domyślnie
  - Built-in optimizations (images, fonts, scripts)

### UI Framework
- **React 18.2.0**
  - Wybór: Popularność, ekosystem, wsparcie społeczności
  - Concurrent features
  - Suspense dla lazy loading

### Styling
- **Tailwind CSS 3.3.3**
  - Wybór: Utility-first, szybki development, mały bundle
  - JIT compilation
  - Własne klasy w globals.css
  
- **PostCSS 8.4.30**
  - Autoprefixer dla kompatybilności
  - Optymalizacje CSS

### Komponenty UI
- **Radix UI** (kompletny zestaw)
  - @radix-ui/react-accordion
  - @radix-ui/react-dialog
  - @radix-ui/react-dropdown-menu
  - @radix-ui/react-select
  - @radix-ui/react-tabs
  - @radix-ui/react-toast
  - I wiele innych...
  - Wybór: Accessibility, unstyled, composable

### Ikony
- **Lucide React 0.446.0**
  - Wybór: Lekkie, tree-shakeable, spójny design
  - Ponad 1000 ikon
  - Customizable size i stroke

### Animacje
- **Framer Motion 12.0.6**
  - Wybór: Deklaratywne API, wydajność, gestures
  - Layout animations
  - Scroll-triggered animations

### Formularze
- **React Hook Form 7.53.0**
  - Wybór: Performance, mało re-renderów
  - Built-in validation
  - TypeScript support

- **Zod 3.23.8**
  - Wybór: Schema validation, TypeScript inference
  - Integracja z React Hook Form

### Dodatkowe biblioteki UI
- **cmdk 1.0.0** - Command palette
- **class-variance-authority 0.7.0** - Warianty komponentów
- **clsx 2.1.1** - Conditional classes
- **tailwind-merge 2.5.2** - Merge Tailwind classes
- **date-fns 3.6.0** - Manipulacja datami
- **react-day-picker 8.10.1** - Date picker
- **embla-carousel-react 8.3.0** - Karuzela
- **input-otp 1.2.4** - OTP input
- **react-resizable-panels 2.1.3** - Resizable panels
- **recharts 2.12.7** - Wykresy
- **sonner 1.5.0** - Toast notifications
- **vaul 0.9.9** - Drawer component

### Zarządzanie stanem
- **React Context API**
  - LanguageProvider - język aplikacji
  - FavoritesProvider - ulubione promocje
  - LocationProvider - lokalizacja użytkownika
  - ThemeProvider - motyw aplikacji

### Routing
- **Next.js App Router**
  - File-based routing
  - Nested layouts
  - Dynamic routes
  - Route groups

## Backend

### Database & Backend Service
- **Supabase** - Backend as a Service
  - ✅ **PostgreSQL** - Główna baza danych (już utworzona)
  - ✅ **Auth** - Autentykacja i autoryzacja
  - ✅ **Realtime** - Websockets dla live updates
  - ✅ **Storage** - Przechowywanie plików
  - ✅ **Edge Functions** - Serverless functions
  - ✅ **Vector embeddings** - Dla zaawansowanego wyszukiwania

### ORM
- **Prisma 6.3.0**
  - Wybór: Type-safe, migracje, intuicyjne API
  - Schema-first approach
  - Auto-generated types
  - Database introspection
  - ⏳ **Do zrobienia: Introspection istniejącej bazy Supabase**

### API
- **Next.js API Routes**
  - REST API
  - Serverless functions
  - Edge runtime opcjonalnie
- **Supabase Client SDK**
  - Type-safe queries
  - Realtime subscriptions
  - Auth integration

## DevOps i Narzędzia

### TypeScript
- **TypeScript 5.2.2**
  - Strict mode
  - Type inference
  - Better IDE support

### Linting i Formatowanie
- **ESLint 8.49.0**
  - Next.js config
  - Custom rules
  - Pre-commit hooks

### Build Tools
- **Next.js Build**
  - Webpack 5 pod spodem
  - SWC dla szybszej kompilacji
  - Tree shaking
  - Code splitting

### Package Management
- **npm/yarn**
  - Workspaces dla monorepo
  - Lock files dla deterministycznych buildów

## Planowane technologie

### Infrastruktura
- **Vercel** - Hosting (naturalny wybór dla Next.js)
- **Supabase** - Backend as a Service
  - ✅ PostgreSQL database (już utworzona)
  - ✅ Authentication
  - ✅ Realtime subscriptions
  - ✅ Storage dla plików
  - ✅ Edge Functions
- **Cloudflare** - CDN, DDoS protection

### Monitoring
- **Sentry** - Error tracking
- **Vercel Analytics** - Web analytics
- **LogRocket** - Session replay
- **Datadog** - APM i infrastruktura

### CI/CD
- **GitHub Actions** - Automated testing i deployment
- **Husky** - Git hooks
- **Commitizen** - Conventional commits

### Testing
- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **MSW** - API mocking

### Bezpieczeństwo
- **Supabase Auth** - Authentication & Authorization
  - Email/Password
  - OAuth providers (Google, Facebook)
  - Row Level Security
  - JWT tokens
- **Helmet** - Security headers
- **Rate limiting** - API protection
- **CORS** - Cross-origin configuration

### Płatności
- **Stripe** - Międzynarodowe płatności
- **Przelewy24** - Polski processor
- **PayU** - Alternatywa

### Komunikacja
- **SendGrid** - Email
- **Twilio** - SMS
- **OneSignal** - Push notifications

### Wyszukiwanie
- **Algolia** - Hosted search
- **Elasticsearch** - Self-hosted alternative
- **Meilisearch** - Lightweight option

### Cache
- **Redis** - Session store, cache
- **Next.js Cache** - Built-in caching
- **SWR** - Client-side caching

## Uzasadnienie wyborów

### Next.js + React
- Najlepsze SEO dla e-commerce
- Server Components = szybsze ładowanie
- Świetny DX (Developer Experience)
- Duża społeczność

### Tailwind CSS
- Szybki prototyping
- Mały końcowy bundle
- Spójny design system
- Łatwe responsywne projektowanie

### PostgreSQL + Prisma
- Sprawdzona baza dla aplikacji produkcyjnych
- Prisma daje type-safety
- Łatwe migracje
- Dobre wsparcie dla relacji

### TypeScript
- Łapie błędy podczas developmentu
- Lepsza dokumentacja kodu
- Refactoring bez strachu
- IntelliSense w IDE

### Radix UI
- Accessibility out of the box
- Unstyled = pełna kontrola nad wyglądem
- Composable architecture
- Mały bundle size

## Wersjonowanie

Wszystkie główne zależności są przypięte do konkretnych wersji w `package.json` dla zapewnienia stabilności. Aktualizacje przeprowadzane są planowo po przetestowaniu w środowisku staging.