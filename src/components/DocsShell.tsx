"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import type { DocPage, DocSection } from "@/lib/docs";
import { DOC_PAGES, DOC_SECTIONS } from "@/lib/docs";

function sectionColor(key: DocSection["key"]) {
  switch (key) {
    case "core-concepts":
      return "var(--accent2)";
    case "agents":
      return "var(--accent4)";
    case "tools":
      return "var(--accent3)";
  }
}

function sectionChipColor(key: DocSection["key"]) {
  switch (key) {
    case "core-concepts":
      return "var(--accent2)";
    case "agents":
      return "var(--accent4)";
    case "tools":
      return "var(--accent3)";
  }
}

function normalizeDocsPath(pathname: string) {
  if (!pathname.startsWith("/docs")) return "/docs";
  return pathname.replace(/\/$/, "") || "/docs";
}

function pageHref(page: DocPage) {
  return `/docs/${page.slug}`;
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const active = normalizeDocsPath(pathname);
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const mobileCloseRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const openMobile = () => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setMobileOpen(true);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const openSearch = () => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQ("");
  };

  useEffect(() => {
    if (!mobileOpen) return;
    mobileCloseRef.current?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    setTimeout(() => searchInputRef.current?.focus(), 0);
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen || searchOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    if (mobileOpen || searchOpen) return;
    lastFocusRef.current?.focus?.();
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      const isEditable =
        t?.isContentEditable ||
        tag === "input" ||
        tag === "textarea" ||
        tag === "select";

      const isMac = navigator.platform.toLowerCase().includes("mac");
      const openCombo =
        (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === "k");
      if (openCombo && !isEditable) {
        e.preventDefault();
        lastFocusRef.current = document.activeElement as HTMLElement | null;
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setMobileOpen(false);
        setSearchOpen(false);
        setQ("");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const grouped = useMemo(() => {
    const bySection: Record<string, DocPage[]> = {};
    for (const p of DOC_PAGES) {
      bySection[p.section] ||= [];
      bySection[p.section].push(p);
    }
    return bySection;
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const pool = DOC_PAGES;
    if (!query) return pool.slice(0, 12);
    const scored = pool
      .map((p) => {
        const hay = `${p.title} ${p.description} ${p.slug}`.toLowerCase();
        const score = hay.includes(query) ? 1 : 0;
        return { p, score };
      })
      .filter((x) => x.score > 0)
      .map((x) => x.p);
    return scored.slice(0, 12);
  }, [q]);

  useEffect(() => {
    setActiveIndex(0);
  }, [q]);

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link sticker-soft px-4 py-2 text-sm font-semibold">
        Skip to content
      </a>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 pb-3 pt-4 sm:px-6">
          <div className="flex items-center gap-3 rounded-xl border border-[color:var(--stroke-soft)] bg-[rgba(0,0,0,0.75)] px-4 py-3 backdrop-blur-xl">
            <button
              type="button"
              className="sticker-pop inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card-strong)] text-sm font-bold text-[color:var(--ink)] md:hidden"
              onClick={openMobile}
              aria-label="Open navigation"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 4h12M2 8h12M2 12h12" />
              </svg>
            </button>

            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--accent)] text-white">
                <span className="font-display text-sm font-bold leading-none">F</span>
              </span>
              <span className="font-display text-base font-bold tracking-tight text-[color:var(--ink-strong)]">
                Fundocs
              </span>
            </Link>

            <nav className="hidden items-center gap-1.5 md:flex" aria-label="Sections">
              {DOC_SECTIONS.map((s) => (
                <Link
                  key={s.key}
                  href={`/docs/${s.key}`}
                  className="sticker-pop inline-flex items-center gap-2 rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-3 py-1.5 text-xs font-semibold text-[color:var(--muted)] transition-colors hover:text-[color:var(--ink)]"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: sectionChipColor(s.key) }}
                    aria-hidden="true"
                  />
                  {s.title}
                </Link>
              ))}
            </nav>

            <div className="flex-1" />

            <button
              type="button"
              className="sticker-pop hidden items-center gap-3 rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-3.5 py-2 text-sm text-[color:var(--muted)] md:inline-flex"
              onClick={openSearch}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11l3 3" strokeLinecap="round" />
              </svg>
              <span className="font-semibold text-[color:var(--ink)]">Search</span>
              <kbd className="rounded-md border border-[color:var(--stroke-soft)] bg-[color:var(--card-strong)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--muted)]">
                {"\u2318"}K
              </kbd>
            </button>
          </div>
        </div>
      </header>

      {/* ── Layout ── */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-[280px_1fr]">
        {/* ── Sidebar ── */}
        <aside className="hidden md:block">
          <nav aria-label="Documentation" className="sticky top-[92px] grid gap-6 py-2">
            {DOC_SECTIONS.map((s) => (
              <div key={s.key} className="grid gap-2">
                <div className="flex items-center justify-between px-1">
                  <p className="font-display text-sm font-bold tracking-tight text-[color:var(--ink-strong)]">
                    {s.title}
                  </p>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: sectionColor(s.key) }}
                    aria-hidden="true"
                  />
                </div>

                <ul className="relative grid gap-0.5 pl-5">
                  <span
                    className="route-line pointer-events-none absolute left-[7px] top-1 h-[calc(100%-8px)] w-[1.5px] opacity-40"
                    aria-hidden="true"
                  />
                  {(() => {
                    const pages = grouped[s.key] ?? [];
                    const index = pages.find((p) => p.slug === s.key);
                    const rest = pages.filter((p) => p.slug !== s.key);

                    const groupOrder: string[] = [];
                    const byGroup = new Map<string, DocPage[]>();
                    const ungrouped: DocPage[] = [];

                    for (const p of rest) {
                      if (!p.group) {
                        ungrouped.push(p);
                        continue;
                      }
                      if (!byGroup.has(p.group)) {
                        byGroup.set(p.group, []);
                        groupOrder.push(p.group);
                      }
                      byGroup.get(p.group)!.push(p);
                    }

                    const renderLink = (
                      p: DocPage,
                      opts?: { subtle?: boolean; isIndex?: boolean }
                    ) => {
                      const href = pageHref(p);
                      const isActive = active === href;
                      const marker = sectionColor(s.key);
                      return (
                        <li key={p.slug}>
                          <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={clsx(
                              "sticker-pop group flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors",
                              isActive
                                ? "bg-[color:var(--card-strong)] font-semibold text-[color:var(--ink-strong)]"
                                : "text-[color:var(--muted)] hover:bg-[color:var(--card)] hover:text-[color:var(--ink)]",
                              opts?.subtle && "opacity-95"
                            )}
                          >
                            <span
                              className={clsx(
                                "h-1.5 w-1.5 shrink-0 rounded-full transition-transform",
                                isActive && "scale-125"
                              )}
                              style={{ background: isActive ? marker : "var(--stroke)" }}
                              aria-hidden="true"
                            />
                            <span className="min-w-0 truncate">{p.title}</span>
                          </Link>
                        </li>
                      );
                    };

                    return (
                      <>
                        {index ? (
                          <>
                            {renderLink(index, { isIndex: true })}
                            <li className="my-2 ml-3 border-t border-[color:var(--stroke-soft)]" />
                          </>
                        ) : null}

                        {ungrouped.map((p) => renderLink(p, { subtle: true }))}

                        {groupOrder.map((g) => (
                          <li key={g} className="mt-3">
                            <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[color:var(--muted)]">
                              {g}
                            </p>
                            <ul className="grid gap-0.5">
                              {(byGroup.get(g) ?? []).map((p) =>
                                renderLink(p, { subtle: true })
                              )}
                            </ul>
                          </li>
                        ))}
                      </>
                    );
                  })()}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main id="main-content" className="min-w-0">
          {children}
        </main>
      </div>

      {/* ── Mobile nav ── */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          onClick={closeMobile}
        >
          <div
            className="h-full w-[88%] max-w-[360px] border-r border-[color:var(--stroke-soft)] bg-[color:var(--bg0)] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p id="mobile-nav-title" className="font-display text-lg font-bold tracking-tight text-[color:var(--ink-strong)]">
                Navigate
              </p>
              <button
                type="button"
                ref={mobileCloseRef}
                className="sticker-pop rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-3 py-1.5 text-sm font-semibold text-[color:var(--ink)]"
                onClick={closeMobile}
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-5 overflow-auto pb-10">
              {DOC_SECTIONS.map((s) => (
                <div key={s.key} className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-sm font-bold tracking-tight text-[color:var(--ink-strong)]">
                      {s.title}
                    </p>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: sectionColor(s.key) }}
                      aria-hidden="true"
                    />
                  </div>
                  <ul className="grid gap-1">
                    {(grouped[s.key] ?? []).map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={pageHref(p)}
                          aria-current={active === pageHref(p) ? "page" : undefined}
                          className="sticker-pop block rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-3 py-2.5 text-sm"
                          onClick={closeMobile}
                        >
                          <span className="block font-semibold text-[color:var(--ink)]">{p.title}</span>
                          <span className="mt-0.5 block text-xs text-[color:var(--muted)]">
                            {p.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* ── Search modal ── */}
      {searchOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-title"
          onClick={closeSearch}
        >
          <div
            className="mx-auto mt-16 w-[92%] max-w-2xl rounded-xl border border-[color:var(--stroke)] bg-[color:var(--bg1)] p-5 shadow-[var(--shadow-hover)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <p id="search-title" className="font-display text-lg font-bold tracking-tight text-[color:var(--ink-strong)]">
                Search
              </p>
              <button
                type="button"
                className="sticker-pop rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-3 py-1.5 text-sm font-semibold text-[color:var(--ink)]"
                onClick={closeSearch}
              >
                Close
              </button>
            </div>

            <div className="mt-4">
              <input
                ref={searchInputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Try: tools, agent builder, structured output..."
                className="w-full rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card)] px-4 py-3 text-sm text-[color:var(--ink)] outline-none placeholder:text-[color:var(--muted)]"
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveIndex((i) =>
                      Math.min(i + 1, Math.max(results.length - 1, 0))
                    );
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveIndex((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") {
                    const picked = results[activeIndex];
                    if (!picked) return;
                    closeSearch();
                    router.push(pageHref(picked));
                  }
                }}
              />
              <div className="mt-3 grid gap-1.5 max-h-[50vh] overflow-y-auto">
                {results.map((p, idx) => (
                  <Link
                    key={p.slug}
                    href={pageHref(p)}
                    className={clsx(
                      "sticker-pop rounded-lg px-4 py-3 transition-colors",
                      idx === activeIndex
                        ? "bg-[color:var(--card-strong)] border border-[color:var(--accent)]/20"
                        : "border border-transparent hover:bg-[color:var(--card)]"
                    )}
                    onClick={() => {
                      closeSearch();
                    }}
                  >
                    <p className="text-sm font-semibold text-[color:var(--ink)]">{p.title}</p>
                    <p className="mt-0.5 text-xs text-[color:var(--muted)]">
                      {p.description}
                    </p>
                  </Link>
                ))}
                {results.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-[color:var(--muted)]">
                    No matches. Try fewer words.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
