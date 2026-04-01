import { renderIcon } from "@/lib/icons";
import type { Link } from "@/data/types";

export function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group glass-row flex items-center gap-3.5 px-4 py-3.5"
    >
      {/* Icon */}
      <div className="shrink-0 w-[36px] h-[36px] rounded-[10px] flex items-center justify-center bg-white/[0.06]">
        {renderIcon(link.icon, {
          size: 17,
          className: "text-[#0A84FF]",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[15px] font-medium block leading-tight text-white tracking-[-0.01em]">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[12px] text-white/40 block mt-0.5 leading-tight">
            {link.description}
          </span>
        )}
      </div>

      {/* Chevron */}
      <div className="shrink-0">
        {renderIcon("ChevronRight", {
          size: 16,
          className: "text-white/20 group-hover:text-white/40 transition-colors duration-200",
        })}
      </div>
    </a>
  );
}
