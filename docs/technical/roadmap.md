# 🗺️ Roadmap Rozwoju Pedro.pl

## 📊 Status Projektu
- **Faza:** MVP Development
- **Postęp:** ~15%
- **Data rozpoczęcia:** Maj 2025
- **Planowane zakończenie MVP:** Grudzień 2025

## 🎯 Legenda
- ✅ Zaimplementowane
- 🚧 W trakcie
- ⏳ Zaplanowane
- ❌ Niezaczęte

---

## Faza 1: Fundament (Sprint 1-2) 🏗️

### 1.1 Setup Projektu
- ✅ Inicjalizacja Next.js 13
- ✅ Konfiguracja TypeScript
- ✅ Setup Tailwind CSS
- ✅ Instalacja Radix UI
- ✅ Struktura katalogów
- ❌ Konfiguracja ESLint & Prettier
- ❌ Husky & pre-commit hooks
- ❌ Setup środowisk (dev/staging/prod)

### 1.2 Baza Danych
- ✅ Instalacja Prisma
- ✅ Podstawowy schema (tylko User)
- ✅ Pełna baza danych w Supabase (wszystkie tabele utworzone)
  - ✅ Tabela users (rozszerzona)
  - ✅ Tabela partners
  - ✅ Tabela offers (zamiast promotions)
  - ✅ Tabela coupons (zamiast vouchers)
  - ✅ Tabela categories
  - ✅ Tabela favorites
  - ✅ Tabela reviews & partner_reviews
  - ✅ Tabela notifications
  - ✅ Tabela payments
  - ✅ Tabele lokalizacji (cities, districts, partner_locations)
  - ✅ Tabele pomocnicze (statusy, logi, settings)
- ❌ Integracja Prisma z istniejącą bazą Supabase
  - ❌ Prisma introspection (db pull)
  - ❌ Dostosowanie schema.prisma
  - ❌ Generowanie Prisma Client
- ❌ Seed data
- ❌ RLS (Row Level Security) policies

### 1.3 Autentykacja
- ❌ Supabase Auth setup
  - ❌ Konfiguracja klienta Supabase
  - ❌ Integracja z Next.js
  - ❌ Auth helpers
- ❌ Providers configuration
  - ❌ Email/Password
  - ❌ Google OAuth
  - ❌ Facebook OAuth
- ❌ Session management
- ❌ Protected routes middleware
- ❌ Role-based access (USER/PARTNER/ADMIN)
- ❌ Integracja z tabelą users

### 1.4 UI/UX Podstawy
- ✅ Theme provider
- ✅ Podstawowe komponenty UI (button, card, etc.)
- ✅ Layout główny
- ✅ Nawigacja dolna (podstawowa)
- ❌ Responsywność (pełna)
- ❌ Dark mode
- ❌ Loading states
- ❌ Error boundaries

---

## Faza 2: Core Features (Sprint 3-6) 💡

### 2.1 System Promocji (Offers)
- 🚧 Strona Discover (podstawowa wersja)
  - ✅ Layout strony
  - ✅ Mockowe dane promocji
  - ❌ Integracja z bazą danych Supabase
  - ❌ Pobieranie offers z bazy
  - ❌ Filtrowanie i sortowanie
  - ❌ Infinite scroll
- ✅ PromotionCard komponent (podstawowy)
  - ✅ Wyświetlanie danych
  - ❌ Integracja z rzeczywistymi danymi offers
  - ❌ Animacje i interakcje
  - ❌ Lazy loading obrazów
- ❌ Strona szczegółów oferty
  - ❌ Galeria zdjęć (offer_images)
  - ❌ Informacje o partnerze
  - ❌ Lokalizacje partnera
  - ❌ Warunki promocji
  - ❌ CTA do zakupu kuponu

### 2.2 System Kategorii
- ✅ CategorySection komponent (podstawowy)
- ❌ Pełna lista kategorii
- ❌ Ikony kategorii
- ❌ Strona kategorii z filtrowaniem
- ❌ Podkategorie

### 2.3 System Lokalizacji
- ✅ CitySelector komponent (podstawowy)
- ❌ Geolokalizacja użytkownika
- ❌ Wybór miasta/regionu
- ❌ Zapisywanie preferencji
- ❌ Filtrowanie po odległości

### 2.4 Wyszukiwarka
- ✅ UI pola wyszukiwania
- ❌ Logika wyszukiwania
- ❌ Autocomplete
- ❌ Historia wyszukiwań
- ❌ Filtry zaawansowane
- ❌ Sortowanie wyników

---

## Faza 3: User Features (Sprint 7-10) 👤

### 3.1 System Użytkowników
- ❌ Rejestracja
  - ❌ Formularz rejestracji
  - ❌ Walidacja danych
  - ❌ Email verification
  - ❌ Welcome flow
