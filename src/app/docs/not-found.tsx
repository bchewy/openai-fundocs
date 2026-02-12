import Link from "next/link";

export default function NotFound() {
  return (
    <div className="anim-rise sticker p-7">
      <p className="text-sm font-bold text-[color:var(--muted)]">Not found</p>
      <h1 className="mt-2 font-display text-3xl tracking-tight">
        That hallway does not exist.
      </h1>
      <p className="mt-3 text-[color:var(--muted)]">
        Try going back to Docs home and picking a section.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/docs"
          className="sticker-pop rounded-full border-2 border-[color:var(--stroke)] bg-[color:var(--ink)] px-5 py-2 text-sm font-bold text-[color:var(--bg0)] shadow-[var(--shadow-soft)]"
        >
          Back to Docs
        </Link>
        <Link
          href="/"
          className="sticker-pop rounded-full border-2 border-[color:var(--stroke)] bg-white/70 px-5 py-2 text-sm font-bold text-[color:var(--ink)] shadow-[var(--shadow-soft)]"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
