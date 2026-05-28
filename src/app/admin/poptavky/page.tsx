import { prisma } from "@/lib/prisma";

export default async function AdminPoptavky() {
  const poptavky = await prisma.poptavka.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      spravci: { include: { spravce: { select: { nazev: true } } } },
    },
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Poptávky</h1>
        <p className="text-ink-600">Moderace a sledování poptávek odeslaných správcům.</p>
      </header>

      {poptavky.length === 0 ? (
        <div className="card p-10 text-center text-ink-600">Žádné poptávky.</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-700 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Datum</th>
                <th className="text-left px-4 py-3">SVJ / Lokalita</th>
                <th className="text-left px-4 py-3">Kontakt</th>
                <th className="text-left px-4 py-3">Správci</th>
                <th className="text-left px-4 py-3">Stav</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {poptavky.map((p) => (
                <tr key={p.id} className="hover:bg-ink-50/50">
                  <td className="px-4 py-3 whitespace-nowrap text-ink-600">
                    {new Date(p.createdAt).toLocaleDateString("cs-CZ")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink-950">{p.nazevSvj}</div>
                    <div className="text-xs text-ink-500">{p.lokalita} · {p.pocetJednotek} j.</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{p.kontaktniOsoba}</div>
                    <div className="text-xs text-ink-500">{p.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs">
                      {p.spravci.slice(0, 2).map((s) => s.spravce.nazev).join(", ")}
                      {p.spravci.length > 2 && ` +${p.spravci.length - 2}`}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge bg-brand-50 text-brand-700">{p.stav}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
