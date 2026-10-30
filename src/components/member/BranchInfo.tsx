import { cn } from "../../lib/cn.ts";
import { branches } from "../../data/branches.ts";
import type { Member } from "../../data/members.ts";

export function BranchInfo({ member }: { member: Member }) {
  const branch = branches.find((b) => b.id === member.branchId);
  if (!branch) return null;
  return (
    <div className={cn("relative overflow-hidden rounded-sm border border-bone/10 bg-panel/80 p-4 sm:p-5")}>
      <div className={cn("absolute inset-x-0 top-0 h-px")} style={{ background: `linear-gradient(90deg, transparent, ${branch.color}, transparent)` }} />
      <span className={cn("font-mono text-[9px] uppercase tracking-[0.18em] text-muted/50")}>Your training home</span>
      <span className={cn("mt-1 inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-bone")}>
        <span className={cn("h-2.5 w-2.5 rounded-full")} style={{ backgroundColor: branch.color }} />
        {branch.name} branch
      </span>
      <p className={cn("mt-3 text-sm leading-relaxed text-bone/65")}>{branch.address}</p>
      <div className={cn("mt-4 grid gap-3 border-t border-bone/8 pt-4 sm:grid-cols-2")}>
        <div className={cn("min-w-0")}>
          <span className={cn("block font-mono text-[9px] uppercase tracking-[0.14em] text-muted/40")}>Contact</span>
          <a href={`tel:${branch.phone.replaceAll(" ", "")}`} className={cn("mt-1 block truncate text-sm text-bone/75 transition-colors hover:text-em-yellow")}>{branch.phone}</a>
        </div>
        <div className={cn("min-w-0")}>
          <span className={cn("block font-mono text-[9px] uppercase tracking-[0.14em] text-muted/40")}>Opening hours</span>
          <span className={cn("mt-1 block text-sm leading-relaxed text-bone/75")}>{branch.hours}</span>
        </div>
      </div>
    </div>
  );
}