import { notFound } from "next/navigation";
import Link from "next/link";
import { DOC_PAGES, DOC_SECTIONS, getDocPageBySlug } from "@/lib/docs";
import { loadMdxFromFile } from "@/lib/mdx";

function sectionAccent(key: string) {
  switch (key) {
    case "core-concepts":
      return "var(--accent2)";
    case "agents":
      return "var(--accent)";
    case "tools":
      return "var(--accent3)";
    default:
      return "var(--accent4)";
  }
}

export async function generateStaticParams() {
  // Optional optimization: in dev it doesn’t matter; in prod this prebuilds pages.
  return DOC_PAGES.map((p) => ({ slug: p.slug.split("/") }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = (slugParts ?? []).join("/");

  const page = getDocPageBySlug(slug);
  if (!page) notFound();

  const section = DOC_SECTIONS.find((s) => s.key === page.section);
  const mdx = await loadMdxFromFile(page.file);
  const sectionPages = DOC_PAGES.filter((p) => p.section === page.section);
  const idx = sectionPages.findIndex((p) => p.slug === page.slug);
  const prev = idx > 0 ? sectionPages[idx - 1] : undefined;
  const next =
    idx >= 0 && idx < sectionPages.length - 1 ? sectionPages[idx + 1] : undefined;
  const accent = sectionAccent(page.section);

  return (
    <article className="anim-rise">
      <div className="sticker p-7">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]"
        >
          <Link href="/docs" className="underline underline-offset-4">
            Docs
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/docs/${page.section}`}
            className="underline underline-offset-4"
          >
            {section?.title ?? page.section}
          </Link>
          {page.group ? (
            <>
              <span aria-hidden="true">/</span>
              <span>{page.group}</span>
            </>
          ) : null}
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--stroke)] bg-white/70 px-3 py-1 text-xs font-bold text-[color:var(--ink)]">
            <span
              className="h-2 w-2 rounded-full border border-[color:var(--stroke)]"
              style={{ background: accent }}
              aria-hidden="true"
            />
            {section?.title ?? page.section}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--stroke)] bg-white/70 px-3 py-1 text-xs font-bold text-[color:var(--muted)]">
            Stop {Math.max(idx, 0) + 1} of {sectionPages.length}
          </span>
        </div>

        <h1 className="mt-3 font-display text-4xl tracking-tight">
          {page.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[color:var(--muted)]">
          {page.description}
        </p>
      </div>

      <div className="mt-6 sticker-soft p-7">
        <div className="mdx">{mdx.content}</div>
      </div>

      <nav
        aria-label="Page navigation"
        className="mt-6 grid gap-4 md:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="sticker-pop sticker-soft block p-5"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--muted)]">
              Previous stop
            </p>
            <p className="mt-1 font-display text-xl tracking-tight">
              {prev.title}
            </p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {prev.description}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="sticker-pop sticker-soft block p-5"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--muted)]">
              Next stop
            </p>
            <p className="mt-1 font-display text-xl tracking-tight">
              {next.title}
            </p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {next.description}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
