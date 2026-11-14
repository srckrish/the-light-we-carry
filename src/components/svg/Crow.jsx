export default function Crow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 560 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A crow perched above a small offering"
    >
      <ellipse cx="300" cy="188" rx="170" ry="120" fill="#E7A33E" opacity="0.08" />

      <path d="M70 292h430l-16 18H88L70 292Z" fill="#9F452A" />
      <path d="M70 292h430" stroke="#F2C56E" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M96 304h372" stroke="#6E2E1C" strokeOpacity="0.35" strokeWidth="3" />

      <ellipse cx="132" cy="278" rx="38" ry="11" fill="#2A4548" />
      <ellipse cx="126" cy="274" rx="22" ry="6" fill="#3E6464" opacity="0.7" />
      <g fill="#F2C56E">
        <ellipse cx="114" cy="272" rx="3.2" ry="2" />
        <ellipse cx="126" cy="269" rx="3.4" ry="2" />
        <ellipse cx="138" cy="273" rx="3" ry="1.8" />
        <ellipse cx="130" cy="276" rx="2.4" ry="1.5" />
      </g>

      <g>
        <path
          d="M176 176c-52-16-108 8-118 34 28 0 58 12 92 34 10-20 18-44 26-68Z"
          fill="#F3E7D4"
        />
        <path
          d="M186 230c4-62 78-96 146-74 36 12 62 8 78 28 6 34-14 62-40 74-62 28-156 16-184-28Z"
          fill="#F6EFE2"
        />
        <path
          className="crow-wing"
          d="M236 196c36-28 96-18 128 14-36 4-78 26-118 16-8-8-12-18-10-30Z"
          fill="#E4C48A"
        />
        <path
          d="M248 214c22-8 48-2 62 14-28 8-52 6-70-6 0-4 2-6 8-8Z"
          fill="#C9844A"
          opacity="0.55"
        />
        <path
          d="M392 168c28-22 70-10 76 18 4 22-14 38-38 40-26 2-48-12-52-32-2-12 4-20 14-26Z"
          fill="#F6EFE2"
        />
        <path d="M462 186l68-10-64 24-4-14Z" fill="#E7A33E" />
        <path d="M464 198l44 2-42 12Z" fill="#B85C38" />
        <circle cx="430" cy="178" r="5" fill="#1A120E" />
        <circle cx="432" cy="176.4" r="1.6" fill="#F2C56E" />
        <path
          d="M268 262l-4 30M304 266l6 28"
          stroke="#C9844A"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M256 292h22M300 294h22"
          stroke="#C9844A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
