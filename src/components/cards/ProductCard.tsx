import type { Product } from "@/data/types";

const statusColors: Record<string, string> = {
  Live: "bg-status-live/10 text-status-live",
  Beta: "bg-status-beta/10 text-status-beta",
  "Coming Soon": "bg-status-soon/10 text-status-soon",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full rounded-xl bg-bg-elevated border border-border-default hover:border-border-hover hover:bg-bg-subtle transition-all duration-150 px-5 py-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-display)] text-lg text-text-primary">
            {product.name}
          </h3>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {product.status && (
          <span
            className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[product.status] ?? "bg-bg-subtle text-text-tertiary"}`}
          >
            {product.status}
          </span>
        )}
      </div>
    </a>
  );
}
