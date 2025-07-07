# Workflow Deweloperski Pedro.pl

## Git Workflow

### Struktura branchy

```
main (production)
├── staging
└── develop
    ├── feature/PEDRO-123-add-payment
    ├── bugfix/PEDRO-456-fix-login
    └── hotfix/PEDRO-789-critical-fix
```

### Nazewnictwo branchy

- `feature/PEDRO-XXX-short-description` - nowe funkcjonalności
- `bugfix/PEDRO-XXX-short-description` - naprawy błędów
- `hotfix/PEDRO-XXX-short-description` - krytyczne poprawki
- `chore/PEDRO-XXX-short-description` - zadania techniczne
- `docs/PEDRO-XXX-short-description` - dokumentacja

### Git Flow

1. **Nowa funkcjonalność**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/PEDRO-123-add-payment
   ```

2. **Praca nad funkcjonalnością**
   ```bash
   # Regularne commity
   git add .
   git commit -m "feat(payment): add Stripe integration"
   
   # Push do remote
   git push origin feature/PEDRO-123-add-payment
   ```

3. **Pull Request**
   - Utwórz PR z feature branch do develop
   - Wypełnij template PR
   - Przypisz reviewerów
   - Czekaj na approval

4. **Merge**
   - Squash and merge dla czystej historii
   - Delete branch po merge

## Conventional Commits

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Typy commitów

- `feat:` - nowa funkcjonalność
- `fix:` - naprawa błędu
- `docs:` - zmiany w dokumentacji
- `style:` - formatowanie, brak zmian w kodzie
- `refactor:` - refaktoryzacja kodu
- `perf:` - poprawa wydajności
- `test:` - dodanie testów
- `chore:` - zmiany w build, narzędzia
- `ci:` - zmiany w CI/CD

### Przykłady

```bash
# Funkcjonalność
feat(promotions): add filtering by category

# Bugfix
fix(auth): resolve login redirect issue

# Dokumentacja
docs(api): update endpoint documentation

# Refactor
refactor(components): extract PromotionCard logic

# Z body i footer
feat(payment): integrate Przelewy24 gateway

Add support for Polish payment processor Przelewy24.
Includes webhook handling and status updates.

Closes: PEDRO-123
```

## Code Review Process

### Checklist dla autora

- [ ] Kod spełnia wymagania z ticketu
- [ ] Testy są napisane i przechodzą
- [ ] Dokumentacja jest zaktualizowana
- [ ] Brak console.log() i debuggerów
- [ ] Kod jest sformatowany (prettier)
- [ ] Linting przechodzi bez błędów
- [ ] Build przechodzi pomyślnie
- [ ] PR ma odpowiedni tytuł i opis

### Checklist dla reviewera

- [ ] Logika biznesowa jest poprawna
- [ ] Kod jest czytelny i zrozumiały
- [ ] Nazewnictwo jest jasne
- [ ] Brak duplikacji kodu
- [ ] Obsługa błędów jest odpowiednia
- [ ] Testy pokrywają edge cases
- [ ] Performance nie jest pogorszone
- [ ] Security best practices

### Pull Request Template

```markdown
## Opis zmian
Krótki opis co zostało zmienione i dlaczego.

## Typ zmian
- [ ] Bugfix (non-breaking change który naprawia problem)
- [ ] Nowa funkcjonalność (non-breaking change który dodaje funkcjonalność)
- [ ] Breaking change (zmiana która może zepsuć istniejącą funkcjonalność)

## Jak testować?
1. Krok pierwszy
2. Krok drugi
3. Oczekiwany rezultat

## Checklist
- [ ] Kod follows style guidelines
- [ ] Self-review wykonany
- [ ] Komentarze dodane w trudniejszych miejscach
- [ ] Dokumentacja zaktualizowana
- [ ] Testy przechodzą lokalnie
- [ ] Nowe testy dodane

## Screenshots (jeśli dotyczy)
Dodaj screenshots dla zmian UI.

## Related Issues
Closes #123
```

## Standardy kodowania

### TypeScript

```typescript
// ✅ Dobre praktyki
interface PromotionProps {
  id: string;
  title: string;
  price: number;
  onSelect?: (id: string) => void;
}

export const Promotion: React.FC<PromotionProps> = ({ 
  id, 
  title, 
  price, 
  onSelect 
}) => {
  const handleClick = useCallback(() => {
    onSelect?.(id);
  }, [id, onSelect]);

  return (
    <div onClick={handleClick}>
      <h3>{title}</h3>
      <p>{formatPrice(price)}</p>
    </div>
  );
};

