/**
 * Seedovanie reálnych pražských správcovských firiem.
 *
 * Skript NEPREPISUJE existujúce demo dáta — používa `upsert` podľa `slug`,
 * takže ho možno bezpečne spustiť opakovane.
 *
 * Reálne firmy sa vkladajú s:
 *   - `schvaleny: true`      → zobrazia sa vo verejnom katalogu hneď
 *   - `realnyZdroj: true`    → karty majú zelený badge "Reálná firma"
 *   - `overeny: false`       → firma ešte sama svoje údaje nepotvrdila
 *
 * Spustenie:
 *   npm run db:seed-realni
 */

import { PrismaClient } from "@prisma/client";
import { realniSpravciSeed } from "./seed-data/realni-spravci";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seedujem reálne správcovské firmy (čakajú na schválenie)...");

  for (const s of realniSpravciSeed) {
    await prisma.spravce.upsert({
      where: { slug: s.slug },
      update: {
        nazev: s.nazev,
        logo: s.logo,
        popis: s.popis,
        regionyPusobnosti: JSON.stringify(s.regionyPusobnosti),
        pocetDomu: s.pocetDomu,
        pocetJednotek: s.pocetJednotek,
        rokZalozeni: s.rokZalozeni,
        ucetniSprava: s.sluzby.ucetniSprava,
        technickaSprava: s.sluzby.technickaSprava,
        havarijniSluzba: s.sluzby.havarijniSluzba,
        onlinePortal: s.sluzby.onlinePortal,
        onlineHlasovani: s.sluzby.onlineHlasovani,
        zkRekonstrukce: s.sluzby.zkRekonstrukce,
        zkDotace: s.sluzby.zkDotace,
        zkUvery: s.sluzby.zkUvery,
        pravniPoradenstvi: s.sluzby.pravniPoradenstvi,
        cenaOd: s.cenaOd || null,
        cenaDo: s.cenaDo || null,
        kontaktniOsoba: s.kontaktniOsoba,
        email: s.email,
        telefon: s.telefon,
        web: s.web,
        adresa: s.adresa,
        reference: JSON.stringify(s.reference),
        schvaleny: true,
        realnyZdroj: true,
      },
      create: {
        slug: s.slug,
        nazev: s.nazev,
        logo: s.logo,
        popis: s.popis,
        kraj: "Praha",
        mesto: "Praha",
        regionyPusobnosti: JSON.stringify(s.regionyPusobnosti),
        pocetDomu: s.pocetDomu,
        pocetJednotek: s.pocetJednotek,
        rokZalozeni: s.rokZalozeni,
        ucetniSprava: s.sluzby.ucetniSprava,
        technickaSprava: s.sluzby.technickaSprava,
        havarijniSluzba: s.sluzby.havarijniSluzba,
        onlinePortal: s.sluzby.onlinePortal,
        onlineHlasovani: s.sluzby.onlineHlasovani,
        zkRekonstrukce: s.sluzby.zkRekonstrukce,
        zkDotace: s.sluzby.zkDotace,
        zkUvery: s.sluzby.zkUvery,
        pravniPoradenstvi: s.sluzby.pravniPoradenstvi,
        cenaOd: s.cenaOd || null,
        cenaDo: s.cenaDo || null,
        kontaktniOsoba: s.kontaktniOsoba,
        email: s.email,
        telefon: s.telefon,
        web: s.web,
        adresa: s.adresa,
        reference: JSON.stringify(s.reference),
        overeny: false,
        premium: false,
        zviraznen: false,
        schvaleny: true,
        aktivni: true,
        realnyZdroj: true,
        prumerneHodnoceni: 0,
        pocetRecenzi: 0,
      },
    });
    console.log(`   ✓ ${s.nazev}`);
  }

  console.log(`\n🎉 Hotovo. ${realniSpravciSeed.length} reálnych firiem v DB.`);
  console.log(`   schvaleny=true, realnyZdroj=true → zobrazia sa v katalogu`);
  console.log(`   s odlišujúcim badge "Reálná firma".`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
