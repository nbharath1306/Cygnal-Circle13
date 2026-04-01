"use client";

import { useState, useEffect } from "react";
import { requestGyroPermission } from "@/lib/useSpecular";

/**
 * iOS gyroscope permission prompt.
 * Shows a subtle "Enable motion" button on iOS devices.
 * Must be triggered by user gesture (tap).
 * Disappears after permission is granted or denied, or on non-iOS.
 */
export function GyroPermission() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on iOS
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };

    if (isIOS && typeof DOE.requestPermission === "function") {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const handleTap = async () => {
    await requestGyroPermission();
    setShow(false);
  };

  return (
    <button
      onClick={handleTap}
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        px-5 py-2.5 rounded-full
        bg-white/10 border border-white/15
        backdrop-blur-md
        text-[13px] text-white/70 font-medium
        active:scale-95 active:bg-white/5
        transition-all duration-200
        animate-[materialize_0.5s_cubic-bezier(0.4,0,0.2,1)_forwards]
      "
    >
      Tap to enable motion effects
    </button>
  );
}
