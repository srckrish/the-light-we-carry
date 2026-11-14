
import { useId } from "react";

function Diya({
    lit = true,
    className = "",
    flameRef,
    glowRef,
}) {
    const uid = useId().replace(/:/g, "");

    return (
        <svg
            viewBox="0 0 320 280"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={lit ? "A traditional lit clay diya" : "An unlit clay diya"}
            className={className}
        >
            <defs>
                {/* Natural terracotta clay */}
                <linearGradient
                    id={`${uid}-clay`}
                    x1="0"
                    y1="0"
                    x2="0.8"
                    y2="1"
                >
                    <stop offset="0%" stopColor="#D98A5D" />
                    <stop offset="22%" stopColor="#B96340" />
                    <stop offset="55%" stopColor="#91432D" />
                    <stop offset="100%" stopColor="#57271F" />
                </linearGradient>

                {/* Upper rim */}
                <linearGradient
                    id={`${uid}-rim`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop offset="0%" stopColor="#F0B17A" />
                    <stop offset="35%" stopColor="#B96943" />
                    <stop offset="100%" stopColor="#713421" />
                </linearGradient>

                {/* Inner bowl */}
                <linearGradient
                    id={`${uid}-inside`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop offset="0%" stopColor="#59291D" />
                    <stop offset="100%" stopColor="#321B16" />
                </linearGradient>

                {/* Oil */}
                <radialGradient
                    id={`${uid}-oil`}
                    cx="50%"
                    cy="35%"
                    r="70%"
                >
                    <stop offset="0%" stopColor="#F9D47C" />
                    <stop offset="65%" stopColor="#C78A36" />
                    <stop offset="100%" stopColor="#77421F" />
                </radialGradient>

                {/* Outer flame */}
                <linearGradient
                    id={`${uid}-fire`}
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                >
                    <stop offset="0%" stopColor="#D84B16" />
                    <stop offset="32%" stopColor="#F28A25" />
                    <stop offset="70%" stopColor="#FFD05A" />
                    <stop offset="100%" stopColor="#FFF2C1" />
                </linearGradient>

                {/* Inner flame */}
                <linearGradient
                    id={`${uid}-inner-fire`}
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                >
                    <stop offset="0%" stopColor="#F9A52E" />
                    <stop offset="65%" stopColor="#FFE69B" />
                    <stop offset="100%" stopColor="#FFFBE5" />
                </linearGradient>

                {/* Flame glow */}
                <radialGradient id={`${uid}-glow`}>
                    <stop offset="0%" stopColor="#FFC65B" stopOpacity=".42" />
                    <stop offset="55%" stopColor="#F59A32" stopOpacity=".15" />
                    <stop offset="100%" stopColor="#F59A32" stopOpacity="0" />
                </radialGradient>

            </defs>

            {/* Ground shadow */}
            <ellipse
                cx="160"
                cy="252"
                rx="86"
                ry="9"
                fill="#000"
                opacity=".28"
            />

            {!lit && (
                <ellipse
                    cx="160"
                    cy="150"
                    rx="54"
                    ry="70"
                    fill={`url(#${uid}-glow)`}
                    className="diya-hint-glow"
                    opacity="0"
                />
            )}

            {/* Warm ambient illumination */}
            {lit && (
                <ellipse
                    ref={glowRef}
                    cx="160"
                    cy="110"
                    rx="100"
                    ry="115"
                    fill={`url(#${uid}-glow)`}
                    className="diya-glow"
                />
            )}

            {/* Flame */}
            {lit && (
                <g ref={flameRef} className="diya-flame">
                    <g className="diya-flame-flicker">
                        {/* Outer flame */}
                        <path
                            d="
              M160 145
              C142 124 126 105 137 77
              C142 63 154 46 158 19
              C169 44 190 61 188 91
              C187 115 177 133 160 145 Z
            "
                            fill={`url(#${uid}-fire)`}
                            opacity=".96"
                        />

                        {/* Inner flame */}
                        <path
                            d="
              M160 140
              C149 121 147 106 153 91
              C156 83 160 74 161 65
              C176 92 179 115 160 140 Z
            "
                            fill={`url(#${uid}-inner-fire)`}
                        />

                        {/* Bright flame core */}
                        <path
                            d="
              M160 136
              C154 120 157 108 161 99
              C170 118 168 129 160 136 Z
            "
                            fill="#FFF8D8"
                            opacity=".8"
                        />
                    </g>
                </g>
            )}

            {/* Wick */}
            <path
                d="M155 179 Q153 164 160 151 Q167 164 165 179"
                fill="#35231B"
            />

            {/* Charred wick tip */}
            <ellipse
                cx="160"
                cy="153"
                rx="4"
                ry="3"
                fill="#17110E"
            />

            {/* Bowl interior */}
            <path
                d="
          M53 174
          Q160 204 267 174
          Q251 218 160 226
          Q69 218 53 174 Z
        "
                fill={`url(#${uid}-inside)`}
            />

            {/* Oil surface */}
            <path
                d="
          M62 177
          Q160 202 258 177
          Q160 194 62 177 Z
        "
                fill={`url(#${uid}-oil)`}
            />

            {/* Oil reflection */}
            <path
                d="M102 181 Q138 191 166 190"
                fill="none"
                stroke="#FFE3A0"
                strokeWidth="2"
                opacity=".45"
                strokeLinecap="round"
            />

            {/* Main bowl body */}
            <path
                d="
          M49 170
          Q160 199 271 170
          C261 210 224 239 160 241
          C96 239 59 210 49 170 Z
        "
                fill={`url(#${uid}-clay)`}
            />

            {/* Bowl left highlight */}
            <path
                d="M60 181 Q75 215 114 226"
                fill="none"
                stroke="#F2B080"
                strokeWidth="3"
                opacity=".3"
                strokeLinecap="round"
            />

            {/* Bowl lower shadow */}
            <path
                d="M108 233 Q160 247 212 233"
                fill="none"
                stroke="#48221B"
                strokeWidth="5"
                opacity=".35"
                strokeLinecap="round"
            />

            {/* Thick irregular clay rim */}
            <path
                d="
          M49 170
          Q75 178 105 182
          Q160 193 215 182
          Q245 178 271 170
        "
                fill="none"
                stroke={`url(#${uid}-rim)`}
                strokeWidth="13"
                strokeLinecap="round"
            />

            {/* Rim highlight */}
            <path
                d="M57 167 Q160 194 263 167"
                fill="none"
                stroke="#F1B77F"
                strokeWidth="2"
                opacity=".7"
                strokeLinecap="round"
            />

            {/* Handmade clay imperfections */}
            <g fill="#F0B080" opacity=".4">
                <ellipse cx="90" cy="207" rx="2" ry="1" />
                <ellipse cx="122" cy="224" rx="1.5" ry="1" />
                <ellipse cx="205" cy="218" rx="2" ry="1" />
                <ellipse cx="236" cy="195" rx="1.5" ry="1" />
            </g>

        </svg>
    );
}

export default Diya;
