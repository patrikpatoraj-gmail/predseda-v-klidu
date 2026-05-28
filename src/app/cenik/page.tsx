import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ceník Premium pro správce a profi předsedy",
  description: "Plány Předseda v klidu pro správce SVJ a profesionální předsedy.",
};

const tiers = [
  {
    name: "Free",
    price: "0 Kč",
    period: "navždy",
    desc: "Začněte zdarma. Základní profil pro získání prvních klientů.",
    features: [
      "Profil v katalogu",
      "Příjem poptávek",
      "Recenze a hodnocení",
      "Základní statistiky",
      "1 fotka, do 1000 znaků popisu",
    ],
    cta: "Registrace zdarma",
    href: "/registrace",
    highlighted: false,
  },
  {
    name: "Standard",
    price: "990 Kč",
    period: "měsíčně",
    desc: "Pro většinu pražských správců a profi předsedů.",
    features: [
      "Vše z Free",
      "Ověřený profil (badge)",
      "Vyšší pozice ve výsledcích",
      "Až 10 fotek + galerie",
      "Až 4000 znaků popisu",
      "Pokročilé statistiky",
      "Až 3 vlastní články",
    ],
    cta: "Vybrat plán",
    href: "/registrace?plan=standard",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "2 490 Kč",
    period: "měsíčně",
    desc: "Maximální zviditelnění a kompletní content marketing.",
    features: [
      "Vše ze Standard",
      "TOP pozice na homepage",
      "Zvýraznění ve výsledcích",
      "Neomezené fotky + video",
      "Neomezené články",
      "Detailní analytika poptávek",
      "Prioritní podpora",
    ],
    cta: "Vybrat plán",
    href: "/registrace?plan=premium",
    highlighted: false,
  },
];

export default function CenikPage() {
  return (
    <div className="container-wide py-12">
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Plány a ceník</h1>
        <p className="mt-3 text-ink-600">
          Začněte zdarma. Premium plány urychlují růst klientely.
        </p>
      </header>

      <div className="mt-12 grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`card p-6 flex flex-col ${
              t.highlighted ? "ring-2 ring-brand-500 scale-[1.02]" : ""
            }`}
          >
            {t.highlighted && (
              <span className="badge bg-brand-600 text-white self-start mb-3">Nejoblíbenější</span>
            )}
            <h3 className="text-xl font-bold">{t.name}</h3>
            <p className="text-sm text-ink-600 mt-1">{t.desc}</p>
            <div className="mt-4">
              <div className="text-3xl font-bold">{t.price}</div>
              <div className="text-xs text-ink-500">{t.period}</div>
            </div>
            <ul className="mt-6 space-y-2 text-sm flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-brand-500">✓</span> <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href={t.href}
              className={`mt-6 btn justify-center ${t.highlighted ? "btn-primary" : "btn-secondary"}`}
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-ink-500 mt-8">
        Ceny jsou uvedené bez DPH. Měsíční plán bez závazku, ukončení kdykoliv.
      </p>
    </div>
  );
}
