"use client";

import { useRef, useCallback, useEffect } from "react";

/**
 * Apple Liquid Glass tilt effect.
 *
 * SUBTLE. Apple's tilt is barely perceptible — the specular highlight
 * shifts gently, the card itself barely moves. If you can obviously
 * see it rotating, it's too much.
 *
 * Desktop: global mouse position shifts specular gently.
 * Mobile: gyroscope shifts specular gently.
 * That's it. No dramatic 3D rotation.
 */

// ── Global gyroscope ──
let gyroActive = false;
let gyroNormX = 0; // -1 to 1
let gyroNormY = 0;

function startGyro() {
  window.addEventListener(
    "deviceorientation",
    (e) => {
      if (e.gamma === null || e.beta === null) return;
      gyroActive = true;
      // Very gentle mapping — ±20° of tilt = full range
      gyroNormX = Math.max(-1, Math.min(1, e.gamma / 20));
      gyroNormY = Math.max(-1, Math.min(1, (e.beta - 45) / 20));
    },
    { passive: true }
  );
}

export async function requestGyroPermission(): Promise<boolean> {
  const DOE = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<string>;
  };
  if (typeof DOE.requestPermission === "function") {
    try {
      const perm = await DOE.requestPermission();
      if (perm === "granted") { startGyro(); return true; }
      return false;
    } catch { return false; }
  }
  startGyro();
  return true;
}

if (typeof window !== "undefined") {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (!isIOS) startGyro();
}

// ── Global mouse (desktop) ──
let mouseNormX = 0; // -1 to 1
let mouseNormY = 0;

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseNormY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });
}

// ── Per-card hook ──
export function useSpecular() {
  const ref = useRef<HTMLDivElement>(null);
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const targetX = gyroActive ? gyroNormX : mouseNormX;
    const targetY = gyroActive ? gyroNormY : mouseNormY;

    // Very slow lerp — the light drifts, doesn't snap
    current.current.x = lerp(current.current.x, targetX, 0.06);
    current.current.y = lerp(current.current.y, targetY, 0.06);

    const cx = current.current.x;
    const cy = current.current.y;

    // Specular position: 30-70% range (gentle shift, not extreme)
    el.style.setProperty("--spec-x", `${50 + cx * 20}%`);
    el.style.setProperty("--spec-y", `${35 + cy * 15}%`);

    // Tilt for directional border: raw -1 to 1
    el.style.setProperty("--tilt-x", `${cx}`);
    el.style.setProperty("--tilt-y", `${cy}`);

    // Physical tilt — BARELY PERCEPTIBLE. ±0.5° max.
    const rotY = cx * 0.5;
    const rotX = -cy * 0.4;
    el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [animate]);

  return { ref };
}
