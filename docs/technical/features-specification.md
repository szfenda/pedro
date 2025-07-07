# Specyfikacja Funkcjonalności Pedro.pl

## 1. Odkrywanie Promocji (Discover)

### Opis
Główny ekran aplikacji prezentujący najciekawsze promocje w wybranej lokalizacji.

### Komponenty
- **CitySelector** - Wybór miasta (górna część ekranu)
- **SearchBar** - Wyszukiwarka promocji
- **CategorySection** - Sekcja z kategoriami
- **PopularPromotions** - Popularne promocje
- **PromotionCard** - Karty promocji

### User Stories
1. **Jako użytkownik** chcę widzieć promocje w moim mieście, aby znaleźć najlepsze oferty w pobliżu
2. **Jako użytkownik** chcę wyszukiwać promocje po nazwie, aby szybko znaleźć interesującą mnie ofertę
3. **Jako użytkownik** chcę przeglądać promocje według kategorii, aby zobaczyć oferty z interesującej mnie branży

### Wymagania funkcjonalne
- [ ] Wyświetlanie listy promocji dla wybranego miasta
- [ ] Filtrowanie promocji po kategorii
- [ ] Wyszukiwanie tekstowe promocji
- [ ] Sortowanie promocji (popularność, cena, rabat)
- [ ] Infinite scroll lub paginacja
- [ ] Pull-to-refresh na urządzeniach mobilnych

### Stan implementacji
- ✅ Podstawowe wyświetlanie promocji
- ✅ Wybór miasta
- ✅ Kategorie (wizualne)
- ❌ Wyszukiwarka (tylko UI)
- ❌ Filtrowanie i sortowanie
- ❌ Dane z API

## 2. Kategorie (Categories)

### Opis
Ekran z listą wszystkich dostępnych kategorii promocji.

### Kategorie
1. **Restauracje** - Jedzenie, kawiarnie, bary
2. **Uroda** - Salony kosmetyczne, fryzjerzy, SPA
3. **Zdrowie** - Przychodnie, dentyści, fizjoterapia
4. **Rozrywka** - Kino, teatr, koncerty, wydarzenia
5. **Zakupy** - Sklepy, centra handlowe, outlet
6. **Sport** - Siłownie, baseny, zajęcia sportowe
7. **Edukacja** - Kursy, szkolenia, korepetycje
8. **Podróże** - Hotele, wycieczki, transport

### User Stories
1. **Jako użytkownik** chcę przeglądać wszystkie kategorie, aby odkryć nowe rodzaje promocji
2. **Jako użytkownik** chcę widzieć liczbę promocji w każdej kategorii, aby wiedzieć gdzie jest najwięcej ofert

### Wymagania funkcjonalne
- [ ] Lista wszystkich kategorii z ikonami
- [ ] Licznik aktywnych promocji w kategorii
- [ ] Przekierowanie do filtrowanej listy promocji
- [ ] Możliwość wyszukiwania kategorii

### Stan implementacji
- ✅ Strona kategorii (routing)
- ❌ Lista kategorii
- ❌ Liczniki promocji
- ❌ Funkcjonalność filtrowania

## 3. Mapa Promocji (Map)

### Opis
Interaktywna mapa pokazująca lokalizacje promocji w wybranym mieście.

### Funkcjonalności
- **Markery promocji** - Pinezki na mapie
- **Clustering** - Grupowanie bliskich promocji
- **Szczegóły promocji** - Popup z informacjami
- **Filtrowanie** - Pokazywanie tylko wybranych kategorii
- **Geolokalizacja** - Pokazanie pozycji użytkownika

### User Stories
1. **Jako użytkownik** chcę widzieć promocje na mapie, aby znaleźć oferty blisko mnie
2. **Jako użytkownik** chcę kliknąć w marker, aby zobaczyć szczegóły promocji
3. **Jako użytkownik** chcę widzieć swoją lokalizację, aby ocenić odległość do promocji

### Wymagania funkcjonalne
- [ ] Integracja z Google Maps / OpenStreetMap
- [ ] Wyświetlanie markerów promocji
- [ ] Clustering dla dużej liczby markerów
- [ ] Popup z podstawowymi informacjami
- [ ] Przycisk "Nawiguj" do lokalizacji
- [ ] Filtrowanie po kategoriach na mapie

### Stan implementacji
- ✅ Strona mapy (routing)
- ❌ Integracja z mapami
- ❌ Markery i clustering
- ❌ Interakcje z mapą

## 4. Ulubione (Favorites)

### Opis
Lista promocji zapisanych przez użytkownika jako ulubione.

### Funkcjonalności
- **Lista ulubionych** - Zapisane promocje
- **Zarządzanie** - Dodawanie/usuwanie z ulubionych
- **Synchronizacja** - Między urządzeniami (po zalogowaniu)
- **Powiadomienia** - O kończących się promocjach

### User Stories
1. **Jako użytkownik** chcę zapisywać interesujące promocje, aby wrócić do nich później
2. **Jako użytkownik** chcę otrzymać powiadomienie, gdy ulubiona promocja się kończy
3. **Jako użytkownik** chcę mieć dostęp do ulubionych na wszystkich urządzeniach

### Wymagania funkcjonalne
- [ ] Przycisk serca na karcie promocji
- [ ] Lista ulubionych promocji
- [ ] Local storage dla niezalogowanych
- [ ] Synchronizacja dla zalogowanych
- [ ] Powiadomienia push (opcjonalne)

### Stan implementacji
- ✅ Context Provider dla ulubionych
- ✅ Podstawowa funkcjonalność dodawania
- ✅ Local storage
- ❌ Synchronizacja z backendem
- ❌ Powiadomienia

