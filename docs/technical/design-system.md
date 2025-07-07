# System Projektowania Pedro.pl

## Paleta Kolorów

### Kolory Główne
```css
--primary: #6B46C1;           /* Fioletowy - główny kolor marki */
--primary-light: #9F7AEA;     /* Jasny fiolet - hover, akcenty */
--primary-dark: #553C9A;      /* Ciemny fiolet - pressed states */
--primary-gradient: linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%);
```

### Kolory Pomocnicze
```css
--secondary: #F7FAFC;         /* Bardzo jasny szary - tła */
--background: #F5F5F5;        /* Szare tło aplikacji */
--text: #2D3748;             /* Ciemny szary - tekst główny */
```

### Kolory Systemowe
```css
--success: #48BB78;          /* Zielony - sukces, dostępność */
--warning: #ED8936;          /* Pomarańczowy - ostrzeżenia */
--error: #E53E3E;            /* Czerwony - błędy */
--info: #4299E1;             /* Niebieski - informacje */
```

### Kolory Neutralne
```css
--gray-50: #F7FAFC;
--gray-100: #EDF2F7;
--gray-200: #E2E8F0;
--gray-300: #CBD5E0;
--gray-400: #A0AEC0;
--gray-500: #718096;
--gray-600: #4A5568;
--gray-700: #2D3748;
--gray-800: #1A202C;
--gray-900: #171923;
```

## Typografia

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Rozmiary Tekstu
```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
```

### Wagi Czcionki
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Height
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

## Spacing System

Bazowany na skali 4px:
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

## Komponenty UI

### Karty (Cards)
```css
.promotion-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(107, 70, 193, 0.1);
  transition: all 0.3s ease;
}

.promotion-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(107, 70, 193, 0.15);
}
```

### Przyciski (Buttons)

#### Primary Button
```css
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: white;
  color: var(--primary);
  border: 2px solid var(--primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
}
```

### Inputy i Formularze

#### Search Bar
```css
.search-bar {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(107, 70, 193, 0.05);
  padding: 0.75rem 1rem;
}
```

#### Input Field
```css
.input {
  border: 1px solid var(--gray-300);
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
}
```

### Nawigacja

#### Bottom Navigation
```css
.bottom-nav {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  background: white;
  height: 4rem;
}
```

#### City Selector
```css
.city-selector {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(107, 70, 193, 0.1);
}
```

## Ikony

### Biblioteka: Lucide React
- Rozmiary: 16px, 20px, 24px, 32px
- Stroke width: 2px
- Kolor: inherit od rodzica

### Główne ikony nawigacji:
- **Odkrywaj:** Compass
- **Kategorie:** Grid
- **Mapa:** Map
- **Ulubione:** Heart
- **Więcej:** MoreHorizontal

### Ikony kategorii:
- **Restauracje:** Utensils
- **Uroda:** Sparkles
- **Zdrowie:** Heart
- **Rozrywka:** Music
- **Zakupy:** ShoppingBag
- **Sport:** Dumbbell
- **Edukacja:** GraduationCap
- **Podróże:** Plane

## Cienie (Shadows)

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(107, 70, 193, 0.1);
--shadow-lg: 0 10px 15px rgba(107, 70, 193, 0.1);
--shadow-xl: 0 20px 25px rgba(107, 70, 193, 0.1);
```

## Border Radius

```css
--radius-sm: 0.375rem;    /* 6px */
--radius-md: 0.5rem;      /* 8px */
--radius-lg: 0.75rem;     /* 12px */
--radius-xl: 1rem;        /* 16px */
--radius-full: 9999px;    /* Pełne zaokrąglenie */
```

## Animacje i Przejścia

### Czas trwania
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Funkcje czasowe
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Przykładowe animacje
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}
```

## Responsywność

### Breakpoints
```css
--screen-sm: 640px;   /* Mobile landscape */
--screen-md: 768px;   /* Tablet */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large desktop */
```

### Mobile First
- Domyślne style dla mobile
- Media queries dla większych ekranów
- Touch-friendly (min 44px dla elementów klikalnych)

## Komponenty Specjalne

### Promotion Badge
```css
.discount-badge {
  background: var(--error);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.875rem;
}
```

### Category Icon Container
```css
.category-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-gradient);
  color: white;
}
```

### Loading States
```css
.skeleton {
  background: linear-gradient(90deg, 
    var(--gray-200) 25%, 
    var(--gray-300) 50%, 
    var(--gray-200) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Accessibility

### Focus States
- Visible focus rings (3px, primary color with opacity)
- Keyboard navigation support
- ARIA labels for icons

### Contrast Ratios
- Normal text: minimum 4.5:1
- Large text: minimum 3:1
- Interactive elements: minimum 3:1

### Touch Targets
- Minimum 44x44px for all interactive elements
- Adequate spacing between clickable items