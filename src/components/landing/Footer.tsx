import { cn } from "../../lib/cn.ts";
import { Logomark } from "../Logomark.tsx";
import { branches } from "../../data/branches.ts";

export function Footer() {
  return (
    <footer className={cn("relative border-t border-bone/10 mt-0")}>
      {/* Tri-color top stripe */}
      <div className={cn("flex h-1 w-full")}>
        <span className={cn("flex-1 bg-em-yellow")} />
        <span className={cn("flex-1 bg-em-red")} />
        <span className={cn("flex-1 bg-em-blue")} />
      </div>

      <div className={cn("px-6 lg:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[auto_auto_auto] gap-6 lg:gap-10")}>
        {/* Brand column */}
        <div className={cn("flex flex-col gap-3")}>
          <Logomark size={26} />
          <p className={cn("text-sm leading-relaxed text-bone/60 max-w-xs")}>
            One Emmatos Fitness brand. Three Lagos branches. Your training home,
            wherever you are.
          </p>
        </div>

        {/* Branches column */}
        <div className={cn("flex flex-col gap-2.5")}>
          <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50")}>
            Emmatos branches
          </span>
          {branches.map((b) => (
            <a
              key={b.id}
              href="#branches"
              className={cn(
                "inline-flex items-center gap-2 text-sm text-bone/70 hover:text-bone transition-colors duration-150",
              )}
            >
              <span
                className={cn("inline-block h-2 w-2 rounded-full shrink-0")}
                style={{ backgroundColor: b.color }}
              />
              <span>{b.name}</span>
              <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/40")}>
                {b.zone}
              </span>
            </a>
          ))}
        </div>

        {/* Admin column */}
        <div className={cn("flex flex-col gap-2.5")}>
          <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50")}>
            Portal
          </span>
          <a
            href="/admin/login"
            className={cn("text-sm text-bone/70 hover:text-bone transition-colors duration-150")}
          >
            Front desk login
          </a>
          <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/40 mt-2")}>
            Demo: admin@emmatos.ng
          </span>
        </div>
      </div>

      {/* Bottom */}
      <div className={cn("border-t border-bone/8 px-6 lg:px-12 py-4")}>
        <p className={cn("font-mono text-2xs uppercase tracking-widest text-muted/40 text-center")}>
          &copy; 2026  Emmatos Fitness  &mdash;  Lagos, Nigeria  &bull;  Built for the front desk
        </p>
      </div>
    </footer>
  );
}