import Link from "next/link";

export default function NotFound() {
  return (
    <div className="anim-rise sticker p-7">
      <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
        Not found
      </p>
      <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-[color:var(--ink-strong)]">
        That hallway does not exist.
      </h1>
      <p className="mt-3 text-[color:var(--muted)]">
        Try going back to Docs home and picking a section.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/docs"
          className="sticker-pop rounded-lg bg-[color:var(--accent)] px-5 py-2 text-sm font-bold text-white"
        >
          Back to Docs
        </Link>
        <Link
          href="/"
          className="sticker-pop rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-5 py-2 text-sm font-semibold text-[color:var(--ink)]"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
