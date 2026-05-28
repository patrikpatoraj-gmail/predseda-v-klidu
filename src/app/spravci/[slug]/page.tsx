import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { parseJson, formatCenaRozsah } from "@/lib/utils";
import { Badge, PremiumBadge, VerifiedBadge } from "@/components/Badge";
import { RatingStars } from "@/components/RatingStars";
import { SLUZBY_LABELS } from "@/lib/constants";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const spravce = await prisma.spravce.findUnique({ where: { slug } });
  if (!spravce) return { title: "Nenalezeno" };
  return {
    title: `${spravce.nazev} — recenze, ceny, kontakty`,
    description: spravce.popis.slice(0, 160),
  };
}

export default async function SpravceDetail({ params }: { params: Params }) {
  const { slug } = await params;

  const spravce = await prisma.spravce.findUnique({
    where: { slug },
    include: {
      recenze: {
        where: { schvalena: true },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!spravce || !spravce.aktivni) notFound();

  const regiony = parseJson<string[]>(spravce.regionyPusobnosti, []);
  const reference = parseJson<string[]>(spravce.reference, []);

  const sluzbyMap: Record<string, boolean> = {
    ucetniSprava: spravce.ucetniSprava,
    technickaSprava: spravce.technickaSprava,
    havarijniSluzba: spravce.havarijniSluzba,
    onlinePortal: spravce.onlinePortal,
    onlineHlasovani: spravce.onlineHlasovani,
    zkRekonstrukce: spravce.zkRekonstrukce,
    zkDotace: spravce.zkDotace,
    zkUvery: spravce.zkUvery,
    pravniPoradenstvi: spravce.pravniPoradenstvi,
  };

  return (
    <>
      {/* HEADER */}
      <section className="bg-ink-50/40 border-b border-ink-100">
        <div className="container-wide py-8">
          <nav className="text-xs text-ink-500 mb-4">
            <Link href="/" className="hover:text-brand-600">Domů</Link> ›{" "}
            <Link href="/spravci" className="hover:text-brand-600">Správci</Link> ›{" "}
            <span className="text-ink-700">{spravce.nazev}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 bg-white ring-1 ring-ink-200 shadow-sm">
              {spravce.logo && (
                <Image src={spravce.logo} alt={spravce.nazev} fill className="object-cover" sizes="128px" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {spravce.overeny && <VerifiedBadge />}
                {spravce.premium && <PremiumBadge />}
                {spravce.rokZalozeni && <Badge variant="outline">Od roku {spravce.rokZalozeni}</Badge>}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold">{spravce.nazev}</h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-600">
                <RatingStars value={spravce.prumerneHodnoceni} count={spravce.pocetRecenzi} size="md" />
                <span>·</span>
                <span>📍 {regiony.length > 0 ? regiony.join(", ") : "Praha"}</span>
                <span>·</span>
                <span>{spravce.pocetDomu} domů · {spravce.pocetJednotek.toLocaleString("cs-CZ")} jednotek</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/poptavka?spravce=${spravce.slug}`} className="btn-primary btn-lg">
                  Odeslat poptávku
                </Link>
                <a href={`mailto:${spravce.email}`} className="btn-secondary btn-lg">
                  ✉ Napsat e-mail
                </a>
                <a href={`tel:${spravce.telefon.replace(/\s/g, "")}`} className="btn-secondary btn-lg">
                  ☎ {spravce.telefon}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide py-10 grid lg:grid-cols-[1fr_320px] gap-10">
        {/* HLAVNÝ OBSAH */}
        <div className="space-y-10">
          {/* O firme */}
          <section>
            <h2 className="text-xl font-semibold mb-3">O firmě</h2>
            <p className="text-ink-700 leading-relaxed whitespace-pre-line">{spravce.popis}</p>
          </section>

          {/* Štatistiky */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Klíčové údaje</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="Spravovaných domů" value={spravce.pocetDomu.toString()} />
              <Stat label="Bytových jednotek" value={spravce.pocetJednotek.toLocaleString("cs-CZ")} />
              <Stat label="Na trhu od" value={spravce.rokZalozeni?.toString() ?? "—"} />
              <Stat label="Cena Kč/j./měs." value={formatCenaRozsah(spravce.cenaOd, spravce.cenaDo)} />
            </div>
          </section>

          {/* Služby */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Poskytované služby</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {Object.entries(sluzbyMap).map(([k, v]) => (
                <div
                  key={k}
                  className={`flex items-center gap-2 p-2.5 rounded-lg ${v ? "bg-emerald-50/50" : "bg-ink-50/50 opacity-60"}`}
                >
                  <span className={v ? "text-emerald-600" : "text-ink-300"}>
                    {v ? "✓" : "✕"}
                  </span>
                  <span className="text-sm">{SLUZBY_LABELS[k] || k}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Pôsobnosť */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Působnost</h2>
            <div className="flex flex-wrap gap-2">
              {regiony.map((r) => (
                <Badge key={r} variant="outline">{r}</Badge>
              ))}
            </div>
          </section>

          {/* Reference */}
          {reference.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Vybrané reference</h2>
              <ul className="space-y-2">
                {reference.map((r, i) => (
                  <li key={i} className="card p-4 text-sm text-ink-700 flex gap-3">
                    <span className="text-brand-500 shrink-0">▸</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Recenzie */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Hodnocení od SVJ</h2>
              <Link href={`/spravci/${spravce.slug}/recenze`} className="text-sm text-brand-600 hover:underline">
                Napsat recenzi
              </Link>
            </div>
            {spravce.recenze.length === 0 ? (
              <div className="card p-6 text-center text-ink-600">
                Tento správce ještě nemá zveřejněné recenze. Buďte první!
              </div>
            ) : (
              <div className="space-y-3">
                {spravce.recenze.map((r) => (
                  <article key={r.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-semibold">{r.nadpis}</h3>
                        <p className="text-xs text-ink-500 mt-1">
                          {r.autorJmeno} · {r.autorSvj || "Vlastník"} · {new Date(r.createdAt).toLocaleDateString("cs-CZ")}
                        </p>
                      </div>
                      <RatingStars value={r.hodnoceni} size="sm" />
                    </div>
                    <p className="text-sm text-ink-700 mt-3 leading-relaxed">{r.text}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-500">
                      <span>Komunikace: <strong>{r.komunikace}/5</strong></span>
                      <span>Kvalita: <strong>{r.kvalitaSpravy}/5</strong></span>
                      <span>Rychlost: <strong>{r.rychlost}/5</strong></span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <div className="card p-5 space-y-3">
            <h3 className="font-semibold">Kontakt</h3>
            <div className="text-sm space-y-2">
              <div>
                <div className="text-ink-500 text-xs">Kontaktní osoba</div>
                <div className="text-ink-900">{spravce.kontaktniOsoba}</div>
              </div>
              <div>
                <div className="text-ink-500 text-xs">E-mail</div>
                <a href={`mailto:${spravce.email}`} className="text-brand-600 hover:underline break-all">
                  {spravce.email}
                </a>
              </div>
              <div>
                <div className="text-ink-500 text-xs">Telefon</div>
                <a href={`tel:${spravce.telefon}`} className="text-brand-600 hover:underline">{spravce.telefon}</a>
              </div>
              {spravce.web && (
                <div>
                  <div className="text-ink-500 text-xs">Web</div>
                  <a href={spravce.web} target="_blank" rel="noreferrer noopener" className="text-brand-600 hover:underline break-all">
                    {spravce.web.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              {spravce.adresa && (
                <div>
                  <div className="text-ink-500 text-xs">Adresa</div>
                  <div className="text-ink-900">{spravce.adresa}</div>
                </div>
              )}
            </div>
            <Link href={`/poptavka?spravce=${spravce.slug}`} className="btn-primary w-full justify-center">
              Odeslat poptávku
            </Link>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold mb-2">Není si jistí?</h3>
            <p className="text-sm text-ink-600 mb-3">
              Porovnejte více správců jednou poptávkou.
            </p>
            <Link href="/spravci" className="btn-secondary w-full justify-center">
              Vidět další správce
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4">
      <div className="text-xs uppercase tracking-wide text-ink-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-ink-950">{value}</div>
    </div>
  );
}
