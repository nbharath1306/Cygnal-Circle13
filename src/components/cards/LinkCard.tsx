"use client";

import { renderIcon } from "@/lib/icons";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Link } from "@/data/types";

export function LinkCard({ link }: { link: Link }) {
  return (
    <GlassCard
      as="a"
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="gap-3.5 px-5 py-4"
    >
      {/* Icon */}
      <div className="shrink-0 w-[38px] h-[38px] rounded-[12px] flex items-center justify-center bg-white/[0.06]">
        {renderIcon(link.icon, {
          size: 18,
          className: "text-[#2997FF]",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[15px] font-medium block leading-tight text-white/90">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[12px] text-white/35 block mt-0.5 leading-tight font-light">
            {link.description}
          </span>
        )}
      </div>

      {/* Chevron */}
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="shrink-0">
        <path d="M1 1L6 6L1 11" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </GlassCard>
  );
}