- ❌ Logowanie
  - ❌ Formularz logowania
  - ❌ Remember me
  - ❌ Forgot password
  - ❌ Reset password
- ❌ Profil użytkownika
  - ❌ Edycja danych
  - ❌ Avatar upload
  - ❌ Preferencje
  - ❌ Historia zakupów

### 3.2 System Ulubionych
- ✅ FavoritesProvider (podstawowy)
- ❌ Integracja z bazą danych
- ❌ Synchronizacja między urządzeniami
- ❌ Strona ulubionych
- ❌ Powiadomienia o zmianach cen

### 3.3 System Kuponów (Coupons)
- ❌ Zakup kuponu
  - ❌ Proces zakupu
  - ❌ Wybór wariantu (coupon_variants)
  - ❌ Podsumowanie
- ❌ Moje kupony
  - ❌ Lista aktywnych
  - ❌ Historia wykorzystanych
  - ❌ QR code generator
  - ❌ Sharing kuponu
- ❌ Realizacja kuponu
  - ❌ QR scanner (partner)
  - ❌ Weryfikacja kodu
  - ❌ Potwierdzenie wykorzystania

---

## Faza 4: Partner Features (Sprint 11-14) 🏪

### 4.1 Panel Partnera
- ❌ Dashboard
  - ❌ Statystyki sprzedaży
  - ❌ Wykresy i raporty
  - ❌ Ostatnie transakcje
- ❌ Zarządzanie promocjami
  - ❌ Lista promocji
  - ❌ Dodawanie/edycja
  - ❌ Upload zdjęć
  - ❌ Harmonogram publikacji
  - ❌ Limity i dostępność
- ❌ Zarządzanie lokalizacjami
  - ❌ Lista lokalizacji
  - ❌ Dodawanie/edycja
  - ❌ Godziny otwarcia
  - ❌ Mapy

### 4.2 Realizacja Kuponów
- ❌ Scanner QR
- ❌ Weryfikacja kodu kuponu
- ❌ Historia realizacji
- ❌ Raportowanie
- ❌ Aktualizacja statusu w bazie

### 4.3 Analityka Partnera
- ❌ Raporty sprzedaży
- ❌ Demografia klientów
- ❌ Popularność promocji
- ❌ ROI kalkulacje

---

## Faza 5: Płatności (Sprint 15-16) 💳

### 5.1 Integracja Płatności
- ❌ Stripe setup
- ❌ Przelewy24 integracja
- ❌ PayPal (opcjonalnie)
- ❌ Apple Pay / Google Pay
- ❌ Integracja z tabelą payments

### 5.2 Proces Płatności
- ❌ Koszyk
- ❌ Checkout flow
- ❌ Obsługa błędów
- ❌ Potwierdzenia email
- ❌ Faktury

### 5.3 Bezpieczeństwo
- ❌ PCI compliance
- ❌ Fraud detection
- ❌ Secure webhooks
- ❌ Refund handling

---

## Faza 6: Mapa i Lokalizacja (Sprint 17-18) 🗺️

### 6.1 Integracja Map
- 🚧 Podstawowa strona mapy
- ❌ Google Maps API
- ❌ Markery promocji
- ❌ Clustering
- ❌ Info windows
- ❌ Filtrowanie na mapie

### 6.2 Funkcje Lokalizacyjne
- ❌ Geolokalizacja
- ❌ Obliczanie odległości
- ❌ Nawigacja do partnera
- ❌ Obszary dostępności

---

## Faza 7: Komunikacja (Sprint 19-20) 📱

### 7.1 System Powiadomień
- ❌ Push notifications setup
- ❌ In-app notifications
- ❌ Email notifications
- ❌ SMS (opcjonalnie)
- ❌ Preferencje powiadomień

### 7.2 Typy Powiadomień
- ❌ Nowe promocje
- ❌ Kończące się vouchery
- ❌ Zmiany cen ulubionych
- ❌ Marketing campaigns

### 7.3 System Recenzji
- ❌ Dodawanie recenzji
- ❌ Oceny gwiazdkowe
- ❌ Zdjęcia w recenzjach
- ❌ Moderacja
- ❌ Odpowiedzi partnera

---

## Faza 8: Admin Panel (Sprint 21-22) 👨‍💼

### 8.1 Dashboard Admina
- ❌ Statystyki platformy
- ❌ KPIs i metryki
- ❌ Alerty systemowe

### 8.2 Zarządzanie
- ❌ Użytkownicy
- ❌ Partnerzy
- ❌ Promocje (moderacja)
- ❌ Kategorie
- ❌ Raporty

### 8.3 Narzędzia
- ❌ Content moderation
- ❌ Bulk operations
- ❌ Export danych
- ❌ System logs

---

## Faza 9: Optymalizacja (Sprint 23-24) ⚡

### 9.1 Performance
- ❌ Image optimization
- ❌ Code splitting
- ❌ Lazy loading
- ❌ Caching strategy
- ❌ CDN setup
- ❌ Database indexing

