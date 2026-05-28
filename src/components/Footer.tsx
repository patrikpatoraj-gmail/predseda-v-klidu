import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-50/50 mt-16">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-ink-600 leading-relaxed max-w-xs">
              Největší katalog ověřených správců SVJ a profesionálních předsedů
              v České republice.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-950 mb-4">Pro SVJ a bytové domy</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/spravci" className="text-ink-600 hover:text-brand-600">Najít správce</Link></li>
              <li><Link href="/predsedove" className="text-ink-600 hover:text-brand-600">Najít profi předsedu</Link></li>
              <li><Link href="/poptavka" className="text-ink-600 hover:text-brand-600">Odeslat poptávku</Link></li>
              <li><Link href="/clanky" className="text-ink-600 hover:text-brand-600">Vzdělávací články</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-950 mb-4">Pro firmy</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/registrace" className="text-ink-600 hover:text-brand-600">Zaregistrovat firmu</Link></li>
              <li><Link href="/cenik" className="text-ink-600 hover:text-brand-600">Ceník Premium</Link></li>
              <li><Link href="/prihlaseni" className="text-ink-600 hover:text-brand-600">Přihlásit se</Link></li>
              <li><Link href="/jak-to-funguje" className="text-ink-600 hover:text-brand-600">Jak to funguje</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-950 mb-4">Platforma</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/o-nas" className="text-ink-600 hover:text-brand-600">O nás</Link></li>
              <li><Link href="/kontakt" className="text-ink-600 hover:text-brand-600">Kontakt</Link></li>
              <li><Link href="/podminky" className="text-ink-600 hover:text-brand-600">Podmínky použití</Link></li>
              <li><Link href="/gdpr" className="text-ink-600 hover:text-brand-600">Ochrana osobních údajů</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-ink-500">
          <p>
            © {new Date().getFullYear()} Předseda v klidu. Všechna práva vyhrazena.
            Aktuálně testujeme MVP v Praze.
          </p>
          <p>
            Údaje v katalogu mohou být demonstrační. Před uzavřením smlouvy ověřte
            informace přímo u poskytovatele.
          </p>
        </div>
      </div>
    </footer>
  );
}
