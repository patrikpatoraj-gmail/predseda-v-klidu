import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [spravci, predsedove, clanky] = await Promise.all([
    prisma.spravce.findMany({
      where: { aktivni: true, schvaleny: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.predseda.findMany({
      where: { aktivni: true, schvaleny: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.clanek.findMany({
      where: { publikovany: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/spravci`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/predsedove`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/clanky`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/poptavka`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/jak-to-funguje`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/cenik`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/o-nas`, changeFrequency: "yearly", priority: 0.4 },
  ];

  return [
    ...staticRoutes,
    ...spravci.map((s) => ({
      url: `${BASE_URL}/spravci/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...predsedove.map((p) => ({
      url: `${BASE_URL}/predsedove/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...clanky.map((c) => ({
      url: `${BASE_URL}/clanky/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
