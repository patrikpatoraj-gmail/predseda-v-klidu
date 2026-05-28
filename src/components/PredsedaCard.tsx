import Link from "next/link";
import Image from "next/image";
import { Badge, PremiumBadge, VerifiedBadge } from "./Badge";
import { RatingStars } from "./RatingStars";
import { cn, parseJson } from "@/lib/utils";

type PredsedaCardProps = {
  predseda: {
    id: string;
    slug: string;
    jmeno: string;
    fotografie: string | null;
    popis: string;
    regionyPusobnosti: string;
    specializace: string;
    pocetSvj: number;
    rokyZkusenosti: number;
    cenaOd: number | null;
    cenaDo: number | null;
    overeny: boolean;
    premium: boolean;
    prumerneHodnoceni: number;
    pocetRecenzi: number;
  };
};

export function PredsedaCard({ predseda }: PredsedaCardProps) {
  const specializace = parseJson<string[]>(predseda.specializace, []);
  const regiony = parseJson<string[]>(predseda.regionyPusobnosti, []);

  return (
    <article className={cn("card-hover p-5 flex flex-col gap-4", predseda.premium && "ring-1 ring-amber-200/60")}>
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-ink-100 ring-2 ring-white shadow-sm">
          {predseda.fotografie ? (
            <Image src={predseda.fotografie} alt={predseda.jmeno} fill className="object-cover" sizes="64px" />
          ) : (
            <div className="w-full h-full grid place-items-center text-ink-400 text-xl font-semibold">
              {predseda.jmeno[0]}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink-950 leading-tight">
            <Link href={`/predsedove/${predseda.slug}`} className="hover:text-brand-600">
              {predseda.jmeno}
            </Link>
          </h3>
          <p className="text-xs text-ink-500 mt-1">
            {predseda.rokyZkusenosti} let praxe · {predseda.pocetSvj} SVJ
          </p>
          <div className="mt-1.5">
            <RatingStars value={predseda.prumerneHodnoceni} count={predseda.pocetRecenzi} />
          </div>
        </div>
      </div>

      <p className="text-sm text-ink-600 line-clamp-3">{predseda.popis}</p>

      <div>
        <div className="text-[10px] uppercase tracking-wide text-ink-500 mb-1.5">Specializace</div>
        <div className="flex flex-wrap gap-1.5">
          {specializace.slice(0, 3).map((s) => (
            <Badge key={s} variant="outline">{s}</Badge>
          ))}
          {specializace.length > 3 && (
            <Badge variant="default">+{specializace.length - 3}</Badge>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-ink-600 pt-3 border-t border-ink-100">
        <span>
          <span className="text-ink-500">Působnost: </span>
          {regiony.length > 2 ? `${regiony.length} oblastí` : regiony.join(", ")}
        </span>
        <span className="font-semibold text-ink-900">
          {predseda.cenaOd ? `od ${predseda.cenaOd.toLocaleString("cs-CZ")} Kč/měs.` : "Dohodou"}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {predseda.overeny && <VerifiedBadge />}
        {predseda.premium && <PremiumBadge />}
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <Link href={`/predsedove/${predseda.slug}`} className="btn-secondary flex-1 justify-center">
          Detail profilu
        </Link>
      </div>
    </article>
  );
}
