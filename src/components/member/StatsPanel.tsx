import { cn } from "../../lib/cn.ts";
import { useCountUp } from "../../lib/useCountUp.ts";

function StatTile({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  const display = useCountUp(value, true, 1200);
  return (
    <div className={cn("group relative overflow-hidden rounded-sm border border-bone/10 bg-panel/80 px-4 py-4 text-left transition-colors hover:border-em-yellow/25 sm:px-5")}>
      <span className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-em-yellow/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100")} />
      <span className={cn("font-mono font-bold tracking-tight tabular-nums text-[clamp(1.6rem,4vw,2.5rem)] text-bone")}>
        {Math.floor(display).toLocaleString()}{suffix ?? ""}
      </span>
      <span className={cn("mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted/55 sm:text-[10px]")}>{label}</span>
    </div>
  );
}

export function StatsPanel({ checkInsMonth, daysSinceJoining }: { checkInsMonth: number; daysSinceJoining: number }) {
  const weeklyAverage = Math.round(checkInsMonth / 4.3);
  return (
    <div className={cn("grid grid-cols-3 gap-2.5 sm:gap-4")}>
      <StatTile label="Check-ins / mo" value={checkInsMonth} />
      <StatTile label="Avg. sessions / wk" value={weeklyAverage} />
      <StatTile label="Days as member" value={daysSinceJoining} />
    </div>
  );
}