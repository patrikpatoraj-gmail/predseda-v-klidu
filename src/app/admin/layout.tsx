import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const menu = [
  { href: "/admin", label: "Přehled" },
  { href: "/admin/spravci", label: "Správci" },
  { href: "/admin/predsedove", label: "Předsedové" },
  { href: "/admin/poptavky", label: "Poptávky" },
  { href: "/admin/recenze", label: "Recenze" },
  { href: "/admin/clanky", label: "Články" },
  { href: "/admin/uzivatele", label: "Uživatelé" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/prihlaseni?callbackUrl=/admin");
  }

  return (
    <div className="container-wide py-8">
      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="card p-3 self-start lg:sticky lg:top-24">
          <div className="px-3 py-2 mb-2 border-b border-ink-100">
            <div className="text-xs uppercase tracking-wide text-ink-500">Administrace</div>
            <div className="text-sm font-medium text-ink-900 truncate">{session.user.email}</div>
          </div>
          <nav className="flex flex-col gap-0.5">
            {menu.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="px-3 py-2 text-sm rounded-md text-ink-700 hover:bg-ink-100 hover:text-ink-950"
              >
                {m.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
