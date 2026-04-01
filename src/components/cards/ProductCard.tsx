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
      className="group material-row flex items-center gap-[14px] px-[16px] py-[14px] min-h-[52px]"
    >
      {/* Icon badge — purple gradient like App Store */}
      <div className="shrink-0 w-[32px] h-[32px] rounded-[8px] flex items-center justify-center bg-gradient-to-b from-[#5E5CE6] to-[#4840C8] shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <span
          className="text-[17px] font-normal block leading-[22px] text-[#F5F5F7]"
          style={{ letterSpacing: "-0.408px" }}
        >
          {product.name}
        </span>
        <span
          className="text-[15px] text-[#86868B] block mt-[2px] leading-[20px]"
          style={{ letterSpacing: "-0.24px" }}
        >
          {product.tagline}
        </span>
      </div>

      <div className="shrink-0 flex items-center gap-[10px]">
        {product.status && (
          <span
            className={`text-[15px] font-normal ${statusColor[product.status] ?? "text-[#86868B]"}`}
            style={{ letterSpacing: "-0.24px" }}
          >
            {product.status}
          </span>
        )}
        <svg width="8.5" height="13" viewBox="0 0 8.5 13" fill="none">
          <path d="M1.5 1.5L7 6.5L1.5 11.5" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}
