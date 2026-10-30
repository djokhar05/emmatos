import { cn } from "../../lib/cn.ts";
import { naira } from "../../lib/format.ts";
import type { Member } from "../../data/members.ts";

const PLAN_PRICES: Record<string, number> = {
  DAY: 2500, MONTHLY: 15000, QUARTERLY: 40000, ANNUAL: 150000,
};

export function BillingCard({ member }: { member: Member }) {
  const price = PLAN_PRICES[member.plan] ?? 15000;
  return (
    <div className={cn("relative isolate overflow-hidden rounded-sm border border-bone/10 bg-panel/80 p-4 sm:p-5")}>
      <div className={cn("absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full border border-em-blue/15")} />
      <div className={cn("absolute -right-7 -top-7 -z-10 h-28 w-28 rounded-full border border-em-blue/10")} />
      <div className={cn("flex items-start justify-between gap-3")}>
        <div>
          <span className={cn("font-mono text-[9px] uppercase tracking-[0.18em] text-em-yellow")}>Membership</span>
          <span className={cn("mt-1 block text-lg font-extrabold tracking-tight text-bone")}>
            {member.plan === "DAY" ? "Day Pass" : member.plan === "MONTHLY" ? "Monthly" : member.plan === "QUARTERLY" ? "Quarterly" : "Annual"}
          </span>
        </div>
        <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em]", member.status === "ACTIVE" ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" : member.status === "EXPIRING" ? "border-em-yellow/25 bg-em-yellow/10 text-em-yellow" : "border-em-red/25 bg-em-red/10 text-em-red")}>{member.status}</span>
      </div>
      <div className={cn("mt-5 flex items-end justify-between border-b border-bone/8 pb-4")}>
        <span className={cn("font-mono text-2xl font-bold tabular-nums tracking-tight text-bone sm:text-3xl")}>
          {naira(price)}
          <span className={cn("ml-1 text-[10px] font-normal text-muted/50")}>/{member.plan === "DAY" ? "day" : member.plan === "MONTHLY" ? "mo" : member.plan === "QUARTERLY" ? "qr" : "yr"}</span>
        </span>
        <span className={cn("font-mono text-[9px] uppercase tracking-[0.12em] text-muted/40")}>Current rate</span>
      </div>
      <div className={cn("mt-4 flex items-center justify-between")}>
        <span className={cn("font-mono text-[9px] uppercase tracking-[0.14em] text-muted/45")}>Plan standing</span>
        <span className={cn("font-mono text-[9px] uppercase tracking-[0.12em] text-bone/70")}>
          {member.status === "ACTIVE" ? "In good standing" : member.status === "EXPIRING" ? "Renewal approaching" : "Renewal required"}
        </span>
      </div>
    </div>
  );
}