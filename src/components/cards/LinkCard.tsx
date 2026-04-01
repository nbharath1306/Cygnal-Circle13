import { renderIcon } from "@/lib/icons";
import type { Link } from "@/data/types";

export function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group material-row flex items-center gap-3 px-4 py-[13px]"
    >
      {/* Icon — Apple Settings style: colored icon in rounded rect */}
      <div className="shrink-0 w-[30px] h-[30px] rounded-[7px] flex items-center justify-center bg-[#2997FF]">
        {renderIcon(link.icon, {
          size: 16,
          className: "text-white",
        })}
      </div>

      {/* Text — Apple Body/Subheadline sizing */}
      <div className="flex-1 min-w-0">
        <span
          className="text-[17px] font-normal block leading-[1.29] text-[#F5F5F7]"
          style={{ letterSpacing: "-0.408px" }}
        >
          {link.label}
        </span>
        {link.description && (
          <span
            className="text-[13px] text-white/40 block mt-px leading-[1.23]"
            style={{ letterSpacing: "-0.08px" }}
          >
            {link.description}
          </span>
        )}
      </div>

      {/* Disclosure indicator — Apple's exact pattern */}
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="shrink-0 text-white/20">
        <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
