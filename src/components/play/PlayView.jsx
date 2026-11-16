import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLight } from "../../context/LightContext";
import RangoliGame from "./games/RangoliGame";
import FootstepsGame from "./games/FootstepsGame";
import QuizGame from "./games/QuizGame";
import MatchGame from "./games/MatchGame";
import CatchGame from "./games/CatchGame";
import WishCardGame from "./games/WishCardGame";

const ALL_GAMES = [
  {
    id: "rangoli",
    name: "Rangoli Studio",
    desc: "Draw a mirrored rosette pattern with 8-fold radial symmetry and sacred colors.",
    icon: "🎨",
    tag: "Creative Art",
    component: RangoliGame,
  },
  {
    id: "steps",
    name: "Footsteps of Laxmi",
    desc: "Repeat the glowing lamp path as Goddess Laxmi is welcomed into homes.",
    icon: "🪔",
    tag: "Memory Path",
    component: FootstepsGame,
  },
  {
    id: "quiz",
    name: "Which Day?",
    desc: "Six curated cultural trivia questions exploring Tihar, Mha Puja, and Chhath.",
    icon: "❓",
    tag: "Trivia Challenge",
    component: QuizGame,
  },
  {
    id: "match",
    name: "Match Pairs",
    desc: "Find the six matching festival symbols hidden behind ornate cards.",
    icon: "🃏",
    tag: "Memory Match",
    component: MatchGame,
  },
  {
    id: "catch",
    name: "Light Catch",
    desc: "Tap lamps as they illuminate across the courtyard. A 20-second reflex challenge.",
    icon: "✨",
    tag: "Speed Reflex",
    component: CatchGame,
  },
  {
    id: "card",
    name: "Wish Card Maker",
    desc: "Personalize a sacred festive digital postcard to download and share.",
    icon: "💌",
    tag: "Share Art",
    component: WishCardGame,
  },
];

export default function PlayView() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { playChimeNote, soundEnabled, toggleSound } = useLight();
  const [hubDismissed, setHubDismissed] = useState(false);
  const [gameDismissed, setGameDismissed] = useState(false);

  // Listen to Escape key to exit game
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && gameId) {
        navigate("/play");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameId, navigate]);

  const activeGameObj = ALL_GAMES.find((g) => g.id === gameId);
  const ActiveGameComponent = activeGameObj ? activeGameObj.component : null;

  return (
    <div className="relative z-10 min-h-screen pt-20 pb-28 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-between">
      {!gameId ? (
        /* Games Hub Grid */
        <div className="my-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-400 mb-2">
              Play at home
            </p>
            <h2 className="font-display font-semibold text-3xl sm:text-5xl text-ivory tracking-tight">
              Small games, <em className="italic font-medium text-amber-300">big festival</em>
            </h2>
            <p className="text-sm text-stone-300 mt-3 font-light">
              Every win, saved pattern, and card sends a glowing light into the celestial sky.
            </p>
          </div>

          {/* Chimes Recommendation in Hub */}
          {!soundEnabled && !hubDismissed && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:px-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-950/25 to-amber-500/10 border border-amber-500/30 backdrop-blur-xl mb-8 animate-fade-in text-center sm:text-left max-w-2xl mx-auto shadow-[0_0_25px_rgba(245,158,11,0.12)]">
              <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0 animate-bounce">🔔</span>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-amber-200">
                    Recommended: Turn on temple chimes
                  </p>
                  <p className="text-[11px] sm:text-xs text-stone-400 font-light">
                    Every game has custom melodic bells tuned to touches, card matches, and wins.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                >
                  Turn chimes on 🔔
                </button>
                <button
                  type="button"
                  onClick={() => setHubDismissed(true)}
                  className="p-1.5 text-stone-400 hover:text-stone-200 text-xs rounded-full hover:bg-stone-800/50 transition-colors"
                  aria-label="Dismiss recommendation"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_GAMES.map((game) => (
              <Link
                key={game.id}
                to={`/play/${game.id}`}
                onClick={() => playChimeNote(2)}
                className="group text-left p-6 rounded-3xl bg-stone-950/70 hover:bg-amber-950/40 border border-amber-500/20 hover:border-amber-400/60 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(245,158,11,0.2)] focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl group-hover:scale-115 transition-transform block">
                      {game.icon}
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 font-medium tracking-wide">
                      {game.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-ivory group-hover:text-amber-200 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-2 line-clamp-3 font-light leading-relaxed">
                    {game.desc}
                  </p>
                </div>

                <div className="pt-2 text-xs font-semibold tracking-wider uppercase text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  <span>Play game</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        /* Active Game Studio Container */
        <div className="my-6">
          <div className="p-6 sm:p-10 rounded-3xl bg-stone-950/80 border border-amber-500/25 backdrop-blur-2xl shadow-2xl shadow-black/90 max-w-3xl mx-auto transition-all duration-500">
            {/* Game Navigation Header */}
            <div className="flex items-center justify-between pb-6 border-b border-amber-500/15 mb-6">
              <Link
                to="/play"
                onClick={() => playChimeNote(1)}
                className="text-xs sm:text-sm text-amber-400 hover:text-amber-200 transition-colors flex items-center gap-1.5 font-medium group focus-visible:outline-none"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span>All games</span>
              </Link>

              <h2 className="font-display font-semibold text-xl sm:text-2xl text-ivory flex items-center gap-2">
                <span>{activeGameObj?.icon}</span>
                <span>{activeGameObj?.name}</span>
              </h2>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={toggleSound}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                    soundEnabled
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                      : "bg-stone-900/90 border-stone-700/60 text-stone-400 hover:text-amber-300 hover:border-amber-400/40"
                  }`}
                  title={soundEnabled ? "Mute temple chimes" : "Turn temple chimes on"}
                  aria-pressed={soundEnabled}
                >
                  <span className={soundEnabled ? "animate-pulse" : "opacity-60"}>🔔</span>
                  <span className="hidden sm:inline font-medium">
                    {soundEnabled ? "Chimes on" : "Chimes off"}
                  </span>
                </button>
                <span className="text-xs text-stone-500 hidden md:inline">
                  Esc to exit
                </span>
              </div>
            </div>

            {/* Active Game Chimes Recommendation Callout */}
            {!soundEnabled && !gameDismissed && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-950/30 to-amber-500/15 border border-amber-500/30 mb-6 text-xs text-amber-200 backdrop-blur-md animate-fade-in shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <div className="flex items-center gap-2.5 text-center sm:text-left">
                  <span className="text-xl shrink-0 animate-bounce">🔔</span>
                  <div>
                    <p className="font-semibold text-amber-200">
                      Recommended: Turn on temple chimes
                    </p>
                    <p className="text-stone-400 text-[11px] font-light mt-0.5">
                      This game responds with harmonic bell notes on each tap, match, and completion.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={toggleSound}
                    className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-xs tracking-wide transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                  >
                    Enable chimes 🔔
                  </button>
                  <button
                    type="button"
                    onClick={() => setGameDismissed(true)}
                    className="p-1 text-stone-400 hover:text-stone-200 text-xs rounded-full hover:bg-stone-800/50 transition-colors"
                    aria-label="Dismiss recommendation"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Active Game Component */}
            {ActiveGameComponent ? (
              <ActiveGameComponent />
            ) : (
              <div className="text-center py-8">
                <p className="text-stone-400">Game not found.</p>
                <Link to="/play" className="text-amber-400 mt-2 inline-block">
                  Return to all games
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
