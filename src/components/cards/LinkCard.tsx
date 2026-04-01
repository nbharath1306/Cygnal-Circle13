import { renderIcon } from "@/lib/icons";
import type { Link } from "@/data/types";

export function LinkCard({ link }: { link: Link }) {
  const isPrimary = link.isPrimary;

  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`
        group relative flex items-center gap-4 w-full rounded-2xl
        overflow-hidden
        transition-all duration-300 ease-out
        px-5 py-4
        border
        ${
          isPrimary
            ? "border-accent-gold/15 bg-accent-gold/[0.03] hover:bg-accent-gold/[0.06] hover:border-accent-gold/25"
            : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]"
        }
        hover:-translate-y-[1px]
        active:translate-y-0
      `}
    >
      {isPrimary && (
        <div className="absolute inset-0 shimmer pointer-events-none" />
      )}

      {/* Icon */}
      <div
        className={`
          shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          ${isPrimary ? "bg-accent-gold/[0.08]" : "bg-white/[0.04]"}
          transition-all duration-300
        `}
      >
        {renderIcon(link.icon, {
          size: 18,
          className: isPrimary
            ? "text-accent-gold"
            : "text-white/40 group-hover:text-white/70 transition-colors duration-300",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[14px] font-medium block leading-snug text-white/90 group-hover:text-white transition-colors duration-300">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[12px] text-white/30 block mt-0.5 leading-snug group-hover:text-white/40 transition-colors duration-300">
            {link.description}
          </span>
        )}
      </div>

      {/* Arrow */}
      {renderIcon("ArrowUpRight", {
        size: 14,
        className: `
          shrink-0 transition-all duration-300
          ${isPrimary ? "text-accent-gold/40 group-hover:text-accent-gold/70" : "text-white/0 group-hover:text-white/30"}
          group-hover:translate-x-0.5 group-hover:-translate-y-0.5
        `,
      })}
    </a>
  );
}
