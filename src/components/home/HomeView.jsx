import { Link } from "react-router-dom";
import { useLight } from "../../context/LightContext";
import CentralDiya from "../diya/CentralDiya";
import IlluminatedVillage from "../scenic/IlluminatedVillage";
import RangoliStudio from "../rangoli/RangoliStudio";
import { TIHAR_DAYS } from "../../data/festivalData";

export default function HomeView() {
  const { lit, playChimeNote } = useLight();

  return (
    <div className="relative z-10 min-h-screen pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* ─── 1. Hero: Diya + Village ─── */}
      <section className="flex flex-col items-center justify-center min-h-[55vh] text-center my-2">
        <CentralDiya />

        <div className="w-full max-w-3xl mx-auto -mt-6 mb-6">
          <IlluminatedVillage className="rounded-3xl border border-amber-500/15 backdrop-blur-md bg-stone-950/40 shadow-2xl" />
          <p className="text-[11px] text-stone-400/80 mt-2 tracking-wide font-light">
            {lit
              ? "✦ The homes of the valley glow with Tihar batti and warm oil lamps."
              : "Tap the central diya to ignite the valley lights."}
          </p>
        </div>

        {/* Simple CTAs — appear immediately after lighting */}
        <div
          className={`transition-all duration-700 ${
            lit ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
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

      {/* ─── 2. Rangoli Studio (hero placement) ─── */}
      <section className="mt-16 sm:mt-24">
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-amber-400 mb-1">
            Interactive Art
          </p>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ivory">
            Create Your Sacred Rangoli
          </h2>
          <p className="text-sm text-stone-400 font-light mt-2 max-w-md mx-auto">
            Draw with 16-axis symmetry. Pick a color, choose a motif, and make
            it glow.
          </p>
        </div>
        <RangoliStudio isHero={true} />
      </section>

      {/* ─── 3. Five Days timeline ─── */}
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

      {/* ─── 4. Play banner ─── */}
      <section className="mt-20 sm:mt-28 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-3">
          Games &amp; Traditions
        </p>
        <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ivory mb-4">
          Play at Home
        </h2>
        <p className="text-sm text-stone-400 font-light max-w-md mx-auto mb-6">
          Memory cards, trivia, Laxmi's footsteps, wish cards and more — six
          interactive festival experiences await.
        </p>
        <Link
          to="/play"
          className="inline-block px-8 py-3.5 rounded-full bg-amber-950/40 hover:bg-amber-900/40 border border-amber-500/30 text-amber-200 font-medium tracking-wide hover:border-amber-400/60 transition-all backdrop-blur-md text-sm sm:text-base hover:scale-105 active:scale-95"
        >
          Explore all games →
        </Link>
      </section>

      {/* ─── 5. Footer ─── */}
      <footer className="mt-24 pt-10 border-t border-amber-500/15 text-center text-xs text-stone-400/90 space-y-2">
        <p className="font-display text-base text-amber-200/90 font-medium">
          The Light We Carry · Nepal's Festival of Lights
        </p>
        <p className="text-stone-500 font-light text-[11px]">
          May gratitude and light find
          their way into every home.
        </p>
      </footer>
    </div>
  );
}
