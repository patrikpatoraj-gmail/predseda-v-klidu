"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [typ, setTyp] = useState<"spravce" | "predseda">("spravce");
  const [region, setRegion] = useState("");
  const [velikost, setVelikost] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (region) params.set("region", region);
    if (velikost) params.set("velikost", velikost);
    const path = typ === "spravce" ? "/spravci" : "/predsedove";
    router.push(`${path}?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} className="card p-2 max-w-3xl mx-auto shadow-hover">
      <div className="flex flex-wrap items-center gap-1 mb-2 px-2 pt-2">
        <button
          type="button"
          onClick={() => setTyp("spravce")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            typ === "spravce" ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-ink-50"
          }`}
        >
          Správcovská firma
        </button>
        <button
          type="button"
          onClick={() => setTyp("predseda")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            typ === "predseda" ? "bg-brand-50 text-brand-700" : "text-ink-600 hover:bg-ink-50"
          }`}
        >
          Profesionální předseda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 p-1">
        <div>
          <label className="sr-only">Lokalita</label>
          <select className="input" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">Všechny pražské části</option>
            {Array.from({ length: 10 }, (_, i) => `Praha ${i + 1}`).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="sr-only">Velikost domu</label>
          <select className="input" value={velikost} onChange={(e) => setVelikost(e.target.value)}>
            <option value="">Velikost domu</option>
            <option value="s">Malý dům (do 20 jednotek)</option>
            <option value="m">Střední dům (20–80 jednotek)</option>
            <option value="l">Velký dům (80+ jednotek)</option>
          </select>
        </div>
        <button type="submit" className="btn-primary btn-lg whitespace-nowrap">
          Hledat
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden>
            <path d="M9 3a6 6 0 1 0 3.708 10.708l3.292 3.293a1 1 0 1 0 1.414-1.414l-3.293-3.293A6 6 0 0 0 9 3Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
