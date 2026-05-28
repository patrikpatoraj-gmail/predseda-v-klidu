# Roadmap — Předseda v klidu

## MVP — Q1 2026 (Praha)

**Cieľ:** Overiť, či SVJ aktívne vyhľadávajú správcov online a či správcovia majú záujem o digitálnu akvizíciu.

### Funkcionalita
- ✅ Katalog 30 správcovských firiem v Prahe
- ✅ Katalog 10+ profesionálnych predsedov
- ✅ Filtre: kraj/mestská časť, veľkosť domu, služby, cena, hodnotenie
- ✅ Detail profilu so všetkými údajmi
- ✅ Poptávkový systém (multi-select 1 formulár pre N správcov)
- ✅ 6+ SEO-optimalizovaných článkov
- ✅ Registrácia + login pre správcov a predsedov
- ✅ Admin panel (moderácia, schvaľovanie)
- ✅ Sitemap, robots, metadata, štruktúrované dáta

### Cieľové metriky
| KPI | Cieľ |
|---|---|
| Mesačné návštevy organicky | 2 000 |
| Odoslané poptávky | 30 / mesiac |
| Registrovaní správcovia | 30 |
| Registrovaní profi predsedovia | 15 |
| Konverzia poptávky → kontakt | 40 % |

---

## Q2 2026 — Validácia + monetizácia

### Tech
- **Stripe integrácia** (mesačné Premium plány).
- **Email rozosielanie** poptávok cez Resend / Postmark.
- **Notifikácie v aplikácii** (real-time poptávky pre správcov).
- Mobilný UX audit + optimalizácia.
- Server-side caching pre detail stránky.

### Produkt
- **Self-service editácia profilov** (správca si sám upraví, čo o ňom platforma ukazuje).
- **Galéria fotiek** s upload (UploadThing / S3).
- **Štatistiky pre správcov** (kolko zobrazení, kolko poptávok).
- **Verifikácia cez ARES** (auto-fill IČO, sídlo).

### Marketing
- Content marketing — 2 nové články/týždeň.
- Spolupráca s 3 SVJ za odporúčanie (incentivized referrals).
- LinkedIn outreach na profi predsedov.

---

## Q3 2026 — Expanzia + AI

### Geo
- **Rozšírenie do Brno + Plzeň** (cieľ: 60 nových správcov, 30 nových predsedov).
- City landing pages (`/spravci-svj-brno`, `/spravci-svj-plzen`).

### Funkcionalita
- **Párovací algoritmus.** SVJ vyplní quiz (5 otázok), systém navrhne 3 najvhodnejších správcov.
- **Premium analytika.** Pre Premium správcov detailné grafy konverzií, A/B test textov v profile.
- **Cenový kalkulátor** "Koľko by sme platili u jiných správcov?" — porovnanie aktuálnej ceny SVJ s priemerom trhu.
- **Vzorové dokumenty na stiahnutie** za email.

### Edukačný portál
- "Akademie pro předsedu" — séria mikro-kurzov.
- Webináre s odborníkmi.

---

## Q4 2026 — Multi-city + integrácie

- Pokrytie všetkých krajov ČR.
- **Integrácia s Katastrom nemovitostí** (auto-fill SVJ pri poptávke).
- **Integrácia s ARES** (auto-verifikácia firiem).
- **Verified by Účetnictví** — partnerstvo s overovacími firmami.
- **API pre 3rd parties** (CRM, účtovné softvéry).

---

## 2027+ — Dlhodobá vízia

### Vízia: Centrum trhu SVJ

Predseda v klidu sa stane **operačným systémom pre SVJ v ČR**.

### Plánované moduly

1. **AI asistent pre predsedov.**
   Otázky typu "Ako napísať pozvánku na shromáždění?" odpovedané čatbotom natrénovaným na zákonech a vzoroch.

2. **Dotácie on-demand.**
   Marketplace dotačných poradcov + automatizovaná predkvalifikácia žiadosti.

3. **Online schôdze.**
   Vlastný nástroj pre online hlasovanie SVJ (e-podpisy, audit log).

4. **Marketplace dodávateľov.**
   Okrem správcov aj výťahy, fasády, FVE, audítori — kompletný ekosystém okolo SVJ.

5. **Štatistiky trhu.**
   Anonymizované benchmarking dáta: priemerná cena za jednotku, najčastejšie investície, ROI rekonstrukcií. Hodnotný dataset pre developera, štát, banky.

6. **Mobilná aplikácia pre vlastníkov.**
   Klient pre SVJ pre rýchlu komunikáciu a hlasovanie.

7. **B2B insights** (data products).
   Banky, poisťovne, dotační poradcovia môžu cieliť presne na SVJ s konkrétnymi potrebami (s ich súhlasom).

### Geografia
- ČR → Slovensko (rovnaký právny rámec) → Poľsko → Rakúsko.

---

## Anti-roadmap (čo nerobíme)

- **Vlastná správa SVJ.** Nestaneme sa konkurentom správcov.
- **Online realitka.** Sústreďujeme sa na povolanie predsedu, nie na predaj bytov.
- **Sociálna sieť pre vlastníkov.** SVJ nie je miesto pre engagement metriky.

---

## Riziká + mitigácie

| Riziko | Mitigácia |
|---|---|
| Správcovia nebudú odpovedať na poptávky | Aktívny onboarding, štatistiky responzivity, badge "Rýchle odpovedi" |
| Fake recenzie | Striktná moderácia, overenie cez SVJ IČO, právo reagovať |
| Žalobne hrozby od správcov | Jasné podmienky, oddelenie skutkových tvrzení od hodnotenia, právny tím |
| Marketingové náklady akvizície SVJ | Content marketing + SEO ako primárny kanál, dlhý LTV |
| Pomalá adopcia profi predsedov | Niche zameranie + cielený outreach (LinkedIn, ČKAIT) |
