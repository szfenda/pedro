# Strategia Testowania Pedro.pl

## Przegląd

Strategia testowania Pedro.pl opiera się na piramidzie testów z naciskiem na testy jednostkowe i integracyjne. Celem jest osiągnięcie minimum 80% pokrycia kodu krytycznego dla biznesu.

## Typy testów

### 1. Testy jednostkowe (Unit Tests)
**Cel:** Testowanie pojedynczych funkcji i komponentów w izolacji

**Narzędzia:**
- Jest
- React Testing Library
- MSW (Mock Service Worker)

**Pokrycie:**
- Funkcje pomocnicze (utils)
- Hooks
- Komponenty React
- Reducery i akcje

### 2. Testy integracyjne (Integration Tests)
**Cel:** Testowanie interakcji między komponentami i API

**Narzędzia:**
- Jest
- React Testing Library
- Supertest (dla API)

**Pokrycie:**
- API endpoints
- Formularze
- Flow użytkownika
- Context providers

### 3. Testy E2E (End-to-End Tests)
**Cel:** Testowanie kompletnych scenariuszy użytkownika

**Narzędzia:**
- Playwright
- Cypress (alternatywa)

**Pokrycie:**
- Krytyczne ścieżki użytkownika
- Proces zakupu
- Rejestracja/logowanie
- Wyszukiwanie i filtrowanie

### 4. Testy wizualne (Visual Regression Tests)
**Cel:** Wykrywanie niezamierzonych zmian w UI

**Narzędzia:**
- Chromatic
- Percy

**Pokrycie:**
- Komponenty UI
- Strony główne
- Responsywność

## Struktura testów

```
pedro/
├── __tests__/
│   ├── unit/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── integration/
│   │   ├── api/
│   │   └── features/
│   └── e2e/
│       ├── auth/
│       ├── promotions/
│       └── purchase/
├── cypress/
│   ├── fixtures/
│   ├── integration/
│   └── support/
└── jest.config.js
```

## Przykłady testów

### Test jednostkowy - Komponent

```typescript
// __tests__/unit/components/PromotionCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PromotionCard } from '@/components/PromotionCard';

describe('PromotionCard', () => {
  const mockPromotion = {
    id: '1',
    title: 'Pizza -50%',
    originalPrice: '40.00',
    discountPrice: '20.00',
    discountPercent: 50,
    imageUrl: '/pizza.jpg',
    store: 'Pizza Place'
  };

  it('renders promotion details correctly', () => {
    render(<PromotionCard promotion={mockPromotion} />);
    
    expect(screen.getByText('Pizza -50%')).toBeInTheDocument();
    expect(screen.getByText('20.00 zł')).toBeInTheDocument();
    expect(screen.getByText('-50%')).toBeInTheDocument();
  });

  it('calls onFavorite when heart icon is clicked', () => {
    const onFavorite = jest.fn();
    render(
      <PromotionCard 
        promotion={mockPromotion} 
        onFavorite={onFavorite}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Add to favorites'));
    expect(onFavorite).toHaveBeenCalledWith('1');
  });

  it('shows sold out overlay when promotion is unavailable', () => {
    render(
      <PromotionCard 
        promotion={{ ...mockPromotion, available: false }}
      />
    );
    
    expect(screen.getByText('Wyprzedane')).toBeInTheDocument();
  });
});
```

### Test jednostkowy - Hook

```typescript
// __tests__/unit/hooks/useFavorites.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '@/hooks/useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toEqual([]);
    expect(result.current.isFavorite('1')).toBe(false);
  });

  it('adds promotion to favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite('1');
    });
    
    expect(result.current.favorites).toContain('1');
    expect(result.current.isFavorite('1')).toBe(true);
  });

  it('removes promotion from favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite('1');
      result.current.removeFavorite('1');
    });
    
    expect(result.current.favorites).not.toContain('1');
  });

  it('persists favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite('1');
    });
    
    expect(localStorage.getItem('favorites')).toBe('["1"]');
  });
});
```

### Test integracyjny - API

```typescript
// __tests__/integration/api/promotions.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/promotions/route';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    promotion: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}));

describe('/api/promotions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns promotions with pagination', async () => {
    const mockPromotions = [
      { id: '1', title: 'Pizza -50%', /* ... */ },
      { id: '2', title: 'Burger -30%', /* ... */ },
    ];

    prisma.promotion.findMany.mockResolvedValue(mockPromotions);
    prisma.promotion.count.mockResolvedValue(10);

    const { req, res } = createMocks({
      method: 'GET',
      query: { page: '1', limit: '2' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const json = JSON.parse(res._getData());
    expect(json.data).toHaveLength(2);
    expect(json.meta).toEqual({
      page: 1,
      limit: 2,
      total: 10,
      pages: 5,
    });
  });

  it('filters promotions by city', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { city: 'Gdańsk' },
    });

    await handler(req, res);

    expect(prisma.promotion.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          locations: {
            some: { city: 'Gdańsk' },
          },
        }),
      })
    );
  });

  it('returns 400 for invalid query parameters', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { limit: 'invalid' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const json = JSON.parse(res._getData());
    expect(json.error).toBeDefined();
  });
});
```

