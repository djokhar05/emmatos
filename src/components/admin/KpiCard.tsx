import { cn } from "../../lib/cn.ts";
import { nairaCompact, deltaArrow, percentDelta } from "../../lib/format.ts";
import { useCountUp } from "../../lib/useCountUp.ts";

export interface KpiData {
  label: string;
  current: number;
  previous?: number;
  format?: "number" | "naira";
  color?: string;
  alert?: boolean;
}

function formatValue(v: number, fmt: "number" | "naira"): string {
  if (fmt === "naira") return nairaCompact(v);
  if (v >= 1_000) return (v / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(v);
}

export function KpiCard({ data, className }: { data: KpiData; className?: string }) {
  const display = useCountUp(data.current, true, 1500);
  const formatted = formatValue(Math.floor(display), data.format ?? "number");

  let deltaStr: string | undefined;
  if (data.previous !== undefined) {
    const pct = percentDelta(data.current, data.previous);
    if (pct !== 0) deltaStr = `${deltaArrow(pct)}${Math.abs(pct)}%`;
  }

  return (
    <div
      className={cn(
        "rounded-sm border border-bone/10 bg-panel px-4 py-4",
        "flex flex-col gap-1",
        className,
      )}
      style={(data.alert ? "#E6352B" : data.color) ? { borderTop: `2px solid ${data.alert ? "#E6352B" : data.color}` } : undefined}
    >
      <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50 truncate")}>
        {data.label}
      </span>

      {/* Value */}
      <span
        className={cn(
          "font-mono font-bold tracking-tight tabular-nums text-[clamp(1.4rem,2.2vw,2.4rem)] leading-none",
          data.alert ? "text-em-red" : "text-bone",
        )}
      >
        {formatted}
      </span>

      {/* Delta */}
      {deltaStr && (
        <span
          className={cn(
            "font-mono text-2xs uppercase tracking-wider",
            deltaStr.startsWith("▲") ? "text-em-blue/70" : "text-em-red/70",
          )}
        >
          {deltaStr}
        </span>
      )}
    </div>
  );
}