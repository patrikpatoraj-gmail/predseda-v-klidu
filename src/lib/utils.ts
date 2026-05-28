import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Bezpečne parsuje JSON string z DB; ak zlyhá, vráti fallback. */
export function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** Formátuje cenu Kč. */
export function formatKc(n?: number | null): string {
  if (n == null) return "—";
  return new Intl.NumberFormat("cs-CZ").format(n) + " Kč";
}

/** Formátuje cenový rozsah. */
export function formatCenaRozsah(od?: number | null, doCena?: number | null, suffix = ""): string {
  if (od == null && doCena == null) return "Na vyžádání";
  if (od != null && doCena != null) return `${formatKc(od)}–${formatKc(doCena)}${suffix}`;
  if (od != null) return `od ${formatKc(od)}${suffix}`;
  return `do ${formatKc(doCena)}${suffix}`;
}

export function pluralCz(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return few;
  return many;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
