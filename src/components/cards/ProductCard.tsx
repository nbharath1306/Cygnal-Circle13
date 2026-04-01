import { renderIcon } from "@/lib/icons";
import type { Product } from "@/data/types";

const statusColor: Record<string, string> = {
  Live: "text-emerald-400/60",
  Beta: "text-blue-400/60",
  "Coming Soon": "text-white/30",
};

const dotColor: Record<string, string> = {
  Live: "bg-emerald-400/60",
  Beta: "bg-blue-400/60",
  "Coming Soon": "bg-white/25",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative block w-full rounded-2xl overflow-hidden
        bg-white/[0.02] hover:bg-white/[0.05]
        border border-white/[0.04] hover:border-white/[0.08]
        transition-all duration-500 ease-out
        px-5 py-5
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-[15px] text-white/80 group-hover:text-white transition-colors duration-500 leading-snug italic">
              {product.name}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500">
              {renderIcon("ArrowUpRight", { size: 11, className: "text-white/25" })}
            </div>
          </div>
          <p className="text-[11px] text-white/20 mt-1.5 leading-relaxed group-hover:text-white/35 transition-colors duration-500">
            {product.tagline}
          </p>
        </div>

        {product.status && (
          <span className={`shrink-0 inline-flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] ${statusColor[product.status] ?? "text-white/25"}`}>
            <span className={`w-1 h-1 rounded-full ${dotColor[product.status] ?? "bg-white/20"}`} />
            {product.status}
          </span>
        )}
      </div>
    </a>
  );
}
