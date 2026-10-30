import { cn } from "../../lib/cn.ts";

const MAP: Record<string, string> = {
  default:  "bg-muted/20 text-muted border-muted/20",
  active:   "bg-em-blue/10 text-em-blue border-em-blue/20",
  expiring:"bg-em-yellow/15 text-em-yellow border-em-yellow/25",
  expired:  "bg-em-red/10 text-em-red border-em-red/20",
};

export function Badge({
  label,
  variant = "default",
  className,
}: {
  label: string;
  variant?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-2xs uppercase tracking-wider",
        MAP[variant] ?? MAP.default,
        className,
      )}
    >
      {label}
    </span>
  );
}