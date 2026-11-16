import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useLight } from "../../../context/LightContext";

const ICONS = ["🐦", "🐕", "🐄", "🐂", "🌼", "🪔"];

function shuffleCards() {
  const deck = [...ICONS, ...ICONS].map((icon, idx) => ({
    id: idx,
    icon,
  }));
  return deck.sort(() => Math.random() - 0.5);
}

export default function MatchGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const { releaseLantern, playCardFlip, playCardMatch, showToast } = useLight();

  const initGame = () => {
    setCards(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsLocked(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx) => {
    if (isLocked) return;
    if (flipped.includes(idx) || matched.includes(idx)) return;

    playCardFlip();
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((prev) => prev + 1);

      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].icon === cards[secondIdx].icon) {
        setTimeout(() => {
          const newMatched = [...matched, firstIdx, secondIdx];
          setMatched(newMatched);
          setFlipped([]);
          setIsLocked(false);
          playCardMatch(true);

          if (newMatched.length === cards.length) {
            showToast(`All pairs matched in ${moves + 1} moves! Double lights released.`);
            releaseLantern();
            setTimeout(releaseLantern, 250);

            confetti({
              particleCount: 50,
              spread: 65,
              origin: { y: 0.65 },
              colors: ["#F59E0B", "#FBBF24", "#F43F5E", "#10B981"],
            });
          }
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
          playCardMatch(false);
        }, 850);
      }
    }
  };

  const isComplete = cards.length > 0 && matched.length === cards.length;

  return (
    <div className="flex flex-col items-center max-w-md mx-auto space-y-6 text-center">
      <div className="flex items-center justify-between w-full text-xs text-stone-400 border-b border-amber-500/15 pb-2">
        <span>Find the six festival pairs</span>
        <span>Moves: <strong>{moves}</strong></span>
      </div>

      {/* 4x3 Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          const isMatched = matched.includes(idx);

          return (
            <button
              key={card.id}
              type="button"
              disabled={isLocked || isMatched}
              onClick={() => handleCardClick(idx)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all duration-300 transform select-none focus-visible:outline-none ${
                isFlipped
                  ? isMatched
                    ? "bg-emerald-950/80 border-2 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-95"
                    : "bg-amber-950/90 border-2 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "bg-stone-900 border border-amber-900/40 hover:border-amber-500/50 hover:bg-stone-850 hover:scale-105"
              }`}
              aria-label={`Card ${idx + 1}`}
            >
              {isFlipped ? (
                <span>{card.icon}</span>
              ) : (
                <span className="text-amber-500/40 text-lg font-serif">✦</span>
              )}
            </button>
          );
        })}
      </div>

      {isComplete ? (
        <div className="pt-3 space-y-3 animate-fade-in">
          <p className="text-amber-300 font-display text-xl font-semibold">
            All matched in {moves} moves!
          </p>
          <button
            type="button"
            onClick={initGame}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-xs tracking-wide hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)]"
          >
            Play again
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={initGame}
          className="text-xs text-stone-400 hover:text-amber-300 transition-colors pt-2 underline underline-offset-4"
        >
          Shuffle & restart
        </button>
      )}
    </div>
  );
}
