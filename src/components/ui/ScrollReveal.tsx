import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  /** IntersectionObserver threshold — how much of the element must be visible before triggering. Default 0.12 */
  threshold?: number;
  /** Delay in ms before the animation starts. */
  delay?: number;
  /** Animation duration in ms. Default 700 */
  duration?: number;
  /** Type of entrance animation */
  animation?:
    | "fade"
    | "slide-up"
    | "slide-left"
    | "scale-in";
  /** Root class to pass through */
  className?: string;
  /** Children — wrapped by the component */
  children: React.ReactNode;
}

/**
 * Wraps content & reveals it with a CSS animation when the wrapper scrolls
 * into view. The wrapper starts invisible (opacity‑0) and stays invisible
 * until the observer fires.
 *
 * ```tsx
 * <ScrollReveal animation="slide-up" delay={200}>
 *   <div>hidden until scrolled to</div>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  threshold = 0.12,
  delay = 0,
  duration = 700,
  animation = "slide-up",
  className,
}: ScrollRevealOptions) {
  const [revealed, setRevealed] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || revealed) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.unobserve(el);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]);

  const animName = `enter-${animation}`;

  return (
    <div
      ref={wrapperRef}
      aria-hidden={!revealed}
      className={className}
      style={{
        opacity: revealed ? undefined : 0,
        animationName: revealed ? animName : undefined,
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Convenience: builds a stagger-delay `animationDelay` chunk for a child
 * inside a revealed parent. Pass the 0‑based index and a step in ms.
 *
 * ```tsx
 * <div style={{ animationDelay: stagger(2, 120) }}>
 * ```
 */
export function stagger(index: number, step = 120): string {
  return `${index * step}ms`;
}