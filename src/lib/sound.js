// Web Audio API harmonic bell & chime synthesizer

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
 * @param {number} noteIndex - Index in pentatonic scale
 * @param {boolean} soundEnabled - Whether sound is currently unmuted
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
    osc2.frequency.setValueAtTime(baseFreq * 2.76, now); // Natural non-integer bell overtone

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 1.15);
  } catch (err) {
    // Ignore audio autoplay restrictions gracefully
  }
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
    osc.frequency.setValueAtTime(196, now); // G3 warm bass
    osc.frequency.exponentialRampToValueAtTime(392, now + 0.4);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 2.6);

    // Chime overtone
    setTimeout(() => playChime(2, soundEnabled), 120);
    setTimeout(() => playChime(4, soundEnabled), 320);
  } catch (err) {}
}
