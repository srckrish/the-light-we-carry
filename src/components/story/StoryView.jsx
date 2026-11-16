import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { useLight } from "../../context/LightContext";
import { TIHAR_DAYS } from "../../data/festivalData";

// Cultural illustrations for each day
import Crow from "../svg/Crow";
import Dog from "../svg/Dog";
import Cow from "../svg/Cow";
import Ox from "../svg/Ox";
import TikaPlate from "../svg/TikaPlate";
import ChhathSoop from "../svg/ChhathSoop";

const CHHATH_EXPERIENCE = {
  sunset: {
    id: "sunset",
    title: "Sandhya Arghya · सन्ध्या अर्घ्य",
    time: "Sunset Twilight",
    icon: "🌅",
    action: "Perform Sunset Arghya 🌅",
    toast: "Arghya offered to the setting sun as river waters turn to gold.",
    rituals: [
      { icon: "🌊", title: "River Immersion", desc: "Devotees stand waist-deep in the holy river waters." },
      { icon: "🎋", title: "Bamboo Soop", desc: "Lifting trays of Thekua, sugarcane, coconut, and harvest." },
      { icon: "🌅", title: "Astachalgami Surya", desc: "Offering arghya to the setting sun in grateful devotion." },
    ],
    next: {
      heading: "Sunset Arghya Offered · What's Next?",
      desc: "Twilight fades into the sacred river. Devotees return to the riverbank to prepare clay elephant shrines (Kosiya) and gather under the stars for the night vigil.",
      btnText: "Proceed to Night Vigil (Kosiya Bharai)",
      targetSlider: 0.5,
    },
  },
  night: {
    id: "night",
    title: "Kosiya Bharai · रातको जागरण",
    time: "Midnight River Vigil",
    icon: "🌌",
    action: "Light Riverbank Diyas 🪔",
    toast: "Terracotta Kosiya lamps lit along the ghats under starlight.",
    rituals: [
      { icon: "🪔", title: "Kosiya Diyas", desc: "Clay elephant shrines illuminated along the riverbank." },
      { icon: "🌌", title: "Starry Vigil", desc: "Families remain by the water through the peaceful night." },
      { icon: "🎶", title: "Folk Hymns", desc: "Singing age-old traditional songs celebrating Chhathi Maiya." },
    ],
    next: {
      heading: "Night Vigil Kept · What's Next?",
      desc: "Lamps have stayed lit through the peaceful night. Before dawn breaks, devotees prepare sacred milk and wade back into the river to greet the returning sun.",
      btnText: "Proceed to Dawn Sunrise (Usha Arghya)",
      targetSlider: 0.85,
    },
  },
  sunrise: {
    id: "sunrise",
    title: "Usha Arghya · उषा अर्घ्य",
    time: "Dawn Awakening",
    icon: "☀️",
    action: "Greet Dawn Sun & Complete Fast ✦",
    toast: "Dawn Arghya blessed! The 36-hour fast is completed.",
    rituals: [
      { icon: "☀️", title: "Udayagami Surya", desc: "Welcoming the first golden morning rays on the water." },
      { icon: "🥛", title: "Doodh Arghya", desc: "Pouring sacred milk and holy water toward the rising sun." },
      { icon: "🌾", title: "Paran (Fast Break)", desc: "Concluding the 36-hr fast and sharing blessed Thekua." },
    ],
    next: {
      heading: "Chhath Mahaparv Completed!",
      desc: "The 36-hour waterless fast is joyfully concluded. Blessed Thekua prasad is distributed to family and community. May Lord Surya bring radiant health, warmth, and gratitude into your home.",
      isComplete: true,
    },
  },
};

