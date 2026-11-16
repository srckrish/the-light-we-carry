import { useLight } from "../../context/LightContext";

export default function IlluminatedVillage({ className = "" }) {
  const { lit, releaseLantern, playChimeNote } = useLight();

  const handleHouseClick = (e) => {
    playChimeNote(3);
    releaseLantern(e.clientX, e.clientY);
  };

  return (
    <div
      onClick={handleHouseClick}
      className={`relative w-full overflow-hidden select-none cursor-pointer transition-all duration-1000 ${className}`}
      title="Tap the illuminated homes to send a light into the sky"
      role="img"
      aria-label="Illuminated traditional Nepali homes and temples during Tihar"
    >
      <svg
        viewBox="0 0 1200 480"
        className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ambient Window Interior Glow */}
          <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
          </radialGradient>

          {/* Pagoda Roof Shading */}
          <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E1B15" />
            <stop offset="60%" stopColor="#1E100C" />
            <stop offset="100%" stopColor="#120906" />
          </linearGradient>

          {/* Traditional Brick Wall Gradient */}
          <linearGradient id="brickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#26120D" />
            <stop offset="50%" stopColor="#1B0C08" />
            <stop offset="100%" stopColor="#100705" />
          </linearGradient>

          {/* Distant Mountain Ridge Gradient */}
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#120E1C" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#07050E" stopOpacity="0.95" />
          </linearGradient>

          {/* Diya Flame Glow */}
          <radialGradient id="diyaMiniGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FDE68A" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Distant Mountain Silhouettes (Himalayan Ridges) */}
        <path
          d="M0 240 L120 180 L260 220 L380 150 L520 205 L680 140 L820 195 L960 160 L1100 210 L1200 175 L1200 480 L0 480 Z"
          fill="url(#mountainGrad)"
          opacity="0.75"
        />
        <path
          d="M0 270 L180 220 L340 255 L500 195 L650 240 L840 180 L1020 230 L1200 215 L1200 480 L0 480 Z"
          fill="#0D0914"
          opacity="0.9"
        />

        {/* 2. Traditional Left House (Kathmandu Brick Dwelling) */}
        <g id="left-house">
          {/* Main Walls */}
          <rect x="60" y="220" width="280" height="260" fill="url(#brickGrad)" stroke="#381D14" strokeWidth="1.5" />

          {/* Ground Floor Base Stones */}
          <rect x="50" y="450" width="300" height="30" fill="#140B08" />

          {/* Lower Floor Roof Eave */}
          <path d="M40 330 L360 330 L340 310 L60 310 Z" fill="url(#roofGrad)" stroke="#4A2519" strokeWidth="1.5" />

          {/* Top Sloping Roof with Upturned Corners */}
          <path
            d="M30 225 Q190 205 370 225 L350 195 Q200 185 50 195 Z"
            fill="url(#roofGrad)"
            stroke="#4A2519"
            strokeWidth="2"
          />

          {/* Traditional Carved Wooden Windows (Aakhi Jhyal) */}
          {/* Upper Windows */}
          {[100, 200].map((xPos, i) => (
            <g key={`upper-win-${i}`}>
              {/* Window Frame */}
              <rect x={xPos} y="240" width="56" height="52" rx="3" fill="#1C0E0A" stroke="#4A281C" strokeWidth="2" />
              {/* Interior Glow (Active when lit) */}
              <rect
                x={xPos + 4}
                y="244"
                width="48"
                height="44"
                rx="2"
                fill="url(#windowGlow)"
                className={`transition-opacity duration-1000 ${lit ? "opacity-100" : "opacity-0"}`}
              />
              {/* Carved Wood Lattice Grille */}
              <line x1={xPos + 16} y1="240" x2={xPos + 16} y2="292" stroke="#2B150F" strokeWidth="2" />
              <line x1={xPos + 28} y1="240" x2={xPos + 28} y2="292" stroke="#2B150F" strokeWidth="2" />
              <line x1={xPos + 40} y1="240" x2={xPos + 40} y2="292" stroke="#2B150F" strokeWidth="2" />
              <line x1={xPos} y1="257" x2={xPos + 56} y2="257" stroke="#2B150F" strokeWidth="2" />
              <line x1={xPos} y1="274" x2={xPos + 56} y2="274" stroke="#2B150F" strokeWidth="2" />
            </g>
          ))}

          {/* Lower Large Sanjhya Window */}
          <g id="sanjhya-win">
            <rect x="110" y="350" width="140" height="70" rx="4" fill="#1A0D08" stroke="#4A281C" strokeWidth="2.5" />
            <rect
              x="116"
              y="355"
              width="128"
              height="60"
              rx="2"
              fill="url(#windowGlow)"
              className={`transition-opacity duration-1000 ${lit ? "opacity-95" : "opacity-0"}`}
            />
            {/* Ornate Window Columns */}
            {[148, 180, 212].map((xP) => (
              <line key={xP} x1={xP} y1="350" x2={xP} y2="420" stroke="#2B150F" strokeWidth="2.5" />
            ))}
          </g>

          {/* Marigold Doorway Garland (Toran) */}
          <path
            d="M95 440 Q180 460 265 440"
            stroke={lit ? "#F59E0B" : "#5C3814"}
            strokeWidth="3.5"
            strokeDasharray="6 3"
            fill="none"
            className="transition-colors duration-700"
          />
        </g>

        {/* 3. Central Majestic Pagoda Temple (Newari Architectural Crown) */}
        <g id="central-temple">
          {/* Plinth Base Steps */}
          <polygon points="460,480 740,480 720,440 480,440" fill="#180C08" stroke="#331A12" strokeWidth="1.5" />
          <polygon points="480,440 720,440 705,410 495,410" fill="#20100B" stroke="#3D2016" strokeWidth="1.5" />

          {/* Temple Sanctum Walls */}
          <rect x="520" y="320" width="160" height="90" fill="url(#brickGrad)" stroke="#4A2519" strokeWidth="1.5" />

          {/* Temple Carved Doorway with Golden Idol Aura */}
          <rect x="575" y="340" width="50" height="70" rx="3" fill="#120906" stroke="#4A281C" strokeWidth="2" />
          <ellipse
            cx="600"
            cy="375"
            rx="18"
            ry="25"
            fill="url(#windowGlow)"
            className={`transition-opacity duration-1000 ${lit ? "opacity-100" : "opacity-0"}`}
          />

          {/* Tier 1 Roof (Lower Pagoda Roof) */}
          <path
            d="M440 320 Q600 295 760 320 L720 280 Q600 270 480 280 Z"
            fill="url(#roofGrad)"
            stroke="#5C2D1F"
            strokeWidth="2"
          />

          {/* Tier 2 Mid Chamber */}
          <rect x="540" y="240" width="120" height="40" fill="url(#brickGrad)" />
          {/* Latticed Window */}
          <rect x="585" y="248" width="30" height="24" rx="2" fill={lit ? "#F59E0B" : "#1A0E0A"} />

          {/* Tier 2 Roof (Middle Pagoda Roof) */}
          <path
            d="M470 240 Q600 215 730 240 L695 200 Q600 190 505 200 Z"
            fill="url(#roofGrad)"
            stroke="#5C2D1F"
            strokeWidth="2"
          />

          {/* Tier 3 Upper Chamber */}
          <rect x="560" y="170" width="80" height="30" fill="url(#brickGrad)" />

          {/* Top Pagoda Roof */}
          <path
            d="M500 170 Q600 145 700 170 L665 130 Q600 120 535 130 Z"
            fill="url(#roofGrad)"
            stroke="#5C2D1F"
            strokeWidth="2"
          />

          {/* Sacred Golden Finial (Gajur Pinnacle) */}
          <g id="gajur" className={lit ? "drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" : ""}>
            <polygon points="600,80 594,120 606,120" fill={lit ? "#FBBF24" : "#8A661C"} />
            <circle cx="600" cy="78" r="4.5" fill={lit ? "#FFFBEB" : "#A67C24"} />
            <circle cx="600" cy="95" r="7" fill={lit ? "#F59E0B" : "#7A5817"} />
          </g>
        </g>

        {/* 4. Right Traditional Home with Balconies */}
        <g id="right-house">
          <rect x="850" y="210" width="290" height="270" fill="url(#brickGrad)" stroke="#381D14" strokeWidth="1.5" />
          <path
            d="M820 215 Q995 195 1170 215 L1145 185 Q995 175 845 185 Z"
            fill="url(#roofGrad)"
            stroke="#4A2519"
            strokeWidth="2"
          />

          {/* Balcony Railing */}
          <rect x="870" y="325" width="250" height="28" fill="#1C0E0A" stroke="#3D2016" strokeWidth="1.5" />
          {[885, 920, 955, 990, 1025, 1060, 1095].map((xR) => (
            <line key={xR} x1={xR} y1="325" x2={xR} y2="353" stroke="#4A281C" strokeWidth="2" />
          ))}

          {/* Windows on Right House */}
          {[890, 980, 1070].map((xPos, idx) => (
            <g key={`right-win-${idx}`}>
              <rect x={xPos} y="240" width="48" height="56" rx="3" fill="#1C0E0A" stroke="#4A281C" strokeWidth="2" />
              <rect
                x={xPos + 3}
                y="244"
                width="42"
                height="48"
                rx="2"
                fill="url(#windowGlow)"
                className={`transition-opacity duration-1000 ${lit ? "opacity-90" : "opacity-0"}`}
              />
              <line x1={xPos + 24} y1="240" x2={xPos + 24} y2="296" stroke="#2B150F" strokeWidth="2" />
              <line x1={xPos} y1="268" x2={xPos + 48} y2="268" stroke="#2B150F" strokeWidth="2" />
            </g>
          ))}
        </g>

        {/* 5. TIHAR BATTI (Festive Fairy Light Strings draped across all roofs) */}
        <g id="fairy-lights">
          {/* Wire 1 across Left House Roof */}
          <path d="M35 225 Q190 245 365 225" stroke="#1F1510" strokeWidth="1.2" fill="none" />
          {/* Bulbs on Left Roof */}
          {[60, 100, 140, 180, 220, 260, 300, 340].map((bX, i) => {
            const bY = 225 + Math.sin((i / 7) * Math.PI) * 16;
            const bulbColors = ["#F59E0B", "#F43F5E", "#10B981", "#FBBF24", "#38BDF8", "#F59E0B", "#EC4899", "#FBBF24"];
            const color = bulbColors[i % bulbColors.length];
            return (
              <g key={`bulb-l-${i}`} className={`transition-opacity duration-700 ${lit ? "opacity-100" : "opacity-20"}`}>
                <circle cx={bX} cy={bY} r={lit ? 3.5 : 2} fill={color} />
                {lit && <circle cx={bX} cy={bY} r={9} fill={color} opacity="0.35" className="animate-pulse" />}
              </g>
            );
          })}

          {/* Wire 2 across Central Temple Roof 1 */}
          <path d="M445 320 Q600 340 755 320" stroke="#1F1510" strokeWidth="1.2" fill="none" />
          {[465, 505, 545, 585, 625, 665, 705, 735].map((bX, i) => {
            const bY = 320 + Math.sin((i / 7) * Math.PI) * 15;
            const bulbColors = ["#FBBF24", "#F59E0B", "#F43F5E", "#10B981", "#FDE68A", "#F43F5E", "#FBBF24", "#F59E0B"];
            const color = bulbColors[i % bulbColors.length];
            return (
              <g key={`bulb-c-${i}`} className={`transition-opacity duration-700 ${lit ? "opacity-100" : "opacity-20"}`}>
                <circle cx={bX} cy={bY} r={lit ? 3.5 : 2} fill={color} />
                {lit && <circle cx={bX} cy={bY} r={8} fill={color} opacity="0.4" className="animate-pulse" />}
              </g>
            );
          })}

          {/* Wire 3 across Right House Balcony */}
          <path d="M825 215 Q995 235 1165 215" stroke="#1F1510" strokeWidth="1.2" fill="none" />
          {[845, 885, 925, 965, 1005, 1045, 1085, 1125, 1150].map((bX, i) => {
            const bY = 215 + Math.sin((i / 8) * Math.PI) * 16;
            const bulbColors = ["#F59E0B", "#10B981", "#FBBF24", "#F43F5E", "#F59E0B", "#38BDF8", "#FBBF24", "#10B981", "#F59E0B"];
            const color = bulbColors[i % bulbColors.length];
            return (
              <g key={`bulb-r-${i}`} className={`transition-opacity duration-700 ${lit ? "opacity-100" : "opacity-20"}`}>
                <circle cx={bX} cy={bY} r={lit ? 3.5 : 2} fill={color} />
                {lit && <circle cx={bX} cy={bY} r={8.5} fill={color} opacity="0.35" className="animate-pulse" />}
              </g>
            );
          })}
        </g>

        {/* 6. Flickering Clay Diyas on Steps & Balconies */}
        <g id="clay-diyas">
          {[
            [120, 310], [180, 310], [240, 310], [300, 310],
            [480, 440], [530, 440], [580, 440], [620, 440], [670, 440], [715, 440],
            [880, 325], [930, 325], [980, 325], [1030, 325], [1080, 325]
          ].map(([dX, dY], idx) => (
            <g key={`diya-${idx}`}>
              {/* Diya Clay Pot Base */}
              <ellipse cx={dX} cy={dY + 3} rx="6" ry="2.5" fill="#B85C38" />
              {/* Flame (Visible when lit) */}
              <g className={`transition-all duration-700 ${lit ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                <circle cx={dX} cy={dY - 1} r="9" fill="url(#diyaMiniGlow)" opacity="0.75" />
                <ellipse cx={dX} cy={dY - 2} rx="2" ry="3.5" fill="#FFFBEB" />
              </g>
            </g>
          ))}
        </g>

        {/* 7. Courtyard Ground Cobblestone and Rangoli at Temple Steps */}
        <g id="courtyard-floor">
          <rect x="0" y="465" width="1200" height="15" fill="#100705" />
          {/* Rangoli Floral Mandala on Temple Approach */}
          <g className={`transition-opacity duration-1000 ${lit ? "opacity-95" : "opacity-25"}`}>
            <ellipse cx="600" cy="468" rx="42" ry="8" fill="#F59E0B" opacity="0.6" />
            <ellipse cx="600" cy="468" rx="26" ry="5" fill="#DC2626" opacity="0.7" />
            <ellipse cx="600" cy="468" rx="12" ry="3" fill="#FFFBEB" opacity="0.9" />
          </g>
        </g>
      </svg>
    </div>
  );
}
