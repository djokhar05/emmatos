import { cn } from "../../lib/cn.ts";
import { useBranch } from "../../lib/store.tsx";
import { members, type Member } from "../../data/members.ts";
import { Badge } from "../ui/Badge.tsx";
import { BRANCH_COLORS } from "../../data/branches.ts";
import { useState } from "react";

type SortDir = "asc" | "desc";
type ColKey = "name" | "plan" | "branch" | "status" | "checkins" | "lastSeen";

const PLAN_CLS: Record<string, string> = {
  DAY:       "bg-transparent border-muted/30 text-muted/60",
  MONTHLY:   "bg-em-blue/10 text-em-blue border-em-blue/20",
  QUARTERLY: "bg-em-yellow/15 text-em-yellow border-em-yellow/25",
  ANNUAL:    "bg-em-red/10 text-em-red border-em-red/20",
};

const COLUMNS: { key: ColKey; label: string; align?: string }[] = [
  { key: "name",       label: "Member" },
  { key: "plan",       label: "Plan" },
  { key: "branch",     label: "Branch" },
  { key: "status",     label: "Status" },
  { key: "checkins",   label: "Check-ins", align: "text-right" },
  { key: "lastSeen",   label: "Last seen", align: "text-right" },
];

function sortMembers(list: Member[], col: ColKey, dir: SortDir): Member[] {
  return [...list].sort((a, b) => {
    let cmp = 0;
    switch (col) {
      case "name":     cmp = a.name.localeCompare(b.name); break;
      case "plan":     cmp = a.plan.localeCompare(b.plan); break;
      case "branch":   cmp = a.branchId.localeCompare(b.branchId); break;
      case "status":   cmp = a.status.localeCompare(b.status); break;
      case "checkins": cmp = a.checkInsMonth - b.checkInsMonth; break;
      case "lastSeen": cmp = a.lastCheckIn.localeCompare(b.lastCheckIn); break;
    }
    return dir === "asc" ? cmp : -cmp;
  });
}

export function MembersTable() {
  const { branch } = useBranch();
  const [query, setQuery] = useState("");
  const [sortCol, setSortCol] = useState<ColKey>("lastSeen");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = members
    .filter((m) => branch === "all" || m.branchId === branch)
    .filter((m) => !query || m.name.toLowerCase().includes(query.toLowerCase()));

  const sorted = sortMembers(filtered, sortCol, sortDir);

  function toggleSort(col: ColKey) {
    if (col === sortCol) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortDir(col === "lastSeen" ? "desc" : "asc");
    }
  }

  const arrow = (col: ColKey) =>
    col === sortCol ? (sortDir === "asc" ? " ▲" : " ▼") : " ⇅";

  return (
    <div className={cn("rounded-sm border border-bone/10 bg-panel overflow-hidden")}>
      {/* Header */}
      <div className={cn("flex items-center justify-between gap-4 px-4 py-3 border-b border-bone/8")}>
        <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50 shrink-0")}>
          Members &middot; {filtered.length}
        </span>
        <div className={cn("relative")}>
          <svg
            className={cn("absolute left-2.5 top-1/2 -translate-y-1/2 text-muted/30 pointer-events-none")}
            width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
          >
            <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            type="search"
            placeholder="Search members…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              "pl-7 pr-3 py-1.5 rounded-sm border border-bone/15 bg-ink",
              "font-mono text-xs text-bone placeholder:text-muted/30",
              "outline-none focus:border-em-yellow/50 transition-colors w-44",
            )}
          />
        </div>
      </div>

      <div className={cn("overflow-x-auto")}>
        <table className={cn("w-full text-left border-collapse")}>
          <thead>
            <tr className={cn("border-b border-bone/8 font-mono text-2xs uppercase tracking-wider text-muted/40")}>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-2.5 cursor-pointer select-none hover:text-bone/70 transition-colors",
                    col.align ?? "",
                  )}
                  onClick={() => toggleSort(col.key)}
                  title={`Sort by ${col.label}`}
                >
                  {col.label}
                  <span className={cn("text-muted/30 ml-0.5")}>{arrow(col.key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.slice(0, 18).map((m) => (
              <tr
                key={m.id}
                className={cn(
                  "border-b border-bone/[0.04] hover:bg-bone/[0.025] transition-colors duration-100",
                )}
              >
                <td className={cn("px-4 py-2.5 font-medium text-sm text-bone")}>{m.name}</td>

                <td className={cn("px-4 py-2.5")}>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-sm border font-mono text-2xs uppercase tracking-wider px-1.5 py-0.5",
                      PLAN_CLS[m.plan] ?? "",
                    )}
                  >
                    {m.plan}
                  </span>
                </td>

                <td className={cn("px-4 py-2.5")}>
                  <span className={cn("inline-flex items-center gap-2 font-mono text-xs text-bone/60")}>
                    <span
                      className={cn("inline-block h-2 w-2 rounded-full shrink-0")}
                      style={{ backgroundColor: BRANCH_COLORS[m.branchId] }}
                    />
                    <span className={cn("text-2xs uppercase tracking-wider capitalize")}>{m.branchId}</span>
                  </span>
                </td>

                <td className={cn("px-4 py-2.5")}>
                  <Badge
                    variant={m.status === "ACTIVE" ? "active" : m.status === "EXPIRING" ? "expiring" : "expired"}
                    label={m.status === "EXPIRING" ? "Expiring" : m.status.toLowerCase()}
                  />
                </td>

                <td className={cn("px-4 py-2.5 font-mono text-xs text-right tabular-nums text-bone")}>
                  {m.checkInsMonth}
                </td>

                <td className={cn("px-4 py-2.5 font-mono text-2xs text-right tracking-wider text-muted/50")}>
                  {m.lastCheckIn.slice(5).replace("-", " / ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className={cn("px-4 py-8 text-center font-mono text-2xs uppercase tracking-wider text-muted/30")}>
            No members match &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}