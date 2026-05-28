import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PredsedaCard } from "@/components/PredsedaCard";
import { PredsedoveFilters } from "@/components/PredsedoveFilters";
import { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Profesionální předsedové SVJ v Praze",
  description:
    "Hledáte externího profesionálního předsedu pro vaše SVJ? Procházejte profily se zkušenostmi, referencemi a hodnocením.",
};

type SearchParams = Promise<{
  region?: string;
  specializace?: string;
}>;

export default async function PredsedovePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;

  const where: Prisma.PredsedaWhereInput = {
    aktivni: true,
    schvaleny: true,
  };

  if (sp.region) where.regionyPusobnosti = { contains: sp.region };
  if (sp.specializace) where.specializace = { contains: sp.specializace };

  const predsedove = await prisma.predseda.findMany({
    where,
    orderBy: [{ premium: "desc" }, { prumerneHodnoceni: "desc" }],
  });

  return (
    <>
      <section className="bg-ink-50/40 border-b border-ink-100">
        <div className="container-wide py-10">
          <nav className="text-xs text-ink-500 mb-3">
            <span>Domů</span> <span className="mx-1">›</span>
            <span className="text-ink-700">Profi předsedové</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold">Profesionální předsedové SVJ v Praze</h1>
          <p className="mt-2 text-ink-600 max-w-2xl">
            Externí profesionálové, kteří vedou SVJ na plný úvazek. Stavební inženýři,
            právníci, ekonomové — vyberte si specializaci, kterou váš dům potřebuje.
          </p>
        </div>
      </section>

      <div className="container-wide py-10">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <PredsedoveFilters active={sp} />
          <span className="text-sm text-ink-600">
            Nalezeno <strong className="text-ink-950">{predsedove.length}</strong> předsedů
          </span>
        </div>

        {predsedove.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-ink-600">Žádné výsledky.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {predsedove.map((p) => (
              <PredsedaCard key={p.id} predseda={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
