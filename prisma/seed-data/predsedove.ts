/**
 * Demo dáta — profesionálni predsedovia SVJ pre Prahu.
 * Všetky údaje sú fiktívne (rovnaké upozornenie ako pri správcoch).
 */

export type PredsedaSeed = {
  slug: string;
  jmeno: string;
  fotografie: string;
  popis: string;
  regionyPusobnosti: string[];
  pocetSvj: number;
  velikostDomuMin: number;
  velikostDomuMax: number;
  rokyZkusenosti: number;
  specializace: string[];
  vzdelani: string;
  certifikace: string[];
  cenaOd: number;
  cenaDo: number;
  email: string;
  telefon: string;
  linkedIn?: string;
  reference: string[];
  overeny: boolean;
  premium: boolean;
  prumerneHodnoceni: number;
  pocetRecenzi: number;
};

const avatar = (jmeno: string, bg: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(jmeno)}&background=${bg}&color=fff&size=400&bold=true&format=png`;

const prahyAllArr: string[] = [
  "Praha 1", "Praha 2", "Praha 3", "Praha 4", "Praha 5",
  "Praha 6", "Praha 7", "Praha 8", "Praha 9", "Praha 10",
];

export const predsedoveSeed: PredsedaSeed[] = [
  {
    slug: "ing-petr-jelinek",
    jmeno: "Ing. Petr Jelínek",
    fotografie: avatar("Petr Jelinek", "1a5cf5"),
    popis:
      "Profesionálním předsedou SVJ jsem na plný úvazek od roku 2014. Vystudoval jsem stavební fakultu ČVUT, mám zkušenosti s vedením rekonstrukcí v hodnotě přes 80 milionů Kč. Specializuji se na střední a velké domy v Praze.",
    regionyPusobnosti: ["Praha 4", "Praha 5", "Praha 6", "Praha 10"],
    pocetSvj: 12,
    velikostDomuMin: 30,
    velikostDomuMax: 200,
    rokyZkusenosti: 11,
    specializace: ["Rekonstrukce", "Dotace NZÚ", "Vedení schůzí", "Energetické úspory"],
    vzdelani: "Ing., FSv ČVUT",
    certifikace: ["Autorizovaný inženýr ČKAIT", "Specialista NZÚ"],
    cenaOd: 8000,
    cenaDo: 25000,
    email: "petr.jelinek@predsedavklidu.demo",
    telefon: "+420 731 555 100",
    linkedIn: "https://linkedin.com/in/petr-jelinek-demo",
    reference: [
      "SVJ Praha 5, Smíchov — kompletní revitalizace 96 j., 28M Kč",
      "SVJ Praha 4, Háje — rekonstrukce výtahů a fasády, 18M Kč",
      "SVJ Praha 6, Dejvice — vyřízení úvěru ČSOB Postavte, 12M Kč",
    ],
    overeny: true, premium: true,
    prumerneHodnoceni: 4.9, pocetRecenzi: 23,
  },
  {
    slug: "mgr-jana-svobodova",
    jmeno: "Mgr. Jana Svobodová",
    fotografie: avatar("Jana Svobodova", "be185d"),
    popis:
      "Právnička se specializací na bytové právo a SVJ. 9 let působím jako profesionální předseda. Pomáhám SVJ řešit spory s vlastníky, neplatiče, problematické stanovy.",
    regionyPusobnosti: ["Praha 1", "Praha 2", "Praha 3", "Praha 10"],
    pocetSvj: 8,
    velikostDomuMin: 15,
    velikostDomuMax: 80,
    rokyZkusenosti: 9,
    specializace: ["Právo", "Spory s vlastníky", "Stanovy SVJ", "Neplatiči"],
    vzdelani: "Mgr., PF UK",
    certifikace: ["Advokátní koncipientka 2012-2016"],
    cenaOd: 6500,
    cenaDo: 18000,
    email: "jana.svobodova@predsedavklidu.demo",
    telefon: "+420 602 111 222",
    linkedIn: "https://linkedin.com/in/jana-svobodova-demo",
    reference: [
      "SVJ Vinohrady — vymáhání pohledávek 1.4M Kč, úspěch 92 %",
      "SVJ Praha 1 — nové stanovy podle ZOK, 28 j.",
    ],
    overeny: true, premium: true,
    prumerneHodnoceni: 4.8, pocetRecenzi: 17,
  },
  {
    slug: "ing-tomas-hajek",
    jmeno: "Ing. Tomáš Hájek",
    fotografie: avatar("Tomas Hajek", "0891b2"),
    popis:
      "Stavební inženýr s 18letou praxí. Jako profesionální předseda fungujem od 2018 — primárně technické řízení, BOZP, koordinace dodavatelů.",
    regionyPusobnosti: ["Praha 8", "Praha 9", "Praha 14"],
    pocetSvj: 6,
    velikostDomuMin: 50,
    velikostDomuMax: 250,
    rokyZkusenosti: 7,
    specializace: ["Technické řízení", "BOZP", "Velké rekonstrukce"],
    vzdelani: "Ing., FSv ČVUT",
    certifikace: ["Koordinátor BOZP", "Autorizovaný technik"],
    cenaOd: 10000,
    cenaDo: 30000,
    email: "tomas.hajek@predsedavklidu.demo",
    telefon: "+420 777 800 100",
    reference: [
      "BD Černý Most — koordinace rekonstrukce 42M Kč, 220 j.",
      "BD Prosek — výměna rozvodů, 184 j.",
    ],
    overeny: true, premium: true,
    prumerneHodnoceni: 4.7, pocetRecenzi: 14,
  },
  {
    slug: "ing-lucie-novakova",
    jmeno: "Ing. Lucie Nováková",
    fotografie: avatar("Lucie Novakova", "9333ea"),
    popis:
      "Ekonomka, profesionální předsedkyní 6 let. Důraz kladu na finanční zdraví SVJ — rezervy, plány oprav, transparentní rozpočty. Ráda pracuji se SVJ, které chce dlouhodobou stabilitu.",
    regionyPusobnosti: ["Praha 2", "Praha 3", "Praha 7"],
    pocetSvj: 7,
    velikostDomuMin: 20,
    velikostDomuMax: 100,
    rokyZkusenosti: 6,
    specializace: ["Finanční plánování", "Rezervy", "Účetnictví SVJ", "Reporting"],
    vzdelani: "Ing., VŠE Praha",
    certifikace: ["Daňový poradce KDP ČR"],
    cenaOd: 7000,
    cenaDo: 20000,
    email: "lucie.novakova@predsedavklidu.demo",
    telefon: "+420 730 222 333",
    reference: [
      "SVJ Letná — 7 SVJ v lokalitě, dlouhodobé plány oprav",
      "SVJ Vinohrady — úspora 18 % na provozních nákladech",
    ],
    overeny: true, premium: true,
    prumerneHodnoceni: 4.9, pocetRecenzi: 19,
  },
  {
    slug: "ing-david-svoboda",
    jmeno: "Ing. David Svoboda",
    fotografie: avatar("David Svoboda", "059669"),
    popis:
      "Profesionální předseda zaměřený na energetiku — fotovoltaika, tepelná čerpadla, izolace. Aktivně pomáhám SVJ snižovat náklady na energie.",
    regionyPusobnosti: ["Praha 4", "Praha 11", "Praha 12"],
    pocetSvj: 5,
    velikostDomuMin: 40,
    velikostDomuMax: 150,
    rokyZkusenosti: 5,
    specializace: ["FVE", "Energetické úspory", "Dotace NZÚ", "Tepelná čerpadla"],
    vzdelani: "Ing., FEL ČVUT",
    certifikace: ["Energetický specialista", "Specialista FVE"],
    cenaOd: 9000,
    cenaDo: 22000,
    email: "david.svoboda@predsedavklidu.demo",
    telefon: "+420 731 444 555",
    reference: [
      "SVJ Modřany — FVE 84 kWp + dotace NZÚ 1.8M",
      "BD Háje — kompletní izolace + tepelné čerpadlo",
    ],
    overeny: true, premium: false,
    prumerneHodnoceni: 4.8, pocetRecenzi: 11,
  },
  {
    slug: "ing-pavel-zeman",
    jmeno: "Ing. Pavel Zeman",
    fotografie: avatar("Pavel Zeman", "ea580c"),
    popis:
      "Předsedou jsem 13 let. Mám zkušenost s desítkami schůzí, problematickými vlastníky i krizovými situacemi. Pracuji rád s menšími a středními SVJ.",
    regionyPusobnosti: ["Praha 5", "Praha 13", "Praha 16", "Praha 17"],
    pocetSvj: 9,
    velikostDomuMin: 12,
    velikostDomuMax: 80,
    rokyZkusenosti: 13,
    specializace: ["Vedení schůzí", "Mediace sporů", "Provoz domu"],
    vzdelani: "Ing., VŠE Praha",
    certifikace: ["Mediator zapsaný v seznamu"],
    cenaOd: 5500,
    cenaDo: 15000,
    email: "pavel.zeman@predsedavklidu.demo",
    telefon: "+420 605 111 100",
    reference: [
      "9 SVJ v Praze 5 a 13 — dlouhodobá spolupráce",
      "Úspěšná mediace u 6 sousedských sporů",
    ],
    overeny: true, premium: false,
    prumerneHodnoceni: 4.5, pocetRecenzi: 27,
  },
  {
    slug: "mgr-katerina-prochazkova",
    jmeno: "Mgr. Kateřina Procházková",
    fotografie: avatar("Katerina Prochazkova", "db2777"),
    popis:
      "Specializuji se na nově vznikající SVJ při developerských projektech. Pomáhám s předáním od developera, kontrolou vad, prvním rokem provozu.",
    regionyPusobnosti: ["Praha 5", "Praha 8", "Praha 9", "Praha 10"],
    pocetSvj: 6,
    velikostDomuMin: 30,
    velikostDomuMax: 200,
    rokyZkusenosti: 4,
    specializace: ["Novostavby", "Předání od developera", "Reklamace vad", "Záruční opravy"],
    vzdelani: "Mgr., PF UK",
    certifikace: ["Specializace stavební právo"],
    cenaOd: 8000,
    cenaDo: 22000,
    email: "katerina.prochazkova@predsedavklidu.demo",
    telefon: "+420 720 333 444",
    reference: [
      "SVJ Smíchov City — předání + 1. rok provozu",
      "SVJ Rohan — uplatnění reklamací 8.4M Kč",
    ],
    overeny: true, premium: true,
    prumerneHodnoceni: 4.9, pocetRecenzi: 8,
  },
  {
    slug: "ing-radek-vlcek",
    jmeno: "Ing. Radek Vlček",
    fotografie: avatar("Radek Vlcek", "713f12"),
    popis:
      "Specialista na památkové domy v centru Prahy. Vedu jednání s NPÚ, magistrátem, řeším historické stavební nuance.",
    regionyPusobnosti: ["Praha 1", "Praha 2"],
    pocetSvj: 5,
    velikostDomuMin: 8,
    velikostDomuMax: 40,
    rokyZkusenosti: 10,
    specializace: ["Památkové domy", "NPÚ", "Historické rekonstrukce"],
    vzdelani: "Ing. arch., FA ČVUT",
    certifikace: ["Autorizovaný architekt ČKA"],
    cenaOd: 12000,
    cenaDo: 35000,
    email: "radek.vlcek@predsedavklidu.demo",
    telefon: "+420 222 818 100",
    reference: [
      "5 památkově chráněných domů v Praze 1",
      "Restaurátorský záměr SVJ Pařížská — schválen NPÚ",
    ],
    overeny: true, premium: true,
    prumerneHodnoceni: 5.0, pocetRecenzi: 6,
  },
  {
    slug: "ing-michal-kratky",
    jmeno: "Ing. Michal Krátký",
    fotografie: avatar("Michal Kratky", "0d9488"),
    popis:
      "Profesionální předseda na plný úvazek 8 let. Stojím nohama na zemi — jasná komunikace, žádné fíky, žádné překvapení v rozpočtu.",
    regionyPusobnosti: ["Praha 6", "Praha 7", "Praha 8"],
    pocetSvj: 10,
    velikostDomuMin: 20,
    velikostDomuMax: 120,
    rokyZkusenosti: 8,
    specializace: ["Vedení SVJ", "Rekonstrukce", "Vyjednávání s dodavateli"],
    vzdelani: "Ing., FSv ČVUT",
    certifikace: ["Autorizovaný inženýr"],
    cenaOd: 7000,
    cenaDo: 20000,
    email: "michal.kratky@predsedavklidu.demo",
    telefon: "+420 731 999 888",
    reference: [
      "10 SVJ v Praze 6-8, dlouhodobá spolupráce 5+ let",
      "Úspora 12 % na dodavatelských smlouvách",
    ],
    overeny: true, premium: false,
    prumerneHodnoceni: 4.7, pocetRecenzi: 22,
  },
  {
    slug: "ing-bara-tomasova",
    jmeno: "Ing. Bára Tomášová",
    fotografie: avatar("Bara Tomasova", "4338ca"),
    popis:
      "Mladá, ale s 6letou praxí. Důraz kladu na digitalizaci SVJ — online hlasování, mobilní aplikace, paperless schůze.",
    regionyPusobnosti: ["Praha 5", "Praha 6", "Praha 13"],
    pocetSvj: 5,
    velikostDomuMin: 30,
    velikostDomuMax: 120,
    rokyZkusenosti: 6,
    specializace: ["Digitalizace SVJ", "Online hlasování", "Smart home"],
    vzdelani: "Ing., FEL ČVUT",
    certifikace: ["Certifikace eGovernment"],
    cenaOd: 8500,
    cenaDo: 19000,
    email: "bara.tomasova@predsedavklidu.demo",
    telefon: "+420 730 100 200",
    reference: [
      "5 SVJ se 100 % digitálním provozem",
      "Implementace online hlasování u 4 schůzí",
    ],
    overeny: true, premium: false,
    prumerneHodnoceni: 4.8, pocetRecenzi: 9,
  },
  {
    slug: "ing-jan-mares",
    jmeno: "Ing. Jan Mareš",
    fotografie: avatar("Jan Mares", "1e3a8a"),
    popis:
      "Bývalý projektant s 22 lety praxe. Posledních 7 let jako profesionální předseda. Krizový management, řešení problémových situací, převody správy.",
    regionyPusobnosti: prahyAllArr,
    pocetSvj: 8,
    velikostDomuMin: 50,
    velikostDomuMax: 300,
    rokyZkusenosti: 7,
    specializace: ["Krizový management", "Převod správy", "Velké projekty"],
    vzdelani: "Ing., FSv ČVUT",
    certifikace: ["Autorizovaný inženýr ČKAIT"],
    cenaOd: 12000,
    cenaDo: 40000,
    email: "jan.mares@predsedavklidu.demo",
    telefon: "+420 602 555 100",
    reference: [
      "Záchrana 3 SVJ v exekučním nebezpečí",
      "BD Černý Most — krizové řízení rekonstrukce za 38M",
    ],
    overeny: true, premium: true,
    prumerneHodnoceni: 4.6, pocetRecenzi: 13,
  },
  {
    slug: "ing-helena-novotna",
    jmeno: "Ing. Helena Novotná",
    fotografie: avatar("Helena Novotna", "047857"),
    popis:
      "Účetní s 25letou praxí, posledních 6 let jako profesionální předsedkyně. Specializuji se na finančně zdravé vedení menších SVJ.",
    regionyPusobnosti: ["Praha 4", "Praha 10", "Praha 11"],
    pocetSvj: 11,
    velikostDomuMin: 8,
    velikostDomuMax: 50,
    rokyZkusenosti: 6,
    specializace: ["Účetnictví SVJ", "Finance", "Menší domy"],
    vzdelani: "Ing., VŠE Praha",
    certifikace: ["Daňový poradce KDP ČR", "Účetní expert"],
    cenaOd: 4500,
    cenaDo: 12000,
    email: "helena.novotna@predsedavklidu.demo",
    telefon: "+420 224 555 888",
    reference: [
      "11 menších SVJ — průměrná velikost 22 j.",
      "Bez chyby u finančního auditu 6 let v řadě",
    ],
    overeny: true, premium: false,
    prumerneHodnoceni: 4.8, pocetRecenzi: 28,
  },
];

