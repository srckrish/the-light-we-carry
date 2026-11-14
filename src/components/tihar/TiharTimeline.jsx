import Diya from "../diya/Diya";
import tiharDays from "../../data/tihar";

export default function TiharTimeline({ activeDay }) {
  const scrollToChapter = (dayId) => {
    const chapter = document.getElementById(dayId);

    if (!chapter) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    chapter.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="Tihar five-day timeline"
      className="mx-auto mb-16 w-full max-w-3xl"
    >
      <div className="relative flex items-center justify-between">
        {/* Connecting line */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-ivory/20"
        />

        {tiharDays.map((day, index) => {
          const isActive = index <= activeDay;

          return (
            <button
              key={day.id}
              type="button"
              aria-label={`Go to ${day.name}`}
              aria-current={
                index === activeDay ? "location" : undefined
              }
              onClick={() => scrollToChapter(day.id)}
              className="group relative z-10 flex flex-col items-center gap-3 rounded-full p-2 transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-diya-gold"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${
                  isActive
                    ? "border-diya-gold bg-diya-gold/10"
                    : "border-ivory/20 bg-midnight group-hover:border-diya-gold/60"
                }`}
              >
                <Diya
                  lit={isActive}
                  className="h-9 w-9"
                />
              </div>

              <span
                className={`text-xs tabular-nums transition-colors ${
                  isActive
                    ? "text-diya-gold"
                    : "text-ivory/40 group-hover:text-ivory/80"
                }`}
              >
                0{index + 1}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
