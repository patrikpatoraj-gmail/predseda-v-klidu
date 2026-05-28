import Link from "next/link";
import Image from "next/image";
import { Badge, PremiumBadge, VerifiedBadge } from "./Badge";
import { RatingStars } from "./RatingStars";
import { cn, parseJson, formatCenaRozsah } from "@/lib/utils";

type SpravceCardProps = {
  spravce: {
    id: string;
    slug: string;
    nazev: string;
    logo: string | null;
    popis: string;
    regionyPusobnosti: string;
    pocetDomu: number;
    pocetJednotek: number;
    cenaOd: number | null;
    cenaDo: number | null;
    overeny: boolean;
    premium: boolean;
    prumerneHodnoceni: number;
    pocetRecenzi: number;
    havarijniSluzba: boolean;
    onlinePortal: boolean;
    zkDotace: boolean;
  };
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
};

export function SpravceCard({ spravce, selectable, selected, onToggleSelect }: SpravceCardProps) {
  const regiony = parseJson<string[]>(spravce.regionyPusobnosti, []);
  const regionLabel = regiony.length > 3 ? `${regiony.slice(0, 3).join(", ")} +${regiony.length - 3}` : regiony.join(", ");

  return (
    <article
      className={cn(
        "card-hover p-5 flex flex-col gap-4 relative",
        spravce.premium && "ring-1 ring-amber-200/60",
        selected && "ring-2 ring-brand-500"
      )}
    >
      {selectable && (
        <button
          type="button"
          onClick={onToggleSelect}
          aria-label={selected ? "Odznačit" : "Přidat do poptávky"}
          className={cn(
            "absolute top-3 right-3 z-10 w-6 h-6 rounded-md border-2 grid place-items-center transition-all",
            selected
              ? "bg-brand-600 border-brand-600 text-white"
              : "bg-white border-ink-300 hover:border-brand-400"
          )}
        >
          {selected && (
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m3 8 3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      )}

      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-ink-100">
          {spravce.logo ? (
            <Image src={spravce.logo} alt={spravce.nazev} fill className="object-cover" sizes="56px" />
          ) : (
            <div className="w-full h-full grid place-items-center text-ink-400 text-xl font-semibold">
              {spravce.nazev[0]}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-ink-950 leading-tight">
              <Link href={`/spravci/${spravce.slug}`} className="hover:text-brand-600">
                {spravce.nazev}
              </Link>
            </h3>
          </div>
          <p className="text-xs text-ink-500 mb-2">{regionLabel}</p>
          <RatingStars value={spravce.prumerneHodnoceni} count={spravce.pocetRecenzi} />
        </div>
      </div>

      <p className="text-sm text-ink-600 line-clamp-2">{spravce.popis}</p>

      <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-ink-100">
        <div>
          <div className="text-base font-semibold text-ink-950">{spravce.pocetDomu}</div>
          <div className="text-[10px] uppercase tracking-wide text-ink-500">domů</div>
        </div>
        <div>
          <div className="text-base font-semibold text-ink-950">{spravce.pocetJednotek.toLocaleString("cs-CZ")}</div>
          <div className="text-[10px] uppercase tracking-wide text-ink-500">jednotek</div>
        </div>
        <div>
          <div className="text-base font-semibold text-ink-950 truncate" title={formatCenaRozsah(spravce.cenaOd, spravce.cenaDo)}>
            {spravce.cenaOd ? `${spravce.cenaOd}+` : "—"}
          </div>
          <div className="text-[10px] uppercase tracking-wide text-ink-500">Kč/j./měs.</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {spravce.overeny && <VerifiedBadge />}
        {spravce.premium && <PremiumBadge />}
        {spravce.havarijniSluzba && <Badge variant="success">Havárie 24/7</Badge>}
        {spravce.onlinePortal && <Badge variant="outline">Online portál</Badge>}
        {spravce.zkDotace && <Badge variant="outline">Dotace</Badge>}
      </div>

      <div className="flex items-center gap-2 mt-auto pt-2">
        <Link href={`/spravci/${spravce.slug}`} className="btn-secondary flex-1 justify-center">
          Detail profilu
        </Link>
        {!selectable && (
          <Link href={`/poptavka?spravce=${spravce.slug}`} className="btn-primary">
            Poptat
          </Link>
        )}
      </div>
    </article>
  );
}
