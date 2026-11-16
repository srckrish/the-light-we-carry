import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  playChime,
  playResonantFlame,
  playRangoliSketchSound,
  playFootstepBellSound,
  playCardFlipSound,
  playCardMatchSound,
  playQuizAnswerSound,
  playCatchLampSound,
} from "../lib/sound";

const LightContext = createContext(null);

export function LightProvider({ children }) {
  const [lit, setLit] = useState(false);
  const [releasedLights, setReleasedLights] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [toast, setToast] = useState(null);

  // Lantern emitter trigger for background Canvas
  const [lanternQueue, setLanternQueue] = useState([]);

  // Toast auto-clear
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message) => {
    setToast({ id: Date.now(), message });
  }, []);

  const releaseLantern = useCallback((x = null, y = null) => {
    if (!lit) {
      setLit(true);
    }
    const lantern = {
      id: Math.random().toString(36).slice(2),
      x: x !== null ? x : (typeof window !== "undefined" ? window.innerWidth * (0.15 + Math.random() * 0.7) : 400),
      y: y !== null ? y : (typeof window !== "undefined" ? window.innerHeight * 0.82 : 600),
    };
    setLanternQueue((prev) => [...prev.slice(-35), lantern]);
    setReleasedLights((prev) => prev + 1);
  }, [lit]);

  const light = useCallback(() => {
    if (lit) return;
    setLit(true);
    playResonantFlame(soundEnabled);
    showToast("The first diya is lit. The celebration begins.");
    // Release an initial celebratory cluster of floating lights
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        releaseLantern();
      }, i * 220);
    }
  }, [lit, soundEnabled, showToast, releaseLantern]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        playChime(3, true);
        showToast("Harmonic temple chimes unmuted.");
      } else {
        showToast("Sound muted.");
      }
      return next;
    });
  }, [showToast]);

  const playChimeNote = useCallback((noteIndex = 0) => {
    playChime(noteIndex, soundEnabled);
  }, [soundEnabled]);

  const playRangoliStroke = useCallback((colorIndex = 0) => {
    playRangoliSketchSound(colorIndex, soundEnabled);
  }, [soundEnabled]);

  const playFootstep = useCallback((lampIndex = 0) => {
    playFootstepBellSound(lampIndex, soundEnabled);
  }, [soundEnabled]);

  const playCardFlip = useCallback(() => {
    playCardFlipSound(soundEnabled);
  }, [soundEnabled]);

  const playCardMatch = useCallback((isSuccess = true) => {
    playCardMatchSound(isSuccess, soundEnabled);
  }, [soundEnabled]);

  const playQuizResult = useCallback((isCorrect = true) => {
    playQuizAnswerSound(isCorrect, soundEnabled);
  }, [soundEnabled]);

  const playCatch = useCallback((combo = 0) => {
    playCatchLampSound(combo, soundEnabled);
  }, [soundEnabled]);

  return (
    <LightContext.Provider
      value={{
        lit,
        light,
        releasedLights,
        releaseLantern,
        lanternQueue,
        soundEnabled,
        toggleSound,
        playChimeNote,
        playRangoliStroke,
        playFootstep,
        playCardFlip,
        playCardMatch,
        playQuizResult,
        playCatch,
        toast,
        showToast,
      }}
    >
      {children}
    </LightContext.Provider>
  );
}

export function useLight() {
  const context = useContext(LightContext);
  if (!context) {
    throw new Error("useLight must be used within a LightProvider");
  }
  return context;
}
