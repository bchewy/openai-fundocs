"use client";

import { useMemo, useState } from "react";

const ROLES = [
  {
    id: "helper",
    label: "Helpful guide",
    promise: "Explains in plain language and asks clarifying questions early.",
  },
  {
    id: "operator",
    label: "Operations buddy",
    promise: "Turns requests into checklists and never hides uncertainty.",
  },
  {
    id: "analyst",
    label: "Calm analyst",
    promise: "States assumptions, shows the tradeoffs, and stays measured.",
  },
  {
    id: "coach",
    label: "Coach (supportive)",
    promise: "Encouraging tone, but still direct about next steps and risks.",
  },
] as const;

const SAFETY = [
  { id: "ask_first", label: "Ask before doing risky actions", stamp: "ASK FIRST" },
  { id: "cite_sources", label: "Show sources when searching", stamp: "CITE IT" },
  { id: "stay_in_scope", label: "Stay in scope (no side quests)", stamp: "IN SCOPE" },
  { id: "no_secrets", label: "Never reveal secrets or credentials", stamp: "NO SECRETS" },
] as const;

export function AgentBriefBuilder() {
  const [role, setRole] = useState<(typeof ROLES)[number]["id"]>("helper");
  const [goal, setGoal] = useState("Answer customer questions using our docs.");
  const [tone, setTone] = useState("Friendly, concise, never snarky.");
  const [safety, setSafety] = useState<Record<string, boolean>>({
    ask_first: true,
    cite_sources: true,
    stay_in_scope: true,
    no_secrets: true,
  });

  const selectedSafety = useMemo(
    () => SAFETY.filter((s) => safety[s.id]),
    [safety]
  );

  const brief = useMemo(() => {
    const roleLabel =
      ROLES.find((r) => r.id === role)?.label ?? "Helpful guide";
    const safetyLines = selectedSafety.map((s) => `- ${s.label}`);

    return [
      `Role: ${roleLabel}`,
      `Goal: ${goal}`,
      `Tone: ${tone}`,
      ``,
      `Safety rules:`,
      ...(safetyLines.length ? safetyLines : ["- (none selected)"]),
    ].join("\n");
  }, [goal, role, selectedSafety, tone]);

  const briefMd = useMemo(() => {
    const roleLabel =
      ROLES.find((r) => r.id === role)?.label ?? "Helpful guide";
    const safetyLines = selectedSafety.map((s) => `- ${s.label}`);
    return [
      `**Role:** ${roleLabel}`,
      `**Goal:** ${goal}`,
      `**Tone:** ${tone}`,
      ``,
      `**Safety rules:**`,
      ...(safetyLines.length ? safetyLines : ["- (none selected)"]),
    ].join("\n");
  }, [goal, role, selectedSafety, tone]);

  const goalLooksVague =
    goal.trim().length < 12 || goal.toLowerCase().includes("anything");

  return (
    <div className="my-6 sticker-soft p-5">
      <p className="font-display text-lg font-bold tracking-tight text-[color:var(--ink-strong)]">
        Make an agent brief
      </p>
      <p className="mt-1 text-sm text-[color:var(--muted)]">
        A one-page &ldquo;how to behave&rdquo; note that both humans and machines can follow.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr]">
        <div className="grid gap-3">
          <fieldset className="grid gap-2">
            <legend className="text-sm font-semibold text-[color:var(--ink)]">Role</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {ROLES.map((r) => {
                const active = role === r.id;
                return (
                  <label
                    key={r.id}
                    className="sticker-pop cursor-pointer rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] p-3.5"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.id}
                      className="sr-only"
                      checked={active}
                      onChange={() => setRole(r.id)}
                    />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[color:var(--ink)]">
                          {r.label}
                        </p>
                        <p className="mt-1 text-xs text-[color:var(--muted)]">
                          {r.promise}
                        </p>
                      </div>
                      <span
                        className="mt-0.5 h-3 w-3 shrink-0 rounded-full border-2"
                        style={{
                          borderColor: active ? "var(--accent)" : "var(--stroke)",
                          background: active ? "var(--accent)" : "transparent",
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <label className="grid gap-1">
            <span className="text-sm font-semibold text-[color:var(--ink)]">Goal</span>
            <input
              className="rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card)] px-4 py-2.5 text-sm text-[color:var(--ink)] outline-none placeholder:text-[color:var(--muted)]"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-semibold text-[color:var(--ink)]">Tone</span>
            <input
              className="rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card)] px-4 py-2.5 text-sm text-[color:var(--ink)] outline-none placeholder:text-[color:var(--muted)]"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            />
          </label>

          <div className="grid gap-2">
            <span className="text-sm font-semibold text-[color:var(--ink)]">Safety</span>
            {SAFETY.map((s) => (
              <label
                key={s.id}
                className="sticker-pop flex cursor-pointer items-center gap-3 rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-4 py-2.5 text-sm"
              >
                <input
                  type="checkbox"
                  className="accent-[color:var(--accent)]"
                  checked={Boolean(safety[s.id])}
                  onChange={(e) =>
                    setSafety((p) => ({ ...p, [s.id]: e.target.checked }))
                  }
                />
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[color:var(--accent3)]">
                    {s.stamp}
                  </span>
                  <span className="block text-sm text-[color:var(--muted)]">
                    {s.label}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="sticker p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
              Brief preview
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="sticker-pop rounded-lg border border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--ink)]"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(brief);
                  } catch {
                    // Ignore.
                  }
                }}
              >
                Copy text
              </button>
              <button
                type="button"
                className="sticker-pop rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-3.5 py-1.5 text-xs font-semibold text-[color:var(--muted)]"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(briefMd);
                  } catch {
                    // Ignore.
                  }
                }}
              >
                Copy markdown
              </button>
            </div>
          </div>

          {goalLooksVague ? (
            <p className="mt-3 text-sm font-semibold text-[#f59e0b]">
              Quick check: your goal is a bit vague. Narrow it to one job if you can.
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedSafety.map((s) => (
              <span
                key={s.id}
                className="inline-flex items-center rounded-md border border-[color:var(--accent3)]/30 bg-[color:var(--accent3)]/10 px-2.5 py-1 text-xs font-bold text-[color:var(--accent3)]"
              >
                {s.stamp}
              </span>
            ))}
          </div>

          <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] p-3 text-sm leading-6 text-[color:var(--ink)]">
            <code>{brief}</code>
          </pre>
          <p className="mt-3 text-xs text-[color:var(--muted)]">
            Good agents are boring on purpose: clear scope, clear limits.
          </p>
        </div>
      </div>
    </div>
  );
}
