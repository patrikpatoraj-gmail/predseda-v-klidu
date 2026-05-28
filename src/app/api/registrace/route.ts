import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const RegistraceSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  password: z.string().min(8).max(100),
  role: z.enum(["SPRAVCE", "PREDSEDA"]),
  organizace: z.string().min(2).max(200),
  souhlas: z.literal(true),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RegistraceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Neplatná data" }, { status: 400 });
    }
    const data = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json(
        { error: "Tento e-mail je již registrován." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        phone: data.phone,
        role: data.role,
      },
    });

    // vytvor placeholder profil (čaká na schválenie / doplnenie)
    const baseSlug = slugify(data.organizace);
    if (data.role === "SPRAVCE") {
      await prisma.spravce.create({
        data: {
          slug: `${baseSlug}-${user.id.slice(-5)}`,
          nazev: data.organizace,
          popis: "Profil čeká na doplnění.",
          kontaktniOsoba: data.name,
          email: data.email,
          telefon: data.phone,
          kraj: "Praha",
          mesto: "Praha",
          regionyPusobnosti: JSON.stringify([]),
          userId: user.id,
          schvaleny: false, // čaká na admin schválenie
          aktivni: false,
        },
      });
    } else {
      await prisma.predseda.create({
        data: {
          slug: `${baseSlug}-${user.id.slice(-5)}`,
          jmeno: data.organizace,
          popis: "Profil čeká na doplnění.",
          email: data.email,
          telefon: data.phone,
          kraj: "Praha",
          mesto: "Praha",
          regionyPusobnosti: JSON.stringify([]),
          specializace: JSON.stringify([]),
          userId: user.id,
          schvaleny: false,
          aktivni: false,
        },
      });
    }

    return NextResponse.json({ ok: true, id: user.id }, { status: 201 });
  } catch (error) {
    console.error("Chyba pri registrácii:", error);
    return NextResponse.json({ error: "Interní chyba serveru." }, { status: 500 });
  }
}
