import tiharDays from "../../data/tihar";

function TimelineDiya({ lit }) {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      {lit && (
        <g className="diya-flame-flicker">
          <path
            d="M24 7c-3.2 5-4.6 8.2-3 11.2.8 1.6 2 2.4 3 2.4s2.2-.8 3-2.4c1.6-3 0-6.2-3-11.2z"
            fill="#F2C56E"
          />
          <path
            d="M24 14c-1.4 2.2-1.2 3.8 0 4.8 1.2-.8 1.4-2.4 0-4.8z"
            fill="#FFF6D4"
          />
        </g>
      )}
      <path
        d="M11 30c3.4 4.2 22.6 4.2 26 0-1.6 5.4-6.2 8.4-13 8.4S12.6 35.4 11 30z"
        fill={lit ? "#C9844A" : "#5C4638"}
      />
      <path
        d="M16 30.5c2.6 1.8 13.4 1.8 16 0"
        fill="none"
        stroke={lit ? "#F2C56E" : "#8A7564"}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

  const progress =
    activeDay <= 0 ? 0 : activeDay / (tiharDays.length - 1);

  return (
    <nav
      aria-label="Tihar five-day timeline"
      className="mx-auto w-full max-w-3xl"
    >
      <div className="relative flex items-start justify-between">
        <div
          aria-hidden="true"
          className="absolute left-6 right-6 top-[22px] h-px bg-ivory/15"
        />
        <div
          aria-hidden="true"
          className="absolute left-6 top-[22px] h-px bg-diya-gold transition-[width] duration-700"
          style={{ width: `calc((100% - 3rem) * ${progress})` }}
        />

        {tiharDays.map((day, index) => {
          const isActive = index <= activeDay;
          const isCurrent = index === activeDay;

          return (
            <button
              key={day.id}
              type="button"
              aria-label={`Go to ${day.name}`}
              aria-current={isCurrent ? "true" : undefined}
              onClick={() => scrollToChapter(day.id)}
              className="group relative z-10 flex w-14 flex-col items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-diya-gold sm:w-16"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 ${
                  isActive
                    ? "border-diya-gold bg-[#241C12]"
                    : "border-ivory/20 bg-midnight group-hover:border-diya-gold/60"
                }`}
              >
                <TimelineDiya lit={isActive} />
              </span>

              <span
                className={`text-[0.7rem] tabular-nums tracking-wide ${
                  isCurrent
                    ? "text-diya-gold"
                    : isActive
                      ? "text-ivory/80"
                      : "text-ivory/40 group-hover:text-ivory/80"
                }`}
              >
                0{index + 1}
              </span>

              <span
                className={`hidden text-[0.65rem] uppercase tracking-[0.16em] sm:block ${
                  isCurrent ? "text-diya-gold" : "text-ivory/45"
                }`}
              >
                {day.short}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
