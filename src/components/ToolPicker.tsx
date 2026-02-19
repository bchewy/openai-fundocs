"use client";

import { useMemo, useState } from "react";

type Need =
  | "fresh_info"
  | "my_docs"
  | "math_data"
  | "edit_files"
  | "use_terminal"
  | "click_ui";

const NEEDS: { id: Need; label: string; help: string }[] = [
  { id: "fresh_info", label: "Up-to-date info", help: "Look things up online." },
  { id: "my_docs", label: "Search our docs", help: "Find answers in our files." },
  { id: "math_data", label: "Math or data work", help: "Crunch numbers safely." },
  { id: "use_terminal", label: "Run commands", help: "Execute shell commands." },
  { id: "edit_files", label: "Edit files carefully", help: "Apply structured diffs." },
  { id: "click_ui", label: "Click around a UI", help: "Navigate websites/apps." },
];

function toolName(need: Need): string {
  switch (need) {
    case "fresh_info":
      return "Web search";
    case "my_docs":
      return "File search (+ Retrieval)";
    case "math_data":
      return "Code Interpreter";
    case "use_terminal":
      return "Shell";
    case "edit_files":
      return "Apply patch";
    case "click_ui":
      return "Computer use";
  }
}

function toolColor(tool: string) {
  if (tool.startsWith("Web search")) return "var(--accent)";
  if (tool.startsWith("File search")) return "var(--accent2)";
  if (tool.startsWith("Retrieval")) return "var(--accent2)";
  if (tool.startsWith("Code Interpreter")) return "var(--accent4)";
  if (tool.startsWith("Shell")) return "var(--accent3)";
  if (tool.startsWith("Apply patch")) return "var(--accent)";
  if (tool.startsWith("Computer use")) return "var(--accent4)";
  return "var(--stroke)";
}

function DoorMeter({ count, max = 6 }: { count: number; max?: number }) {
  const c = Math.min(count, max);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 22"
      className="h-5 w-[100px]"
    >
      {Array.from({ length: max }).map((_, i) => (
        <rect
          key={i}
          x={6 + i * 18}
          y={5}
          width={12}
          height={12}
          rx={3}
          fill={i < c ? "var(--accent)" : "transparent"}
          stroke={i < c ? "var(--accent)" : "var(--stroke)"}
          strokeWidth={1.5}
          opacity={i < c ? 1 : 0.4}
        />
      ))}
    </svg>
  );
}

function guardrailsForTools(tools: string[]) {
  const g = new Set<string>();
  for (const t of tools) {
    if (t.startsWith("Web search")) g.add("Citations");
    if (t.startsWith("File search")) g.add("Permissions");
    if (t.startsWith("Code Interpreter")) g.add("Sandboxed files");
    if (t.startsWith("Shell")) {
      g.add("Sandbox");
      g.add("Allowlist");
      g.add("Logging");
    }
    if (t.startsWith("Apply patch")) {
      g.add("Review");
      g.add("Tests");
      g.add("Change limits");
    }
    if (t.startsWith("Computer use")) {
      g.add("Approvals");
      g.add("Allowlist");
      g.add("Screenshots");
    }
  }
  return Array.from(g);
}

export function ToolPicker() {
  const initialPicked = useMemo(
    () => ({
      fresh_info: true,
      my_docs: false,
      math_data: false,
      edit_files: false,
      use_terminal: false,
      click_ui: false,
    }),
    []
  );

  const [picked, setPicked] = useState<Record<Need, boolean>>({
    ...initialPicked,
  });

  const chosen = useMemo(() => {
    const list = NEEDS.filter((n) => picked[n.id]).map((n) => toolName(n.id));
    return Array.from(new Set(list));
  }, [picked]);

  const guardrails = useMemo(() => guardrailsForTools(chosen), [chosen]);

  return (
    <div className="my-6 sticker-soft p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-display text-lg font-bold tracking-tight text-[color:var(--ink-strong)]">
            Pick the tools you actually need
          </p>
          <p className="text-sm text-[color:var(--muted)]">
            Start small. Add power only when you have a real reason.
          </p>
        </div>
        <button
          type="button"
          className="sticker-pop w-fit rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--muted)]"
          onClick={() => setPicked({ ...initialPicked })}
        >
          Minimal preset
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="grid gap-2">
          {NEEDS.map((n) => (
            <label
              key={n.id}
              className="sticker-pop flex cursor-pointer items-start gap-3 rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-4 py-3"
            >
              <input
                type="checkbox"
                className="mt-1 accent-[color:var(--accent)]"
                checked={picked[n.id]}
                onChange={(e) =>
                  setPicked((p) => ({ ...p, [n.id]: e.target.checked }))
                }
              />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-[color:var(--ink)]">{n.label}</span>
                <span className="block text-sm text-[color:var(--muted)]">
                  {n.help}
                </span>
              </span>
            </label>
          ))}
        </div>

        <div className="sticker p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
              Tool belt
            </p>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-2 py-0.5 text-xs font-semibold text-[color:var(--muted)]">
                {chosen.length} active
              </span>
              <DoorMeter count={chosen.length} />
            </div>
          </div>

          {chosen.length === 0 ? (
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Pick a need on the left.
            </p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {chosen.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-md border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-2.5 py-1 text-xs font-semibold text-[color:var(--ink)]"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: toolColor(t) }}
                    aria-hidden="true"
                  />
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[color:var(--muted)]">
              Guardrails to consider
            </p>
            {guardrails.length === 0 ? (
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Keep it simple. You may not need any tools for this use case.
              </p>
            ) : (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {guardrails.map((g) => (
                  <span
                    key={g}
                    className="inline-flex items-center rounded-md border border-[color:var(--stroke-soft)] bg-[color:var(--card-strong)] px-2.5 py-1 text-xs font-semibold text-[color:var(--muted)]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="sticker-pop rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--ink)]"
              onClick={async () => {
                const manifest = [
                  "Tools:",
                  ...chosen.map((t) => `- ${t}`),
                  "",
                  "Guardrails:",
                  ...guardrails.map((g) => `- ${g}`),
                ].join("\n");
                try {
                  await navigator.clipboard.writeText(manifest);
                } catch {
                  // Ignore.
                }
              }}
            >
              Copy manifest
            </button>
          </div>

          <p className="mt-3 text-xs text-[color:var(--muted)]">
            Every tool is a door. More doors means more safety work.
          </p>
        </div>
      </div>
    </div>
  );
}
