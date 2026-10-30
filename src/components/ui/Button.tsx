import { cn } from "../../lib/cn.ts";

type V = "primary" | "outline" | "ghost";

const STYLES: Record<V, string> = {
  primary:
    "bg-em-yellow font-bold border border-em-yellow/20 text-ink hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "bg-transparent border border-bone/20 text-bone hover:bg-bone/5 hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "bg-transparent border-transparent text-bone/50 hover:text-bone",
};

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: {
  variant?: V;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-150 cursor-pointer rounded-sm select-none",
        STYLES[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}