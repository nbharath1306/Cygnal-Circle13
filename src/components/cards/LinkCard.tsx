import { renderIcon } from "@/lib/icons";
import type { Link } from "@/data/types";

export function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5 px-4 py-3.5 bg-[#1C1C1E] hover:bg-[#2C2C2E] transition-colors duration-200 active:bg-[#3A3A3C]"
    >
      {/* Icon — Apple rounded rect */}
      <div className="shrink-0 w-[38px] h-[38px] rounded-[10px] flex items-center justify-center bg-[#2C2C2E] group-hover:bg-[#3A3A3C] transition-colors duration-200">
        {renderIcon(link.icon, {
          size: 17,
          className: "text-[#2997FF]",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[15px] font-medium block leading-tight text-[#F5F5F7] tracking-[-0.01em]">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[13px] text-[#86868B] block mt-0.5 leading-tight">
            {link.description}
          </span>
        )}
      </div>

      {/* Chevron — Apple uses this everywhere */}
      <div className="shrink-0">
        {renderIcon("ChevronRight", {
          size: 18,
          className: "text-[#48484A] group-hover:text-[#86868B] transition-colors duration-200",
        })}
      </div>
    </a>
  );
}
