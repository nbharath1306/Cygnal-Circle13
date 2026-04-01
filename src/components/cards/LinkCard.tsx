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
        transition-all duration-250 ease-out
        px-5 py-[18px]
        ${
          isPrimary
            ? "bg-gradient-to-r from-accent-gold/[0.08] to-accent-gold/[0.02] border border-accent-gold/20 hover:border-accent-gold/40 hover:shadow-[0_0_32px_-8px_rgba(212,175,85,0.2)]"
            : "bg-bg-card border border-border-default hover:border-border-hover hover:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]"
        }
        hover:-translate-y-[2px]
        active:translate-y-0 active:scale-[0.995]
      `}
    >
      {/* Shimmer overlay on primary */}
      {isPrimary && (
        <div className="absolute inset-0 shimmer pointer-events-none" />
      )}

      {/* Icon */}
      <div
        className={`
          shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
          ${
            isPrimary
              ? "bg-accent-gold/[0.12] ring-1 ring-accent-gold/10"
              : "bg-bg-subtle ring-1 ring-border-default group-hover:ring-border-hover"
          }
          transition-all duration-200
        `}
      >
        {renderIcon(link.icon, {
          size: 20,
          className: isPrimary
            ? "text-accent-gold"
            : "text-text-secondary group-hover:text-text-primary transition-colors duration-200",
        })}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[15px] font-semibold block leading-snug text-text-primary">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[13px] text-text-tertiary block mt-0.5 leading-snug">
            {link.description}
          </span>
        )}
      </div>

      {/* Arrow */}
      {renderIcon("ArrowUpRight", {
        size: 16,
        className: `
          shrink-0 transition-all duration-200
          ${isPrimary ? "text-accent-gold/60 group-hover:text-accent-gold" : "text-text-tertiary/0 group-hover:text-text-tertiary"}
          group-hover:translate-x-0.5 group-hover:-translate-y-0.5
        `,
      })}
    </a>
  );
}
