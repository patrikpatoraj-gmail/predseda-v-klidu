import Link from "next/link";
import { Logo } from "./Logo";

const navItems = [
  { href: "/spravci", label: "Správci" },
  { href: "/predsedove", label: "Profi předsedové" },
  { href: "/poptavka", label: "Nezávazná poptávka" },
  { href: "/clanky", label: "Články" },
  { href: "/jak-to-funguje", label: "Jak to funguje" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-ink-100">
      <div className="container-wide flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-950 rounded-lg hover:bg-ink-50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/prihlaseni"
            className="hidden sm:inline-flex btn-ghost"
          >
            Přihlásit
          </Link>
          <Link href="/registrace" className="btn-primary">
            Zaregistrovat firmu
          </Link>
        </div>
      </div>

      {/* mobile nav */}
      <div className="lg:hidden border-t border-ink-100 overflow-x-auto">
        <div className="container-wide flex gap-1 py-2 whitespace-nowrap">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm font-medium text-ink-700 hover:text-ink-950 rounded-md hover:bg-ink-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
