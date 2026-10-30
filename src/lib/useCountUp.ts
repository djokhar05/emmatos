import { useEffect, useRef, useState } from "react";

/* ── Simple count‑up ─────────────────────────────────── */

export function useCountUp(
  target: number,
  start = true,
  duration = 1400,
): number {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;

    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return display;
}

/* ── Trigger‑based count‑up (call go() to start) ───── */

export function useCountUpTrigger(duration = 1400) {
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);
  const durationRef = useRef(duration);

  const go = (target: number) => {
    if (startedRef.current) return;
    startedRef.current = true;

    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / durationRef.current, 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return {
    value: val,
    go,
    reset: () => { startedRef.current = false; setVal(0); },
  };
}