### Test E2E - Proces zakupu

```typescript
// __tests__/e2e/purchase/voucher-purchase.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Voucher Purchase Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/discover');
  });

  test('complete voucher purchase', async ({ page }) => {
    // Navigate to promotion
    await page.goto('/discover');
    await page.click('text=Pizza -50%');
    await page.waitForURL(/\/promotion\/.+/);

    // Check promotion details
    await expect(page.locator('h1')).toContainText('Pizza -50%');
    await expect(page.locator('text=20.00 zł')).toBeVisible();

    // Purchase voucher
    await page.click('button:has-text("Kup voucher")');
    
    // Fill payment form
    await page.fill('[name="cardNumber"]', '4242424242424242');
    await page.fill('[name="expiry"]', '12/25');
    await page.fill('[name="cvc"]', '123');
    
    // Complete purchase
    await page.click('button:has-text("Zapłać")');
    
    // Verify success
    await page.waitForURL('/vouchers/*');
    await expect(page.locator('text=Voucher zakupiony pomyślnie')).toBeVisible();
    await expect(page.locator('[data-testid="voucher-code"]')).toBeVisible();
  });

  test('handles out of stock promotion', async ({ page }) => {
    await page.goto('/promotion/out-of-stock-id');
    
    await expect(page.locator('button:has-text("Wyprzedane")')).toBeDisabled();
    await expect(page.locator('text=Ta promocja jest już niedostępna')).toBeVisible();
  });
});
```

### Test wizualny

```typescript
// __tests__/visual/components.spec.ts
import { test } from '@chromatic/test';

test.describe('Visual Regression Tests', () => {
  test('PromotionCard variations', async ({ page }) => {
    await page.goto('/storybook/iframe.html?id=components-promotioncard--default');
    await page.screenshot({ path: 'promotion-card-default.png' });

    await page.goto('/storybook/iframe.html?id=components-promotioncard--with-discount');
    await page.screenshot({ path: 'promotion-card-discount.png' });

    await page.goto('/storybook/iframe.html?id=components-promotioncard--sold-out');
    await page.screenshot({ path: 'promotion-card-sold-out.png' });
  });

  test('Responsive layouts', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/discover');
      await page.screenshot({ 
        path: `discover-${viewport.name}.png`,
        fullPage: true 
      });
    }
  });
});
```

## Konfiguracja

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './__tests__/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  unit-integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit and integration tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  visual:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

## Dobre praktyki

### 1. Nazewnictwo testów
```typescript
// ✅ Dobre
it('should display error message when email is invalid')

// ❌ Złe
it('test email validation')
```

### 2. Arrange-Act-Assert
```typescript
it('should calculate discount correctly', () => {
  // Arrange
  const originalPrice = 100;
  const discountPercent = 25;
  
  // Act
  const discountedPrice = calculateDiscount(originalPrice, discountPercent);
  
  // Assert
  expect(discountedPrice).toBe(75);
});
```

### 3. Test Data Builders
```typescript
// test-utils/builders.ts
export const promotionBuilder = (overrides = {}) => ({
  id: 'test-id',
  title: 'Test Promotion',
  originalPrice: '100.00',
  discountPrice: '50.00',
  discountPercent: 50,
  ...overrides,
});

// Usage in tests
const promotion = promotionBuilder({ title: 'Pizza -50%' });
```

### 4. Avoid Implementation Details
```typescript
// ✅ Dobre
fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));

// ❌ Złe
fireEvent.click(container.querySelector('.btn-primary'));
```

## Metryki i raportowanie

### Coverage Reports
- Minimum 80% dla kodu krytycznego
- 70% dla pozostałego kodu
- Raport generowany automatycznie w CI

### Test Performance
- Unit tests: < 5 seconds total
- Integration tests: < 30 seconds total
- E2E tests: < 5 minutes total

### Monitoring
- Flaky tests tracked in dashboard
- Test execution time trends
- Coverage trends over time

## Narzędzia pomocnicze

### MSW dla mockowania API
```typescript
// mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/promotions', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [/* mocked promotions */],
        meta: { page: 1, total: 10 }
      })
    );
  }),
];
```

### Testing Library queries
```typescript
// Preferowana kolejność
1. getByRole
2. getByLabelText
3. getByPlaceholderText
4. getByText
5. getByDisplayValue
6. getByAltText
7. getByTitle
8. getByTestId // ostateczność
```

## Debugging

### Pomocne komendy
```bash
# Run single test file
npm test -- PromotionCard.test.tsx

# Run tests in watch mode
npm test -- --watch

# Debug specific test
npm test -- --detectOpenHandles

# Run E2E with UI
npx playwright test --ui

# Update snapshots
npm test -- -u
```

### VS Code Integration
```json
// .vscode/launch.json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Debug",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```