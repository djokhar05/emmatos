import { cn } from "../../lib/cn.ts";
import { useBranch } from "../../lib/store.tsx";
import { checkins } from "../../data/checkins.ts";
import { BRANCH_COLORS } from "../../data/branches.ts";
import { relativeTimeAgo } from "../../lib/format.ts";

const TAG_CLS: Record<string, string> = {
  "CHECK-IN":   "text-bone/40",
  "CLASS":      "text-em-yellow/80",
  "NEW MEMBER": "text-em-red font-bold",
  "RENEWAL":    "text-em-blue/80",
};

export function CheckinsFeed() {
  const { branch } = useBranch();
  const items = checkins
    .filter((c) => branch === "all" || c.branchId === branch)
    .slice(0, 22);

  return (
    <div className={cn("rounded-sm border border-bone/10 bg-panel flex flex-col")}>
      {/* Header */}
      <div className={cn("flex items-center justify-between px-4 py-3 border-b border-bone/8 shrink-0")}>
        <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50")}>
          Recent check-ins
        </span>
        <span className={cn("font-mono text-2xs tabular-nums text-muted/30")}>
          {items.length}
        </span>
      </div>

      {/* Feed */}
      <div className={cn("flex flex-col overflow-y-auto flex-1")} style={{ maxHeight: 320 }}>
        {items.map((c, i) => (
          <div
            key={c.id}
            className={cn(
              "flex items-center gap-3 px-4 py-2",
              i < items.length - 1 && "border-b border-bone/[0.04]",
              "hover:bg-bone/[0.02] transition-colors",
            )}
          >
            {/* Branch dot */}
            <span
              className={cn("inline-block h-1.5 w-1.5 rounded-full shrink-0")}
              style={{ backgroundColor: BRANCH_COLORS[c.branchId] }}
            />

            {/* Time */}
            <span className={cn("font-mono text-2xs tracking-wider text-bone/40 w-16 shrink-0")}>
              {relativeTimeAgo(c.at)}
            </span>

            {/* Name */}
            <span className={cn("text-sm text-bone flex-1 truncate")}>{c.name}</span>

            {/* Tag */}
            <span className={cn("font-mono text-2xs uppercase tracking-wider shrink-0", TAG_CLS[c.tag] ?? "text-muted/40")}>
              {c.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}