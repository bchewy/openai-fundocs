"use client";

import { useMemo, useState } from "react";

const OPTIONS = [
  {
    id: "context",
    label: "A little context",
    help: "What’s going on and what matters.",
    color: "var(--accent2)",
    title: "Context",
    sample:
      "We’re launching a new feature next week. It must feel calm and confident.",
  },
  {
    id: "goal",
    label: "A clear goal",
    help: "What you want the assistant to produce.",
    color: "var(--accent)",
    title: "Task",
    sample: "Write a short announcement email for customers.",
  },
  {
    id: "constraints",
    label: "A few boundaries",
    help: "Tone, format, length, or “don’t do X.”",
    color: "var(--accent3)",
    title: "Rules",
    sample: "Keep it under 140 words. No hype. Include one clear call to action.",
  },
  {
    id: "examples",
    label: "One example",
    help: "A sample you like (or hate).",
    color: "var(--accent4)",
    title: "Example vibe",
    sample: "“Helpful product update,” not “press release.”",
  },
] as const;

function PreviewBlock({
  title,
  color,
  text,
  active,
}: {
  title: string;
  color: string;
  text: string;
  active: boolean;
}) {
  return (
    <div
      className="rounded-[calc(var(--radius)+10px)] border-2 bg-white/75 p-4"
      style={{
        borderColor: active
          ? "var(--stroke)"
          : "color-mix(in oklab, var(--stroke), white 55%)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--muted)]">
          {title}
        </p>
        <span
          className="h-2.5 w-2.5 rounded-full border border-[color:var(--stroke)]"
          style={{ background: color }}
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 text-sm leading-6 text-[color:var(--ink)]">{text}</p>
    </div>
  );
}

export function PromptSandwich() {
  const initialPicked = useMemo(
    () => ({
      context: true,
      goal: true,
      constraints: true,
      examples: false,
    }),
    []
  );

  const [picked, setPicked] = useState<Record<string, boolean>>({
    ...initialPicked,
  });
  const [active, setActive] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const blocks = useMemo(() => {
    const b: { id: string; title: string; color: string; text: string }[] =
      OPTIONS.filter((o) => picked[o.id]).map((o) => ({
      id: o.id,
      title: o.title,
      color: o.color,
      text: o.sample,
    }));
    b.push({
      id: "output",
      title: "Output format",
      color: "var(--stroke)",
      text: "Subject line + email body.",
    });
    return b;
  }, [picked]);

  const prompt = useMemo(() => {
    return blocks
      .map((b) => `${b.title}: ${b.text}`)
      .join("\n")
      .trim();
  }, [blocks]);

  return (
    <div className="my-6 sticker-soft p-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
        <p className="font-display text-xl tracking-tight">
          Build a prompt sandwich
        </p>
        <p className="text-sm text-[color:var(--muted)]">
          Pick the ingredients. The “prompt” updates live.
        </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="sticker-pop rounded-full border-2 border-[color:var(--stroke)] bg-white/75 px-4 py-2 text-xs font-bold"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(prompt);
                setCopied(true);
                setTimeout(() => setCopied(false), 900);
              } catch {
                // Ignore; clipboard might be blocked.
              }
            }}
          >
            {copied ? "Copied" : "Copy prompt"}
          </button>
          <button
            type="button"
            className="sticker-pop rounded-full border-2 border-[color:var(--stroke)] bg-[color:var(--card-strong)] px-4 py-2 text-xs font-bold"
            onClick={() => setPicked({ ...initialPicked })}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.3fr]">
        <div className="grid gap-2">
          {OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className="sticker-pop flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-[color:var(--stroke)] bg-white/70 px-4 py-3"
              onMouseEnter={() => setActive(opt.id)}
              onMouseLeave={() => setActive(null)}
            >
              <input
                type="checkbox"
                className="mt-1"
                checked={Boolean(picked[opt.id])}
                onChange={(e) =>
                  setPicked((p) => ({ ...p, [opt.id]: e.target.checked }))
                }
                onFocus={() => setActive(opt.id)}
                onBlur={() => setActive(null)}
              />
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-bold text-[color:var(--ink)]">
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-[color:var(--stroke)]"
                    style={{ background: opt.color }}
                    aria-hidden="true"
                  />
                  {opt.label}
                </span>
                <span className="block text-sm text-[color:var(--muted)]">
                  {opt.help}
                </span>
              </span>
            </label>
          ))}
        </div>

        <div className="sticker p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-[color:var(--muted)]">
              Your prompt (as a checklist)
            </p>
            <span className="rounded-full border-2 border-[color:var(--stroke)] bg-white/70 px-2 py-0.5 text-xs font-bold text-[color:var(--muted)]">
              {blocks.length} parts
            </span>
          </div>

          <div className="mt-3 grid gap-2">
            {blocks.map((b) => (
              <PreviewBlock
                key={b.id}
                title={b.title}
                color={b.color}
                text={b.text}
                active={active === b.id}
              />
            ))}
          </div>

          <details className="mt-4">
            <summary>Show as plain text</summary>
            <pre className="mt-3 whitespace-pre-wrap text-sm leading-6">
              <code>{prompt}</code>
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
}
