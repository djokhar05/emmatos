import { cn } from "../lib/cn.ts";

/**
 * The Emmatos mark: a bone "E" spine with three brand bars
 * — yellow / red / blue — as the crossbars.
 */
export function EMarkSVG({
  size = 22,
  className,
  variant = "dark",
  id,
}: {
  size?: number;
  className?: string;
  variant?: "dark" | "light";
  id?: string;
}) {
  const spine = variant === "light" ? "#0B0A0C" : "#F4F1EA";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("block shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Emmatos mark"
    >
      <rect id={id} x="2" y="2" width="5" height="20" rx="1.5" fill={spine} />
      <rect x="9" y="2" width="13" height="5" rx="1.5" fill="#FFC400" />
      <rect x="9" y="9.5" width="10" height="5" rx="1.5" fill="#E6352B" />
      <rect x="9" y="17" width="13" height="5" rx="1.5" fill="#2146F3" />
    </svg>
  );
}

export function Logomark({
  size = 30,
  className,
  variant = "dark",
  withWord = true,
  withDescriptor = true,
}: {
  size?: number;
  className?: string;
  variant?: "dark" | "light";
  withWord?: boolean;
  withDescriptor?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 select-none",
        withWord && "gap-2.5",
        className,
      )}
    >
      <img
        src="/logo.png"
        alt="Emmatos Gym logo"
        className={cn("block shrink-0 object-contain", className)}
        style={{ width: size, height: size }}
      />
      {withWord && (
        <span className="inline-flex items-baseline gap-2 leading-none">
          <span
            className={cn(
              "text-[1.5em] font-extrabold tracking-tight text-bone",
              variant === "light" && "text-ink",
            )}
            style={{ fontSize: size * 0.66, letterSpacing: "-0.02em" }}
          >
            EMMATOS
          </span>
          {withDescriptor && (
            <span
              className={cn(
                "font-mono text-[0.34em] uppercase tracking-[0.3em] text-muted",
                variant === "light" && "text-ink/60",
              )}
              style={{ fontSize: size * 0.3 }}
            >
              Fitness
            </span>
          )}
        </span>
      )}
    </span>
  );
}