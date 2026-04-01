import { renderIcon } from "@/lib/icons";
import type { Product } from "@/data/types";

const statusColor: Record<string, string> = {
  Live: "text-emerald-400/60",
  Beta: "text-blue-400/60",
  "Coming Soon": "text-[#BFA97A]/60",
};
const dotColor: Record<string, string> = {
  Live: "bg-emerald-400",
  Beta: "bg-blue-400",
  "Coming Soon": "bg-[#BFA97A]",
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
        transition-all duration-500 ease-out
        px-5 py-5
        hover:-translate-y-[2px]
        hover:shadow-[0_12px_48px_-16px_rgba(191,169,122,0.08)]
        active:translate-y-0 active:scale-[0.99]
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-[14px] text-white/75 group-hover:text-white transition-colors duration-500 leading-snug">
              {product.name}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500">
              {renderIcon("ArrowUpRight", { size: 10, className: "text-[#BFA97A]/40" })}
            </div>
          </div>
          <p className="text-[11px] text-white/18 mt-1.5 leading-relaxed group-hover:text-white/30 transition-colors duration-500">
            {product.tagline}
          </p>
        </div>
        {product.status && (
          <span className={`shrink-0 inline-flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.15em] ${statusColor[product.status] ?? "text-white/30"}`}>
            <span className={`w-1 h-1 rounded-full ${dotColor[product.status] ?? "bg-white/20"}`} />
            {product.status}
          </span>
        )}
      </div>
    </a>
  );
}
