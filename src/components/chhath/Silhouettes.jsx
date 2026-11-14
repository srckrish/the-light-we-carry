
export default function Silhouettes() {
    const devotees = [
      { x: 55, scale: 0.85 },
      { x: 105, scale: 1 },
      { x: 165, scale: 0.9 },
      { x: 220, scale: 1.05 },
      { x: 285, scale: 0.85 },
    ];
  
    return (
      <svg
        viewBox="0 0 340 180"
        className="absolute bottom-[12%] left-1/2 z-20 h-[42%] w-full max-w-[440px] -translate-x-1/2"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        {devotees.map((person, index) => (
          <g
            key={index}
            transform={`translate(${person.x} 0) scale(${person.scale})`}
            fill="#11110F"
          >
            {/* Head */}
            <circle cx="0" cy="40" r="7" />
  
            {/* Body */}
            <path d="M-7 49 Q-10 70 -8 100 L8 100 Q10 70 7 49 Z" />
  
            {/* Legs */}
            <path d="M-7 98 L-9 142 L-3 142 L0 105 L3 142 L9 142 L7 98 Z" />
  
            {/* Arms */}
            <path
              d="M-6 53 Q-22 65 -19 82 L-15 82 L-2 67 Z"
              fill="#11110F"
            />
            <path
              d="M6 53 Q22 65 19 82 L15 82 L2 67 Z"
              fill="#11110F"
            />
  
            {/* Soop basket */}
            <path
              d="M-17 80 Q0 70 17 80 L13 91 Q0 96 -13 91 Z"
              fill="#D9A441"
              stroke="#11110F"
              strokeWidth="2"
            />
            <path
              d="M-12 82 Q0 86 12 82"
              fill="none"
              stroke="#9F452A"
              strokeWidth="1.5"
            />
          </g>
        ))}
      </svg>
    );
  }
  