import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jak to funguje",
  description: "Jak najít správce SVJ přes Předseda v klidu — pro SVJ i pro správcovské firmy.",
};

export default function JakToFungujePage() {
  return (
    <div className="container-narrow py-12 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Jak to funguje</h1>
        <p className="mt-3 text-ink-600">
          Předseda v klidu propojuje SVJ a bytové domy s ověřenými správci a profi předsedy.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-4">Pro SVJ a bytové domy</h2>
        <ol className="space-y-3">
          {[
            ["Procházíte katalog ověřených správců a profi předsedů v Praze.", "Filtrujte podle vašich potřeb — lokalita, velikost domu, služby, hodnocení."],
            ["Označíte 3–5 favoritů.", "Nemusíte volat každému zvlášť. Jedním klikem je přidáte do poptávky."],
            ["Vyplníte jeden poptávkový formulář.", "Zhruba 5 minut. Popíšete situaci, dodáte kontakt."],
            ["My poptávku rozešleme zvoleným správcům.", "Vidí ji jen ti, které jste označili. Ne celý internet."],
            ["Správci se vám ozvou s konkrétní nabídkou.", "Typicky do 24–48 hodin. Vyberete si tu nejlepší pro váš dům."],
          ].map(([title, desc], i) => (
            <li key={i} className="card p-5 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-600 text-white grid place-items-center font-semibold shrink-0">{i + 1}</span>
              <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-ink-600 mt-0.5">{desc}</div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex gap-3">
          <Link href="/spravci" className="btn-primary">Hledat správce</Link>
          <Link href="/predsedove" className="btn-secondary">Hledat profi předsedu</Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Pro správce a profi předsedy</h2>
        <ol className="space-y-3">
          {[
            ["Zaregistrujete se zdarma.", "Vytvoříme vám účet, doplníte profil firmy / osoby."],
            ["Náš tým profil ověří.", "Kontrolujeme IČO, sídlo, kontakty. Cílem je důvěryhodnost katalogu."],
            ["Začnete dostávat poptávky.", "Pouze relevantní — od SVJ, která vás aktivně vybrala."],
            ["Volitelně Premium.", "Lepší pozice ve výsledcích, více fotek, statistiky, články."],
          ].map(([title, desc], i) => (
            <li key={i} className="card p-5 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-brand-600 text-white grid place-items-center font-semibold shrink-0">{i + 1}</span>
              <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-ink-600 mt-0.5">{desc}</div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex gap-3">
          <Link href="/registrace" className="btn-primary">Registrace zdarma</Link>
          <Link href="/cenik" className="btn-secondary">Ceník Premium</Link>
        </div>
      </section>
    </div>
  );
}
