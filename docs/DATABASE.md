# Databázový model — Předseda v klidu

## ER diagram (zjednodušený)

```
       ┌──────────┐
       │   User   │  (SPRAVCE | PREDSEDA | ADMIN)
       └────┬─────┘
            │ 1:1
   ┌────────┼────────┐
   ▼                 ▼
┌────────┐     ┌──────────┐
│Spravce │     │ Predseda │
└───┬────┘     └────┬─────┘
    │ 1:N           │ 1:N
    ▼               ▼
┌──────────────────────┐
│      Recenze         │
└──────────────────────┘
        │ 1:N
        ▼
┌──────────────┬──────────────────┐
│ RecenzeReakce│ NahlaseniRecenze │
└──────────────┴──────────────────┘

┌──────────┐ N:M  ┌─────────────────┐  N:1  ┌─────────┐
│ Poptavka │──────│ PoptavkaSpravce │───────│ Spravce │
└──────────┘      └─────────────────┘       └─────────┘

┌────────┐
│ Clanek │  ─── môže referovať na autora (User), Spravce, Predseda
└────────┘
```

## Tabuľky

### User
Univerzálny účet pre všetky role (SPRAVCE, PREDSEDA, ADMIN).
- `role` rozhoduje o oprávneniach.
- 1:1 vzťah na `Spravce` alebo `Predseda` (cez `userId`).

### Spravce
Profil správcovskej firmy.
- **Identifikácia:** `slug`, `nazev`, `logo`, `ico`.
- **Pôsobnosť:** `kraj`, `mesto`, `regionyPusobnosti` (JSON pole).
- **Číselné údaje:** `pocetDomu`, `pocetJednotek`, `rokZalozeni`.
- **Služby:** 9 boolean flagov pre rýchle SQL filtre (`ucetniSprava`, `technickaSprava`, `havarijniSluzba`, `onlinePortal`, `onlineHlasovani`, `zkRekonstrukce`, `zkDotace`, `zkUvery`, `pravniPoradenstvi`).
- **Cena:** `cenaOd` / `cenaDo` (Kč/jednotka/mesiac).
- **Kontakt:** `kontaktniOsoba`, `email`, `telefon`, `web`, `adresa`.
- **Status:** `overeny`, `premium`, `zviraznen`, `schvaleny`, `aktivni`.
- **Metriky (cache):** `prumerneHodnoceni`, `pocetRecenzi`, `pocetZobrazeni`.

### Predseda
Profil profesionálneho predsedu (osoba).
- Analogická štruktúra ako `Spravce`, navyše `specializace`, `vzdelani`, `certifikace`, `velikostDomuMin/Max`, `rokyZkusenosti`.

### Recenze
- Patrí buď `spravceId` ALEBO `predsedaId` (nullable, jeden vyplnený).
- Hodnotenie v 4 dimenziách: `hodnoceni` (celkové), `komunikace`, `kvalitaSpravy`, `rychlost`.
- `schvalena` defaultne `false` — pred zobrazením prejde moderáciou.
- Voliteľne `autorUserId` (registrovaný), alebo iba `autorJmeno`/`autorEmail` (anonymný overený mailom).

### RecenzeReakce
Reakcia firmy/predsedu na recenziu. 1:N na `Recenze`.

### NahlaseniRecenze
Nahlásenie problematickej recenzie. 1:N na `Recenze`.

### Poptavka
Hlavička poptávky.
- `nazevSvj`, `lokalita`, `pocetJednotek`, `popisPoptavky`.
- `kontaktniOsoba`, `telefon`, `email`, `dokumenty` (JSON URL).
- `stav`: NOVA → ODESLANA → ZPRACOVANA → UZAVRENA.
- `schvalena`: antispam, admin schvaľuje pred rozoslaním.

### PoptavkaSpravce
Join tabuľka — jedna poptávka môže ísť na N správcov.
- `odeslano`, `zobrazeno`, `odpovezeno` — tracking lifecycle.

### Clanek
Vzdelávacie články.
- `slug`, `nadpis`, `perex`, `obsah` (markdown).
- `kategorie`: Rekonstrukce | Pojištění | Úvěry | Dotace | Právo | Změna správce | Vedení | Vzory.
- `premium` flag pre platený obsah.
- SEO polia: `seoTitle`, `seoDescription`.
- Voliteľne autorom je User / Spravce / Predseda.

## Indexy

Optimalizované pre typické queries:
- `Spravce(kraj, mesto)` — filter podľa lokality
- `Spravce(premium, prumerneHodnoceni)` — sortovanie v katalogu
- `Predseda(kraj, mesto)` a `(premium, prumerneHodnoceni)`
- `Recenze(spravceId, schvalena)` a `(predsedaId, schvalena)`
- `Poptavka(stav, createdAt)`
- `Clanek(kategorie, publikovany)`

## JSON polia

Z dôvodu kompatibility so SQLite ukladáme niektoré arrays ako JSON stringy:
- `regionyPusobnosti`, `specializace`, `certifikace`, `reference`, `galerie`, `tagy`.

Pri migrácii na Postgres odporúčame premigrovať na natívne `text[]` / `jsonb`.

## Dátový lifecycle

1. **Onboarding správcu:**
   - User self-registruje cez `/registrace`.
   - Vytvorí sa `User` + placeholder `Spravce` (`schvaleny=false`).
   - Admin overí cez `/admin/spravci` a klikne **Schválit**.
2. **Poptávka:**
   - SVJ vyplní formulár.
   - Vytvorí sa `Poptavka` (`stav=NOVA`, `schvalena=false`) + N záznamov `PoptavkaSpravce`.
   - Admin overí (antispam) → `schvalena=true` + rozoslanie emailov.
3. **Recenzia:**
   - Autor napíše recenziu (anonymne s overením mailom, alebo prihlásený).
   - `schvalena=false`. Admin moderuje.
   - Po schválení sa prepočítava `Spravce.prumerneHodnoceni`.
