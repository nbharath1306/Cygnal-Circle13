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
      className="group block px-4 py-4 bg-[#1C1C1E] hover:bg-[#2C2C2E] transition-colors duration-200 active:bg-[#3A3A3C]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[15px] font-medium text-[#F5F5F7] leading-tight tracking-[-0.01em]">
            {product.name}
          </span>
          <p className="text-[13px] text-[#86868B] mt-0.5 leading-tight">
            {product.tagline}
          </p>
        </div>
        {product.status && (
          <span className={`shrink-0 text-[13px] font-medium ${statusColor[product.status] ?? "text-[#86868B]"}`}>
            {product.status}
          </span>
        )}
      </div>
    </a>
  );
}
