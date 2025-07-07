# API Design Pedro.pl

## Przegląd

API Pedro.pl wykorzystuje:
- **Next.js 13+ App Router** z Route Handlers
- **Supabase** jako backend (PostgreSQL + Auth + Realtime + Storage)
- **Prisma ORM** do komunikacji z bazą danych
- **TypeScript** dla type safety
- **Zod** do walidacji danych

## Architektura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│  Route Handlers │────▶│    Supabase     │
│   (Frontend)    │     │   (API Routes)  │     │   (Database)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   Prisma ORM    │
                        └─────────────────┘
```

## Supabase Client Setup

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseServer() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
```

## Struktura API

### Konwencje nazewnictwa

- **Endpoints**: `/api/[resource]/[action]`
- **HTTP Methods**: GET, POST, PUT, DELETE
- **Response format**: JSON
- **Status codes**: Standard HTTP status codes

### Główne endpointy

```
/api/auth/
├── register          POST   - Rejestracja użytkownika
├── login            POST   - Logowanie
├── logout           POST   - Wylogowanie
├── refresh          POST   - Odświeżenie tokenu
└── me               GET    - Dane zalogowanego użytkownika

/api/offers/
├── index            GET    - Lista ofert (z filtrowaniem)
├── [id]             GET    - Szczegóły oferty
├── create           POST   - Utworzenie oferty (partner)
├── [id]/update      PUT    - Aktualizacja oferty
└── [id]/delete      DELETE - Usunięcie oferty

/api/coupons/
├── index            GET    - Lista kuponów użytkownika
├── purchase         POST   - Zakup kuponu
├── [code]           GET    - Szczegóły kuponu
├── [code]/use       POST   - Wykorzystanie kuponu
└── [code]/cancel    POST   - Anulowanie kuponu

/api/partners/
├── index            GET    - Lista partnerów
├── [id]             GET    - Szczegóły partnera
├── register         POST   - Rejestracja partnera
├── [id]/offers      GET    - Oferty partnera
└── [id]/locations   GET    - Lokalizacje partnera

/api/categories/
├── index            GET    - Lista kategorii
└── [slug]/offers    GET    - Oferty w kategorii

/api/favorites/
├── index            GET    - Lista ulubionych
├── add              POST   - Dodanie do ulubionych
└── remove           DELETE - Usunięcie z ulubionych

/api/reviews/
├── offer/[id]       GET    - Recenzje oferty
├── partner/[id]     GET    - Recenzje partnera
├── create           POST   - Dodanie recenzji
└── [id]/update      PUT    - Aktualizacja recenzji

/api/payments/
├── create-intent    POST   - Utworzenie płatności
├── confirm          POST   - Potwierdzenie płatności
└── webhook          POST   - Webhook od Stripe
```

## Autentykacja i Autoryzacja

### Supabase Auth

```typescript
// Middleware dla protected routes
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Sprawdzenie autentykacji
  if (!session && req.nextUrl.pathname.startsWith('/api/protected')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return res
}
```

### Role-Based Access Control (RBAC)

```typescript
// lib/auth/rbac.ts
export async function checkRole(userId: string, requiredRole: string) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role:roles(name)')
    .eq('user_id', userId)
    .single()

  if (error || !data) return false
  return data.role.name === requiredRole
}

// Użycie w Route Handler
export async function POST(request: Request) {
  const session = await getSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const isPartner = await checkRole(session.user.id, 'PARTNER')
  
  if (!isPartner) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Logika dla partnera...
}
```

## Przykładowe Route Handlers

### GET /api/offers

```typescript
// app/api/offers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import { z } from 'zod'

const querySchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('20'),
  city_id: z.string().optional(),
  category_id: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['newest', 'price_asc', 'price_desc', 'discount']).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseServer()
    const { searchParams } = new URL(request.url)
    
    // Walidacja parametrów
    const params = querySchema.parse(Object.fromEntries(searchParams))
    const page = parseInt(params.page)
    const limit = parseInt(params.limit)
    const offset = (page - 1) * limit

    // Budowanie zapytania
    let query = supabase
      .from('offers')
      .select(`
        *,
        partner:partners(*),
        categories:offer_categories(category:categories(*)),
        images:offer_images(*),
        _count:coupons(count)
      `)
      .eq('deleted_at', null)
      .gte('end_date', new Date().toISOString())
      .eq('status_id', 1) // Active

    // Filtrowanie
    if (params.city_id) {
      query = query.eq('city_id', params.city_id)
    }

    if (params.category_id) {
      query = query.contains('categories', [{ category_id: params.category_id }])
    }

    if (params.search) {
      query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`)
    }

    // Sortowanie
    switch (params.sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'price_asc':
        query = query.order('price_discounted', { ascending: true })
        break
      case 'price_desc':
        query = query.order('price_discounted', { ascending: false })
        break
      case 'discount':
        query = query.order('discount_percent', { ascending: false })
        break
    }

    // Paginacja
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching offers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### POST /api/coupons/purchase

