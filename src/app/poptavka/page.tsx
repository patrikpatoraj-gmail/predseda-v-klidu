import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PoptavkaForm } from "@/components/PoptavkaForm";

export const metadata: Metadata = {
  title: "Nezávazná poptávka — oslovit více správců najednou",
  description:
    "Jedna poptávka, více nabídek. Odešlete poptávku až 5 ověřeným správcům SVJ v Praze najednou. Bezplatně.",
};

type SearchParams = Promise<{
  spravce?: string;
  spravci?: string;
}>;

export default async function PoptavkaPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;

  // zlúčiť slugy z oboch parametrov
  const slugs = new Set<string>();
  if (sp.spravce) slugs.add(sp.spravce);
  if (sp.spravci) sp.spravci.split(",").filter(Boolean).forEach((s) => slugs.add(s));

  const preselected = slugs.size > 0
    ? await prisma.spravce.findMany({
        where: { slug: { in: Array.from(slugs) }, aktivni: true },
        select: { id: true, slug: true, nazev: true, logo: true },
      })
    : [];

  return (
    <>
      <section className="bg-gradient-to-br from-brand-50 to-white border-b border-ink-100">
        <div className="container-narrow py-12 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold">Jedna poptávka, více nabídek</h1>
          <p className="mt-3 text-ink-600 max-w-xl mx-auto">
            Vyplňte formulář jednou. My ho rozešleme všem zvoleným správcům.
            Oni se ozvou s konkrétní cenovou nabídkou pro váš dům.
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-600">
            <li>✓ Bezplatně</li>
            <li>✓ Bez závazku</li>
            <li>✓ Vaše údaje vidí jen vybrané firmy</li>
          </ul>
        </div>
      </section>

      <div className="container-narrow py-10">
        <PoptavkaForm preselected={preselected} />
      </div>
    </>
  );
}
