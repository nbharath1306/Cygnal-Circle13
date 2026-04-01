import { renderIcon } from "@/lib/icons";
import type { Link } from "@/data/types";

export function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="
        group material-row flex items-center gap-[14px]
        px-[16px] py-[14px] min-h-[52px]
      "
    >
      {/* Icon badge — Apple Settings: filled rounded rect */}
      <div className="shrink-0 w-[32px] h-[32px] rounded-[8px] flex items-center justify-center bg-[#2997FF] shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
        {renderIcon(link.icon, {
          size: 17,
          className: "text-white",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span
          className="text-[17px] font-normal block leading-[22px] text-[#F5F5F7]"
          style={{ letterSpacing: "-0.408px" }}
        >
          {link.label}
        </span>
        {link.description && (
          <span
            className="text-[15px] text-[#86868B] block mt-[2px] leading-[20px]"
            style={{ letterSpacing: "-0.24px" }}
          >
            {link.description}
          </span>
        )}
      </div>

      {/* Apple disclosure chevron — exact 8.5x13 proportion */}
      <svg width="8.5" height="13" viewBox="0 0 8.5 13" fill="none" className="shrink-0">
        <path d="M1.5 1.5L7 6.5L1.5 11.5" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
