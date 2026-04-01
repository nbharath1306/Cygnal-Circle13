"use client";

import { useRef, useEffect } from "react";

/**
 * Parallax background — the image scrolls at a slower rate
 * than the content, creating depth. Uses transform for 60fps.
 */
export function ParallaxBg({ src }: { src?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * 0.35; // parallax factor
        el.style.transform = `scale(1.1) translateY(${y}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div ref={ref} className="w-full h-[120%] will-change-transform" style={{ transform: "scale(1.1)" }}>
        {src ? (
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover brightness-[0.7] saturate-[1.1]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2a2a4e] via-[#1e3050] to-[#1a4070]" />
        )}
      </div>
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
