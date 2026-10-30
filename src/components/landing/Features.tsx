import { cn } from "../../lib/cn.ts";
import { SectionTag } from "../ui/SectionTag.tsx";
import { ScrollReveal, stagger } from "../ui/ScrollReveal.tsx";

const FEATURES = [
  { num: "01", title: "Strength floor", detail: "plate-loaded racks, cable towers, leg presses — 40+ stations across our branches" },
  { num: "02", title: "Daily Classes", detail: "yoga, HIIT, spinning, boxing — live timetable, walk-in welcome" },
  { num: "03", title: "Floor Coaches", detail: "NPC-certified staff on the floor, not behind a desk" },
  { num: "04", title: "Recovery", detail: "sauna, cold plunge, compression boots, PT suites" },
  { num: "05", title: "One membership", detail: "train at any Emmatos branch with the same membership" },
];

export function Features() {
  return (
    <section
      id="features"
      className={cn("relative scroll-mt-24 px-6 py-20 sm:px-8 lg:px-12 lg:py-28")}
      style={{
        backgroundImage: [
          `linear-gradient(var(--color-bone)/6 1px, transparent 1px)`,
          `linear-gradient(90deg, var(--color-bone)/6 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: "64px 64px",
      }}
    >
      {/* Header */}
      <ScrollReveal animation="slide-left">
        <div className={cn("mx-auto flex max-w-[1440px] flex-col")}>
          <SectionTag num="03" label="The Emmatos experience" />
          <h2
            className={cn(
              "mt-3 text-[clamp(1.8rem,5vw,3.2rem)] font-bold tracking-tight",
            )}
          >
            The rig.
          </h2>
          <p className={cn("mt-1.5 max-w-lg font-mono text-xs uppercase tracking-wider text-muted/60")}>
            Everything you need to push harder.
          </p>
        </div>
      </ScrollReveal>

      {/* Feature rows */}
      <div className={cn("mx-auto mt-10 max-w-[1440px] divide-y divide-bone/10 lg:mt-14")}>
        {FEATURES.map((f, i) => (
          <div
            key={f.num}
            style={{ animationDelay: stagger(i, 130) }}
            className={cn(
              "group grid grid-cols-[2.25rem_1fr] gap-x-4 gap-y-1 py-5 transition-colors duration-200 hover:bg-bone/[0.02] sm:grid-cols-[3rem_minmax(11rem,.65fr)_1fr] sm:items-baseline sm:gap-x-8 lg:gap-x-12 lg:py-6",
            )}
          >
            {/* Number */}
            <span
              className={cn(
                "row-span-2 font-mono text-xs tracking-wider text-muted/40 transition-colors group-hover:text-em-red sm:row-span-1",
              )}
            >
              #{f.num}
            </span>
            {/* Title */}
            <span className={cn("text-lg font-bold tracking-tight text-bone sm:text-xl")}>
              {f.title}
            </span>
            {/* Detail */}
            <span className={cn("col-start-2 text-sm leading-6 text-bone/60 sm:col-start-auto sm:text-base")}>{f.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}