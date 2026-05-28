import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminSpravci() {
  const spravci = await prisma.spravce.findMany({
    orderBy: [{ schvaleny: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Správci</h1>
        <p className="text-ink-600">Seznam všech správcovských firem v katalogu.</p>
      </header>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3">Firma</th>
              <th className="text-right px-4 py-3">Domy / Jed.</th>
              <th className="text-right px-4 py-3">Hodnocení</th>
              <th className="text-center px-4 py-3">Stav</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {spravci.map((s) => (
              <tr key={s.id} className="hover:bg-ink-50/50">
                <td className="px-4 py-3">
                  <Link href={`/spravci/${s.slug}`} className="font-medium text-ink-950 hover:text-brand-600">
                    {s.nazev}
                  </Link>
                  <div className="text-xs text-ink-500">{s.email}</div>
                </td>
                <td className="px-4 py-3 text-right">
                  {s.pocetDomu} / {s.pocetJednotek.toLocaleString("cs-CZ")}
                </td>
                <td className="px-4 py-3 text-right">
                  {s.prumerneHodnoceni.toFixed(1)} ({s.pocetRecenzi})
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {s.schvaleny ? (
                      <span className="badge bg-emerald-50 text-emerald-700">Schválený</span>
                    ) : (
                      <span className="badge bg-amber-50 text-amber-700">Čeká</span>
                    )}
                    {s.premium && <span className="badge bg-amber-100 text-amber-900">Premium</span>}
                    {s.overeny && <span className="badge bg-brand-50 text-brand-700">Ověřený</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/spravci/${s.slug}`} className="text-xs text-brand-600 hover:underline">
                    Zobrazit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
