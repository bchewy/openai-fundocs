import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <Link
          href="/"
          className="sticker-pop sticker-soft inline-flex items-center gap-2.5 px-4 py-2"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[color:var(--accent)] bg-[color:var(--accent)] text-white">
            <span className="font-display text-sm font-bold leading-none">F</span>
          </span>
          <span className="font-display text-base font-bold tracking-tight text-[color:var(--ink-strong)]">
            Fundocs
          </span>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          <Link
            href="/docs"
            className="sticker-pop rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)]"
          >
            Start the tour
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        {/* Hero */}
        <section className="anim-rise">
          <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent2)]" />
            Core concepts
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent4)]" />
            Agents
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent3)]" />
            Tools
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.08] tracking-[-0.035em] text-[color:var(--ink-strong)] sm:text-7xl sm:leading-[1.05]">
            OpenAI docs{" "}
            <br className="hidden sm:block" />
            for humans who{" "}
            <span className="bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent3)] bg-clip-text text-transparent">
              have a life
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
            The same platform, explained like a guided tour. Less jargon. More
            "what happens next" and "what can go wrong." Built for teams who
            ship, not just teams who code.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/docs"
              className="sticker-pop inline-flex items-center justify-center rounded-lg bg-[color:var(--accent)] px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(59,130,246,0.25)]"
            >
              Start the tour
            </Link>
            <Link
              href="/docs/core-concepts"
              className="sticker-pop inline-flex items-center justify-center rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)]"
            >
              Jump to Core concepts
            </Link>
          </div>
        </section>

        {/* Section cards */}
        <section className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Core Concepts",
              body: "What it can do, in plain terms",
              accent: "var(--accent2)",
              href: "/docs/core-concepts",
            },
            {
              title: "Agents",
              body: "A helpful worker with a plan",
              accent: "var(--accent4)",
              href: "/docs/agents",
            },
            {
              title: "Tools",
              body: "Give it gear so it can check reality",
              accent: "var(--accent3)",
              href: "/docs/tools",
            },
          ].map((card, i) => (
            <Link
              key={card.title}
              href={card.href}
              className="anim-rise sticker-pop group sticker p-6"
              style={{ animationDelay: `${80 + i * 70}ms` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: card.accent }}
                />
                <p className="font-display text-lg font-bold tracking-tight text-[color:var(--ink-strong)]">
                  {card.title}
                </p>
              </div>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                {card.body}
              </p>
              <p className="mt-4 text-sm font-semibold text-[color:var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                Open section &rarr;
              </p>
            </Link>
          ))}
        </section>

        {/* Value props */}
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Non-technical first",
              body: "Every page starts with the story: what you're trying to do, what you're giving the system access to, and what \"good\" looks like.",
            },
            {
              title: "Guardrails included",
              body: "We talk about approvals, limits, and the stuff that prevents \"oops.\" Safety is part of the recipe, not a footnote.",
            },
            {
              title: "Builder notes optional",
              body: "If you write code, expand the builder notes. If you don't, ignore them and keep moving.",
            },
          ].map((card, i) => (
            <div
              key={card.title}
              className="anim-rise sticker-soft p-6"
              style={{ animationDelay: `${250 + i * 70}ms` }}
            >
              <p className="font-display text-base font-bold tracking-tight text-[color:var(--ink-strong)]">
                {card.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                {card.body}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
