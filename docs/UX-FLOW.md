# UX toky — Předseda v klidu

## 1. Tok SVJ "Nájsť správcu"

```
Homepage
   │
   ├─► Hero search (vyber typ + lokalita + veľkosť)
   │      │
   │      ▼
   │  Katalog správcov (s filtrami v sidebare)
   │      │
   │      ├─► Klik na detail správcu ─► Detail profilu
   │      │                                  │
   │      │                                  ├─► Klik "Poptat" ─► Poptávkový formulár
   │      │                                  └─► Klik na email/telefón ─► Priamy kontakt
   │      │
   │      └─► Zaškrtnutie 3–5 favoritov
   │             │
   │             ▼
   │      Floating bar "X vybraných"
   │             │
   │             ▼ klik "Odeslat poptávku"
   │      Poptávkový formulár (s pre-selected správcami)
   │             │
   │             ▼ vyplnenie + submit
   │      Confirmation screen "Poptávka odeslána"
   │             │
   │             ▼
   │      Správcovia dostanú email (TODO v MVP)
   │
   └─► Sekundárne ciele:
        - Procházet články (edukácia → trust → konverzia neskôr)
        - Profi predsedovia (alternatíva k správcovi)
```

### Klíčové optimalizácie
- **Žiadna registrácia** pre odoslanie poptávky → maximálny throughput.
- Multi-select v katalogu redukuje friction ("namáhanie kontaktovať 5 firiem zvlášť" → "jeden formulár").
- Filtre v sidebare, výsledky kedykoľvek viditeľné (responzívne mobile drawer).
- Cards majú "primary CTA" = Detail, "secondary CTA" = checkbox pre poptávku.

---

## 2. Tok SVJ "Edukácia"

```
SEO (Google "jak změnit správce SVJ")
   │
   ▼
Detail článku
   │
   ├─► CTA v článku: "Procházet katalog správců"
   │           │
   │           ▼
   │     Katalog ─► (tok 1)
   │
   └─► Tagy → ďalšie články
```

### Klíčové optimalizácie
- Každý článok má CTA na katalog v 2/3 dĺžky a na konci.
- Internal linking medzi článkami (related kategorie).
- Štruktúrované dáta (Article schema.org) pre SERP.

---

## 3. Tok správcu "Registrácia → klient"

```
SEO ("registrace správce SVJ") / Ad
   │
   ▼
Landing /jak-to-funguje#firmy
   │
   ▼ klik "Registrace zdarma"
/registrace
   │
   ▼ vyplnenie (názov firmy, kontakt, heslo, role: SPRAVCE/PREDSEDA)
Login screen "Registrace úspěšná — počkejte na schválení"
   │
   ▼ (admin v /admin/spravci schváli)
Email "Váš profil je živý"
   │
   ▼
Self-service profil editor (TODO v post-MVP)
   │
   ▼
Dostávanie poptávok
   │
   ▼ inbox notifikácia
Odpoveď SVJ → uzavretie obchodu
   │
   ▼ (na konci roka)
Recenzia SVJ → trust signal pre ďalších
```

---

## 4. Tok admin "Moderácia"

```
/admin (dashboard)
   │
   ├─► K vyřízení karty:
   │      - Nové poptávky (klik → /admin/poptavky)
   │      - Profily čekající na ověření (klik → /admin/spravci?filter=neoveren)
   │      - Recenze k moderaci (klik → /admin/recenze)
   │
   ├─► Akcie v tabuľkách:
   │      - Schválit / Zamítnout (one-click)
   │      - Premium toggle
   │      - Verified toggle
   │      - Detail úprav
   │
   └─► Sekundárne:
        - /admin/uzivatele (manuálna úprava role)
        - /admin/clanky (nové články, premium toggle)
```

---

## 5. Mobile UX

### Princípy
- **Mobile-first.** 65 % návštev SVJ predsedov je z mobilu.
- **Tab-bar nav** na mobile (alebo horizontálny scroll v hlavičke).
- **Bottom-sheet filtre** v katalogu.
- **Sticky CTA bottom bar** pri poptávke (rovnako ako floating bar v desktope).

### Specifické komponenty
- `<Header>` má `lg:flex` plný nav + mobile horizontálny scroll pod hlavičkou.
- `<HeroSearch>` ─ na mobile sa rozdelí do stack (typ chips → select → button).
- `<SpravceCard>` ─ na mobile single column, full-width.
- `<SpravciFilters>` ─ na mobile by mali byť modal/drawer (TODO: enhancement).

---

## 6. Notifikácie

### MVP — žiadne notifikácie (logy do konzoly)

### Post-MVP

| Trigger | Príjemca | Kanál |
|---|---|---|
| Nová poptávka odoslaná | Správca (vybraný) | Email + in-app |
| Poptávka označená "Zaujímam sa" | Subjekt poptávky (SVJ) | Email |
| Nová recenzia (schválená) | Subjekt recenzie | Email + in-app |
| Nová reakcia na recenziu | Autor recenzie | Email |
| Profil schválený | Správca / predseda | Email |
| Recenzia zamietnutá | Autor | Email s vysvetlením |
| Týždenný digest poptávok | Premium správcovia | Email |

---

## 7. Antipatterns (čo nerobiť)

- ❌ **Modal "Zaregistrujte sa pre kontakt na správcu".** Zabíja konverziu.
- ❌ **Tracking iba pre Premium.** Zničí dôveru.
- ❌ **"Najlepší správca v Prahe (sponzorováno)" označené malým fontom.** Etika.
- ❌ **Auto-fill formulárov z cookies bez upozornenia.**
- ❌ **Pushovacie notifikácie skoro v UX.**
