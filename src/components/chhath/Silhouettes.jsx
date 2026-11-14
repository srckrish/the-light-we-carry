function Devotee({ x, scale = 1, reach = true }) {
  return (
    <g transform={`translate(${x} 500) scale(${scale})`} fill="#140E0C">
      <circle cx="0" cy="0" r="13" />
      <path d="M-20 16c-8 26-6 62 0 96h40c6-34 8-70 0-96-10 12-30 14-40 0Z" />
      <path d="M-14 110l-12 72h14l8-46 10 46h14l-12-72Z" />
      {reach ? (
        <>
          <path d="M-16 34C-40 26-52 8-48-8l12 2c-2 12 8 22 24 26Z" />
          <path d="M16 34C40 26 52 8 48-8l-12 2c2 12-8 22-24 26Z" />
          <path d="M-32-6c12-16 52-16 64 0-14 10-50 10-64 0Z" fill="#E7C98A" />
          <path d="M-22-1h44" stroke="#9F452A" strokeWidth="1.4" />
          <circle cx="-6" cy="-3" r="2" fill="#9F452A" />
          <circle cx="6" cy="-2" r="2" fill="#F5EDDF" />
          <circle cx="0" cy="1" r="1.5" fill="#E7A33E" />
        </>
      ) : (
        <>
          <path
            d="M-16 36c-10 14-6 28 2 30M16 36c10 14 6 28-2 30"
            stroke="#140E0C"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path d="M-22 78c8-8 36-8 44 0v12c-10 6-34 6-44 0Z" fill="#E7C98A" />
        </>
      )}
    </g>
  );
}

const devotees = [
  { x: 180, scale: 0.78, reach: true },
  { x: 390, scale: 0.92, reach: false },
  { x: 620, scale: 1.05, reach: true },
  { x: 900, scale: 0.88, reach: true },
  { x: 1160, scale: 0.74, reach: false },
];

export default function Silhouettes() {
  return (
    <g aria-hidden="true">
      {devotees.map((person) => (
        <Devotee key={person.x} {...person} />
      ))}
    </g>
  );
}