```typescript
// app/api/coupons/purchase/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import { z } from 'zod'
import { nanoid } from 'nanoid'

const purchaseSchema = z.object({
  offer_id: z.number(),
  variant_id: z.number().optional(),
  payment_method_id: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseServer()
    
    // Sprawdzenie autentykacji
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Walidacja danych
    const body = await request.json()
    const data = purchaseSchema.parse(body)

    // Pobranie oferty
    const { data: offer, error: offerError } = await supabase
      .from('offers')
      .select('*, partner:partners(*)')
      .eq('id', data.offer_id)
      .single()

    if (offerError || !offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    // Sprawdzenie dostępności
    if (offer.limit_coupons) {
      const { count } = await supabase
        .from('coupons')
        .select('*', { count: 'exact', head: true })
        .eq('offer_id', offer.id)

      if (count >= offer.limit_coupons) {
        return NextResponse.json({ error: 'Offer sold out' }, { status: 400 })
      }
    }

    // Rozpoczęcie transakcji
    const couponCode = nanoid(10).toUpperCase()
    
    // Utworzenie kuponu
    const { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .insert({
        offer_id: offer.id,
        user_id: session.user.id,
        code: couponCode,
        status_id: 1, // Active
        variant_id: data.variant_id,
        purchased_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // +90 dni
        price_at_purchase: offer.price_discounted,
        discount_percent_at_purchase: offer.discount_percent,
        offer_snapshot: offer,
      })
      .select()
      .single()

    if (couponError) {
      throw couponError
    }

    // Utworzenie płatności
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: session.user.id,
        coupon_id: coupon.id,
        offer_id: offer.id,
        partner_id: offer.partner_id,
        amount: offer.price_discounted,
        status: 'pending',
        payment_method: data.payment_method_id,
        payment_provider: 'stripe',
      })
      .select()
      .single()

    if (paymentError) {
      // Rollback - usuń kupon
      await supabase.from('coupons').delete().eq('id', coupon.id)
      throw paymentError
    }

    // Tutaj integracja ze Stripe...

    return NextResponse.json({
      coupon,
      payment,
      checkout_url: `/checkout/${payment.id}`,
    })
  } catch (error) {
    console.error('Error purchasing coupon:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Error Handling

### Standardowy format błędów

```typescript
interface ApiError {
  error: string
  message?: string
  details?: any
  code?: string
}

// Helper do obsługi błędów
export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error)

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: 'Validation error',
        details: error.errors,
      },
      { status: 400 }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    {
      error: 'Internal server error',
    },
    { status: 500 }
  )
}
```

## Rate Limiting

```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (res: NextResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= limit
        res.headers.set('X-RateLimit-Limit', limit.toString())
        res.headers.set(
          'X-RateLimit-Remaining',
          isRateLimited ? '0' : (limit - currentUsage).toString()
        )

        return isRateLimited ? reject() : resolve()
      }),
  }
}
```

## Caching

### Wykorzystanie Supabase Cache

```typescript
// Cachowanie na poziomie CDN
export async function GET(request: NextRequest) {
  const response = await fetchData()
  
  // Cache na 5 minut
  response.headers.set(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=600'
  )
  
  return response
}
```

### React Query dla client-side cache

```typescript
// hooks/useOffers.ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

export function useOffers(filters: OfferFilters) {
  return useQuery({
    queryKey: ['offers', filters],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        // ... filtry
        
      if (error) throw error
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minut
    cacheTime: 10 * 60 * 1000, // 10 minut
  })
}
```

## Websockets i Realtime

### Supabase Realtime

```typescript
// Nasłuchiwanie zmian w ofercie
useEffect(() => {
  const channel = supabase
    .channel('offer-updates')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'offers',
        filter: `id=eq.${offerId}`,
      },
      (payload) => {
        console.log('Offer updated:', payload)
        // Aktualizacja UI
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [offerId])
```

## Testing

### Przykładowy test API

```typescript
// __tests__/api/offers.test.ts
import { GET } from '@/app/api/offers/route'
import { createMockRequest } from '@/tests/utils'

describe('/api/offers', () => {
  it('should return paginated offers', async () => {
    const request = createMockRequest({
      url: '/api/offers?page=1&limit=10',
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('data')
    expect(data).toHaveProperty('pagination')
    expect(data.data).toBeInstanceOf(Array)
    expect(data.data.length).toBeLessThanOrEqual(10)
  })

  it('should filter by city', async () => {
    const request = createMockRequest({
      url: '/api/offers?city_id=1',
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    data.data.forEach((offer: any) => {
      expect(offer.city_id).toBe(1)
    })
  })
})
```

## Dokumentacja API

### OpenAPI/Swagger

```yaml
openapi: 3.0.0
info:
  title: Pedro.pl API
  version: 1.0.0
  description: API dla platformy promocji Pedro.pl

servers:
  - url: https://pedro.pl/api
    description: Production
  - url: http://localhost:3000/api
    description: Development

paths:
  /offers:
    get:
      summary: Lista ofert
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
        - name: city_id
          in: query
          schema:
            type: integer
        - name: category_id
          in: query
          schema:
            type: integer
      responses:
        200:
          description: Lista ofert
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Offer'
                  pagination:
                    $ref: '#/components/schemas/Pagination'

components:
  schemas:
    Offer:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        description:
          type: string
        price_original:
          type: number
        price_discounted:
          type: number
        discount_percent:
          type: number
```

## Best Practices

1. **Walidacja danych** - zawsze waliduj dane wejściowe używając Zod
2. **Error handling** - używaj try-catch i zwracaj odpowiednie kody błędów
3. **Autentykacja** - sprawdzaj sesję dla chronionych endpointów
4. **Rate limiting** - ogranicz liczbę requestów per user
5. **Logging** - loguj wszystkie błędy i ważne akcje
6. **Typing** - używaj TypeScript dla wszystkich endpointów
7. **Testing** - pisz testy jednostkowe i integracyjne
8. **Documentation** - dokumentuj wszystkie endpointy
9. **Security** - używaj CORS, helmet, i innych middleware bezpieczeństwa
10. **Performance** - używaj cache gdzie to możliwe