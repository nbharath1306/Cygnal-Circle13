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
      className="group material-row flex items-center gap-3 px-4 py-[13px]"
    >
      {/* Icon placeholder — filled rounded rect like Apple Settings */}
      <div className="shrink-0 w-[30px] h-[30px] rounded-[7px] flex items-center justify-center bg-gradient-to-b from-[#5E5CE6] to-[#4A48C9]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <span
          className="text-[17px] font-normal block leading-[1.29] text-[#F5F5F7]"
          style={{ letterSpacing: "-0.408px" }}
        >
          {product.name}
        </span>
        <span
          className="text-[13px] text-white/40 block mt-px leading-[1.23]"
          style={{ letterSpacing: "-0.08px" }}
        >
          {product.tagline}
        </span>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {product.status && (
          <span className={`text-[13px] font-normal ${statusColor[product.status] ?? "text-white/40"}`} style={{ letterSpacing: "-0.08px" }}>
            {product.status}
          </span>
        )}
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="text-white/20">
          <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}
