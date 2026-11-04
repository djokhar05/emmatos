import { cn } from "../../lib/cn.ts";
import { SectionTag } from "../ui/SectionTag.tsx";
import { ScrollReveal, stagger } from "../ui/ScrollReveal.tsx";
import { trainers } from "../../data/trainers.ts";

export function Trainers() {
  return (
    <section
      id="trainers"
      className={cn("relative scroll-mt-24 overflow-hidden px-6 py-20 sm:px-8 lg:px-12 lg:py-28")}
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: [
            "linear-gradient(var(--color-bone) 1px, transparent 1px)",
            "linear-gradient(90deg, var(--color-bone) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "48px 48px",
        }}
      />

      {/* Header */}
      <ScrollReveal animation="rise">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
          <SectionTag num="05" label="Personal Trainers" />
          <h2 className="mt-3 text-[clamp(1.8rem,5vw,3.6rem)] font-bold tracking-tight leading-[1.02]">
            Meet your coaches.
          </h2>
          <p className="mt-2 max-w-lg font-mono text-xs uppercase tracking-wider text-muted/60">
            Certified. Branch-based. Ready when you are.
          </p>
        </div>
      </ScrollReveal>

      {/* Cards */}
      <div className="mx-auto mt-12 grid max-w-[1440px] grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16 lg:gap-6">
        {trainers.map((trainer, i) => (
          <div
            key={trainer.id}
            style={{ animationDelay: stagger(i, 120) }}
            className="group relative flex flex-col overflow-hidden rounded-sm border border-bone/10 bg-panel"
          >
            {/* Top accent bar */}
            <span
              className="absolute inset-x-0 top-0 z-10 h-[2px]"
              style={{ backgroundColor: trainer.branchColor }}
            />

            {/* Portrait */}
            <div className="relative h-72 overflow-hidden sm:h-80">
              <img
                src={trainer.image}
                alt={trainer.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent" />

              {/* Branch badge */}
              <span
                className="absolute right-4 top-5 rounded-sm px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink"
                style={{ backgroundColor: trainer.branchColor }}
              >
                {trainer.branch}
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
              {/* Name + role */}
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-bone">
                  {trainer.name}
                </h3>
                <p
                  className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{ color: trainer.branchColor }}
                >
                  {trainer.role}
                </p>
              </div>

              {/* Bio */}
              <p className="text-sm leading-6 text-bone/65">{trainer.bio}</p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5">
                {trainer.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-sm border border-bone/10 bg-bone/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/60"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Footer row */}
              <div className="mt-auto flex items-center justify-between border-t border-bone/10 pt-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted/50">
                  {trainer.certifications}
                </span>
                <span className="font-mono text-[10px] tracking-wide text-bone/40">
                  {trainer.instagram}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA strip */}
      <ScrollReveal animation="fade" delay={300} className="mx-auto mt-12 max-w-[1440px]">
        <div className="flex flex-col items-center gap-4 border border-bone/10 bg-panel/60 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-bold text-bone">Ready to train with a coach?</p>
            <p className="mt-0.5 font-mono text-xs text-muted/60 uppercase tracking-wider">
              Book a free intro session at any branch — no commitment.
            </p>
          </div>
          <a
            href="#pricing"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-em-yellow px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#ffd12e]"
          >
            Get started <span aria-hidden>↗</span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
