import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [spravci, predsedove, poptavky, novePoptavky, neoverenoSpravci, neschvaleneRecenze, uzivatele] =
    await Promise.all([
      prisma.spravce.count(),
      prisma.predseda.count(),
      prisma.poptavka.count(),
      prisma.poptavka.count({ where: { stav: "NOVA" } }),
      prisma.spravce.count({ where: { schvaleny: false } }),
      prisma.recenze.count({ where: { schvalena: false, zamietnuta: false } }),
      prisma.user.count(),
    ]);

  const stats = [
    { label: "Správcovských firem", value: spravci },
    { label: "Profi předsedů", value: predsedove },
    { label: "Celkem poptávek", value: poptavky },
    { label: "Registrovaných uživatelů", value: uzivatele },
  ];

  const alerts = [
    { label: "Nové poptávky ke schválení", value: novePoptavky, href: "/admin/poptavky", variant: "warning" as const },
    { label: "Profily čekající na ověření", value: neoverenoSpravci, href: "/admin/spravci", variant: "warning" as const },
    { label: "Recenze k moderaci", value: neschvaleneRecenze, href: "/admin/recenze", variant: "warning" as const },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Přehled</h1>
        <p className="text-ink-600">Souhrn klíčových metrik platformy.</p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <div className="text-xs uppercase tracking-wide text-ink-500">{s.label}</div>
            <div className="mt-1 text-2xl font-bold">{s.value}</div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">K vyřízení</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {alerts.map((a) => (
            <a
              key={a.label}
              href={a.href}
              className={`card p-4 block hover:shadow-hover transition-shadow ${
                a.value > 0 ? "border-amber-200 bg-amber-50/50" : ""
              }`}
            >
              <div className="text-sm text-ink-700">{a.label}</div>
              <div className="mt-1 flex items-end justify-between">
                <span className={`text-2xl font-bold ${a.value > 0 ? "text-amber-700" : "text-ink-400"}`}>
                  {a.value}
                </span>
                <span className="text-xs text-ink-500">Otevřít →</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
