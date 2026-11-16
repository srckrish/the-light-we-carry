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
    id: "steps",
    name: "Footsteps of Laxmi",
    desc: "Repeat the glowing lamp path as Goddess Laxmi is welcomed into homes. A Simon-style memory ritual.",
    icon: "🪔",
    tag: "Memory Path",
    isFeatured: true,
    component: FootstepsGame,
  },
  {
    id: "rangoli",
    name: "Rangoli Studio",
    desc: "Draw a mirrored rosette pattern with 8-fold radial symmetry and sacred colors.",
    icon: "🎨",
    tag: "Creative Art",
    component: RangoliGame,
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

const GAME_SOUND_TIPS = {
  steps: {
    highlight: "Sacred Footstep Bells",
    tip: "Each holy lamp sounds a melodic chime note. Turn on chimes to hear and memorize the musical path of Goddess Laxmi!",
    emoji: "👣",
  },
  rangoli: {
    highlight: "Singing Mandala",
    tip: "Every stroke and symmetry ray rings with a harmonic chord. Turn on chimes to hear your rangoli come to life!",
    emoji: "🎨",
  },
  match: {
    highlight: "Festive Harmony",
    tip: "Card flips and matches trigger joyful temple bells. Turn on chimes for melodic feedback on every match!",
    emoji: "🃏",
  },
  quiz: {
    highlight: "Wisdom Gongs",
    tip: "Ceremonial bells celebrate your cultural knowledge. Turn on chimes for the full festive trivia atmosphere!",
    emoji: "❓",
  },
  catch: {
    highlight: "Courtyard Bells",
    tip: "Rapid temple bells echo as you illuminate lamps in the dark. Turn on chimes for rhythmic reflex play!",
    emoji: "✨",
  },
  card: {
    highlight: "Ambient Chimes",
    tip: "Compose and decorate your blessings accompanied by gentle, soothing festival bells. Turn on chimes!",
    emoji: "💌",
  },
};

export default function PlayView() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { playChimeNote, soundEnabled, toggleSound } = useLight();
  const [spotlightDismissed, setSpotlightDismissed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  // Auto-hide spotlight cue after 7.5 seconds
  useEffect(() => {
    if (!gameId || soundEnabled) return;
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 7500);
    return () => clearTimeout(timer);
  }, [gameId, soundEnabled]);

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
  const currentTip = gameId ? GAME_SOUND_TIPS[gameId] || GAME_SOUND_TIPS.steps : null;
  const spotlightVisible = Boolean(gameId && !soundEnabled && !spotlightDismissed && !timedOut);

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

          {/* ─── Featured Ritual Showcase: Footsteps of Laxmi ─── */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 via-stone-950/90 to-amber-950/40 border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.22)] backdrop-blur-2xl mb-10 overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all duration-700" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="text-left max-w-xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-[11px] font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(245,158,11,0.5)] flex items-center gap-1.5">
                    <span>👑</span>
                    <span>Featured Festival Ritual</span>
                  </span>
                  <span className="text-xs text-amber-300 font-devanagari">लक्ष्मीको पाइला</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-500/25 font-medium">
                    Community Favorite ★★★★★
                  </span>
                </div>

                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-ivory group-hover:text-amber-200 transition-colors">
                  Footsteps of Laxmi
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 font-light mt-2 leading-relaxed">
                  On Laxmi Puja, sacred vermillion footprints guide Goddess Laxmi inside. Memorize the glowing oil diyas and repeat her sacred path to welcome prosperity into your home.
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-amber-500/15 text-xs text-amber-400/90">
                  <span className="flex items-center gap-1">
                    <span className="text-base">👣</span> 8 Sacred Steps
                  </span>
                  <span className="text-stone-600">·</span>
                  <span>Simon-Style Lamp Memory</span>
                  <span className="text-stone-600">·</span>
                  <span className="text-amber-300">Resonant Chimes</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
                <Link
                  to="/play/steps"
                  onClick={() => playChimeNote(2)}
                  className="w-full md:w-auto text-center px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-semibold text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Play Footsteps of Laxmi</span>
                  <span className="text-base">→</span>
                </Link>
                <span className="text-[11px] text-stone-400 font-light">Interactive ritual challenge</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_GAMES.map((game) => {
              const isHighlight = game.id === "steps";
              return (
                <Link
                  key={game.id}
                  to={`/play/${game.id}`}
                  onClick={() => playChimeNote(2)}
                  className={`group text-left p-6 rounded-3xl bg-stone-950/70 hover:bg-amber-950/40 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col justify-between space-y-4 ${
                    isHighlight
                      ? "border-2 border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)]"
                      : "border border-amber-500/20 hover:border-amber-400/60 hover:shadow-[0_15px_35px_rgba(245,158,11,0.2)]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl sm:text-4xl group-hover:scale-115 transition-transform block">
                        {game.icon}
                      </span>
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium tracking-wide border ${
                          isHighlight
                            ? "bg-amber-400 text-stone-950 border-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                            : "bg-amber-500/15 text-amber-300 border-amber-500/25"
                        }`}
                      >
                        {isHighlight ? "👑 Featured" : game.tag}
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
                    <span>{isHighlight ? "Play Featured Ritual" : "Play game"}</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
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
                {activeGameObj?.id === "steps" && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-widest font-bold">
                    Featured
                  </span>
                )}
              </h2>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Chimes toggle with spotlight pulse if muted */}
                <button
                  type="button"
                  onClick={toggleSound}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all border font-medium ${
                    soundEnabled
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                      : spotlightVisible
                      ? "bg-amber-400 text-stone-950 border-amber-300 font-bold shadow-[0_0_20px_rgba(245,158,11,0.7)] animate-pulse scale-105 ring-2 ring-amber-300"
                      : "bg-stone-900/90 border-stone-700/60 text-stone-400 hover:text-amber-300 hover:border-amber-400/40"
                  }`}
                  title={soundEnabled ? "Mute temple chimes" : "Turn temple chimes on"}
                  aria-pressed={soundEnabled}
                >
                  <span className={soundEnabled ? "animate-pulse" : ""}>🔔</span>
                  <span>{soundEnabled ? "Chimes on" : "Chimes off"}</span>
                </button>
                <span className="text-xs text-stone-500 hidden md:inline">
                  Esc to exit
                </span>
              </div>
            </div>

            {/* Dynamic Game-Specific Spotlight Recommendation */}
            {!soundEnabled && spotlightVisible && currentTip && (
              <div className="relative mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-950/40 to-amber-500/20 border-2 border-amber-400/50 shadow-[0_0_35px_rgba(245,158,11,0.25)] backdrop-blur-xl animate-fade-in text-left">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-lg shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-bounce">
                      {currentTip.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                          Recommended: {currentTip.highlight}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 font-medium">
                          Turn on above ↗
                        </span>
                      </div>
                      <p className="text-xs text-stone-200 font-light mt-0.5 leading-relaxed">
                        {currentTip.tip}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        toggleSound();
                        setSpotlightDismissed(true);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs tracking-wide hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1.5"
                    >
                      <span>Turn Chimes On</span>
                      <span>🔔</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpotlightDismissed(true)}
                      className="p-1.5 text-stone-400 hover:text-stone-200 text-xs rounded-full hover:bg-stone-800/50 transition-colors"
                      aria-label="Dismiss sound tip"
                      title="Dismiss"
                    >
                      ✕
                    </button>
                  </div>
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
