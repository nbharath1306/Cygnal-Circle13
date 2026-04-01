"use client";

import { useRef, useCallback } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

/**
 * Liquid Glass card with cursor-tracking specular highlights.
 *
 * The specular highlight follows the mouse position relative to the card,
 * simulating a real light source hitting curved glass.
 *
 * On touch devices, the highlight centers on press location.
 */
export function GlassCard({
  children,
  className = "",
  as = "div",
  ...props
}: GlassCardProps) {
  const ref = useRef<HTMLElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mouse-x", "50%");
    el.style.setProperty("--mouse-y", "30%");
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`liquid-glass ${className}`}
      {...props}
    >
      {/* Specular highlight — tracks cursor */}
      <span className="liquid-glass-specular" aria-hidden="true" />
      {/* Content */}
      <span className="relative z-[1] flex items-center w-full">{children}</span>
    </Tag>
  );
}
