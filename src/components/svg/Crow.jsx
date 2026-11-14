
export default function Cow({ className = "w-full h-full" }) {
    return (
      <svg
        viewBox="0 0 240 180"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration of a cow"
      >
        {/* Body */}
        <path
          d="M52 91 C52 69 72 57 105 57 H153 C177 57 190 75 190 99 V119 H52 V91Z"
          fill="#D9A441"
        />
  
        {/* Neck */}
        <path
          d="M155 75 Q172 60 188 73 L194 112 H161"
          fill="#D9A441"
        />
  
        {/* Head */}
        <path
          d="M177 65 C181 48 197 42 211 51 C226 60 226 81 213 91 C203 99 186 93 180 83"
          fill="#D9A441"
        />
  
        {/* Horns */}
        <path
          d="M190 53 Q179 36 174 27 M211 51 Q224 34 229 28"
          stroke="#B85C38"
          strokeWidth="4"
          strokeLinecap="round"
        />
  
        {/* Ears */}
        <path
          d="M181 65 Q163 49 159 62 Q166 75 183 76"
          fill="#B85C38"
        />
  
        {/* Muzzle */}
        <ellipse cx="211" cy="83" rx="12" ry="9" fill="#B85C38" />
  
        {/* Eye */}
        <circle cx="205" cy="64" r="3" fill="#B85C38" />
  
        {/* Legs */}
        <path
          d="M72 116 V148 M102 116 V148 M158 116 V148 M181 112 V148"
          stroke="#D9A441"
          strokeWidth="9"
          strokeLinecap="round"
        />
  
        {/* Hooves */}
        <path
          d="M64 149 H80 M94 149 H110 M150 149 H166 M173 149 H189"
          stroke="#B85C38"
          strokeWidth="4"
          strokeLinecap="round"
        />
  
        {/* Tail */}
        <path
          d="M54 77 Q36 88 39 111 L30 119"
          stroke="#D9A441"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  