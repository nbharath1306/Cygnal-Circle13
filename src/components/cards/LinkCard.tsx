import * as LucideIcons from "lucide-react";
import type { Link } from "@/data/types";

type IconName = keyof typeof LucideIcons;

function getIcon(name: string) {
  const Icon = LucideIcons[name as IconName] as React.ComponentType<{ size?: number; className?: string }>;
  if (!Icon || typeof Icon !== "function") return null;
  return <Icon size={20} className="text-text-secondary shrink-0" />;
}

export function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`
        group flex items-center gap-4 w-full rounded-xl
        bg-bg-elevated border transition-all duration-150
        px-5 py-4 min-h-[48px]
        ${link.isPrimary
          ? "border-l-accent-gold border-l-[3px] border-t-border-default border-r-border-default border-b-border-default hover:border-accent-gold/40"
          : "border-border-default hover:border-border-hover"
        }
        hover:bg-bg-subtle
      `}
    >
      {/* Icon */}
      <div className={`${link.isPrimary ? "text-text-accent" : ""}`}>
        {getIcon(link.icon)}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className="text-base text-text-primary font-medium block">
          {link.label}
        </span>
        {link.description && (
          <span className="text-sm text-text-tertiary block mt-0.5">
            {link.description}
          </span>
        )}
      </div>

      {/* Arrow */}
      <LucideIcons.ChevronRight
        size={16}
        className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
      />
    </a>
  );
}
