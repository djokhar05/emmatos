import { cn } from "../../lib/cn.ts";
import { useBranch } from "../../lib/store.tsx";
import { SectionTag } from "../ui/SectionTag.tsx";
import { branches, branchesMeta } from "../../data/branches.ts";
import { ScrollReveal, stagger } from "../ui/ScrollReveal.tsx";

const branchImages = {
  alagbado: "/images/club-floor.jpg",
  ipaja: "/images/strength-training.jpg",
  isashi: "/images/fitness-floor.jpg",
};

export function BranchCards() {
  const { branch, set } = useBranch();
  const activeBranch = branches.find((b) => b.id === (branch === "all" ? "alagbado" : branch))!;

  return (
    <section id="branches" className={cn("relative scroll-mt-24 px-6 py-20 sm:px-8 lg:px-12 lg:py-28")}>
      {/* Section header */}
      <ScrollReveal animation="zoomIn">
        <div className={cn("flex flex-col items-center text-center")}>
          <SectionTag num="01" label="Branches" />
          <h2 className={cn("mt-3 text-[clamp(1.8rem,5vw,3.6rem)] font-bold tracking-tight leading-[1.02]")}>
            Find your floor.
          </h2>
          <p className={cn("mt-2 max-w-lg font-mono text-xs uppercase tracking-wider text-muted/60")}>
            One Emmatos membership. Three Lagos branches.
          </p>
        </div>
      </ScrollReveal>

      {/* Branch cards grid */}
      <div className={cn("mx-auto mt-10 grid max-w-[1440px] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-14 lg:gap-6")}>
        {branches.map((b, i) => {
          const selected = activeBranch.id === b.id;
          const meta = branchesMeta[b.id];
          return (
            <button
              key={b.id}
              aria-label={`Select ${b.name} branch`}
              className={cn(
                "group relative flex min-h-52 flex-col items-start overflow-hidden rounded-sm border text-left cursor-pointer transition-all duration-300 sm:min-h-64",
                "bg-panel border-bone/10",
                selected && "ring-1 ring-offset-2",
                "hover:-translate-y-0.5 hover:shadow-md",
              )}
style={{
                animationDelay: stagger(i, 150),
                borderColor: selected ? b.color : undefined,
                boxShadow: selected ? `0 0 0 1px ${b.color}` : undefined,
              }}
onClick={() => set(b.id)}
            >
              <img
                src={branchImages[b.id]}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: b.color }}
              />
              <span className="absolute right-4 top-4 rounded-sm border border-bone/25 bg-ink/40 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/75 backdrop-blur-sm">
                0{branches.indexOf(b) + 1} / Branch
              </span>

              <div className="relative mt-auto w-full p-5 text-bone sm:p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/60">{meta.zone}</span>
                <span className="mt-1 block text-2xl font-extrabold tracking-tight sm:text-3xl">{b.name}</span>
                <p className="mt-1 text-sm text-bone/75">{meta.tagline}</p>
                <div className="mt-4 flex items-center justify-between border-t border-bone/30 pt-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-bone/70">{b.features.length} training highlights</span>
                  {b.capacity && <span className="font-mono text-[10px] uppercase tracking-wider text-bone/70">Capacity {b.capacity}</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Club sheet — detail panel */}
      <div className={cn("mx-auto mt-10 max-w-[1440px] border-t border-bone/10 py-8 lg:mt-14 lg:py-10")} style={{ borderTopColor: activeBranch.color }}>
        <div className={cn("flex flex-wrap items-start gap-6 lg:gap-10")}>
          {/* Left: info */}
          <div className={cn("min-w-0 flex-1")}>
            <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50")}>
              Emmatos Branch &bull; {activeBranch.name}
            </span>
            <h3 className={cn("mt-2 text-3xl font-extrabold tracking-tight text-bone")}>{activeBranch.name}</h3>
            <p className={cn("mt-1 text-sm leading-snug text-bone/70")}>{activeBranch.tagline}</p>

            <span className={cn("mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1")}>
              <span className={cn("font-mono text-[10px] uppercase tracking-wider text-em-red/70")}>Address</span>
              <span className={cn("text-sm text-bone/80")}>{activeBranch.address}</span>
            </span>
            <span className={cn("mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1")}>
              <span className={cn("font-mono text-[10px] uppercase tracking-wider text-em-red/70")}>Phone</span>
              <span className={cn("text-sm text-bone/80")}>{activeBranch.phone}</span>
            </span>
            <span className={cn("mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1")}>
              <span className={cn("font-mono text-[10px] uppercase tracking-wider text-em-red/70")}>Hours</span>
              <span className={cn("text-sm text-bone/80")}>{activeBranch.hours}</span>
            </span>
          </div>

          {/* Right: features list */}
          <div className={cn("w-full min-w-0 lg:flex-1")}>
            <span className={cn("font-mono text-2xs uppercase tracking-wider text-muted/50 block")}>What&rsquo;s inside</span>
            <ul className={cn("mt-3 grid grid-cols-1 gap-3")}>
              {activeBranch.features.map((f, i) => (
                <li key={i} className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-bone/10 py-2.5")}>
                  <span className={cn("font-mono text-xs tracking-wider text-muted/50")}>#{i + 1}</span>
                  <span className={cn("font-bold text-sm text-bone")}>{f.label}</span>
                  <span className={cn("text-xs text-bone/60 font-mono uppercase tracking-wider")}>{f.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}