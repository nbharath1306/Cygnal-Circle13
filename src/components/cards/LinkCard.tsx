import { renderIcon } from "@/lib/icons";
import type { Link } from "@/data/types";

export function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="
        group relative flex items-center gap-4 w-full
        rounded-2xl overflow-hidden
        glass gradient-border
        transition-all duration-500 ease-out
        px-5 py-[18px]
        hover:-translate-y-[2px]
        hover:shadow-[0_12px_48px_-16px_rgba(191,169,122,0.08)]
        active:translate-y-0 active:scale-[0.99]
      "
    >
      <div className="absolute inset-0 shimmer-card pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Icon */}
      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.03] group-hover:bg-[#BFA97A]/[0.06] transition-all duration-500">
        {renderIcon(link.icon, {
          size: 17,
          className: "text-white/25 group-hover:text-[#BFA97A] transition-colors duration-500",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[13.5px] font-medium block leading-snug text-white/75 group-hover:text-white transition-colors duration-500 tracking-wide">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[11px] text-white/18 block mt-1 leading-snug group-hover:text-white/30 transition-colors duration-500">
            {link.description}
          </span>
        )}
      </div>

      {/* Arrow */}
      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {renderIcon("ArrowUpRight", {
          size: 12,
          className: "text-[#BFA97A]/50",
        })}
      </div>
    </a>
  );
}
