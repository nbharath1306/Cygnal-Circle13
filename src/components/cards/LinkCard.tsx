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
        transition-all duration-500 ease-out
        px-5 py-4
        bg-white/[0.02] hover:bg-white/[0.05]
        border border-white/[0.04] hover:border-white/[0.08]
      "
    >
      <div className="absolute inset-0 shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.03] group-hover:bg-white/[0.06] transition-all duration-500">
        {renderIcon(link.icon, {
          size: 17,
          className: "text-white/30 group-hover:text-white/70 transition-colors duration-500",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[14px] font-medium block leading-snug text-white/80 group-hover:text-white transition-colors duration-500">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[11px] text-white/20 block mt-1 leading-snug group-hover:text-white/35 transition-colors duration-500">
            {link.description}
          </span>
        )}
      </div>

      {/* Arrow */}
      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {renderIcon("ArrowUpRight", {
          size: 13,
          className: "text-white/30",
        })}
      </div>
    </a>
  );
}