### 9.2 SEO
- ❌ Meta tags
- ❌ Sitemap
- ❌ Robots.txt
- ❌ Structured data
- ❌ Open Graph
- ❌ Performance metrics

### 9.3 PWA Features
- ❌ Service Worker
- ❌ Offline mode
- ❌ App manifest
- ❌ Install prompt
- ❌ Background sync

---

## Faza 10: Testing & QA (Sprint 25-26) 🧪

### 10.1 Testing Setup
- ❌ Jest configuration
- ❌ React Testing Library
- ❌ Playwright/Cypress
- ❌ CI/CD pipeline

### 10.2 Test Coverage
- ❌ Unit tests (80%+)
- ❌ Integration tests
- ❌ E2E tests
- ❌ Performance tests
- ❌ Security tests

### 10.3 QA Process
- ❌ Bug tracking
- ❌ User acceptance testing
- ❌ Cross-browser testing
- ❌ Mobile testing
- ❌ Accessibility audit

---

## Faza 11: Launch Preparation (Sprint 27-28) 🚀

### 11.1 Deployment
- ❌ Production environment
- ❌ Monitoring setup
- ❌ Backup strategy
- ❌ Disaster recovery
- ❌ Load balancing

### 11.2 Legal & Compliance
- ❌ Terms of Service
- ❌ Privacy Policy
- ❌ Cookie Policy
- ❌ GDPR compliance
- ❌ RODO compliance

### 11.3 Marketing
- ❌ Landing page
- ❌ App Store assets
- ❌ Social media
- ❌ Email campaigns
- ❌ Launch strategy

---

## Faza 12: Post-Launch (Sprint 29+) 📈

### 12.1 Monitoring
- ❌ Analytics dashboard
- ❌ Error tracking
- ❌ User feedback
- ❌ Performance monitoring

### 12.2 Iteracje
- ❌ Bug fixes
- ❌ Feature requests
- ❌ A/B testing
- ❌ Continuous improvement

### 12.3 Skalowanie
- ❌ Nowe miasta
- ❌ Nowi partnerzy
- ❌ Nowe kategorie
- ❌ Ekspansja funkcji

---

## 📅 Timeline

### Q3 2025 (Czerwiec - Wrzesień)
- **Sprint 1-4:** Fundament + początek Core Features
- **Milestone:** Działający prototyp z podstawowymi funkcjami

### Q4 2025 (Październik - Grudzień)
- **Sprint 5-16:** Core Features + User Features + Płatności
- **Milestone:** MVP gotowy do testów beta

### Q1 2026 (Styczeń - Marzec)
- **Sprint 17-28:** Pozostałe funkcje + Testing + Launch
- **Milestone:** Publiczny launch aplikacji

### Q2 2026 (Kwiecień - Czerwiec)
- **Sprint 29+:** Post-launch improvements
- **Milestone:** Stabilna wersja 1.0

---

## 🎯 Priorytety MVP

### Must Have (P0)
1. ❌ Integracja z Supabase (baza już istnieje)
2. ❌ Autentykacja użytkowników (Supabase Auth)
3. ❌ Przeglądanie ofert (offers)
4. ❌ System kuponów (coupons)
5. ❌ Płatności (Stripe)
6. ❌ Panel partnera (podstawowy)

### Should Have (P1)
1. ❌ System ulubionych
2. ❌ Wyszukiwarka
3. ❌ Kategorie
4. ❌ Lokalizacja

### Nice to Have (P2)
1. ❌ Recenzje
2. ❌ Powiadomienia push
3. ❌ Zaawansowana analityka
4. ❌ Social sharing

---

## 🚨 Ryzyka i Mitigacje

### Techniczne
- **Ryzyko:** Problemy z wydajnością przy dużej liczbie promocji
- **Mitigacja:** Implementacja paginacji i lazy loading od początku

### Biznesowe
- **Ryzyko:** Trudności w pozyskaniu partnerów
- **Mitigacja:** MVP z przykładowymi danymi, program early adopters

### Prawne
- **Ryzyko:** Zgodność z RODO/GDPR
- **Mitigacja:** Konsultacja prawna przed launch

---

## 📊 Metryki Sukcesu

### MVP (3 miesiące)
- [ ] 100 aktywnych użytkowników
- [ ] 10 partnerów
- [ ] 50 promocji
- [ ] 100 transakcji

### Rok 1
- [ ] 10,000 użytkowników
- [ ] 100 partnerów
- [ ] 1,000 promocji
- [ ] 10,000 transakcji

---

## 🔄 Proces Aktualizacji

Ten roadmap będzie aktualizowany:
- Co sprint (review postępów)
- Po każdym milestone
- Przy zmianach priorytetów biznesowych

Ostatnia aktualizacja: **Czerwiec 2025**