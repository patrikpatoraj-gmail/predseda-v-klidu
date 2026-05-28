"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Spravce = { id: string; slug: string; nazev: string; logo: string | null };

export function PoptavkaForm({ preselected }: { preselected: Spravce[] }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<Spravce[]>(preselected);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      nazevSvj: form.get("nazevSvj"),
      lokalita: form.get("lokalita"),
      pocetJednotek: Number(form.get("pocetJednotek") || 0),
      popisPoptavky: form.get("popisPoptavky"),
      kontaktniOsoba: form.get("kontaktniOsoba"),
      telefon: form.get("telefon"),
      email: form.get("email"),
      souhlas: form.get("souhlas") === "on",
      spravciIds: selected.map((s) => s.id),
    };

    if (!payload.souhlas) {
      setError("Pro odeslání poptávky je potřeba souhlasit s podmínkami.");
      setSubmitting(false);
      return;
    }
    if (selected.length === 0) {
      setError("Vyberte alespoň jednoho správce.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/poptavka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Něco se pokazilo. Zkuste to prosím znovu.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Neznámá chyba");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m5 12 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Poptávka byla odeslána</h2>
        <p className="mt-2 text-ink-600">
          Předali jsme vaši poptávku {selected.length} správcům. Obvykle se ozvou do 24–48 hodin.
        </p>
        <button onClick={() => router.push("/spravci")} className="btn-primary mt-6">
          Pokračovat na katalog
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Vybraní správci */}
      <section className="card p-5">
        <h2 className="font-semibold text-lg mb-3">
          Vybraní správci ({selected.length})
        </h2>
        {selected.length === 0 ? (
          <div className="p-6 text-center text-ink-600 bg-ink-50/50 rounded-lg">
            <p>Zatím nemáte vybraného žádného správce.</p>
            <a href="/spravci" className="btn-secondary mt-3">Vybrat z katalogu</a>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selected.map((s) => (
              <span key={s.id} className="inline-flex items-center gap-2 bg-ink-50 rounded-lg pl-2 pr-1 py-1">
                {s.logo && (
                  <div className="relative w-6 h-6 rounded overflow-hidden">
                    <Image src={s.logo} alt={s.nazev} fill className="object-cover" sizes="24px" />
                  </div>
                )}
                <span className="text-sm">{s.nazev}</span>
                <button
                  type="button"
                  className="w-5 h-5 rounded hover:bg-ink-200 text-ink-500 grid place-items-center"
                  onClick={() => setSelected(selected.filter((x) => x.id !== s.id))}
                  aria-label="Odebrat"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </section>

      {/* SVJ údaje */}
      <section className="card p-5 space-y-4">
        <h2 className="font-semibold text-lg">Údaje o SVJ / bytovém domě</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Název SVJ *</label>
            <input name="nazevSvj" required className="input" placeholder="např. SVJ Vinohradská 47" />
          </div>
          <div>
            <label className="label">Lokalita *</label>
            <input name="lokalita" required className="input" placeholder="např. Praha 2, Vinohrady" />
          </div>
          <div>
            <label className="label">Počet bytových jednotek *</label>
            <input name="pocetJednotek" type="number" required min={2} className="input" placeholder="24" />
          </div>
        </div>

        <div>
          <label className="label">Co poptáváte? *</label>
          <textarea
            name="popisPoptavky"
            required
            rows={5}
            className="input"
            placeholder="Hledáme nového správce od ledna 2027. Aktuální správce nás po 5 letech zklamal komunikací. Preferujeme online portál a digitální schůze. Plánujeme rekonstrukci výtahů v roce 2027."
          />
          <p className="mt-1 text-xs text-ink-500">
            Tip: Čím konkrétněji popíšete situaci, tím přesnější nabídky dostanete.
          </p>
        </div>
      </section>

      {/* Kontakt */}
      <section className="card p-5 space-y-4">
        <h2 className="font-semibold text-lg">Vaše kontaktní údaje</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Kontaktní osoba *</label>
            <input name="kontaktniOsoba" required className="input" placeholder="Jan Novák" />
          </div>
          <div>
            <label className="label">Telefon *</label>
            <input name="telefon" required type="tel" className="input" placeholder="+420 ..." />
          </div>
          <div className="sm:col-span-2">
            <label className="label">E-mail *</label>
            <input name="email" required type="email" className="input" placeholder="jan.novak@example.cz" />
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm text-ink-700 cursor-pointer">
          <input type="checkbox" name="souhlas" required className="mt-0.5 rounded border-ink-300 text-brand-600" />
          <span>
            Souhlasím se zpracováním osobních údajů za účelem zaslání poptávky vybraným
            správcům a s <a href="/podminky" className="text-brand-600 hover:underline">podmínkami použití</a>.
          </span>
        </label>
      </section>

      {error && (
        <div className="card p-4 border-red-200 bg-red-50 text-sm text-red-700">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Zpět
        </button>
        <button type="submit" disabled={submitting} className="btn-primary btn-lg">
          {submitting ? "Odesílám..." : `Odeslat poptávku ${selected.length} správcům`}
        </button>
      </div>
    </form>
  );
}
