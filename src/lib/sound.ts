"use client";

/**
 * Subtle tap sound — a quick sine blip.
 * Sounds like iOS keyboard tap or control press.
 * Very quiet (gain 0.03), very short (80ms).
 */
let ctx: AudioContext | null = null;

export function playTap() {
  try {
    if (!ctx) ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 1800;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch { /* silent fail — audio not available */ }
}
