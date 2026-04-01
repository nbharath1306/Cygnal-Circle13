import { renderIcon } from "@/lib/icons";
import type { Product } from "@/data/types";

const statusColor: Record<string, string> = {
  Live: "text-emerald-300/70",
  Beta: "text-blue-300/70",
  "Coming Soon": "text-amber-300/70",
};

const dotColor: Record<string, string> = {
  Live: "bg-emerald-400",
  Beta: "bg-blue-400",
  "Coming Soon": "bg-amber-400",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative block w-full rounded-2xl overflow-hidden
        glass gradient-border
        transition-all duration-400 ease-out
        px-5 py-5
        hover:-translate-y-[2px]
        hover:shadow-[0_8px_40px_-12px_rgba(139,92,246,0.12)]
        active:translate-y-0 active:scale-[0.99]
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-[15px] text-white/80 group-hover:text-white transition-colors duration-400 leading-snug">
              {product.name}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-400">
              {renderIcon("ArrowUpRight", { size: 11, className: "text-violet-300/50" })}
            </div>
          </div>
          <p className="text-[11px] text-white/25 mt-1.5 leading-relaxed group-hover:text-white/40 transition-colors duration-400">
            {product.tagline}
          </p>
        </div>

        {product.status && (
          <span className={`shrink-0 inline-flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] ${statusColor[product.status] ?? "text-white/30"}`}>
            <span className={`w-1 h-1 rounded-full ${dotColor[product.status] ?? "bg-white/30"}`} />
            {product.status}
          </span>
        )}
      </div>
    </a>
  );
}
