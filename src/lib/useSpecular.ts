"use client";

import { useRef, useCallback, useEffect } from "react";

/**
 * Smooth cursor-tracking specular highlight.
 * Uses RAF interpolation for 60fps buttery movement
 * instead of snapping to every pointermove event.
 */
export function useSpecular() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 50, y: 30 });
  const current = useRef({ x: 50, y: 30 });
  const raf = useRef<number>(0);
  const active = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Smooth interpolation — 0.12 gives a nice trailing feel
    current.current.x = lerp(current.current.x, target.current.x, 0.12);
    current.current.y = lerp(current.current.y, target.current.y, 0.12);

    el.style.setProperty("--mouse-x", `${current.current.x}%`);
    el.style.setProperty("--mouse-y", `${current.current.y}%`);

    if (active.current) {
      raf.current = requestAnimationFrame(animate);
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    target.current.x = ((e.clientX - rect.left) / rect.width) * 100;
    target.current.y = ((e.clientY - rect.top) / rect.height) * 100;

    if (!active.current) {
      active.current = true;
      raf.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const onPointerLeave = useCallback(() => {
    target.current = { x: 50, y: 30 };
    // Let it animate back to center, then stop
    setTimeout(() => {
      active.current = false;
      cancelAnimationFrame(raf.current);
    }, 600);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
