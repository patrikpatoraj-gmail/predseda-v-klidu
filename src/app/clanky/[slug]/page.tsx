import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/Badge";
import { parseJson } from "@/lib/utils";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const c = await prisma.clanek.findUnique({ where: { slug } });
  if (!c) return { title: "Nenalezeno" };
  return {
    title: c.seoTitle || c.nadpis,
    description: c.seoDescription || c.perex,
    openGraph: {
      title: c.nadpis,
      description: c.perex,
      images: c.obrazek ? [c.obrazek] : undefined,
      type: "article",
    },
  };
}

/** Veľmi jednoduchý markdown → HTML konvertor (MVP). */
function markdownToHtml(md: string): string {
  let html = md;
  // headings
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");
  // bold / italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  // inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  // code blocks
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/```\w*\n?|```/g, "");
    return `<pre><code>${code.trim()}</code></pre>`;
  });
  // blockquote
  html = html.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");
  // lists
  html = html.replace(/(?:^|\n)((?:[-*] .+\n?)+)/g, (m) => {
    const items = m.trim().split("\n").map((line) => line.replace(/^[-*] /, "").trim());
    return "\n<ul>" + items.map((i) => `<li>${i}</li>`).join("") + "</ul>\n";
  });
  // numbered lists
  html = html.replace(/(?:^|\n)((?:\d+\. .+\n?)+)/g, (m) => {
    const items = m.trim().split("\n").map((line) => line.replace(/^\d+\. /, "").trim());
    return "\n<ol>" + items.map((i) => `<li>${i}</li>`).join("") + "</ol>\n";
  });
  // tables (basic)
  html = html.replace(/((?:\|.+\|\n)+)/g, (match) => {
    const lines = match.trim().split("\n");
    if (lines.length < 2) return match;
    const header = lines[0].split("|").slice(1, -1).map((c) => c.trim());
    const rows = lines.slice(2).map((l) => l.split("|").slice(1, -1).map((c) => c.trim()));
    return `<table><thead><tr>${header.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
      .join("")}</tbody></table>`;
  });
  // horizontal rule
  html = html.replace(/^---$/gm, "<hr/>");
  // paragraphs
  html = html
    .split(/\n\n+/)
    .map((block) => {
      if (/^<(h[1-6]|ul|ol|pre|blockquote|table|hr)/.test(block.trim())) return block;
      if (block.trim() === "") return "";
      return `<p>${block.trim().replace(/\n/g, " ")}</p>`;
    })
    .join("\n");

  return html;
}

export default async function ClanekDetail({ params }: { params: Params }) {
  const { slug } = await params;

  const clanek = await prisma.clanek.findUnique({
    where: { slug },
  });

  if (!clanek || !clanek.publikovany) notFound();

  const tagy = parseJson<string[]>(clanek.tagy, []);
  const htmlObsah = markdownToHtml(clanek.obsah);

  const dalsi = await prisma.clanek.findMany({
    where: { publikovany: true, id: { not: clanek.id }, kategorie: clanek.kategorie },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <article>
      <section className="bg-ink-50/40 border-b border-ink-100">
        <div className="container-narrow py-10">
          <nav className="text-xs text-ink-500 mb-4">
            <Link href="/" className="hover:text-brand-600">Domů</Link> ›{" "}
            <Link href="/clanky" className="hover:text-brand-600">Články</Link> ›{" "}
            <span className="text-ink-700">{clanek.nadpis}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="brand">{clanek.kategorie}</Badge>
            {clanek.premium && <Badge variant="amber">Premium</Badge>}
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">{clanek.nadpis}</h1>
          <p className="mt-4 text-lg text-ink-600">{clanek.perex}</p>

          <div className="mt-5 text-sm text-ink-500">
            Publikováno {new Date(clanek.createdAt).toLocaleDateString("cs-CZ")}
          </div>
        </div>
      </section>

      {clanek.obrazek && (
        <div className="container-narrow -mt-2">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mt-8 mb-2">
            <Image src={clanek.obrazek} alt={clanek.nadpis} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
          </div>
        </div>
      )}

      <div className="container-narrow py-10">
        <div
          className="prose-article max-w-none
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:my-4 [&_p]:text-ink-700 [&_p]:leading-relaxed
            [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul_li]:my-1
            [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol_li]:my-1
            [&_strong]:text-ink-950
            [&_code]:bg-ink-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
            [&_pre]:bg-ink-950 [&_pre]:text-ink-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-auto [&_pre]:my-5
            [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0
            [&_blockquote]:border-l-4 [&_blockquote]:border-brand-300 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:bg-brand-50/50 [&_blockquote]:my-5 [&_blockquote]:italic [&_blockquote]:text-ink-700
            [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_th]:bg-ink-50 [&_th]:border [&_th]:border-ink-200 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left
            [&_td]:border [&_td]:border-ink-100 [&_td]:px-3 [&_td]:py-2
            [&_hr]:my-8 [&_hr]:border-ink-100"
          dangerouslySetInnerHTML={{ __html: htmlObsah }}
        />

        {tagy.length > 0 && (
          <div className="mt-10 pt-6 border-t border-ink-100">
            <h3 className="text-sm font-semibold mb-2">Tagy</h3>
            <div className="flex flex-wrap gap-2">
              {tagy.map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 card p-6 bg-brand-50/50 border-brand-200">
          <h3 className="text-xl font-semibold">Hledáte správce nebo profi předsedu?</h3>
          <p className="mt-2 text-ink-700">
            Pošlete bezplatnou poptávku až 5 ověřeným správcům SVJ v Praze najednou.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/spravci" className="btn-primary">Procházet katalog</Link>
            <Link href="/poptavka" className="btn-secondary">Odeslat poptávku</Link>
          </div>
        </div>

        {dalsi.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Další články</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {dalsi.map((c) => (
                <Link key={c.id} href={`/clanky/${c.slug}`} className="card-hover p-4">
                  <Badge variant="outline" className="mb-2">{c.kategorie}</Badge>
                  <h3 className="font-semibold leading-snug">{c.nadpis}</h3>
                  <p className="mt-1 text-sm text-ink-600 line-clamp-2">{c.perex}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
