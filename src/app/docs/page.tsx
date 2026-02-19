import Link from "next/link";
import { DOC_SECTIONS } from "@/lib/docs";

const SECTION_ACCENTS: Record<string, string> = {
  "core-concepts": "var(--accent2)",
  agents: "var(--accent4)",
  tools: "var(--accent3)",
};

export default function DocsHome() {
  return (
    <div className="anim-rise">
      <div className="sticker p-7">
        <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
          Docs
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[color:var(--ink-strong)]">
          Pick a hallway.
        </h1>
        <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
          This is a fun remake of the OpenAI docs structure, written for
          non-technical readers. Each section starts with the story, then offers
          optional builder notes.
        </p>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {DOC_SECTIONS.map((s) => (
            <Link
              key={s.key}
              href={`/docs/${s.key}`}
              className="sticker-pop group rounded-xl border border-[color:var(--stroke)] bg-[color:var(--card)] p-5 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: SECTION_ACCENTS[s.key] }}
                />
                <p className="font-display text-xl font-bold tracking-tight text-[color:var(--ink-strong)]">
                  {s.title}
                </p>
              </div>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {s.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-[color:var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                Open section &rarr;
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
