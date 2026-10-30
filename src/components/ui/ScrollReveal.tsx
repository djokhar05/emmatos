import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn.ts";

/* animate.css animations that can be triggered by ScrollReveal */
const ANIMATE_CSS_ANIMS = new Set([
  "fadeIn", "fadeInUp", "fadeInDown", "fadeInLeft", "fadeInRight",
  "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp",
  "slideInUp", "slideInDown", "slideInLeft", "slideInRight",
  "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp",
  "flipInX", "flipInY", "lightSpeedInLeft", "lightSpeedInRight",
  "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight",
  "jackInTheBox", "rollIn",
]);



interface ScrollRevealOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  /**
   * Animation name — either a custom keyframe (`"slide-up"`, `"fade"`, `"scale-in"`, `"slide-left"`)
   * or an animate.css class name without the prefix (`"fadeInUp"`, `"zoomIn"`, `"slideInUp"`, …).
   */
  animation?:
    | "fade" | "slide-up" | "slide-left" | "scale-in"
    | "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight"
    | "zoomIn" | "zoomInDown" | "zoomInLeft" | "zoomInRight" | "zoomInUp"
    | "slideInUp" | "slideInDown" | "slideInLeft" | "slideInRight"
    | "bounceIn" | "bounceInDown" | "bounceInLeft" | "bounceInRight" | "bounceInUp"
    | "flipInX" | "flipInY"
    | "lightSpeedInLeft" | "lightSpeedInRight"
    | "rotateIn" | "rotateInDownLeft" | "rotateInDownRight" | "rotateInUpLeft" | "rotateInUpRight"
    | "jackInTheBox" | "rollIn";
  className?: string;
  children: React.ReactNode;
}

/**
 * Wraps content & reveals it with an entrance animation when the wrapper
 * scrolls into view. Supports both custom keyframes (`"slide-up"`) and
 * animate.css classes (`"fadeInUp"`).
 *
 * ```tsx
 * <ScrollReveal animation="fadeInUp" delay={200}>
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

  const isAnimate = ANIMATE_CSS_ANIMS.has(animation);
  const animName = isAnimate ? undefined : `enter-${animation}`;
  const acssCls = isAnimate ? `animate__animated animate__${animation}` : "";

  return (
    <div
      ref={wrapperRef}
      aria-hidden={!revealed}
      className={cn(className, revealed ? acssCls : undefined)}
      style={{
        opacity: revealed ? undefined : 0,
        animationName: revealed ? animName : undefined,
        animationDuration: isAnimate || !revealed ? undefined : `${duration}ms`,
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        animationTimingFunction: isAnimate || !revealed
          ? undefined
          : "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Builds a stagger-delay `animationDelay` chunk for a child
 * inside a revealed parent. Pass the 0‑based index and a step in ms.
 *
 * ```tsx
 * <div style={{ animationDelay: stagger(2, 120) }}>
 * ```
 */
export function stagger(index: number, step = 120): string {
  return `${index * step}ms`;
}