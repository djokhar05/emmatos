import { cn } from "../../lib/cn.ts";
import type { BranchIdOrAll } from "../../data/branches.ts";
import { BRANCH_COLORS } from "../../data/branches.ts";

/* ── Options ─────────────────────────────────────────────── */

export interface BranchOption {
  id: BranchIdOrAll;
  label: string;
  color?: string;       // for individual branches
}

export const ALL_BRANCH_OPTIONS: BranchOption[] = [
  { id: "all", label: "All" },
  { id: "alagbado", label: "Alagbado", color: BRANCH_COLORS.alagbado },
  { id: "ipaja",    label: "Ipaja",    color: BRANCH_COLORS.ipaja },
  { id: "isashi",   label: "Isashi",   color: BRANCH_COLORS.isashi },
];

export const SINGLE_BRANCH_OPTIONS: BranchOption[] = ALL_BRANCH_OPTIONS.slice(1);

/* ── Component ───────────────────────────────────────────── */

const SIZE_CLS: Record<string, string> = {
  sm: "px-2.5 py-1 text-2xs gap-2",
  md: "px-4 py-2 text-xs gap-2.5",
};

export function BranchSwitcher({
  value,
  onChange,
  options = ALL_BRANCH_OPTIONS,
  size = "md",
  className,
}: {
  value: BranchIdOrAll;
  onChange: (v: BranchIdOrAll) => void;
  options?: BranchOption[];
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Select branch"
      className={cn("inline-flex gap-0.5 rounded-sm", className)}
    >
      {options.map((opt) => {
        const active = value === opt.id;
        const isAll = opt.id === "all";
        const bgCls = active
          ? isAll
            ? "bg-panel text-bone"
            : `text-ink`
          : "bg-transparent text-bone/70";

        const borderCls = active
          ? isAll
            ? "border-bone/20"
            : `border-transparent`
          : "border-bone/10";

        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={active}
            className={cn(
              SIZE_CLS[size],
              bgCls,
              borderCls,
              "inline-flex items-center gap-2 rounded-sm border font-mono uppercase tracking-[0.2em] leading-none transition-all duration-150 cursor-pointer select-none",
              !active && "hover:bg-panel/50 hover:text-bone",
              active && !isAll && `shadow-[0_0_0_1px_${opt.color}]`,
              className,
            )}
            style={active && !isAll ? { backgroundColor: opt.color } : undefined}
            onClick={() => onChange(opt.id)}
          >
            {!isAll && (
              <span
                className="inline-block h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: opt.color }}
              />
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}