import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLight } from "../../context/LightContext";
import { TIHAR_DAYS, CHHATH_CAPTION_STEPS } from "../../data/festivalData";

// Cultural illustrations for each day
import Crow from "../svg/Crow";
import Dog from "../svg/Dog";
import Cow from "../svg/Cow";
import Ox from "../svg/Ox";
import TikaPlate from "../svg/TikaPlate";

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
      // String slug mapping
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
    setRitualDone(true);
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        releaseLantern();
      }, i * 180);
    }
    playChimeNote(dayIndex + 1);
    showToast(currentDay.toastMessage);
  };

  const getChhathCaption = () => {
    if (chhathSlider < 0.34) return CHHATH_CAPTION_STEPS[0];
    if (chhathSlider < 0.67) return CHHATH_CAPTION_STEPS[1];
    return CHHATH_CAPTION_STEPS[2];
  };

  // Render authentic SVG artwork per day
  const renderDayArtwork = () => {
    switch (dayIndex) {
      case 0:
        return <Crow className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />;
      case 1:
        return <Dog className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />;
      case 2:
        return <Cow className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />;
      case 3:
        return <Ox className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />;
      case 4:
        return <TikaPlate className="w-full max-w-[280px] h-auto mx-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 min-h-screen pt-20 pb-28 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-between">
      {/* 1. Step Progress Bar */}
      <div className="my-4">
        <ol
          className="flex items-center gap-2 max-w-2xl mx-auto"
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
                  className="w-full h-9 flex flex-col justify-center group focus-visible:outline-none"
                  aria-label={`${idx < 5 ? `Day ${idx + 1}: ${day.title}` : "Chhath"}`}
                >
                  <div
                    className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                      isCur
                        ? "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.85)] scale-y-125"
                        : isPast
                        ? "bg-amber-600/70"
                        : "bg-stone-800/80 group-hover:bg-stone-700"
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-1 font-medium tracking-wider uppercase text-center block transition-opacity ${
                      isCur ? "text-amber-300 font-semibold" : "text-stone-500 opacity-60"
                    }`}
                  >
                    {idx < 5 ? `Day ${idx + 1}` : "Chhath"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      {/* 2. Main Narrative Stage Card */}
      <div className="my-auto py-4">
        <div className="relative p-6 sm:p-10 rounded-3xl bg-stone-950/75 border border-amber-500/25 backdrop-blur-2xl shadow-2xl shadow-black/90 max-w-3xl mx-auto transition-all duration-500">
          {!isChhath ? (
            /* Days 1 to 5 */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Artwork Column */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-950/20 border border-amber-500/15">
                {renderDayArtwork()}
                <span className="text-3xl mt-3">{currentDay.emoji}</span>
              </div>

              {/* Story Narrative Column */}
              <div className="md:col-span-7 space-y-3.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400">
                    Day {dayIndex + 1} of 5 · Tihar
                  </span>
                  <span className="text-xs text-stone-400 font-light">
                    {currentDay.subtitle}
                  </span>
                </div>

                <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ivory tracking-tight leading-tight">
                  {currentDay.title}
                </h2>

                <p className="font-devanagari text-lg sm:text-xl text-amber-300 tracking-wide font-normal">
                  {currentDay.devanagari}
                </p>

                <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
                  {currentDay.summary}
                </p>

                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light pt-2 border-t border-amber-500/10">
                  {currentDay.deepDescription}
                </p>

                {/* Ritual Action */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRitualClick}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>{currentDay.emoji}</span>
                    <span>{currentDay.actionLabel}</span>
                  </button>

                  {ritualDone && (
                    <span className="text-xs text-amber-300 animate-fade-in flex items-center gap-1.5 font-medium">
                      <span>✦</span>
                      <span>{currentDay.toastMessage}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Day 6: Chhath Puja with Interactive River Sun Scrubber */
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-teal-400 flex items-center gap-2">
                  <span>🌅</span>
                  <span>Chhath Puja · <strong className="font-devanagari font-normal">छठ पूजा</strong></span>
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">
                  {chhathSlider < 0.34
                    ? "Sandhya Arghya (Sunset)"
                    : chhathSlider < 0.67
                    ? "Night Vigil"
                    : "Usha Arghya (Sunrise)"}
                </span>
              </div>

              <div>
                <h2 className="font-display font-semibold text-3xl sm:text-5xl text-ivory tracking-tight leading-tight">
                  Light Meets the Holy River
                </h2>
                <p className="text-sm sm:text-base text-stone-200 mt-2 font-light leading-relaxed min-h-[3rem]">
                  {getChhathCaption()}
                </p>
              </div>

              {/* Interactive Time of Day Scrubber */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-stone-300">Drag to move through the sacred hours:</span>
                  <span className="text-amber-400 font-semibold">{Math.round(chhathSlider * 100)}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={chhathSlider}
                  onChange={(e) => setChhathSlider(parseFloat(e.target.value))}
                  className="w-full h-2.5 rounded-lg bg-stone-900 accent-amber-400 cursor-pointer appearance-none outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Chhath time of day from sunset to sunrise"
                />

                <div className="flex justify-between text-[11px] font-semibold tracking-wider uppercase text-stone-400 pt-1">
                  <span className={chhathSlider < 0.34 ? "text-amber-400 font-bold" : ""}>
                    1. Sandhya (Sunset)
                  </span>
                  <span className={chhathSlider >= 0.34 && chhathSlider < 0.67 ? "text-amber-400 font-bold" : ""}>
                    2. Night Prayer
                  </span>
                  <span className={chhathSlider >= 0.67 ? "text-amber-400 font-bold" : ""}>
                    3. Usha (Sunrise)
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Devotees stand waist-deep in the river, lifting bamboo soop baskets filled with fruits and thekua to Surya and Chhathi Maiya. Look at the living river canvas in the background reflecting the moving sun!
              </p>
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
              &larr; Back
            </button>

            <span className="text-xs text-stone-500 hidden sm:inline">
              Use &larr; &rarr; arrow keys to navigate
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
              className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-semibold text-xs sm:text-sm tracking-wide hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.35)]"
            >
              {dayIndex === 5 ? "Make a card &rarr;" : "Next day &rarr;"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
