import { renderIcon } from "@/lib/icons";
import type { Link } from "@/data/types";

export function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group card-premium flex items-center gap-4 px-5 py-[18px]"
    >
      {/* Icon */}
      <div className="shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center bg-white/[0.05] group-hover:bg-[#2997FF]/10 transition-all duration-300">
        {renderIcon(link.icon, {
          size: 18,
          className: "text-[#86868B] group-hover:text-[#2997FF] transition-colors duration-300",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[15px] font-medium block leading-tight text-[#F5F5F7] tracking-[-0.01em]">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[12px] text-[#86868B] block mt-1 leading-tight">
            {link.description}
          </span>
        )}
      </div>

      {/* Arrow */}
      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5">
        {renderIcon("ChevronRight", {
          size: 16,
          className: "text-[#48484A] group-hover:text-[#86868B] transition-colors duration-300",
        })}
      </div>
    </a>
  );
}
