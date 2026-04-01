"use client";

import { useRef, useCallback, useEffect } from "react";

/**
 * Apple-style Liquid Glass specular effect.
 *
 * This doesn't just move a dot — it drives:
 * 1. --spec-x, --spec-y: position of the light source (0-100%)
 * 2. --spec-intensity: how bright the reflection is (0-1)
 * 3. --tilt-x, --tilt-y: normalized tilt for directional border lighting
 * 4. Subtle CSS transform for physical glass tilt
 *
 * On desktop: driven by cursor position relative to viewport.
 * On mobile: driven by device gyroscope.
 */

// ── Global gyroscope ──
let gyroGranted = false;
let gyroX = 50;
let gyroY = 50;
let gyroTiltX = 0; // -1 to 1
let gyroTiltY = 0; // -1 to 1

function startGyro() {
  window.addEventListener(
    "deviceorientation",
    (e) => {
      if (e.gamma === null || e.beta === null) return;
      gyroGranted = true;
      // Full range mapping — dramatic, visible movement
      gyroTiltX = Math.max(-1, Math.min(1, e.gamma / 30));
      gyroTiltY = Math.max(-1, Math.min(1, (e.beta - 40) / 30));
      gyroX = 50 + gyroTiltX * 45; // 5-95% range
      gyroY = 50 + gyroTiltY * 40; // 10-90% range
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

// Auto-start on non-iOS
if (typeof window !== "undefined") {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (!isIOS) startGyro();
}

// ── Global mouse position (for desktop) ──
let mouseVX = 50; // viewport-relative X (0-100)
let mouseVY = 50;

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    mouseVX = (e.clientX / window.innerWidth) * 100;
    mouseVY = (e.clientY / window.innerHeight) * 100;
  }, { passive: true });
}

// ── Per-card hook ──
export function useSpecular() {
  const ref = useRef<HTMLDivElement>(null);
  const current = useRef({ x: 50, y: 50, tiltX: 0, tiltY: 0 });
  const raf = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    let targetX: number, targetY: number, tiltX: number, tiltY: number;

    if (gyroGranted) {
      targetX = gyroX;
      targetY = gyroY;
      tiltX = gyroTiltX;
      tiltY = gyroTiltY;
    } else {
      // Desktop: use global mouse position
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Light position relative to card center
      targetX = 50 + ((mouseVX - (cx / window.innerWidth) * 100)) * 0.8;
      targetY = 50 + ((mouseVY - (cy / window.innerHeight) * 100)) * 0.8;
      tiltX = (mouseVX - 50) / 50; // -1 to 1
      tiltY = (mouseVY - 50) / 50;
    }

    // Lerp for smooth trailing
    const c = current.current;
    c.x = lerp(c.x, targetX, 0.08);
    c.y = lerp(c.y, targetY, 0.08);
    c.tiltX = lerp(c.tiltX, tiltX, 0.08);
    c.tiltY = lerp(c.tiltY, tiltY, 0.08);

    // Apply all CSS vars
    el.style.setProperty("--spec-x", `${c.x}%`);
    el.style.setProperty("--spec-y", `${c.y}%`);
    el.style.setProperty("--tilt-x", `${c.tiltX}`);
    el.style.setProperty("--tilt-y", `${c.tiltY}`);

    // Physical glass tilt — subtle 3D rotation
    const rotY = c.tiltX * 2; // max ±2deg
    const rotX = -c.tiltY * 1.5; // max ±1.5deg
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [animate]);

  return { ref };
}
