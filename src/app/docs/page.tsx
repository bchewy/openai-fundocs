import Link from "next/link";
import { DOC_SECTIONS } from "@/lib/docs";

export default function DocsHome() {
  return (
    <div className="anim-rise">
      <div className="sticker p-7">
        <p className="text-sm font-bold text-[color:var(--muted)]">Docs</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">
          Pick a hallway.
        </h1>
        <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
          This is a fun remake of the OpenAI docs structure, written for
          non-technical readers. Each section starts with the story, then offers
          optional builder notes.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {DOC_SECTIONS.map((s) => (
            <Link
              key={s.key}
              href={`/docs/${s.key}`}
              className="sticker-pop group rounded-[calc(var(--radius)+10px)] border-2 border-[color:var(--stroke)] bg-white/70 p-5"
            >
              <p className="font-display text-2xl tracking-tight">{s.title}</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {s.description}
              </p>
              <p className="mt-4 text-sm font-bold text-[color:var(--ink)]">
                Open section →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
