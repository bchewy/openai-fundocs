import Link from "next/link";

function ScribbleUnderline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 26"
      className="absolute -bottom-2 left-0 h-[18px] w-[210px] text-[color:var(--accent3)]"
    >
      <path
        d="M6 19c16-7 38-10 63-9 34 1 55 10 89 9 25-1 48-9 73-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.78"
      />
      <path
        d="M10 21c18-6 40-8 62-7 32 1 53 9 87 8 25-1 47-8 70-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <Link
          href="/"
          className="sticker-pop sticker-soft inline-flex items-center gap-2 px-4 py-2"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-[color:var(--stroke)] bg-[color:var(--accent)] text-white">
            <span className="font-display text-lg leading-none">F</span>
          </span>
          <span className="font-display text-lg tracking-tight">Fundocs</span>
          <span className="text-sm text-[color:var(--muted)]">
            OpenAI platform, but friendly
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/docs"
            className="sticker-pop rounded-full border-2 border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-4 py-2 text-sm font-bold text-[color:var(--ink)] shadow-[var(--shadow-soft)]"
          >
            Start the tour
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <section className="anim-rise grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="sticker-soft inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-[color:var(--muted)]">
              Three sections, reimagined
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent2)]" />
              Core concepts
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              Agents
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent3)]" />
              Tools
            </p>

            <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-[-0.03em] text-[color:var(--ink)] sm:text-6xl">
              OpenAI docs for humans who{" "}
              <span className="relative inline-block">
                have a life
                <ScribbleUnderline />
              </span>
              .
            </h1>

            <p className="mt-5 max-w-xl text-lg text-[color:var(--muted)]">
              This is the same platform, but explained like a guided tour. Less
              jargon. More “what happens next” and “what can go wrong.” Built to
              help non-technical teams understand what they are approving, using,
              and shipping.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs"
                className="sticker-pop inline-flex items-center justify-center rounded-full border-2 border-[color:var(--stroke)] bg-[color:var(--ink)] px-6 py-3 text-sm font-bold text-[color:var(--bg0)] shadow-[var(--shadow-soft)]"
              >
                Start the tour
              </Link>
              <Link
                href="/docs/core-concepts"
                className="sticker-pop inline-flex items-center justify-center rounded-full border-2 border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-6 py-3 text-sm font-bold text-[color:var(--ink)] shadow-[var(--shadow-soft)]"
              >
                Jump to Core concepts
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="sticker p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[color:var(--muted)]">
                    Your assistant, explained
                  </p>
                  <p className="mt-1 font-display text-2xl tracking-tight">
                    Like a new teammate
                  </p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl border-2 border-[color:var(--stroke)] bg-white/70">
                  <span className="font-display text-2xl">+</span>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {[
                  {
                    k: "Core concepts",
                    v: "What it can do, in plain terms",
                    c: "var(--accent2)",
                    href: "/docs/core-concepts",
                  },
                  {
                    k: "Agents",
                    v: "A helpful worker with a plan",
                    c: "var(--accent)",
                    href: "/docs/agents",
                  },
                  {
                    k: "Tools",
                    v: "Give it gear so it can check reality",
                    c: "var(--accent3)",
                    href: "/docs/tools",
                  },
                ].map((row) => (
                  <Link
                    key={row.k}
                    href={row.href}
                    className="sticker-pop group flex items-center justify-between gap-4 rounded-2xl border-2 border-[color:var(--stroke)] bg-white/70 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-[color:var(--stroke)]"
                        style={{ background: row.c }}
                      />
                      <div>
                        <p className="text-sm font-bold">{row.k}</p>
                        <p className="text-sm text-[color:var(--muted)]">
                          {row.v}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[color:var(--muted)] transition group-hover:text-[color:var(--ink)]">
                      Open
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute -right-10 -top-8 h-24 w-24 rounded-full bg-[color:var(--accent3)] opacity-20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-[color:var(--accent2)] opacity-20 blur-2xl" />
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Non-technical first",
              body: "Every page starts with the story: what you are trying to do, what you are giving the system access to, and what “good” looks like.",
            },
            {
              title: "Guardrails included",
              body: "We talk about approvals, limits, and the stuff that prevents “oops.” Safety is part of the recipe, not a footnote.",
            },
            {
              title: "Builder notes (optional)",
              body: "If you do write code, expand the builder notes. If you do not, ignore them and keep moving.",
            },
          ].map((card, i) => (
            <div
              key={card.title}
              className="anim-rise sticker-pop sticker-soft p-6"
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              <p className="font-display text-xl tracking-tight">
                {card.title}
              </p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {card.body}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
