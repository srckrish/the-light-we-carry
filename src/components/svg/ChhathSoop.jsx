export default function ChhathSoop({ phase = "sunset", className = "" }) {
  const isSunset = phase === "sunset";
  const isNight = phase === "night";
  const isSunrise = phase === "sunrise";

  return (
    <svg
      viewBox="0 0 560 380"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Chhath Puja ${phase} ritual at the river with Surya and sacred offerings`}
    >
      <defs>
        {/* Sky Backgrounds */}
        <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7C2D12" />
          <stop offset="45%" stopColor="#C2410C" />
          <stop offset="75%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050814" />
          <stop offset="50%" stopColor="#0B132B" />
          <stop offset="85%" stopColor="#1C2541" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        <linearGradient id="sunriseSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="35%" stopColor="#C2410C" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FEF08A" />
        </linearGradient>

        {/* River Water Gradients */}
        <linearGradient id="sunsetWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9A3412" />
          <stop offset="40%" stopColor="#431407" />
          <stop offset="100%" stopColor="#1A0602" />
        </linearGradient>

        <linearGradient id="nightWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        <linearGradient id="sunriseWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="35%" stopColor="#B45309" />
          <stop offset="75%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Sun Glows */}
        <radialGradient id="sunGlowAmber" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
          <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#EA580C" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="sunGlowMorning" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="30%" stopColor="#FEF08A" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#FBBF24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>

        {/* Bamboo Soop gradient */}
        <linearGradient id="soopGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2A65E" />
          <stop offset="50%" stopColor="#C9844A" />
          <stop offset="100%" stopColor="#8A4513" />
        </linearGradient>
      </defs>

      {/* ── Background Sky Frame ── */}
      <rect
        x="0"
        y="0"
        width="560"
        height="380"
        rx="24"
        fill={isSunset ? "url(#sunsetSky)" : isNight ? "url(#nightSky)" : "url(#sunriseSky)"}
      />

      {/* ── Night Sky Stars & Crescent Moon (Only during Night phase) ── */}
      {isNight && (
        <g>
          {/* Twinkling Stars */}
          {[
            [70, 40], [130, 75], [190, 30], [250, 60], [320, 35], [390, 70], [460, 45],
            [100, 110], [160, 130], [360, 120], [420, 100], [490, 125],
            [220, 95], [290, 105], [520, 60], [40, 90]
          ].map(([x, y], idx) => (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r={idx % 3 === 0 ? 1.8 : 1.2}
              fill="#FDE68A"
              opacity={0.4 + (idx % 4) * 0.2}
              className="animate-pulse"
            />
          ))}

          {/* Gentle Crescent Moon */}
          <g transform="translate(430, 50)">
            <circle cx="20" cy="20" r="18" fill="#FEF08A" opacity="0.9" />
            <circle cx="26" cy="17" r="16" fill="#0B132B" />
          </g>
        </g>
      )}

      {/* ── Sunset Setting Sun (Astachalgami Surya) ── */}
      {isSunset && (
        <g>
          <circle cx="280" cy="165" r="95" fill="url(#sunGlowAmber)" />
          <circle cx="280" cy="165" r="38" fill="#FDE68A" />
          <circle cx="280" cy="165" r="30" fill="#F59E0B" />
          <circle cx="280" cy="165" r="22" fill="#EA580C" />
          {/* Soft sunset rays */}
          {[195, 225, 255, 285, 315, 345].map((deg) => (
            <line
              key={deg}
              x1="280"
              y1="165"
              x2={280 + Math.cos((deg * Math.PI) / 180) * 110}
              y2={165 + Math.sin((deg * Math.PI) / 180) * 110}
              stroke="#FEF08A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          ))}
        </g>
      )}

      {/* ── Sunrise Dawn Sun (Udayagami Surya) ── */}
      {isSunrise && (
        <g>
          <circle cx="280" cy="100" r="125" fill="url(#sunGlowMorning)" />
          {/* Bright Morning Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="280"
              y1="100"
              x2={280 + Math.cos((deg * Math.PI) / 180) * 135}
              y2={100 + Math.sin((deg * Math.PI) / 180) * 135}
              stroke="#FFFBEB"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.75"
            />
          ))}
          <circle cx="280" cy="100" r="46" fill="#FFFBEB" />
          <circle cx="280" cy="100" r="38" fill="#FEF08A" />
          <circle cx="280" cy="100" r="28" fill="#FBBF24" />
        </g>
      )}

      {/* ── Sugarcane Canopy (उखु / ईख) ── */}
      <g stroke="#15803D" strokeWidth="4.5" strokeLinecap="round" opacity={isNight ? "0.6" : "0.9"}>
        {/* Left sugarcane arch */}
        <path d="M175 300 Q195 140 245 75" fill="none" />
        <path d="M195 180 Q220 155 245 165" fill="none" strokeWidth="2.2" stroke="#4ADE80" />
        {/* Right sugarcane arch */}
        <path d="M385 300 Q365 140 315 75" fill="none" />
        <path d="M365 180 Q340 155 315 165" fill="none" strokeWidth="2.2" stroke="#4ADE80" />
      </g>

      {/* ── River Water & Ghat Shoreline ── */}
      <g>
        <path
          d="M0 260 Q140 245 280 252 Q420 260 560 248 L560 380 L0 380 Z"
          fill={isSunset ? "url(#sunsetWater)" : isNight ? "url(#nightWater)" : "url(#sunriseWater)"}
        />

        {/* Water Ripples & Light Reflections */}
        {isSunset && (
          <g opacity="0.8">
            <ellipse cx="280" cy="275" rx="80" ry="10" fill="#FDE68A" opacity="0.6" />
            <path d="M200 290 Q280 282 360 290" stroke="#F59E0B" strokeWidth="2.5" />
            <path d="M220 310 Q280 302 340 310" stroke="#EA580C" strokeWidth="2" />
            <path d="M170 335 Q280 326 390 335" stroke="#FBBF24" strokeWidth="1.5" />
          </g>
        )}

        {isNight && (
          <g opacity="0.75">
            {/* Multiple floating river lamps at night (दीपदान) */}
            {[100, 180, 280, 380, 460].map((x, i) => (
              <g key={x} transform={`translate(${x}, ${280 + (i % 3) * 16})`}>
                <ellipse cx="0" cy="12" rx="14" ry="4" fill="#000" opacity="0.4" />
                <path d="M-10 6 Q0 16 10 6 Z" fill="#92400E" />
                <circle cx="0" cy="2" r="8" fill="#F59E0B" opacity="0.3" className="animate-pulse" />
                <path d="M0 4 Q-3 -4 0 -10 Q3 -4 0 4 Z" fill="#FDE68A" />
              </g>
            ))}
          </g>
        )}

        {isSunrise && (
          <g opacity="0.9">
            {/* Sparkling golden dawn water */}
            <ellipse cx="280" cy="270" rx="110" ry="14" fill="#FEF08A" opacity="0.8" />
            <path d="M160 285 Q280 274 400 285" stroke="#FFFBEB" strokeWidth="3" />
            <path d="M190 305 Q280 295 370 305" stroke="#FDE68A" strokeWidth="2.5" />
            <path d="M140 330 Q280 320 420 330" stroke="#F59E0B" strokeWidth="2" />
            {/* Cascading Sacred Milk Arghya (दूध अर्घ्य) */}
            <path d="M280 220 Q282 245 280 270" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />
            <circle cx="280" cy="272" r="5" fill="#FFFFFF" opacity="0.8" />
          </g>
        )}
      </g>

      {/* ── Central Ritual Centerpiece ── */}
      {/* For Sunset & Sunrise: Devotee waist-deep holding Sacred Bamboo Soop */}
      {!isNight ? (
        <g transform="translate(0, -10)">
          {/* Devotee silhouette outline standing waist-deep */}
          <path
            d="M245 275 C245 240 252 230 262 215 C265 208 272 205 280 205 C288 205 295 208 298 215 C308 230 315 240 315 275 Z"
            fill="#1E140F"
            opacity="0.85"
          />

          {/* Sacred Bamboo Soop Tray (सूप) */}
          <g transform="translate(280, 205)">
            <ellipse cx="0" cy="0" rx="75" ry="24" fill="url(#soopGrad)" stroke="#78350F" strokeWidth="2" />
            {/* Offerings: Coconut, Bananas, Thekua */}
            <ellipse cx="0" cy="-6" rx="14" ry="12" fill="#593215" />
            <circle cx="-32" cy="-4" r="8" fill="#F59E0B" />
            <circle cx="-16" cy="-2" r="7" fill="#D97706" />
            <circle cx="16" cy="-2" r="7" fill="#D97706" />
            <circle cx="32" cy="-4" r="8" fill="#FBBF24" />
            {/* Burning earthen diya in the center of the soop */}
            <path d="M0 -1 C-4 -8 0 -16 0 -16 C0 -16 4 -8 0 -1 Z" fill="#FEF08A" />
            <circle cx="0" cy="-7" r="7" fill="#F59E0B" opacity="0.4" />
          </g>
        </g>
      ) : (
        /* For Night: Sacred Terracotta Kosiya Elephant Shrine on the Riverbank */
        <g transform="translate(280, 240)">
          {/* Kosiya clay shrine base */}
          <path
            d="M-38 35 C-38 10 -25 -10 0 -22 C25 -10 38 10 38 35 Z"
            fill="#8C432C"
            stroke="#592518"
            strokeWidth="2"
          />
          {/* Multiple clay diyas on the tiers */}
          {[-26, 0, 26].map((dx) => (
            <g key={dx} transform={`translate(${dx}, 10)`}>
              <ellipse cx="0" cy="8" rx="10" ry="3.5" fill="#451A03" />
              <path d="M-6 4 Q0 12 6 4 Z" fill="#C9844A" />
              <path d="M0 2 Q-2 -5 0 -11 Q2 -5 0 2 Z" fill="#FDE68A" />
              <circle cx="0" cy="-3" r="6" fill="#F59E0B" opacity="0.45" className="animate-pulse" />
            </g>
          ))}
          <g transform="translate(0, -22)">
            <ellipse cx="0" cy="4" rx="8" ry="3" fill="#451A03" />
            <path d="M-5 2 Q0 8 5 2 Z" fill="#C9844A" />
            <path d="M0 0 Q-2 -6 0 -12 Q2 -6 0 0 Z" fill="#FEF08A" />
            <circle cx="0" cy="-4" r="7" fill="#F59E0B" opacity="0.5" className="animate-pulse" />
          </g>
        </g>
      )}
    </svg>
  );
}
