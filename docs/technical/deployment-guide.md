# Przewodnik Wdrożenia Pedro.pl

## Środowiska

### Development
- **URL:** http://localhost:3000
- **Baza:** PostgreSQL lokalnie lub Docker
- **Branch:** `develop`

### Staging
- **URL:** https://staging.pedro.pl
- **Baza:** Supabase (staging project)
- **Branch:** `staging`

### Production
- **URL:** https://pedro.pl
- **Baza:** Supabase (production project)
- **Branch:** `main`

## Wymagania wstępne

### Narzędzia
- Node.js 18.17+ (LTS)
- npm/yarn/pnpm
- Git
- PostgreSQL 14+
- Redis (opcjonalnie)

### Konta/Dostępy
- GitHub repository access
- Vercel account
- Supabase account
- Domain registrar (dla DNS)
- Cloudflare account (CDN)

## Zmienne środowiskowe

### .env.local (Development)
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pedro_dev"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# External APIs
GOOGLE_MAPS_API_KEY="your-google-maps-key"
SENDGRID_API_KEY="your-sendgrid-key"

# Storage
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_KEY="your-service-key"

# Payment
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
PRZELEWY24_MERCHANT_ID="..."
PRZELEWY24_POS_ID="..."
PRZELEWY24_CRC="..."

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
SENTRY_DSN="https://..."
```

### .env.production
```bash
# Production values - stored in Vercel
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://pedro.pl"
# ... pozostałe zmienne produkcyjne
```

## Proces deploymentu

### 1. Przygotowanie kodu

```bash
# Upewnij się, że jesteś na właściwym branchu
git checkout main

# Pobierz najnowsze zmiany
git pull origin main

# Uruchom testy
npm run test

# Build lokalnie dla weryfikacji
npm run build

# Sprawdź linting
npm run lint
```

### 2. Migracje bazy danych

```bash
# Generuj migrację (jeśli potrzebna)
npx prisma migrate dev --name nazwa_migracji

# Deploy migracji na staging
DATABASE_URL=$STAGING_DATABASE_URL npx prisma migrate deploy

# Po weryfikacji, deploy na produkcję
DATABASE_URL=$PRODUCTION_DATABASE_URL npx prisma migrate deploy
```

### 3. Deploy na Vercel

#### Automatyczny (zalecany)
```bash
# Push do main trigguje auto-deploy
git push origin main
```

#### Manualny
```bash
# Instalacja Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 4. Post-deployment

```bash
# Weryfikacja deploymentu
curl https://pedro.pl/api/health

# Sprawdzenie logów
vercel logs pedro.pl

# Monitoring
# Sprawdź Sentry dla błędów
# Sprawdź Analytics dla ruchu
```

## CI/CD Pipeline

### GitHub Actions (.github/workflows/deploy.yml)
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Konfiguracja infrastruktury

### Vercel

1. **Project Settings**
   ```
   Framework Preset: Next.js
   Node.js Version: 18.x
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm ci
   ```

2. **Environment Variables**
   - Dodaj wszystkie zmienne z `.env.production`
   - Ustaw różne wartości dla Preview i Production

3. **Domains**
   - pedro.pl (production)
   - staging.pedro.pl (staging)
   - preview-*.pedro.pl (preview deployments)

### Supabase

1. **Database Setup**
   ```sql
   -- Enable extensions
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE EXTENSION IF NOT EXISTS "postgis";
   
   -- Run Prisma migrations
   npx prisma migrate deploy
   ```

2. **Row Level Security**
   ```sql
   -- Example RLS policy
   CREATE POLICY "Users can view own data" ON users
   FOR SELECT USING (auth.uid() = id);
   ```

3. **Backup Configuration**
   - Daily backups at 3 AM
   - 30-day retention
   - Point-in-time recovery enabled

### Cloudflare

1. **DNS Configuration**
   ```
   Type  Name    Content
   A     @       76.76.21.21 (Vercel IP)
   A     www     76.76.21.21 (Vercel IP)
   CNAME staging staging.vercel.app
   ```

2. **Page Rules**
   - Cache Level: Standard
   - Browser Cache TTL: 4 hours
   - Always Use HTTPS: On

3. **Security**
   - SSL/TLS: Full (strict)
   - Auto Minify: HTML, CSS, JS
   - Brotli: On

## Monitoring

### Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    
    // Check Redis (if used)
    // await redis.ping();
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message
    }, { status: 503 });
  }
}
```

### Uptime Monitoring
- **UptimeRobot** lub **Pingdom**
- Check every 5 minutes
- Alert via email/SMS/Slack

### Application Monitoring
- **Sentry** - Error tracking
- **Vercel Analytics** - Performance metrics
- **Google Analytics** - User behavior

## Rollback Procedure

### Szybki rollback

1. **Vercel Dashboard**
   - Go to Deployments
   - Find previous stable deployment
   - Click "..." → "Promote to Production"

2. **CLI**
   ```bash
   # List deployments
   vercel ls
   
   # Rollback to specific deployment
   vercel rollback [deployment-url]
   ```

### Database rollback

```bash
# Revert last migration
npx prisma migrate resolve --rolled-back

# Restore from backup (Supabase)
# Use Supabase dashboard → Database → Backups
```

## Security Checklist

### Pre-deployment
- [ ] Wszystkie secrets są w zmiennych środowiskowych
- [ ] Brak hardcoded credentials
- [ ] Dependencies są aktualne (`npm audit`)
- [ ] CORS jest poprawnie skonfigurowany
- [ ] Rate limiting jest włączony
- [ ] Input validation działa

### Post-deployment
- [ ] HTTPS działa poprawnie
- [ ] Security headers są ustawione
- [ ] Robots.txt jest skonfigurowany
- [ ] Sitemap.xml jest dostępny
- [ ] Error pages (404, 500) działają

## Troubleshooting

### Build failures

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build

# Check for type errors
npm run type-check

# Verify environment variables
vercel env pull
```

### Performance issues

```bash
# Analyze bundle size
npm run analyze

# Check for large dependencies
npx depcheck

# Profile production build
npm run build -- --profile
```

### Database issues

```bash
# Check connection
npx prisma db pull

# Reset database (CAREFUL!)
npx prisma migrate reset

# Generate fresh client
npx prisma generate
```

## Maintenance Mode

### Włączenie
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return NextResponse.rewrite(new URL('/maintenance', request.url));
  }
}
```

### Strona maintenance
```tsx
// app/maintenance/page.tsx
export default function MaintenancePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1>Przeprowadzamy prace konserwacyjne</h1>
        <p>Wrócimy wkrótce!</p>
      </div>
    </div>
  );
}
```

## Backup & Disaster Recovery

### Backup Strategy
1. **Database**: Daily automated backups (Supabase)
2. **Code**: Git repository (GitHub)
3. **Media**: Object storage with versioning
4. **Configs**: Encrypted backup of env variables

### Recovery Time Objectives
- **RTO**: < 1 hour
- **RPO**: < 24 hours

### Disaster Recovery Plan
1. Identify issue
2. Communicate with team
3. Execute rollback if needed
4. Restore from backups
5. Verify functionality
6. Post-mortem analysis

## Skalowanie

### Vertical Scaling (Vercel)
- Automatic based on traffic
- No manual intervention needed

### Horizontal Scaling
- Database: Read replicas (Supabase)
- Caching: Redis for sessions
- CDN: Cloudflare for static assets

### Performance Optimization
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.pedro.pl'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
}
```