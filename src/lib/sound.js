// Web Audio API harmonic bell, chime & ritual synthesizer

let audioCtx = null;

const PENTATONIC = [392, 440, 523.25, 587.33, 659.25, 783.99, 880];

export function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a sacred temple chime / singing bowl resonance.
 */
export function playChime(noteIndex = 0, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const baseFreq = PENTATONIC[Math.abs(noteIndex) % PENTATONIC.length];
    const now = ctx.currentTime;

    // Fundamental oscillator (warm body)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, now);

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.85);

    // Harmonic overtone oscillator (bell crystalline shimmer)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq * 2.76, now);

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 1.15);
  } catch {}
}

/**
 * Play tactile Rangoli powder / chalk sketch sound.
 * Soft sand-friction texture with harmonic pitch whisper.
 */
export function playRangoliSketchSound(colorIndex = 0, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const baseFreq = PENTATONIC[Math.abs(colorIndex) % PENTATONIC.length] * 1.5;

    // 1. Powder sketch friction (filtered noise buffer)
    const bufferSize = Math.floor(ctx.sampleRate * 0.06);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400 + (colorIndex % 5) * 180, now);
    filter.Q.setValueAtTime(2.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);

    // 2. Gentle harmonic color bell whisper
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);

    oscGain.gain.setValueAtTime(0.035, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  } catch {}
}

/**
 * Play authentic singing bowl / bronze Ghanti bell for Footsteps of Laxmi.
 */
export function playFootstepBellSound(lampIndex = 0, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Sacred pentatonic scale pitches for the 5 diyas
    const scale = [523.25, 587.33, 659.25, 783.99, 880];
    const freq = scale[Math.abs(lampIndex) % scale.length];
    const now = ctx.currentTime;

    // Main temple bell tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.24, now + 0.01);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.65);

    // High shimmer harmonic
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now);

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.08, now + 0.008);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.95);
  } catch {}
}

/**
 * Play snappy card flip sound (paper snap).
 */
export function playCardFlipSound(soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.045);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch {}
}

/**
 * Play card match result sound (triumphant double chime for match, soft woodblock for mismatch).
 */
export function playCardMatchSound(isSuccess = true, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    if (isSuccess) {
      // Cheerful ascending chime pair
      [659.25, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.1 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.85);
      });
    } else {
      // Gentle wooden knock for mismatch
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    }
  } catch {}
}

/**
 * Play quiz ceremonial answer sound (gong celebration for correct, warm wood tap for wrong).
 */
export function playQuizAnswerSound(isCorrect = true, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    if (isCorrect) {
      // Golden Gong Triad (G3 + D4 + B4)
      [196, 293.66, 493.88].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.85);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    }
  } catch {}
}

/**
 * Play fast, sparkling lamp catch sound for Light Catch.
 */
export function playCatchLampSound(combo = 0, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const baseFreq = 520 + (combo % 8) * 45;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.05);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch {}
}

/**
 * Play a low resonant warm gong for deep rituals (e.g. Diya lighting).
 */
export function playResonantFlame(soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(196, now);
    osc.frequency.exponentialRampToValueAtTime(392, now + 0.4);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 2.6);

    setTimeout(() => playChime(2, soundEnabled), 120);
    setTimeout(() => playChime(4, soundEnabled), 320);
  } catch {}
}
