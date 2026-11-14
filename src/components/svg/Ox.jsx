export default function Ox({ className = "" }) {
  return (
    <svg
      viewBox="0 0 560 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="An ox with a yoke, beside a Mha Puja mandala"
    >
      <ellipse cx="230" cy="200" rx="170" ry="110" fill="#B85C38" opacity="0.08" />
      <ellipse cx="220" cy="338" rx="170" ry="14" fill="#000" opacity="0.2" />

      <path
        className="ox-tail"
        d="M78 176c-24 20-18 52 6 66"
        stroke="#E7D3B5"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="86" cy="246" r="5" fill="#E7A33E" />

      <path
        d="M96 214c4-48 46-78 108-70 16 2 24-22 52-10 28 12 62 6 86 28 22 20 20 48 6 68v58H132c-22-16-38-44-36-74Z"
        fill="#E7D3B5"
      />
      <path d="M176 156c28-34 64-18 66 14-32 2-54-2-66-14Z" fill="#E7D3B5" />

      <path
        d="M292 168c8-34 46-52 86-28 22 14 24 40 8 62-28 8-70 4-94-34Z"
        fill="#E7D3B5"
      />
      <path
        d="M246 118c-28-22-18-52 2-46 16 18 22 40 12 52M360 96c30-16 48 8 36 28-16-4-28-12-36-28Z"
        stroke="#9F452A"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M300 188c-18 2-28 18-16 32 18 4 34-4 36-16 0-10-8-16-20-16Z"
        fill="#C9844A"
      />
      <ellipse cx="392" cy="196" rx="18" ry="12" fill="#C9844A" />
      <circle cx="386" cy="194" r="2.2" fill="#3A241C" />
      <circle cx="398" cy="194" r="2.2" fill="#3A241C" />
      <circle cx="348" cy="164" r="3.5" fill="#3A241C" />

      <path
        d="M188 118c40-28 108-20 132 8"
        stroke="#9F452A"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d="M214 112v22M292 108v24" stroke="#6E2E1C" strokeWidth="4" strokeLinecap="round" />

      <path
        d="M158 292v38M210 292v38M304 292v38M356 276v54"
        stroke="#E7D3B5"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M146 332h24M198 332h24M292 332h24M344 332h24"
        stroke="#9F452A"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <g transform="translate(468 292)">
        <circle r="48" fill="#9F452A" />
        <circle r="38" fill="#F6EFE2" />
        <circle r="27" fill="#E7A33E" />
        <circle r="16" fill="#9F452A" />
        <circle r="6" fill="#F2C56E" />
        <g fill="#B85C38">
          <circle cx="0" cy="-32" r="3" />
          <circle cx="22" cy="-22" r="3" />
          <circle cx="32" cy="0" r="3" />
          <circle cx="22" cy="22" r="3" />
          <circle cx="0" cy="32" r="3" />
          <circle cx="-22" cy="22" r="3" />
          <circle cx="-32" cy="0" r="3" />
          <circle cx="-22" cy="-22" r="3" />
        </g>
      </g>
    </svg>
  );
}
