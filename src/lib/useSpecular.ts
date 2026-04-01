"use client";

import { useRef, useCallback, useEffect } from "react";

/**
 * Apple Liquid Glass tilt — iOS 26 style.
 *
 * What Apple actually does (from Gizmodo, AppleMagazine, Apple docs):
 * - Two corner glows: top-left bright, bottom-right subtle
 * - When you tilt, these glows shift slightly — creating a
 *   parallax illusion of depth ("the thinnest layer of depth")
 * - The effect is "the subtlest" — perception of tilt, not actual
 *   dramatic movement
 * - Against dark backgrounds the glow is more visible
 *
 * Implementation:
 * - --glow-shift-x, --glow-shift-y: how much the corner glows
 *   shift from their default positions (in px)
 * - Very subtle physical tilt (±0.3°) for depth perception
 * - iOS permission requested on FIRST TAP anywhere (invisible)
 * - Android auto-starts, no permission needed
 * - Desktop: mouse position drives the shift gently
 */

// ── Global state ──
let tiltX = 0; // -1 to 1
let tiltY = 0;
let gyroStarted = false;
let permissionRequested = false;

function onOrientation(e: DeviceOrientationEvent) {
  if (e.gamma === null || e.beta === null) return;
  gyroStarted = true;
  tiltX = Math.max(-1, Math.min(1, e.gamma / 25));
  tiltY = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
}

function startListening() {
  window.addEventListener("deviceorientation", onOrientation, { passive: true });
}

// iOS: request permission on first user interaction (tap anywhere)
async function tryRequestPermission() {
  if (permissionRequested) return;
  permissionRequested = true;

  const DOE = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<string>;
  };

  if (typeof DOE.requestPermission === "function") {
    try {
      const result = await DOE.requestPermission();
      if (result === "granted") startListening();
    } catch { /* denied or error — fail silently */ }
  } else {
    // Android / non-iOS — just start
    startListening();
  }
}

if (typeof window !== "undefined") {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOS) {
    // Request on first tap — invisible to user
    const handler = () => {
      tryRequestPermission();
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("click", handler);
    };
    document.addEventListener("touchstart", handler, { once: true, passive: true });
    document.addEventListener("click", handler, { once: true });
  } else {
    startListening();
  }

  // Desktop fallback: mouse position
  window.addEventListener("mousemove", (e) => {
    if (gyroStarted) return;
    tiltX = ((e.clientX / window.innerWidth) * 2 - 1) * 0.6;
    tiltY = ((e.clientY / window.innerHeight) * 2 - 1) * 0.6;
  }, { passive: true });
}

// ── Per-element hook ──
export function useSpecular() {
  const ref = useRef<HTMLDivElement>(null);
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Smooth trailing
    current.current.x = lerp(current.current.x, tiltX, 0.05);
    current.current.y = lerp(current.current.y, tiltY, 0.05);

    const cx = current.current.x;
    const cy = current.current.y;

    // Corner glow shift — max ±6px
    el.style.setProperty("--glow-shift-x", `${cx * 6}px`);
    el.style.setProperty("--glow-shift-y", `${cy * 6}px`);

    // Physical tilt — ±0.3° max, barely perceptible
    el.style.transform =
      `perspective(1200px) rotateY(${cx * 0.3}deg) rotateX(${-cy * 0.3}deg)`;

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [animate]);

  return { ref };
}

// Re-export for backward compat
export async function requestGyroPermission(): Promise<boolean> {
  await tryRequestPermission();
  return gyroStarted;
}
