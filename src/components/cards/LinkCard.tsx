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
        transition-all duration-400 ease-out
        px-5 py-[18px]
        hover:-translate-y-[2px]
        hover:shadow-[0_8px_40px_-12px_rgba(139,92,246,0.12)]
        active:translate-y-0 active:scale-[0.99]
      "
    >
      <div className="absolute inset-0 shimmer-card pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

      {/* Icon */}
      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] group-hover:bg-gradient-to-br group-hover:from-violet-500/10 group-hover:to-pink-500/5 transition-all duration-400">
        {renderIcon(link.icon, {
          size: 17,
          className: "text-white/30 group-hover:text-white/80 transition-colors duration-400",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[14px] font-medium block leading-snug text-white/80 group-hover:text-white transition-colors duration-400">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[11px] text-white/25 block mt-0.5 leading-snug group-hover:text-white/40 transition-colors duration-400">
            {link.description}
          </span>
        )}
      </div>

      {/* Arrow */}
      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {renderIcon("ArrowUpRight", {
          size: 13,
          className: "text-violet-300/50",
        })}
      </div>
    </a>
  );
}
