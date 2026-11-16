export default function ChhathSoop({ className = "" }) {
  return (
    <svg
      viewBox="0 0 560 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chhath Puja sacred bamboo soop offering with Surya, sugarcane stalks, earthen diya, and holy river waters"
    >
      <defs>
        {/* Sun Glow */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8DE" stopOpacity="1" />
          <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#E7742E" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#E7742E" stopOpacity="0" />
        </radialGradient>

        {/* Soop bamboo texture */}
        <linearGradient id="bambooGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2A65E" />
          <stop offset="50%" stopColor="#C9844A" />
          <stop offset="100%" stopColor="#9B5826" />
        </linearGradient>

        {/* River water gradient */}
        <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E6266" />
          <stop offset="50%" stopColor="#1C3F43" />
          <stop offset="100%" stopColor="#0B1A1C" />
        </linearGradient>

        {/* Golden water reflection */}
        <linearGradient id="goldReflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#E7742E" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── 1. Sacred Golden Sun & Solar Rays (Surya) ── */}
      <g>
        {/* Outer solar aura */}
        <circle cx="280" cy="140" r="110" fill="url(#sunGlow)" />
        {/* Radiant sun rays */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="280"
            y1="140"
            x2={280 + Math.cos((deg * Math.PI) / 180) * 115}
            y2={140 + Math.sin((deg * Math.PI) / 180) * 115}
            stroke="#FDE68A"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />
        ))}
        {/* Core radiant disc */}
        <circle cx="280" cy="140" r="42" fill="#FDE68A" />
        <circle cx="280" cy="140" r="36" fill="#FBBF24" />
        <circle cx="280" cy="140" r="28" fill="#F59E0B" />
        <circle cx="280" cy="140" r="18" fill="#FFF8DE" />
      </g>

      {/* ── 2. Sugarcane Stalks (Ukhu) ── */}
      <g stroke="#15803D" strokeWidth="4.5" strokeLinecap="round" opacity="0.9">
        {/* Left sugarcane arch */}
        <path d="M190 310 Q210 160 250 85" fill="none" />
        <path d="M210 200 Q235 175 255 185" fill="none" strokeWidth="2.5" stroke="#4ADE80" />
        <path d="M225 150 Q245 130 270 142" fill="none" strokeWidth="2.5" stroke="#4ADE80" />
        {/* Sugarcane joints */}
        <circle cx="204" cy="235" r="3.5" fill="#166534" stroke="none" />
        <circle cx="221" cy="170" r="3.5" fill="#166534" stroke="none" />
        <circle cx="240" cy="115" r="3" fill="#166534" stroke="none" />

        {/* Right sugarcane arch */}
        <path d="M370 310 Q350 160 310 85" fill="none" />
        <path d="M350 200 Q325 175 305 185" fill="none" strokeWidth="2.5" stroke="#4ADE80" />
        <path d="M335 150 Q315 130 290 142" fill="none" strokeWidth="2.5" stroke="#4ADE80" />
        {/* Sugarcane joints */}
        <circle cx="356" cy="235" r="3.5" fill="#166534" stroke="none" />
        <circle cx="339" cy="170" r="3.5" fill="#166534" stroke="none" />
        <circle cx="320" cy="115" r="3" fill="#166534" stroke="none" />
      </g>

      {/* ── 3. Holy River Waters & Reflection ── */}
      <g>
        <path
          d="M60 310 Q170 295 280 305 Q390 315 500 300 L500 395 L60 395 Z"
          fill="url(#riverGrad)"
        />
        {/* Golden solar ripples on water */}
        <ellipse cx="280" cy="318" rx="85" ry="12" fill="url(#goldReflect)" />
        <path d="M190 332 Q280 326 370 332" stroke="#FDE68A" strokeWidth="2" opacity="0.75" />
        <path d="M210 348 Q280 342 350 348" stroke="#FBBF24" strokeWidth="1.8" opacity="0.6" />
        <path d="M160 365 Q280 358 400 365" stroke="#F59E0B" strokeWidth="1.5" opacity="0.45" />
        <path d="M230 380 Q280 375 330 380" stroke="#FDE68A" strokeWidth="1.2" opacity="0.35" />
      </g>

      {/* ── 4. Sacred Bamboo Soop (डाला / सूप) ── */}
      <g>
        {/* Soop base shadow */}
        <ellipse cx="280" cy="298" rx="145" ry="46" fill="#000" opacity="0.3" />

        {/* Soop bamboo rim & body */}
        <path
          d="M142 278 C142 322 418 322 418 278 C418 238 385 220 280 220 C175 220 142 238 142 278 Z"
          fill="url(#bambooGrad)"
          stroke="#78350F"
          strokeWidth="3.5"
        />

        {/* Woven bamboo cross-hatches */}
        <g stroke="#92400E" strokeWidth="1.2" opacity="0.55">
          <line x1="175" y1="262" x2="385" y2="262" />
          <line x1="165" y1="278" x2="395" y2="278" />
          <line x1="175" y1="294" x2="385" y2="294" />
          <line x1="215" y1="235" x2="215" y2="308" />
          <line x1="255" y1="228" x2="255" y2="315" />
          <line x1="280" y1="225" x2="280" y2="318" />
          <line x1="305" y1="228" x2="305" y2="315" />
          <line x1="345" y1="235" x2="345" y2="308" />
        </g>

        {/* ── Offerings inside the Soop (Thekua, Fruits, Coconut) ── */}
        {/* Sacred Coconut (Shreephal) */}
        <ellipse cx="280" cy="256" rx="22" ry="24" fill="#593215" />
        <ellipse cx="280" cy="246" rx="18" ry="12" fill="#78441F" />
        <circle cx="280" cy="236" r="3" fill="#D97706" />

        {/* Golden Thekua Cakes (sacred wheat, ghee & jaggery prasad) */}
        <g fill="#D97706" stroke="#92400E" strokeWidth="1">
          <ellipse cx="228" cy="275" rx="16" ry="11" transform="rotate(-15 228 275)" />
          <ellipse cx="248" cy="284" rx="15" ry="10" transform="rotate(8 248 284)" />
          <ellipse cx="312" cy="284" rx="15" ry="10" transform="rotate(-8 312 284)" />
          <ellipse cx="332" cy="275" rx="16" ry="11" transform="rotate(15 332 275)" />
        </g>
        {/* Thekua wooden mould stamp pattern */}
        <g stroke="#78350F" strokeWidth="1" strokeLinecap="round" opacity="0.75">
          <line x1="222" y1="275" x2="234" y2="275" />
          <line x1="228" y1="270" x2="228" y2="280" />
          <line x1="326" y1="275" x2="338" y2="275" />
          <line x1="332" y1="270" x2="332" y2="280" />
        </g>

        {/* Festive Bananas / Seasonal Citrus */}
        <g fill="#FBBF24" opacity="0.95">
          <ellipse cx="204" cy="265" rx="12" ry="8" transform="rotate(-30 204 265)" />
          <ellipse cx="196" cy="274" rx="11" ry="7" transform="rotate(-20 196 274)" />
          {/* Daubh / Pomelo citrus */}
          <circle cx="356" cy="264" r="14" fill="#EAB308" />
          <circle cx="354" cy="262" r="12" fill="#FACC15" />
        </g>

        {/* ── Earthen Diya with Eternal Flame (दीप) ── */}
        <g>
          {/* Diya Clay Base */}
          <path d="M266 288 C266 304 294 304 294 288 Z" fill="#8C432C" />
          <path d="M264 288 Q280 292 296 288 Q280 284 264 288 Z" fill="#C9844A" />
          {/* Diya Flame */}
          <path
            d="M280 286 C273 275 277 266 280 256 C283 266 287 275 280 286 Z"
            fill="#F59E0B"
            className="animate-pulse"
          />
          <path
            d="M280 284 C276 276 278 270 280 262 C282 270 284 276 280 284 Z"
            fill="#FFFBEB"
          />
          {/* Diya Glow */}
          <circle cx="280" cy="272" r="16" fill="#FBBF24" opacity="0.35" />
        </g>
      </g>
    </svg>
  );
}