export default function StoryView({ chhathSlider, setChhathSlider }) {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const { releaseLantern, playChimeNote, showToast } = useLight();

  // Parse current day index from URL (1 to 6)
  let dayIndex = 0;
  if (dayId) {
    const parsed = parseInt(dayId, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 6) {
      dayIndex = parsed - 1;
    } else {
      const slugMap = {
        kaag: 0,
        kukur: 1,
        gai: 2,
        goru: 3,
        bhai: 4,
        chhath: 5,
      };
      if (slugMap[dayId] !== undefined) {
        dayIndex = slugMap[dayId];
      }
    }
  }

  const currentDay = TIHAR_DAYS[dayIndex] || TIHAR_DAYS[0];
  const isChhath = dayIndex === 5;
  const [ritualDone, setRitualDone] = useState(false);

  useEffect(() => {
    setRitualDone(false);
  }, [dayIndex]);

  // Keyboard navigation: ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        if (dayIndex < 5) {
          navigate(`/story/${dayIndex + 2}`);
        } else {
          navigate("/play/card");
        }
      } else if (e.key === "ArrowLeft") {
        if (dayIndex > 0) {
          navigate(`/story/${dayIndex}`);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dayIndex, navigate]);

  const handleRitualClick = () => {
    if (ritualDone) return; // prevent repeat
    setRitualDone(true);
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        releaseLantern();
      }, i * 180);
    }
    playChimeNote(dayIndex + 1);
    showToast(currentDay.toastMessage);
  };

  const currentChhathPhase =
    chhathSlider < 0.34 ? "sunset" : chhathSlider < 0.67 ? "night" : "sunrise";
  const activeExp = CHHATH_EXPERIENCE[currentChhathPhase];

  const renderDayArtwork = () => {
    switch (dayIndex) {
      case 0:
        return <Crow className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]" />;
      case 1:
        return <Dog className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]" />;
      case 2:
        return <Cow className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]" />;
      case 3:
        return <Ox className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]" />;
      case 4:
        return <TikaPlate className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]" />;
      case 5:
        return <ChhathSoop phase={currentChhathPhase} className="w-full max-w-[340px] h-auto mx-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 min-h-screen pt-20 pb-28 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-between">
      {/* 1. Step Progress Bar */}
      <div className="my-4">
        <ol
          className="flex items-center gap-2 sm:gap-3 max-w-3xl mx-auto"
          aria-label="Story chapters progress"
        >
          {TIHAR_DAYS.map((day, idx) => {
            const isPast = idx < dayIndex;
            const isCur = idx === dayIndex;
            return (
              <li key={day.id} className="flex-1">
                <Link
                  to={`/story/${idx + 1}`}
                  onClick={() => playChimeNote(idx)}
                  className="w-full py-2 flex flex-col justify-center group focus-visible:outline-none"
                  aria-label={`${idx < 5 ? `Day ${idx + 1}: ${day.title}` : "Chhath"}`}
                >
                  <div
                    className={`h-2 w-full rounded-full transition-all duration-500 ${
                      isCur
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.9)] scale-y-125"
                        : isPast
                        ? "bg-amber-600/70"
                        : "bg-stone-800/80 group-hover:bg-stone-700"
                    }`}
                  />
                  <div className="flex items-center justify-center gap-1 mt-1.5">
                    <span className="text-xs hidden sm:inline">{day.emoji}</span>
                    <span
                      className={`text-[11px] font-medium tracking-wider uppercase text-center block transition-opacity ${
                        isCur ? "text-amber-300 font-semibold" : "text-stone-500 opacity-70"
                      }`}
                    >
                      {idx < 5 ? `Day ${idx + 1}` : "Chhath"}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      {/* 2. Main Narrative Stage Card */}
      <div className="my-auto py-4">
        <div className="relative p-6 sm:p-10 rounded-3xl bg-stone-950/80 border border-amber-500/25 backdrop-blur-2xl shadow-2xl shadow-black/90 max-w-3xl mx-auto transition-all duration-500">
          {!isChhath ? (
            /* Days 1 to 5 */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Artwork Column */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-amber-950/30 to-black/50 border border-amber-500/20 shadow-inner">
                {renderDayArtwork()}
                <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-medium">
                  <span>{currentDay.emoji}</span>
                  <span>{currentDay.tagline}</span>
                </div>
              </div>

              {/* Story Narrative Column */}
              <div className="md:col-span-7 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400">
                    Day {dayIndex + 1} of 5 · Tihar
                  </span>
                  <span className="text-xs text-stone-400 font-light">
                    {currentDay.subtitle}
                  </span>
                </div>

                <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight leading-tight">
                  {currentDay.title}
                </h2>

                <p className="font-devanagari text-xl sm:text-2xl text-amber-300/90 tracking-wide font-normal">
                  {currentDay.devanagari}
                </p>

                <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
                  {currentDay.summary}
                </p>

                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light pt-2 border-t border-amber-500/10">
                  {currentDay.deepDescription}
                </p>

                {/* Ritual Action — no duplicate inline toast */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRitualClick}
                    disabled={ritualDone}
                    className={`px-7 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 ${
                      ritualDone
                        ? "bg-amber-900/40 text-amber-300/70 cursor-default border border-amber-500/25"
                        : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95"
                    }`}
                  >
                    <span>{currentDay.emoji}</span>
                    <span>{ritualDone ? "Offering complete ✦" : currentDay.actionLabel}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Day 6: Chhath Puja - Experiential Stage Walkthrough */
            <div className="space-y-6 text-left">
              {/* Header with 3 Phase Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-500/15 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌅</span>
                    <h3 className="font-display font-semibold text-2xl text-ivory">
                      Chhath Puja · <span className="font-devanagari font-normal text-amber-300">छठ पूजा</span>
                    </h3>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Experience the 3 sacred phases of the river pilgrimage
                  </p>
                </div>

                {/* Experiential Phase Tabs: Sunset ➔ Night ➔ Sunrise */}
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-stone-900/90 border border-amber-500/25">
                  {[
                    { id: "sunset", label: "Sunset", icon: "🌅", val: 0.15 },
                    { id: "night", label: "Night", icon: "🌌", val: 0.5 },
                    { id: "sunrise", label: "Sunrise", icon: "☀️", val: 0.85 },
                  ].map((p) => {
                    const isActive = currentChhathPhase === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setChhathSlider(p.val);
                          setRitualDone(false);
                          playChimeNote(p.id === "sunset" ? 1 : p.id === "night" ? 2 : 4);
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 active:scale-95 ${
                          isActive
                            ? "bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105"
                            : "text-stone-400 hover:text-amber-200"
                        }`}
                      >
                        <span>{p.icon}</span>
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Visual & Ritual Walkthrough */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Visual Viewport Column */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-3xl bg-stone-950/70 border border-amber-500/20 shadow-inner">
                  {renderDayArtwork()}

                  {/* Sun Scrubber */}
                  <div className="w-full mt-3 pt-2 border-t border-amber-500/15 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono">
                      <span>🌅 Sunset</span>
                      <span>🌌 Night</span>
                      <span>☀️ Sunrise</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={chhathSlider}
                      onChange={(e) => {
                        setChhathSlider(parseFloat(e.target.value));
                        setRitualDone(false);
                      }}
                      className="w-full h-1.5 rounded-lg bg-stone-800 accent-amber-400 cursor-pointer appearance-none outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      aria-label="Chhath time of day from sunset to sunrise"
                    />
                  </div>
                </div>

                {/* Concise Ritual Actions for the Active Phase */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Phase: {activeExp.time}
                    </span>
                    <span className="text-xs font-devanagari text-amber-300">
                      {activeExp.title.split("·")[1]}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-2xl text-ivory">
                    {activeExp.title.split("·")[0]}
                  </h3>

                  {/* 3 Visual Ritual Bullets (Clean & minimal text!) */}
                  <div className="space-y-2">
                    {activeExp.rituals.map((r) => (
                      <div
                        key={r.title}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/15"
                      >
                        <span className="text-lg shrink-0 mt-0.5">{r.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-amber-200">{r.title}</p>
                          <p className="text-[11px] text-stone-300 font-light mt-0.5 leading-snug">{r.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Ritual Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (ritualDone) return;
                        setRitualDone(true);
                        for (let i = 0; i < 3; i++) {
                          setTimeout(releaseLantern, i * 180);
                        }
                        if (currentChhathPhase === "sunrise") {
                          confetti({
                            particleCount: 75,
                            spread: 80,
                            origin: { y: 0.6 },
                            colors: ["#F59E0B", "#FBBF24", "#FEF08A", "#FFFBEB"],
                          });
                        }
                        playChimeNote(currentChhathPhase === "sunset" ? 2 : currentChhathPhase === "night" ? 3 : 5);
                        showToast(activeExp.toast);
                      }}
                      disabled={ritualDone}
                      className={`w-full sm:w-auto px-7 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                        ritualDone
                          ? "bg-amber-900/40 text-amber-300/80 cursor-default border border-amber-500/30"
                          : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95"
                      }`}
                    >
                      <span>{activeExp.icon}</span>
                      <span>{ritualDone ? "Ritual complete ✦" : activeExp.action}</span>
                    </button>
                  </div>

                  {/* "What's Next" Narrative Progression Card */}
                  {ritualDone && activeExp.next && (
                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 via-stone-950/95 to-amber-950/40 border border-amber-400/40 shadow-xl text-left space-y-2.5 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300 flex items-center gap-1.5">
                          <span>✦</span>
                          <span>{activeExp.next.heading}</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-200 border border-amber-400/25">
                          Next Stage
                        </span>
                      </div>

                      <p className="text-xs text-stone-200 font-light leading-relaxed">
                        {activeExp.next.desc}
                      </p>

                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        {!activeExp.next.isComplete ? (
                          <button
                            type="button"
                            onClick={() => {
                              setChhathSlider(activeExp.next.targetSlider);
                              setRitualDone(false);
                              playChimeNote(activeExp.next.targetSlider < 0.6 ? 3 : 5);
                            }}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs tracking-wide shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>{activeExp.next.btnText}</span>
                            <span>→</span>
                          </button>
                        ) : (
                          <div className="flex flex-wrap items-center gap-2 w-full">
                            <Link
                              to="/play/card"
                              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs tracking-wide shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                            >
                              <span>Share Festival Blessings</span>
                              <span>💌</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setChhathSlider(0.15);
                                setRitualDone(false);
                                playChimeNote(1);
                              }}
                              className="px-4 py-2 rounded-full bg-stone-900 border border-amber-500/30 text-stone-300 hover:text-amber-200 text-xs transition-colors"
                            >
                              Experience Chhath Again ↺
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Compact 4-Step Observance Journey */}
              <div className="pt-3 border-t border-amber-500/15">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  {[
                    { day: "Day 1", name: "Nahay-Khay", sub: "River purification dip" },
                    { day: "Day 2", name: "Kharna", sub: "Fast & jaggery kheer" },
                    { day: "Day 3", name: "Sandhya Arghya", sub: "Sunset water offering" },
                    { day: "Day 4", name: "Usha Arghya", sub: "Dawn sun & fast break" },
                  ].map((s) => (
                    <div
                      key={s.name}
                      className="p-2 rounded-xl bg-stone-900/60 border border-amber-500/10 text-center"
                    >
                      <span className="block text-[9px] uppercase tracking-wider text-amber-400/80 font-mono">{s.day}</span>
                      <span className="block font-semibold text-stone-200 mt-0.5">{s.name}</span>
                      <span className="block text-[10px] text-stone-400 font-light mt-0.5">{s.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-amber-500/15 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (dayIndex > 0) navigate(`/story/${dayIndex}`);
              }}
              disabled={dayIndex === 0}
              className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all ${
                dayIndex === 0
                  ? "border-stone-800 text-stone-600 cursor-not-allowed"
                  : "border-amber-500/30 text-stone-300 hover:text-amber-200 hover:border-amber-400"
              }`}
            >
              ← Back
            </button>

            <span className="text-xs text-stone-500 hidden sm:inline">
              Use ← → arrow keys to navigate
            </span>

            <button
              type="button"
              onClick={() => {
                if (dayIndex < 5) {
                  navigate(`/story/${dayIndex + 2}`);
                } else {
                  navigate("/play/card");
                }
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.35)]"
            >
              {dayIndex === 5 ? "Make a card →" : "Next day →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
