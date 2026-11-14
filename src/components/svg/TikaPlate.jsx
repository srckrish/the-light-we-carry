const pigments = [
  { cx: 168, cy: 168, fill: "#9F452A" },
  { cx: 206, cy: 142, fill: "#E7A33E" },
  { cx: 252, cy: 132, fill: "#F2C56E" },
  { cx: 300, cy: 140, fill: "#F6EFE2" },
  { cx: 342, cy: 164, fill: "#B85C38" },
  { cx: 368, cy: 204, fill: "#416C70" },
  { cx: 360, cy: 248, fill: "#D9A441" },
];

export default function TikaPlate({ className = "" }) {
  return (
    <svg
      viewBox="0 0 560 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A thali with coloured tika, rice, marigold and a diya"
    >
      <ellipse cx="280" cy="214" rx="188" ry="92" fill="#E7A33E" opacity="0.08" />
      <ellipse cx="280" cy="236" rx="176" ry="72" fill="#000" opacity="0.18" />

      <ellipse cx="280" cy="214" rx="176" ry="78" fill="#8C432C" />
      <ellipse cx="280" cy="204" rx="176" ry="78" fill="#C9844A" />
      <ellipse cx="280" cy="198" rx="150" ry="62" fill="#F3E6D0" />
      <ellipse
        cx="280"
        cy="198"
        rx="132"
        ry="50"
        fill="none"
        stroke="#E7A33E"
        strokeWidth="1.5"
        opacity="0.7"
      />

      <ellipse cx="196" cy="206" rx="30" ry="16" fill="#F7F3EA" />
      <ellipse cx="190" cy="202" rx="16" ry="8" fill="#FFFDF8" />
      <g fill="#F2C56E" opacity="0.85">
        <ellipse cx="182" cy="198" rx="2.2" ry="1.4" />
        <ellipse cx="190" cy="196" rx="2.2" ry="1.4" />
        <ellipse cx="198" cy="199" rx="2" ry="1.3" />
      </g>

      {pigments.map((dot) => (
        <g key={`${dot.cx}-${dot.cy}`}>
          <circle cx={dot.cx} cy={dot.cy} r="13" fill={dot.fill} />
          <circle cx={dot.cx - 3} cy={dot.cy - 3} r="3" fill="#fff" opacity="0.28" />
        </g>
      ))}

      <g className="tika-bloom">
        <g fill="#E7A33E">
          <ellipse cx="250" cy="248" rx="8" ry="14" />
          <ellipse cx="250" cy="248" rx="8" ry="14" transform="rotate(60 250 248)" />
          <ellipse cx="250" cy="248" rx="8" ry="14" transform="rotate(120 250 248)" />
        </g>
        <circle cx="250" cy="248" r="5" fill="#9F452A" />
      </g>

      <g transform="translate(392 214)">
        <path d="M-16 4c3 12 29 12 32 0-3 12-12 18-16 18s-13-6-16-18Z" fill="#9F452A" />
        <path d="M-10 4c2 6 18 6 20 0" fill="#F2C56E" opacity="0.85" />
        <path
          d="M0 4C-3-8-1-16 0-24c1 8 3 16 0 28Z"
          fill="#F2C56E"
          className="diya-flame-flicker"
        />
      </g>
    </svg>
  );
}
