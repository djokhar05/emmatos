const NOISE_SVG =
  "%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E";

/**
 * Fixed full-screen film grain. Sits on top of everything with a low
 * opacity + blend — the thin layer that makes a page feel printed, not rendered.
 */
export function Grain({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999]"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
        backgroundSize: "180px 180px",
        mixBlendMode: "screen",
      }}
    />
  );
}