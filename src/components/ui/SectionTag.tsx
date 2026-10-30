import { cn } from "../../lib/cn.ts";

/**
 * Mono section tag:  #01 • Section
 */
export function SectionTag({
  num,
  label,
  className,
}: {
  num: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 font-mono text-xs uppercase tracking-widest text-muted",
        className,
      )}
    >
      <span className="opacity-40">#</span>
      {num}
      <span className="text-em-red/40 mx-0.5">&bull;</span>
      {label}
    </span>
  );
}