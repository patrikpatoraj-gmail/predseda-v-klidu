/**
 * Demo dáta — vzdelávacie články pre SVJ a bytové domy.
 */

export type ClanekSeed = {
  slug: string;
  nadpis: string;
  perex: string;
  obsah: string;
  obrazek: string;
  kategorie: string;
  tagy: string[];
  premium: boolean;
  seoTitle: string;
  seoDescription: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const clankySeed: ClanekSeed[] = [
  {
    slug: "jak-zmenit-spravce-svj",
    nadpis: "Jak změnit správce SVJ krok za krokem (2026)",
    perex:
      "Nejste spokojeni se stávajícím správcem? Změna není složitá, pokud znáte správný postup. Provedeme vás celým procesem od výpovědi po předání dokumentace.",
    obsah: `# Jak změnit správce SVJ krok za krokem

Nespokojenost se správcem je nejčastější důvod, proč nás SVJ kontaktují. Dobrá zpráva — změna správce je legálně i prakticky proveditelná, pokud postupujete uvážlivě.

## 1. Zhodnoťte situaci

Než začnete proces měnit, ujasněte si:
- **Co konkrétně nefunguje?** Komunikace? Účetnictví? Reakce na havárie?
- **Je problém v lidech, nebo v procesech?** Někdy stačí změna kontaktní osoby.
- **Co očekáváte od nového správce?** Cena, služby, digitalizace?

## 2. Zkontrolujte smlouvu

Smlouva o správě musí obsahovat:
- výpovědní lhůtu (typicky 3–6 měsíců),
- výpovědní důvody,
- závazek předat dokumentaci.

Smlouvu uzavřenou na dobu neurčitou lze obvykle vypovědět bez udání důvodu.

## 3. Vyberte nového správce

Doporučujeme oslovit minimálně 3 správce a získat:
- nabídku služeb,
- cenovou nabídku,
- referenční SVJ podobné velikosti.

Můžete využít [Předseda v klidu](/poptavka) — jednou poptávkou oslovíte více správců najednou.

## 4. Schválení na shromáždění

Změna správce musí být schválena shromážděním vlastníků:
- pozvánka minimálně 30 dní předem,
- v programu konkrétní bod: „Volba nového správce",
- prostá většina přítomných (pokud stanovy neurčují jinak).

## 5. Výpověď + uzavření nové smlouvy

- Výpověď dejte písemně, doporučeně.
- Novou smlouvu uzavřete s nástupem od konce výpovědní lhůty.
- Předávací protokol je klíčový — viz dále.

## 6. Předání dokumentace

Co musí starý správce předat:
- účetnictví, výpisy z účtů, dohody,
- evidenci vlastníků,
- technickou dokumentaci (revize, projekty),
- smlouvy s dodavateli,
- klíče, přístupy do portálů.

Trvejte na **písemném předávacím protokolu**.

## 7. Co kontrolovat během prvních 90 dní

- správnost účtování,
- převod záloh na nový účet,
- aktualizaci evidence v katastru,
- nahlášení změny dodavatelům energií.

---

**Tip:** Pokud máte profesionálního předsedu, celý proces zvládne za vás.`,
    obrazek: img("photo-1551836022-deb4988cc6c0"),
    kategorie: "Změna správce",
    tagy: ["Změna správce", "Smlouva", "Shromáždění"],
    premium: false,
    seoTitle: "Jak změnit správce SVJ 2026 — návod krok za krokem",
    seoDescription:
      "Kompletní průvodce změnou správce SVJ. Smlouva, shromáždění, výpovědní lhůta, předání dokumentace. Ověřený postup.",
  },
  {
    slug: "dotace-nzu-pro-bytove-domy",
    nadpis: "Dotace Nová zelená úsporám pro bytové domy 2026",
    perex:
      "Až 50 % nákladů na zateplení, výměnu oken, FVE i tepelná čerpadla. Co aktuální výzva NZÚ nabízí bytovým domům a jak žádat?",
    obsah: `# Dotace NZÚ pro bytové domy v roce 2026

Program Nová zelená úsporám (NZÚ) pokračuje i v roce 2026 a bytové domy jsou jeho významným adresátem.

## Co lze dotovat

- **Zateplení obvodových stěn, střechy, podlahy** — až 1 200 Kč/m²
- **Výměna oken a dveří** — až 4 000 Kč/m²
- **Fotovoltaika (FVE)** — až 17 000 Kč/kWp
- **Tepelné čerpadlo** — až 100 000 Kč/jednotku
- **Příprava teplé vody** — solární systémy

## Výše dotace

- Pro bytové domy v Praze: až **50 % uznatelných nákladů**
- Kombinace opatření = bonus +10 %

## Kdy a jak žádat

- Příjem žádostí: kontinuálně
- Žádost se podává **před realizací** (nově se uvolnily dodatečné výzvy i pro již zahájené projekty — ověřte aktuální stav)
- Realizace do 36 měsíců od schválení

## Kdo to může vyřídit

- Profesionální předseda SVJ se zkušeností s dotacemi
- Specializovaný správce
- Externí dotační poradce (typicky 3–7 % z dotace)

## Doporučený postup

1. **Energetický posudek** (povinná příloha)
2. **Schválení vlastníky** (75 % hlasů pro velké investice)
3. **Výběrové řízení** na dodavatele
4. **Podání žádosti**
5. **Realizace + průběžné výkazy**
6. **Vyúčtování + výplata dotace**

> **Pozor:** Detaily NZÚ se mění. Před žádostí ověřte aktuální podmínky na sfzp.cz nebo se obraťte na profesionála.`,
    obrazek: img("photo-1509391366360-2e959784a276"),
    kategorie: "Dotace",
    tagy: ["NZÚ", "Dotace", "Zateplení", "FVE"],
    premium: false,
    seoTitle: "Dotace NZÚ pro bytové domy 2026 — kompletní průvodce",
    seoDescription:
      "Nová zelená úsporám 2026 pro bytové domy. Až 50 % dotace na zateplení, okna, FVE, tepelná čerpadla. Postup, podmínky.",
  },
  {
    slug: "uvery-pro-svj-srovnani-bank",
    nadpis: "Úvěry pro SVJ — srovnání bank a podmínek 2026",
    perex:
      "Plánujete velkou rekonstrukci? Srovnáváme nabídky úvěrů pro SVJ od hlavních českých bank.",
    obsah: `# Úvěry pro SVJ — co nabízejí banky v roce 2026

Velké rekonstrukce SVJ se obvykle nedají financovat z fondu oprav. Úvěr je standardní řešení.

## Typické parametry úvěru pro SVJ

- **Výše:** 0,5 – 80 mil. Kč
- **Splatnost:** 5 – 25 let
- **Sazba:** typicky 4,5 – 6,8 % p.a. (2026)
- **Zajištění:** typicky bez zástavy bytu (jen vinkulace fondu oprav)

## Hlavní hráči na trhu

| Banka | Maximální výše | Maximální splatnost | Specifika |
|-------|---------------|---------------------|-----------|
| ČSOB | 80 M Kč | 25 let | Program Postavte |
| Komerční banka | 60 M Kč | 20 let | Online schvalování |
| Česká spořitelna | 70 M Kč | 25 let | Bez nutnosti zástavy |
| Raiffeisen | 50 M Kč | 20 let | Bonus za zelené opatření |
| ČSAS Stavební | 40 M Kč | 20 let | Kombinace s NZÚ |

> Údaje jsou orientační, vždy si vyžádejte aktuální nabídku.

## Co banka chce vidět

- usnesení shromáždění,
- účetní závěrky 3 roky zpět,
- rozpočet projektu,
- stanovisko správce / předsedy,
- harmonogram splácení.

## Tipy z praxe

- **Oslovte 3 banky najednou** — sazby se liší o 1+ procentní bod.
- **Spojte úvěr s dotací NZÚ** — splátka se výrazně sníží.
- **Vyhněte se předčasné fixaci**, pokud čekáte pokles sazeb.
- **Profesionální předseda** zvládne vyjednání úvěru typicky lépe než dobrovolný (banky to oceňují).`,
    obrazek: img("photo-1554224155-6726b3ff858f"),
    kategorie: "Úvěry",
    tagy: ["Úvěr", "Banky", "Rekonstrukce", "Financování"],
    premium: false,
    seoTitle: "Úvěry pro SVJ 2026 — srovnání bank, sazeb, podmínek",
    seoDescription:
      "Kompletní srovnání úvěrů pro SVJ. ČSOB, KB, Spořitelna, Raiffeisen. Sazby, splatnost, podmínky pro bytové domy.",
  },
  {
    slug: "rekonstrukce-bytoveho-domu-postup",
    nadpis: "Velká rekonstrukce bytového domu — postup od A do Z",
    perex:
      "Co všechno musíte zvládnout, než začnete rekonstruovat. Stavební povolení, výběrové řízení, financování, BOZP, vlastnické vztahy.",
    obsah: `# Velká rekonstrukce bytového domu — postup od A do Z

Rekonstrukce nad 5 milionů Kč je samostatný projekt, který typicky trvá 12–24 měsíců včetně přípravy.

## Fáze 1: Příprava (3–6 měsíců)

1. **Technický audit** — co opravdu potřebuje opravu
2. **Energetický posudek** — pokud žádáte o dotaci
3. **Předběžný rozpočet** — odhadce nákladů
4. **Studie proveditelnosti** — co je možné v rámci dispozice

## Fáze 2: Schválení (1–3 měsíce)

- pozvánka na shromáždění (30 dní předem),
- prezentace projektu vlastníkům,
- hlasování:
  - 75 % všech hlasů pro investice nad rámec běžné údržby (§ 1209 OZ)
  - 100 % pro zásah do společných částí měnící hlasy

## Fáze 3: Projekt + povolení (3–6 měsíců)

- výběr projektanta,
- projektová dokumentace pro stavební povolení,
- stavební úřad: stavební povolení / ohlášení,
- BOZP koordinátor.

## Fáze 4: Financování (paralelně)

- úvěr od banky,
- dotace NZÚ,
- doplnění z fondu oprav.

## Fáze 5: Výběrové řízení (1–2 měsíce)

- minimálně 3 nabídky,
- transparentní výběrová kritéria,
- smlouva o dílo s pevně daným rozpočtem.

## Fáze 6: Realizace (6–18 měsíců)

- pravidelný technický dozor,
- měsíční reporting vlastníkům,
- kontrola průběžných faktur.

## Fáze 7: Předání + záruka

- předávací protokol,
- záruční lhůty (typicky 5 let na stavební část),
- evidence vad.

## Časté chyby SVJ při rekonstrukcích

1. **Špatně zvolený dodavatel** — nejlevnější není nejlevnější.
2. **Žádný technický dozor** — investor nemá kontrolu kvality.
3. **Nedostatečná dokumentace** — problém pro budoucí reklamace.
4. **Chybějící rezerva v rozpočtu** — počítejte +15 % na nepředvídané.

---

**Doporučení:** Pokud nemáte ve SVJ stavebního inženýra, najměte profesionálního předsedu nebo externí technický dozor. Vrátí se vám to mnohonásobně.`,
    obrazek: img("photo-1503387762-592deb58ef4e"),
    kategorie: "Rekonstrukce",
    tagy: ["Rekonstrukce", "Stavební povolení", "Výběrové řízení", "BOZP"],
    premium: true,
    seoTitle: "Rekonstrukce bytového domu 2026 — kompletní postup",
    seoDescription:
      "Velká rekonstrukce SVJ krok za krokem. Příprava, schválení, projekt, financování, výběrové řízení, realizace, předání.",
  },
  {
    slug: "pojisteni-svj-jak-vybirat",
    nadpis: "Pojištění SVJ — co skutečně potřebujete a co je zbytečné",
    perex:
      "Pojištění domu, odpovědnost, právní ochrana, vandalismus. Která pojištění SVJ skutečně potřebuje?",
    obsah: `# Pojištění SVJ — co skutečně potřebujete

Pojištění bytového domu je často přehnané nebo naopak nedostatečné. Pojďme to uvést na pravou míru.

## Povinné minimum

### 1. Pojištění budovy
- živel (povodeň, vichřice, krupobití, požár),
- vodovodní škody,
- odcizení společných částí.

**Pojistná částka:** na **novou hodnotu** stavby (nikoli kupní cenu).

### 2. Pojištění odpovědnosti SVJ
- škody způsobené třetím stranám (např. pád omítky na chodník),
- škody na bytech vlastníků z provozu domu (např. zatečení ze střechy).

**Doporučený limit:** minimálně 10 mil. Kč.

## Doporučené (ne povinné)

- **Pojištění právní ochrany** — pomoc v soudních sporech (zhruba 5–8 tis. Kč ročně).
- **Pojištění strojních zařízení** — výtahy, kotelny.
- **Pojištění pro případ úpadku správce** — pokud správce drží váš účet.

## Co NEpotřebujete

- pojištění „all risk" za 4× cenu standardu pro běžný panelák,
- duplicitní pojištění s pojištěním vlastníků jednotlivých bytů.

## Jak nezaplatit zbytečně

1. **Aktualizujte pojistnou částku** — inflace stavebních prací 2020-2025 byla +40 %.
2. **Soutěžte pojistitele každé 3 roky.**
3. **Profesionální předseda zná typicky bonusové sazby** pro skupinová pojištění.

## Praktické tipy

- Hlaste škody co nejdřív (lhůta typicky 30 dní).
- Vždy zdokumentujte škodu fotograficky.
- Spoluúčast volte rozumně — vyšší znamená nižší pojistné.`,
    obrazek: img("photo-1450101499163-c8848c66ca85"),
    kategorie: "Pojištění",
    tagy: ["Pojištění", "Odpovědnost", "Škody"],
    premium: false,
    seoTitle: "Pojištění SVJ 2026 — průvodce pro předsedy a vlastníky",
    seoDescription:
      "Co skutečně potřebuje pojištění SVJ? Budova, odpovědnost, právní ochrana. Doporučené limity, jak nepřeplatit.",
  },
  {
    slug: "vzor-pozvanky-na-shromazdeni",
    nadpis: "Vzor pozvánky na shromáždění SVJ + checklist",
    perex:
      "Bezvadná pozvánka chrání před napadením usnesení. Stáhněte si vzor a projděte si náš checklist náležitostí.",
    obsah: `# Vzor pozvánky na shromáždění SVJ

Pozvánka na shromáždění je formálně přísně vázaný dokument. Chyba znamená napadnutelnost usnesení.

## Povinné náležitosti pozvánky

Podle § 1207 OZ a typických stanov:

1. **Označení svolavatele** (typicky výbor / předseda).
2. **Místo, datum a hodina konání.**
3. **Program shromáždění** — konkrétní body, ne jen "různé".
4. **Doručení minimálně 30 dní předem** (do datové schránky, e-mailem se souhlasem, nebo do vlastních rukou).
5. **Přílohy** — návrhy usnesení k důležitým bodům.

## Vzor pozvánky

\`\`\`
SVJ Příkladová 12, IČO 12345678
Praha 2, 120 00

POZVÁNKA NA SHROMÁŽDĚNÍ VLASTNÍKŮ JEDNOTEK

Svolavatel: Výbor SVJ
Datum: 15. 10. 2026, 18:00
Místo: společná kolárna, Příkladová 12

Program:
1. Zahájení, ověření usnášeníschopnosti
2. Zpráva o hospodaření za rok 2025
3. Schválení účetní závěrky za rok 2025
4. Návrh rozpočtu na rok 2026
5. Schválení záměru rekonstrukce střechy (rozpočet 1,4 M Kč)
6. Diskuze
7. Závěr

Přílohy:
- Účetní závěrka 2025
- Návrh rozpočtu 2026
- Studie rekonstrukce střechy + 3 nabídky

V Praze dne 1. 9. 2026
Předseda výboru: Jan Novák
\`\`\`

## Checklist (vytisknout!)

- [ ] 30 dní předem doručeno všem vlastníkům
- [ ] Konkrétní program (žádné "různé")
- [ ] Návrhy usnesení v přílohách u bodů s hlasováním
- [ ] Místo dostupné mobilně obtížně postiženým
- [ ] Datová schránka u všech, kdo ji mají
- [ ] U bodů nad rámec běžné údržby uveden požadovaný kvórum

## Časté chyby

- Vágní program → napadnutelnost
- Doručení 28 dní předem → napadnutelnost
- Zapomenutí přiložit návrh usnesení → napadnutelnost
- Bod „různé" s hlasováním → napadnutelnost`,
    obrazek: img("photo-1454165804606-c3d57bc86b40"),
    kategorie: "Vzory",
    tagy: ["Pozvánka", "Shromáždění", "Vzor", "Právo"],
    premium: false,
    seoTitle: "Vzor pozvánky na shromáždění SVJ 2026 + checklist",
    seoDescription:
      "Bezvadná pozvánka na shromáždění SVJ. Vzor ke stažení, povinné náležitosti, checklist. Předejděte napadnutelnosti usnesení.",
  },
];
