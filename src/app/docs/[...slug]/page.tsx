import { notFound } from "next/navigation";
import Link from "next/link";
import { DOC_PAGES, DOC_SECTIONS, getDocPageBySlug } from "@/lib/docs";
import { loadMdxFromFile } from "@/lib/mdx";

function sectionAccent(key: string) {
  switch (key) {
    case "core-concepts":
      return "var(--accent2)";
    case "agents":
      return "var(--accent4)";
    case "tools":
      return "var(--accent3)";
    default:
      return "var(--accent)";
  }
}

export async function generateStaticParams() {
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
          <Link href="/docs" className="transition-colors hover:text-[color:var(--ink)]">
            Docs
          </Link>
          <span aria-hidden="true" className="opacity-40">/</span>
          <Link
            href={`/docs/${page.section}`}
            className="transition-colors hover:text-[color:var(--ink)]"
          >
            {section?.title ?? page.section}
          </Link>
          {page.group ? (
            <>
              <span aria-hidden="true" className="opacity-40">/</span>
              <span>{page.group}</span>
            </>
          ) : null}
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-md border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-2.5 py-1 text-xs font-semibold text-[color:var(--ink)]">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: accent }}
              aria-hidden="true"
            />
            {section?.title ?? page.section}
          </span>
          <span className="inline-flex items-center rounded-md border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-2.5 py-1 text-xs font-medium text-[color:var(--muted)]">
            {Math.max(idx, 0) + 1} / {sectionPages.length}
          </span>
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[color:var(--ink-strong)]">
          {page.title}
        </h1>
        <p className="mt-3 max-w-3xl text-[color:var(--muted)]">
          {page.description}
        </p>
      </div>

      <div className="mt-5 sticker-soft p-7">
        <div className="mdx">{mdx.content}</div>
      </div>

      <nav
        aria-label="Page navigation"
        className="mt-5 grid gap-3 md:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="sticker-pop sticker-soft block p-5"
          >
            <p className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--muted)]">
              Previous
            </p>
            <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-[color:var(--ink-strong)]">
              {prev.title}
            </p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
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
            <p className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--muted)]">
              Next
            </p>
            <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-[color:var(--ink-strong)]">
              {next.title}
            </p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
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
