function SmallDiya({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="16" rx="12" ry="3" fill="#000" opacity="0.2" />
      <path d="M-11 2c2 8 20 8 22 0-2 8-8 12-11 12s-9-4-11-12Z" fill="#B85C38" />
      <path d="M-7 2c2 4 12 4 14 0" fill="#F2C56E" opacity="0.8" />
      <path
        d="M0 2C-2-8-1-14 0-20c1 6 2 12 0 22Z"
        fill="#F2C56E"
        className="diya-flame-flicker"
      />
    </g>
  );
}

export default function Cow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 560 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A garlanded cow, with lamps for Laxmi Puja"
    >
      <ellipse cx="250" cy="200" rx="180" ry="120" fill="#E7A33E" opacity="0.07" />
      <ellipse cx="250" cy="332" rx="190" ry="14" fill="#000" opacity="0.2" />

      <g className="cow-lamps">
        <SmallDiya x="78" y="250" />
        <SmallDiya x="132" y="268" />
        <SmallDiya x="186" y="252" />
      </g>

      <path
        d="M86 168c18 28 10 48-8 62"
        stroke="#F6EFE2"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M78 228c8 6 16 2 18-4" stroke="#E7A33E" strokeWidth="4" strokeLinecap="round" />

      <path
        d="M118 214c0-52 40-86 96-78 18 2 28-16 48-8 34 14 70 10 92 36 16 18 14 40 4 58v62H150c-20-18-32-42-32-70Z"
        fill="#F6EFE2"
      />
      <path
        d="M196 148c22-28 58-20 62 8-28 4-48 2-62-8Z"
        fill="#F6EFE2"
      />
      <path
        d="M300 176c18-28 48-36 70-22 16 10 18 28 8 46-22 6-52 8-78-24Z"
        fill="#F6EFE2"
      />
      <path
        d="M352 168c16-8 36 0 40 16 2 18-16 28-34 22-8-16-12-28-6-38Z"
        fill="#E4C48A"
      />
      <path
        d="M318 132c-6-28 8-40 16-28M352 118c8-26 24-30 28-12"
        stroke="#C9844A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M292 186c-16 4-24 20-16 32 14 2 28-6 32-16-4-8-10-14-16-16Z" fill="#E4C48A" />
      <ellipse cx="392" cy="196" rx="16" ry="11" fill="#C9844A" />
      <circle cx="386" cy="194" r="2" fill="#3A241C" />
      <circle cx="396" cy="194" r="2" fill="#3A241C" />
      <circle cx="348" cy="162" r="3.5" fill="#3A241C" />

      <path
        d="M168 286v40M214 286v40M300 286v40M348 270v56"
        stroke="#F6EFE2"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M158 328h22M204 328h22M290 328h22M338 328h22"
        stroke="#C9844A"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M250 196c22 26 58 30 90 8"
        stroke="#E7A33E"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <g fill="#E7A33E">
        <circle cx="268" cy="214" r="6" />
        <circle cx="292" cy="222" r="6" />
        <circle cx="316" cy="214" r="6" />
      </g>
      <g fill="#9F452A">
        <circle cx="268" cy="214" r="2" />
        <circle cx="292" cy="222" r="2" />
        <circle cx="316" cy="214" r="2" />
      </g>
    </svg>
  );
}
