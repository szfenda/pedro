# Wytyczne Bezpieczeństwa Pedro.pl

## Przegląd

Bezpieczeństwo jest priorytetem w aplikacji Pedro.pl. Ten dokument zawiera wytyczne i najlepsze praktyki dla zapewnienia bezpieczeństwa aplikacji, danych użytkowników i infrastruktury.

## Autentykacja i Autoryzacja

### NextAuth.js Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

### Middleware dla ochrony tras

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'ADMIN';
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/vouchers/:path*',
  ]
};
```

### Role-Based Access Control (RBAC)

```typescript
// lib/auth/permissions.ts
export const permissions = {
  ADMIN: [
    'manage_users',
    'manage_promotions',
    'manage_partners',
    'view_analytics',
    'manage_settings'
  ],
  PARTNER: [
    'manage_own_promotions',
    'view_own_analytics',
    'manage_own_profile'
  ],
  USER: [
    'view_promotions',
    'purchase_vouchers',
    'manage_favorites',
    'write_reviews'
  ]
};

export const hasPermission = (
  userRole: string, 
  permission: string
): boolean => {
  return permissions[userRole]?.includes(permission) || false;
};

// Hook dla sprawdzania uprawnień
export const usePermission = (permission: string) => {
  const { data: session } = useSession();
  return hasPermission(session?.user?.role || 'USER', permission);
};
```

## Ochrona danych

### Szyfrowanie haseł

```typescript
// lib/auth/password.ts
import { hash, compare } from 'bcryptjs';

const SALT_ROUNDS = 12;

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (
  password: string, 
  hashedPassword: string
): Promise<boolean> => {
  return compare(password, hashedPassword);
};

// Walidacja siły hasła
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Hasło musi mieć minimum 8 znaków');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Hasło musi zawierać wielką literę');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Hasło musi zawierać małą literę');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Hasło musi zawierać cyfrę');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Hasło musi zawierać znak specjalny');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

### Szyfrowanie wrażliwych danych

```typescript
// lib/crypto.ts
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

export const encrypt = (text: string): {
  encrypted: string;
  iv: string;
  authTag: string;
} => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
};

export const decrypt = (
  encrypted: string, 
  iv: string, 
  authTag: string
): string => {
  const decipher = crypto.createDecipheriv(
    algorithm, 
    secretKey, 
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
```

### Anonimizacja danych

```typescript
// lib/privacy/anonymize.ts
export const anonymizeEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  const anonymized = localPart.substring(0, 2) + '***';
  return `${anonymized}@${domain}`;
};

export const anonymizePhone = (phone: string): string => {
  return phone.replace(/(\d{3})\d{3}(\d{3})/, '$1***$2');
};

export const anonymizeUser = (user: User): AnonymizedUser => {
  return {
    id: user.id,
    email: anonymizeEmail(user.email),
    phone: user.phone ? anonymizePhone(user.phone) : null,
    createdAt: user.createdAt,
    // Pomijamy wrażliwe dane
  };
};
```

## Input Validation & Sanitization

### Zod Schemas

```typescript
// lib/validation/schemas.ts
import { z } from 'zod';

export const userRegistrationSchema = z.object({
  email: z.string().email('Nieprawidłowy email'),
  password: z.string().min(8, 'Hasło musi mieć minimum 8 znaków'),
  name: z.string().min(2, 'Imię musi mieć minimum 2 znaki'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Musisz zaakceptować regulamin'
  })
});

export const promotionSchema = z.object({
  title: z.string()
    .min(5, 'Tytuł musi mieć minimum 5 znaków')
    .max(100, 'Tytuł może mieć maksymalnie 100 znaków'),
  description: z.string()
    .min(20, 'Opis musi mieć minimum 20 znaków')
    .max(1000, 'Opis może mieć maksymalnie 1000 znaków'),
  originalPrice: z.number()
    .positive('Cena musi być dodatnia')
    .max(10000, 'Cena nie może przekraczać 10000 zł'),
  discountPrice: z.number()
    .positive('Cena musi być dodatnia'),
  validFrom: z.date(),
  validTo: z.date(),
}).refine(data => data.discountPrice < data.originalPrice, {
  message: 'Cena promocyjna musi być niższa od regularnej',
  path: ['discountPrice']
});
```

### Sanityzacja HTML

```typescript
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export const sanitizeHtml = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
};

// Użycie w komponencie
export const PromotionDescription = ({ description }: { description: string }) => {
  const sanitized = sanitizeHtml(description);
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: sanitized }}
      className="prose"
    />
  );
};
```

### SQL Injection Prevention

