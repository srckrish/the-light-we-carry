import { Link } from "react-router-dom";
import { useLight } from "../../context/LightContext";
import CentralDiya from "../diya/CentralDiya";
import IlluminatedVillage from "../scenic/IlluminatedVillage";
import { TIHAR_DAYS } from "../../data/festivalData";

const FESTIVAL_ACTIVITIES = [
  {
    id: "rangoli",
    name: "Rangoli Studio",
    desc: "Create vibrant 8-fold radial mandalas with sacred colored powders.",
    icon: "🎨",
    badge: "Creative Art",
    color: "#F59E0B",
  },
  {
    id: "steps",
    name: "Footsteps of Laxmi",
    desc: "Follow the golden lamplight path as Goddess Laxmi blesses the home.",
    icon: "🪔",
    badge: "Memory Path",
    color: "#E7742E",
  },
  {
    id: "quiz",
    name: "Which Day?",
    desc: "Discover the sacred meanings of crows, dogs, cows, oxen, and sisters.",
    icon: "❓",
    badge: "Cultural Trivia",
    color: "#10B981",
  },
  {
    id: "match",
    name: "Match Pairs",
    desc: "Uncover sacred pairs of marigolds, diyas, dogs, and mountain oxen.",
    icon: "🃏",
    badge: "Memory Cards",
    color: "#8B5CF6",
  },
  {
    id: "catch",
    name: "Light Catch",
    desc: "Catch glowing courtyard lamps in 20 seconds of festive reflexes.",
    icon: "✨",
    badge: "Speed Arcade",
    color: "#F43F5E",
  },
  {
    id: "card",
    name: "Wish Card Atelier",
    desc: "Craft an authentic gold-foil digital greeting card to gift family and friends.",
    icon: "💌",
    badge: "Share Card",
    color: "#D9A441",
  },
];

export default function HomeView() {
  const { lit, releaseLantern, playChimeNote } = useLight();

  return (
    <div className="relative z-10 min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-between">
      {/* 1. Hero Atmosphere */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] text-center my-2">
        {/* The Central Flame with Sacred Floor Rangoli */}
        <CentralDiya />

        {/* Dynamic Village Lighting Illustration */}
        <div className="w-full max-w-3xl mx-auto -mt-6 mb-6">
          <IlluminatedVillage className="rounded-3xl border border-amber-500/15 backdrop-blur-md bg-stone-950/40 shadow-2xl" />
          <p className="text-[11px] text-stone-400/80 mt-2 tracking-wide font-light">
            {lit
              ? "✦ The homes of the valley glow with Tihar batti and warm oil lamps."
              : "Tap the central diya to ignite the valley lights."}
          </p>
        </div>

        {/* Revealed Content when Lit */}
        <div
          className={`transition-all duration-1000 max-w-2xl mx-auto ${
            lit
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <span>🪔</span>
            <span>Tihar · Chhath</span>
          </div>

          <h1 className="font-display font-semibold text-4xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-ivory drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)]">
            A little light,
            <br />
            <em className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
              a thousand thanks.
            </em>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-stone-300 font-light max-w-lg mx-auto leading-relaxed">
            Nepal’s festival of lights, in five days. From crows and dogs to sisters, and the sacred sunrise on the river.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/story"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(245,158,11,0.45)] text-sm sm:text-base"
            >
              Begin the journey →
            </Link>

            <Link
              to="/play"
              className="px-8 py-3.5 rounded-full bg-amber-950/40 hover:bg-amber-900/40 border border-amber-500/30 text-amber-200 font-medium tracking-wide hover:border-amber-400/60 transition-all backdrop-blur-md text-sm sm:text-base"
            >
              Play at home
            </Link>
          </div>
        </div>
      </section>

      {/* 2. "Tihar in five lights" interactive rail */}
      <section className="mt-20 sm:mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-amber-500/15 gap-2">
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-amber-400">
              The Journey of Light
            </p>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ivory mt-0.5">
              Five Days of Tihar, and Chhath
            </h2>
          </div>
          <span className="text-xs text-stone-400 font-light">
            Select a day to read its sacred story
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {TIHAR_DAYS.map((day, idx) => (
            <Link
              key={day.id}
              to={`/story/${idx + 1}`}
              onClick={() => playChimeNote(idx)}
              className="group text-left p-4 sm:p-5 rounded-2xl bg-stone-950/70 hover:bg-amber-950/35 border border-amber-500/20 hover:border-amber-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(245,158,11,0.18)] focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl block mb-2 group-hover:scale-115 transition-transform origin-left">
                  {day.emoji}
                </span>
                <span className="block text-[10px] tracking-widest uppercase font-semibold text-amber-400/90">
                  {idx < 5 ? `Day ${idx + 1}` : "Sacred Ritual"}
                </span>
                <span className="block font-display font-semibold text-base sm:text-lg text-ivory leading-tight mt-1 group-hover:text-amber-200 transition-colors">
                  {day.title.split(" ")[0]}
                </span>
                <span className="block font-devanagari text-xs text-amber-300/70 mt-0.5">
                  {day.devanagari.split(" / ")[0]}
                </span>
              </div>
              <span className="block text-xs text-stone-400 mt-3 pt-2 border-t border-amber-500/10 line-clamp-2 font-light">
                {day.tagline}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. "Play at home" curated festival activities */}
      <section className="mt-20 sm:mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-amber-500/15 gap-2">
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-amber-400">
              Interactive Traditions
            </p>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ivory mt-0.5">
              Play at Home
            </h2>
          </div>
          <Link
            to="/play"
            className="text-xs sm:text-sm text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1 font-medium group"
          >
            <span>Explore all games</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FESTIVAL_ACTIVITIES.map((act) => (
            <Link
              key={act.id}
              to={`/play/${act.id}`}
              onClick={() => playChimeNote(2)}
              className="group text-left p-5 sm:p-6 rounded-3xl bg-stone-950/70 hover:bg-amber-950/40 border border-amber-500/20 hover:border-amber-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(245,158,11,0.2)] focus-visible:ring-2 focus-visible:ring-amber-400 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-2xl group-hover:scale-115 group-hover:bg-amber-500/20 transition-all shrink-0 shadow-inner">
                {act.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-ivory group-hover:text-amber-200 transition-colors">
                    {act.name}
                  </h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 font-medium shrink-0">
                    {act.badge}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-1.5 font-light leading-relaxed">
                  {act.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Poetic Footer */}
      <footer className="mt-24 pt-10 border-t border-amber-500/15 text-center text-xs text-stone-400/90 space-y-2">
        <p className="font-display text-base text-amber-200/90 font-medium">
          The Light We Carry · Nepal’s Festival of Lights
        </p>
        <p>Made for the KUCC Tihar–Chhath Web UI Design Competition 2026.</p>
        <p className="text-stone-500 font-light text-[11px]">
          Everything on screen is drawn in code. May gratitude and light find their way into every home.
        </p>
      </footer>
    </div>
  );
}
