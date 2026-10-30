import { cn } from "../lib/cn.ts";

export interface MarqueeItem {
  label: string;
  color?: string;
}

/**
 * Endless ticker band. Items are rendered twice for a seamless -50% loop
 * (the `animate-marquee` token in the theme).
 */
export function Marquee({
  items,
  className,
  itemClassName,
  separator = "/",
}: {
  items: MarqueeItem[];
  className?: string;
  itemClassName?: string;
  separator?: string;
}) {
  if (!items.length) return null;

  const row = (key: number) => (
    <div
      key={key}
      aria-hidden={key === 1}
      className="inline-flex shrink-0 items-center"
    >
      {items.map((it, i) => (
        <span
          key={`${key}-${i}`}
          className={cn(
            "mx-5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em]",
            itemClassName,
          )}
        >
          {it.color && (
            <span
              className="inline-block h-2 w-2 rounded-[2px]"
              style={{ backgroundColor: it.color }}
            />
          )}
          <span>{it.label}</span>
          <span className="ml-5 text-em-red/40" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("relative w-full overflow-hidden border-y border-bone/10 bg-ink", className)}>
      <div className="flex w-max animate-marquee items-center">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}