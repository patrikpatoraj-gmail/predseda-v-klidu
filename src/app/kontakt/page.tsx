import { Metadata } from "next";

export const metadata: Metadata = { title: "Kontakt" };

export default function KontaktPage() {
  return (
    <div className="container-narrow py-12">
      <h1 className="text-4xl font-bold">Kontakt</h1>
      <p className="mt-3 text-ink-600">
        Jsme tu pro SVJ, správce i partnery.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="card p-6">
          <h2 className="font-semibold">Pro SVJ a vlastníky</h2>
          <p className="text-sm text-ink-600 mt-2">
            Pomoc s výběrem správce, dotaz na platformu.
          </p>
          <a href="mailto:info@predsedavklidu.cz" className="text-brand-600 mt-3 inline-block hover:underline">
            info@predsedavklidu.cz
          </a>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold">Pro firmy</h2>
          <p className="text-sm text-ink-600 mt-2">
            Registrace správce, Premium plány, partnerství.
          </p>
          <a href="mailto:partneri@predsedavklidu.cz" className="text-brand-600 mt-3 inline-block hover:underline">
            partneri@predsedavklidu.cz
          </a>
        </div>
      </div>
    </div>
  );
}
