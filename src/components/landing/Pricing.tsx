import { cn } from "../../lib/cn.ts";
import { SectionTag } from "../ui/SectionTag.tsx";
import { ScrollReveal, stagger } from "../ui/ScrollReveal.tsx";

interface Plan {
  name: string;
  price: string;
  sub: string;
  period: string;
  perks: string[];
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Day Pass",
    price: "2,000",
    sub: "per day",
    period: "day",
    perks: [
      "Full gym access",
      "Any one Emmatos branch",
      "Towel service",
      "No Contract",
    ],
  },
  {
    name: "Monthly",
    price: "20,000",
    sub: "per month",
    period: "month",
    popular: true,
    perks: [
      "All 3 branches",
      "2 guest passes / mo",
      "1 PT session / mo",
      "Cancel anytime",
    ],
  },
  {
    name: "Annual",
    price: "200,000",
    sub: "per year",
    period: "year",
    perks: [
      "All 3 branches",
      "12 PT sessions / yr",
      "Recovery suite access",
      "Priority class booking",
      "Save ₦40,000",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className={cn("scroll-mt-24 px-6 py-20 sm:px-8 lg:px-12 lg:py-28")}>
      {/* Header */}
      <ScrollReveal animation="fadeInUp">
        <div className={cn("mx-auto flex flex-col items-center text-center")}>
          <SectionTag num="04" label="Membership" />
          <h2 className={cn("mt-3 text-[clamp(1.8rem,5vw,3.2rem)] font-bold tracking-tight")}>
            One price. All access.
          </h2>
          <p className={cn("mt-1.5 max-w-lg font-mono text-xs uppercase tracking-wider text-muted/60")}>
            Same price, every branch. No hidden fees.
          </p>
        </div>
      </ScrollReveal>

      {/* Cards */}
      <div className={cn("mx-auto mt-10 grid max-w-[1440px] grid-cols-1 gap-4 md:grid-cols-3 lg:mt-14 lg:gap-6")}>
        {PLANS.map((plan, i) => {
          const yellow = plan.name === "Monthly";
          const accent = yellow ? "bg-em-yellow" : "bg-panel";
          const txt = yellow ? "text-ink" : "text-bone";

          return (
            <div
              key={plan.name}
              style={{ animationDelay: stagger(i, 200) }}
              className={cn(
                "relative flex flex-col rounded-sm border border-bone/10 group transition-all duration-200",
                yellow && "border-em-yellow/30",
                yellow && "ring-1 ring-em-yellow/10",
                yellow && "bg-em-yellow",
                !yellow && "bg-panel",
                "hover:-translate-y-0.5",
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <span
                  className={cn(
                    "absolute -top-2.5 right-3 font-mono text-2xs uppercase tracking-wider",
                    "bg-em-yellow text-ink px-2 py-0.5 rounded-sm",
                  )}
                >
                  Most picked
                </span>
              )}

              <div className={cn("flex h-full flex-col gap-3 p-5 sm:p-6")}>
                {/* Name */}
                <span className={cn("text-sm font-bold uppercase tracking-tight", txt)}>
                  {plan.name}
                </span>

                {/* Price */}
                <span className={cn("mt-2 flex items-baseline gap-2", txt)}>
                  <span className={cn("font-mono font-bold text-[clamp(1.6rem,4vw,2.8rem)] tracking-tight tabular-nums")}>
                    ₦{plan.price}
                  </span>
                  <span className={cn("font-mono text-2xs uppercase tracking-wider", yellow ? "text-ink/60" : "text-muted/60")}>
                    / {plan.period}
                  </span>
                </span>
                <span className={cn("font-mono text-2xs uppercase tracking-wider", yellow ? "text-ink/60" : "text-muted/60")}>
                  {plan.sub}
                </span>

                {/* Perks */}
                <ul className={cn("mt-3 flex flex-col gap-1.5")}>
                  {plan.perks.map((p) => (
                    <li
                      key={p}
                      className={cn(
                        "flex items-center gap-2 font-mono text-2xs tracking-wider leading-snug",
                        yellow ? "text-ink/80" : "text-bone/80",
                      )}
                    >
                      <span className={cn(yellow ? "text-ink/65" : "text-em-yellow")}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#branches"
                  className={cn(
                    "mt-auto px-4 py-2.5 rounded-sm text-center",
                    "font-mono text-2xs uppercase tracking-[0.25em] font-bold",
                    accent,
                    txt,
                    "transition-all duration-150",
                    "hover:-translate-y-0.5",
                  )}
                >
                  {plan.name === "Day Pass" ? "Choose a branch" : "Choose your branch"}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fine print */}
      <p
        className={cn(
          "mx-auto mt-6 max-w-[1440px] text-center font-mono text-xs uppercase tracking-wider text-muted/50",
        )}
      >
        One membership works at every branch.  T&amp;Cs apply.
      </p>
    </section>
  );
}