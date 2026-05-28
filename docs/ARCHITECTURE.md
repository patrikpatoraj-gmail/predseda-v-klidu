# Architektúra — Předseda v klidu

## Princípy

1. **Pragmatické MVP.** Žiadne mikroservices, žiadne overengineering. Monolitická Next.js app s embedded databázou (SQLite v dev, Postgres v prod).
2. **SEO-first.** Server-side rendered stránky, sitemap, štruktúrované metadata, čisté URL slugy.
3. **Marketplace mentalita.** Rovné podmienky pre poskytovateľov; Premium zvyšuje viditeľnosť, nie kvalitu hodnotenia.
4. **Trust by design.** Moderácia recenzií, ochrana proti pomluvám, transparentné označenie demo dát.

## Vrstvy aplikácie

```
┌─────────────────────────────────────────────────┐
│ Prezentačná vrstva (Next.js App Router, React)  │
│ - Server Components (default)                   │
│ - Client Components (formuláre, interaktivita)  │
│ - Tailwind utility classes                      │
└─────────────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│ API vrstva (Next.js Route Handlers)             │
│ - /api/poptavka     POST  → vytvorí poptávku    │
│ - /api/registrace   POST  → vytvorí účet        │
│ - /api/auth/...     NextAuth handlers           │
└─────────────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│ Doménová vrstva (lib/)                          │
│ - prisma client (singleton)                     │
│ - auth options                                  │
│ - validačné Zod schémy                          │
│ - utility (formátovanie, parseJson)             │
└─────────────────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│ Dátová vrstva (Prisma ORM)                      │
│ - SQLite v dev, PostgreSQL v prod               │
│ - migrácie cez `prisma db push` / `migrate`     │
└─────────────────────────────────────────────────┘
```

## Stránkový plán

### Verejné

| Cesta | Účel | SEO priorita |
|---|---|---|
| `/` | Homepage — hero, vyhľadávanie, top správci, články | ⭐⭐⭐⭐⭐ |
| `/spravci` | Katalog správcov s filtrami | ⭐⭐⭐⭐⭐ |
| `/spravci/[slug]` | Detail správcu | ⭐⭐⭐⭐ |
| `/predsedove` | Katalog profi predsedov | ⭐⭐⭐⭐⭐ |
| `/predsedove/[slug]` | Detail predsedu | ⭐⭐⭐⭐ |
| `/poptavka` | Poptávkový formulár (multi-select) | ⭐⭐⭐ |
| `/clanky` | Zoznam článkov | ⭐⭐⭐⭐⭐ |
| `/clanky/[slug]` | Detail článku | ⭐⭐⭐⭐ |
| `/jak-to-funguje` | Vysvetlenie pre SVJ + firmy | ⭐⭐⭐ |
| `/cenik` | Premium plány | ⭐⭐⭐ |
| `/o-nas`, `/kontakt`, `/podminky`, `/gdpr` | Trust pages | ⭐⭐ |

### Účet (po prihlásení)

| Cesta | Účel |
|---|---|
| `/prihlaseni`, `/registrace` | Auth |
| `/admin` | Admin dashboard (iba role ADMIN) |
| `/admin/spravci`, `/admin/predsedove`, `/admin/poptavky`, `/admin/recenze`, `/admin/clanky`, `/admin/uzivatele` | Moderácia |

### API

| Endpoint | Metóda | Účel |
|---|---|---|
| `/api/poptavka` | POST | Vytvorí poptávku + N záznamov v `PoptavkaSpravce` |
| `/api/registrace` | POST | Vytvorí User + placeholder Spravce/Predseda |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlery |

## Bezpečnosť

- Heslá: bcryptjs (10 kôl saltu).
- Session: JWT s podpisom cez `NEXTAUTH_SECRET`.
- Vstupy: Zod validácia na každom API route.
- Admin route: chránená server-side cez `getServerSession`.
- Recenzie: defaultne `schvalena=false`, prejdú moderáciou pred zobrazením.
- Poptávky: nezverejňujeme verejne, vidia ich len vybraní správcovia.

## Performance

- Server Components default → menší JS bundle.
- `revalidate` na detailoch (60 s na profile, 300 s na článkoch) — incremental static regeneration.
- Tailwind JIT, Inter cez `next/font` (preload, žiadny CLS).
- Next/Image pre logá + ilustrácie.

## Škálovanie

- **DB:** v prod prepnúť `provider="postgresql"` v `schema.prisma`, nastaviť `DATABASE_URL`. Bez ďalších kódových zmien.
- **Hosting:** Vercel / Railway / Fly.io. Static + serverless funkcie.
- **Search:** pre väčšie objemy nasadiť Postgres FTS / Meilisearch.
- **CDN:** automaticky cez Next.js + Vercel.
- **Multi-mestské pokrytie:** schéma je už `kraj` + `mesto` ready; stačí rozšíriť seed a filtre.

## Email & notifikácie

V MVP iba **logovanie do konzoly**. V produkcii integrácia napr. cez Resend / Postmark:
- nová poptávka → email všetkým vybraným správcom,
- nová recenzia → email subjektu recenzie,
- moderácia → email adminovi.
