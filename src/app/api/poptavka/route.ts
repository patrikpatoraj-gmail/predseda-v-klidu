import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const PoptavkaSchema = z.object({
  nazevSvj: z.string().min(2).max(200),
  lokalita: z.string().min(2).max(200),
  pocetJednotek: z.number().int().min(2).max(2000),
  popisPoptavky: z.string().min(10).max(5000),
  kontaktniOsoba: z.string().min(2).max(100),
  telefon: z.string().min(6).max(30),
  email: z.string().email().max(200),
  souhlas: z.literal(true),
  spravciIds: z.array(z.string().cuid()).min(1).max(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = PoptavkaSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Neplatná data formuláře", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // overiť, že vybraní správci skutočne existujú
    const spravci = await prisma.spravce.findMany({
      where: { id: { in: data.spravciIds }, aktivni: true },
      select: { id: true, email: true, nazev: true },
    });
    if (spravci.length === 0) {
      return NextResponse.json({ error: "Žádní platní správci k poptávce." }, { status: 400 });
    }

    const poptavka = await prisma.poptavka.create({
      data: {
        nazevSvj: data.nazevSvj,
        lokalita: data.lokalita,
        pocetJednotek: data.pocetJednotek,
        popisPoptavky: data.popisPoptavky,
        kontaktniOsoba: data.kontaktniOsoba,
        telefon: data.telefon,
        email: data.email,
        stav: "NOVA",
        schvalena: false, // čaká na moderáciu adminom
        spravci: {
          create: spravci.map((s) => ({
            spravce: { connect: { id: s.id } },
            odeslano: false,
          })),
        },
      },
    });

    // MVP: zatiaľ iba logujeme do konzoly, namiesto reálneho rozosielania
    console.log(`📩 Nová poptávka [${poptavka.id}] na ${spravci.length} správců.`);
    console.log(`   SVJ: ${data.nazevSvj}, ${data.lokalita}, ${data.pocetJednotek} j.`);
    console.log(`   Kontakt: ${data.kontaktniOsoba}, ${data.email}, ${data.telefon}`);
    for (const s of spravci) {
      console.log(`   → ${s.nazev} (${s.email})`);
    }

    return NextResponse.json({ ok: true, id: poptavka.id }, { status: 201 });
  } catch (error) {
    console.error("Chyba pri spracovaní poptávky:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru. Zkuste to prosím později." },
      { status: 500 }
    );
  }
}
