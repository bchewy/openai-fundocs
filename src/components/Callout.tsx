import { clsx } from "clsx";

type CalloutKind = "note" | "tip" | "warn" | "myth";

const KIND_STYLES: Record<
  CalloutKind,
  { label: string; color: string }
> = {
  note: {
    label: "Note",
    color: "var(--accent)",
  },
  tip: {
    label: "Tip",
    color: "var(--accent3)",
  },
  warn: {
    label: "Watch out",
    color: "#f59e0b",
  },
  myth: {
    label: "Myth check",
    color: "var(--accent4)",
  },
};

export function Callout({
  kind = "note",
  title,
  children,
}: {
  kind?: CalloutKind;
  title?: string;
  children: React.ReactNode;
}) {
  const k = KIND_STYLES[kind];
  return (
    <aside
      className={clsx(
        "my-6 relative rounded-lg border border-[color:var(--stroke-soft)] bg-[color:var(--card)] px-5 py-4"
      )}
      style={{ borderLeftWidth: 3, borderLeftColor: k.color }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: k.color }}
        />
        <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
          {title ?? k.label}
        </p>
      </div>
      <div className="mdx mt-2 text-[0.98rem]">{children}</div>
    </aside>
  );
}
