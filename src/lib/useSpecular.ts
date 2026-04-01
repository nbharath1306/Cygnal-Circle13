"use client";

import { useRef, useCallback, useEffect } from "react";

/**
 * Smooth specular highlight — cursor on desktop, gyroscope on mobile.
 *
 * Desktop: tracks pointer position relative to each card.
 * Mobile: tracks device tilt via DeviceOrientationEvent.
 *   - beta (front-back tilt) → Y position
 *   - gamma (left-right tilt) → X position
 *   - iOS 13+ requires permission via user gesture — handled by GyroPermission component.
 *
 * Both inputs feed into the same RAF lerp loop for 60fps butter.
 */

// ── Global gyroscope state (shared across all cards) ──

let gyroActive = false;
let gyroX = 50;
let gyroY = 50;
let gyroListening = false;

function startGyroscope() {
  if (gyroListening) return;
  gyroListening = true;

  window.addEventListener(
    "deviceorientation",
    (e) => {
      if (e.gamma === null || e.beta === null) return;
      gyroActive = true;
      // Map tilt to 20-80% range — gentle movement, not extreme
      gyroX = Math.max(15, Math.min(85, 50 + (e.gamma / 45) * 30));
      gyroY = Math.max(15, Math.min(85, 50 + ((e.beta - 45) / 45) * 25));
    },
    { passive: true }
  );
}

/**
 * Request gyroscope permission on iOS 13+.
 * Must be called from a user gesture (click/tap).
 */
export async function requestGyroPermission(): Promise<boolean> {
  const DOE = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<string>;
  };

  if (typeof DOE.requestPermission === "function") {
    try {
      const perm = await DOE.requestPermission();
      if (perm === "granted") {
        startGyroscope();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Android / older iOS — no permission needed
  startGyroscope();
  return true;
}

// Auto-start on non-iOS devices (no permission needed)
if (typeof window !== "undefined") {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (!isIOS) {
    startGyroscope();
  }
}

// ── Per-card hook ──

export function useSpecular() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 50, y: 30 });
  const current = useRef({ x: 50, y: 30 });
  const raf = useRef<number>(0);
  const active = useRef(false);
  const hasPointer = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // If gyro is active and no pointer is hovering, use gyro values
    if (gyroActive && !hasPointer.current) {
      target.current.x = gyroX;
      target.current.y = gyroY;
    }

    current.current.x = lerp(current.current.x, target.current.x, 0.1);
    current.current.y = lerp(current.current.y, target.current.y, 0.1);

    el.style.setProperty("--mouse-x", `${current.current.x}%`);
    el.style.setProperty("--mouse-y", `${current.current.y}%`);

    raf.current = requestAnimationFrame(animate);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      hasPointer.current = true;
      const rect = el.getBoundingClientRect();
      target.current.x = ((e.clientX - rect.left) / rect.width) * 100;
      target.current.y = ((e.clientY - rect.top) / rect.height) * 100;
    },
    []
  );

  const onPointerLeave = useCallback(() => {
    hasPointer.current = false;
    target.current = { x: 50, y: 30 };
  }, []);

  // Start the RAF loop on mount, stop on unmount
  useEffect(() => {
    active.current = true;
    raf.current = requestAnimationFrame(animate);
    return () => {
      active.current = false;
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  return { ref, onPointerMove, onPointerLeave };
}
