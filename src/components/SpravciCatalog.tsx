"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SpravceCard } from "./SpravceCard";

type Spravce = React.ComponentProps<typeof SpravceCard>["spravce"];

export function SpravciCatalog({ spravci, totalCount }: { spravci: Spravce[]; totalCount: number }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<"rating" | "houses" | "price-asc">("rating");

  const sortedSpravci = useMemo(() => {
    const list = [...spravci];
    if (sort === "rating") list.sort((a, b) => b.prumerneHodnoceni - a.prumerneHodnoceni);
    if (sort === "houses") list.sort((a, b) => b.pocetDomu - a.pocetDomu);
    if (sort === "price-asc") {
      list.sort((a, b) => (a.cenaOd ?? Infinity) - (b.cenaOd ?? Infinity));
    }
    return list;
  }, [spravci, sort]);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const odeslatPoptavku = () => {
    const qs = Array.from(selected).join(",");
    router.push(`/poptavka?spravci=${qs}`);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="text-sm text-ink-600">
          Nalezeno <strong className="text-ink-950">{spravci.length}</strong>
          {spravci.length !== totalCount && (
            <> z {totalCount} správců</>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-ink-600">Seřadit:</label>
          <select
            className="input py-1.5 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
          >
            <option value="rating">Podle hodnocení</option>
            <option value="houses">Podle počtu domů</option>
            <option value="price-asc">Nejlevnější</option>
          </select>
        </div>
      </div>

      {sortedSpravci.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-ink-600">Žádné výsledky odpovídající filtrům.</p>
          <Link href="/spravci" className="btn-secondary mt-4">Zrušit filtry</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {sortedSpravci.map((s) => (
            <SpravceCard
              key={s.id}
              spravce={s}
              selectable
              selected={selected.has(s.slug)}
              onToggleSelect={() => toggle(s.slug)}
            />
          ))}
        </div>
      )}

      {/* Floating bar pre poptávku */}
      {selected.size > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 card shadow-hover px-4 py-3 flex items-center gap-4 max-w-[95%]">
          <div className="text-sm">
            <strong className="text-ink-950">{selected.size}</strong>{" "}
            {selected.size === 1 ? "vybraný správce" : selected.size < 5 ? "vybraní správci" : "vybraných správců"}
          </div>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="btn-ghost text-sm"
          >
            Zrušit výběr
          </button>
          <button type="button" onClick={odeslatPoptavku} className="btn-primary">
            Odeslat poptávku
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path d="M3 10h14m-5-5 5 5-5 5" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
