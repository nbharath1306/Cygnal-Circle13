import { renderIcon } from "@/lib/icons";
import type { Product } from "@/data/types";

const statusStyles: Record<string, { dot: string; text: string }> = {
  Live: { dot: "bg-emerald-400", text: "text-emerald-400/80" },
  Beta: { dot: "bg-blue-400", text: "text-blue-400/80" },
  "Coming Soon": { dot: "bg-accent-gold", text: "text-accent-gold/80" },
};

export function ProductCard({ product }: { product: Product }) {
  const style = product.status ? statusStyles[product.status] : null;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative block w-full rounded-2xl overflow-hidden
        border border-white/[0.06] bg-white/[0.02]
        hover:bg-white/[0.04] hover:border-white/[0.1]
        hover:-translate-y-[1px]
        active:translate-y-0
        transition-all duration-300 ease-out
        px-5 py-5
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-[16px] text-white/90 group-hover:text-white transition-colors duration-300 leading-snug">
              {product.name}
            </h3>
            {renderIcon("ArrowUpRight", {
              size: 12,
              className:
                "text-white/0 group-hover:text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            })}
          </div>
          <p className="text-[12px] text-white/30 mt-1.5 leading-relaxed group-hover:text-white/40 transition-colors duration-300">
            {product.tagline}
          </p>
        </div>

        {style && (
          <span
            className={`shrink-0 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${style.text}`}
          >
            <span className={`w-1 h-1 rounded-full ${style.dot}`} />
            {product.status}
          </span>
        )}
      </div>
    </a>
  );
}
