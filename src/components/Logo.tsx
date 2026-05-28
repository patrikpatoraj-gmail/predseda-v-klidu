import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 font-display font-semibold text-ink-950", className)}
    >
      <span className="grid place-items-center w-9 h-9 rounded-lg bg-brand-600 text-white shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
          <path
            d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.15"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base">Předseda <span className="text-brand-600">v klidu</span></span>
        <span className="text-[10px] uppercase tracking-wider text-ink-400 font-medium mt-0.5">Katalog správců SVJ</span>
      </span>
    </Link>
  );
}
