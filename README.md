# Předseda v klidu

> Největší katalog správců SVJ a profesionálních předsedů v ČR.
> MVP: Praha (30 správců + profi předsedové).

## Rýchly štart

### 1. Inštalácia

```powershell
npm install
```

### 2. Príprava databázy

Projekt používa **SQLite** pre vývoj (žiadny setup). Pre produkciu prepnete na PostgreSQL v `prisma/schema.prisma` a `.env`.

```powershell
# Vytvor .env z .env.example (alebo použi existujúci)
Copy-Item .env.example .env

# Vygeneruj Prisma client, push schémy a naseeduj dáta
npm run db:push
npm run db:seed
```

Seed naplní:
- 30 fiktívnych pražských správcovských firiem,
- 12 profi predsedov,
- 6 vzdelávacích článkov,
- ~25 ukážkových recenzií,
- jedného admin používateľa (`admin@predsedavklidu.cz` / `admin1234`).

### 3. Spustenie vývojového servera

```powershell
npm run dev
```

Otvor [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)
(prihlás sa cez `/prihlaseni` admin údajmi).

### Užitočné príkazy

| Príkaz | Popis |
|---|---|
| `npm run dev` | Spustí dev server |
| `npm run build` | Vygeneruje produkčný build |
| `npm run start` | Spustí produkčný server |
| `npm run db:push` | Aplikuje Prisma schému do DB |
| `npm run db:seed` | Naseeduje demo dáta |
| `npm run db:reset` | Vymaže DB a naseeduje znova |
| `npm run db:studio` | Otvorí Prisma Studio (vizualizácia DB) |

---

## Štruktúra projektu

```
predseda-v-klidu/
├── prisma/
│   ├── schema.prisma         # databázové schéma
│   ├── seed.ts               # seed script
│   └── seed-data/            # demo dáta (správcovia, predsedovia, články)
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # homepage
│   │   ├── spravci/          # katalog + detail správcu
│   │   ├── predsedove/       # katalog + detail predsedu
│   │   ├── poptavka/         # poptávkový formulár
│   │   ├── clanky/           # blog
│   │   ├── admin/            # admin dashboard
│   │   ├── prihlaseni/       # login
│   │   ├── registrace/       # register
│   │   └── api/              # API routes
│   ├── components/           # UI komponenty
│   ├── lib/                  # prisma client, auth, utils
│   └── types/                # TypeScript typy
├── docs/
│   ├── ARCHITECTURE.md       # technická architektúra
│   ├── DATABASE.md           # detail databázového modelu
│   ├── ROADMAP.md            # MVP + budúci rozvoj
│   ├── MONETIZATION.md       # business model
│   └── UX-FLOW.md            # používateľské toky
└── ...
```

---

## Dokumentácia

- [Architektúra](docs/ARCHITECTURE.md)
- [Databázový model](docs/DATABASE.md)
- [Roadmap](docs/ROADMAP.md)
- [Monetizácia](docs/MONETIZATION.md)
- [UX toky](docs/UX-FLOW.md)

---

## Tech stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Štýly:** Tailwind CSS s vlastným design systémom
- **Databáza:** SQLite (dev) / PostgreSQL (prod) cez Prisma ORM
- **Autentizácia:** NextAuth.js (credentials provider)
- **Validácia:** Zod
- **Hashing:** bcryptjs

---

## Demo dáta — upozornenie

Všetky firmy, predsedovia, kontakty a referencie v seed dátach sú **fiktívne**
a slúžia výhradne na demonštráciu MVP. Reálne dáta sa naplnia až po onboardingu
skutočných správcov so súhlasom alebo z verejných registrov.

---

## Roadmap (skrátene)

- **Q1 2026 — MVP:** Praha, 30 správcov, 10+ predsedov, základné poptávky
- **Q2 2026:** Stripe platby, email rozosielanie poptávok, mobilný UX
- **Q3 2026:** Rozšírenie do Brno + Plzeň, premium analytika, párovacie algoritmy
- **Q4 2026:** Multi-mestské pokrytie, mobilná aplikácia
- **2027+:** AI asistent pre SVJ, dotácie-on-demand, dlhodobé štatistiky trhu

Detail viď [docs/ROADMAP.md](docs/ROADMAP.md).
