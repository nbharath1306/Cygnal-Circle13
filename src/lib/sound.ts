"use client";

/**
 * Apple-style haptic tap sound.
 *
 * Apple's UI sounds are soft, dampened clicks — not beeps.
 * Think: the sound when you tap a toggle in iOS Settings,
 * or the keyboard haptic. A muffled "tok" with instant
 * attack and very fast decay.
 *
 * Implementation: short noise burst → bandpass filter at
 * ~3500Hz → fast exponential gain decay. Creates a
 * percussive, woody click that feels physical.
 */

let ctx: AudioContext | null = null;

export function playTap() {
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    // Layer 1: Ultra-luxury resonant body (soft "thud")
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = "sine";
    bodyOsc.frequency.setValueAtTime(220, now); // 220Hz (A3)
    
    bodyGain.gain.setValueAtTime(0, now);
    bodyGain.gain.linearRampToValueAtTime(0.12, now + 0.004); // Instant but smooth attack
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12); // Soft decay

    bodyOsc.connect(bodyGain);
    bodyGain.connect(ctx.destination);

    // Layer 2: Exclusive harmonic sparkle (delicate glass "ping")
    const sparkleOsc = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkleOsc.type = "sine";
    sparkleOsc.frequency.setValueAtTime(1320, now); // 1320Hz (E6 - Perfect Fifth harmonic)
    
    sparkleGain.gain.setValueAtTime(0, now);
    sparkleGain.gain.linearRampToValueAtTime(0.04, now + 0.008);
    sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22); // Long, premium shimmer

    sparkleOsc.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);

    // Layer 3: Physical transient (subtle textured click)
    const noiseDuration = 0.02;
    const bufferSize = ctx.sampleRate * noiseDuration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2800;
    filter.Q.value = 1.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.04, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseDuration);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Start all layers
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.12);
    sparkleOsc.start(now);
    sparkleOsc.stop(now + 0.22);
    noise.start(now);
  } catch {
    /* audio not available — silent fail */
  }
}
