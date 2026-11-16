import { useLight } from "../../context/LightContext";

export default function CentralDiya() {
  const { lit, light } = useLight();

  return (
    <div className="relative flex flex-col items-center justify-center my-8">
      {/* Diya Button */}
      <button
        type="button"
        onClick={light}
        aria-label={lit ? "The first diya is burning bright" : "Tap to light the first diya"}
        className={`group relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center transition-all duration-700 outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 ${
          lit ? "cursor-default" : "cursor-pointer hover:scale-105 active:scale-95"
        }`}
      >
        {/* Ambient Radial Glow */}
        <div
          className={`absolute inset-0 -m-16 rounded-full transition-all duration-1000 pointer-events-none ${
            lit
              ? "bg-radial from-amber-300/35 via-amber-600/15 to-transparent blur-2xl scale-125 animate-pulse"
              : "bg-radial from-amber-500/10 to-transparent blur-xl scale-75 group-hover:scale-90 group-hover:from-amber-500/20"
          }`}
        />

        {/* Outer Ring Accent */}
        <div
          className={`absolute inset-2 rounded-full border border-dashed transition-all duration-700 ${
            lit
              ? "border-amber-400/40 animate-spin-slow"
              : "border-amber-500/15 group-hover:border-amber-400/30"
          }`}
        />

        {/* Diya SVG Artwork */}
        <svg
          viewBox="0 0 240 200"
          className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        >
          <defs>
            {/* Terracotta Pot Gradient */}
            <linearGradient id="clayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9764A" />
              <stop offset="45%" stopColor="#B85C38" />
              <stop offset="100%" stopColor="#7A3319" />
            </linearGradient>

            {/* Inner Lip Gradient */}
            <radialGradient id="oilGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5A2E1C" />
              <stop offset="70%" stopColor="#3D1D11" />
              <stop offset="100%" stopColor="#24100A" />
            </radialGradient>

            {/* Outer Flame Gradient */}
            <linearGradient id="flameOuter" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="85%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Inner Flame Core */}
            <linearGradient id="flameInner" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="60%" stopColor="#FFFBEB" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Flame Glow Filter */}
            <filter id="flameGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Diya Clay Base */}
          <path
            d="M50 120 C50 185, 190 185, 190 120 C190 145, 50 145, 50 120 Z"
            fill="url(#clayGrad)"
            stroke="#5C2513"
            strokeWidth="1.5"
          />

          {/* Diya Clay Lip / Oil Well */}
          <ellipse cx="120" cy="120" rx="70" ry="14" fill="url(#clayGrad)" stroke="#4A1E0F" strokeWidth="1" />
          <ellipse cx="120" cy="119" rx="63" ry="11" fill="url(#oilGrad)" />

          {/* Cotton Wick */}
          <rect x="117" y="106" width="6" height="15" rx="3" fill="#24160E" />

          {/* Flame Rendering */}
          {lit ? (
            <g filter="url(#flameGlow)">
              {/* Animated Outer Flame */}
              <path
                d="M120 108 C90 85, 95 45, 120 20 C145 45, 150 85, 120 108 Z"
                fill="url(#flameOuter)"
                className="origin-bottom animate-flame-wave"
              />

              {/* Inner White Flame Core */}
              <path
                d="M120 108 C104 90, 106 60, 120 38 C134 60, 136 90, 120 108 Z"
                fill="url(#flameInner)"
                className="origin-bottom animate-flame-core"
              />
            </g>
          ) : (
            /* Unlit Ember Wick tip */
            <g>
              <circle
                cx="120"
                cy="105"
                r="3.5"
                className="fill-amber-500 animate-ping opacity-60"
              />
              <circle cx="120" cy="105" r="2.5" fill="#F59E0B" />
            </g>
          )}
        </svg>
      </button>

      {/* Gentle Cue below Diya if not yet lit */}
      {!lit && (
        <p className="mt-4 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-amber-400/90 animate-pulse text-center">
          Tap the diya to begin
        </p>
      )}
    </div>
  );
}
