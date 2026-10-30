import { useEffect, useRef, useState, type FocusEvent } from "react";
import { totalActive } from "../../data/revenue.ts";
import { branches } from "../../data/branches.ts";
import { useCountUp } from "../../lib/useCountUp.ts";

const HERO_SLIDES = [
  {
    image: "/images/hero-training-poster.jpg",
    video: "/videos/hero-training.mp4",
    alt: "An athlete performing a bench press in a gym",
    eyebrow: "Emmatos Fitness · Lagos",
    title: "Make room for more.",
  },
  {
    image: "/images/strength-training.jpg",
    video: null,
    alt: "An athlete preparing for a barbell deadlift",
    eyebrow: "One brand · three branches",
    title: "Built one rep at a time.",
  },
  {
    image: "/images/fitness-floor.jpg",
    video: null,
    alt: "An athlete training with dumbbells on the gym floor",
    eyebrow: "Your next session starts here",
    title: "Show up for yourself.",
  },
] as const;

export function Hero() {
  const memberTotal = totalActive();
  const animatedMembers = useCountUp(memberTotal, true, 1800);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (isPaused || isFocused || prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, [isFocused, isPaused, prefersReducedMotion]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (activeSlide === 0 && !isPaused && !isFocused && !prefersReducedMotion) {
      void video.play().catch((error: unknown) => {
        if (
          error instanceof DOMException &&
          (error.name === "NotAllowedError" || error.name === "AbortError")
        ) {
          return;
        }
        console.error("Unable to play the Emmatos hero video.", error);
      });
    } else {
      video.pause();
    }
  }, [activeSlide, isFocused, isPaused, prefersReducedMotion]);

  const showSlide = (index: number) => {
    setActiveSlide((index + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const shouldPlayHeroVideo =
    activeSlide === 0 && !isPaused && !isFocused && !prefersReducedMotion;

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false);
    }
  };

  return (
    <section
      data-section="hero"
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink"
      role="region"
      aria-label="Emmatos training highlights"
      aria-roledescription="carousel"
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={handleBlur}
    >
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className="absolute inset-0"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${HERO_SLIDES.length}: ${slide.title}`}
          aria-hidden={index !== activeSlide}
        >
          <img
            src={slide.image}
            alt={index === activeSlide ? slide.alt : ""}
            fetchPriority={index === 0 ? "high" : "auto"}
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${
              index === activeSlide ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
            }`}
          />
          {slide.video && !prefersReducedMotion && (
            <video
              ref={heroVideoRef}
              autoPlay={shouldPlayHeroVideo}
              muted
              loop
              playsInline
              preload="auto"
              poster={slide.image}
              aria-hidden="true"
              tabIndex={-1}
              onPlaying={() => setIsVideoReady(true)}
              onWaiting={() => setIsVideoReady(false)}
              onError={() => {
                setIsVideoReady(false);
                console.error("Unable to load the Emmatos hero video.");
              }}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-out motion-reduce:transition-none ${
                index === activeSlide && isVideoReady
                  ? "scale-100 opacity-100"
                  : "scale-[1.04] opacity-0"
              }`}
            >
              <source src={slide.video} type="video/mp4" />
            </video>
          )}
        </div>
      ))}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,10,12,.9) 0%, rgba(11,10,12,.72) 42%, rgba(11,10,12,.25) 100%), linear-gradient(0deg, rgba(11,10,12,.92) 0%, rgba(11,10,12,.08) 58%, rgba(11,10,12,.38) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1536px] flex-col justify-end px-6 pb-8 pt-28 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
        <div className="hero-reveal max-w-3xl">
          <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/75 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-em-yellow" />
            Lagos, Nigeria <span className="text-bone/35">/</span> Est. 2008
          </p>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-em-yellow sm:mt-7 sm:text-xs">
            {HERO_SLIDES[activeSlide].eyebrow}
          </p>
          <h1 className="mt-3 text-[clamp(3.5rem,8vw,7.5rem)] font-extrabold leading-[0.86] tracking-[-0.075em]">
            ONE BRAND.
            <br />
            <span className="text-em-yellow text-[0.76em] sm:text-[0.86em]">THREE BRANCHES.</span>
          </h1>
          <div className="mt-5 flex h-1 w-44 overflow-hidden rounded-full sm:mt-6 sm:w-56">
            <span className="flex-1 bg-em-yellow" />
            <span className="flex-1 bg-em-red" />
            <span className="flex-1 bg-em-blue" />
          </div>

          <p className="mt-5 max-w-xl text-sm leading-6 text-bone/80 sm:mt-6 sm:text-lg sm:leading-8">
            Your training doesn&apos;t stay in one place. One Emmatos Fitness
            membership gives you access to all three branches across Lagos.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <a
              href="#pricing"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-em-yellow px-6 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#ffd12e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-em-yellow"
              style={{ animation: "pulse-glow 2.4s ease-in-out infinite" }}
            >
              Find your membership
              <span aria-hidden>↗</span>
            </a>
            <a
              href="#branches"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-bone/40 bg-ink/20 px-6 font-mono text-[11px] uppercase tracking-[0.16em] text-bone transition hover:border-bone hover:bg-ink/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-em-yellow"
            >
              Explore the branches
            </a>
          </div>
        </div>

        <div className="hero-reveal mt-8 flex flex-col gap-5 border-t border-bone/30 pt-4 sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:pt-5">
          <div className="grid max-w-lg grid-cols-3 gap-4 sm:gap-8">
            <div>
              <span className="font-mono text-2xl font-bold tabular-nums sm:text-3xl">
                {branches.length}
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-bone/65 sm:text-[10px] sm:tracking-[0.18em]">
                Branches
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl font-bold tabular-nums sm:text-3xl">
                {Math.floor(animatedMembers).toLocaleString()}
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-bone/65 sm:text-[10px] sm:tracking-[0.18em]">
                Active members
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl font-bold tabular-nums sm:text-3xl">
                5,900+
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-bone/65 sm:text-[10px] sm:tracking-[0.18em]">
                Monthly check-ins
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-5 sm:justify-end">
            <div className="flex items-center gap-2" aria-label="Choose a slide">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${slide.title}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                  onClick={() => showSlide(index)}
                  className="group/dot flex h-8 items-center focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-em-yellow"
                >
                  <span
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeSlide
                        ? "w-8 bg-em-yellow"
                        : "w-3 bg-bone/60 group-hover/dot:bg-bone"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-1 font-mono text-[9px] tracking-[0.18em] text-bone/75">
                0{activeSlide + 1} <span className="text-bone/50">/</span> 0{HERO_SLIDES.length}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => showSlide(activeSlide - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/50 bg-ink/20 text-lg text-bone transition hover:border-em-yellow hover:bg-em-yellow hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-em-yellow"
              >
                <span aria-hidden>←</span>
              </button>
              <button
                type="button"
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                aria-pressed={isPaused}
                onClick={() => setIsPaused((paused) => !paused)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/50 bg-ink/20 text-xs text-bone transition hover:border-em-yellow hover:bg-em-yellow hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-em-yellow"
              >
                <span aria-hidden>{isPaused ? "▶" : "Ⅱ"}</span>
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => showSlide(activeSlide + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/50 bg-ink/20 text-lg text-bone transition hover:border-em-yellow hover:bg-em-yellow hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-em-yellow"
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
