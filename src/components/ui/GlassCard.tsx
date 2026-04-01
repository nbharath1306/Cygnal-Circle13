"use client";

import { useSpecular } from "@/lib/useSpecular";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export function GlassCard({
  children,
  className = "",
  href,
  target,
  rel,
}: GlassCardProps) {
  const { ref } = useSpecular();

  const inner = (
    <div ref={ref} className={`liquid-glass ${className}`}>
      <div className="liquid-glass-specular" />
      <div className="relative z-[1] flex items-center w-full">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="block">
        {inner}
      </a>
    );
  }

  return inner;
}
