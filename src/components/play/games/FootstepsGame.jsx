import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { useLight } from "../../../context/LightContext";

export default function FootstepsGame() {
  const [sequence, setSequence] = useState([]);
  const [playerPos, setPlayerPos] = useState(0);
  const [isPlayingSeq, setIsPlayingSeq] = useState(false);
  const [activeLamp, setActiveLamp] = useState(null);
  const [message, setMessage] = useState("Laxmi walks in by lamplight. Watch the lamps, then repeat the path.");
  const [bestRound, setBestRound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const { releaseLantern, playChimeNote, showToast } = useLight();
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const flashLamp = (index, duration = 380) => {
    return new Promise((resolve) => {
      setActiveLamp(index);
      playChimeNote(index);
      setTimeout(() => {
        if (!isMountedRef.current) return;
        setActiveLamp(null);
        setTimeout(resolve, 140);
      }, duration);
    });
  };

  const playSequence = async (seq) => {
    setIsPlayingSeq(true);
    setMessage(`Round ${seq.length}. Watch the lamps carefully…`);
    await new Promise((r) => setTimeout(r, 600));

    for (let i = 0; i < seq.length; i++) {
      if (!isMountedRef.current) return;
      await flashLamp(seq[i]);
    }

    if (isMountedRef.current) {
      setIsPlayingSeq(false);
      setPlayerPos(0);
      setMessage("Your turn. Repeat the path.");
    }
  };

  const startNextRound = (currentSeq = sequence) => {
    const nextLamp = Math.floor(Math.random() * 5);
    const newSeq = [...currentSeq, nextLamp];
    setSequence(newSeq);
    playSequence(newSeq);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    startNextRound([]);
  };

  const handleLampClick = async (index) => {
    if (isPlayingSeq || !gameStarted) return;

    setActiveLamp(index);
    playChimeNote(index);
    setTimeout(() => {
      if (isMountedRef.current) setActiveLamp(null);
    }, 200);

    if (index !== sequence[playerPos]) {
      const reached = sequence.length;
      setBestRound((prev) => Math.max(prev, reached - 1));
      setMessage(`So close! You reached Round ${reached}. Try again?`);
      setGameStarted(false);
      setSequence([]);
      return;
    }

    const nextPos = playerPos + 1;
    if (nextPos < sequence.length) {
      setPlayerPos(nextPos);
    } else {
      releaseLantern();
      setBestRound((prev) => Math.max(prev, sequence.length));

      if (sequence.length >= 8) {
        setMessage("✦ You walked the whole path. Goddess Laxmi is welcomed with light!");
        setGameStarted(false);
        setSequence([]);
        showToast("Laxmi's blessing received! Triple lights released.");

        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#F59E0B", "#FBBF24", "#FDE68A", "#FFFBEB"],
        });

        for (let i = 0; i < 3; i++) {
          setTimeout(releaseLantern, i * 200);
        }
      } else {
        setMessage("Well done!");
        setIsPlayingSeq(true);
        setTimeout(() => {
          if (isMountedRef.current) {
            startNextRound(sequence);
          }
        }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto space-y-6 text-center">
      <div className="min-h-[3rem] flex items-center justify-center">
        <p className="text-sm sm:text-base text-stone-200 font-light" aria-live="polite">
          {message}
        </p>
      </div>

      {/* Courtyard Path with Laxmi's Golden Footprints (Laxmi's Paila) */}
      <div className="w-full flex items-center justify-center gap-3 py-2">
        {Array.from({ length: 8 }).map((_, stepIdx) => {
          const isUnlocked = sequence.length > stepIdx;
          return (
            <div
              key={`footprint-${stepIdx}`}
              className={`flex flex-col items-center gap-0.5 transition-all duration-700 ${
                isUnlocked ? "opacity-100 scale-100" : "opacity-20 scale-75"
              }`}
              title={`Laxmi's Path Step ${stepIdx + 1}`}
            >
              {/* Sacred Footprint Pair (Left & Right) */}
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 24 36" className="w-3.5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" fill="currentColor">
                  {/* Foot Sole */}
                  <ellipse cx="12" cy="22" rx="7" ry="11" />
                  {/* 5 Toes */}
                  <circle cx="6" cy="7" r="2.2" />
                  <circle cx="9.5" cy="5.2" r="2.4" />
                  <circle cx="13.5" cy="5.5" r="2.2" />
                  <circle cx="17" cy="7.2" r="2" />
                  <circle cx="19.5" cy="9.8" r="1.8" />
                </svg>
                <svg viewBox="0 0 24 36" className="w-3.5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] scale-x-[-1]" fill="currentColor">
                  <ellipse cx="12" cy="22" rx="7" ry="11" />
                  <circle cx="6" cy="7" r="2.2" />
                  <circle cx="9.5" cy="5.2" r="2.4" />
                  <circle cx="13.5" cy="5.5" r="2.2" />
                  <circle cx="17" cy="7.2" r="2" />
                  <circle cx="19.5" cy="9.8" r="1.8" />
                </svg>
              </div>
              <span className="text-[9px] text-amber-500/70 font-mono">{stepIdx + 1}</span>
            </div>
          );
        })}
      </div>

      {/* 5 Glowing Diya Lamps */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 py-4">
        {[0, 1, 2, 3, 4].map((lampIndex) => {
          const isActive = activeLamp === lampIndex;
          return (
            <button
              key={lampIndex}
              type="button"
              disabled={isPlayingSeq || !gameStarted}
              onClick={() => handleLampClick(lampIndex)}
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-200 flex items-center justify-center focus-visible:outline-none ${
                isActive
                  ? "scale-115 bg-radial from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_35px_rgba(251,191,36,0.9)] ring-4 ring-amber-300"
                  : "bg-stone-900 border-2 border-amber-900/40 hover:border-amber-500/50 shadow-inner"
              } ${isPlayingSeq ? "cursor-wait" : gameStarted ? "cursor-pointer" : "cursor-default"}`}
              aria-label={`Lamp ${lampIndex + 1}`}
            >
              <svg
                viewBox="0 0 64 64"
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform ${
                  isActive ? "scale-110 drop-shadow-[0_0_10px_#fff]" : "opacity-40"
                }`}
              >
                <path
                  d="M32 8c-6 8-2 14 0 18 2-4 6-10 0-18z"
                  fill={isActive ? "#FFFFFF" : "#F2C56E"}
                />
                <path
                  d="M10 32q22 24 44 0q-22 8-44 0z"
                  fill={isActive ? "#E7742E" : "#8B4513"}
                />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="pt-2">
        {!gameStarted ? (
          <button
            type="button"
            onClick={handleStartGame}
            className="px-8 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-sm tracking-wide hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)]"
          >
            {sequence.length > 0 ? "Play again" : "Start"}
          </button>
        ) : (
          <div className="text-xs text-amber-400/80 font-medium tracking-widest uppercase">
            Progress: {playerPos} / {sequence.length}
          </div>
        )}
      </div>

      {bestRound > 0 && (
        <p className="text-xs text-stone-400">
          Personal Best: Round {bestRound}
        </p>
      )}
    </div>
  );
}
