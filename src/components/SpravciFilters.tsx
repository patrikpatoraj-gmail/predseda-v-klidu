"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const REGIONY = Array.from({ length: 10 }, (_, i) => `Praha ${i + 1}`);

const SLUZBY = [
  { key: "ucetniSprava", label: "Účetní správa" },
  { key: "technickaSprava", label: "Technická správa" },
  { key: "havarijniSluzba", label: "Havárie 24/7" },
  { key: "onlinePortal", label: "Online portál" },
  { key: "onlineHlasovani", label: "Online hlasování" },
  { key: "zkRekonstrukce", label: "Rekonstrukce" },
  { key: "zkDotace", label: "Dotace" },
  { key: "zkUvery", label: "Úvěry" },
  { key: "pravniPoradenstvi", label: "Právní poradenství" },
];

export function SpravciFilters({ active }: { active: Record<string, string> }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "") params.set(key, value);
      else params.delete(key);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const toggleSluzba = (key: string) => {
    const current = (active.sluzby || "").split(",").filter(Boolean);
    const next = current.includes(key) ? current.filter((s) => s !== key) : [...current, key];
    updateParam("sluzby", next.length ? next.join(",") : null);
  };

  const aktivneSluzby = (active.sluzby || "").split(",").filter(Boolean);

  return (
    <aside className="card p-5 sticky top-24 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-ink-950 mb-3">Pražská část</h3>
        <select className="input" value={active.region || ""} onChange={(e) => updateParam("region", e.target.value || null)}>
          <option value="">Všechny</option>
          {REGIONY.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink-950 mb-3">Velikost domu</h3>
        <select className="input" value={active.velikost || ""} onChange={(e) => updateParam("velikost", e.target.value || null)}>
          <option value="">Nezáleží</option>
          <option value="s">Malý (do 20 j.)</option>
          <option value="m">Střední (20–80 j.)</option>
          <option value="l">Velký (80+ j.)</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink-950 mb-3">Cena (Kč/jednotku/měsíc)</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="od"
            className="input"
            defaultValue={active.cenaOd || ""}
            onBlur={(e) => updateParam("cenaOd", e.target.value || null)}
          />
          <input
            type="number"
            placeholder="do"
            className="input"
            defaultValue={active.cenaDo || ""}
            onBlur={(e) => updateParam("cenaDo", e.target.value || null)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink-950 mb-3">Hodnocení</h3>
        <select className="input" value={active.hodnoceni || ""} onChange={(e) => updateParam("hodnoceni", e.target.value || null)}>
          <option value="">Vše</option>
          <option value="4.5">4,5 a více</option>
          <option value="4">4,0 a více</option>
          <option value="3.5">3,5 a více</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink-950 mb-3">Služby</h3>
        <div className="space-y-2">
          {SLUZBY.map((s) => (
            <label key={s.key} className="flex items-center gap-2 text-sm cursor-pointer hover:text-ink-950">
              <input
                type="checkbox"
                checked={aktivneSluzby.includes(s.key)}
                onChange={() => toggleSluzba(s.key)}
                className="rounded border-ink-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-ink-700">{s.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-ink-100">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={active.overeny === "1"}
            onChange={(e) => updateParam("overeny", e.target.checked ? "1" : null)}
            className="rounded border-ink-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-ink-700">Pouze ověřené</span>
        </label>
      </div>

      <button
        type="button"
        onClick={() => router.push("?")}
        className="btn-ghost w-full justify-center text-sm"
      >
        Resetovat filtry
      </button>
    </aside>
  );
}
