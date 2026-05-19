"use client";

let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const WinWithAudio = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    ctx = new (WinWithAudio.AudioContext || WinWithAudio.webkitAudioContext)();
  }
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

/**
 * Godfather Level Premium Tap
 * A deep, rich, multi-layered tactile sound.
 * Combines a sub-bass weight, a warm physical resonance,
 * and a shimmering golden-ratio harmonic tail.
 */
export function playTap() {
  try {
    const audioCtx = getCtx();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    // --- LAYER 1: The "Godfather" Weight (Sub-Bass Thud) ---
    // Gives the interaction a physical, heavy, expensive feel.
    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(55, now); // A1 - deep sub
    
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.25, now + 0.005);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);

    // --- LAYER 2: The Velvet Body (Warm Resonance) ---
    const bodyOsc = audioCtx.createOscillator();
    const bodyGain = audioCtx.createGain();
    bodyOsc.type = "triangle"; // richer than sine
    bodyOsc.frequency.setValueAtTime(220, now); // A3
    
    bodyGain.gain.setValueAtTime(0, now);
    bodyGain.gain.linearRampToValueAtTime(0.15, now + 0.01);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(audioCtx.destination);

    // --- LAYER 3: Golden Harmonics (The Luxury Shimmer) ---
    // A chord stack (A Major/9) that blooms
    const frequencies = [440, 554.37, 659.25, 830.61]; // A4, C#5, E5, G#5 (A Maj7)
    const gains = [0.06, 0.04, 0.03, 0.02];
    const decays = [0.25, 0.3, 0.35, 0.4];

    frequencies.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      
      gainNode.gain.setValueAtTime(0, now);
      // Slight stagger in attack for the "bloom" effect
      gainNode.gain.linearRampToValueAtTime(gains[i], now + 0.01 + i * 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + decays[i] + 0.1);
    });

    // --- LAYER 4: The Silky Transient (Tactile Click) ---
    const noiseDuration = 0.025;
    const bufferSize = audioCtx.sampleRate * noiseDuration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3200;
    filter.Q.value = 2.0;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.05, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseDuration);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    // --- LAYER 5: Spatial Bloom (Pseudo-Reverb via Delay) ---
    const delay = audioCtx.createDelay();
    delay.delayTime.value = 0.015; 
    const delayGain = audioCtx.createGain();
    delayGain.gain.value = 0.15;

    bodyGain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(audioCtx.destination);

    // Start remaining layers
    subOsc.start(now);
    subOsc.stop(now + 0.2);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.3);
    noise.start(now);
    noise.stop(now + 0.1);

  } catch (e) {
    console.error("Failed to play premium sound:", e);
  }
}

/**
 * Premium Hover Tick
 * Dual-layered tactile mechanical touch sound.
 * Combines an organic wood-block thud with a shimmering crystal snap.
 */
export function playHover() {
  try {
    const audioCtx = getCtx();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    const gain2 = audioCtx.createGain();

    // Layer 1: Luxury organic wood block tick
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(1200, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.012, now + 0.002);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    // Layer 2: Shimmering crystal snap
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(2400, now);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.006, now + 0.001);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(audioCtx.destination);
    gain2.connect(audioCtx.destination);

    osc1.start(now);
    osc1.stop(now + 0.05);
    osc2.start(now);
    osc2.stop(now + 0.04);
  } catch {
    // silent fail
  }
}

/**
 * Premium Success Swell
 * A rich, ascending progression for completion states.
 */
export function playSuccess() {
  try {
    const audioCtx = getCtx();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    // Root chord notes: A3, E4, A4, C#5, E5, A5
    const notes = [220, 329.63, 440, 554.37, 659.25, 880];
    
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.04); 
      
      gain.gain.setValueAtTime(0, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.05, now + i * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.6);
    });

    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(55, now);
    
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);
    
    subOsc.start(now);
    subOsc.stop(now + 0.7);

  } catch {
    // silent fail
  }
}

/**
 * Realistic Scissor Snip
 * Synthesizes paper shearing friction and steel blade closure contact.
 */
let lastSnipTime = 0;
export function playScissorSnip() {
  try {
    const audioCtx = getCtx();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    // Intelligent throttle: avoid audio context clipping during high-speed dragging
    if (now - lastSnipTime < 0.12) return;
    lastSnipTime = now;

    const duration = 0.08;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    // Metal shearing filter sweep
    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 4.5;
    filter.frequency.setValueAtTime(3200, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + duration);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    // Blade closure contact tick
    const tickOsc = audioCtx.createOscillator();
    const tickGain = audioCtx.createGain();
    tickOsc.type = "sine";
    tickOsc.frequency.setValueAtTime(1900, now + duration - 0.012);
    
    tickGain.gain.setValueAtTime(0, now);
    tickGain.gain.setValueAtTime(0.02, now + duration - 0.012);
    tickGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    tickOsc.connect(tickGain);
    tickGain.connect(audioCtx.destination);

    noise.start(now);
    noise.stop(now + duration + 0.02);
    
    tickOsc.start(now);
    tickOsc.stop(now + duration + 0.02);
  } catch {
    // silent fail
  }
}

/**
 * Db Major Crystal Unlock Swell
 * Ascending chord bells with Pseudo-Reverb lowpass arpeggiator.
 */
export function playLuxuryUnlock() {
  try {
    const audioCtx = getCtx();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    // Db Major 9 pentatonic warm stack
    const frequencies = [277.18, 415.30, 554.37, 698.46, 830.61, 1046.50];
    const gains = [0.06, 0.05, 0.04, 0.035, 0.025, 0.015];
    const decays = [0.65, 0.75, 0.85, 0.95, 1.1, 1.25];

    frequencies.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.045);
      
      gainNode.gain.setValueAtTime(0, now + i * 0.045);
      gainNode.gain.linearRampToValueAtTime(gains[i], now + i * 0.045 + 0.025);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.045 + decays[i]);

      // Sound damping sweep to give natural crystal bell acoustics
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000, now);
      filter.frequency.exponentialRampToValueAtTime(650, now + decays[i]);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(now + i * 0.045);
      osc.stop(now + i * 0.045 + decays[i] + 0.1);
    });

    // Deep warm velvet sub base body
    const body = audioCtx.createOscillator();
    const bodyGain = audioCtx.createGain();
    body.type = "sine";
    body.frequency.setValueAtTime(110, now);
    
    bodyGain.gain.setValueAtTime(0, now);
    bodyGain.gain.linearRampToValueAtTime(0.1, now + 0.12);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    body.connect(bodyGain);
    bodyGain.connect(audioCtx.destination);

    body.start(now);
    body.stop(now + 1.3);
  } catch {
    // silent fail
  }
}


