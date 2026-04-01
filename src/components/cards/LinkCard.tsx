import * as LucideIcons from "lucide-react";
import type { Link } from "@/data/types";

type IconName = keyof typeof LucideIcons;

function getIcon(name: string, isPrimary?: boolean) {
  const Icon = LucideIcons[name as IconName] as React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  if (!Icon || typeof Icon !== "function") return null;
  return (
    <Icon
      size={20}
      className={isPrimary ? "text-accent-gold" : "text-text-secondary group-hover:text-text-primary transition-colors"}
    />
  );
}

export function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`
        group relative flex items-center gap-4 w-full rounded-2xl
        transition-all duration-200 ease-out
        px-5 py-4 min-h-[56px]
        ${
          link.isPrimary
            ? "bg-gradient-to-r from-accent-gold/10 via-accent-gold/5 to-transparent border border-accent-gold/20 hover:border-accent-gold/40 hover:shadow-[0_0_24px_-6px_rgba(201,169,110,0.15)]"
            : "bg-bg-elevated/80 border border-border-default hover:border-border-hover hover:bg-bg-subtle hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)]"
        }
        hover:-translate-y-[1px]
      `}
    >
      {/* Icon container */}
      <div
        className={`
          shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          ${link.isPrimary ? "bg-accent-gold/10" : "bg-bg-subtle/80 group-hover:bg-bg-primary/50"}
          transition-colors duration-200
        `}
      >
        {getIcon(link.icon, link.isPrimary)}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-[15px] text-text-primary font-medium block leading-snug">
          {link.label}
        </span>
        {link.description && (
          <span className="text-[13px] text-text-tertiary block mt-0.5 leading-snug">
            {link.description}
          </span>
        )}
      </div>

      {/* Arrow */}
      <LucideIcons.ArrowUpRight
        size={16}
        className="text-text-tertiary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
      />
    </a>
  );
}
