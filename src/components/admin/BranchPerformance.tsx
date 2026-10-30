import { cn } from "../../lib/cn.ts";
import { useBranch } from "../../lib/store.tsx";
import { kpis, planMix } from "../../data/revenue.ts";
import { BRANCH_COLORS, branches } from "../../data/branches.ts";
import type { BranchId } from "../../data/branches.ts";
import { nairaCompact } from "../../lib/format.ts";

const PLAN_ORDER = ["ANNUAL", "QUARTERLY", "MONTHLY", "DAY"] as const;
const PLAN_COLORS: Record<string, string> = {
  ANNUAL:    "var(--color-em-red)",
  QUARTERLY: "var(--color-em-yellow)",
  MONTHLY:   "var(--color-em-blue)",
  DAY:       "var(--color-muted)",
};

function UtilBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className={cn("h-1.5 w-full rounded-full bg-bone/8 overflow-hidden")}>
      <div
        className={cn("h-full rounded-full transition-all duration-700")}
        style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}

function PlanMixBar({ branchId }: { branchId: BranchId }) {
  const mix = planMix[branchId];
  const total = Object.values(mix).reduce((s, v) => s + v, 0);
  return (
    <div className={cn("flex h-1.5 w-full rounded-full overflow-hidden gap-px")}>
      {PLAN_ORDER.map((plan) => {
        const pct = total > 0 ? (mix[plan] / total) * 100 : 0;
        return pct > 0 ? (
          <span
            key={plan}
            title={`${plan}: ${mix[plan]}`}
            className={cn("h-full")}
            style={{ width: `${pct}%`, backgroundColor: PLAN_COLORS[plan] }}
          />
        ) : null;
      })}
    </div>
  );
}

export function BranchPerformance() {
  const { branch } = useBranch();
  const visibleBranches = (branch === "all"
    ? branches
    : branches.filter((b) => b.id === branch)) as typeof branches;

  return (
    <div className={cn("rounded-sm border border-bone/10 bg-panel")}>
      {/* Header */}
      <div className={cn("flex items-center justify-between px-4 py-3 border-b border-bone/8")}>
        <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50")}>
          Branch performance
        </span>
        {/* Plan mix legend */}
        <div className={cn("flex items-center gap-3")}>
          {PLAN_ORDER.map((p) => (
            <span key={p} className={cn("inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-muted/40")}>
              <span className={cn("h-1.5 w-1.5 rounded-full")} style={{ backgroundColor: PLAN_COLORS[p] }} />
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Branch rows */}
      <div className={cn("divide-y divide-bone/[0.04]")}>
        {visibleBranches.map((b) => {
          const id = b.id as BranchId;
          const active   = kpis.activeMembers[id];
          const cap      = kpis.capacity[id];
          const utilPct  = Math.round((active / cap) * 100);
          const rpm      = Math.round(kpis.monthlyRevenue[id] / active);
          const expiring = kpis.expiringCount[id];
          const atRisk   = kpis.expiringRevenue[id];
          const color    = BRANCH_COLORS[id];

          return (
            <div key={id} className={cn("grid grid-cols-[auto_1fr] gap-x-6 px-4 py-4 lg:py-5")}>
              {/* Branch label */}
              <div className={cn("flex flex-col justify-center gap-1 w-24 shrink-0")}>
                <span className={cn("inline-flex items-center gap-2")}>
                  <span className={cn("h-2 w-2 rounded-full shrink-0")} style={{ backgroundColor: color }} />
                  <span className={cn("font-mono text-xs uppercase tracking-wider text-bone")}>{b.name}</span>
                </span>
                <span className={cn("font-mono text-2xs text-muted/35 pl-4")}>{b.tagline}</span>
              </div>

              {/* Metrics grid */}
              <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4")}>

                {/* Utilisation */}
                <div className={cn("flex flex-col gap-2")}>
                  <div className={cn("flex items-baseline justify-between")}>
                    <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/40")}>Utilisation</span>
                    <span className={cn("font-mono text-xs font-bold tabular-nums")} style={{ color }}>{utilPct}%</span>
                  </div>
                  <UtilBar pct={utilPct} color={color} />
                  <span className={cn("font-mono text-2xs text-muted/30")}>{active} / {cap} members</span>
                </div>

                {/* Plan mix */}
                <div className={cn("flex flex-col gap-2")}>
                  <div className={cn("flex items-baseline justify-between")}>
                    <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/40")}>Plan mix</span>
                    <span className={cn("font-mono text-xs font-bold tabular-nums text-bone")}>{active}</span>
                  </div>
                  <PlanMixBar branchId={id} />
                  <span className={cn("font-mono text-2xs text-muted/30")}>
                    {planMix[id].ANNUAL} annual · {planMix[id].MONTHLY} monthly
                  </span>
                </div>

                {/* Revenue per member */}
                <div className={cn("flex flex-col gap-1.5")}>
                  <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/40")}>Rev / member</span>
                  <span className={cn("font-mono text-lg font-bold tabular-nums text-bone leading-none")}>{nairaCompact(rpm)}</span>
                  <span className={cn("font-mono text-2xs text-muted/30")}>+{kpis.newThisMonth[id]} new this month</span>
                </div>

                {/* Retention risk */}
                <div className={cn("flex flex-col gap-1.5")}>
                  <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/40")}>Expiring soon</span>
                  <span className={cn(
                    "font-mono text-lg font-bold tabular-nums leading-none",
                    expiring > 30 ? "text-em-red" : expiring > 15 ? "text-em-yellow" : "text-bone",
                  )}>
                    {expiring}
                  </span>
                  <span className={cn("font-mono text-2xs text-muted/30")}>{nairaCompact(atRisk)} at risk</span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
