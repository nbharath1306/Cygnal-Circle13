"use client";

import { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  tiltMax?: number;
  glare?: boolean;
}

/**
 * Liquid Glass card with Apple-style 3D tilt + glare.
 *
 * Uses vanilla-tilt.js which handles:
 * - Mouse hover tilt on desktop
 * - Gyroscope tilt on mobile (built-in, auto-detects)
 * - Glare effect (the moving light reflection)
 * - Smooth easing and reset
 *
 * This is the same effect as Apple TV cards, App Store cards,
 * and Apple Gift Cards.
 */
export function GlassCard({
  children,
  className = "",
  href,
  target,
  rel,
  tiltMax = 8,
  glare = true,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    VanillaTilt.init(el, {
      max: tiltMax,               // max tilt in degrees
      speed: 400,                 // transition speed
      scale: 1.02,                // slight scale on hover
      perspective: 800,           // perspective distance
      glare: glare,               // enable glare effect
      "max-glare": 0.25,          // max glare opacity
      gyroscope: true,            // enable device tilt
      gyroscopeMinAngleX: -15,    // gyro sensitivity range
      gyroscopeMaxAngleX: 15,
      gyroscopeMinAngleY: -15,
      gyroscopeMaxAngleY: 15,
      reset: true,                // reset on mouse leave
      "reset-to-start": true,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    });

    return () => {
      if ((el as HTMLElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt) {
        (el as HTMLElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt!.destroy();
      }
    };
  }, [tiltMax, glare]);

  const inner = (
    <div ref={ref} className={`liquid-glass ${className}`}>
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
