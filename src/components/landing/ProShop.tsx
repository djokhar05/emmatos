import { cn } from "../../lib/cn.ts";
import { naira } from "../../lib/format.ts";
import { SectionTag } from "../ui/SectionTag.tsx";
import { ScrollReveal, stagger } from "../ui/ScrollReveal.tsx";
import { products, type Product } from "../../data/products.ts";

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <div
      key={product.id}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm",
        "bg-panel border border-bone/10",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
      )}
      style={{ animationDelay: stagger(index, 100) }}
    >
      <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-ink">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className={cn("flex flex-col gap-1.5 p-3.5")}>
        {/* Name + price */}
        <div className={cn("flex items-baseline justify-between gap-2")}>
          <span className={cn("text-sm font-bold tracking-tight text-bone truncate")}>
            {product.name}
          </span>
          <span className={cn("font-mono text-xs tracking-wider tabular-nums text-bone shrink-0")}>
            {naira(product.price)}
          </span>
        </div>

        {/* Tagline */}
        <p className={cn("text-2xs leading-snug text-bone/60 line-clamp-2")}>
          {product.tagline}
        </p>

        {/* Category badge */}
        <span className={cn(
          "inline-flex self-start mt-0.5 rounded-sm border font-mono text-2xs uppercase tracking-wider px-1.5 py-0.5",
          product.category === "Strength" ? "border-em-red/20 text-em-red/70" :
          product.category === "Combat" || product.category === "Cardio" ? "border-em-blue/20 text-em-blue/70" :
          "border-bone/20 text-bone/60",
        )}>
          {product.category}
        </span>
      </div>
    </div>
  );
}

export function ProShop() {
  return (
    <section id="proshop" className={cn("scroll-mt-24 px-6 py-20 sm:px-8 lg:px-12 lg:py-28")}>
      {/* Header */}
      <ScrollReveal animation="fadeInUp">
        <div className={cn("mx-auto flex flex-col items-center text-center")}>
          <SectionTag num="04" label="Pro Shop" />
          <h2 className={cn("mt-3 text-[clamp(1.8rem,5vw,3.2rem)] font-bold tracking-tight")}>
            Gear up.
          </h2>
          <p className={cn("mt-1.5 max-w-lg font-mono text-xs uppercase tracking-wider text-muted/60")}>
            Train harder with gear you can trust.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid */}
      <div className={cn(
        "mx-auto mt-10 grid max-w-[1440px]",
        "grid-cols-2 gap-3",
        "sm:grid-cols-3 sm:gap-4",
        "lg:grid-cols-5 lg:gap-4",
      )}>
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {/* Footnote */}
      <p className={cn("mx-auto mt-6 max-w-[1440px] text-center font-mono text-2xs uppercase tracking-wider text-muted/50")}>
        Available at all branch front desks &middot; Member prices may vary
      </p>
    </section>
  );
}