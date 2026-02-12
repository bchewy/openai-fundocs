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
      return "var(--accent)";
    case "tools":
      return "var(--accent3)";
  }
}

function sectionChipColor(key: DocSection["key"]) {
  switch (key) {
    case "core-concepts":
      return "var(--accent2)";
    case "agents":
      return "var(--accent)";
    case "tools":
      return "var(--accent4)";
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
    // Focus the close button for keyboard users.
    mobileCloseRef.current?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    // Focus the search input reliably (autoFocus can be flaky in modals).
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
    // Restore focus to whatever opened the drawer/modal.
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
      <a href="#main-content" className="skip-link sticker-soft px-4 py-2 text-sm font-bold">
        Skip to content
      </a>

      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 pb-3 pt-4 sm:px-6">
          <div className="sticker-soft flex items-center gap-3 px-4 py-3 backdrop-blur">
          <button
            type="button"
            className="sticker-pop inline-flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-[color:var(--stroke)] bg-[color:var(--card-strong)] text-sm font-bold md:hidden"
            onClick={openMobile}
            aria-label="Open navigation"
          >
            ≡
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl border-2 border-[color:var(--stroke)] bg-[color:var(--accent)] text-white shadow-[var(--shadow-soft)]">
              <span className="font-display text-lg leading-none">F</span>
            </span>
            <span className="font-display text-lg tracking-tight">Fundocs</span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Sections">
            {DOC_SECTIONS.map((s) => (
              <Link
                key={s.key}
                href={`/docs/${s.key}`}
                className="sticker-pop inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-3 py-1.5 text-xs font-bold"
              >
                <span
                  className="h-2 w-2 rounded-full border border-[color:var(--stroke)]"
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
            className="sticker-pop hidden items-center gap-3 rounded-full border-2 border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-4 py-2 text-sm text-[color:var(--muted)] md:inline-flex"
            onClick={openSearch}
          >
            <span className="font-bold text-[color:var(--ink)]">Search</span>
            <span className="rounded-full border border-[color:var(--stroke-soft)] bg-white/70 px-2 py-0.5 text-xs">
              Cmd K
            </span>
          </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 md:grid-cols-[320px_1fr]">
        <aside className="hidden md:block">
          <nav aria-label="Documentation" className="sticker-soft sticky top-[92px] grid gap-5 p-4">
            {DOC_SECTIONS.map((s) => (
              <div key={s.key} className="grid gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg tracking-tight">
                    {s.title}
                  </p>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: sectionColor(s.key) }}
                    aria-hidden="true"
                  />
                </div>

                <ul className="relative grid gap-1 pl-6">
                  <span
                    className="route-line pointer-events-none absolute left-[10px] top-2 h-[calc(100%-16px)] w-[2px] opacity-30"
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
                              "sticker-pop group flex items-start gap-3 rounded-2xl border px-3 py-2 text-sm transition",
                              isActive
                                ? "border-2 border-[color:var(--stroke)] bg-[color:var(--card-strong)] font-bold text-[color:var(--ink)] shadow-[var(--shadow-soft)]"
                                : "border-[color:var(--stroke-soft)] bg-white/55 text-[color:var(--muted)] hover:bg-white/70 hover:text-[color:var(--ink)]",
                              opts?.subtle && "opacity-95",
                              opts?.isIndex && "bg-white/60"
                            )}
                          >
                            <span
                              className={clsx(
                                "mt-[0.28rem] h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[color:var(--stroke)]",
                                isActive && "scale-110"
                              )}
                              style={{ background: marker }}
                              aria-hidden="true"
                            />
                            <span className="min-w-0">{p.title}</span>
                          </Link>
                        </li>
                      );
                    };

                    return (
                      <>
                        {index ? (
                          <>
                            {renderLink(index, { isIndex: true })}
                            <li className="my-3 border-t border-[color:var(--stroke-soft)]" />
                          </>
                        ) : null}

                        {ungrouped.map((p) => renderLink(p, { subtle: true }))}

                        {groupOrder.map((g) => (
                          <li key={g} className="mt-2">
                            <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wide text-[color:var(--muted)]">
                              {g}
                            </p>
                            <ul className="grid gap-1">
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

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          onClick={closeMobile}
        >
          <div
            className="h-full w-[92%] max-w-[380px] border-r-2 border-[color:var(--stroke)] bg-[color:var(--bg0)] p-5 shadow-[var(--shadow)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p id="mobile-nav-title" className="font-display text-xl tracking-tight">
                Navigate
              </p>
              <button
                type="button"
                ref={mobileCloseRef}
                className="sticker-pop rounded-2xl border-2 border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-3 py-2 text-sm font-bold"
                onClick={closeMobile}
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid gap-5 overflow-auto pb-10">
              {DOC_SECTIONS.map((s) => (
                <div key={s.key} className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg tracking-tight">
                      {s.title}
                    </p>
                    <span
                      className="h-2.5 w-2.5 rounded-full"
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
                          className="sticker-pop block rounded-2xl border-2 border-[color:var(--stroke)] bg-white/60 px-3 py-2 text-sm"
                          onClick={closeMobile}
                        >
                          <span className="block font-bold">{p.title}</span>
                          <span className="block text-[color:var(--muted)]">
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

      {searchOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-title"
          onClick={closeSearch}
        >
          <div
            className="mx-auto mt-16 w-[92%] max-w-2xl rounded-[calc(var(--radius)+12px)] border-2 border-[color:var(--stroke)] bg-[color:var(--bg0)] p-5 shadow-[var(--shadow)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <p id="search-title" className="font-display text-xl tracking-tight">
                Search
              </p>
              <button
                type="button"
                className="sticker-pop rounded-2xl border-2 border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-3 py-2 text-sm font-bold"
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
                placeholder="Try: tools, agent builder, structured output…"
                className="w-full rounded-2xl border-2 border-[color:var(--stroke)] bg-white/80 px-4 py-3 text-sm outline-none"
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
              <div className="mt-4 grid gap-2">
                {results.map((p, idx) => (
                  <Link
                    key={p.slug}
                    href={pageHref(p)}
                    className={clsx(
                      "sticker-pop rounded-2xl border-2 bg-white/70 px-4 py-3",
                      idx === activeIndex
                        ? "border-[color:var(--stroke)]"
                        : "border-[color:var(--stroke-soft)]"
                    )}
                    onClick={() => {
                      closeSearch();
                    }}
                  >
                    <p className="text-sm font-bold">{p.title}</p>
                    <p className="text-sm text-[color:var(--muted)]">
                      {p.description}
                    </p>
                  </Link>
                ))}
                {results.length === 0 ? (
                  <p className="text-sm text-[color:var(--muted)]">
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
