
export default function TikaPlate({ className = "w-full h-full" }) {
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a traditional tika plate"
    >
      {/* Plate shadow and rim */}
      <ellipse
        cx="120"
        cy="105"
        rx="85"
        ry="39"
        fill="#B85C38"
      />

      <ellipse
        cx="120"
        cy="96"
        rx="85"
        ry="39"
        fill="#D9A441"
      />

      {/* Inner plate */}
      <ellipse
        cx="120"
        cy="91"
        rx="68"
        ry="28"
        fill="#B85C38"
      />

      {/* Rice grains */}
      <path
        d="M76 89 Q80 82 86 89 M91 104 Q96 97 101 104 M137 104 Q142 97 147 104"
        stroke="#D9A441"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Tika bowl */}
      <path
        d="M102 77 Q120 66 138 77 L132 91 Q120 99 108 91Z"
        fill="#D9A441"
      />

      {/* Tika powder */}
      <ellipse
        cx="120"
        cy="78"
        rx="12"
        ry="5"
        fill="#B85C38"
      />

      {/* Flower petals */}
      <circle cx="63" cy="64" r="7" fill="#B85C38" />
      <circle cx="76" cy="55" r="7" fill="#B85C38" />
      <circle cx="88" cy="64" r="7" fill="#B85C38" />
      <circle cx="76" cy="70" r="7" fill="#B85C38" />

      {/* Central flower */}
      <circle cx="76" cy="63" r="4" fill="#D9A441" />

      {/* Small decorative dots */}
      <circle cx="157" cy="78" r="3" fill="#D9A441" />
      <circle cx="168" cy="88" r="3" fill="#D9A441" />
    </svg>
  );
}