```typescript
// ❌ Źle - podatne na SQL injection
const unsafeQuery = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Dobrze - używanie Prisma ORM
const user = await prisma.user.findUnique({
  where: { email }
});

// ✅ Dobrze - parametryzowane zapytania
const users = await prisma.$queryRaw`
  SELECT * FROM users 
  WHERE email = ${email} 
  AND active = true
`;
```

## CSRF Protection

```typescript
// lib/csrf.ts
import { randomBytes } from 'crypto';

export const generateCSRFToken = (): string => {
  return randomBytes(32).toString('hex');
};

// middleware/csrf.ts
export const csrfProtection = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      const token = req.headers['x-csrf-token'];
      const sessionToken = req.session?.csrfToken;
      
      if (!token || token !== sessionToken) {
        return res.status(403).json({ error: 'Invalid CSRF token' });
      }
    }
    
    return handler(req, res);
  };
};
```

## Rate Limiting

```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader(
          'X-RateLimit-Remaining',
          isRateLimited ? 0 : limit - currentUsage
        );

        return isRateLimited ? reject() : resolve();
      }),
  };
}

// Użycie w API
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minuta
  uniqueTokenPerInterval: 500,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await limiter.check(res, 10, req.headers['x-forwarded-for'] || 'anonymous');
  } catch {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  // Handle request
}
```

## Security Headers

```typescript
// next.config.js
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
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

## API Security

### API Key Management

```typescript
// lib/api/auth.ts
import { createHash } from 'crypto';

export const generateApiKey = (): string => {
  return `pk_${randomBytes(32).toString('hex')}`;
};

export const hashApiKey = (apiKey: string): string => {
  return createHash('sha256').update(apiKey).digest('hex');
};

export const validateApiKey = async (
  req: NextApiRequest
): Promise<boolean> => {
  const apiKey = req.headers['x-api-key'] as string;
  
  if (!apiKey) return false;
  
  const hashedKey = hashApiKey(apiKey);
  const keyRecord = await prisma.apiKey.findUnique({
    where: { hashedKey },
    include: { user: true }
  });
  
  if (!keyRecord || !keyRecord.active) return false;
  
  // Update last used
  await prisma.apiKey.update({
    where: { id: keyRecord.id },
    data: { lastUsedAt: new Date() }
  });
  
  // Attach user to request
  (req as any).user = keyRecord.user;
  
  return true;
};
```

### Request Signing

```typescript
// lib/api/signing.ts
import { createHmac } from 'crypto';

export const signRequest = (
  payload: any, 
  secret: string, 
  timestamp: number
): string => {
  const message = `${timestamp}.${JSON.stringify(payload)}`;
  return createHmac('sha256', secret).update(message).digest('hex');
};

export const verifySignature = (
  payload: any,
  signature: string,
  secret: string,
  timestamp: number,
  tolerance: number = 300 // 5 minutes
): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  
  if (currentTime - timestamp > tolerance) {
    return false; // Request too old
  }
  
  const expectedSignature = signRequest(payload, secret, timestamp);
  return signature === expectedSignature;
};
```

## File Upload Security

```typescript
// lib/upload/validate.ts
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const validateFile = (file: File): {
  isValid: boolean;
  error?: string;
} => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Nieprawidłowy typ pliku. Dozwolone: JPEG, PNG, WebP'
    };
  }
  
  if (file.size > MAX_SIZE) {
    return {
      isValid: false,
      error: 'Plik jest za duży. Maksymalny rozmiar: 5MB'
    };
  }
  
  return { isValid: true };
};

// Skanowanie zawartości pliku
import FileType from 'file-type';

export const verifyFileContent = async (
  buffer: Buffer
): Promise<boolean> => {
  const fileType = await FileType.fromBuffer(buffer);
  return fileType ? ALLOWED_TYPES.includes(fileType.mime) : false;
};
```

## Session Security

```typescript
// lib/session.ts
import { SessionOptions } from 'iron-session';

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'pedro-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  },
};

// Rotacja session
export const rotateSession = async (req: NextApiRequest) => {
  const session = req.session;
  const userData = session.user;
  
  // Destroy old session
  session.destroy();
  
  // Create new session
  session.user = userData;
  session.regenerateId = Date.now();
  await session.save();
};
```

## Monitoring & Logging

### Security Events Logging

```typescript
// lib/security/logger.ts
import winston from 'winston';

const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'pedro-security' },
  transports: [
    new winston.transports.File({ 
      filename: 'security-error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'security-combined.log' 
    }),
  ],
});

export const logSecurityEvent = (
  event: string,
  details: any,
  severity: 'info' | 'warning' | 'error' = 'info'
) => {
  securityLogger.log({
    level: severity,
    message: event,
    timestamp: new Date().toISOString(),
    details,
  });
};

