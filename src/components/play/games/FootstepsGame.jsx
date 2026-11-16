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

  const { releaseLantern, playFootstep, showToast } = useLight();
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
      playFootstep(index);
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
    playFootstep(index);
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
      <div className="w-full flex items-center justify-center gap-2 sm:gap-3.5 py-3 px-2 overflow-x-auto">
        {Array.from({ length: 8 }).map((_, stepIdx) => {
          const isUnlocked = sequence.length > stepIdx;
          return (
            <div
              key={`footprint-${stepIdx}`}
              className={`flex flex-col items-center gap-1 transition-all duration-500 ${
                isUnlocked
                  ? "opacity-100 scale-105 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]"
                  : "opacity-25 scale-90"
              }`}
              title={`Laxmi's Path Step ${stepIdx + 1}`}
            >
              {/* Sacred Footprint Pair (Left & Right) */}
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 24 36" className="w-3.5 h-5 text-amber-400" fill="currentColor">
                  {/* Foot Sole */}
                  <ellipse cx="12" cy="22" rx="7" ry="11" />
                  {/* 5 Toes */}
                  <circle cx="6" cy="7" r="2.2" />
                  <circle cx="9.5" cy="5.2" r="2.4" />
                  <circle cx="13.5" cy="5.5" r="2.2" />
                  <circle cx="17" cy="7.2" r="2" />
                  <circle cx="19.5" cy="9.8" r="1.8" />
                </svg>
                <svg viewBox="0 0 24 36" className="w-3.5 h-5 text-amber-400 scale-x-[-1]" fill="currentColor">
                  <ellipse cx="12" cy="22" rx="7" ry="11" />
                  <circle cx="6" cy="7" r="2.2" />
                  <circle cx="9.5" cy="5.2" r="2.4" />
                  <circle cx="13.5" cy="5.5" r="2.2" />
                  <circle cx="17" cy="7.2" r="2" />
                  <circle cx="19.5" cy="9.8" r="1.8" />
                </svg>
              </div>
              <span className={`text-[10px] font-mono transition-colors ${isUnlocked ? "text-amber-300 font-bold" : "text-stone-600"}`}>
                {stepIdx + 1}
              </span>
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
              className={`relative w-14 h-14 sm:w-18 sm:h-18 rounded-full transition-all duration-200 flex items-center justify-center focus-visible:outline-none ${
                isActive
                  ? "scale-115 bg-gradient-to-t from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_40px_rgba(245,158,11,0.95)] ring-4 ring-amber-300"
                  : "bg-stone-900/90 border-2 border-amber-900/40 hover:border-amber-500/60 hover:scale-105 shadow-inner"
              } ${isPlayingSeq ? "cursor-wait" : gameStarted ? "cursor-pointer active:scale-95" : "cursor-default"}`}
              aria-label={`Lamp ${lampIndex + 1}`}
            >
              <svg
                viewBox="0 0 64 64"
                className={`w-7 h-7 sm:w-9 sm:h-9 transition-transform ${
                  isActive ? "scale-115 drop-shadow-[0_0_12px_#fff]" : "opacity-45"
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
            className="px-10 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-sm sm:text-base tracking-wide hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.45)]"
          >
            {sequence.length > 0 ? "Play again" : "Begin Sacred Path →"}
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300 font-medium tracking-widest uppercase">
            <span>Progress:</span>
            <span className="font-bold text-amber-200">{playerPos} / {sequence.length}</span>
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
