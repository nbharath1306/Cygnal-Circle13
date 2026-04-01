"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import type { Product } from "@/data/types";

const statusColor: Record<string, string> = {
  Live: "text-[#30D158]",
  Beta: "text-[#64D2FF]",
  "Coming Soon": "text-[#FFD60A]",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <GlassCard
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="px-5 py-4"
    >
      <div className="flex-1 flex items-center justify-between gap-3 w-full">
        <div className="min-w-0 flex-1">
          <span className="text-[15px] font-medium text-white/90 leading-tight tracking-[0.01em]">
            {product.name}
          </span>
          <p className="text-[12px] text-white/35 mt-0.5 leading-tight font-light">
            {product.tagline}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          {product.status && (
            <span className={`text-[12px] font-medium ${statusColor[product.status] ?? "text-white/35"}`}>
              {product.status}
            </span>
          )}
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1 1L6 6L1 11" stroke="rgba(255,255,255,0.20)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </GlassCard>
  );
}
