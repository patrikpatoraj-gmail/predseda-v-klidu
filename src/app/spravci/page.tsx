import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SpravciFilters } from "@/components/SpravciFilters";
import { SpravciCatalog } from "@/components/SpravciCatalog";
import { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Katalog správců SVJ v Praze",
  description:
    "Najděte ověřeného správce SVJ pro váš bytový dům v Praze. Porovnejte ceny, hodnocení, zkušenosti. Bezplatná poptávka.",
};

type SearchParams = Promise<{
  region?: string;
  velikost?: string;
  cenaOd?: string;
  cenaDo?: string;
  hodnoceni?: string;
  sluzby?: string;
  overeny?: string;
}>;

export default async function SpravciPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;

  const where: Prisma.SpravceWhereInput = {
    aktivni: true,
    schvaleny: true,
  };

  // ---------- region ----------
  if (sp.region) {
    where.regionyPusobnosti = { contains: sp.region };
  }

  // ---------- velikost (heuristika cez pocetJednotek / pocetDomu priemer) ----------
  if (sp.velikost === "s") where.pocetJednotek = { lte: 1000 };
  else if (sp.velikost === "m") where.pocetJednotek = { gte: 800, lte: 3000 };
  else if (sp.velikost === "l") where.pocetJednotek = { gte: 2500 };

  // ---------- cena ----------
  if (sp.cenaOd) where.cenaOd = { gte: Number(sp.cenaOd) };
  if (sp.cenaDo) where.cenaDo = { lte: Number(sp.cenaDo) };

  // ---------- hodnotenie ----------
  if (sp.hodnoceni) where.prumerneHodnoceni = { gte: Number(sp.hodnoceni) };

  // ---------- služby ----------
  if (sp.sluzby) {
    const sluzby = sp.sluzby.split(",").filter(Boolean);
    for (const s of sluzby) {
      (where as Record<string, unknown>)[s] = true;
    }
  }

  // ---------- ověřené ----------
  if (sp.overeny === "1") where.overeny = true;

  const [spravci, totalCount] = await Promise.all([
    prisma.spravce.findMany({
      where,
      orderBy: [{ premium: "desc" }, { prumerneHodnoceni: "desc" }, { pocetRecenzi: "desc" }],
    }),
    prisma.spravce.count({ where: { aktivni: true, schvaleny: true } }),
  ]);

  return (
    <>
      <section className="bg-ink-50/40 border-b border-ink-100">
        <div className="container-wide py-10">
          <nav className="text-xs text-ink-500 mb-3">
            <span>Domů</span> <span className="mx-1">›</span>
            <span className="text-ink-700">Správci SVJ</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold">Katalog správců SVJ v Praze</h1>
          <p className="mt-2 text-ink-600 max-w-2xl">
            Ověřené správcovské firmy specializované na SVJ a bytové domy. Filtrujte
            podle pražské části, velikosti domu i konkrétních služeb.
          </p>
        </div>
      </section>

      <div className="container-wide py-10 grid lg:grid-cols-[280px_1fr] gap-8">
        <SpravciFilters active={sp} />
        <SpravciCatalog spravci={spravci} totalCount={totalCount} />
      </div>
    </>
  );
}
