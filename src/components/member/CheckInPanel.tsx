import { cn } from "../../lib/cn.ts";
import type { Member } from "../../data/members.ts";

function mockHistory(count: number, lastDate: string): string[] {
  const dates: string[] = [];
  const [y, m, d] = lastDate.split("-").map(Number);
  const last = new Date(y, m - 1, d);
  for (let i = 0; i < count; i++) {
    const dt = new Date(last);
    dt.setDate(dt.getDate() - i);
    dates.push(dt.toISOString().slice(0, 10));
  }
  return dates;
}

export function CheckInPanel({ member }: { member: Member }) {
  const history = mockHistory(Math.min(member.checkInsMonth, 10), member.lastCheckIn);
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);
    return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short" })
      .format(new Date(year, month - 1, day));
  };
  return (
    <div className={cn("overflow-hidden rounded-sm border border-bone/10 bg-panel/80")}>
      <div className={cn("flex items-center justify-between gap-3 border-b border-bone/8 px-4 py-4 sm:px-5")}>
        <div>
          <span className={cn("block font-mono text-[9px] uppercase tracking-[0.18em] text-em-yellow")}>Training activity</span>
          <span className={cn("mt-1 block text-base font-bold tracking-tight text-bone")}>Recent check-ins</span>
        </div>
        <span className={cn("rounded-full border border-bone/10 bg-ink/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] tabular-nums text-muted/65")}>{member.checkInsMonth} this month</span>
      </div>
      <div className={cn("flex flex-col p-2 sm:p-3")}>
        {history.map((date, i) => (
          <div
            key={i}
            className={cn("flex items-center gap-3 rounded-sm px-3 py-2.5 transition-colors hover:bg-bone/[0.03]", i < history.length - 1 && "border-b border-bone/[0.04]")}
          >
            <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border", i === 0 ? "border-em-yellow/30 bg-em-yellow/10 text-em-yellow" : "border-bone/10 bg-ink/40 text-bone/45")}>
              <span className={cn("h-1.5 w-1.5 rounded-full", i === 0 ? "bg-em-yellow" : "bg-bone/30")} />
            </span>
            <span className={cn("min-w-0 flex-1")}>
              <span className={cn("block text-sm font-semibold text-bone")}>{i === 0 ? "Latest session" : `Training session ${String(i + 1).padStart(2, "0")}`}</span>
              <span className={cn("mt-0.5 block font-mono text-[9px] uppercase tracking-[0.12em] text-muted/45")}>{formatDate(i === 0 ? member.lastCheckIn : date)}</span>
            </span>
            <span className={cn("font-mono text-[9px] uppercase tracking-[0.12em]", i === 0 ? "text-em-yellow/80" : "text-muted/35")}>{i === 0 ? "Latest" : "Logged"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}