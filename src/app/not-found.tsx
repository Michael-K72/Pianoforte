import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="display text-6xl">404</p>
        <p className="mt-4 text-[#8a857c]">Diese Seite existiert nicht.</p>
        <Link href="/de" className="btn btn-ghost mt-8">
          Pianoforte
        </Link>
      </div>
    </main>
  );
}
