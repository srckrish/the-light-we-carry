import { useEffect } from "react";
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
    name: "Sacred Rangoli Studio",
    desc: "Draw symmetrical sacred patterns with 16-axis radial symmetry using hand-ground festival pigments.",
    icon: "🎨",
    tag: "Creative Art",
    isFeatured: true,
    component: RangoliGame,
  },
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
  const { playChimeNote } = useLight();

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

          {/* ─── Dual Featured Ritual Showcase ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {/* Featured Card 1: Sacred Rangoli Studio */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-rose-500/15 via-stone-950/90 to-purple-950/30 border-2 border-rose-500/40 shadow-[0_0_40px_rgba(225,29,72,0.15)] backdrop-blur-2xl overflow-hidden group flex flex-col justify-between gap-5">
              <div className="absolute -top-20 -left-20 w-56 h-56 bg-rose-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/20 transition-all duration-700" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 text-stone-950 text-[10px] font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(225,29,72,0.4)] flex items-center gap-1">
                    <span>👑</span>
                    <span>Featured Creative Ritual</span>
                  </span>
                  <span className="text-xs text-rose-300 font-devanagari">सयपत्री मण्डल</span>
                </div>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-ivory group-hover:text-rose-200 transition-colors">
                  🎨 Sacred Rangoli Studio
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light mt-2 leading-relaxed">
                  Draw with hand-ground pigments across 16-axis sacred symmetry. Every stroke blooms into a festival mandala.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-rose-500/15 text-xs text-rose-400/80">
                  <span>✦ 16-Axis Symmetry</span>
                  <span className="text-stone-600">·</span>
                  <span>Meditative Art</span>
                  <span className="text-stone-600">·</span>
                  <span className="text-amber-300">🎨 Hand-Ground Pigments</span>
                </div>
              </div>
              <Link
                to="/play/rangoli"
                onClick={() => playChimeNote(3)}
                className="relative z-10 w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500 text-stone-950 font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.35)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Create Rangoli</span>
                <span>→</span>
              </Link>
            </div>

            {/* Featured Card 2: Footsteps of Laxmi */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-500/20 via-stone-950/90 to-amber-950/40 border-2 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.2)] backdrop-blur-2xl overflow-hidden group flex flex-col justify-between gap-5">
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all duration-700" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-[10px] font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(245,158,11,0.5)] flex items-center gap-1">
                    <span>👑</span>
                    <span>Featured Memory Ritual</span>
                  </span>
                  <span className="text-xs text-amber-300 font-devanagari">लक्ष्मीको पाइला</span>
                </div>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-ivory group-hover:text-amber-200 transition-colors">
                  🪔 Footsteps of Laxmi
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light mt-2 leading-relaxed">
                  Memorize the glowing lamp sequence and repeat her sacred path. Each step brings Goddess Laxmi closer to home.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-amber-500/15 text-xs text-amber-400/80">
                  <span>👣 8 Sacred Steps</span>
                  <span className="text-stone-600">·</span>
                  <span>Simon-Style Memory</span>
                  <span className="text-stone-600">·</span>
                  <span className="text-amber-300">🪔 Golden Diya Lamps</span>
                </div>
              </div>
              <Link
                to="/play/steps"
                onClick={() => playChimeNote(2)}
                className="relative z-10 w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Play Footsteps of Laxmi</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 mb-5 flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-amber-500/15 gap-1">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-amber-400">
                Holiday Activities
              </p>
              <h3 className="font-display font-semibold text-2xl text-ivory">
                More Festival Games
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-light">
              Trivia, reflex games &amp; postcard maker
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_GAMES.filter((game) => !game.isFeatured).map((game) => (
              <Link
                key={game.id}
                to={`/play/${game.id}`}
                onClick={() => playChimeNote(2)}
                className="group text-left p-5 rounded-2xl bg-stone-950/70 hover:bg-amber-950/35 border border-amber-500/20 hover:border-amber-400/60 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform block">
                      {game.icon}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide bg-amber-500/15 text-amber-300 border border-amber-500/25">
                      {game.tag}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-lg text-ivory group-hover:text-amber-200 transition-colors">
                    {game.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1.5 line-clamp-3 font-light leading-relaxed">
                    {game.desc}
                  </p>
                </div>

                <div className="pt-2 text-xs font-semibold tracking-wider uppercase text-amber-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
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
                {activeGameObj?.isFeatured && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-widest font-bold">
                    Featured
                  </span>
                )}
              </h2>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-stone-400 font-light hidden sm:inline">
                  Press Esc to exit
                </span>
              </div>
            </div>

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
