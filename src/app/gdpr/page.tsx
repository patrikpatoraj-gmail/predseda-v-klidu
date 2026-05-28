import { Metadata } from "next";

export const metadata: Metadata = { title: "Ochrana osobních údajů (GDPR)" };

export default function GdprPage() {
  return (
    <div className="container-narrow py-12 space-y-4 text-ink-700 leading-relaxed">
      <h1 className="text-4xl font-bold text-ink-950">Ochrana osobních údajů</h1>
      <p className="text-sm text-ink-500">Toto je MVP znění. Finální verze je v přípravě.</p>

      <h2 className="text-2xl font-bold text-ink-950 mt-8">Jaké údaje shromažďujeme</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Při poptávce: jméno, e-mail, telefon, název SVJ, lokalita, popis poptávky.</li>
        <li>Při registraci firmy: údaje o firmě a kontaktní osobě.</li>
        <li>Logy přístupu (cookies, IP) pro analytiku a bezpečnost.</li>
      </ul>

      <h2 className="text-2xl font-bold text-ink-950 mt-8">Komu data předáváme</h2>
      <p>
        Údaje z poptávky předáváme pouze správcům, které jste si v poptávkovém
        formuláři aktivně vybrali. Bez vašeho výběru je nikomu nepředáváme.
      </p>

      <h2 className="text-2xl font-bold text-ink-950 mt-8">Vaše práva</h2>
      <p>
        Máte právo na přístup k vašim údajům, jejich opravu, výmaz a námitku proti
        zpracování. Kontaktujte nás na <a href="mailto:gdpr@predsedavklidu.cz" className="text-brand-600 hover:underline">gdpr@predsedavklidu.cz</a>.
      </p>
    </div>
  );
}
