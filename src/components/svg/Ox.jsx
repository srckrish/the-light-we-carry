export default function Ox({ className = "w-full h-full" }) {
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of an ox"
    >
      {/* Body */}
      <path
        d="M48 91 C48 67 71 57 106 57 H151 C177 57 191 77 191 101 V120 H48Z"
        fill="#D9A441"
      />

      {/* Neck */}
      <path
        d="M153 73 Q174 60 191 78 L194 119 H157Z"
        fill="#D9A441"
      />

      {/* Head */}
      <path
        d="M176 67 C178 48 194 39 209 48 C224 57 226 77 215 91 C205 102 185 94 179 82Z"
        fill="#D9A441"
      />

      {/* Horns */}
      <path
        d="M187 52 Q171 40 168 23 Q180 30 190 43"
        stroke="#B85C38"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M211 48 Q225 34 231 19 Q235 35 220 52"
        stroke="#B85C38"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Ear */}
      <path
        d="M180 69 Q162 54 157 68 Q165 81 183 80Z"
        fill="#B85C38"
      />

      {/* Muzzle */}
      <ellipse cx="211" cy="83" rx="12" ry="9" fill="#B85C38" />

      {/* Eye */}
      <circle cx="205" cy="63" r="3" fill="#B85C38" />

      {/* Legs */}
      <path
        d="M70 116 V148 M103 116 V148 M157 116 V148 M181 112 V148"
        stroke="#D9A441"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Hooves */}
      <path
        d="M62 149 H78 M95 149 H111 M149 149 H165 M173 149 H189"
        stroke="#B85C38"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Tail */}
      <path
        d="M49 78 Q32 90 36 111 L27 119"
        stroke="#D9A441"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}