// Przykłady użycia
logSecurityEvent('failed_login_attempt', {
  email: anonymizeEmail(email),
  ip: req.headers['x-forwarded-for'],
  userAgent: req.headers['user-agent']
}, 'warning');

logSecurityEvent('suspicious_activity', {
  userId: user.id,
  action: 'multiple_failed_payments',
  count: failedAttempts
}, 'error');
```

### Intrusion Detection

```typescript
// lib/security/ids.ts
export const detectSuspiciousPatterns = (req: NextApiRequest): boolean => {
  const suspiciousPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i, // SQL Injection
    /((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)/i, // XSS
    /(\.\.\/|\.\.\\)/i, // Path Traversal
    /union.*select/i, // SQL Injection
  ];
  
  const checkString = `${req.url}${JSON.stringify(req.body)}${JSON.stringify(req.query)}`;
  
  return suspiciousPatterns.some(pattern => pattern.test(checkString));
};

// Middleware
export const idsMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (detectSuspiciousPatterns(req)) {
      logSecurityEvent('suspicious_request_blocked', {
        ip: req.headers['x-forwarded-for'],
        url: req.url,
        method: req.method,
      }, 'error');
      
      return res.status(400).json({ error: 'Bad request' });
    }
    
    return handler(req, res);
  };
};
```

## Compliance & Privacy

### GDPR Compliance

```typescript
// lib/gdpr/export.ts
export const exportUserData = async (userId: string) => {
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      vouchers: true,
      favorites: true,
      reviews: true,
      notifications: true,
    }
  });
  
  // Remove sensitive fields
  const { password, ...safeUserData } = userData;
  
  return {
    userData: safeUserData,
    exportedAt: new Date().toISOString(),
    format: 'json'
  };
};

// lib/gdpr/delete.ts
export const deleteUserData = async (userId: string) => {
  // Soft delete to maintain data integrity
  await prisma.user.update({
    where: { id: userId },
    data: {
      deletedAt: new Date(),
      email: `deleted_${userId}@deleted.com`,
      name: 'Deleted User',
      phone: null,
      // Anonymize other fields
    }
  });
  
  // Schedule hard delete after legal retention period
  await scheduleHardDelete(userId, 30); // 30 days
};
```

### Cookie Consent

```typescript
// components/CookieConsent.tsx
export const CookieConsent = () => {
  const [consent, setConsent] = useState<string | null>(null);
  
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    setConsent(savedConsent);
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsent('accepted');
    
    // Enable analytics
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  };
  
  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setConsent('declined');
    
    // Disable analytics
    window.gtag('consent', 'update', {
      analytics_storage: 'denied'
    });
  };
  
  if (consent) return null;
  
  return (
    <div className="cookie-consent">
      <p>Używamy cookies aby ulepszyć Twoje doświadczenia.</p>
      <button onClick={handleAccept}>Akceptuj</button>
      <button onClick={handleDecline}>Odrzuć</button>
    </div>
  );
};
```

## Security Checklist

### Development
- [ ] Wszystkie dependencies są aktualne
- [ ] Brak znanych vulnerabilities (npm audit)
- [ ] Secrets nie są commitowane do repo
- [ ] .env.example zawiera wszystkie wymagane zmienne
- [ ] Linting rules zawierają security checks

### Pre-deployment
- [ ] HTTPS jest wymuszony
- [ ] Security headers są skonfigurowane
- [ ] Rate limiting jest włączony
- [ ] CORS jest właściwie skonfigurowany
- [ ] Input validation działa na wszystkich endpoints
- [ ] Sesje mają odpowiedni timeout
- [ ] Hasła spełniają wymagania bezpieczeństwa

### Production
- [ ] Monitoring bezpieczeństwa jest aktywny
- [ ] Logi są zbierane i analizowane
- [ ] Backup działa automatycznie
- [ ] Incident response plan jest przygotowany
- [ ] Penetration testing został przeprowadzony
- [ ] Security updates są regularnie instalowane

## Incident Response

### Plan reagowania
1. **Wykrycie** - Alert z monitoringu
2. **Ocena** - Określenie skali i wpływu
3. **Containment** - Izolacja problemu
4. **Eradication** - Usunięcie źródła
5. **Recovery** - Przywrócenie normalnej pracy
6. **Lessons Learned** - Analiza i usprawnienia

### Kontakty awaryjne
- Security Team Lead: security@pedro.pl
- DevOps On-Call: +48 XXX XXX XXX
- Legal Team: legal@pedro.pl