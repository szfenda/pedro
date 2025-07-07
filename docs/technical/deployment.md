# Deployment Guide Pedro.pl

## Przegląd

Pedro.pl wykorzystuje następującą infrastrukturę:
- **Frontend & API**: Vercel (Next.js hosting)
- **Database & Backend**: Supabase (PostgreSQL + Auth + Storage)
- **CDN**: Cloudflare
- **Monitoring**: Vercel Analytics + Sentry

## Środowiska

### Development
- **URL**: http://localhost:3000
- **Database**: Supabase (development project)
- **Branch**: `develop`

### Staging
- **URL**: https://staging.pedro.pl
- **Database**: Supabase (staging project)
- **Branch**: `staging`

### Production
- **URL**: https://pedro.pl
- **Database**: Supabase (production project)
- **Branch**: `main`

## Konfiguracja Supabase

### 1. Projekt Supabase (✅ Już utworzony)

Baza danych jest już utworzona w Supabase. Potrzebne kroki:

1. **Pobranie credentials**:
   ```bash
   # Z dashboard Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-key
   ```

2. **Konfiguracja RLS (Row Level Security)**:
   ```sql
   -- Przykład dla tabeli offers
   ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

   -- Policy: Wszyscy mogą czytać aktywne oferty
   CREATE POLICY "Public can view active offers" ON offers
     FOR SELECT USING (
       deleted_at IS NULL 
       AND status_id = 1 
       AND end_date >= NOW()
     );

   -- Policy: Partnerzy mogą edytować swoje oferty
   CREATE POLICY "Partners can manage own offers" ON offers
     FOR ALL USING (
       auth.uid() IN (
         SELECT user_id FROM partners WHERE id = offers.partner_id
       )
     );
   ```

3. **Storage buckets**:
   ```sql
   -- Utworzenie bucketów
   INSERT INTO storage.buckets (id, name, public)
   VALUES 
     ('offers', 'offers', true),
     ('partners', 'partners', true),
     ('avatars', 'avatars', true);
   ```

## Konfiguracja Vercel

### 1. Import projektu

```bash
# Instalacja Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### 2. Environment Variables

W Vercel Dashboard dodaj:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Email (SendGrid)
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# Push Notifications
ONESIGNAL_APP_ID=
ONESIGNAL_API_KEY=

# Sentry
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# App
NEXT_PUBLIC_APP_URL=https://pedro.pl
```

### 3. Build Settings

```json
{
  "buildCommand": "prisma generate && next build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## Prisma Setup

### 1. Introspection z Supabase

```bash
# Ustaw DATABASE_URL w .env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Introspection - wygeneruj schema z istniejącej bazy
npx prisma db pull

# Generuj Prisma Client
npx prisma generate
```

### 2. Prisma schema adjustments

Po introspection, dostosuj schema.prisma:

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["multiSchema"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  schemas  = ["public", "auth"]
}

// Modele wygenerowane automatycznie...
```

## CI/CD Pipeline

### GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  deploy-preview:
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Monitoring & Logging

### 1. Vercel Analytics

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 2. Sentry Error Tracking

```tsx
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})
```

### 3. Supabase Monitoring

W Supabase Dashboard monitoruj:
- Database performance
- API usage
- Auth events
- Storage bandwidth

## Security Checklist

### Pre-deployment

- [ ] Environment variables są ustawione
- [ ] RLS policies są skonfigurowane
- [ ] CORS jest poprawnie ustawiony
- [ ] Rate limiting jest włączony
- [ ] SSL/TLS jest aktywny
- [ ] Security headers są ustawione

### Vercel Security Headers

`next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

## Backup & Recovery

### Database Backup

Supabase automatycznie wykonuje:
- Daily backups (30 dni retencji)
- Point-in-time recovery (do 7 dni)

### Manual Backup

```bash
# Export bazy
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Import bazy
psql $DATABASE_URL < backup.sql
```

## Performance Optimization

### 1. Edge Functions

Dla krytycznych endpointów użyj Edge Runtime:

```typescript
// app/api/offers/route.ts
export const runtime = 'edge'

export async function GET(request: Request) {
  // Edge function code
}
```

### 2. ISR (Incremental Static Regeneration)

```typescript
// app/offers/[id]/page.tsx
export const revalidate = 3600 // 1 hour

export default async function OfferPage({ params }) {
  // Page will be regenerated every hour
}
```

### 3. Image Optimization

```tsx
import Image from 'next/image'

<Image
  src={offer.image_url}
  alt={offer.title}
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={offer.blur_data_url}
  priority={isAboveFold}
/>
```

## Rollback Strategy

### Vercel Instant Rollback

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Database Rollback

W Supabase Dashboard:
1. Go to Settings > Database
2. Click "Restore"
3. Select point in time
4. Confirm restore

## Post-Deployment

### 1. Smoke Tests

```bash
# Health check
curl https://pedro.pl/api/health

# Critical paths
npm run test:e2e:production
```

### 2. Monitor Metrics

- Response times < 200ms (p95)
- Error rate < 0.1%
- Uptime > 99.9%
- Core Web Vitals in green

### 3. SEO Verification

- Robots.txt accessible
- Sitemap.xml generated
- Meta tags present
- Open Graph tags working

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node version compatibility
   - Clear cache: `vercel --force`
   - Check environment variables

2. **Database Connection**
   - Verify DATABASE_URL format
   - Check SSL requirements
   - Confirm IP whitelisting

3. **Performance Issues**
   - Enable Vercel Analytics
   - Check bundle size
   - Review database queries

### Debug Mode

```env
# .env.local
DEBUG=true
NEXT_PUBLIC_DEBUG=true
```

## Maintenance Mode

`middleware.ts`:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'
  
  if (isMaintenanceMode && !request.nextUrl.pathname.startsWith('/maintenance')) {
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}