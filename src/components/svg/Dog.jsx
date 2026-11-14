
export default function Dog({ className = "w-full h-full" }) {
    return (
      <svg
        viewBox="0 0 240 180"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration of a sitting dog wearing a garland"
      >
        {/* Body */}
        <path
          d="M66 124 C66 99 82 82 111 82 H145 C163 82 176 98 176 119 V143 H75 C69 143 66 136 66 124Z"
          fill="#D9A441"
        />
  
        {/* Back leg */}
        <path
          d="M145 119 C165 119 170 132 165 144 H132"
          fill="#B85C38"
        />
  
        {/* Front legs */}
        <path
          d="M91 117 L88 145 M121 116 L124 145"
          stroke="#D9A441"
          strokeWidth="10"
          strokeLinecap="round"
        />
  
        {/* Neck */}
        <path
          d="M128 91 C128 73 137 62 154 62 C171 62 179 76 174 96 L159 111"
          fill="#D9A441"
        />
  
        {/* Head */}
        <path
          d="M147 65 C145 47 159 35 177 39 C193 42 201 57 194 72 C188 86 170 91 157 81"
          fill="#D9A441"
        />
  
        {/* Ear */}
        <path
          d="M158 45 C139 29 132 45 144 66"
          fill="#B85C38"
        />
  
        {/* Muzzle */}
        <path
          d="M187 65 Q207 65 210 77 Q205 87 188 82"
          fill="#B85C38"
        />
  
        {/* Eye and nose */}
        <circle cx="181" cy="56" r="3" fill="#B85C38" />
        <circle cx="205" cy="76" r="3" fill="#D9A441" />
  
        {/* Garland */}
        <path
          d="M132 91 Q151 111 174 91"
          stroke="#B85C38"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="143" cy="102" r="4" fill="#B85C38" />
        <circle cx="155" cy="106" r="4" fill="#B85C38" />
        <circle cx="167" cy="101" r="4" fill="#B85C38" />
  
        {/* Tail */}
        <path
          d="M68 105 Q45 91 48 76"
          stroke="#D9A441"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  