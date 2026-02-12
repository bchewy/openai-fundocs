import { clsx } from "clsx";

type CalloutKind = "note" | "tip" | "warn" | "myth";

const KIND_STYLES: Record<
  CalloutKind,
  { label: string; dot: string; tape: string }
> = {
  note: {
    label: "Note",
    dot: "bg-[color:var(--accent2)]",
    tape: "bg-[color:var(--accent2)]",
  },
  tip: {
    label: "Tip",
    dot: "bg-[color:var(--accent3)]",
    tape: "bg-[color:var(--accent3)]",
  },
  warn: {
    label: "Watch out",
    dot: "bg-[color:var(--accent)]",
    tape: "bg-[color:var(--accent)]",
  },
  myth: {
    label: "Myth check",
    dot: "bg-[color:var(--accent4)]",
    tape: "bg-[color:var(--accent4)]",
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
        "my-6 relative sticker-soft px-5 py-4"
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "absolute -top-3 left-6 h-6 w-28 rotate-[-2deg] rounded-xl border-2 border-[color:var(--stroke)] opacity-90",
          k.tape
        )}
      />
      <div className="flex items-center gap-2">
        <span
          className={clsx(
            "h-2.5 w-2.5 rounded-full border border-[color:var(--stroke)]",
            k.dot
          )}
        />
        <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--muted)]">
          {title ?? k.label}
        </p>
      </div>
      <div className="mdx mt-2 text-[0.98rem]">{children}</div>
    </aside>
  );
}
