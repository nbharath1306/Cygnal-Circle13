import { renderIcon } from "@/lib/icons";
import type { Link } from "@/data/types";

export function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group card-premium px-5 py-5 flex items-center gap-4"
    >
      {/* Icon — visible, warm on hover */}
      <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.04] group-hover:bg-[#D4B87A]/[0.08] border border-white/[0.03] group-hover:border-[#D4B87A]/15 transition-all duration-500">
        {renderIcon(link.icon, {
          size: 18,
          className: "text-white/30 group-hover:text-[#D4B87A] transition-colors duration-500",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[14px] font-semibold block leading-snug text-white/80 group-hover:text-white transition-colors duration-400 tracking-[0.01em]">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[11.5px] text-white/20 block mt-1 leading-snug group-hover:text-white/35 transition-colors duration-400">
            {link.description}
          </span>
        )}
      </div>

      {/* Arrow — appears on hover */}
      <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-transparent group-hover:bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {renderIcon("ArrowUpRight", {
          size: 13,
          className: "text-[#D4B87A]/60",
        })}
      </div>
    </a>
  );
}
