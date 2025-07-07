# Dokumentacja API Pedro.pl

## Przegląd

API Pedro.pl jest zbudowane w oparciu o REST z wykorzystaniem Next.js API Routes. Wszystkie endpointy zwracają dane w formacie JSON.

## Podstawowe informacje

### Base URL
```
Development: http://localhost:3000/api
Production: https://pedro.pl/api
```

### Autentykacja
```
Authorization: Bearer <token>
```

### Headers
```
Content-Type: application/json
Accept: application/json
X-Language: pl|en (opcjonalnie)
```

### Kody odpowiedzi
- `200` - Sukces
- `201` - Utworzono zasób
- `400` - Błędne żądanie
- `401` - Brak autoryzacji
- `403` - Brak dostępu
- `404` - Nie znaleziono
- `422` - Błąd walidacji
- `429` - Rate limit
- `500` - Błąd serwera

## Endpointy

### Autentykacja

#### POST /api/auth/register
Rejestracja nowego użytkownika

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "Jan Kowalski",
  "phone": "+48123456789"
}
```

**Response:**
```json
{
  "user": {
    "id": "clh3o4p5a0000qzrn5e3b7c9d",
    "email": "user@example.com",
    "name": "Jan Kowalski",
    "role": "USER"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### POST /api/auth/login
Logowanie użytkownika

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "clh3o4p5a0000qzrn5e3b7c9d",
    "email": "user@example.com",
    "name": "Jan Kowalski",
    "role": "USER"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### POST /api/auth/logout
Wylogowanie użytkownika

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

#### GET /api/auth/me
Pobranie danych zalogowanego użytkownika

**Response:**
```json
{
  "id": "clh3o4p5a0000qzrn5e3b7c9d",
  "email": "user@example.com",
  "name": "Jan Kowalski",
  "role": "USER",
  "preferredLanguage": "PL",
  "avatar": "https://..."
}
```

### Promocje

#### GET /api/promotions
Lista promocji z filtrowaniem i paginacją

**Query Parameters:**
- `page` (number) - Numer strony (default: 1)
- `limit` (number) - Ilość na stronę (default: 20, max: 100)
- `city` (string) - Filtruj po mieście
- `category` (string) - Filtruj po kategorii (slug)
- `search` (string) - Wyszukiwanie tekstowe
- `sort` (string) - Sortowanie: `popular`, `newest`, `price_asc`, `price_desc`, `discount`
- `lat` (number) - Szerokość geograficzna
- `lng` (number) - Długość geograficzna
- `radius` (number) - Promień w km (default: 10)

**Response:**
```json
{
  "data": [
    {
      "id": "clh3o4p5a0001qzrn5e3b7c9e",
      "title": "Pizza Margherita -50%",
      "description": "Pyszna pizza w promocyjnej cenie",
      "originalPrice": "35.00",
      "discountPrice": "17.50",
      "discountPercent": 50,
      "validFrom": "2024-01-01T00:00:00Z",
      "validTo": "2024-01-31T23:59:59Z",
      "category": {
        "id": "clh3o4p5a0002qzrn5e3b7c9f",
        "name": "Restauracje",
        "slug": "restauracje",
        "icon": "utensils"
      },
      "partner": {
        "id": "clh3o4p5a0003qzrn5e3b7ca0",
        "companyName": "Pizza Roma",
        "logo": "https://..."
      },
      "images": [
        {
          "url": "https://...",
          "alt": "Pizza Margherita"
        }
      ],
      "locations": [
        {
          "id": "clh3o4p5a0004qzrn5e3b7ca1",
          "name": "Pizza Roma Centrum",
          "address": "ul. Długa 1",
          "city": "Gdańsk",
          "distance": 2.5
        }
      ],
      "stats": {
        "vouchersSold": 150,
        "favoritesCount": 45,
        "averageRating": 4.5,
        "reviewsCount": 23
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### GET /api/promotions/:id
Szczegóły pojedynczej promocji

**Response:**
```json
{
  "id": "clh3o4p5a0001qzrn5e3b7c9e",
  "title": "Pizza Margherita -50%",
  "description": "Pyszna pizza w promocyjnej cenie",
  "terms": "Promocja ważna od poniedziałku do czwartku...",
  "originalPrice": "35.00",
  "discountPrice": "17.50",
  "discountPercent": 50,
  "validFrom": "2024-01-01T00:00:00Z",
  "validTo": "2024-01-31T23:59:59Z",
  "voucherLimit": 500,
  "vouchersSold": 150,
  "category": {
    "id": "clh3o4p5a0002qzrn5e3b7c9f",
    "name": "Restauracje",
    "slug": "restauracje",
    "icon": "utensils"
  },
  "partner": {
    "id": "clh3o4p5a0003qzrn5e3b7ca0",
    "companyName": "Pizza Roma",
    "description": "Najlepsza pizzeria w mieście",
    "logo": "https://...",
    "verified": true
  },
  "images": [
    {
      "id": "clh3o4p5a0005qzrn5e3b7ca2",
      "url": "https://...",
      "alt": "Pizza Margherita",
      "order": 0
    }
  ],
  "locations": [
    {
      "id": "clh3o4p5a0004qzrn5e3b7ca1",
      "name": "Pizza Roma Centrum",
      "address": "ul. Długa 1",
      "city": "Gdańsk",
      "postalCode": "80-001",
      "latitude": 54.3520,
      "longitude": 18.6466,
      "phone": "+48123456789",
      "openingHours": {
        "monday": { "open": "11:00", "close": "22:00" },
        "tuesday": { "open": "11:00", "close": "22:00" }
      }
    }
  ],
  "reviews": [
    {
      "id": "clh3o4p5a0006qzrn5e3b7ca3",
      "rating": 5,
      "comment": "Świetna pizza!",
      "verified": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "user": {
        "name": "Anna K.",
        "avatar": "https://..."
      }
    }
  ],
  "stats": {
    "favoritesCount": 45,
    "averageRating": 4.5,
    "reviewsCount": 23,
    "ratingDistribution": {
      "5": 15,
      "4": 5,
      "3": 2,
      "2": 1,
      "1": 0
    }
  }
}
```

#### GET /api/promotions/nearby
Promocje w pobliżu lokalizacji

**Query Parameters:**
- `lat` (number, required) - Szerokość geograficzna
- `lng` (number, required) - Długość geograficzna
- `radius` (number) - Promień w km (default: 5, max: 50)
- `limit` (number) - Ilość wyników (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "clh3o4p5a0001qzrn5e3b7c9e",
      "title": "Pizza Margherita -50%",
      "distance": 0.8,
      "location": {
        "name": "Pizza Roma Centrum",
        "address": "ul. Długa 1"
      }
    }
  ]
}
```

### Kategorie

#### GET /api/categories
Lista wszystkich kategorii

**Response:**
```json
{
  "data": [
    {
      "id": "clh3o4p5a0002qzrn5e3b7c9f",
      "name": "Restauracje",
      "slug": "restauracje",
      "icon": "utensils",
      "color": "#FF6B6B",
      "promotionsCount": 45
    },
    {
      "id": "clh3o4p5a0007qzrn5e3b7ca4",
      "name": "Uroda",
      "slug": "uroda",
      "icon": "sparkles",
      "color": "#C77DFF",
      "promotionsCount": 32
    }
  ]
}
```

### Ulubione

#### GET /api/favorites
Lista ulubionych promocji użytkownika

**Response:**
```json
{
  "data": [
    {
      "promotionId": "clh3o4p5a0001qzrn5e3b7c9e",
      "createdAt": "2024-01-15T10:30:00Z",
      "promotion": {
        "id": "clh3o4p5a0001qzrn5e3b7c9e",
        "title": "Pizza Margherita -50%",
        "discountPrice": "17.50",
        "validTo": "2024-01-31T23:59:59Z"
      }
    }
  ]
}
```

#### POST /api/favorites
Dodaj do ulubionych

**Request:**
```json
{
  "promotionId": "clh3o4p5a0001qzrn5e3b7c9e"
}
```

**Response:**
```json
{
  "message": "Added to favorites",
  "favorite": {
    "userId": "clh3o4p5a0000qzrn5e3b7c9d",
    "promotionId": "clh3o4p5a0001qzrn5e3b7c9e",
    "createdAt": "2024-01-20T14:30:00Z"
  }
}
```

#### DELETE /api/favorites/:promotionId
Usuń z ulubionych

**Response:**
```json
{
  "message": "Removed from favorites"
}
```

### Vouchery/Kupony

#### POST /api/vouchers/purchase
Zakup vouchera

**Request:**
```json
{
  "promotionId": "clh3o4p5a0001qzrn5e3b7c9e",
  "quantity": 1,
  "paymentMethod": "card"
}
```

**Response:**
```json
{
  "voucher": {
    "id": "clh3o4p5a0008qzrn5e3b7ca5",
    "code": "PEDRO-A1B2C3D4",
    "promotion": {
      "title": "Pizza Margherita -50%",
      "discountPrice": "17.50"
    },
    "purchasedAt": "2024-01-20T14:30:00Z",
    "expiresAt": "2024-01-31T23:59:59Z",
    "status": "ACTIVE"
  },
  "paymentUrl": "https://payment-gateway.com/..."
}
```

#### GET /api/vouchers
Lista voucherów użytkownika

**Query Parameters:**
- `status` (string) - Filtruj po statusie: `active`, `used`, `expired`

**Response:**
```json
{
  "data": [
    {
      "id": "clh3o4p5a0008qzrn5e3b7ca5",
      "code": "PEDRO-A1B2C3D4",
      "status": "ACTIVE",
      "purchasedAt": "2024-01-20T14:30:00Z",
      "expiresAt": "2024-01-31T23:59:59Z",
      "promotion": {
        "id": "clh3o4p5a0001qzrn5e3b7c9e",
        "title": "Pizza Margherita -50%",
        "partner": {
          "companyName": "Pizza Roma"
        }
      }
    }
  ]
}
```

#### GET /api/vouchers/:code
Szczegóły vouchera

**Response:**
```json
{
  "id": "clh3o4p5a0008qzrn5e3b7ca5",
  "code": "PEDRO-A1B2C3D4",
  "status": "ACTIVE",
  "purchasedAt": "2024-01-20T14:30:00Z",
  "expiresAt": "2024-01-31T23:59:59Z",
  "qrCode": "data:image/png;base64,...",
  "promotion": {
    "id": "clh3o4p5a0001qzrn5e3b7c9e",
    "title": "Pizza Margherita -50%",
    "terms": "Promocja ważna od poniedziałku do czwartku...",
    "partner": {
      "companyName": "Pizza Roma",
      "locations": [
        {
          "name": "Pizza Roma Centrum",
          "address": "ul. Długa 1",
          "phone": "+48123456789"
        }
      ]
    }
  }
}
```

### Recenzje

#### POST /api/reviews
Dodaj recenzję

**Request:**
```json
{
  "promotionId": "clh3o4p5a0001qzrn5e3b7c9e",
  "rating": 5,
  "comment": "Świetna pizza, polecam!"
}
```

**Response:**
```json
{
  "id": "clh3o4p5a0009qzrn5e3b7ca6",
  "rating": 5,
  "comment": "Świetna pizza, polecam!",
  "verified": true,
  "createdAt": "2024-01-20T15:00:00Z",
  "user": {
    "name": "Jan K.",
    "avatar": "https://..."
  }
}
```

#### GET /api/reviews/:promotionId
Lista recenzji dla promocji

**Query Parameters:**
- `page` (number) - Numer strony
- `limit` (number) - Ilość na stronę
- `sort` (string) - Sortowanie: `newest`, `oldest`, `rating_high`, `rating_low`

**Response:**
```json
{
  "data": [
    {
      "id": "clh3o4p5a0009qzrn5e3b7ca6",
      "rating": 5,
      "comment": "Świetna pizza, polecam!",
      "verified": true,
      "createdAt": "2024-01-20T15:00:00Z",
      "user": {
        "name": "Jan K.",
        "avatar": "https://..."
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 23
  }
}
```

### Lokalizacje

#### GET /api/locations/cities
Lista dostępnych miast

**Response:**
```json
{
  "data": [
    {
      "name": "Gdańsk",
      "promotionsCount": 234
    },
    {
      "name": "Warszawa",
      "promotionsCount": 567
    },
    {
      "name": "Kraków",
      "promotionsCount": 345
    }
  ]
}
```

### Powiadomienia

#### GET /api/notifications
Lista powiadomień użytkownika

**Query Parameters:**
- `unread` (boolean) - Tylko nieprzeczytane

**Response:**
```json
{
  "data": [
    {
      "id": "clh3o4p5a000aqzrn5e3b7ca7",
      "type": "VOUCHER_EXPIRING",
      "title": "Voucher wkrótce wygaśnie",
      "message": "Twój voucher na Pizza Margherita wygaśnie za 3 dni",
      "read": false,
      "createdAt": "2024-01-28T10:00:00Z",
      "data": {
        "voucherId": "clh3o4p5a0008qzrn5e3b7ca5",
        "promotionId": "clh3o4p5a0001qzrn5e3b7c9e"
      }
    }
  ]
}
```

#### PUT /api/notifications/:id/read
Oznacz powiadomienie jako przeczytane

**Response:**
```json
{
  "message": "Notification marked as read"
}
```

## Obsługa błędów

### Format błędu
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Kody błędów
- `VALIDATION_ERROR` - Błąd walidacji danych
- `AUTHENTICATION_ERROR` - Błąd autentykacji
- `AUTHORIZATION_ERROR` - Brak uprawnień
- `NOT_FOUND` - Zasób nie istnieje
- `CONFLICT` - Konflikt (np. duplikat)
- `RATE_LIMIT` - Przekroczono limit zapytań
- `SERVER_ERROR` - Błąd serwera

## Rate Limiting

- **Niezalogowani:** 60 requests/minute
- **Zalogowani:** 300 requests/minute
- **Partner API:** 600 requests/minute

Headers w odpowiedzi:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1642680000
```

## Webhooks (dla partnerów)

### Voucher Used
```json
{
  "event": "voucher.used",
  "data": {
    "voucherId": "clh3o4p5a0008qzrn5e3b7ca5",
    "code": "PEDRO-A1B2C3D4",
    "usedAt": "2024-01-25T18:30:00Z",
    "promotion": {
      "id": "clh3o4p5a0001qzrn5e3b7c9e",
      "title": "Pizza Margherita -50%"
    }
  }
}
```

### Review Added
```json
{
  "event": "review.added",
  "data": {
    "reviewId": "clh3o4p5a0009qzrn5e3b7ca6",
    "promotionId": "clh3o4p5a0001qzrn5e3b7c9e",
    "rating": 5
  }
}
```

## SDK/Przykłady

### JavaScript/TypeScript
```typescript
import { PedroAPI } from '@pedro/sdk';

const api = new PedroAPI({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Pobierz promocje
const promotions = await api.promotions.list({
  city: 'Gdańsk',
  category: 'restauracje',
  limit: 20
});

// Kup voucher
const voucher = await api.vouchers.purchase({
  promotionId: 'clh3o4p5a0001qzrn5e3b7c9e',
  quantity: 1
});
```

### cURL
```bash
# Pobierz promocje
curl -X GET "https://pedro.pl/api/promotions?city=Gdańsk&limit=10" \
  -H "Accept: application/json"

# Dodaj do ulubionych (wymaga autentykacji)
curl -X POST "https://pedro.pl/api/favorites" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"promotionId":"clh3o4p5a0001qzrn5e3b7c9e"}'
```