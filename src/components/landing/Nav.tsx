import { cn } from "../../lib/cn.ts";
import { Logomark } from "../Logomark.tsx";

const linkBase =
  "font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer select-none";
const linkCls = cn(linkBase, "text-bone/60 hover:text-bone");
const adminCls = cn(linkBase, "text-em-red/70 hover:text-em-red border-b border-bone/10");

export function Nav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-bone/10 bg-ink/85 backdrop-blur-xl"
    >
      <nav aria-label="Main navigation" className="mx-auto flex max-w-[1536px] items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <a href="/" aria-label="Emmatos Fitness home" className="flex items-center no-underline">
          <Logomark size={26} withDescriptor={false} />
        </a>

        <div className="flex items-center gap-3 sm:gap-6 lg:gap-9">
          <a href="#branches" className={cn(linkCls, "hidden sm:inline-flex")}>
            Branches
          </a>
          <a href="#training" className={cn(linkCls, "hidden md:inline-flex")}>
            Training
          </a>
          <a href="#features" className={cn(linkCls, "hidden sm:inline-flex")}>
            <span className="hidden lg:inline">The experience</span>
            <span className="lg:hidden">Inside</span>
          </a>
          <a href="#proshop" className={cn(linkCls, "hidden sm:inline-flex")}>
            Pro Shop
          </a>
          <a href="#pricing" className={cn(linkCls, "hidden sm:inline-flex")}>
            Membership
          </a>
          <a
            href="/admin/login"
            className={cn(adminCls, "hidden border-b-0 sm:inline-flex")}
          >
            Admin
          </a>
          <a
            href="/member/login"
            className={cn(adminCls, "hidden border-b-0 sm:inline-flex")}
          >
            Member
          </a>
          <a
            href="#pricing"
            className="inline-flex min-h-10 items-center rounded-sm bg-em-yellow px-4 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink transition hover:bg-[#ffd12e] sm:px-5"
          >
            Become a member
          </a>
        </div>
      </nav>
    </header>
  );
}