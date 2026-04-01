import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/types";

const statusStyles: Record<string, { dot: string; text: string; bg: string }> = {
  Live: { dot: "bg-status-live", text: "text-status-live", bg: "bg-status-live/10 ring-1 ring-status-live/20" },
  Beta: { dot: "bg-status-beta", text: "text-status-beta", bg: "bg-status-beta/10 ring-1 ring-status-beta/20" },
  "Coming Soon": { dot: "bg-status-soon", text: "text-status-soon", bg: "bg-status-soon/10 ring-1 ring-status-soon/20" },
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
        bg-bg-card border border-border-default
        hover:border-border-hover hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]
        hover:-translate-y-[2px]
        active:translate-y-0 active:scale-[0.995]
        transition-all duration-250 ease-out
        px-5 py-5
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-[17px] text-text-primary leading-snug">
              {product.name}
            </h3>
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="text-text-tertiary/0 group-hover:text-text-tertiary transition-all duration-200 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
          <p className="text-[13px] text-text-secondary mt-1.5 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {style && (
          <span
            className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
            {product.status}
          </span>
        )}
      </div>
    </a>
  );
}
