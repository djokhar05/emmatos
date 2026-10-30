import { cn } from "../../lib/cn.ts";
import { branches } from "../../data/branches.ts";
import type { Member } from "../../data/members.ts";

const STATUS_STYLES: Record<Member["status"], string> = {
  ACTIVE: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  EXPIRING: "border-em-yellow/25 bg-em-yellow/10 text-em-yellow",
  EXPIRED: "border-em-red/25 bg-em-red/10 text-em-red",
};

export function ProfileCard({ member }: { member: Member }) {
  const branch = branches.find((b) => b.id === member.branchId);

  return (
    <section className={cn(
      "relative isolate overflow-hidden rounded-sm border border-bone/10 bg-panel p-5 sm:p-7 lg:p-8",
      "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_at_82%_0%,rgba(255,196,0,0.12),transparent_42%)]",
    )}>
      <div className={cn("absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-em-yellow via-em-red to-em-blue")} />
      <div className={cn("relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-7")}>
        <div className={cn("relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-em-yellow/40 bg-ink text-3xl font-extrabold text-em-yellow shadow-[0_0_40px_rgba(255,196,0,0.12)] sm:h-24 sm:w-24")}>
          <span>{member.avatarInitial ?? member.name[0]}</span>
          <span className={cn("absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-panel bg-emerald-400")} aria-label="Online" />
        </div>

        <div className={cn("min-w-0 flex-1")}>
          <div className={cn("mb-2 flex flex-wrap items-center gap-2")}>
            <span className={cn("font-mono text-[10px] uppercase tracking-[0.22em] text-em-yellow")}>Emmatos member profile</span>
            <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]", STATUS_STYLES[member.status])}>
              {member.status}
            </span>
          </div>
          <h1 className={cn("break-words text-3xl font-extrabold leading-tight tracking-tight text-bone sm:text-4xl")}>{member.name}</h1>
          <div className={cn("mt-4 flex flex-wrap items-center gap-x-4 gap-y-2")}>
            {branch && (
              <span className={cn("inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/75")}>
                <span className={cn("h-2 w-2 rounded-full")} style={{ backgroundColor: branch.color }} />
                {branch.name} branch
              </span>
            )}
            <span className={cn("h-3 w-px bg-bone/15")} />
            <span className={cn("font-mono text-[10px] uppercase tracking-[0.12em] text-bone/55")}>{member.plan} plan</span>
            <span className={cn("h-3 w-px bg-bone/15")} />
            <span className={cn("font-mono text-[10px] uppercase tracking-[0.12em] text-bone/55")}>Member since {member.memberSince.slice(0, 7)}</span>
          </div>
        </div>

        <div className={cn("hidden shrink-0 border-l border-bone/10 pl-6 text-right lg:block")}>
          <span className={cn("block font-mono text-[9px] uppercase tracking-[0.2em] text-muted/50")}>Member ID</span>
          <span className={cn("mt-1 block font-mono text-sm tabular-nums text-bone/80")}>EM-{member.id.toUpperCase()}</span>
        </div>
      </div>
    </section>
  );
}
