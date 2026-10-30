import { cn } from "../../lib/cn.ts";
import { Logomark } from "../Logomark.tsx";
import { signOut } from "../../lib/auth.ts";

const ITEMS = [
  {
    label: "Overview",
    href: "/admin",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    label: "Members",
    href: "/admin",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 12c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Check-ins",
    href: "/admin",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Revenue",
    href: "/admin",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M1 11l3.5-4 3 2.5L11 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 4h2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Branches",
    href: "/admin",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 1.5C4.79 1.5 3 3.29 3 5.5c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="7" cy="5.5" r="1.2" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

export function AdminNavRail() {
  const path = window.location.pathname;

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 w-56 lg:w-64",
        "bg-panel border-r border-bone/8",
        "flex flex-col",
      )}
    >
      {/* Brand */}
      <a
        href="/"
        className={cn("flex items-center gap-3 px-5 py-4 border-b border-bone/8 group")}
      >
        <Logomark size={20} />
        <span className={cn("font-mono text-2xs uppercase tracking-[0.2em] text-bone/40 group-hover:text-bone/70 transition-colors")}>
          Emmatos
        </span>
      </a>

      {/* Section label */}
      <p className={cn("px-5 pt-5 pb-2 font-mono text-2xs uppercase tracking-[0.2em] text-muted/30")}>
        Navigation
      </p>

      {/* Nav items */}
      <div className={cn("flex flex-col gap-0.5 px-3 flex-1")}>
        {ITEMS.map((it) => {
          const active = path === it.href;
          return (
            <a
              key={it.label}
              href={it.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-sm",
                "font-mono text-xs uppercase tracking-wider",
                "transition-colors duration-150",
                active
                  ? "bg-bone/10 text-bone"
                  : "text-bone/45 hover:bg-bone/5 hover:text-bone/80",
              )}
            >
              <span className={cn(active ? "text-em-yellow" : "text-bone/30")}>
                {it.icon}
              </span>
              <span>{it.label}</span>
              {active && (
                <span className={cn("ml-auto h-1 w-1 rounded-full bg-em-yellow")} />
              )}
            </a>
          );
        })}
      </div>

      {/* Bottom */}
      <div className={cn("px-3 py-4 border-t border-bone/8 flex flex-col gap-0.5")}>
        <a
          href="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider text-bone/40 hover:bg-bone/5 hover:text-bone/70 transition-colors",
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 7L7 1l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 5v7h3v-3h2v3h3V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          View site
        </a>
        <button
          onClick={() => { signOut(); window.location.href = "/admin/login"; }}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider text-em-red/50 hover:bg-em-red/5 hover:text-em-red transition-colors cursor-pointer",
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M5 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sign out
        </button>
      </div>
    </nav>
  );
}