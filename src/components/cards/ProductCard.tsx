import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/types";

const statusStyles: Record<string, { dot: string; text: string; bg: string }> = {
  Live: { dot: "bg-status-live", text: "text-status-live", bg: "bg-status-live/10" },
  Beta: { dot: "bg-status-beta", text: "text-status-beta", bg: "bg-status-beta/10" },
  "Coming Soon": { dot: "bg-status-soon", text: "text-status-soon", bg: "bg-status-soon/10" },
};

export function ProductCard({ product }: { product: Product }) {
  const style = product.status ? statusStyles[product.status] : null;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full rounded-2xl bg-bg-elevated/80 border border-border-default hover:border-border-hover hover:bg-bg-subtle hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)] hover:-translate-y-[1px] transition-all duration-200 px-5 py-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <h3 className="font-[family-name:var(--font-display)] text-lg text-text-primary leading-snug">
              {product.name}
            </h3>
            <ArrowUpRight
              size={14}
              className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
            />
          </div>
          <p className="text-[13px] text-text-secondary mt-1.5 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {style && (
          <span className={`shrink-0 inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {product.status}
          </span>
        )}
      </div>
    </a>
  );
}
