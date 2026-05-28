import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { spravciSeed } from "./seed-data/spravci";
import { predsedoveSeed } from "./seed-data/predsedove";
import { clankySeed } from "./seed-data/clanky";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Začínam seedovať databázu...");

  // -------------------- ADMIN --------------------
  const adminEmail = process.env.ADMIN_EMAIL || "admin@predsedavklidu.cz";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";

  const adminHash = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminHash,
      name: "Administrátor",
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin: ${admin.email} / ${adminPassword}`);

  // -------------------- SPRÁVCOVIA --------------------
  console.log("🏢 Seedujem správcovské firmy...");
  for (const s of spravciSeed) {
    await prisma.spravce.upsert({
      where: { slug: s.slug },
      update: {},
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
        cenaOd: s.cenaOd,
        cenaDo: s.cenaDo,
        kontaktniOsoba: s.kontaktniOsoba,
        email: s.email,
        telefon: s.telefon,
        web: s.web,
        adresa: s.adresa,
        reference: JSON.stringify(s.reference),
        overeny: s.overeny,
        premium: s.premium,
        zviraznen: s.premium,
        schvaleny: true,
        aktivni: true,
        prumerneHodnoceni: s.prumerneHodnoceni,
        pocetRecenzi: s.pocetRecenzi,
      },
    });
  }
  console.log(`✅ ${spravciSeed.length} správcov`);

  // -------------------- PREDSEDOVIA --------------------
  console.log("👤 Seedujem profi predsedov...");
  for (const p of predsedoveSeed) {
    await prisma.predseda.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        jmeno: p.jmeno,
        fotografie: p.fotografie,
        popis: p.popis,
        kraj: "Praha",
        mesto: "Praha",
        regionyPusobnosti: JSON.stringify(p.regionyPusobnosti),
        pocetSvj: p.pocetSvj,
        velikostDomuMin: p.velikostDomuMin,
        velikostDomuMax: p.velikostDomuMax,
        rokyZkusenosti: p.rokyZkusenosti,
        specializace: JSON.stringify(p.specializace),
        vzdelani: p.vzdelani,
        certifikace: JSON.stringify(p.certifikace),
        cenaOd: p.cenaOd,
        cenaDo: p.cenaDo,
        email: p.email,
        telefon: p.telefon,
        linkedIn: p.linkedIn,
        reference: JSON.stringify(p.reference),
        overeny: p.overeny,
        premium: p.premium,
        schvaleny: true,
        aktivni: true,
        prumerneHodnoceni: p.prumerneHodnoceni,
        pocetRecenzi: p.pocetRecenzi,
      },
    });
  }
  console.log(`✅ ${predsedoveSeed.length} predsedov`);

  // -------------------- ČLÁNKY --------------------
  console.log("📰 Seedujem články...");
  for (const c of clankySeed) {
    await prisma.clanek.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        nadpis: c.nadpis,
        perex: c.perex,
        obsah: c.obsah,
        obrazek: c.obrazek,
        kategorie: c.kategorie,
        tagy: JSON.stringify(c.tagy),
        premium: c.premium,
        publikovany: true,
        publikovanoAt: new Date(),
        seoTitle: c.seoTitle,
        seoDescription: c.seoDescription,
      },
    });
  }
  console.log(`✅ ${clankySeed.length} článkov`);

  // -------------------- UKÁŽKOVÉ RECENZIE --------------------
  console.log("⭐ Seedujem ukážkové recenzie...");

  const spravciDb = await prisma.spravce.findMany();
  const recenzeTexty = [
    {
      nadpis: "Konečně klid v domě",
      text: "Po 3 letech s předchozím správcem, kde nás nikdo neslyšel, je tohle obrovský rozdíl. Komunikují, dodržují termíny, mají moderní portál.",
      hodnoceni: 5, komunikace: 5, kvalitaSpravy: 5, rychlost: 5,
    },
    {
      nadpis: "Profesionální přístup, ale dražší",
      text: "Služby na vysoké úrovni, ale o 20 % nad konkurencí. Pro náš dům to stojí za to, ale je třeba s tím počítat.",
      hodnoceni: 4, komunikace: 5, kvalitaSpravy: 5, rychlost: 4,
    },
    {
      nadpis: "Doporučujeme — pomohli nám s rekonstrukcí",
      text: "Kompletně zařídili rekonstrukci výtahů včetně dotace. Komunikace s vlastníky byla výborná, nebyly žádné překvapení.",
      hodnoceni: 5, komunikace: 5, kvalitaSpravy: 5, rychlost: 4,
    },
    {
      nadpis: "Standard, nic víc",
      text: "Funguje to, ale bez jakéhokoliv nadšení. Pokud čekáte vlastní iniciativu, hledejte jinde.",
      hodnoceni: 3, komunikace: 3, kvalitaSpravy: 4, rychlost: 3,
    },
    {
      nadpis: "Skvělá havarijní služba",
      text: "Praskl nám stoupací rozvod o víkendu. Technik dorazil za 40 minut. To opravdu funguje.",
      hodnoceni: 5, komunikace: 4, kvalitaSpravy: 5, rychlost: 5,
    },
  ];

  let i = 0;
  for (const spravce of spravciDb.slice(0, 10)) {
    for (const r of recenzeTexty.slice(0, 3 + (i % 3))) {
      await prisma.recenze.create({
        data: {
          hodnoceni: r.hodnoceni,
          komunikace: r.komunikace,
          kvalitaSpravy: r.kvalitaSpravy,
          rychlost: r.rychlost,
          nadpis: r.nadpis,
          text: r.text,
          autorJmeno: ["Petr H.", "Jana N.", "Tomáš S.", "Markéta V.", "Lukáš K."][i % 5],
          autorEmail: `vlastnik${i}@demo.cz`,
          autorSvj: `SVJ Demo ${i + 1}`,
          spravceId: spravce.id,
          schvalena: true,
        },
      });
      i++;
    }
  }
  console.log(`✅ ${i} recenzií`);

  console.log("\n🎉 Hotovo!");
  console.log(`\n📊 Súhrn:`);
  console.log(`   - ${spravciSeed.length} správcovských firiem`);
  console.log(`   - ${predsedoveSeed.length} profi predsedov`);
  console.log(`   - ${clankySeed.length} článkov`);
  console.log(`   - ${i} recenzií`);
  console.log(`\n🔑 Admin: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
