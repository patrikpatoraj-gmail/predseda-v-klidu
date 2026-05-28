import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { HeroSearch } from "@/components/HeroSearch";
import { SpravceCard } from "@/components/SpravceCard";
import { PredsedaCard } from "@/components/PredsedaCard";
import { RatingStars } from "@/components/RatingStars";

export const revalidate = 60;

async function getData() {
  const [topSpravci, topPredsedove, novinky, statsSpravci, statsPredsedove, statsPoptavky] =
    await Promise.all([
      prisma.spravce.findMany({
        where: { aktivni: true, schvaleny: true },
        orderBy: [{ premium: "desc" }, { prumerneHodnoceni: "desc" }],
        take: 6,
      }),
      prisma.predseda.findMany({
        where: { aktivni: true, schvaleny: true },
        orderBy: [{ premium: "desc" }, { prumerneHodnoceni: "desc" }],
        take: 3,
      }),
      prisma.clanek.findMany({
        where: { publikovany: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
      prisma.spravce.count({ where: { aktivni: true } }),
      prisma.predseda.count({ where: { aktivni: true } }),
      prisma.poptavka.count(),
    ]);

  return { topSpravci, topPredsedove, novinky, statsSpravci, statsPredsedove, statsPoptavky };
}

export default async function HomePage() {
  const { topSpravci, topPredsedove, novinky, statsSpravci, statsPredsedove } = await getData();

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="hero-gradient">
        <div className="container-wide py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-100 px-3 py-1 text-xs font-medium text-brand-700 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Aktuálně testujeme MVP v Praze
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-950">
              Najděte správce SVJ,<br />
              kterému budete <span className="text-gradient">věřit</span>.
            </h1>
            <p className="mt-5 text-lg text-ink-600 max-w-2xl mx-auto">
              Největší katalog ověřených správcovských firem a profesionálních
              předsedů pro SVJ a bytové domy. Porovnejte ceny, zkušenosti
              a hodnocení od skutečných SVJ.
            </p>

            <div className="mt-10">
              <HeroSearch />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-500">
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="w-4 h-4 text-brand-500" fill="currentColor"><path d="M9 12.6 5.4 9l-1.4 1.4L9 15.4l11-11L18.6 3 9 12.6Z" /></svg>
                {statsSpravci}+ ověřených správců
              </span>
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="w-4 h-4 text-brand-500" fill="currentColor"><path d="M9 12.6 5.4 9l-1.4 1.4L9 15.4l11-11L18.6 3 9 12.6Z" /></svg>
                {statsPredsedove}+ profi předsedů
              </span>
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="w-4 h-4 text-brand-500" fill="currentColor"><path d="M9 12.6 5.4 9l-1.4 1.4L9 15.4l11-11L18.6 3 9 12.6Z" /></svg>
                Bezplatné poptávky
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ AKO TO FUNGUJE ============================ */}
      <section className="py-16 lg:py-20 border-t border-ink-100">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Jak to funguje</h2>
            <p className="mt-3 text-ink-600">
              Najít kvalitního správce nebo profesionálního předsedu trvá minuty.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                title: "Vyberte si",
                text: "Porovnejte správce nebo profi předsedy podle ceny, hodnocení, zkušeností a poskytovaných služeb.",
                icon: (
                  <path d="M3 6h14M3 10h10M3 14h14" strokeWidth="2" stroke="currentColor" strokeLinecap="round" />
                ),
              },
              {
                num: "2",
                title: "Zaškrtněte favority",
                text: "Označte 3–5 správců, kteří vás zaujmou. Vyplníte jednu poptávku — odejde všem najednou.",
                icon: (
                  <path d="m5 10 3 3 7-7" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                ),
              },
              {
                num: "3",
                title: "Dostanete nabídky",
                text: "Správci se vám ozvou s konkrétní nabídkou. Vyberete si tu nejlepší pro váš dům.",
                icon: (
                  <path d="M3 7l7 5 7-5M3 5h14v10H3z" strokeWidth="2" stroke="currentColor" fill="none" strokeLinejoin="round" />
                ),
              },
            ].map((step) => (
              <div key={step.num} className="card p-6 relative">
                <div className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-brand-600 text-white grid place-items-center font-semibold shadow-sm">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-lg bg-brand-50 text-brand-600 grid place-items-center mb-4">
                  <svg viewBox="0 0 20 20" className="w-6 h-6">{step.icon}</svg>
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ TOP SPRÁVCI ============================ */}
      <section className="py-16 lg:py-20 bg-ink-50/50 border-y border-ink-100">
        <div className="container-wide">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">Nejlépe hodnocení správci v Praze</h2>
              <p className="mt-2 text-ink-600">Ověřené firmy s nejvyšším hodnocením od skutečných SVJ.</p>
            </div>
            <Link href="/spravci" className="btn-secondary">
              Celý katalog ({statsSpravci})
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topSpravci.map((s) => (
              <SpravceCard key={s.id} spravce={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PROFI PŘEDSEDOVÉ ============================ */}
      <section className="py-16 lg:py-20">
        <div className="container-wide">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">Profesionální předsedové SVJ</h2>
              <p className="mt-2 text-ink-600">
                Místo dobrovolného předsedy z domu — externí profesionál na plný úvazek.
              </p>
            </div>
            <Link href="/predsedove" className="btn-secondary">
              Všichni předsedové ({statsPredsedove})
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {topPredsedove.map((p) => (
              <PredsedaCard key={p.id} predseda={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ ČLÁNKY ============================ */}
      <section className="py-16 lg:py-20 bg-ink-50/50 border-y border-ink-100">
        <div className="container-wide">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">Vzdělávání pro SVJ</h2>
              <p className="mt-2 text-ink-600">Praktické návody k tématům, která řeší každé SVJ.</p>
            </div>
            <Link href="/clanky" className="btn-secondary">Všechny články</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {novinky.map((c) => (
              <Link
                key={c.id}
                href={`/clanky/${c.slug}`}
                className="card-hover overflow-hidden flex flex-col group"
              >
                {c.obrazek && (
                  <div className="relative aspect-[16/10] bg-ink-100 overflow-hidden">
                    <Image
                      src={c.obrazek}
                      alt={c.nadpis}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <span className="badge bg-brand-50 text-brand-700 self-start text-[10px]">{c.kategorie}</span>
                  <h3 className="text-lg font-semibold leading-snug group-hover:text-brand-600">{c.nadpis}</h3>
                  <p className="text-sm text-ink-600 line-clamp-2">{c.perex}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CTA SPRÁVCOM ============================ */}
      <section className="py-16 lg:py-20">
        <div className="container-wide">
          <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white p-8 lg:p-12 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold leading-tight">
                Jste správce SVJ nebo profi předseda?
              </h2>
              <p className="mt-3 text-brand-100 text-lg">
                Získejte nové klienty z Prahy. Registrace je zdarma, Premium funkce vás
                zviditelní mezi prvními ve výsledcích vyhledávání.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link href="/registrace" className="btn bg-white text-brand-700 hover:bg-brand-50 btn-lg">
                Registrace zdarma
              </Link>
              <Link href="/cenik" className="btn bg-brand-700/40 text-white border border-white/30 hover:bg-brand-700/60 btn-lg">
                Ceník Premium
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
