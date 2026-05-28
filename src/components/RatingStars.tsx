import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  count,
  size = "sm",
}: {
  value: number;
  count?: number;
  size?: "sm" | "md" | "lg";
}) {
  const filled = Math.round(value);
  const sizeClass = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size];
  const textClass = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size];

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={cn(sizeClass, i <= filled ? "text-amber-400" : "text-ink-200")}
            fill="currentColor"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118L10.587 15.4a1 1 0 0 0-1.176 0l-3.367 2.447c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 0 0-.363-1.118L2.062 9.207c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.287-3.957Z" />
          </svg>
        ))}
      </div>
      <span className={cn(textClass, "font-semibold text-ink-900")}>{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className={cn(textClass, "text-ink-500")}>({count})</span>
      )}
    </div>
  );
}
