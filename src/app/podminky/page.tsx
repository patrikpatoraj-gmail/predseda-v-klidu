import { Metadata } from "next";

export const metadata: Metadata = { title: "Podmínky použití" };

export default function PodminkyPage() {
  return (
    <div className="container-narrow py-12 space-y-4 text-ink-700 leading-relaxed">
      <h1 className="text-4xl font-bold text-ink-950">Podmínky použití</h1>
      <p className="text-sm text-ink-500">Aktuálně jako MVP — finální právní znění připravujeme.</p>

      <h2 className="text-2xl font-bold text-ink-950 mt-8">1. Obecná ustanovení</h2>
      <p>
        Provozovatelem platformy Předseda v klidu (dále jen „platforma“) je společnost xyz s.r.o.
        Platforma slouží jako katalog poskytovatelů služeb v oblasti správy SVJ a bytových domů
        a jako prostředník pro odesílání poptávek mezi SVJ a poskytovateli.
      </p>

      <h2 className="text-2xl font-bold text-ink-950 mt-8">2. Recenze a hodnocení</h2>
      <p>
        Platforma umožňuje psaní recenzí ověřeným uživatelům. Recenze procházejí moderací.
        Zakazujeme zveřejňování:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>nepravdivých skutkových tvrzení (lží),</li>
        <li>urážek, pomluv, výhrůžek,</li>
        <li>osobních údajů třetích osob bez souhlasu,</li>
        <li>obchodního tajemství,</li>
        <li>obsahu porušujícího právní předpisy ČR.</li>
      </ul>
      <p>
        Hodnocený poskytovatel má právo na reakci a na nahlášení recenze. Spory řeší
        moderační tým platformy.
      </p>

      <h2 className="text-2xl font-bold text-ink-950 mt-8">3. Odpovědnost</h2>
      <p>
        Platforma nenese odpovědnost za kvalitu služeb poskytovatelů. Vztah mezi SVJ
        a vybraným správcem / profi předsedou je nezávislý smluvní vztah, do něhož
        platforma nevstupuje.
      </p>

      <h2 className="text-2xl font-bold text-ink-950 mt-8">4. Poptávky</h2>
      <p>
        Odeslané poptávky jsou přeposílány pouze správcům, které poptávající aktivně vybral.
        Platforma negaranťuje, že vybraní poskytovatelé na poptávku odpoví, ani lhůtu odpovědi.
      </p>

      <h2 className="text-2xl font-bold text-ink-950 mt-8">5. Závěrečná ustanovení</h2>
      <p>
        Tyto podmínky platí od 1. 1. 2026. Provozovatel si vyhrazuje právo je kdykoliv změnit;
        registrovaní uživatelé budou o změně informováni e-mailem.
      </p>
    </div>
  );
}