// ❌ Złe praktyki
export const Promotion = (props: any) => {
  return (
    <div onClick={() => props.onSelect(props.id)}>
      <h3>{props.title}</h3>
      <p>{props.price} zł</p>
    </div>
  );
};
```

### Struktura komponentów

```typescript
// components/PromotionCard/PromotionCard.tsx
import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { PromotionCardProps } from './types';
import styles from './PromotionCard.module.css';

export const PromotionCard = memo<PromotionCardProps>(({ 
  promotion,
  onFavorite,
  isFavorite = false
}) => {
  // 1. Hooks
  const router = useRouter();
  const { t } = useTranslation();
  
  // 2. State
  const [isLoading, setIsLoading] = useState(false);
  
  // 3. Computed values
  const discountPercentage = useMemo(() => 
    calculateDiscount(promotion.originalPrice, promotion.discountPrice),
    [promotion.originalPrice, promotion.discountPrice]
  );
  
  // 4. Handlers
  const handleFavoriteClick = useCallback(async (e: MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await onFavorite(promotion.id);
    } finally {
      setIsLoading(false);
    }
  }, [promotion.id, onFavorite]);
  
  // 5. Effects
  useEffect(() => {
    // Track view
    analytics.track('promotion_viewed', { id: promotion.id });
  }, [promotion.id]);
  
  // 6. Render
  return (
    <Card className={styles.card}>
      {/* Component JSX */}
    </Card>
  );
});

PromotionCard.displayName = 'PromotionCard';
```

### Organizacja plików

```
components/
├── PromotionCard/
│   ├── PromotionCard.tsx
│   ├── PromotionCard.module.css
│   ├── PromotionCard.test.tsx
│   ├── types.ts
│   └── index.ts
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   └── index.ts
└── index.ts
```

## Narzędzia deweloperskie

### VS Code Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "mikestead.dotenv",
    "yoavbls.pretty-ts-errors"
  ]
}
```

### VS Code Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### Prettier Configuration

```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',
};
```

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
```

## Development Setup

### Pierwsze uruchomienie

```bash
# Clone repository
git clone https://github.com/pedro-pl/pedro.git
cd pedro

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Setup database
npx prisma generate
npx prisma db push

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

### Codzienne komendy

```bash
# Start dev server
npm run dev

# Run tests in watch mode
npm run test:watch

# Check types
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Analyze bundle
npm run analyze
```

### Husky Git Hooks

```json
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
```

```json
// .husky/commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit $1
```

### Lint-staged Configuration

```javascript
// lint-staged.config.js
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'jest --bail --findRelatedTests',
  ],
  '*.{json,md,yml}': ['prettier --write'],
  '*.css': ['prettier --write'],
};
```

## Debugging

### VS Code Debug Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

### Debugging Tips

```typescript
// Użyj debugger statement
debugger; // Zatrzyma wykonanie w DevTools

// Console methods
console.table(data); // Wyświetla dane w tabeli
console.time('operation'); // Start timer
console.timeEnd('operation'); // End timer

// React DevTools
// $r - obecnie wybrany komponent
// $r.props - props komponentu
// $r.state - state komponentu
```

## Performance Monitoring

### Web Vitals

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Custom Performance Marks

```typescript
// lib/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && window.performance) {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name)[0];
    console.log(`${name} took ${measure.duration}ms`);
  } else {
    fn();
  }
};
```

## Dokumentacja kodu

### JSDoc dla funkcji

```typescript
/**
 * Calculates discount percentage between original and discounted price
 * @param originalPrice - Original price in PLN
 * @param discountedPrice - Discounted price in PLN
 * @returns Discount percentage (0-100)
 * @example
 * calculateDiscount(100, 75) // returns 25
 */
export const calculateDiscount = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};
```

### README dla komponentów

```markdown
# PromotionCard

Komponent wyświetlający kartę promocji z obrazem, ceną i rabatem.

## Usage

\```tsx
import { PromotionCard } from '@/components/PromotionCard';

<PromotionCard
  promotion={promotion}
  onFavorite={handleFavorite}
  isFavorite={false}
/>
\```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| promotion | Promotion | required | Dane promocji |
| onFavorite | (id: string) => void | - | Callback dla dodania do ulubionych |
| isFavorite | boolean | false | Czy promocja jest w ulubionych |

## Examples

Zobacz Storybook dla przykładów użycia.
```

## Continuous Learning

### Zasoby
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Wewnętrzne szkolenia
- Code Review Sessions - co tydzień
- Tech Talks - co miesiąc
- Pair Programming - na żądanie

### Eksperymenty
- Feature flags dla nowych funkcji
- A/B testing z Vercel
- Canary deployments