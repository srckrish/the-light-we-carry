import { useLight } from "../../context/LightContext";

export default function CentralDiya() {
  const { lit, light } = useLight();

  return (
    <div className="relative flex flex-col items-center justify-center my-6 sm:my-10 select-none">
      {/* Sacred Floor Rangoli Mandala Pedestal beneath the Diya */}
      <div
        className={`absolute -bottom-8 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none transition-all duration-1000 ${
          lit
            ? "opacity-90 scale-100 drop-shadow-[0_0_40px_rgba(245,158,11,0.5)]"
            : "opacity-35 scale-90"
        }`}
      >
        <svg
          viewBox="0 0 400 400"
          className={`w-full h-full transition-transform duration-1000 ${
            lit ? "animate-spin-slow" : ""
          }`}
          aria-hidden="true"
        >
          {/* Concentric Guide Circles */}
          <circle cx="200" cy="200" r="185" stroke="#F59E0B" strokeWidth="1" strokeDasharray="6 4" opacity="0.3" fill="none" />
          <circle cx="200" cy="200" r="160" stroke="#E11D48" strokeWidth="1.2" opacity="0.4" fill="none" />
          <circle cx="200" cy="200" r="125" stroke="#FBBF24" strokeWidth="1" opacity="0.4" fill="none" />
          <circle cx="200" cy="200" r="85" stroke="#F59E0B" strokeWidth="1.5" opacity="0.5" fill="none" />

          {/* 16 Outer Sayapatri Marigold Petals */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={`petal-outer-${i}`} transform={`rotate(${angle} 200 200)`}>
                <path
                  d="M200 35 C188 80, 188 120, 200 145 C212 120, 212 80, 200 35 Z"
                  fill={lit ? (i % 2 === 0 ? "#F59E0B" : "#FBBF24") : "#5C3814"}
                  opacity={lit ? "0.85" : "0.3"}
                />
                <circle cx="200" cy="28" r="3" fill={lit ? "#E11D48" : "#3D2016"} />
              </g>
            );
          })}

          {/* 12 Middle Lotus Petals in Sacred Crimson Vermillion */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12 + 15;
            return (
              <g key={`petal-mid-${i}`} transform={`rotate(${angle} 200 200)`}>
                <path
                  d="M200 80 C190 115, 190 140, 200 160 C210 140, 210 115, 200 80 Z"
                  fill={lit ? (i % 2 === 0 ? "#DC2626" : "#E11D48") : "#4A1A1A"}
                  opacity={lit ? "0.9" : "0.3"}
                />
                <circle cx="200" cy="74" r="2.5" fill={lit ? "#FFFBEB" : "#2E1515"} />
              </g>
            );
          })}

          {/* 8 Inner Golden Flame Petals */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <g key={`petal-inner-${i}`} transform={`rotate(${angle} 200 200)`}>
                <ellipse
                  cx="200"
                  cy="140"
                  rx="7"
                  ry="18"
                  fill={lit ? "#FEF08A" : "#3D2A14"}
                  opacity={lit ? "0.95" : "0.3"}
                />
              </g>
            );
          })}

          {/* Center Rosette Disc */}
          <circle cx="200" cy="200" r="50" fill={lit ? "#78350F" : "#1A100A"} opacity="0.8" />
          <circle cx="200" cy="200" r="32" fill={lit ? "#B45309" : "#140C07"} />
        </svg>
      </div>

      {/* Diya Button — large tap target, works on first click */}
      <button
        type="button"
        onClick={light}
        aria-label={lit ? "The diya is burning brightly" : "Tap to light the diya"}
        className={`group relative z-10 rounded-full flex items-center justify-center transition-all duration-700 outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 ${
          lit
            ? "w-48 h-48 sm:w-56 sm:h-56 cursor-default"
            : "w-56 h-56 sm:w-64 sm:h-64 cursor-pointer hover:scale-105 active:scale-95"
        }`}
      >
        {/* Ambient Radial Flame Bloom */}
        <div
          className={`absolute inset-0 -m-16 rounded-full transition-all duration-1000 pointer-events-none ${
            lit
              ? "bg-radial from-amber-300/40 via-amber-600/20 to-transparent blur-2xl scale-125 animate-pulse"
              : "bg-radial from-amber-500/10 to-transparent blur-xl scale-75 group-hover:scale-95 group-hover:from-amber-500/25"
          }`}
        />

        {/* Diya SVG Artwork */}
        <svg
          viewBox="0 0 240 200"
          className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="clayBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2875C" />
              <stop offset="35%" stopColor="#C25A34" />
              <stop offset="75%" stopColor="#8A3416" />
              <stop offset="100%" stopColor="#541B08" />
            </linearGradient>

            <radialGradient id="oilPoolGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6E3218" />
              <stop offset="65%" stopColor="#3B180A" />
              <stop offset="100%" stopColor="#1E0A04" />
            </radialGradient>

            <linearGradient id="flameOuterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="80%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            <linearGradient id="flameInnerGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="55%" stopColor="#FFFBEB" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            <filter id="flameGlowEffect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Diya Clay Pot Belly */}
          <path
            d="M45 120 C45 190, 195 190, 195 120 C195 148, 45 148, 45 120 Z"
            fill="url(#clayBaseGrad)"
            stroke="#4A1807"
            strokeWidth="1.8"
          />

          {/* Terracotta Lip */}
          <ellipse cx="120" cy="120" rx="74" ry="16" fill="url(#clayBaseGrad)" stroke="#3D1305" strokeWidth="1.2" />
          {/* Mustard Oil Reservoir Pool */}
          <ellipse cx="120" cy="119" rx="66" ry="12" fill="url(#oilPoolGrad)" />

          {/* Braided Cotton Wick */}
          <rect x="116.5" y="104" width="7" height="17" rx="3.5" fill="#1C0E06" />

          {/* Flame Rendering */}
          {lit ? (
            <g filter="url(#flameGlowEffect)">
              {/* Outer Radiant Flame */}
              <path
                d="M120 106 C85 82, 92 40, 120 12 C148 40, 155 82, 120 106 Z"
                fill="url(#flameOuterGrad)"
                className="origin-bottom animate-flame-wave"
              />

              {/* Inner White Hot Flame Core */}
              <path
                d="M120 106 C102 88, 105 56, 120 32 C135 56, 138 88, 120 106 Z"
                fill="url(#flameInnerGrad)"
                className="origin-bottom animate-flame-core"
              />
            </g>
          ) : (
            /* Unlit Ember Wick tip that beckons the user */
            <g>
              <circle
                cx="120"
                cy="103"
                r="6"
                className="fill-amber-400 animate-ping opacity-75"
              />
              <circle cx="120" cy="103" r="4" fill="#F59E0B" />
              <circle cx="120" cy="103" r="2" fill="#FFFBEB" />
            </g>
          )}
        </svg>
      </button>

      {/* Gentle Pulsing Cue below Diya if unlit */}
      {!lit && (
        <div className="mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 backdrop-blur-md shadow-lg animate-pulse">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-amber-300">
            Tap the diya to begin
          </span>
        </div>
      )}
    </div>
  );
}
