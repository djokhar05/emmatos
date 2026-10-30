import { cn } from "../../lib/cn.ts";
import { useBranch } from "../../lib/store.tsx";
import { WEEK_DAYS, weeklyRevenue } from "../../data/revenue.ts";
import { BRANCH_COLORS } from "../../data/branches.ts";
import type { BranchId } from "../../data/branches.ts";
import { useState } from "react";

const GRID_LINES = 4;
const BAR_H = 180;

export function RevenueChart() {
  const { branch } = useBranch();
  const [tooltip, setTooltip] = useState<{ day: string; total: number; x: number } | null>(null);
  const branches: BranchId[] = ["alagbado", "ipaja", "isashi"];

  const chartData = WEEK_DAYS.map((day, i) => {
    const byBranch = {} as Record<BranchId, number>;
    branches.forEach((b) => { byBranch[b] = weeklyRevenue[b][i]; });
    const total = branches.reduce((s, b) => s + byBranch[b], 0);
    return { day, total, byBranch };
  });

  const maxVal = Math.max(...chartData.map((d) =>
    branch === "all" ? d.total : d.byBranch[branch as BranchId] ?? 0
  ));

  const gridStep = maxVal / GRID_LINES;

  function fmt(v: number) {
    return v >= 1_000_000 ? `₦${(v / 1_000_000).toFixed(1)}M` : `₦${(v / 1_000).toFixed(0)}K`;
  }

  return (
    <div className={cn("rounded-sm border border-bone/10 bg-panel p-4 lg:p-5")}
      style={{
        animation: "enter-slide-up 800ms cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <div className={cn("flex items-center justify-between mb-4")}>
        <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50")}>
          Revenue &mdash; This week
        </span>
        <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/30")}>
          {fmt(chartData.reduce((s, d) => s + (branch === "all" ? d.total : d.byBranch[branch as BranchId] ?? 0), 0))} total
        </span>
      </div>

      {/* Chart area */}
      <div className={cn("relative")} style={{ height: BAR_H + 24 }}>
        {/* Grid lines */}
        {Array.from({ length: GRID_LINES + 1 }, (_, i) => {
          const y = (BAR_H / GRID_LINES) * i;
          const val = maxVal - gridStep * i;
          return (
            <div
              key={i}
              className={cn("absolute left-0 right-0 flex items-center gap-2")}
              style={{ top: y }}
            >
              <span className={cn("font-mono text-2xs text-muted/25 w-12 text-right shrink-0")}>
                {i === GRID_LINES ? "₦0" : fmt(val)}
              </span>
              <span className={cn("flex-1 border-t border-bone/[0.06]")} />
            </div>
          );
        })}

        {/* Bars */}
        <div className={cn("absolute inset-0 flex items-end gap-1.5 lg:gap-2 pl-14")}>
          {chartData.map((d, i) => {
            const val = branch === "all" ? d.total : d.byBranch[branch as BranchId] ?? 0;
            const pct = maxVal > 0 ? val / maxVal : 0;
            const h = Math.max(pct * BAR_H, 3);

            return (
              <div
                key={i}
                className={cn("relative flex flex-col flex-1 group cursor-default")}
                style={{ height: BAR_H }}
                onMouseEnter={(e) => setTooltip({ day: d.day, total: val, x: e.currentTarget.getBoundingClientRect().left })}
                onMouseLeave={() => setTooltip(null)}
              >
                {/* Bar */}
                <div
                  className={cn("absolute bottom-0 w-full rounded-t-[2px] transition-all duration-300")}
                  style={{ height: h }}
                >
                  {branch === "all" ? (
                    <div className={cn("flex flex-col-reverse w-full h-full rounded-t-[2px] overflow-hidden")}>
                      {branches.map((b) => {
                        const segH = maxVal > 0 ? (d.byBranch[b] / maxVal) * BAR_H : 0;
                        return segH > 0 ? (
                          <span
                            key={b}
                            className={cn("block w-full shrink-0 group-hover:opacity-100 opacity-70 transition-opacity")}
                            style={{ height: segH, backgroundColor: BRANCH_COLORS[b] }}
                          />
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <span
                      className={cn("block w-full h-full rounded-t-[2px] opacity-70 group-hover:opacity-100 transition-opacity")}
                      style={{ backgroundColor: BRANCH_COLORS[branch as BranchId] }}
                    />
                  )}
                </div>

                {/* Day label */}
                <span
                  className={cn(
                    "absolute -bottom-6 left-0 right-0 font-mono text-2xs uppercase tracking-wider text-muted/40 text-center",
                    "group-hover:text-bone/60 transition-colors",
                  )}
                >
                  {d.day.slice(0, 2)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className={cn(
              "absolute -top-8 left-14 pointer-events-none",
              "bg-ink border border-bone/15 rounded-sm px-2.5 py-1.5",
              "font-mono text-2xs tracking-wider text-bone whitespace-nowrap",
            )}
          >
            <span className={cn("text-muted/50")}>{tooltip.day} · </span>
            {fmt(tooltip.total)}
          </div>
        )}
      </div>

      {/* Legend (all-branch view) */}
      {branch === "all" && (
        <div className={cn("flex items-center gap-4 mt-6 pt-3 border-t border-bone/[0.06]")}>
          {branches.map((b) => (
            <span key={b} className={cn("inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-muted/50")}>
              <span className={cn("h-2 w-2 rounded-full")} style={{ backgroundColor: BRANCH_COLORS[b] }} />
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}