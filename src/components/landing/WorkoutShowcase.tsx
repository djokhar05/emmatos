import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn.ts";
import { SectionTag } from "../ui/SectionTag.tsx";
import { ScrollReveal } from "../ui/ScrollReveal.tsx";

const WORKOUTS = [
  {
    video: "/videos/strength-session.mp4",
    poster: "/images/strength-session.jpg",
    category: "Strength",
    title: "Build your strength.",
    number: "01",
  },
  {
    video: "/videos/cardio-session.mp4",
    poster: "/images/cardio-session.jpg",
    category: "Conditioning",
    title: "Find your pace.",
    number: "02",
  },
  {
    video: "/videos/coached-session.mp4",
    poster: "/images/coached-session.jpg",
    category: "Coaching",
    title: "Get support that moves you.",
    number: "03",
  },
] as const;

function WorkoutMedia({
  video,
  poster,
}: {
  video: string;
  poster: string;
}) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !mediaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "200px" },
    );
    observer.observe(mediaRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div ref={mediaRef} className="absolute inset-0">
      <img
        src={poster}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {shouldLoad && !prefersReducedMotion && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export function WorkoutShowcase() {
  return (
    <section
      id="training"
      className="scroll-mt-24 border-y border-bone/10 bg-[#111014] px-6 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <ScrollReveal animation="fade">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionTag num="02" label="Training at Emmatos" />
              <h2 className="mt-3 text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.98] tracking-tight">
                Find your kind of strong.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-bone/60 sm:text-base">
              Strength work, cardio and coaching—all under one roof, at any
              Emmatos branch.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-12 lg:gap-6">
          {WORKOUTS.map((workout, index) => (
            <ScrollReveal
              key={workout.number}
              animation="slide-up"
              delay={index * 120}
              className="h-full"
            >
              <article className="group relative min-h-[25rem] h-full overflow-hidden rounded-sm border border-bone/10 bg-panel sm:min-h-[30rem]">
                <WorkoutMedia video={workout.video} poster={workout.poster} />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/5"
                />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="rounded-sm border border-bone/30 bg-ink/35 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/85 backdrop-blur-sm">
                    {workout.category}
                  </span>
                  <span className="font-mono text-xs text-bone/75">
                    {workout.number}
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <div
                    className={cn(
                      "mb-4 h-[2px] w-10 transition-all duration-300 group-hover:w-16",
                      index === 0 && "bg-em-red",
                      index === 1 && "bg-em-yellow",
                      index === 2 && "bg-em-blue",
                    )}
                  />
                  <h3 className="max-w-[13ch] text-2xl font-bold leading-tight tracking-tight text-bone sm:text-3xl">
                    {workout.title}
                  </h3>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/55">
                    One Emmatos membership · three branches
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
