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
      className="group card-premium block px-5 py-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-medium text-[#F5F5F7] leading-tight tracking-[-0.01em] group-hover:text-white transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-[12px] text-[#86868B] mt-1.5 leading-relaxed">
            {product.tagline}
          </p>
        </div>
        {product.status && (
          <span className={`shrink-0 text-[11px] font-medium ${statusColor[product.status] ?? "text-[#86868B]"}`}>
            {product.status}
          </span>
        )}
      </div>
    </a>
  );
}
