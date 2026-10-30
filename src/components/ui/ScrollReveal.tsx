import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn.ts";

type Animation =
  | "fade"
  | "slide-up"
  | "slide-left"
  | "scale-in"
  | "rise"
  | "clip-up"
  | "zoom-crisp";

const EASING: Record<Animation, string> = {
  "fade":       "cubic-bezier(0.4, 0, 0.2, 1)",
  "slide-up":   "cubic-bezier(0.16, 1, 0.3, 1)",
  "slide-left": "cubic-bezier(0.16, 1, 0.3, 1)",
  "scale-in":   "cubic-bezier(0.34, 1.56, 0.64, 1)",
  "rise":       "cubic-bezier(0.16, 1, 0.3, 1)",
  "clip-up":    "cubic-bezier(0.76, 0, 0.24, 1)",
  "zoom-crisp": "cubic-bezier(0.4, 0, 0.2, 1)",
};

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  duration?: number;
  animation?: Animation;
  className?: string;
}

export function ScrollReveal({
  children,
  threshold = 0.12,
  delay = 0,
  duration = 700,
  animation = "slide-up",
  className,
}: ScrollRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
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

  return (
    <div
      ref={ref}
      aria-hidden={!revealed}
      className={cn(className)}
      style={revealed ? {
        animationName: `enter-${animation}`,
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        animationTimingFunction: EASING[animation],
      } : { opacity: 0 }}
    >
      {children}
    </div>
  );
}

export function stagger(index: number, step = 100): string {
  return `${index * step}ms`;
}
