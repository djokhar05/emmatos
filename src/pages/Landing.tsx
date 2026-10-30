import { cn } from "../lib/cn.ts";
import { Nav } from "../components/landing/Nav.tsx";
import { Hero } from "../components/landing/Hero.tsx";
import { Marquee } from "../components/Marquee.tsx";
import { BranchCards } from "../components/landing/BranchCards.tsx";
import { WorkoutShowcase } from "../components/landing/WorkoutShowcase.tsx";
import { Features } from "../components/landing/Features.tsx";
import { ProShop } from "../components/landing/ProShop.tsx";
import { Pricing } from "../components/landing/Pricing.tsx";
import { Footer } from "../components/landing/Footer.tsx";
import { BRANCH_COLORS, branchesMeta } from "../data/branches.ts";

const marqueeItems = (() => {
  const items: { label: string; color?: string }[] = [];
  ["alagbado", "ipaja", "isashi"].forEach((id) => {
    items.push({ label: `${branchesMeta[id].name}`, color: BRANCH_COLORS[id] });
    items.push({ label: "₦15,000 / MONTH" });
  });
  items.push({ label: "ONE BRAND" });
  items.push({ label: "THREE BRANCHES" });
  items.push({ label: "LAGOS" });
  return items;
})();

export function Landing() {
  return (
    <div className={cn("flex flex-col min-h-screen")}>
      <Nav />
      <main className={cn("flex-1")}>
        <Hero />
        <Marquee items={marqueeItems} itemClassName="text-ink" className="bg-em-yellow/90 border-transparent" />
        <BranchCards />
        <WorkoutShowcase />
        <Features />
        <Pricing />
        <ProShop />
      </main>
      <Footer />
    </div>
  );
}