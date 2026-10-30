import { cn } from "../lib/cn.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSignedInMember, memberSignOut } from "../lib/auth-member.ts";
import { ProfileCard } from "../components/member/ProfileCard.tsx";
import { StatsPanel } from "../components/member/StatsPanel.tsx";
import { CheckInPanel } from "../components/member/CheckInPanel.tsx";
import { BillingCard } from "../components/member/BillingCard.tsx";
import { ClassSchedule } from "../components/member/ClassSchedule.tsx";
import { BranchInfo } from "../components/member/BranchInfo.tsx";
import { Logomark } from "../components/Logomark.tsx";

export function MemberDashboard() {
  const nav = useNavigate();
  const member = getSignedInMember();
  const [now] = useState(() => Date.now());

  useEffect(() => {
    if (!member) nav("/member/login");
  }, [member, nav]);

  if (!member) return null;

  const daysSinceJoining = () => {
    const [y, m, d] = member.memberSince.split("-").map(Number);
    return Math.floor((now - new Date(y, m - 1, d).getTime()) / 86400000);
  };

  const firstName = member.name.split(" ")[0];
  const hour = new Date(now).getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Intl.DateTimeFormat("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(now));

  return (
    <div className={cn("relative min-h-screen overflow-hidden bg-ink text-bone")}>
      <div className={cn("pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(33,70,243,0.16),transparent_48%)]")} />
      <header className={cn("relative z-10 border-b border-bone/8 bg-ink/80 backdrop-blur-xl")}>
        <div className={cn("mx-auto flex max-w-[1240px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8")}>
          <div className={cn("flex items-center gap-4")}>
            <a href="/" className={cn("rounded-sm focus-visible:outline-2 focus-visible:outline-em-yellow")} aria-label="Emmatos Fitness home">
              <Logomark size={32} withDescriptor={false} />
            </a>
            <span className={cn("hidden h-8 w-px bg-bone/10 sm:block")} />
            <div className={cn("hidden sm:block")}>
              <span className={cn("block font-mono text-[9px] uppercase tracking-[0.2em] text-muted/50")}>Member portal</span>
              <span className={cn("mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-bone/80")}>Training dashboard</span>
            </div>
          </div>
          <div className={cn("flex items-center gap-3 sm:gap-5")}>
            <span className={cn("hidden font-mono text-[10px] uppercase tracking-[0.12em] text-muted/55 md:block")}>Lagos · Nigeria</span>
            <a href="/" className={cn("font-mono text-[10px] uppercase tracking-[0.12em] text-muted/60 transition-colors hover:text-bone")}>Website</a>
            <button
              onClick={() => { memberSignOut(); nav("/member/login"); }}
              className={cn("rounded-sm border border-bone/12 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-bone/70 transition hover:border-em-yellow/50 hover:text-em-yellow cursor-pointer")}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className={cn("relative mx-auto flex w-full max-w-[1240px] flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:gap-6 lg:px-8")}
        style={{ animation: "enter-slide-up 800ms 0.1s both" }}
      >
        <div className={cn("flex flex-wrap items-end justify-between gap-3")}>
          <div>
            <span className={cn("font-mono text-[10px] uppercase tracking-[0.22em] text-em-yellow")}>{today} <span className="text-muted/30">/</span> Member space</span>
            <p className={cn("mt-2 text-2xl font-bold tracking-tight text-bone sm:text-3xl")}>{greeting}, {firstName}.</p>
            <p className={cn("mt-1 text-sm text-muted/65")}>Your training, membership and branch updates at a glance.</p>
          </div>
          <span className={cn("inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-300/90")}>
            <span className={cn("h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300")} />
            Member space active
          </span>
        </div>

        <ProfileCard member={member} />
        <StatsPanel checkInsMonth={member.checkInsMonth} daysSinceJoining={daysSinceJoining()} />

        <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.85fr] lg:gap-5")}>
          <CheckInPanel member={member} />
          <BillingCard member={member} />
        </div>

        <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5")}>
          <ClassSchedule />
          <BranchInfo member={member} />
        </div>
        <footer className={cn("flex flex-wrap items-center justify-between gap-2 border-t border-bone/8 pt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/35")}>
          <span>One Emmatos · Three Lagos branches</span>
          <span>Built for your next rep</span>
        </footer>
      </main>
    </div>
  );
}