## 5. Więcej (More)

### Opis
Menu z dodatkowymi opcjami i ustawieniami aplikacji.

### Sekcje
1. **Zarządzanie Kontem**
   - Dane konta
   - Karty płatnicze
   - Vouchery
   - Bonusy-niespodzianki

2. **Społeczność**
   - Zaproś znajomych
   - Poleć miejsce
   - Zarejestruj lokal

3. **Wsparcie**
   - Pomoc z zamówieniem
   - Funkcjonalność aplikacji
   - FAQ

4. **Ustawienia**
   - Język aplikacji
   - Powiadomienia
   - Prywatność

### User Stories
1. **Jako użytkownik** chcę zarządzać swoim kontem, aby aktualizować dane
2. **Jako partner** chcę zarejestrować swój lokal, aby dodawać promocje
3. **Jako użytkownik** chcę zmienić język aplikacji, aby korzystać w preferowanym języku

### Wymagania funkcjonalne
- [ ] System logowania/rejestracji
- [ ] Profil użytkownika
- [ ] Zmiana języka (PL/EN)
- [ ] Zarządzanie powiadomieniami
- [ ] Formularz rejestracji lokalu
- [ ] System poleceń

### Stan implementacji
- ✅ Strona "Więcej" (routing)
- ✅ Zmiana języka (LanguageProvider)
- ❌ System użytkowników
- ❌ Pozostałe funkcjonalności

## 6. Szczegóły Promocji (Promotion Details)

### Opis
Strona ze szczegółowymi informacjami o wybranej promocji.

### Elementy
- **Galeria zdjęć** - Karuzela obrazów
- **Informacje podstawowe** - Tytuł, opis, ceny
- **Warunki** - Szczegółowe zasady promocji
- **Lokalizacja** - Adres i mini-mapa
- **Godziny otwarcia** - Harmonogram
- **Recenzje** - Opinie użytkowników
- **Przyciski akcji** - Kup/Zarezerwuj/Zadzwoń

### User Stories
1. **Jako użytkownik** chcę zobaczyć wszystkie szczegóły promocji, aby podjąć decyzję o zakupie
2. **Jako użytkownik** chcę przeczytać recenzje, aby ocenić jakość oferty
3. **Jako użytkownik** chcę łatwo kupić kupon lub zarezerwować usługę

### Wymagania funkcjonalne
- [ ] Dynamiczne routowanie `/promotion/[id]`
- [ ] Galeria zdjęć z lazy loading
- [ ] Integracja z mapą
- [ ] System recenzji i ocen
- [ ] Przyciski Call-to-Action
- [ ] Sharing promocji

### Stan implementacji
- ✅ Routing dla promocji
- ❌ Strona szczegółów
- ❌ Galeria i multimedia
- ❌ System recenzji

## 7. System Wyszukiwania

### Opis
Zaawansowane wyszukiwanie promocji z filtrami i sugestiami.

### Funkcjonalności
- **Wyszukiwanie tekstowe** - Po nazwie, opisie
- **Filtry** - Kategoria, cena, rabat, odległość
- **Sortowanie** - Różne kryteria
- **Historia** - Ostatnie wyszukiwania
- **Sugestie** - Podpowiedzi podczas pisania

### Wymagania funkcjonalne
- [ ] Elasticsearch lub podobne rozwiązanie
- [ ] Debouncing dla sugestii
- [ ] Zapisywanie historii wyszukiwań
- [ ] Zaawansowane filtry
- [ ] Wyszukiwanie głosowe (opcjonalne)

### Stan implementacji
- ✅ UI paska wyszukiwania
- ❌ Backend wyszukiwania
- ❌ Filtry i sortowanie
- ❌ Historia i sugestie

## 8. System Powiadomień

### Opis
Powiadomienia push i in-app o nowych promocjach i wydarzeniach.

### Typy powiadomień
1. **Nowe promocje** - W ulubionych kategoriach
2. **Kończące się oferty** - Dla ulubionych
3. **Promocje w pobliżu** - Bazując na lokalizacji
4. **Przypomnienia** - O zarezerwowanych usługach

### Wymagania funkcjonalne
- [ ] Service Worker dla PWA
- [ ] Push API integration
- [ ] In-app notification center
- [ ] Ustawienia powiadomień
- [ ] Quiet hours

### Stan implementacji
- ❌ Service Worker
- ❌ Push notifications
- ❌ Notification center

## 9. Progressive Web App (PWA)

### Opis
Funkcjonalności pozwalające na instalację aplikacji na urządzeniu.

### Funkcjonalności
- **Instalacja** - Add to Home Screen
- **Offline** - Podstawowa funkcjonalność offline
- **Synchronizacja** - Background sync
- **Cache** - Inteligentne cachowanie

### Wymagania
- [ ] Web App Manifest
- [ ] Service Worker
- [ ] Offline fallback pages
- [ ] Cache strategies
- [ ] Background sync

### Stan implementacji
- ✅ Manifest.json
- ✅ Meta tagi dla iOS
- ✅ Ikony aplikacji
- ❌ Service Worker
- ❌ Offline functionality

## 10. Analityka i Monitoring

### Opis
System zbierania danych o zachowaniu użytkowników.

### Metryki
- **Engagement** - Czas w aplikacji, bounce rate
- **Konwersje** - Zakupy kuponów
- **Popularne kategorie** - Najczęściej przeglądane
- **Ścieżki użytkownika** - User flow

### Wymagania
- [ ] Google Analytics 4
- [ ] Custom events tracking
- [ ] Heatmapy (Hotjar)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring

### Stan implementacji
- ❌ Analytics setup
- ❌ Event tracking
- ❌ Error monitoring