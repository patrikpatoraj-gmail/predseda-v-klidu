import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { parseJson, formatKc } from "@/lib/utils";
import { Badge, PremiumBadge, VerifiedBadge } from "@/components/Badge";
import { RatingStars } from "@/components/RatingStars";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = await prisma.predseda.findUnique({ where: { slug } });
  if (!p) return { title: "Nenalezeno" };
  return {
    title: `${p.jmeno} — profesionální předseda SVJ`,
    description: p.popis.slice(0, 160),
  };
}

export default async function PredsedaDetail({ params }: { params: Params }) {
  const { slug } = await params;

  const predseda = await prisma.predseda.findUnique({
    where: { slug },
    include: {
      recenze: { where: { schvalena: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!predseda || !predseda.aktivni) notFound();

  const regiony = parseJson<string[]>(predseda.regionyPusobnosti, []);
  const specializace = parseJson<string[]>(predseda.specializace, []);
  const certifikace = parseJson<string[]>(predseda.certifikace, []);
  const reference = parseJson<string[]>(predseda.reference, []);

  return (
    <>
      <section className="bg-ink-50/40 border-b border-ink-100">
        <div className="container-wide py-8">
          <nav className="text-xs text-ink-500 mb-4">
            <Link href="/" className="hover:text-brand-600">Domů</Link> ›{" "}
            <Link href="/predsedove" className="hover:text-brand-600">Profi předsedové</Link> ›{" "}
            <span className="text-ink-700">{predseda.jmeno}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0 bg-ink-100 ring-1 ring-ink-200 shadow-sm">
              {predseda.fotografie && (
                <Image src={predseda.fotografie} alt={predseda.jmeno} fill className="object-cover" sizes="160px" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {predseda.overeny && <VerifiedBadge />}
                {predseda.premium && <PremiumBadge />}
                <Badge variant="outline">{predseda.rokyZkusenosti} let praxe</Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold">{predseda.jmeno}</h1>
              {predseda.vzdelani && (
                <p className="text-ink-600 mt-1">{predseda.vzdelani}</p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-600">
                <RatingStars value={predseda.prumerneHodnoceni} count={predseda.pocetRecenzi} size="md" />
                <span>·</span>
                <span>{predseda.pocetSvj} SVJ pod vedením</span>
                <span>·</span>
                <span>📍 {regiony.length} oblastí Prahy</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${predseda.email}?subject=Nezávazná poptávka přes Předseda v klidu`} className="btn-primary btn-lg">
                  ✉ Napsat
                </a>
                <a href={`tel:${predseda.telefon.replace(/\s/g, "")}`} className="btn-secondary btn-lg">
                  ☎ {predseda.telefon}
                </a>
                {predseda.linkedIn && (
                  <a href={predseda.linkedIn} target="_blank" rel="noreferrer noopener" className="btn-secondary btn-lg">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide py-10 grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-3">O mně</h2>
            <p className="text-ink-700 leading-relaxed whitespace-pre-line">{predseda.popis}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Specializace</h2>
            <div className="flex flex-wrap gap-2">
              {specializace.map((s) => (
                <Badge key={s} variant="brand">{s}</Badge>
              ))}
            </div>
          </section>

          {certifikace.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Certifikace a oprávnění</h2>
              <ul className="space-y-1.5">
                {certifikace.map((c, i) => (
                  <li key={i} className="text-sm text-ink-700 flex gap-2">
                    <span className="text-brand-500">✓</span> {c}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {reference.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Reference</h2>
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
            <h2 className="text-xl font-semibold mb-4">Hodnocení od klientů</h2>
            {predseda.recenze.length === 0 ? (
              <div className="card p-6 text-center text-ink-600">
                Zatím žádné recenze.
              </div>
            ) : (
              <div className="space-y-3">
                {predseda.recenze.map((r) => (
                  <article key={r.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="font-semibold">{r.nadpis}</h3>
                        <p className="text-xs text-ink-500 mt-1">
                          {r.autorJmeno} · {r.autorSvj || "Klient"} · {new Date(r.createdAt).toLocaleDateString("cs-CZ")}
                        </p>
                      </div>
                      <RatingStars value={r.hodnoceni} />
                    </div>
                    <p className="text-sm text-ink-700 mt-3 leading-relaxed">{r.text}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <div className="card p-5 space-y-3">
            <h3 className="font-semibold">Kontakt a podmínky</h3>
            <div className="text-sm space-y-2">
              <div>
                <div className="text-ink-500 text-xs">E-mail</div>
                <a href={`mailto:${predseda.email}`} className="text-brand-600 hover:underline break-all">{predseda.email}</a>
              </div>
              <div>
                <div className="text-ink-500 text-xs">Telefon</div>
                <a href={`tel:${predseda.telefon}`} className="text-brand-600 hover:underline">{predseda.telefon}</a>
              </div>
              <div>
                <div className="text-ink-500 text-xs">Cena za vedení SVJ</div>
                <div className="text-ink-900 font-semibold">
                  {predseda.cenaOd && predseda.cenaDo
                    ? `${formatKc(predseda.cenaOd)} – ${formatKc(predseda.cenaDo)} / měsíc`
                    : predseda.cenaOd
                    ? `od ${formatKc(predseda.cenaOd)} / měsíc`
                    : "Individuálně"}
                </div>
              </div>
              <div>
                <div className="text-ink-500 text-xs">Velikost SVJ</div>
                <div className="text-ink-900">
                  {predseda.velikostDomuMin && predseda.velikostDomuMax
                    ? `${predseda.velikostDomuMin} – ${predseda.velikostDomuMax} jednotek`
                    : "Bez omezení"}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold mb-2">Působnost</h3>
            <div className="flex flex-wrap gap-1.5">
              {regiony.map((r) => (
                <Badge key={r} variant="outline">{r}</Badge>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
