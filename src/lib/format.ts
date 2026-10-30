export function naira(n: number): string {
  return "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 0 });
}

export function nairaCompact(n: number): string {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return naira(n);
}

export function percentDelta(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function deltaArrow(v: number): string {
  return v >= 0 ? "▲" : "▼";
}

export function relativeTimeAgo(at: string): string {
  const now = new Date();
  const [h, m] = at.split(":").map(Number);
  const then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
  if (then > now) then.setDate(then.getDate() - 1); // yesterday if time already passed
  const diff = (now.getTime() - then.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}