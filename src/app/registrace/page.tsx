"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistracePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<"SPRAVCE" | "PREDSEDA">("SPRAVCE");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      password: form.get("password"),
      role,
      organizace: form.get("organizace"),
      souhlas: form.get("souhlas") === "on",
    };

    if (!payload.souhlas) {
      setError("Pro registraci je potřeba souhlasit s podmínkami.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/registrace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registrace se nezdařila.");
      }
      router.push("/prihlaseni?registered=1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Neznámá chyba");
      setSubmitting(false);
    }
  }

  return (
    <div className="container-narrow py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Registrace pro firmy</h1>
        <p className="mt-2 text-center text-ink-600">
          Získejte nové klienty z Prahy. Základní profil je zdarma.
        </p>

        <div className="mt-8 flex gap-2 p-1 bg-ink-100 rounded-lg">
          <button
            type="button"
            onClick={() => setRole("SPRAVCE")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              role === "SPRAVCE" ? "bg-white shadow-sm text-ink-950" : "text-ink-600"
            }`}
          >
            Správcovská firma
          </button>
          <button
            type="button"
            onClick={() => setRole("PREDSEDA")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              role === "PREDSEDA" ? "bg-white shadow-sm text-ink-950" : "text-ink-600"
            }`}
          >
            Profesionální předseda
          </button>
        </div>

        <form onSubmit={onSubmit} className="card p-6 mt-4 space-y-4">
          <div>
            <label className="label">
              {role === "SPRAVCE" ? "Název firmy" : "Vaše jméno"} *
            </label>
            <input name="organizace" required className="input" />
          </div>
          <div>
            <label className="label">Kontaktní osoba (jméno a příjmení) *</label>
            <input name="name" required className="input" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">E-mail *</label>
              <input name="email" type="email" required className="input" />
            </div>
            <div>
              <label className="label">Telefon *</label>
              <input name="phone" type="tel" required className="input" />
            </div>
          </div>
          <div>
            <label className="label">Heslo (min. 8 znaků) *</label>
            <input name="password" type="password" required minLength={8} className="input" />
          </div>

          <label className="flex items-start gap-2 text-sm text-ink-700 cursor-pointer">
            <input type="checkbox" name="souhlas" required className="mt-0.5 rounded border-ink-300 text-brand-600" />
            <span>
              Souhlasím s <Link href="/podminky" className="text-brand-600 hover:underline">podmínkami použití</Link>{" "}
              a zpracováním osobních údajů.
            </span>
          </label>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center btn-lg">
            {submitting ? "Registrujeme..." : "Vytvořit účet"}
          </button>

          <p className="text-xs text-center text-ink-500">
            Po registraci profil čeká na schválení administrátorem (typicky do 24 hodin).
          </p>
        </form>

        <p className="mt-6 text-sm text-center text-ink-600">
          Už máte účet?{" "}
          <Link href="/prihlaseni" className="text-brand-600 hover:underline font-medium">
            Přihlásit se
          </Link>
        </p>
      </div>
    </div>
  );
}
