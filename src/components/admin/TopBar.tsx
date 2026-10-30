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
        "flex flex-wrap items-center gap-x-3 gap-y-2 px-1 py-2 sm:px-2 lg:flex-nowrap lg:gap-4 lg:px-8 lg:py-3",
        "bg-panel border-b border-bone/8",
      )}
    >
      {/* Title */}
      <div className={cn("order-1 flex min-w-0 flex-col lg:order-1")}>
        <span className={cn("text-base font-bold tracking-tight text-bone leading-tight sm:text-lg")}>
          {greeting()}, Front Desk
        </span>
        <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/40")}>
          {dateStr}
        </span>
      </div>

      {/* Branch switcher — centred */}
      <div className={cn("order-3 w-full overflow-x-auto lg:order-2 lg:flex-1 lg:w-auto lg:overflow-visible")}>
        <BranchSwitcher
          value={branch}
          onChange={set}
          size="sm"
          className="[&>button]:gap-0.5 [&>button]:px-1 [&>button]:tracking-[0.08em] sm:[&>button]:gap-2 sm:[&>button]:px-2.5 sm:[&>button]:tracking-[0.2em]"
        />
      </div>

      {/* Right: live dot + clock */}
      <div className={cn("order-2 ml-auto flex shrink-0 items-center gap-2 sm:gap-3 lg:order-3")}>
        <span className={cn("inline-flex items-center gap-1.5")} title="Live">
          <span className={cn("inline-block h-2 w-2 rounded-full animate-pulse-dot bg-em-red")} />
          <span className={cn("hidden font-mono text-2xs uppercase tracking-wider text-em-red/50 sm:inline")}>LIVE</span>
        </span>
        <span
          className={cn("font-mono text-xs tracking-[0.04em] tabular-nums text-bone sm:text-sm sm:tracking-[0.1em]")}
          suppressHydrationWarning
        >
          {timeStr}
        </span>
      </div>
    </header>
  );
}