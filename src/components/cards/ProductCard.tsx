import type { Product } from "@/data/types";

const statusColor: Record<string, string> = {
  Live: "text-[#30D158]",
  Beta: "text-[#64D2FF]",
  "Coming Soon": "text-[#FFD60A]",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-row block px-4 py-4"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[15px] font-medium text-white leading-tight tracking-[-0.01em]">
            {product.name}
          </span>
          <p className="text-[12px] text-white/40 mt-0.5 leading-tight">
            {product.tagline}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          {product.status && (
            <span className={`text-[12px] font-medium ${statusColor[product.status] ?? "text-white/40"}`}>
              {product.status}
            </span>
          )}
          {renderChevron()}
        </div>
      </div>
    </a>
  );
}

function renderChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
