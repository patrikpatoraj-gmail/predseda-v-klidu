import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/Badge";
import { KATEGORIE_CLANKU } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Vzdělávací články pro SVJ a bytové domy",
  description:
    "Praktické návody, vzory dokumentů a články pro předsedy a vlastníky bytových jednotek. Změna správce, dotace, úvěry, rekonstrukce.",
};

type SearchParams = Promise<{ kategorie?: string }>;

export default async function ClankyPage({ searchParams }: { searchParams: SearchParams }) {
  const { kategorie } = await searchParams;

  const clanky = await prisma.clanek.findMany({
    where: {
      publikovany: true,
      ...(kategorie ? { kategorie } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="bg-ink-50/40 border-b border-ink-100">
        <div className="container-wide py-10">
          <nav className="text-xs text-ink-500 mb-3">
            <Link href="/" className="hover:text-brand-600">Domů</Link> ›{" "}
            <span className="text-ink-700">Články</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold">Vzdělávání pro SVJ a bytové domy</h1>
          <p className="mt-2 text-ink-600 max-w-2xl">
            Vše, co potřebujete vědět jako předseda nebo aktivní vlastník — od změny správce
            přes dotace NZÚ až po vzory právních dokumentů.
          </p>
        </div>
      </section>

      <div className="container-wide py-10">
        {/* kategorie filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/clanky"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !kategorie ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-700 hover:bg-ink-200"
            }`}
          >
            Vše
          </Link>
          {KATEGORIE_CLANKU.map((k) => (
            <Link
              key={k}
              href={`/clanky?kategorie=${encodeURIComponent(k)}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                kategorie === k ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-700 hover:bg-ink-200"
              }`}
            >
              {k}
            </Link>
          ))}
        </div>

        {clanky.length === 0 ? (
          <div className="card p-10 text-center text-ink-600">Žádné články v této kategorii.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {clanky.map((c) => (
              <Link
                key={c.id}
                href={`/clanky/${c.slug}`}
                className="card-hover overflow-hidden flex flex-col group"
              >
                {c.obrazek && (
                  <div className="relative aspect-[16/10] bg-ink-100 overflow-hidden">
                    <Image
                      src={c.obrazek}
                      alt={c.nadpis}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="brand">{c.kategorie}</Badge>
                    {c.premium && <Badge variant="amber">Premium</Badge>}
                  </div>
                  <h2 className="text-lg font-semibold leading-snug group-hover:text-brand-600">
                    {c.nadpis}
                  </h2>
                  <p className="text-sm text-ink-600 line-clamp-3">{c.perex}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
