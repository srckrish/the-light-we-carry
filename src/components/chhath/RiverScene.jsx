
import Silhouettes from "./Silhouettes";

export default function RiverScene({
  sunsetSkyRef,
  nightSkyRef,
  sunriseSkyRef,
  sunRef,
  sunsetTextRef,
  nightTextRef,
  sunriseTextRef,
}) {
  return (
    <div
      className="relative isolate h-[600px] w-full overflow-hidden bg-[#0F1B2A] sm:h-[700px]"
      aria-label="Chhath riverbank at sunset, night and sunrise"
    >
      {/* SKY LAYERS */}

      <div
        ref={sunsetSkyRef}
        className="absolute inset-0 z-0"
        style={{
          opacity: 1,
          background:
            "linear-gradient(to bottom, #D96B43 0%, #F2A65A 42%, #E88D45 72%, #416C70 100%)",
        }}
      />

      <div
        ref={nightSkyRef}
        className="absolute inset-0 z-0"
        style={{
          opacity: 0,
          background:
            "linear-gradient(to bottom, #0F1B2A 0%, #192D42 55%, #243F50 100%)",
        }}
      />

      <div
        ref={sunriseSkyRef}
        className="absolute inset-0 z-0"
        style={{
          opacity: 0,
          background:
            "linear-gradient(to bottom, #405B79 0%, #E99B70 48%, #F2C56E 78%, #416C70 100%)",
        }}
      />

      {/* SUN */}
      <div
        ref={sunRef}
        className="absolute left-1/2 top-[30%] z-10 h-24 w-24 -translate-x-1/2 rounded-full bg-[#F2C56E] shadow-[0_0_70px_25px_rgba(242,197,110,0.3)] sm:h-32 sm:w-32"
        aria-hidden="true"
      />

      {/* FAR HILLS */}
      <svg
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        className="absolute bottom-[30%] z-10 h-[25%] w-full"
        aria-hidden="true"
      >
        <path
          d="M0 180 Q180 50 360 145 Q550 15 740 135 Q930 35 1120 145 Q1280 70 1440 155 L1440 260 L0 260 Z"
          fill="#263C43"
        />

        <path
          d="M0 205 Q200 120 400 185 Q600 95 800 180 Q1000 105 1200 185 Q1320 130 1440 180 L1440 260 L0 260 Z"
          fill="#1B3037"
        />
      </svg>

      {/* WATER */}
      <div className="absolute bottom-0 z-10 h-[36%] w-full overflow-hidden bg-[#416C70]">

        {/* Water highlights */}
        <div
          aria-hidden="true"
          className="water-ripple absolute left-[8%] top-[20%] h-px w-[22%] bg-[#F2C56E]/50"
        />

        <div
          aria-hidden="true"
          className="water-ripple water-ripple-slow absolute right-[12%] top-[30%] h-px w-[28%] bg-[#F5EDDF]/30"
        />

        <div
          aria-hidden="true"
          className="water-ripple water-ripple-delayed absolute left-[25%] top-[48%] h-px w-[18%] bg-[#F2C56E]/40"
        />

        <div
          aria-hidden="true"
          className="water-ripple water-ripple-slow absolute right-[25%] top-[65%] h-px w-[20%] bg-[#F5EDDF]/25"
        />

        <div
          aria-hidden="true"
          className="water-ripple water-ripple-delayed absolute left-[10%] top-[78%] h-px w-[35%] bg-[#F2C56E]/30"
        />

      </div>

      {/* DEVOTEE SILHOUETTES */}
      <Silhouettes />

      {/* RIVERBANK LIGHTS */}
      <div
        className="absolute bottom-[12%] left-0 z-30 flex w-full justify-around px-6"
        aria-hidden="true"
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="h-2 w-2 rounded-full bg-[#F2C56E] shadow-[0_0_12px_4px_rgba(242,197,110,0.55)]"
            style={{ opacity: index % 3 === 0 ? 1 : 0.65 }}
          />
        ))}
      </div>

      {/* STORY TEXT: DESKTOP */}
      <div className="pointer-events-none absolute inset-x-0 top-[8%] z-40 mx-auto flex justify-center px-5 text-center sm:top-[10%]">
        <div
          ref={sunsetTextRef}
          className="absolute w-full max-w-2xl"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#F5EDDF]/75">
            Sandhya Arghya · सन्ध्या अर्घ्य
          </p>
          <h2 className="font-display text-4xl font-semibold text-[#F5EDDF] sm:text-6xl">
            The Last Light of Day
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#F5EDDF]/85 sm:text-base">
            As the sun descends, devotees gather at the water's edge
            to offer Arghya to Surya and pray to Chhathi Maiya.
          </p>
        </div>

        <div
          ref={nightTextRef}
          className="absolute w-full max-w-2xl"
          style={{ opacity: 0 }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#F5EDDF]/60">
            Between sunset and sunrise
          </p>
          <h2 className="font-display text-4xl font-semibold text-[#F5EDDF] sm:text-6xl">
            A Night of Devotion
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#F5EDDF]/75 sm:text-base">
            Lamps glow beside the water. Families remain close,
            while prayers carry through the quiet darkness.
          </p>
        </div>

        <div
          ref={sunriseTextRef}
          className="absolute w-full max-w-2xl"
          style={{ opacity: 0 }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#F5EDDF]/75">
            Usha Arghya · उषा अर्घ्य
          </p>
          <h2 className="font-display text-4xl font-semibold text-[#F5EDDF] sm:text-6xl">
            The First Light of Dawn
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#F5EDDF]/85 sm:text-base">
            Devotees return to the water to offer Arghya to the
            rising sun, welcoming a new day with hope.
          </p>
        </div>
      </div>
    </div>
  );
}
