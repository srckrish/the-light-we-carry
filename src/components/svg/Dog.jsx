export default function Dog({ className = "" }) {
  return (
    <svg
      viewBox="0 0 560 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A dog wearing a marigold garland and a tika"
    >
      <ellipse cx="286" cy="196" rx="150" ry="110" fill="#D9A441" opacity="0.08" />
      <ellipse cx="280" cy="338" rx="168" ry="14" fill="#000" opacity="0.22" />

      <path
        className="dog-tail"
        d="M148 246c-40-6-62-42-40-66"
        stroke="#F6EFE2"
        strokeWidth="16"
        strokeLinecap="round"
      />

      <path
        d="M162 308c2-58 36-86 86-86h52c44 0 70 34 66 78v28H196c-20 0-34-10-34-20Z"
        fill="#F6EFE2"
      />
      <path
        d="M330 250c34 6 46 40 30 70h-52c4-28 2-48 22-70Z"
        fill="#E4C48A"
      />
      <path
        d="M214 248c10-46 44-68 78-56 24 8 36 34 28 62l-16 28h-96l6-34Z"
        fill="#F6EFE2"
      />
      <path
        d="M248 196c6-42 48-68 86-52 32 12 46 46 30 74-12 22-42 32-68 20-20-8-44-18-48-42Z"
        fill="#F6EFE2"
      />
      <path
        d="M268 158c-6-40 14-64 34-52 10 32 2 58-10 74-14-2-22-8-24-22Z"
        fill="#C9844A"
      />
      <path
        d="M348 206c26-2 48 12 48 30 0 16-16 28-38 24-18-2-32-12-30-26 2-14 8-26 20-28Z"
        fill="#E4C48A"
      />
      <ellipse cx="392" cy="228" rx="8" ry="5.5" fill="#3A241C" />
      <circle cx="322" cy="184" r="4.5" fill="#3A241C" />
      <circle cx="324" cy="182.5" r="1.4" fill="#F2C56E" />
      <circle cx="300" cy="168" r="5" fill="#9F452A" />

      <path
        d="M214 286v42M256 288v40"
        stroke="#F6EFE2"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M202 328h30M244 328h30"
        stroke="#C9844A"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M228 248c28 32 72 34 104 4"
        stroke="#E7A33E"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <g fill="#E7A33E">
        <circle cx="250" cy="270" r="7" />
        <circle cx="278" cy="282" r="7" />
        <circle cx="308" cy="272" r="7" />
      </g>
      <g fill="#9F452A">
        <circle cx="250" cy="270" r="2.4" />
        <circle cx="278" cy="282" r="2.4" />
        <circle cx="308" cy="272" r="2.4" />
      </g>
    </svg>
  );
}
