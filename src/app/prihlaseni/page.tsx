"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PrihlaseniPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });
    setSubmitting(false);

    if (res?.error) {
      setError("Nesprávný e-mail nebo heslo.");
      return;
    }
    router.push(searchParams.get("callbackUrl") || "/admin");
  }

  return (
    <div className="container-narrow py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center">Přihlášení</h1>
        <p className="mt-2 text-center text-ink-600">
          Pro správce, profi předsedy a administrátory.
        </p>

        <form onSubmit={onSubmit} className="card p-6 mt-8 space-y-4">
          <div>
            <label className="label">E-mail</label>
            <input name="email" type="email" required className="input" autoComplete="email" />
          </div>
          <div>
            <label className="label">Heslo</label>
            <input name="password" type="password" required className="input" autoComplete="current-password" />
          </div>
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}
          <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
            {submitting ? "Přihlašuji..." : "Přihlásit se"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-ink-600">
          Nemáte ještě účet?{" "}
          <Link href="/registrace" className="text-brand-600 hover:underline font-medium">
            Zaregistrovat firmu
          </Link>
        </p>
      </div>
    </div>
  );
}
