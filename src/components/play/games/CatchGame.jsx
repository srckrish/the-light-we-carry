import { useState, useEffect, useRef } from "react";
import { useLight } from "../../../context/LightContext";

export default function CatchGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLamp, setActiveLamp] = useState(-1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameOver, setGameOver] = useState(false);

  const { releaseLantern, playCatch, showToast } = useLight();
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  const stopGame = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setActiveLamp(-1);
  };

  useEffect(() => {
    return () => stopGame();
  }, []);

  const startGame = () => {
    stopGame();
    setScore(0);
    setTimeLeft(20);
    setGameOver(false);
    setIsPlaying(true);

    // Pick random lamp every 680ms
    intervalRef.current = setInterval(() => {
      setActiveLamp((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * 9);
        } while (next === prev);
        return next;
      });
    }, 680);

    // 20 second countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopGame();
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (gameOver) {
      if (score >= 10) {
        showToast(`Splendid! You caught ${score} lights! A lantern released.`);
        releaseLantern();
      } else {
        showToast(`You caught ${score} lights.`);
      }
    }
  }, [gameOver, score, releaseLantern, showToast]);

  const handleLampClick = (idx) => {
    if (!isPlaying) return;
    if (idx === activeLamp) {
      const nextScore = score + 1;
      setScore(nextScore);
      setActiveLamp(-1);
      playCatch(nextScore);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto space-y-5 text-center">
      <div className="flex items-center justify-between w-full text-xs text-stone-400 border-b border-amber-500/15 pb-2">
        <span>Time: <strong className="text-amber-300">{timeLeft}s</strong></span>
        <span>Caught: <strong className="text-amber-300">{score}</strong></span>
      </div>

      <p className="text-xs sm:text-sm text-stone-300">
        Tap each lamp while it glows with golden light!
      </p>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-3 w-full py-2">
        {Array.from({ length: 9 }).map((_, idx) => {
          const isLit = idx === activeLamp;
          return (
            <button
              key={idx}
              type="button"
              disabled={!isPlaying}
              onClick={() => handleLampClick(idx)}
              className={`aspect-square rounded-2xl flex items-center justify-center transition-all duration-150 focus-visible:outline-none ${
                isLit
                  ? "bg-radial from-amber-200 via-amber-400 to-amber-600 scale-105 shadow-[0_0_30px_rgba(245,158,11,0.9)] ring-4 ring-amber-300 animate-pulse"
                  : "bg-stone-900 border border-amber-900/30 hover:border-amber-500/40"
              } ${isPlaying ? "cursor-pointer" : "cursor-default"}`}
              aria-label={`Lamp ${idx + 1}`}
            >
              <svg
                viewBox="0 0 64 64"
                className={`w-7 h-7 transition-all ${
                  isLit ? "scale-110 drop-shadow-[0_0_8px_#fff]" : "opacity-30"
                }`}
              >
                <path
                  d="M32 8c-6 8-2 14 0 18 2-4 6-10 0-18z"
                  fill={isLit ? "#FFFFFF" : "#F2C56E"}
                />
                <path
                  d="M10 32q22 24 44 0q-22 8-44 0z"
                  fill={isLit ? "#E7742E" : "#8B4513"}
                />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="pt-2">
        {!isPlaying ? (
          <div className="space-y-3">
            {gameOver && (
              <p className="text-amber-300 font-display text-lg font-semibold">
                You caught {score} lights! {score >= 10 ? "✦ Great reflexes!" : ""}
              </p>
            )}
            <button
              type="button"
              onClick={startGame}
              className="px-8 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)]"
            >
              {gameOver ? "Play again" : "Start"}
            </button>
          </div>
        ) : (
          <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 20) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
