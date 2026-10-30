import { cn } from "../../lib/cn.ts";
import { gymClasses } from "../../data/classes.ts";
import { BRANCH_COLORS } from "../../data/branches.ts";

export function ClassSchedule() {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = weekDays[Math.max(0, new Date().getDay() - 1)];
  const startIdx = weekDays.indexOf(today);
  const upcoming = [...gymClasses].filter(c => weekDays.indexOf(c.day) >= startIdx).slice(0, 4);

  return (
    <div className={cn("overflow-hidden rounded-sm border border-bone/10 bg-panel/80")}>
      <div className={cn("flex items-center justify-between border-b border-bone/8 px-4 py-4 sm:px-5")}>
        <div>
          <span className={cn("block font-mono text-[9px] uppercase tracking-[0.18em] text-em-blue/90")}>Make your next move</span>
          <span className={cn("mt-1 block text-base font-bold tracking-tight text-bone")}>Upcoming classes</span>
        </div>
        <span className={cn("rounded-full border border-bone/10 bg-ink/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted/55")}>{upcoming.length} available</span>
      </div>
      <div className={cn("flex flex-col p-2 sm:p-3")}>
        {upcoming.map((c) => (
          <div key={c.id} className={cn("flex items-center gap-3 rounded-sm border-b border-bone/[0.04] px-3 py-3 transition-colors last:border-b-0 hover:bg-bone/[0.03]")}>
            <span className={cn("h-8 w-1 shrink-0 rounded-full")} style={{ backgroundColor: BRANCH_COLORS[c.branchId] }} />
            <span className={cn("w-12 shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-muted/50")}>{c.day.slice(0, 3)}</span>
            <span className={cn("shrink-0 font-mono text-[9px] tabular-nums text-bone/55")}>{c.time}</span>
            <span className={cn("min-w-0 flex-1 truncate text-sm font-semibold text-bone")}>{c.name}</span>
            <span className={cn("shrink-0 font-mono text-[9px] tabular-nums", c.booked >= c.capacity ? "text-em-red" : "text-muted/45")}>{c.booked}/{c.capacity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}