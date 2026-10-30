import { cn } from "../../lib/cn.ts";
import { useEffect, useState } from "react";
import { useBranch } from "../../lib/store.tsx";
import { BranchSwitcher } from "../ui/BranchSwitcher.tsx";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function AdminTopBar() {
  const { branch, set } = useBranch();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now
    .toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Africa/Lagos",
    })
    .replace(",", "")
    .trim();

  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Africa/Lagos",
  });

  return (
    <header
      className={cn(
        "flex items-center gap-4",
        "px-6 lg:px-8 py-3",
        "bg-panel border-b border-bone/8",
      )}
    >
      {/* Title */}
      <div className={cn("flex flex-col min-w-0")}>
        <span className={cn("text-lg font-bold tracking-tight text-bone leading-tight")}>
          {greeting()}, Front Desk
        </span>
        <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/40")}>
          {dateStr}
        </span>
      </div>

      {/* Branch switcher — centred */}
      <div className={cn("flex-1 flex justify-center")}>
        <BranchSwitcher value={branch} onChange={set} size="sm" />
      </div>

      {/* Right: live dot + clock */}
      <div className={cn("flex items-center gap-3 shrink-0")}>
        <span className={cn("inline-flex items-center gap-1.5")} title="Live">
          <span className={cn("inline-block h-2 w-2 rounded-full animate-pulse-dot bg-em-red")} />
          <span className={cn("font-mono text-2xs uppercase tracking-wider text-em-red/50")}>LIVE</span>
        </span>
        <span
          className={cn("font-mono text-sm tracking-[0.1em] tabular-nums text-bone")}
          suppressHydrationWarning
        >
          {timeStr}
        </span>
      </div>
    </header>
  );
}