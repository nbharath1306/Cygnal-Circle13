import { renderIcon } from "@/lib/icons";
import type { Product } from "@/data/types";

const statusColor: Record<string, string> = {
  Live: "text-emerald-400/70",
  Beta: "text-blue-400/70",
  "Coming Soon": "text-[#D4B87A]/70",
};
const dotColor: Record<string, string> = {
  Live: "bg-emerald-400",
  Beta: "bg-blue-400",
  "Coming Soon": "bg-[#D4B87A]",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group card-premium px-5 py-5 block"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <h3 className="font-[family-name:var(--font-display)] text-[15px] text-white/80 group-hover:text-white transition-colors duration-400 leading-snug">
              {product.name}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500">
              {renderIcon("ArrowUpRight", { size: 11, className: "text-[#D4B87A]/50" })}
            </div>
          </div>
          <p className="text-[11.5px] text-white/20 mt-2 leading-relaxed group-hover:text-white/35 transition-colors duration-400">
            {product.tagline}
          </p>
        </div>
        {product.status && (
          <div className={`shrink-0 flex items-center gap-1.5 ${statusColor[product.status] ?? "text-white/30"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor[product.status] ?? "bg-white/20"}`} />
            <span className="text-[8px] font-bold uppercase tracking-[0.12em]">
              {product.status}
            </span>
          </div>
        )}
      </div>
    </a>
  );
}
