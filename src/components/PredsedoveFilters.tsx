"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function PredsedoveFilters({ active }: { active: { region?: string; specializace?: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "") params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8 card p-4">
      <span className="text-sm font-medium text-ink-700">Filtry:</span>

      <select
        className="input py-2 text-sm w-auto"
        value={active.region || ""}
        onChange={(e) => updateParam("region", e.target.value || null)}
      >
        <option value="">Všechny části Prahy</option>
        {Array.from({ length: 10 }, (_, i) => `Praha ${i + 1}`).map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <select
        className="input py-2 text-sm w-auto"
        value={active.specializace || ""}
        onChange={(e) => updateParam("specializace", e.target.value || null)}
      >
        <option value="">Všechny specializace</option>
        <option value="Rekonstrukce">Rekonstrukce</option>
        <option value="Dotace">Dotace NZÚ</option>
        <option value="Právo">Právo</option>
        <option value="FVE">Fotovoltaika</option>
        <option value="Účetnictví">Účetnictví</option>
        <option value="Novostavby">Novostavby</option>
        <option value="Památkové">Památkové domy</option>
      </select>
    </div>
  );
}
