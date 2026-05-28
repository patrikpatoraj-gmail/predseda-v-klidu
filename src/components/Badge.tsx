import { cn } from "@/lib/utils";

type Variant = "default" | "brand" | "success" | "warning" | "amber" | "outline";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    default: "bg-ink-100 text-ink-700",
    brand: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
    success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    warning: "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200",
    amber: "bg-amber-100 text-amber-900",
    outline: "bg-white text-ink-700 ring-1 ring-inset ring-ink-200",
  };

  return (
    <span className={cn("badge", styles[variant], className)}>{children}</span>
  );
}

export function VerifiedBadge() {
  return (
    <Badge variant="brand" className="gap-1">
      <svg viewBox="0 0 20 20" className="w-3 h-3" fill="currentColor" aria-hidden>
        <path d="M10 1 12.5 4l4-1L17 7l3 2.5L17 12l-.5 4-4-1L10 18l-2.5-3-4 1L3 12 0 9.5 3 7l.5-4 4 1L10 1Z" />
      </svg>
      Ověřený profil
    </Badge>
  );
}

export function PremiumBadge() {
  return (
    <Badge variant="amber" className="gap-1">
      <svg viewBox="0 0 20 20" className="w-3 h-3" fill="currentColor" aria-hidden>
        <path d="M10 2 4 7l2 9 4-1 4 1 2-9-6-5Z" />
      </svg>
      Premium
    </Badge>
  );
}
