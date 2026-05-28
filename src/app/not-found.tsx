import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-narrow py-24 text-center">
      <div className="text-7xl font-bold text-brand-600 mb-2">404</div>
      <h1 className="text-3xl font-bold">Stránka nenalezena</h1>
      <p className="mt-3 text-ink-600">Hledaná stránka neexistuje nebo byla přesunuta.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Domů</Link>
        <Link href="/spravci" className="btn-secondary">Procházet katalog</Link>
      </div>
    </div>
  );
}
